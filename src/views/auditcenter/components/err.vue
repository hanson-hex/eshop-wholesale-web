<!-- err -->
<template>

  <el-dialog title="驳回理由" :visible.sync="dialogShow" width="600px">
    <div class="dia_content">
      <el-form ref="formTool" :model="formTool" :inline="false" style="text-align:left;">
        <el-form-item prop="name">
          <el-input v-model="formTool.desc" type="textarea" :autosize="{ minRows: 4, maxRows: 8}" placeholder="请输入驳回理由" size="small" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dia_footer">
      <el-button size="small" @click="dialogShow = false">取 消</el-button>
      <el-button size="small" type="primary" @click="goSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      formTool: {
        desc: ''
      },
      dialogShow: false
    }
  },
  methods: {
    open() {
      this.dialogShow = true
    },
    close() {
      this.dialogShow = false
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
.dia {
  &_content {
    display: block;
  }
  &_footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
