<!--  -->
<template>
  <div class="classification">
    <div class="topHeader">
      <div class="fenlei">分账规则管理</div>
      <div>
        <el-form ref="formTool" :model="formTool" :inline="true" style="display: flex;align-items: center;">
          <el-form-item prop="goodsName">
            <el-input v-model="formTool.ruleName" placeholder="请输入规则名称" clearable size="small" />
          </el-form-item>
          <el-form-item prop="factory">
            <el-input v-model="formTool.createBy" placeholder="请输入创建者账号" clearable size="small" />
          </el-form-item>
          <el-form-item style="margin-left:16px">
            <el-button size="small" type="primary" @click="clickSearch(1)">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="reset()">重置</el-button>
          </el-form-item>
          <el-form-item style="margin-left:48px;margin-right:0px">
            <el-button size="small" type="primary" @click="clickBtn"> + 新建分账规则</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="center">
      <el-table :data="tableData" style="width: 100%" align="left">
        <el-table-column type="index" width="50" align="left" label="序号" />
        <el-table-column prop="ruleName" label="规则名称" align="left" width="400" />
        <el-table-column prop="createTime" label="创建时间" align="left" />
        <el-table-column prop="createBy" label="创建者帐号" align="left" />
        <el-table-column prop="wholesalePrice" label="启用状态" align="left">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-text="启用" inactive-text="停用" active-color="#13ce66" inactive-color="#ff4949" @change="changeLedgerRuleStatus(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="updateBy" label="最后操作人" align="left" />
        <el-table-column prop="amount3" label="操作" align="left">
          <template slot-scope="scope">
            <div>
              <el-link type="primary" :underline="false" style="margin-right:10px" @click="clickPrice(scope.row.id)">编辑规则</el-link>
              <el-link type="primary" :underline="false" @click="clickDel(scope.row.id)">关联商品</el-link>
            </div>
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="el-page">
      <Pagination :total="page.total" :page.sync="page.current" :limit.sync="page.size" :page-sizes="page.pageSizes" @pagination="pageChange" />
    </div>
  </div>
</template>

<script>
// import MyTable from '@/components/myTable'
import Pagination from '@/components/Pagination'
import { ledgerRules, changeLedgerRuleStatus } from '@/api/divisionrulemanagement/divisionrule'

export default {
  components: { Pagination },
  data() {
    return {
      formTool: {
        ruleName: '',
        createBy: ''
      },
      selectionList: [],

      operation: false,
      selection: true,
      index: true,
      tableData: [],
      page: {
        total: 10,
        current: 1,
        size: 20,
        pageSizes: [20, 30, 50, 100]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getgoodsbase()
  },
  mounted() {

  },
  beforeCreate() { },
  beforeMount() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { },
  methods: {
    // 编辑分账规则
    clickPrice(id) {
      this.$router.push(
        {
          path: '/commissionmanagement/commissionmanagement-divisionrule',
          query: {
            id: id,
            editType: true
          }
        }
      )
    },
    // 点击关联商品按钮
    clickDel(id) {
      this.$router.push(
        {
          path: '/commissionmanagement/commissionmanagement-relatedgoods',
          query: {
            id: id
          }
        }
      )
    },
    // 切换分页
    pageChange() {
      this.getgoodsbase()
    },
    // 新建定价
    clickBtn() {
      this.$router.push(
        {
          path: '/commissionmanagement/commissionmanagement-divisionrule',
          query: {
            editType: false
          }
        }
      )
    },
    // 下架接口
    batchSoldout(params) {
      batchSoldout(params).then(res => {
        if (res.code === 0) {
          this.$message.success('批量下架成功')
          this.reset()
          this.getgoodsbase(1)
        } else {
          this.$message.error('批量下架失败')
        }
      })
    },
    // 重置查询条件
    reset() {
      this.formTool = {
        ruleName: '',
        createBy: ''
      }
    },
    // 查询规则
    getgoodsbase(current) {
      if (current) { // 搜索条件改变从第一页开始查询
        this.page.current = current
      }
      const params = {
        ...this.formTool,
        current: this.page.current,
        size: this.page.size
      }
      console.log(params)
      ledgerRules(params).then(res => {
        if (res.code == 0 && res.data) {
          this.tableData = res.data.records
          this.page.total = res.data.total
        } else {
          this.tableData = []
          this.page.total = 0
        }
      })
    },
    // 搜索
    clickSearch(current) {
      this.getgoodsbase(current)
    },
    changeLedgerRuleStatus(row) {
      changeLedgerRuleStatus(row.id, row.status).then(res => {
        if (res.code == 0) {
          this.$message.success('更新成功')
          this.reset()
          this.getgoodsbase(1)
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/variables.scss';
.classification {
  background: white;
  // height: $contentHeight;
  padding: 0px;
  .topHeader {
    padding: 0 24px;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f5f5f5;
    .fenlei {
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 700;
      text-align: left;
      color: rgba(0, 0, 0, 0.85);
    }
  }
  .el-form-item {
    display: flex;
    margin-bottom: 0px !important;
  }
  .top {
    display: flex;
    padding: 10px 0 10px 0;
    .item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .label {
        width: 120px;
      }
    }
  }
  .center {
    margin: 0 24px;
    height: calc(100% - 107px);
    overflow: auto;
    // .imgBox {
    //   display: flex;
    //   align-items: center;
    //   .fontBox {
    //     padding-left: 20px;
    //     .spanFont {
    //       color: #aaa;
    //       font-size: 16px;
    //       display: block;
    //       text-align: left;
    //     }
    //     .jiaolang {
    //       font-size: 18px;
    //       color: black;
    //       padding-bottom: 5px;
    //     }
    //     .company {
    //       font-size: 14px;
    //       color: #aaa;
    //       padding-top: 10px;
    //     }
    //   }
    // }
  }
  .el-page {
    padding: 0 24px !important;
  }
}
</style>
