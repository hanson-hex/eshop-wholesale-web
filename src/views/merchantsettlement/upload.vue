<template>
  <div>
    <el-upload
      ref="upload"
      :class="{ hideUpload: fileList.length < limitNum ? false : true }"
      :on-change="fileOnChange"
      :on-remove="fileOnRemove"
      :multiple="true"
      action="#"
      name="files"
      :file-list="fileList"
      :auto-upload="false"
      :on-preview="handlePreview"
      :http-request="submitUpload('01')"
      list-type="picture-card"
      :limit="limitNum"
    >
      <i v-if="fileList.length < 1" slot="default" class="el-icon-plus" />
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="
        () => {
          dialogVisible = false
          setTimeout(() => {
            showDialog = false
          }, 2000)
        }
      "
    >
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
// import { shopcertifyUpload } from '@/api/examination'
export default {
  props: {
    requestId: {
      type: String,
      default: () => ''
    },
    typeImg: {
      type: String,
      default: () => ''
    },
    limitNum: {
      type: Number,
      default: () => 3
    }
  },
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      file: {},
      showDialog: false
    }
  },
  methods: {
    submitUpload(type) {
      // new 一个 FormData()
      const formData = new FormData()

      if (!this.file || !this.file.raw || this.showDialog) {
        return
      }
      formData.append('file', this.file.raw)
      // 这里可以添加需要上传的其他参数字段；
      // 注意：formData.append的值只能是字符串或者blob（File）格式, 复杂的数组或者对象的数据无法添加
      formData.append('type', this.typeImg)
      formData.append('requestId', this.requestId)

      // 上传
      // shopcertifyUpload(formData).then((res) => {
      //   if (res.data.code == 0) {
      //     this.$message.success('上传成功！')
      //     // this.fileList.push(res.data.data.certityImage)
      //   } else {
      //     this.$message.error(res.data.msg)
      //   }
      // })
    },
    fileOnRemove(file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    fileOnChange(file, fileList) {
      console.log(file, fileList)
      this.file = file
      this.fileList = fileList
    },

    handlePreview(file) {
      // console.log(file, "点击放大");
      this.dialogImageUrl = file.url
      this.dialogVisible = true
      this.showDialog = true
    }
  }
}
</script>
