<template>
  <div class="classification">
    <!-- <el-tabs v-model="activeName"
             class="headerTabs"
             @tab-click="handleClick">
      <el-tab-pane label="所有订单"
                   name="first" />
      <el-tab-pane label="待付款"
                   name="1">
        <span v-if="awaitPayQty > 0"
              slot="label">
          待付款
          <el-badge :value="awaitPayQty"
                    class="item" />
        </span>
      </el-tab-pane>
      <el-tab-pane label="待发货"
                   name="2">
        <span v-if="awaitShipmentsQty > 0"
              slot="label">
          待发货
          <el-badge :value="awaitShipmentsQty"
                    class="item" />
        </span>
      </el-tab-pane>
      <el-tab-pane label="已发货"
                   name="3">
        <span v-if="alwaySendQty > 0"
              slot="label">
          已发货
          <el-badge :value="alwaySendQty"
                    class="item" />
        </span>
      </el-tab-pane>
      <el-tab-pane label="待收货"
                   name="4">
        <span v-if="awaitReceivingQty"
              slot="label">
          待收货
          <el-badge :value="awaitReceivingQty"
                    class="item" />
        </span>
      </el-tab-pane>

      <el-tab-pane label="已完成"
                   name="8" />
    </el-tabs> -->
    <Tabs @tab-click="handleClick"
          :tabsList="tabsList"
          :activeName.sync="activeName"></Tabs>
    <div class="search fl_bet">
      <div class="left fl_cen">
        <div>
          <el-input v-model="query.goodsName"
                    size="small"
                    placeholder="商品名称"
                    style="width: 208px"
                    clearable
                    @keyup.enter.native="queryTableData(1)" />
          <el-input v-model="query.code"
                    size="small"
                    placeholder="订单号"
                    style="width: 208px; margin-left: 10px"
                    clearable
                    @keyup.enter.native="queryTableData(1)" />
          <el-input v-model="query.phone"
                    size="small"
                    placeholder="手机号码"
                    style="width: 208px; margin-left: 10px"
                    clearable
                    @keyup.enter.native="queryTableData(1)" />
          <el-date-picker v-model="time"
                          size="small"
                          class="picker"
                          style="margin-left: 10px"
                          type="daterange"
                          align="left"
                          unlink-panels
                          value-format="yyyy-MM-dd"
                          start-placeholder="开始日期"
                          range-separator="-"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                          clearable
                          @change="queryTableData(1)" />
        </div>
        <div>
          <el-button size="small"
                     type="primary"
                     style="margin-left: 10px"
                     @click="queryTableData(1)">查询</el-button>
          <el-button size="small"
                     @click="reset()">重置</el-button>
        </div>
      </div>
    </div>
    <div class="collapse_list tables">
      <Order v-if="tableData.length > 0"
             :loading="loading"
             :router-type="routerType"
             :table-data="tableData"
             @goDetail="goDetail"
             @watchBtn="watchBtn"
             @cancelClick="cancelClick"
             @payBtn="payBtn"
             @goWuliuDetail="goWuliuDetail" />
      <el-empty v-else
                style="height:100%"
                description="暂无数据" />
      <!-- 分页 -->
      <div class="bottom">
        <Pagination :total="query.pages"
                    :page.sync="query.current"
                    :limit.sync="query.size"
                    @pagination="changeSize" />
      </div>

      <el-dialog title="支付窗口"
                 :visible.sync="dialogBtob"
                 width="800px"
                 :before-close="handleClose"
                 class="goods_con"
                 :close-on-click-modal="false">
        <payCont ref="payCont"
                 :data-option="payData"
                 @suceeBtn="suceeBtn" />
      </el-dialog>

      <el-dialog title="支付窗口"
                 :visible.sync="isQrCode"
                 width="800px"
                 :show-close="true"
                 :destroy-on-close="true"
                 :close-on-click-modal="false"
                 :close-on-press-escape="false"
                 :before-close="qrCodeBtn"
                 class="codeCont">
        <div class="qrcodeCon">
          <p class="qrTip">请尽快付款！订单号：{{ orderCode }}</p>
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
      <el-dialog :visible.sync="editorInvoice"
                 width="500px">
        <el-form ref="invoiceForm"
                 :model="invoiceForm"
                 :rules="invoiceRules"
                 label-width="120px">
          <el-form-item label="发票类型"
                        prop="type">
            <el-radio-group v-model="invoiceForm.opentype"
                            disabled>
              <el-radio :label="0">普票</el-radio>
              <el-radio :label="1">专票</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="抬头类型"
                        prop="headerType">
            <el-radio-group v-model="invoiceForm.headerType">
              <el-radio :label="0">个人</el-radio>
              <el-radio :label="1">企业</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="发票抬头"
                        prop="buyerName">
            <el-select v-model="invoiceForm.buyerId"
                       style="width: 260px"
                       placeholder="请选择抬头"
                       @change="selectBtn">
              <el-option v-for="(i, k) in selectedData"
                         :key="k"
                         :label="i.buyerName"
                         :value="i.id">
                <span style="float: left">{{ i.buyerName }}</span>
                <span v-if="i.preferred"
                      style="float: right; color: #0da1a8; font-size: 12px">默认</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="纳税人识别号"
                        prop="name">
            <el-input v-model="invoiceForm.buyerTaxpayerId"
                      disabled
                      style="width: 260px" />
          </el-form-item>
          <p style="margin-bottom: 10px;margin-left: 60px;color: #f99b0c;cursor: pointer;"
             @click="needSelected">
            {{ needCan ? '收起非必要信息' : '展开非必要信息' }}
          </p>
          <div v-if="needCan">
            <el-form-item label="地址">
              <el-input v-model="invoiceForm.buyerAddress"
                        disabled
                        style="width: 260px" />
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="invoiceForm.buyerRecipientPhone"
                        disabled
                        style="width: 260px" />
            </el-form-item>
            <el-form-item label="开户行">
              <el-input v-model="invoiceForm.buyerBank"
                        disabled
                        style="width: 260px" />
            </el-form-item>
            <el-form-item label="开户行账号">
              <el-input v-model="invoiceForm.buyerAccount"
                        disabled
                        style="width: 260px" />
            </el-form-item>
          </div>
          <el-form-item label="发票内容">
            <el-radio-group v-model="invoiceForm.desc">
              <el-radio :label="1">商品明细</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="邮箱"
                        prop="name">
            <el-input v-model="invoiceForm.buyerRecipientMail"
                      disabled
                      style="width: 260px" />
          </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
          <el-button @click="editorInvoice = false; invoiceForm = {};">取消</el-button>
          <el-button type="primary"
                     @click="sureBtn()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { goodorderDetail, buyPageList, payPurchase, riseOpen, getInvoiceHeader, payResult, returnPurchase, cancelPurchase } from '@/api/servicecenter/pendingPayment.js'
import QRCode from 'qrcodejs2'
import upload from '@/components/upload/upload.vue'
import Pagination from '@/components/Pagination'
import Tabs from '@/components/Tabs'
import Order from '@/components/order'
import StepWay from '@/components/step'
import { mapState, mapGetters } from 'vuex'
import { checkStatus } from '@/utils/status'

// import { correspondingVal } from '@/util/validate'
import payCont from '@/layout/components/pay/pay'

export default {
  name: 'PurchaseIndex',
  components: {
    Pagination,
    payCont,
    Order,
    StepWay,
    upload,
    Tabs
  },
  data () {
    return {
      awaitPayQty: 0,
      alwaySendQty: 0,
      awaitShipmentsQty: 0,
      awaitReceivingQty: 0,

      activeName: 'first', // tabs 传的值
      tabsList: [ // tabs 传的值
        {
          name: 'first',
          label: '所有订单',
          value: 0,
        },
        {
          name: '1',
          label: '待付款',
          value: 0,
        },
        {
          name: '2',
          label: '待发货',
          value: 0,
        },
        {
          name: '3',
          label: '配送中',
          value: 0,
        },
        {
          name: '8',
          label: '配送完成',
          value: 0,
        },
        {
          name: '9',
          label: '已完成',
          value: 0,
        },
        // {
        //   name: '10',
        //   label: '售后',
        //   value: 0,
        // },
      ],

      loading: false,
      routerType: 'procument', // 区分是哪个页面进入的
      dialogBtob: false,
      payData: {},
      invoiceObj: {},
      // 抬头列表
      selectedData: [],
      // 是否显示必填项目
      needCan: false,
      // 发票抬头弹窗的对象
      invoiceForm: { opentype: 0, headerType: 0 },
      // 发票抬头的弹窗
      editorInvoice: false,
      // 发票抬头的表单规则
      invoiceRules: {
        opentype: [
          { required: true, message: '请选择发票类型', trigger: 'change' }
        ],
        headerType: [
          { required: true, message: '请选择抬头类型', trigger: 'change' }
        ],
        buyerId: [
          { required: true, message: '请选择发票抬头', trigger: 'change' }
        ]
      },
      isLoading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近7天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近15天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近30天',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      query: {
        current: 1,
        size: 10,
        pages: 0,
        code: '',
        goodsName: '',
        phone: '',
        startOrderTime: '',
        endOrderTime: '',
        type: 'PURCHASE',
        status: ''
      },
      activeNames: '', // 展开list
      tableData: [],
      tableList: [],
      time: [],
      isQrCode: false,
      qrcode: null,
      total: '',
      orderId: '',
      status: '',
      orderCode: '',

      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      tabs: [
        { name: '用户管理', value: '', number: '' }
      ]
    }
  },
  created () {
    this.queryTableData()
  },
  mounted () { },
  computed: {
    ...mapGetters(['permissions']),
    ...mapState('App', {
      selectList: 'selectList'
    }),
    getStatus () {
      return (type, status) => checkStatus(type, status)
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 步骤条点击事件
    stepBtn (val) {
      console.log(val)
    },
    // 重置
    reset () {
      this.time = []
      this.query.code = ''
      this.query.goodsName = ''
      this.query.phone = ''
    },
    suceeBtn () {
      this.dialogBtob = false
      this.$router.push('/ordercenter/ordercenter-procurement')
      this.queryTableData(1)
    },
    handleClose () {
      this.$refs.payCont.loginForm = {
        password: '',
        code: ''
      }
      this.$refs.payCont.$refs.loginForm.resetFields()
      this.dialogBtob = false
    },
    handleClick () {
      if (this.activeName == 'first') {
        this.query.status = ''
      } else {
        this.query.status = this.activeName
      }
      if (this.activeName === '9') {
        console.log(5656);
        return
      }
      this.queryTableData(1)
    },
    selectBtn (val) {
      const that = this
      this.selectedData.forEach((res) => {
        if (res.id == val) {
          that.invoiceForm = res
          that.invoiceForm.buyerId = res.id
          that.invoiceForm.desc = 1
          that.invoiceForm.opentype = 0
          that.invoiceForm.headerType = 0
          this.$set(that.invoiceForm, 'headerType', 0)
        }
      })
    },
    sureBtn () {
      this.$refs['invoiceForm'].validate((valid) => {
        if (valid) {
          riseOpen({
            id: this.invoiceObj.id,
            riseId: this.invoiceForm.buyerId,
            invoiceType: this.invoiceForm.opentype,
            openType: this.invoiceForm.headerType
          }).then((res) => {
            this.editorInvoice = false
            this.queryTableData(1)
          })
        } else {
          return false
        }
      })
    },
    needSelected () {
      this.needCan = !this.needCan
    },
    validateBtn (val, row, name) {
      // return correspondingVal(name, row, val, this.selectList)
    },
    watchBtn (i) {
      // if (i.serialStatus == 'OPEN') {
      getInvoiceHeader().then((res) => {
        this.selectedData = res.data
        if (this.selectedData.length > 0) {
          this.$set(this.invoiceForm, 'buyerId', this.selectedData[0].id)
        }
      })
      // }
      this.invoiceObj = i
      this.editorInvoice = true
    },
    queryTableData (current) {
      if (current) {
        this.query.current = current
      }
      if (this.time != null && this.time.length > 0) {
        this.query.startOrderTime = this.time[0]
        this.query.endOrderTime = this.time[1]
      } else {
        this.query.startOrderTime = null
        this.query.endOrderTime = null
      }
      buyPageList(this.query)
        .then((res) => {
          this.isLoading = false
          this.tabsList[1].value = res.data.awaitPayQty
          this.tabsList[2].value = res.data.awaitShipmentsQty
          this.tabsList[3].value = res.data.awaitReceivingQty
          this.tabsList[4].value = res.data.signQty
          this.tabsList[6].value = res.data.afterSaleQty
          if (res.data) {
            this.tableData = res.data.page.records || []
            this.query.pages = res.data.page.total
          } else {
            this.tableData = []
            this.query.pages = 0
          }
        })
        .catch(() => {
          this.tableData = []
          this.isLoading = false
        })
    },
    handleChange () {
      // console.log(this.activeNames);
      this.tableList = []
      this.getdemoList()
    },
    async getdemoList () {
      const activeId = this.activeNames
      this.activeNames = ''
      if (activeId) {
        await goodorderDetail(activeId).then((res) => {
          this.tableList = res.data.detailList

          this.$nextTick(() => {
            this.activeNames = activeId
          })
        })
        // this.$nextTick(() => {
        //   this.activeNames.push(id);
        // });
      }
    },
    changePage (val) {
      this.isLoading = true
      this.query.current = val.page
      this.queryTableData()
    },
    changeSize (val) {
      this.isLoading = true
      this.query.size = val.limit
      this.queryTableData()
    },
    stopClick (e) {
      e.stopPropagation()
    },
    // 导出
    async exportFile () {
      await exportPage(this.query).then((res) => {
        downloadFile(res.data, '采购订单')
      })
    },
    // 物流详情
    goWuliuDetail (id, orderId) {
      this.$router.push({
        path: '/ordercenter/ordercenter-procurementDetail',
        query: { id: id, orderId: orderId }
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
              let res = response
              if (res.code == 0) {
                this.isLoading = false
                this.$message.success('订单取消成功')
                this.query.current = 1
                this.queryTableData()
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
    // 退款
    returnPay (id) {
      this.isLoading = true
      this.$confirm(
        '建议您先与商家沟通好再发起退款申请，避免商家不予退款',
        '申请退款',
        {
          confirmButtonText: '确认',
          cancelButtonText: '返回',
          type: 'warning'
        }
      )
        .then(() => {
          returnPurchase(id)
            .then((response) => {
              let res = response.data
              if (res.code == 0) {
                this.isLoading = false
                this.$message.success('订单退款成功')
                this.query.current = 1
                this.queryTableData()
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
    // 订单详情
    goDetail (id, orderId) {
      console.log(111, '11')
      this.$router.push({
        path: '/ordercenter/ordercenter-procurementDetail',
        query: { id: id, orderId: orderId }
      })
    },
    payBtn (row) {
      this.loading = true
      this.orderCode = row.orderCode
      payPurchase(row.id)
        .then((res) => {
          if (res.code == 0) {
            this.payData = res.data
            // this.payData.amount = this.payData.amount.toFixed(2)
            if (res.data.qrCode) {
              this.isQrCode = true
              this.loading = false
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
                      this.queryTableData(1)
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
              this.loading = false
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
        .catch(() => {
          this.loading = false
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
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/index.scss";
@import "../../styles/main";

.classification {
  padding: 0px;

  .headerTabs {
    padding: 0px 24px;
    border-bottom: 1px solid #f5f5f5;
  }

  .search,
  .collapse_list {
    margin-left: 24px !important;
    margin-right: 24px !important;
  }

  .collapse_list {
    height: calc(100% - 160px);
  }
}
</style>
