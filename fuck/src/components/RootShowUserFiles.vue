<template>
  <div class="container">
    <p class="msg_username">当前查看的用户:</p>
    <p class="msg_username">{{ R_username }}</p>
    <span>
      <button @click="logout" class="bt_logout">登出</button>
    </span>
    <button @click="del" type="submit" class="bt_delete">删除</button><!--TODO onmouseover -->
    <button @click="togglePopOut" class="bt_upload">上传</button>
    <button @click="download" type="submit" class="bt_download">下载</button><!--TODO onmouseover -->
    <button @click="toRootPage" class="bt_download">菜单</button>
    <div class="wrapper">
      <!--n+1行，3列（勾选列、序号列、文件名列（、文件大小列））-->
      <!--TODO 实现分页功能-->
      <table>
        <colgroup>
          <col name="col01" width="40px">
          <col name="col02" width="40px">
          <col name="col03">
        </colgroup>
        <thead>
        <tr>
          <th class="col01">
            <Checkbox class="checkbox" v-model="isAllChecked" @change="onAllCheckChanged"></Checkbox>
            勾选
          </th>
          <th class="col02">序号</th>
          <th class="col03">文件名</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in files" :key="index">
          <td>
            <Checkbox class="checkbox" v-model="checkedArray[index]" @change="onCheckChanged"></Checkbox>
          </td>
          <td>{{index}}</td>
          <td>{{item.fileName}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div id="popout_upload">
      <div class="content">
        <h2>Upload</h2>
        <span>
          <div class="inputbox">
            <input id="fileInput" @change="addFile" ref="inputer" type="file">
          </div>
          <div class="inputbox">
            <input type="text" v-model="uploadName" placeholder="输入文件名" onkeyup="this.value=this.value.replace(/[(/,<>: |'\\)]/g,'')">
          </div>
          <button @click="upload" class="bt_inputbox">Upload</button>
        </span>
      </div>
      <button class="bt_close" @click="togglePopOut"><img src="../../static/image/close.png" width="45" height="45"></button>
    </div>
  </div>
</template>

<script>
import Checkbox from '../widget/Checkbox'
import JSZip from 'jszip'
import FileSaver from 'file-saver'

let formData = new FormData() // new一个formData事件

// 把文件名指向文件并转成ArrayBuffer对象
const getFile = fileName => {
  return new Promise((resolve, reject) => {
    this.$http({
      method: 'post',
      url: '/FileDownload',
      data: {
        email: this.R_email,
        fileName: fileName
      },
      responseType: 'arraybuffer'
    }).then(resp => {
      /*
      statusCode
      0: 成功
      1: 文件不存在
      2: 用户文件夹不存在
       */
      switch (resp.headers.statusCode) {
        case 0:
          resolve(resp.data)
          break
        case 1:
          console.log('文件不存在:', fileName)
          alert('文件不存在:' + fileName)
          break
        case 2:
          console.log('用户文件夹不存在')
          alert('用户文件夹不存在')
          break
      }
    }).catch(error => {
      reject(error.toString())
    })
  })
}

export default {
  name: 'RootShowUserFiles',
  components: {Checkbox},
  data () {
    return {
      R_username: this.$route.params.R_username,
      R_email: this.$route.params.R_email,
      checkedArray: [],
      isAllChecked: false,
      files: this.$route.params.files,
      dialogFormVisible: false,
      uploadFile: [],
      uploadName: ''
    }
  },
  mounted () {
    // this.$nextTick这个方法作用是，当数据被修改后使用这个方法，会回调获取更新后的dom再渲染出来
    this.$nextTick(function () {
      this.setCheckedArray()
    })
  },
  methods: {
    toRootPage () {
      this.$router.push('/RootPage')
    },
    logout () {
      this.$http.get('/logout').then(response => {
        console.log('response:')
        console.log(response)
        /*
        statusCode
        0: 成功
        1: 失败
         */
        if (!response.headers.statusCode) {
          // 清除token
          localStorage.removeItem('token')
          this.$router.push('/')
        } else {
          console.log('token清除失败')
          alert('退出失败')
        }
      })
    },
    // 初始化CheckedArray数组
    setCheckedArray () {
      if (!this.files.length) {
        this.isAllChecked = false// 全选删除后，清除勾选标记
      }
      this.checkedArray = this.files.map(() => false)
    },
    onCheckChanged () {
      this.checkedArray.every(item => item) && (this.isAllChecked = true) // 全选
      this.checkedArray.some(item => !item) && (this.isAllChecked = false) // 未全选
    },
    onAllCheckChanged () {
      this.checkedArray.fill(this.isAllChecked)// 全选按钮，fill使全体跟随
    },
    del () {
      let delFiles = []
      for (let i = 0; i < this.checkedArray.length; i++) {
        if (this.checkedArray[i]) {
          delFiles.push(this.files[i])
        }
      }
      this.$http({
        url: '/FileDelete',
        method: 'post',
        data: {
          delFiles: this.delFiles,
          email: this.R_email
        }
      }).then(resp => {
        /*
        statusCode
        0: 成功
        1: 文件删除失败
        2: 用户文件夹不存在
         */
        switch (resp.headers.statusCode) {
          case 0:
            delFiles.forEach(file => {
              const idx = this.files.map(item => item).indexOf(file)
              this.files.splice(idx, 1)// 删除
            })
            this.setCheckedArray() // 重置勾选框
            break
          case 1:
            alert('文件删除失败！')
            break
          case 2:
            alert('用户文件夹不存在！')
            break
        }
      })
    },
    addFile (e) {
      let self = this
      let inputDOM = self.$refs.inputer
      let file = inputDOM.files[0] // 通过DOM取文件数据
      formData.append('uploadfile', file) // 将file属性添加到formData里
    },
    upload () {
      formData.append('resetfilename', this.uploadName) // 后台可接收的参数
      formData.append('email', this.R_email)
      this.$http({
        method: 'post',
        url: '/FileUpload',
        data: formData,
        header: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log('文件上传响应:')
        console.log(res)
      })
    },
    togglePopOut () {
      const popOut = document.getElementById('popout_upload')
      popOut.classList.toggle('active')
    },
    download () {
      let downloadFiles = []
      let downloadIndex = []
      for (let i = 0; i < this.checkedArray.length; i++) {
        if (this.checkedArray[i]) {
          downloadFiles.push(this.checkedArray[i])
          downloadIndex.push(i)
        }
      }
      // this.$http({
      //   url: '/FileDownload',
      //   method: 'post',
      //   data: {
      //     downloadFiles: this.delFiles,
      //     email: this.email
      //   }
      // }).then(resp => {
      //   /*
      //   statusCode
      //   0: 成功
      //   1: 文件删除失败
      //   2: 用户文件夹不存在
      //    */
      //   switch (resp.headers.statusCode) {
      //     case 0:
      //       for (let idx in delIndex) {
      //         this.checkedArray[idx] = null
      //       }
      //       break
      //     case 1:
      //       alert('文件删除失败！')
      //       break
      //     case 2:
      //       alert('用户文件夹不存在！')
      //       break
      //   }
      // })
      // TODO ？有效性未知
      // 多文件下载为zip
      const zip = new JSZip()
      const cache = {}
      const promises = []
      downloadFiles.forEach(item => {
        const promise = getFile(item).then(data => {
          zip.file(item, data, { binary: true }) // 逐个添加文件
          cache[item] = data
        })
        promises.push(promise)
      })
      Promise.all(promises).then(() => {
        zip.generateAsync({type: 'blob'}).then(content => { // 生成二进制流
          FileSaver.saveAs(content, '批量下载.zip') // 利用file-saver保存文件
        })
      })
    }
  }
}
</script>

<style scoped>
.checkbox {
  vertical-align: -2px;
}

* {
  padding: 0;
  margin: 0;
  font-family: 'Open Sans Light', sans-serif;
  letter-spacing: .05em;
}

/* 渐变背景 */
.container {
  height: 100%;
  width: 100%;
  float: right;
  background-image: linear-gradient(135deg, #69FF97 10%, #00E4FF 100%);
}

/* 中心白框 */
.wrapper {
  overflow: scroll;
  background-color: #fff;
  width: 80%;
  height: 80%;
  padding: 0 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -48%);
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
}

.wrapper table {
  border-collapse: collapse;
  width: 100%;
}

.wrapper thead {
  height: 60px;
}

.wrapper table tbody tr td {
  text-align: center;
  padding: 20px 40px;
}

.wrapper table tbody tr td {
  border: 1px solid rgb(210, 210, 210);
}

.wrapper table tbody tr:nth-child(odd) {
  background-color: #fcfcfc;
}

/* 上传文件弹框 */
#popout_upload {
  position: fixed;
  top: -100%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: white;
  width: 450px;
  padding: 20px 50px 50px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: 0.5s;
  border-radius: 15px;
  visibility: hidden;
}

#popout_upload.active {
  visibility: visible;
  top: 50%;
}

#popout_upload .content {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
}

#popout_upload .content h2 {
  text-align: center;
  font-size: 30px;
  font-weight: 800;
  color: #0d0d0d;
  margin: 20px 0 20px 0;
}

#popout_upload .content .inputbox {
  position: relative;
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
}

#popout_upload .content .inputbox input {
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 15px;
  outline: none;
  font-size: 18px;
}

#popout_upload .content .bt_inputbox {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 150px;
  height: 45px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
  font-family: sans-serif;
  box-sizing: border-box;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 30px;
  outline: none;
}

#popout_upload .content .bt_inputbox:hover {
  color: #fff;
  animation: animation 8s linear infinite;
}

@keyframes animation {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 400%;
  }
}

#popout_upload .content .bt_inputbox::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  border-radius: 40px;
  filter: blur(20px);
  opacity: 0;
  transition: .5s;
}

#popout_upload .content .bt_inputbox:hover::before {
  filter: blur(20px);
  opacity: 1;
  animation: animation 8s linear infinite;
}

#popout_upload .bt_close {
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

/* 用户信息 */
.msg_username {
  font-family: \22Comic Sans MS\22, sans-serif;
  font-size: 34px;
  text-align: left;
  float: left;
  margin: 1% 0 0 1%;
}

/* 上传按钮 */
.bt_upload {
  font-family: \u5E7C\u5706, sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin: 1% 0 0 1%;
  padding: 1.3em 3em;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  float: right;
}

.bt_upload:hover {
  background-color: #2EE59D;
  box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.bt_upload:active {
  transform: translateY(-1px);
}

/* 下载按钮 */
.bt_download {
  font-family: \u5E7C\u5706, sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin: 1% 0 0 1%;
  padding: 1.3em 3em;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  float: right;
}

.bt_download:hover {
  background-color: #2EE59D;
  box-shadow: 0 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.bt_download:active {
  transform: translateY(-1px);
}

/* 登出按钮 */
.bt_logout {
  font-family: \u5E7C\u5706, sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin: 1% 2% 0 1%;
  padding: 1.3em 3em;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  float: right;
}

.bt_logout:hover {
  background-color: #e52e2e;
  box-shadow: 0 15px 20px rgba(229, 46, 46, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.bt_logout:active {
  transform: translateY(-1px);
}

/* 删除按钮 */

.bt_delete {
  font-family: \u5E7C\u5706, sans-serif;
  font-size: 14px;
  font-weight: bold;
  margin: 1% 2% 0 1%;
  padding: 1.3em 3em;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  float: right;
}

.bt_delete:hover {
  background-color: #e52e2e;
  box-shadow: 0 15px 20px rgba(229, 46, 46, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

.bt_delete:active {
  transform: translateY(-1px);
}

/* checkbox */

.checkbox {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  appearance: none;
  background-color: #bbb;
  transition: all .3s;
}

.checkbox::before {
  content: '';
  position: absolute;
  border: solid #fff;
  display: block;
  width: .3em;
  height: .6em;
  border-width: 0 .2em .2em 0;
  z-index: 1;
  opacity: 0;
  right: calc(50% - .3em);
  top: calc(50% - .6em);
  transform: rotate(0deg);
  transition: all .3s;
  transform-origin: center center;
}

.checkbox:checked {
  animation: a .3s ease-in forwards;
  background-color: rgb(120, 190, 120);
}

.checkbox:checked::before {
  opacity: 1;
  transform: rotate(405deg);
}

@keyframes a {
  0% {
    opacity: 1;
    transform: scale(1) rotateY(0deg);
  }

  50% {
    opacity: 0;
    transform: scale(.8) rotateY(180deg);
  }

  100% {
    opacity: 1;
    transform: scale(1) rotateY(360deg);
  }
}

/* 搜索框 */
.search-bar * {
  border: 0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.search-bar button,
.search-bar input {
  font: 1em Hind, sans-serif;
  line-height: 1em;
}

.search-bar input {
  color: rgba(214, 117, 236, 0.72);
}

.search-bar {
  display: flex;
  width: 30%;
  float: right;
}

.search-bar input,
.search-btn,
.search-btn:before,
.search-btn:after {
  transition: all 0.3s ease-out;
}

.search-bar input,
.search-btn {
  width: 3em;
  height: 3em;
}

.search-bar input:invalid:not(:focus),
.search-btn {
  cursor: pointer;
}

.search-bar input:focus,
.search-bar input:valid {
  width: 100%;
}

.search-bar input:focus,
.search-bar input:not(:focus) + .search-btn:focus {
  outline: transparent;
}

.search-bar {
  margin: auto;
  padding: 19px 0;
  justify-content: right;
  max-width: 24%;
}

.search-bar input {
  background: transparent;
  border-radius: 1.5em;
  box-shadow: 0 0 0 0.4em #171717 inset;
  padding: 0.75em;
  transform: translate(0.5em, 0.5em) scale(0.5);
  transform-origin: 100% 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.search-bar input::-webkit-search-decoration {
  -webkit-appearance: none;
}

.search-bar input:focus,
.search-bar input:valid {
  background: rgba(255, 255, 255, 0.54);
  border-radius: 0.375em 0 0 0.375em;
  box-shadow: 0 0 0 0.1em rgba(217, 217, 217, 0.66) inset;
  transform: scale(1);
}

.search-btn {
  background: #000000;
  border-radius: 0 0.75em 0.75em 0 / 0 1.5em 1.5em 0;
  padding: 0.75em;
  position: relative;
  transform: translate(0.25em, 0.25em) rotate(45deg) scale(0.25, 0.125);
  transform-origin: 0 50%;
}

.search-btn:before,
.search-btn:after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
}

.search-btn:before {
  border-radius: 50%;
  box-shadow: 0 0 0 0.2em #f1f1f1 inset;
  top: 0.75em;
  left: 0.75em;
  width: 1.2em;
  height: 1.2em;
}

.search-btn:after {
  background: #f1f1f1;
  border-radius: 0 0.25em 0.25em 0;
  top: 51%;
  left: 51%;
  width: 0.75em;
  height: 0.25em;
  transform: translate(0.2em, 0) rotate(45deg);
  transform-origin: 0 50%;
}

.search-btn span {
  display: inline-block;
  overflow: hidden;
  width: 1px;
  height: 1px;
}

/* Active state */
.search-bar input:focus + .search-btn,
.search-bar input:valid + .search-btn {
  background: rgba(117, 133, 236, 0.72);
  border-radius: 0 0.375em 0.375em 0;
  transform: scale(1);
}

.search-bar input:focus + .search-btn:before,
.search-bar input:focus + .search-btn:after,
.search-bar input:valid + .search-btn:before,
.search-bar input:valid + .search-btn:after {
  opacity: 1;
}

.search-bar input:focus + .search-btn:hover,
.search-bar input:valid + .search-btn:hover,
.search-bar input:valid:not(:focus) + .search-btn:focus {
  background: #5accb1;
}

.search-bar input:focus + .search-btn:active,
.search-bar input:valid + .search-btn:active {
  transform: translateY(1px);
}

@media screen and (prefers-color-scheme: dark) {
  body, input {
    color: #f1f1f1;
  }

  body {
    background: #171717;
  }

  .search-bar input {
    box-shadow: 0 0 0 0.4em #f1f1f1 inset;
  }

  .search-bar input:focus,
  .search-bar input:valid {
    background: #3d3d3d;
    box-shadow: 0 0 0 0.1em #3d3d3d inset;
  }

  .search-btn {
    background: #f1f1f1;
  }
}
</style>
