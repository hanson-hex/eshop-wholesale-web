<!--  -->
<template>
  <div class="classification">
    <div class="topHeader">
      <div class="fenlei">定价管理</div>
      <div>
        <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;">
          <el-form-item prop="goodsName">
            <el-input v-model="formTool.goodsName" placeholder="请输入商品名称" clearable size="small" />
          </el-form-item>
          <el-form-item prop="factory">
            <el-input v-model="formTool.factory" placeholder="请输入厂家关键词" clearable size="small" />
          </el-form-item>
          <el-form-item prop="approvalNumber">
            <el-input v-model="formTool.approvalNumber" placeholder="请输入批准文号" clearable size="small" />
          </el-form-item>
          <el-form-item style="margin-left:16px">
            <el-button size="small" type="primary" @click="clickSearch(1)">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="reset()">重置</el-button>
          </el-form-item>
          <el-form-item style="margin-left:48px;margin-right:0px">
            <el-button size="small" type="primary" @click="clickBtn">+ 新建定价</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="center">
      <el-table :data="tableData" :span-method="objectSpanMethod" border style="width: 100%" align="left">
        <el-table-column prop="id" label="商品信息" width="300" align="left">
          <template slot-scope="scope">
            <div class="imgBox">
              <div class="">
                <img :src="scope.row.image" alt="" style="width: 80px;height:80px">
              </div>
              <div style="padidng-left:20px" class="fontBox">
                <span class="spanFont jiaolang">{{ scope.row.goodsName }}</span>
                <span class="spanFont">{{ scope.row.approvalNumber }}</span>
                <span class="spanFont company">{{ scope.row.factory }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="regionName" label="定价区域" align="left" />
        <el-table-column prop="agencyTypeName" label="机构类型" align="left" />
        <el-table-column prop="retailPrice" label="零售价（元）" align="left" />
        <el-table-column prop="wholesalePrice" label="批发价（元）" align="left" />
        <el-table-column prop="wholesaleMinAmount" label="起订量" align="left" />
        <el-table-column prop="amount3" label="最后操作人" align="left">
          <template slot-scope="scope">
            <div>
              <p>{{ scope.row.createTime }}</p>
              <p>{{ scope.row.updateBy ? scope.row.updateBy : scope.row.createBy }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="amount3" label="操作" align="left">
          <template slot-scope="scope">
            <div>
              <el-link type="primary" :underline="false" style="margin-right:10px"
                @click="clickPrice(scope.row.goodsRegionId)">定价</el-link>
              <el-link type="primary" :underline="false" @click="clickDel(scope.row.goodsRegionId)">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="el-page">
      <Pagination :total="page.total" :page.sync="page.current" :limit.sync="page.size" :page-sizes="page.pageSizes"
        @pagination="pageChange" />
    </div>
  </div>
</template>

<script>
// import PricingTable from '@/components/pricingTable'
import Pagination from '@/components/Pagination'
import { drugenumeration } from '@/utils/enumeration'
import { goodsregionpricerelationpage, delgoodsregionpricerelation } from '@/api/platformproductManage/pricingmanagement'

export default {
  components: { Pagination },
  data() {
    return {
      formTool: {
        goodsName: '',
        factory: '',
        approvalNumber: ''
      },
      selectionList: [],

      operation: false,
      selection: true,
      index: true,
      tableData: [],
      page: {
        total: 0,
        current: 1,
        size: 12,
        pageSizes: [12, 24, 36, 48]
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
    // 点击定价按钮
    clickPrice(goodsRegionId) {
      this.$router.push(
        {
          path: '/platformproductManage/commodityreference-pricingmanagement-pricingarea',
          query: {
            goodsRegionId: goodsRegionId,
            addType: 'false'
          }
        }
      )
    },
    // 点击删除按钮
    clickDel(goodsRegionId) {
      delgoodsregionpricerelation(goodsRegionId).then(res => {
        if (res.code === 0) {
          this.$message.success('删除成功')
          this.reset()
          this.getgoodsbase(1)
        } else {
          this.$message.error('删除失败')
        }
      })
    },
    // 切换分页
    pageChange() {
      this.getgoodsbase()
    },
    // 合并列
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1 || columnIndex === 6 || columnIndex === 7) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 新建定价
    clickBtn() {
      this.$router.push('/platformproductManage/commodityreference-pricingmanagement-goods')
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
        goodsName: '',
        factory: '',
        approvalNumber: ''
      }
      this.page.current = 1
    },
    // 查询商品
    getgoodsbase(current) {
      if (current) { // 搜索条件改变从第一页开始查询
        this.page.current = current
      }
      const params = {
        ...this.formTool,
        current: this.page.current,
        size: this.page.size
      }
      goodsregionpricerelationpage(params).then(res => {
        if (res.code == 0 && res.data) {
          this.tableData = res.data.records
          this.page.total = res.data.total
          if (this.tableData.length > 0) {
            this.tableData.forEach(item => {
              item.type = drugenumeration(item.type)
            })
          }
        } else {
          this.tableData = []
          this.page.total = 0
        }
      })
    },
    // 搜索
    clickSearch(current) {
      this.getgoodsbase(current)
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
    height: 56px;
    padding: 0 24px;
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

    .el-form-item {
      margin-bottom: 0px !important;
    }
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
    margin-top: 24px;
    height: calc(100% - 142px);

    .imgBox {
      display: flex;
      align-items: center;

      .fontBox {
        padding-left: 20px;

        .spanFont {
          color: #aaa;
          font-size: 16px;
          display: block;
          text-align: left;
        }

        .jiaolang {
          font-size: 18px;
          color: black;
          padding-bottom: 5px;
        }

        .company {
          font-size: 14px;
          color: #aaa;
          padding-top: 10px;
        }
      }
    }

    ::v-deep .el-table tbody tr:hover>td {
      background-color: transparent !important;
    }

    .el-table::before {
      height: 1px;
    }
  }

  .el-page {
    padding: 10px 24px !important;
  }
}
</style>
