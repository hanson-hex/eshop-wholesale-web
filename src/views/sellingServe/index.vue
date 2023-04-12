<template>
  <div class="classification">
    <div class="card">
      <div class="staus_bar fl_bet border">
        <div class="detail_left">
          <div class="fl_cen">
            <div class="status">
              <el-image class="icon_status"
                        :src="getStatus(1, orderList.status)" />
              <div class="name"
                   :class="getStatus(3, orderList.status)">
                {{ getStatus(2, orderList.status) }}
              </div>
            </div>
            <div class="items">
              <div class="title">订单编号</div>
              <div style="height: 22px">{{ orderList.orderCode || '' }}</div>
            </div>
            <div class="items">
              <div class="title">下单时间</div>
              <div style="height: 22px">{{ orderList.orderTime || '' }}</div>
            </div>
            <div v-if="orderList.status == 1 && orderList.payTime"
                 class="items">
              <div class="title">付款时间</div>
              <div style="height: 22px; color: #e4393c">
                {{ orderList.payTime || ' ' }}
              </div>
            </div>
            <div class="items">
              <div class="title">售后电话</div>
              <div style="height: 22px; color: #e4393c">
                {{ orderList.servicePhone || ' ' }}
              </div>
            </div>
          </div>
        </div>
        <div class="detail_right">
          <el-button v-if="Number(orderList.status) == 3"
                     type="danger emphasis_btn">确认收货</el-button>
          <el-button v-if="Number(orderList.status) == 1"
                     class="cancel_btn"
                     :loading="isLoading"
                     @click.stop="cancelClick(id)">取消订单</el-button>
        </div>
      </div>
      <Step :stepArray="stepArray"
            :indexStep="2"
            :lineWord="true" />
    </div>
    <div class="info card">
      <el-descriptions title="售后单据信息">
        <el-descriptions-item label="申请类型">退货</el-descriptions-item>
        <el-descriptions-item label="申请金额">18100000000</el-descriptions-item>
        <el-descriptions-item label="申请原因">苏州市</el-descriptions-item>
        <el-descriptions-item label="申请用户">张三 </el-descriptions-item>
        <el-descriptions-item label="申请时间">2023-03-20</el-descriptions-item>
        <el-descriptions-item label="问题描述">江苏省苏州市吴中区吴中大道</el-descriptions-item>
        <el-descriptions-item label="售后凭证">
          <el-image :src="avater"
                    style="width: 150px; height: 150px;padding: 10px" />
          <el-image :src="avater"
                    style="width: 150px; height: 150px;padding: 10px" />
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div class="info card fl_cen">
      <div class="info_list">
        <div class="title">商户收货信息</div>
        <div class="lists">
          <div class="item">
            <span>收货人：</span>{{ orderList.contactsName || '--' }}
          </div>
          <div class="item">
            <span>地址：</span>{{ orderList.province || ''
            }}{{ orderList.city || '' }}{{ orderList.district || ''
            }}{{ orderList.address || '' }}
          </div>
          <div class="item">
            <span>手机号：</span>{{ orderList.contactsPhone || '--' }}
          </div>
        </div>
      </div>
      <div class="info_list">
        <div class="title">配送信息</div>
        <div class="lists">
          <div class="item">
            <span>快递公司：</span>{{ orderList.kuaidiName || '--' }}
          </div>
          <div class="item">
            <span>快递单号：</span>{{ orderList.number || '--' }}
          </div>
          <div class="item">
            <span>预计送达：</span>{{ orderList.finishDate || '--' }}
          </div>
        </div>
      </div>
      <div class="info_list">
        <div class="title">付款信息</div>
        <div class="lists">
          <div class="item">
            <span>商品总额：</span>{{ orderList.amount || '--' }}
          </div>
          <div class="item"><span>支付方式：</span>在线支付</div>

          <div class="item">
            <span>付款时间：</span>{{ orderList.payTime || '' }}
          </div>
        </div>
      </div>
    </div>
    <div class="info card">
      <div style="color: #f56c6c; font-weight: 600">
        {{ expressData.step || '暂无物流数据' }}
      </div>
      <el-collapse v-model="activeName"
                   v-if="expressData.child && expressData.child.length > 0">
        <el-collapse-item name="1">
          <template slot="title">
            <div style="line-height: 20px; height: 80px">
              <div style="color: #f56c6c; font-weight: 600">
                {{ expressData.step || '暂无物流数据' }}
              </div>
              <div>
                {{ expressData.description || '' }}
              </div>
            </div>
          </template>
          <div style="padding-top: 10px">
            <el-timeline v-if="expressData.child && expressData.child.length > 0">
              <el-timeline-item v-for="(activity, index) in expressData.child"
                                :key="index"
                                color="#0da1a8">
                <div style="font-weight: 600">{{ activity.step || '' }}</div>
                <div>{{ activity.description || '' }}</div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="commodity card">
      <publicTable :table-data="list"
                   :colum-obj="columObj"
                   :page-obj="pageObj" />
    </div>
    <div class="info card"
         style="height:300px">
      <el-steps direction="vertical"
                :active="1">
        <el-step title="对话1"
                 description="这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="对话2"
                 description="这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
        <el-step title="对话3"
                 description="这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字这是一段很长很长很长的描述性文字"></el-step>
      </el-steps>

    </div>
    <el-dialog :visible.sync="isQrCode"
               width="800px"
               :destroy-on-close="true"
               :close-on-click-modal="false"
               :close-on-press-escape="false"
               :before-close="qrCodeBtn"
               class="codeCont">
      <div class="qrcodeCon">
        <p class="qrTip">请尽快付款！订单号：{{ orderList.orderCode }}</p>
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
import {
  getPurchaseDetail,
  cancelPurchase,
  getKuaidi,
  payResult,
  payPurchase,
  expressStep,
  saleKuaidi
} from '@/api/servicecenter/pendingPayment.js'
import QRCode from 'qrcodejs2'
import { mapState } from 'vuex'
import { checkImages } from '@/utils/status'
import { returnFloat, correspondingVal, accMul } from '@/utils/validate'
import publicTable from '@/components/publicTable'
import { mapGetters } from 'vuex'
import Step from '@/components/step'
import avater from "/public/img/default.png"
export default {
  name: 'PurchaseDetail',
  components: { publicTable, Step },
  data () {
    return {
      activeName: '1', // 手风琴展开
      expressData: {
        step: ''
      },
      radio: '',
      isBtnLoading: false,
      form: {
        nums: '',
        companyName: '',
        company: ''
      },
      isLoading: false,
      paydialog: false,
      id: '',
      orderId: '',
      list: [],
      orderList: {},
      icon: require('@/icons/img/icon_detail_status.png'),
      indexStep: 0,
      pageObj: {
        // 分页对象
        isShow: false,
        position: 'right', // 分页组件位置
        total: 0,
        page: {
          size: 10,
          current: 1,
          goodsName: '',
          supplierId: '',
          type: ''
        }
      },
      tableData: [],
      columObj: {
        tableName: 'multipleTable',
        // 选择框
        isShow: false,
        selection: false,
        // 选择框根据条件是否可选
        selectable: () => {
          return true
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
            width: '300',
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
            align: 'center',
            ownDefinedReturn: (row) => {
              // returnFloat(accMul(row.qty, row.price))
              return row.specification
            }
          },
          {
            ownDefined: true,
            prop: 'price',
            label: '单价',
            width: '',
            align: 'center',
            ownDefinedReturn: (row) => {
              return returnFloat(row.price)
            }
          },

          {
            text: true,
            prop: 'qty',
            label: '数量',
            width: '200',
            align: 'center'
          },
          {
            ownStyle: true,
            prop: 'smallPrice',
            label: '小计',
            width: '',
            align: 'center',
            ownDefinedReturn: (row) => {
              return returnFloat(accMul(row.qty, row.price))
            }
          }
        ]
      },
      isQrCode: false,
      qrcode: null,
      total: '',
      orderPayId: '',
      status: '',
      stepArray: [{ name: '提交申请' }, { name: '卖家审批' }, { name: '买家退货' }, { name: '卖家收货' }, { name: '退款中' }, { name: '完成' }],
      avater: avater
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    ...mapState('App', {
      selectList: 'selectList'
    }),
    getStatus () {
      return (type, status) => checkImages(type, status)
    }
  },
  methods: {
    handleSelect (e) {
      this.form.company = e.value
    },
    querySearchAsync (queryString, cb) {
      getKuaidi({ name: queryString }).then((res) => {
        console.log(res.data)
        cb(res.data)
      })
    },
    addKuaidi () {
      this.isBtnLoading = true
      let data = {
        id: this.id,
        kuaidiId: this.form.company,
        number: this.form.nums
      }
      if (!this.form.companyName) {
        this.$message.error('请填写快递公司～')
        this.isBtnLoading = false
        return false
      }
      if (!this.form.nums) {
        this.$message.error('请填写快递单号～')
        this.isBtnLoading = false
        return false
      }
      saleKuaidi(data)
        .then((response) => {
          let res = response.data
          if (res.code == 0) {
            this.isBtnLoading = false
            this.$message.success('快递信息提交成功～')
            this.getData()
          }
        })
        .catch(() => {
          this.$message.error('快递信息提交失败～')
          this.isBtnLoading = false
        })
    },

    // 页码变化
    handleCurrentChange (e) {
      this.pageObj.pageData.current = e
    },
    // 条数变化
    handleSizeChange (e) {
      this.pageObj.pageData.size = e
      this.pageObj.pageData.current = 1
    },
    statusBtn (row) {
      return correspondingVal(
        'basePurchaseOrderEnum',
        row,
        'status',
        this.selectList
      )
    },
    qrCodeCreate () {
      payPurchase(this.id)
        .then((res) => {
          if (res.code == 0) {
            this.isQrCode = true
            this.qrlink = res.data.qrCode
            this.orderId = res.data.orderId
            this.total = res.data.amount
            this.$nextTick(() => {
              this.newqrcode()
              let setTime = setInterval(() => {
                if (this.isQrCode) {
                  if (this.status == '2') {
                    clearInterval(setTime)
                    this.isQrCode = false
                    this.$message.success('订单支付成功')
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
            this.$message.error(res.data.msg)
          }
        })
        .catch(() => {
          this.isQrCode = false
          this.$message.error('请求错误，请联系管理员')
        })
    },
    qrCodeBtn () {
      this.status = '3'
      this.isQrCode = false
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
    getData () {
      getPurchaseDetail(this.id)
        .then((res) => {
          this.list = res.data.orderDetailVo
          this.statusStyle(res.data.status)
          this.orderList = res.data
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    // 取消订单
    cancelClick (id) {
      this.isLoading = true
      this.$confirm('订单取消后，待付款订单消失，需要您再次下单', '取消订单', {
        confirmButtonText: '确认',
        cancelButtonText: '返回',
        type: 'warning'
      })
        .then(() => {
          cancelPurchase(id)
            .then((response) => {
              let res = response.data
              if (res.code == 0) {
                this.isLoading = false
                this.$message.success('订单取消成功')
                this.getData()
              }
            })
            .catch(() => {
              this.isLoading = false
            })
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    statusStyle (status) {
      status = Number(status)
      // 1.待付款,2.待发货, 3.已发货,4.待收货，5.交易取消, 6申请退款 7.已退款  8.已完成
      if (status == 1) {
        this.indexStep = 1
      } else if (status == 2) {
        this.indexStep = 2
      } else if (status == 3) {
        this.indexStep = 3
      } else if (status == 4) {
        this.indexStep = 4
      } else if (status == 8) {
        this.indexStep = 5
      } else {
        this.indexStep = 0
      }
    }
  },
  mounted () {
    const { id, orderId } = this.$route.query
    this.id = '1635171488871112706'
    this.orderId = orderId
    this.getData()
    expressStep({ orderId: this.id }).then((res) => {
      if (res.code == 0 && res.data) {
        this.expressData = res.data
      } else {
        // this.$message.error('暂无数据')
      }
    })
  }
}
</script>
<style lang="scss" scoped>
@import "../../styles/main";
.classification {
  background: #eee;
  padding: 0px 0px;
  .commodity {
    ::v-deep .el-table {
      .el-table__header {
        thead {
          th {
            background-color: #fff !important;
          }
        }
      }
    }
  }
}
</style>
