<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="classification contentInner">
    <div class="headerTop">
      <el-button size="small"
                 type="primary"
                 icon="el-icon-shopping-cart-1"
                 @click="goCart()">购物车( {{ number }}
        )</el-button>
    </div>
    <div class="flex-box">
      <el-row :gutter="16"
              style="width:100%">
        <el-col :span="3">
          <el-select v-model="pageObj.page.goodsOneClassId"
                     size="small"
                     placeholder="一级分类"
                     clearable
                     style="width:100%"
                     @change="changeOneClassId">
            <el-option v-for="item in goodsOneClassIdOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="pageObj.page.goodsTwoClassId"
                     size="small"
                     placeholder="二级分类"
                     clearable
                     style="width:100%"
                     @change="changeTwoClassId">
            <el-option v-for="item in goodsTwoClassIdOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="pageObj.page.goodsThreeClassId"
                     size="small"
                     placeholder="三级分类"
                     clearable
                     style="width:100%">
            <el-option v-for="item in goodsThreeClassIdOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <!-- <el-select v-model="pageObj.page.factory" placeholder="厂商" @change="getList(1)" clearable>
            <el-option v-for="item in selectList.baseSupplierTypeEnums" :key="item.code" :label="item.value" :value="item.code">
            </el-option>
                </el-select> -->
          <el-input v-model="pageObj.page.factory"
                    size="small"
                    placeholder="生产厂商"
                    clearable
                    @keyup.enter.native="getList(1)" />
        </el-col>
        <!-- <div class="tab_sea" :span="4">
          <el-select v-model="pageObj.page.type" placeholder="商品类型" clearable @change="getList(1)">
            <el-option v-for="item in selectList.baseTypeEnum" :key="item.code" :label="item.value" :value="item.code" />
          </el-select>
              </div> -->
        <el-col :span="3">
          <el-input v-model="pageObj.page.goodsName"
                    size="small"
                    placeholder="商品名称"
                    clearable
                    @keyup.enter.native="getList(1)" />
        </el-col>
        <el-col :span="3">
          <el-input v-model="pageObj.page.approvalNumber"
                    size="small"
                    placeholder="批准文号"
                    clearable
                    @keyup.enter.native="getList(1)" />
        </el-col>
      </el-row>
      <div style="display:flex;float: right;">
        <el-button size="small"
                   type="primary"
                   @click="getList(1)">查询</el-button>
        <el-button size="small"
                   @click="reset()">重置</el-button>
      </div>
    </div>
    <div class="contentCont"
         ref="tableCont">
      <div class="contentInner"
           :style="{ 'width': `${widthNum * 370}px` }">
        <GoodsCard v-for="(item,index) in tableData"
                   :key="index"
                   :item="item" />
      </div>
    </div>
    <div class="el-page">
      <Pagination :total="pageObj.total"
                  :page-sizes="pageSizes"
                  :page.sync="pageObj.page.current"
                  :limit.sync="pageObj.page.size"
                  @pagination="changeSize" />
    </div>
    <!-- //添加购物车 -->
    <el-dialog title="加入购物车"
               :visible.sync="dialogAdd"
               width="450px"
               :before-close="cancelAddCart"
               class="pop_con">
      <div class="pop_detail fl_center">
        <div class="pop_element">
          <!-- <div class="list"><span>编号：</span>{{ popCon.code || '--' }}</div> -->
          <div class="list">
            <span><img :src="popCon.image || avater"
                   alt=""
                   style="width:80px;height:80px"></span>
            <div class="listHeader">
              {{ popCon.name || '--' }}
              <span>
                {{ popCon.specification || '--' }}
              </span>
              <p class="money">
                ￥{{ listData[activeIndex].salePrice }}
              </p>
            </div>
          </div>
          <div class="guige">
            <div v-for="(item, index) in listData"
                 :key="index"
                 style="margin-bottom:10px">
              <span :class="activeIndex == index ? 'avtiveChoice' : 'everyOne'"
                    @click="choiceBox(index)"> {{
                item.goodsSkuName }}
                <span v-if="activeIndex == index"
                      class="imgChoice">
                  <img src="../../assets/选中.png"
                       alt="">
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <div class="dialog-bottom">
          <el-input-number v-model="qty"
                           size="small"
                           :min="listData[activeIndex].startWholesale"
                           :max="listData[activeIndex].goodsSkuInventory"
                           label="描述文字" />
          <span style="margin-left:10px"
                class="number">{{ listData[activeIndex].goodsSkuUnit|| '' }}</span>
          <span style="margin-left:10px"
                class="number">
            数量：{{ listData[activeIndex].goodsSkuInventory }}
          </span>
        </div>
        <el-button size="mini"
                   icon="el-icon-shopping-cart-1"
                   type="primary"
                   @click="confirmAddCart"> 加入购物车</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import avater from "/public/img/default.png"
import { getPage } from '@/api/shoppingcart/shoppingcart'
import { goodsclassOne, goodsclassTwo } from '@/api/classificationmanagement.js'
import { mapGetters, mapState } from 'vuex'
import { addCart, goodsPage, clinicSku } from '@/api/drugprocurement/buygoods'
import Pagination from '@/components/Pagination'
import GoodsCard from '@/components/goodsCard'
export default {
  components: { Pagination, GoodsCard },
  data () {
    return {
      avater: avater,
      listData: [
        {
          guige: '一箱 0.5g*5袋/盒',
        },
        {
          guige: '一箱 0.5g*5袋/盒',
        }
      ],
      activeIndex: 0, // 选中的第几个
      number: 0, // 购物车数量
      numberTotal: 999, // 库存数量
      goodsOneClassIdOptions: [],
      goodsTwoClassIdOptions: [],
      goodsThreeClassIdOptions: [],
      pageObj: {
        // 分页对象
        position: 'right', // 分页组件位置
        total: 0,
        page: {
          size: 10,
          current: 1,
          // pageSizes: [12, 24, 36, 48],
          goodsName: '',
          factory: '',
          approvalNumber: '',
          goodsOneClassId: '',
          goodsTwoClassId: '',
          goodsThreeClassId: ''
        }
      },
      tableData: [],

      // 详情信息控制
      isDrawer: false,
      // 详情的对象
      goodsDetailcon: {},
      dialogAdd: false,
      popCon: {},
      qty: 1,
      dialogquikly: false,
      widthNum: 0,
      heightNum: 0,
      pageSizes: []
    }
  },
  computed: {
    ...mapGetters(['permissions', 'sidebar']),
    ...mapState('App', {
      selectList: 'selectList'
    })
  },
  watch: {
    'sidebar.opened': {
      handler (newVal, oldVal) {
        this.widthNum = Math.floor((this.$refs.tableCont.clientWidth - 48) / 370)
      }
    }

  },
  beforeCreate () { },
  created: function () {

  },
  beforeMount () { },
  mounted () {
    // 在模板渲染成html后调用
    this.setSize()
  },
  beforeUpdate () { },
  updated () { },
  methods: {
    setSize (e) {
      this.widthNum = Math.floor((this.$refs.tableCont.clientWidth - 18) / 370)
      this.heightNum = Math.ceil(this.$refs.tableCont.clientHeight / 240)
      this.pageObj.page.size = this.widthNum * this.heightNum
      this.pageSizes = [this.pageObj.page.size, this.pageObj.page.size * 2, this.pageObj.page.size * 3, this.pageObj.page.size * 4]
      this.queryTableData()
      // 在模板渲染成html前调用
      this.query()
      this.getList(1)
    },
    // 查询上方购物车的数量
    queryTableData () {
      getPage()
        .then((res) => {
          let list = res.data ? res.data.cartVos : []
          this.number = list ? list.length : 0
        })
        .catch((err) => {
          this.$message.error(err.msg)
        })
    },
    // 选中对应的规格
    choiceBox (index) {
      this.activeIndex = index
      this.qty = this.listData[index].startWholesale
    },
    // 跳到购物车
    goCart () {
      this.$router.push('/drugprocurement/shoppingcart-shoppingcart')
    },
    // 重置查询
    reset () {
      this.pageObj = {
        // 分页对象
        position: 'right', // 分页组件位置
        total: 0,
        page: {
          size: 10,
          current: 1,
          goodsName: '',
          factory: '',
          approvalNumber: '',
          goodsOneClassId: '',
          goodsTwoClassId: '',
          goodsThreeClassId: ''
        }
      }
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
            this.pageObj.page.goodsOneClassId = this.goodsOneClassIdOptions[0].id
            // this.goodsclassTwo(this.goodsOneClassIdOptions[0].id)
          } else {
            this.pageObj.page.goodsOneClassId = ''
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
            this.pageObj.page.goodsTwoClassId = ''
            this.pageObj.page.goodsThreeClassId = ''
            this.goodsThreeClassIdOptions = []
            // this.goodsclassThree(this.goodsTwoClassIdOptions[0].id)
          } else {
            this.pageObj.page.goodsTwoClassId = ''
            this.pageObj.page.goodsThreeClassId = ''
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
            this.pageObj.page.goodsThreeClassId = ''
          } else {
            this.pageObj.page.goodsThreeClassId = ''
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
    // 条数变化
    changeSize () {
      this.getList()
    },
    // 查询列表
    getList (current) {
      if (current) {
        this.pageObj.page.current = current
      }
      goodsPage(this.pageObj.page)
        .then((res) => {
          if (res.data && res.data.records) {
            this.tableData = res.data.records
            this.pageObj.total = res.data.total
          } else {
            this.tableData = []
            this.pageObj.total = 0
          }
        })
        .catch(() => {
        })
    },
    // 添加购物车
    handleAddbuy (row) {
      this.popCon = row
      let params = {
        goodsId: row.goodsId,
        shopId: row.shopId
      }
      clinicSku(params).then(res => {
        if (res.code == 0) {
          this.dialogAdd = true
          this.listData = res.data
          this.qty = this.listData[0].startWholesale
        }
      })
    },
    // 确定添加购物车
    confirmAddCart () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      })
      let params = {
        goodsSkuId: this.listData[this.activeIndex].goodsSkuId,
        qty: this.qty
      }
      addCart(params)
        .then((res) => {
          if (res.code == 0) {
            this.queryTableData()
            this.$message.success('添加购物车成功～')
            loading.close()
            this.dialogAdd = false
            this.qty = 1
            this.activeIndex = 0
            // this.popCon.id = ''
          }
        })
        .catch((res) => {
          // console.log(res)
          this.$message.error('提交购物车失败～')
          loading.close()
          this.isDrawer = false
          this.dialogAdd = false
          this.qty = 1
          this.activeIndex = 0
          // this.popCon.id = ''
        })
    },
    // 取消添加购物车
    cancelAddCart () {
      this.dialogAdd = false
      this.dialogquikly = false
      this.qty = 1
      this.activeIndex = 0
    },
  },
  watch: {
    // 监听
  },
  destroyed () {
    // 销毁后
  }
}
</script>
<style lang="scss" scoped>
.contentInner {
  padding: 0px;
  margin: 20px auto;
}

.classification {
  overflow: hidden;

  .headerTop {
    padding: 0px 24px;
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid #f5f5f5;
  }

  .flex-box {
    width: 100%;
    display: flex;
    // padding: 10px 0;
    // flex-wrap: wrap;
    padding: 12px 24px;

    // border-bottom: 1px solid #f5f5f5;
    .el-row {
      .el-col {
        padding-right: 0px !important;
      }
    }

    .tab_sea {
      padding: 0px 5px;
    }
  }

  .contentCont {
    height: calc(100% - 170px);
    overflow: auto;
    padding: 0 10px;

    .contentInner {
      height: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }

  .el-page {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }

  .tab_sea {
    margin-bottom: 20px;
  }

  .pop_detail {
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }

  .pop_element {
    // margin-right: 40px;
    text-align: left;
    // padding-top: 20px;

    .list {
      display: flex;
      margin-bottom: 10px;
      font-size: 14px;
      color: #333;

      .listHeader {
        padding-left: 24px;
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #262626;

        .money {
          font-size: 16px;
          font-family: PingFang SC, PingFang SC-Medium;
          font-weight: 500;
          text-align: left;
          color: #f99b0d;
        }
      }

      span {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #595959;
      }
    }

    .guige {
      // padding-top: 10px;
      display: flex;
      flex-wrap: wrap;

      .everyOne {
        cursor: pointer;
        display: inline-block;
        margin-right: 16px;
        position: relative;
        background: #ffffff;
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #595959;
        padding: 5px 10px;
      }

      .avtiveChoice {
        cursor: pointer;
        display: inline-block;
        margin-right: 16px;
        position: relative;
        background: #ffffff;
        border: 1px solid #0da1a8;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #0da1a8;
        padding: 5px 10px;

        .imgChoice {
          position: absolute;
          right: -1px;
          bottom: -3px;
        }
      }
    }

    ::v-deep .el-button {
      font-size: 14px;
    }
  }

  .dialog-footer {
    margin-top: 0px;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
  }

  .dialog-bottom {
    .number {
      font-size: 14px;
      font-family: PingFang SC, PingFang SC-Regular;
      font-weight: 400;
      text-align: left;
      color: #595959;
    }
  }
}

::v-deep .el-dialog__footer {
  border-top: 1px solid #f5f5f5;
}

::v-deep .el-dialog__body {
  padding-bottom: 10px;
}
</style>
