<template>
  <!-- 添加或修改菜单对话框 -->
  <el-dialog :title="!form.menuId ? '新增' : '编辑'" :visible.sync="visible">
    <el-form ref="dataForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="姓名" prop="fullName">
        <el-input v-model="form.fullName" placeholder="请输入姓名" :disabled="type == 'see'" />
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" :disabled="type == 'see' || type == 'edit'" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" :disabled="type == 'see'" />
      </el-form-item>
      <!-- <el-form-item v-if="type == 'see'" label="创建时间" prop="">
        <el-input v-model="form.createTime" disabled />
      </el-form-item> -->
    </el-form>
    <div v-if="type != 'see'" slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addObj, delObj, fetchList, fetchRoleTree, permissionUpd, putObj } from '@/api/systemUser'
// import { addObj, fetchMenuTree, getObj, putObj } from '@/api/system'
// import Treeselect from '@riophae/vue-treeselect'
// import iconList from '@/const/iconList'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: 'MenuForm',
  // components: { Treeselect },
  data() {
    return {
      type: 'add',
      // 是否显示弹出层
      visible: false,
      form: {
        fullName: '',
        username: '',
        phone: ''
      },
      // 表单校验
      rules: {
        fullName: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        phone: [{ required: true, message: '手机号不能为空', trigger: 'blur' }]
      },
    }
  },
  methods: {
    init(info, type) {
      this.type = type
      if (type != 'add') {
        const { phone, username, fullName } = info
        this.form = { phone, username, fullName }
      } else {
        this.form = { fullName: '', username: '', phone: '' }
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
      this.visible = true
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const { phone, username, fullName } = this.form;
          const data = { phone, username, fullName }
          addObj(data).then((res) => {
            const { code, data, msg } = res
            if (code == 0 && data) {
              this.$message.success('添加成功')
            } else {
              this.$message.error('添加用户失败-' + msg)
            }
            this.visible = false
            this.$emit('sure')
          })
          // return
          // if (roleId) {
          //   data.roleId = roleId
          //   putObj(data).then(() => {
          //     this.$message.success('修改成功')
          //     this.visible = false
          //     this.$emit('sure')
          //   })
          // } else {
          //   addObj(data).then(() => {
          //     this.$message.success('添加成功')
          //     this.visible = false
          //     this.$emit('sure')
          //   })
          // }
        }
      })
    }
  },
}
</script>
