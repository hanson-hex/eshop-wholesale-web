<template>
  <div class="comContent">
    <div class="header">
      <span class="font">商品基准库</span>
      <el-form ref="formTool"
               :model="formTool"
               :inline="true"
               label-width="120px">
        <el-form-item prop="goodsOneClassId">
          <el-select v-model="formTool.goodsOneClassId"
                     size="small"
                     placeholder="一级分类"
                     clearable
                     @change="changeOneClassId">
            <el-option v-for="item in goodsOneClassIdOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="goodsTwoClassId">
          <el-select v-model="formTool.goodsTwoClassId"
                     size="small"
                     placeholder="二级分类"
                     clearable
                     @change="changeTwoClassId">
            <el-option v-for="item in goodsTwoClassIdOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="goodsThreeClassId">
          <el-select v-model="formTool.goodsThreeClassId"
                     size="small"
                     placeholder="三级分类"
                     clearable>
            <el-option v-for="item in goodsThreeClassIdOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="formTool.name"
                    placeholder="请输入药品名称"
                    size="small" />
        </el-form-item>
        <el-form-item prop="factory">
          <el-input v-model="formTool.factory"
                    placeholder="请输入厂家关键词"
                    size="small" />
        </el-form-item>
        <el-form-item prop="approvalNumber">
          <el-input v-model="formTool.approvalNumber"
                    placeholder="请输入药品批准文号"
                    size="small" />
        </el-form-item>
        <el-form-item>
          <el-button size="small"
                     type="primary"
                     @click="searchList()">查询</el-button>
          <el-button size="small"
                     @click="reset()">重置</el-button>
          <el-button size="small"
                     type="danger"
                     @click="getbaseDrug()"
                     :disabled="!isDisable">更新基础库</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="contentCont">
      <div class="contentInner">
        <div v-for="(item, idnex) in tableData"
             :key="idnex"
             class="itemCont">
          <div class="itemImg">
            <img :src="item.image || avater"
                 alt=""
                 style="width: 180px; height: 180px; padding: 15px 0px">
          </div>
          <el-tooltip class="item"
                      effect="dark"
                      :content="item.name"
                      placement="top">
            <div class="itemBox name">
              {{ item.name }}
            </div>
          </el-tooltip>
          <div class="itemBox factory">
            {{ item.factory }}
          </div>
          <div class="itemBox factory">
            {{ item.approvalNumber }}
          </div>
          <div class="itemBox factory">
            {{ item.specification }}
          </div>
          <div class="itemBox shopCar">
            <el-button type="primary"
                       size="small"
                       style="width:100%"
                       icon="el-icon-document"
                       @click="handleAddbuy(item)">商品信息</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="el-page">
      <Pagination :total="page.total"
                  :page.sync="page.current"
                  :limit.sync="page.size"
                  @pagination="pageChange" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { goodsclassOne, goodsclassTwo, notcheck, checkRefresh, getbaseDrug } from '@/api/commodityreference'
import avater from "/public/img/default.png"
export default {
  components: { Pagination },
  data () {
    return {
      avater: avater,
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
        name: '',
        factory: '',
        approvalNumber: '',
        goodsOneClassId: '',
        goodsTwoClassId: '',
        goodsThreeClassId: ''
      },
      tableData: [],
      isDisable: true
    }
  },
  computed: {},
  watch: {},
  created () {
    this.query()
    this.notcheck()
  },
  mounted () {
    this.checkRefresh()
  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
  methods: {
    // 检查更新基础库
    checkRefresh () {
      checkRefresh().then((res) => {
        console.log(res);
        if (res.code === 0) {
          this.isDisable = res.data
        }
      })
    },
    getbaseDrug () {
      getbaseDrug().then((res) => {
        if (res.code === 0) {
          this.$message({ type: 'success', message: '提交成功' })
          this.isDisable = false
        }
      })
    },
    handleAddbuy (item) { // 加入购物车
      this.$router.push(
        {
          path: '/platformproductManage/commodityreference-edit',
          query: {
            goodsId: item.goodsId,
            editType: true
          }
        }
      )
    },
    // 页码切换
    pageChange () {
      this.notcheck()
    },
    // 重置
    reset () {
      this.$refs.formTool.resetFields()
      this.goodsTwoClassIdOptions = []
      this.goodsThreeClassIdOptions = []
      this.searchList()
    },
    // 搜索按钮
    searchList () {
      this.notcheck(1)
    },
    // 切换一级分类
    changeOneClassId (val) {
      if (val) {
        this.goodsclassTwo(val)
      }
    },
    // 切换二级分类
    changeTwoClassId (val) {
      if (val) {
        this.goodsclassThree(val)
      }
    },
    // 查询一级分类
    goodsclassOne () {
      goodsclassOne().then(res => {
        if (res.code == 0) {
          this.goodsOneClassIdOptions = res.data
          if (this.goodsOneClassIdOptions.length > 0) {
            this.formTool.goodsOneClassId = this.goodsOneClassIdOptions[0].id
            // this.goodsclassTwo(this.goodsOneClassIdOptions[0].id)
          } else {
            this.formTool.goodsOneClassId = ''
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询二级分类
    goodsclassTwo (id) {
      goodsclassTwo(id).then(res => {
        if (res.code == 0) {
          this.goodsTwoClassIdOptions = res.data
          if (this.goodsTwoClassIdOptions.length > 0) {
            this.formTool.goodsTwoClassId = ''
            this.formTool.goodsThreeClassId = ''
            this.goodsThreeClassIdOptions = []
            // this.goodsclassThree(this.goodsTwoClassIdOptions[0].id)
          } else {
            this.formTool.goodsTwoClassId = ''
            this.formTool.goodsThreeClassId = ''
            this.goodsThreeClassIdOptions = []
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 查询三级分类
    goodsclassThree (id) {
      goodsclassTwo(id).then(res => {
        if (res.code == 0) {
          this.goodsThreeClassIdOptions = res.data
          if (this.goodsThreeClassIdOptions.length > 0) {
            this.formTool.goodsThreeClassId = ''
          } else {
            this.formTool.goodsThreeClassId = ''
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 初次进来只查询一级分类 不联动
    query () {
      goodsclassOne().then(res => {
        if (res.code == 0) {
          this.goodsOneClassIdOptions = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 首次进来执行查询操作
    notcheck (current) {
      if (current) {
        this.page.current = current
      }
      const params = {
        ...this.formTool,
        current: this.page.current,
        size: this.page.size
      }
      notcheck(params).then(res => {
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
@import "@/styles/variables.scss";
.comContent {
  padding: 0px;
}
.header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px !important;
  border-bottom: 1px solid #f5f5f5;
  .font {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    text-align: left;
    color: #262626;
  }
  .el-form-item {
    margin: 0px 0px 0px 8px !important;
  }
}
.contentCont {
  height: calc(100% - 120px);
  overflow: auto;
  padding: 24px 24px 0 24px;
  .contentInner {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
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
  padding: 10px 24px !important;
}
</style>
