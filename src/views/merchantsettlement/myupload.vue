<!-- err -->
<template>
<el-dialog title="图片上传" :visible.sync="dialogShow" width="400px">
  <div class="dia_content">
    <el-upload ref="uploadDom" drag action="" accept=".png,.jpg,.jpeg"
      :limit="1" :show-file-list="false"
      :http-request="uploadSubmit">
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
    </el-upload>
  </div>
  <!-- <span slot="footer" class="dia_footer">
    <el-button @click="dialogShow = false">取 消</el-button>
    <el-button type="primary" @click="goSubmit">确定上传</el-button>
  </span> -->
</el-dialog>
</template>

<script>
import { imgUpload } from '@/api/user'

export default {
  data() {
    return {
      imgs: [],
      dialogShow: false,
      type: null
    }
  },
  props: {
    requestId: {
      type: String,
      default: "",
    },
  },
  methods: {
    open(type) {
      console.log(type)
      this.type = type
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
    },
    uploadSubmit(el) {
      let t = this;
      const { type, requestId } = this
      const { file } = el
      let formData = new FormData()
      formData.append("file", el.file)
      formData.append("type", type)
      formData.append("requestId", requestId)
      // let d = { file: el.file, type: '01', requestId: this.requestId }
      imgUpload(formData).then(res => {
        // console.log(res)
        const { code, data } = res
        if (code == 0) {
          this.$emit('upload', { type, url: data.certityImage })
          setTimeout(() => {
            t.$message.success('图片上传成功')
            t.$refs['uploadDom'].clearFiles()
            t.close()
          }, 100)
        }
      })
    },
    fileChange(el, els) {
      console.log(el, els)
      this.imgs = els;
    },
    goSubmit() {
      this.$emit('sure', this.formTool.desc)
      setTimeout(() => {
        this.close()
      }, 300)
    }
  }
}
</script>
<style lang='scss' scoped>
.dia{
  &_content{
    display: block;
  }
  &_footer{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
