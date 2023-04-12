<template>
  <div class="comContent">
    <div class="topHeader">
      <div class="choice">
        选择商品
      </div>
      <div>
        <el-form ref="formTool" :model="formTool" :inline="true" style="text-align:left;padding-left:10px" label-width="120px">
          <el-form-item prop="name">
            <el-input v-model="formTool.goodsName" placeholder="请输入药品名称" size="small" />
          </el-form-item>
          <el-form-item prop="factory">
            <el-input v-model="formTool.factory" placeholder="请输入厂家关键词" size="small" />
          </el-form-item>
          <el-form-item prop="approvalNumber">
            <el-input v-model="formTool.approvalNumber" placeholder="请输入药品批准文号" size="small" />
          </el-form-item>
          <el-form-item prop="approvalNumber">
            <el-button size="small" type="primary" @click="searchList()">查询</el-button>
          </el-form-item>
          <el-form-item prop="approvalNumber" style="margin-right:0px">
            <el-button size="small" @click="reset()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="contentCont">
      <div class="contentInner">
        <div v-for="(item, idnex) in tableData" :key="idnex" class="itemCont">
          <div class="itemImg">
            <img :src="item.image" alt="" style="width: 180px; height: 180px; padding: 15px 0px">
          </div>
          <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
            <div class="itemBox name">
              {{ item.name }}
            </div>
          </el-tooltip>
          <div class="itemBox factory">
            {{ item.approvalNumber }}
          </div>
          <div class="itemBox factory">
            {{ item.factory }}
          </div>
          <div class="itemBox factory">
            {{ item.specification }}
          </div>
          <div class="itemBox shopCar">
            <el-button type="primary" size="small" icon="el-icon-document" style="width:100%" @click="handleAddbuy(item)">开始定价</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="el-page">
      <Pagination :total="page.total" :page.sync="page.current" :limit.sync="page.size" @pagination="pageChange" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { selfgoodsbase } from '@/api/platformproductManage/pricingmanagement'
export default {
  components: { Pagination },
  data() {
    return {
      text: '',
      clearable: true,
      goodsOneClassIdOptions: [],
      goodsTwoClassIdOptions: [],
      goodsThreeClassIdOptions: [],
      page: {
        current: 1,
        size: 10,
        total: 10
      },
      formTool: {
        goodsName: '',
        factory: '',
        approvalNumber: ''
      },
      tableData: [
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.notcheck()
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
    handleAddbuy(item) { // 开始定价
      this.$router.push(
        {
          path: '/platformproductManage/commodityreference-pricingmanagement-pricingarea',
          query: {
            goodsRegionId: item.goodsId,
            image: item.image,
            goodsName: item.name,
            approvalNumber: item.approvalNumber,
            factory: item.factory,
            addType: 'true'
          }
        }
      )
    },
    // 页码切换
    pageChange() {
      this.notcheck()
    },
    // 重置
    reset() {
      this.$refs.formTool.resetFields()
      this.searchList()
    },
    // 搜索按钮
    searchList() {
      this.notcheck(1)
    },
    // 首次进来执行查询操作
    notcheck(current) {
      if (current) {
        this.page.current = current
      }
      const params = {
        ...this.formTool,
        current: this.page.current,
        size: this.page.size
      }
      selfgoodsbase(params).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.records
          this.page.total = res.data.total
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
@import '@/styles/variables.scss';
.comContent {
  padding: 0px;
}
.topHeader {
  padding: 0 24px;
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f2f2f2;
  .choice {
    font-size: 16px;
    color: #262626;
    font-weight: 700;
  }
  .el-form-item {
    margin-bottom: 0px !important;
  }
}
.contentCont {
  margin: 0 24px;
  height: calc(100% - 125px);
  overflow: auto;
  .contentInner {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-top: 24px;
    .itemCont {
      width: 13.6%;
      min-width: 214px;
      height: 335px;
      border: 1px solid #dcdfe6;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
      .name {
        display: block !important;
        font-size: 16px;
        font-weight: 600;
      }
      .factory {
        color: #595959;
        font-size: 14px;
      }
      .itemBox {
        padding: 3px 10px;
        display: flex;
        justify-content: flex-start;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .itemImg {
        height: 180px;
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .price {
        font-weight: 700;
        justify-content: end;
      }
      .shopCar {
        margin-top: 20px;
        justify-content: center;
      }
    }
  }
}
.el-page {
  position: relative;
  float: right;
  padding: 0px 24px !important;
  padding-top: 10px !important;
}
</style>
