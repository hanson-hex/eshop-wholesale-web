<template>
  <div class="classification">
    <el-descriptions title="收货人信息"
                     direction="vertical"
                     :column="6"
                     border
                     label-class-name="items" />
    <div class="addressDesc">
      <div class="descLeft">
        <span class="purseName">{{ addressData.shopName || '--' }}</span>
        <p class="detail">
          {{ addressData.concatName || '--' }} &nbsp;&nbsp;{{
            addressData.concatPhone || '--'
          }}
          &nbsp;&nbsp;{{ addressData.provinceName || '--' }}&nbsp;&nbsp;{{
            addressData.cityName || '--'
          }}&nbsp;&nbsp;{{ addressData.areaName || '--' }}&nbsp;&nbsp;{{
            addressData.address || '--'
          }}
        </p>
      </div>
      <!--      <div class="descRight">
        <el-button type="text" class="text_btn" @click="dialogAddress = true"
          >选择地址</el-button
        >
      </div>-->
    </div>
    <el-descriptions title="商品清单"
                     direction="vertical"
                     class="goods" />
    <publicTable :table-data="list"
                 :colum-obj="columObj"
                 :page-obj="pageObj"
                 @switchChange="switchChange"
                 @editInputBlur="editInputBlur"
                 @rowClick="rowClick"
                 @handleSizeChange="handleSizeChange"
                 @handleCurrentChange="handleCurrentChange"
                 @handleSelectionChange="handleSelectionChange" />
    <div slot="footer"
         class="dialog-footer">
      <div>
        应付总额： <span>¥{{ total }}</span>
      </div>
      <div>
        <el-button size="small"
                   @click="cancels">取 消</el-button>
        <el-button type="primary"
                   size="small"
                   :disabled="isLoading"
                   :loading="submitLoading"
                   @click="addSubmit">提交订单</el-button>
      </div>
    </div>

    <el-dialog title="选择地址"
               :visible.sync="dialogAddress"
               width="800px"
               :before-close="handleClose"
               class="goods_con">
      <div class="pop_detail">
        <!--  -->
        <div v-if="gridData&&gridData.length>0">
          <div v-for="(item, index) in gridData"
               :key="index"
               :class="[
            'fl_bet',
            'addressList',
           selectionVal == item.id ? 'activeBg' : '',
          ]"
               @click="getRow(item)">
            <div class="descLeft">
              <span class="purseName">{{ item.name || '--' }}</span>
              <p class="detail">
                {{ item.contactsName || '--' }} &nbsp;&nbsp;{{
                item.contactsPhone || '--'
              }}
                &nbsp;&nbsp;{{ item.province || '--' }}&nbsp;&nbsp;{{
                item.city || '--'
              }}&nbsp;&nbsp;{{ item.district || '--' }}&nbsp;&nbsp;{{
                item.address || '--'
              }}
              </p>
            </div>
            <div class="descRight">
              <el-radio v-model="selectionVal"
                        :label="item.id"
                        @change="getRow(item)">&nbsp;</el-radio>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="支付窗口"
               :visible.sync="dialogBtob"
               width="800px"
               :before-close="handleClose"
               class="goods_con">
      <payCont :data-option="payData"
               @suceeBtn="suceeBtn" />
    </el-dialog>
    <el-dialog :visible.sync="isQrCode"
               width="800px"
               :destroy-on-close="true"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :before-close="qrCodeBtn"
               class="codeCont">
      <div class="qrcodeCon">
        <p class="qrTip">订单提交成功，请尽快付款！订单号：{{ orderCode }}</p>
        <p class="qrdesc">请您在5分钟内完成支付，否则订单会被自动取消！</p>
        <div class="qrCont">
          <p>
            应付金额：
            <span>¥{{ total }}</span>
          </p>
          <div id="qrcode"
               ref="qrcode"
               class="qrcodeImg" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import { payResult } from '@/api/servicecenter/pendingPayment.js'
import { addPurchase, address, goodesList } from '@/api/shoppingcart/shoppingcart'
// import { mapGetters, mapState } from 'vuex'
import publicTable from '@/components/publicTable'
import { correspondingVal } from '@/utils/validate'
import payCont from '@/layout/components/pay/pay'
export default {
  name: 'PurchaseOrder',
  components: { publicTable, payCont },
  data () {
    return {
      qrlink: '',
      orderId: '',
      status: '',
      isQrCode: false,
      dialogBtob: false,
      orderCode: '',
      pageObj: {
        // 分页对象
        position: 'right', // 分页组件位置
        total: 0,
        pageData: {
          size: 10,
          current: 1,
          pages: 0,
          goodsName: '',
          supplierId: '',
          type: ''
        }
      },
      tableData: [],
      columObj: {
        // 选择框
        isShow: false,
        selection: false,
        // 选择框根据条件是否可选
        selectable: () => {
          return false
        },
        lazy: 'true',
        loading: false,
        // column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
        // prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
        columnData: [
          {
            imageText: true,
            prop: 'image',
            prop2: 'name',
            prop3: 'factory',
            label: '商品信息',
            width: '600',
            align: 'left',
            sortable: false,
            ownDefinedReturn: (row) => {
              return row.factory
            }
          },
          {
            text: true,
            prop: 'specification',
            label: '规格',
            width: '',
            align: 'left'
          },
          {
            text: true,
            prop: 'salePrice',
            label: '单价',
            width: '100',
            align: 'center'
          },
          // {
          //   text: true,
          //   prop: 'specification',
          //   label: '规格',
          //   width: '',
          //   align: 'center',
          //   ownDefinedReturn: (row) => {
          //     return row.specification
          //   }
          // },
          {
            text: true,
            prop: 'qty',
            label: '数量',
            width: '100',
            align: 'center'
          },
          // {
          //   ownDefined: true,
          //   prop: 'unit',
          //   label: '单位',
          //   width: '',
          //   align: 'right',
          //   ownDefinedReturn: (row) => {
          //     return correspondingVal(
          //       'baseUnitEnum',
          //       row,
          //       'unit',
          //       this.selectList
          //     )
          //   }
          // }
        ]
      },
      dialogAddress: false,
      list: [],
      total: '',
      isLoading: false,
      addressData: {},
      gridData: [],
      selVisible: false,
      goodsId: '11',
      qty: 1,
      submitLoading: false,
      selectionVal: '',
      goodsQtyVoList: [],
      payData: {}
    }
  },
  computed: {
    // ...mapGetters(['permissions']),
    // ...mapState('App', {
    //   selectList: 'selectList'
    // })
  },
  methods: {
    suceeBtn () {
      this.dialogBtob = false
      this.$router.push({
        path: '/ordercenter/ordercenter-procurement'
      })
      if (this.$route.query && this.$route.query.id) {
        this.goodsId = this.$route.query.id
        this.goodsQtyVoList = [{ id: this.$route.query.id, qty: 1 }]
        this.getcon({ id: this.$route.query.id, qty: 1 }, false)
      }
      if (this.$route.query && this.$route.query.ids) {
        this.getcon(JSON.parse(this.$route.query.ids), true)
      }
    },
    handleSelectionChange (val) {
      // console.log(val, 858585)
    },
    rowOperation (row, $index) {
      // console.log(row, $index)
    },
    switchChange (row, $index, prop) {
      // console.log(row, $index, prop)
    },
    rowClick (row, column) {
      // 点击行触发，编辑点击的所在列，排除selection选择框
      if (
        column.type != 'selection' &&
        this.columObj.columnData[column.index].editRow === null
      ) {
        this.columObj.columnData[column.index].editRow = row.rowIndex
      }
    },
    editInputBlur (row, $index, prop, columIndex) {
      this.columObj.columnData[columIndex].editRow = null
    },
    // 页码变化
    handleCurrentChange (e) {
      this.pageObj.pageData.page = e
    },
    // 条数变化
    handleSizeChange (e) {
      this.pageObj.pageData.size = e
      this.pageObj.pageData.page = 1
    },
    numBtn (row) {
      // console.log(row)
      this.getcon(row, true, true)
    },
    getRow (item) {
      this.addressData = item
      this.selectionVal = item.id
      this.dialogAddress = false
    },
    handleClose () {
      this.dialogAddress = false
      this.dialogBtob = false
    },
    getData () {
      this.isLoading = true
      address()
        .then((res) => {
          if (res.code == 0) {
            this.gridData = res.data || []
            this.addressData = res.data || {}
            this.selectionVal = this.addressData.id || ''
          }
          this.isLoading = false
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    // 关闭扫码支付页面
    qrCodeBtn () {
      this.status = '3'
      this.isQrCode = false
    },
    // 提交订单
    getcon (row, type, addtype) {
      this.isLoading = true
      let params = this.goodsQtyVoList
      if (!type) {
        params = [{ goodsSkuId: row.id, qty: row.qty }]
      } else {
        if (addtype) {
          let goodsQtyVoList = []
          this.list.forEach((res) => {
            goodsQtyVoList.push({ goodsSkuId: res.id, qty: res.qty })
          })
          params = goodsQtyVoList
        } else {
          let goodsQtyVoList = []
          row.forEach((res) => {
            goodsQtyVoList.push({ goodsSkuId: res.id, qty: res.qty })
          })
          params = goodsQtyVoList
        }
      }
      goodesList(params)
        .then((res) => {
          console.log(res, 777)
          // this.$nextTick(() => {
          this.list = res.data.quickVoList
          this.total = res.data.sumPrice
          this.isLoading = false
          // })
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    newqrcode () {
      if (this.qrcode) {
        this.qrcode.clear()
      }
      this.qrcode = new QRCode('qrcode', {
        width: 200, // 设置宽度，单位像素
        height: 200, // 设置高度，单位像素
        text: this.qrlink // 设置二维码内容或跳转地址
      })
    },
    payResult (id) {
      payResult(id).then((res) => {
        this.status = res.data.status
      })
    },
    // 提交订单
    addSubmit () {
      this.submitLoading = true
      if (Object.keys(this.addressData).length == 0) {
        this.$message.error('请添加地址～')
      } else {
        let goodsListVo = []
        this.list.forEach((res) => {
          let item = {
            goodsSkuId: res.goodsSkuId,
            // salePrice: res.salePrice,
            // purchasePrice: res.purchasePrice,
            qty: res.qty
          }
          goodsListVo.push(item)
        })
        let items = {
          addressId: this.addressData.id,
          goodsListVo: goodsListVo
        }
        // console.log(items);
        // return;
        addPurchase(items)
          .then((res) => {
            if (res.code == 0) {
              this.$message.success('提交订单成功')
              this.payData = res.data
              this.orderCode = res.data.orderCode
              // this.payData.amount = this.payData.amount.toFixed(2)
              if (res.data.qrCode) {
                this.qrlink = res.data.qrCode
                this.orderId = res.data.orderId
                this.isQrCode = true
                this.$nextTick(() => {
                  this.newqrcode()
                  let setTime = setInterval(() => {
                    if (this.isQrCode) {
                      if (this.status == '2') {
                        clearInterval(setTime)
                        this.isQrCode = false
                        this.$message.success('订单支付成功')
                        this.$router.push({
                          path: '/ordercenter/ordercenter-procurement',
                          query: {
                            id: res.data.id,
                            orderId: res.data.orderId
                          }
                        })
                      } else if (this.status == '3') {
                        clearInterval(setTime)
                      } else {
                        this.payResult(res.data.id)
                      }
                    } else {
                      clearInterval(setTime)
                    }
                  }, 2000)
                })
              } else {
                this.dialogBtob = true
              }
            } else {
              this.$message.error(res.msg)
            }
            this.submitLoading = false
          })
          .catch(() => {
            this.submitLoading = false
          })
      }
    },
    cancels () {
      // this.$router.back()
      this.$router.push('/drugprocurement/shoppingcart-shoppingcart')
    },
    seladdress (row, column, event) {
      event.stopPropagation()
      this.addressData = row
      setTimeout(() => {
        this.selVisible = false
      }, 300)
    }
  },
  created () {
    // if (this.$route.query && this.$route.query.id) {
    //   this.goodsId = this.$route.query.id
    //   console.log(this.goodsId)
    //   this.goodsQtyVoList = [{ id: this.$route.query.id, qty: 1 }]
    //   this.getcon({ id: this.$route.query.id, qty: 1 }, false)
    // }
    // if (this.$route.query && this.$route.query.ids) {
    //   this.getcon(JSON.parse(this.$route.query.ids), true)
    // }
    // this.getData()
  },
  mounted () {
    if (this.$route.query && this.$route.query.id) {
      this.goodsId = this.$route.query.id
      console.log(this.goodsId)
      this.goodsQtyVoList = [{ id: this.$route.query.id, qty: 1 }]
      this.getcon({ id: this.$route.query.id, qty: 1 }, false)
    }
    if (this.$route.query && this.$route.query.ids) {
      this.getcon(JSON.parse(this.$route.query.ids), true)
    }
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/main.css";
.classification {
  padding: 32px 32px 0 32px;
  position: relative;
  .addressDesc {
    width: 100%;
    height: 110px;
    background: rgba(0, 105, 52, 0.04);
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    padding-left: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .descLeft {
      align-items: center;
      .purseName {
        display: inline-block;
        line-height: 32px;
        font-size: 14px;
        font-weight: 600;
        padding: 0 20px;
        border: 1px solid rgba(0, 105, 52, 1);
        border-radius: 4px;
        background: rgba(0, 105, 52, 0.1);
        color: rgba(0, 0, 0, 0.85);
      }
      .detail {
        line-height: 25px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        margin-top: 10px;
      }
    }
    .descRight {
      align-items: center;
      padding: 0px 24px;
    }
  }
  .goods {
    margin-top: 50px;
  }
  .dialog-footer {
    position: relative;
    width: 100%;
    padding: 32px;
    text-align: right;
    div {
      display: block;
      clear: both;
      width: 100%;
      margin-bottom: 20px;
      font-size: 20px;
      span {
        color: red;
        font-size: 28px;
        font-weight: 600;
      }
      button {
        margin-left: 20px;
      }
    }
  }
}
</style>
