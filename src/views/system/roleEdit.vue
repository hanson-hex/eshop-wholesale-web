<template>
  <!-- 添加或修改菜单对话框 -->
  <el-dialog :title="!form.menuId ? '新增' : '编辑'" :visible.sync="visible">
    <el-form ref="dataForm" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入角色名称" :disabled="type == 'see'" />
      </el-form-item>
      <el-form-item label="角色标识" prop="roleCode">
        <el-input v-model="form.roleCode" placeholder="请输入角色标识" :disabled="type == 'see' || type == 'edit'" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="form.roleDesc" placeholder="请输入角色描述" :disabled="type == 'see'" />
      </el-form-item>
      <el-form-item v-if="type == 'see'" label="创建时间" prop="">
        <el-input v-model="form.createTime" disabled />
      </el-form-item>
    </el-form>
    <div v-if="type != 'see'" slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="dataFormSubmit">确 定</el-button>
      <el-button size="small" @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addObj, delObj, fetchList, fetchRoleTree, permissionUpd, putObj } from '@/api/systemRole'
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
        roleId: '',
        roleName: '',
        roleCode: '',
        roleDesc: '',
        createTime: '',
      },
      // 表单校验
      rules: {
        roleName: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }],
        roleCode: [{ required: true, message: '角色标识不能为空', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '角色描述不能为空', trigger: 'blur' }]
      },
    }
  },
  methods: {
    init(info, type) {
      this.type = type
      if (type != 'add') {
        const { roleId, roleName, roleCode, roleDesc, createTime } = info
        this.form = { roleId, roleName, roleCode, roleDesc, createTime }
      } else {
        this.form = { roleId: '', roleName: '', roleCode: '', roleDesc: '', createTime: '' }
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
          const { roleId, roleName, roleCode, roleDesc } = this.form;
          const data = { roleName, roleCode, roleDesc }

          // if (parentId === undefined || parentId.length == 0) {
          //   data.parentId = -1
          // } else {
          //   data.parentId = parentId[parentId.length - 1]
          // }
          // if (roleId) {
          //   data.roleId = roleId
          // }
          // console.log(data)
          if (roleId) {
            data.roleId = roleId
            putObj(data).then(() => {
              this.$message.success('修改成功')
              this.visible = false
              this.$emit('sure')
            })
          } else {
            addObj(data).then(() => {
              this.$message.success('添加成功')
              this.visible = false
              this.$emit('sure')
            })
          }
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.el-dialog {
  width: 30%;
  .dialog-footer {
    margin-top: 0px;
    padding-top: 0px;
  }
}
</style>
