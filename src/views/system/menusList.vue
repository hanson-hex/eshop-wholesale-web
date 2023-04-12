
<!--  -->
<template>
  <div class="comContent">
    <!-- <MyTabs :tabi="tabsIndex" keyname="val" :tabs="tabsData" @change="tabChange" /> -->
    <div class="headerTop">
      <el-form ref="formTool"
               :model="formTool"
               :inline="true"
               style="text-align:left">
        <el-form-item>
          <MyButton size="small"
                    type="primary"
                    icon="el-icon-plus"
                    text="添加"
                    @click="addOrUpdateHandle(false)" />
        </el-form-item>
        <!-- <el-form-item prop="shopName">
        <el-input v-model="formTool.shopName" clearable placeholder="请输入企业名称" size="small" />
      </el-form-item>
      <el-form-item prop="concatPhone">
        <el-input v-model="formTool.concatPhone" clearable placeholder="请输入手机号" size="small" />
      </el-form-item>
      <el-form-item>
        <MyButton type="primary"   text="检索" @click="goSearch" />
      </el-form-item>
      <el-form-item>
        <el-button size="small"   @click="reset()">重置</el-button>
      </el-form-item> -->
      </el-form>
    </div>

    <div class="center">
      <el-table v-loading="loading"
                :data="menuList"
                row-key="id"
                :tree-props="{ children: 'children', hasChildren: 'hasChildrens' }">
        <el-table-column prop="name"
                         label="菜单名称"
                         :show-overflow-tooltip="true" />
        <!-- <el-table-column prop="icon" label="图标" align="left" width="100">
          <template slot-scope="scope">
            <i :class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column prop="sortOrder" label="排序" width="60"></el-table-column>
        <el-table-column prop="path" label="组件路径" :show-overflow-tooltip="true"></el-table-column>-->
        <el-table-column prop="type"
                         label="类型"
                         width="200"
                         align="left">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.type === '0'"
                    type="success">菜单</el-tag>
            <el-tag v-if="scope.row.type === '1'"
                    type="info">按钮</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="keepAlive" label="缓冲" width="100" align="left">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.keepAlive === '0'">关闭</el-tag>
            <el-tag type="success" v-if="scope.row.keepAlive === '1'">开启</el-tag>
          </template>
        </el-table-column>-->
        <el-table-column prop="permission"
                         label="权限标识"
                         :show-overflow-tooltip="true" />
        <el-table-column label="操作"
                         align="left"
                         class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button v-if="permissions.sys_menu_add"
                       type="text"
                       icon="el-icon-plus"
                       @click="addOrUpdateHandle(false, scope.row.id)">添加</el-button>
            <el-button v-if="permissions.sys_menu_edit"
                       type="text"
                       icon="el-icon-edit"
                       @click="addOrUpdateHandle(true, scope.row.id)">编辑</el-button>
            <el-button v-if="permissions.sys_menu_del"
                       type="text"
                       icon="el-icon-delete"
                       @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <MenuForm v-if="addOrUpdateVisible"
                ref="addOrUpdate"
                @refreshDataList="getList" />
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/myButton'
import MenuForm from './menu-form.vue'
// import MyTable from '@/components/myTable'
// import MyTabs from '@/components/myTabs'
// import MyTypes from '@/components/myTypes'
import { auditTypes } from '@/utils/enumeration'
import { auditCompanyList } from '@/api/auditcenter'
import { mapGetters } from 'vuex'

import { clearMenuCache, delObj, fetchMenuTree } from '@/api/system'

export default {
  components: { MyButton, MenuForm }, // , MyTabs, MyTable, MyTypes
  data () {
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
      tabsData: [
        { name: '待审核', num: 0, val: 'AWAIT', numhide: false },
        { name: '未通过', num: 0, val: 'FAIL', numhide: true },
        { name: '通过', num: 0, val: 'ALREADY', numhide: true }],
      tabsIndex: 'AWAIT',
      operation: true,
      selection: false,
      index: false,
      tableData: [],
      tableOption: [
        { label: '编号', prop: 'id' },
        { label: '企业名称', prop: 'shopName' }, // 这里表示自定义列 , slot: true
        { label: '企业类型', prop: 'shopTypeName' },
        { label: '负责人电话', prop: 'concatPhone' },
        { label: '详细地址', prop: 'address', slot: true },
        { label: '状态', prop: 'status', slot: true }
        // { label: '操作', prop: 'menu' }
      ],
      page: {
        total: 10,
        current: 1,
        size: 10
      }
    }
  },
  computed: {
    ...mapGetters(['permissions']),
  },
  watch: {},
  created () {
    this.getList()
  },
  mounted () {

  },
  methods: {

    addOrUpdateHandle (isEdit, id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(isEdit, id)
      })
    },
    getList () {
      this.loading = true
      fetchMenuTree(false).then((res) => {
        this.menuList = res.data
        this.loading = false
      })
    },
    handleDelete (row) {
      this.$confirm(
        `是否要删除名称为"${row.name}"的${row.type === '0' ? '菜单' : '按钮'}?`,
        '请注意',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(function () {
          return delObj(row.id)
        })
        .then(() => {
          this.getList()
          this.$message.success('删除成功')
        })
    },
    handleClearMenuCache: function () {
      clearMenuCache()
        .then(() => {
          this.$message.success('清除缓存成功')
        })
        .catch(function () { })
    },

    tabChange (i) {
      // console.log('i:' + i)
      this.tabsIndex = i
      this.page.current = 1
      this.getcheckList()
    },
    getcheckList () {
      const { current, size } = this.page
      const params = {
        current, size, status: this.tabsIndex,
        ...this.formTool
      }
      auditCompanyList(params).then(res => {
        if (res.code === 0) {
          const { records, total } = res.data
          this.page.total = total
          // records.forEach(item => {
          //   item.status = auditTypes(item.status)
          // })
          this.tableData = records
        }
      })
    },
    reset () {
      // this.formTool.storeName = ''
      this.$refs.formTool.resetFields()
      this.page.current = 1
      this.getcheckList()
    },
    currentChange (val) {
      console.log('current', val)
    },
    goSearch () {
      const { shopName, concatPhone } = this.formTool
      console.log(shopName, concatPhone)
      if (shopName || concatPhone) {
        this.page.current = 1
        this.getcheckList()
      } else {
        this.$message({
          showClose: true,
          message: '请输入检索内容',
          type: 'warning'
        });
      }
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
}
.center {
  margin: 0 24px;
  height: calc(100% - 80px);
  .el-table--fit {
    overflow: auto;
    height: 100%;
    .el-table__body-wrapper {
      overflow: auto;
      /* position: relative; */
      height: calc(100% - 48px);
    }
  }
}
</style>
