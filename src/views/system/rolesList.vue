
<!--  -->
<template>
  <div class="comContent">
    <div class="headerTop">
      <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;">
        <el-form-item>
          <MyButton type="primary" size="small" icon="el-icon-plus" text="添加" @click="roleEdit(false,'add')" />
        </el-form-item>
      </el-form>
    </div>

    <div class="center">
      <MyTable :table-data="tableData" :index="index" :selection="selection" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getList" @handleSelectionChange="currentChange">
        <template slot="caozuo" slot-scope="scope">
          <!-- <el-button type="text" size="mini" @click="editDetail(scope.row)">审核</el-button> -->
          <el-button v-if="permissions.sys_role_add" type="text" icon="el-icon-view" @click="roleEdit(scope.row,'see')">查看</el-button>
          <el-button v-if="permissions.sys_role_edit" type="text" icon="el-icon-edit" size="small" @click="roleEdit(scope.row,'edit')">编辑</el-button>
          <el-button v-if="permissions.sys_role_perm" type="text" size="small" icon="el-icon-plus" @click="handlePermission(scope.row, scope.index)">权限</el-button>
          <el-button v-if="permissions.sys_role_del" type="text" size="small" icon="el-icon-delete" @click="handleDelete(scope.row, scope.index)">删除</el-button>
        </template>
      </MyTable>
    </div>
    <el-dialog :visible.sync="dialogPermissionVisible" :close-on-click-modal="false" title="分配权限" class="myDialog">
      <div class="dialog-main-tree">
        <el-tree ref="menuTree" :data="treeData" :default-checked-keys="checkedKeys" :check-strictly="false" :props="defaultProps" :filter-node-method="filterNode" class="filter-tree" node-key="id" highlight-current show-checkbox default-expand-all />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="updatePermession(roleId)">更 新</el-button>
        <el-button size="small" type="default" @click="cancal()">取消</el-button>
      </div>
    </el-dialog>
    <RoleEdit ref="roleEdit" @sure="roleEditSure" />
  </div>
</template>

<script>
import MyButton from '@/components/myButton'
import RoleEdit from './roleEdit.vue'
import MyTable from '@/components/myTable'
// import MyTabs from '@/components/myTabs'
// import MyTypes from '@/components/myTypes'
import { auditTypes } from '@/utils/enumeration'
import { auditCompanyList } from '@/api/auditcenter'
import { mapGetters } from 'vuex'
import { addObj, delObj, fetchList, fetchRoleTree, permissionUpd, putObj } from '@/api/systemRole'
import { clearMenuCache, fetchMenuTree } from '@/api/system'

export default {
  components: { MyButton, MyTable, RoleEdit }, // , MenuForm, MyTabs, MyTable, MyTypes
  data() {
    return {
      addOrUpdateVisible: false,
      // 遮罩层
      loading: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      tableHight: 0,

      text: '',
      clearable: true,
      formTool: {
        shopName: '',
        concatPhone: ''
      },
      operation: false,
      selection: false,
      index: true,
      tableData: [],
      tableOption: [
        { label: '角色名称', prop: 'roleName' }, // 这里表示自定义列 , slot: true
        { label: '角色标识', prop: 'roleCode' },
        { label: '角色描述', prop: 'roleDesc' },
        { label: '创建时间', prop: 'createTime' },
        // { label: '状态', prop: 'status', slot: true }
        { label: '操作', prop: 'caozuo', slot: true, width: '400px' }
      ],
      page: { total: 10, current: 1, size: 10 },
      treeData: [],
      checkedKeys: [],
      checkedDsScope: [],
      defaultProps: {
        label: 'name',
        value: 'id',
      },
      roleId: undefined,
      roleCode: undefined,
      rolesOptions: undefined,
      dialogPermissionVisible: false,
    }
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  watch: {},
  created() {
    this.getList()
  },
  mounted() { },
  methods: {
    roleEditSure() {
      // console.log(val)
      this.page.current = 1
      this.getList()
    },
    roleEdit(obj, type) {
      this.$refs['roleEdit'].init(obj, type)
    },
    addOrUpdateHandle(isEdit, id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, id)
      })
    },
    getList() {
      const { current, size } = this.page
      let d = { current, size }
      this.listLoading = true
      fetchList(d).then((res) => {
        this.tableData = res.data.records
        this.page.total = res.data.total
        this.listLoading = false
      }).catch(() => {
        this.listLoading = false
      })
    },
    cancal() {
      this.dialogPermissionVisible = false
    },
    handlePermission(row) {
      fetchRoleTree(row.roleId).then((res) => {
        this.checkedKeys = res.data
        return fetchMenuTree()
      }).then((res) => {
        this.treeData = res.data
        // 解析出所有的太监节点
        this.checkedKeys = this.resolveAllEunuchNodeId(this.treeData, this.checkedKeys, [])
        this.dialogPermissionVisible = true
        this.roleId = row.roleId
        this.roleCode = row.roleCode
      })
    },
    updatePermession(roleId) {
      this.menuIds = ''
      this.menuIds = this.$refs.menuTree.getCheckedKeys().join(',').concat(',')
        .concat(this.$refs.menuTree.getHalfCheckedKeys().join(','))
      permissionUpd(roleId, this.menuIds).then(() => {
        this.dialogPermissionVisible = false
        // this.$store.dispatch('GetMenu', { type: false })
        this.$notify.success('修改成功')
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    resolveAllEunuchNodeId(json, idArr, temp) {
      for (let i = 0; i < json.length; i++) {
        const item = json[i]
        // 存在子节点，递归遍历;不存在子节点，将json的id添加到临时数组中
        if (item.children && item.children.length !== 0) {
          this.resolveAllEunuchNodeId(item.children, idArr, temp)
        } else {
          temp.push(idArr.filter((id) => id === item.id))
        }
      }
      return temp
    },
    handleDelete(row) {
      this.$confirm('是否确认删除名称为"' + row.roleName + '"' + '"的数据项?', '警告',
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      ).then(function () {
        return delObj(row.roleId)
      }).then(() => {
        this.page.current = 1
        this.getList()
        this.$notify.success('删除成功')
      })
    },
    reset() {
      // this.formTool.storeName = ''
      // this.$refs.formTool.resetFields()
      this.page.current = 1
      this.getList()
    },
    currentChange(val) {
      console.log('current', val)
    },
    // pageChange(val) {
    //   console.log('page', val)
    // },
    // handleSelectionChange(val) {
    //   console.log(val)
    // }
  }
}
</script>
<style lang='scss' scoped>
.comContent {
  padding: 0px;
  .headerTop {
    height: 56px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    .el-form-item {
      margin-bottom: 0px !important;
    }
  }
  .center {
    margin: 0 24px;
    height: calc(100% - 125px);
  }
}
::v-deep.myDialog {
  .el-dialog__body {
    height: 550px;
    overflow: auto;
  }
}
</style>
