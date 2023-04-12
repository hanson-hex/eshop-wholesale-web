<template>
  <div class="comContent">
    <div class="header">
      <span class="font">免审商品</span>
      <el-form ref="formTool"
               :model="formTool"
               :inline="true"
               label-width="120px">
        <el-form-item prop="goodsOneClassId">
          <el-select v-model="formTool.goodsOneClassId"
                     size="small"
                     placeholder="一级分类"
                     clearable
                     style="max-width:130px"
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
                     style="max-width:130px"
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
                     clearable
                     style="max-width:130px">
            <el-option v-for="item in goodsThreeClassIdOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="formTool.name"
                    placeholder="请输入药品名称"
                    size="small"
                    style="max-width:140px" />
        </el-form-item>
        <el-form-item prop="factory">
          <el-input v-model="formTool.factory"
                    placeholder="请输入厂家关键词"
                    size="small"
                    style="max-width:150px" />
        </el-form-item>
        <el-form-item prop="approvalNumber">
          <el-input v-model="formTool.approvalNumber"
                    placeholder="请输入药品批准文号"
                    size="small"
                    style="max-width:160px" />
        </el-form-item>
        <el-form-item>
          <MyButton type="primary"
                    size="small"
                    text="查询"
                    @click="getList()" />
          <el-button size="small"
                     @click="reset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="formDiv">
      <div>无法满足上新需求？</div>
      <el-button type="primary"
                 icon="el-icon-plus"
                 class="bigButton"
                 @click="addProduct()">新增药品
      </el-button>
    </div>
    <div ref="tableCont"
         class="contentCont">
      <div class="contentContinner"
           :style="{ 'width': `${widthNum * 222}px` }">
        <tableItem v-for="(item, idnex) in tableData"
                   :key="idnex"
                   :item="item" />
      </div>
    </div>
    <div class="el-page">
      <Pagination :total="page.total"
                  :page.sync="page.current"
                  :limit.sync="page.size"
                  :page-sizes="pageSizes"
                  @pagination="pageChange" />
    </div>
  </div>
</template>

<script>
import tableItem from './components/tableItem.vue'
import MyButton from '@/components/myButton'
import Pagination from '@/components/Pagination'
import { getNotcheckList } from '@/api/productManage/publishProduct'
import { goodsclassOne, goodsclassTwo } from '@/api/commodityreference'
import { mapGetters } from 'vuex'
export default {
  components: { MyButton, Pagination, tableItem },
  data () {
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
        goodsOneClassId: '',
        goodsTwoClassId: '',
        goodsThreeClassId: '',
        name: '', // 药品名称
        factory: '', // 厂家关键字
        approvalNumber: '' // 批准号
      },
      tableData: [],
      pageSizes: [],
      widthNum: 0,
      heightNum: 0
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ])
  },
  watch: {
    'sidebar.opened': {
      handler (newVal, oldVal) {
        this.widthNum = Math.floor((this.$refs.tableCont.clientWidth - 48) / 222)
      }
    }

  },
  mounted () {
    // 屏幕尺寸变化就重新赋值
    this.setSize()
  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
  methods: {
    setSize (e) {
      this.widthNum = Math.floor((this.$refs.tableCont.clientWidth - 48) / 222)
      this.heightNum = Math.ceil(this.$refs.tableCont.clientHeight / 332)
      this.page.size = this.widthNum * this.heightNum
      this.pageSizes = [this.page.size, this.page.size * 2, this.page.size * 3, this.page.size * 4]
      this.getList()
      this.query()
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
    handleAddbuy (item) { // 加入购物车
      this.$router.push({ path: '/productManage/publishProduct-shopingcart', query: item })
    },
    pageChange (value) {
      this.page.size = value.limit
      this.page.current = value.page
      this.getList()
    },
    reset () {
      this.$refs.formTool.resetFields()
      this.goodsTwoClassIdOptions = []
      this.goodsThreeClassIdOptions = []
      this.getList()
    },
    addProduct (row) {
      console.log(row)
      this.$router.push('/productManage/publishProduct-addProduct')
    },
    getList () {
      const params = {
        current: this.page.current,
        size: this.page.size,
        ...this.formTool
      }
      getNotcheckList(params).then(res => {
        if (res.code === 0) {
          this.tableData = res.data.records
          this.page.total = res.data.total
        }
      })
    },
    handleSelectionChange (val) {
      console.log(val)
    }
  }
}
</script>
<style lang='scss' scoped>
@import "@/styles/variables.scss";

.comContent {
  height: calc(100vh - 130px);
  padding: 0px;

  .header {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
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
}

.formDiv {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 316px;
  height: 60px;
  background: #fafafa;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  margin: 12px 24px 12px 24px;
  color: #595959;

  .bigButton {
    font-size: 16px !important;
    padding: 10px 20px 11px 20px !important;
  }
}

.contentCont {
  height: calc(100% - 210px);
  padding: 0px 24px 0 16px;
  overflow: auto;
  display: flex;
  justify-content: center;

  .contentContinner {
    display: flex;
    margin: 0x auto;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-start;
  }

  // .contentInner {
  //   height: 100%;
  //   display: flex;
  //   justify-content: flex-start;
  //   flex-wrap: wrap;
  //   .itemCont {
  //     width: 18%;
  //     min-width: 200px;
  //     height: 330px;
  //     border: 1px solid #ccc;
  //     margin-right: 20px;
  //     margin-bottom: 10px;
  //     .name {
  //       display: block !important;
  //       font-size: 16px;
  //       font-weight: 600;
  //     }
  //     .factory {
  //       color: #bbb;
  //     }
  //     .itemBox {
  //       padding: 3px 10px;
  //       display: flex;
  //       justify-content: flex-start;
  //       white-space: nowrap;
  //       overflow: hidden;
  //       text-overflow: ellipsis;
  //     }
  //     .itemImg {
  //       height: 180px;
  //       width: 100%;
  //       display: flex;
  //       justify-content: center;
  //     }
  //     .price {
  //       font-weight: 700;
  //       justify-content: end;
  //     }
  //     .shopCar {
  //       margin-top: 20px;
  //       justify-content: center;
  //     }
  //   }
  // }
}

.el-page {
  position: relative;
  float: right;
  padding: 10px 24px 0 24px !important;
}
</style>
