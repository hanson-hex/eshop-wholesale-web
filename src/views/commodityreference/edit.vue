<template>
  <div class="comContent">
    <el-dialog :close-on-press-escape="false"
               :close-on-click-modal="false"
               append-to-body
               title="税务分类编码"
               :visible.sync="dialogEdit"
               width="60%">
      <tax-form :dialog-edit="dialogEdit"
                @transferTax="transferTax" />
    </el-dialog>
    <div class="firstTopic text-left mb20 header">编辑商品信息</div>
    <el-form ref="storeForm"
             class="product"
             label-width="120px"
             :model="formTool"
             :rules="rules"
             size="small">
      <div class="left_topic mb20">基本信息</div>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="商品属性">
            <el-radio-group v-model="formTool.type">
              <el-radio v-for="(item) in propertyList"
                        :key="item.value"
                        :label="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <el-form-item label="商品分类">
            <!-- <span>中西成药 心脑血管用药 冠心病类</span> -->
            <el-select v-model="formTool.goodsOneClassId"
                       size="small"
                       placeholder="一级分类"
                       @change="changeOneClassId">
              <el-option v-for="item in goodsOneClassIdOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id" />
            </el-select>
            <el-select v-model="formTool.goodsTwoClassId"
                       size="small"
                       placeholder="二级分类"
                       style="margin-left:8px"
                       @change="changeTwoClassId">
              <el-option v-for="item in goodsTwoClassIdOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id" />
            </el-select>
            <el-select v-model="formTool.goodsThreeClassId"
                       size="small"
                       placeholder="三级分类"
                       style="margin-left:8px">
              <el-option v-for="item in goodsThreeClassIdOptions"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品名称"
                        prop="name">
            <el-input v-model="formTool.name"
                      placeholder="请输入商品名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="商品简称">
            <el-input v-model="formTool.shortName"
                      placeholder="请输入商品简称" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品归属">
            <el-checkbox v-model="formTool.beSelfSupport">是否自营</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="left_topic mb20">详细信息</div>
      <el-row v-if="formTool.type =='DRUG'"
              :gutter="10">
        <el-col :span="6">
          <el-form-item label="通用名">
            <el-input v-model="formTool.commonName"
                      placeholder="请输入通用名" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="图片"
                        prop="imageList">
            <imgUpload v-model="formTool.imageList" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="商品详情">
            <wangEnduit :value="formTool.details"
                        :is-clear="isClear"
                        @changeEndit="watchEndit" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="left_topic mb20">商品价格标签</div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="售价前缀">
            <el-input v-model="formTool.sellingPricePrefix"
                      placeholder="请输入售价前缀" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="市场价">
            <el-radio-group v-model="formTool.marketPriceType">
              <el-radio v-for="item in priceKindList"
                        :key="item.value"
                        :label="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="价格标签模式">
            <el-radio-group v-model="formTool.priceTagType">
              <el-radio label="cash">现金</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <div class="addGoods"
           @click="addRow()">
        <span class="addFont">
          +
        </span>
        <span style="font-size:14px;color:#595959">
          添加商品价格
        </span>
      </div> -->
      <el-divider />
      <div class="left_topic mb20"
           style="margin-top:16px">税务编码</div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="税务分类编码">
            <el-input v-model="formTool.taxCode"
                      placeholder="请输入售价前缀" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="text"
                     size="small"
                     @click="searchTax()">搜索税务分类编码</el-button>
        </el-col>
        <el-col :span="8">
          <el-form-item label="金蝶云编码">
            <el-input v-model="formTool.kingdeeCode"
                      placeholder="请输入金蝶云编码" />
            <p class="markedWords mt10">备注：金蝶云编码仅适用于金蝶发票云用户，非金蝶用户可以不用填写。</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="left_topic mb20">规格参数</div>
      <el-row>
        <el-col :span="6">
          <el-form-item label="规格"
                        prop="specification">
            <el-input v-model="formTool.specification"
                      placeholder="请输入生产厂家" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生产厂家">
            <el-input v-model="formTool.factory"
                      placeholder="请输入生产厂家" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批准文号">
            <el-input v-model="formTool.approvalNumber"
                      placeholder="请输入批准文号" />
          </el-form-item>
        </el-col>
        <!-- <el-col v-if="formTool.type =='MADI' || formTool.type == 'FOOD'|| formTool.type == 'OTHER' ||formTool.type =='TCMDP'" :span="8">
          <el-form-item label="单位">
            <el-input v-model="formTool.goodsSkuUnit" placeholder="请输入单位" />
          </el-form-item>
        </el-col> -->
        <el-col :span="6">
          <el-form-item label="存储条件">
            <el-input v-model="formTool.storageCondition"
                      placeholder="请输入存储条件" />
          </el-form-item>
        </el-col>
        <el-col v-if="formTool.type =='DRUG'"
                :span="6">
          <el-form-item label="处方类型">
            <el-input v-model="formTool.prescriptionType"
                      placeholder="请输入处方类型" />
          </el-form-item>
        </el-col>
        <el-col v-if="formTool.type =='DRUG'"
                :span="6">
          <el-form-item label="剂型">
            <el-input v-model="formTool.dosageForm"
                      placeholder="请输入剂型" />
          </el-form-item>
        </el-col>
        <el-col v-if="formTool.type =='TCMDP'"
                :span="6">
          <el-form-item label="等级">
            <el-input v-model="formTool.level"
                      placeholder="请输入等级" />
          </el-form-item>
        </el-col>
        <el-col v-if="formTool.type =='TCMDP'"
                :span="6">
          <el-form-item label="产地">
            <el-input v-model="formTool.placeOrigin"
                      placeholder="请输入产地" />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item label="第三方编码">
            <el-input v-model="formTool.medicineCode" placeholder="请输入第三方编码" />
          </el-form-item>
        </el-col> -->
        <!-- <el-col :span="8">
          <el-form-item label="批准文号">
            <el-input v-model="formTool.approvalNumber" placeholder="请输入批准文号" />
          </el-form-item>
        </el-col> -->
      </el-row>
      <p class="markedWords mt10">温暖提示：部分商品包装更换频繁，如货品与图片不安全一致，请以收到的商品实物为准。如页面存在有效期信息，为库存产品最近有效期，实际产品有效期以到货产品有效期为准。如发现商品存在质量问题，请拨打春播云药库质量投诉专线电话：400-888-6688</p>
      <el-divider />
      <div class="left_topic mb20">溯源信息</div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="码上放心追溯码">
            <el-input v-model="formTool.barCodeRetrospection"
                      placeholder="请输入码上放心追溯码" />
            <imgUpload v-model="formTool.barCodeImage"
                       :limit="1" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="left_topic mb20">服务与承诺</div>
      <div class="pl20">
        <el-checkbox-group v-model="formTool.servicePromise">
          <el-checkbox label="exemption_postage">直邮包邮</el-checkbox>
          <el-checkbox label="lightning">闪电配送</el-checkbox>
          <el-checkbox label="ticket_sale">带票销售</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-divider />
      <div class="left_topic mb20">服务说明</div>
      <div class="pl20">
        <div class="firstTitle mb10">商品价格说明</div>
        <div class="secondTitle mb20">促销活动、商品进价调整、市场环境等因素均会影响商品售价，最终以订单结算页价格为准，购买前请仔细核对</div>
        <div class="firstTitle mb10">产品包装说明</div>
        <div class="secondTitle mb20">厂家药品批次存在更新，涉及内外包装、说明书等，以到货实物为准，如有疑问，可点击纠错按钮或联系客服</div>
        <div class="firstTitle mb10">商品购买权限说明</div>
        <div class="secondTitle mb20">内容由于药品特殊性，部分商品提示暂无购买权限，属于正常情况，具体以购买页面为准</div>
      </div>
      <el-divider />
      <div class="left_topic mb20">配送说明</div>
      <div class="secondTitle pl20">下单成功后，商家立即安排配送。</div>
      <div class="mt20">
        <el-button size="small"
                   @click="back()">返回</el-button>
        <el-button type="primary"
                   size="small"
                   @click="submit">提交</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import imgUpload from '@/components/imgUpload'
import wangEnduit from '@/components/wangEnduit'
import taxForm from '@/views/auditProduct/taxForm.vue'
import { getDetail, editGoods, addGoods } from '@/api/productManage/auditProduct'
import { goodsclassOne, goodsclassTwo } from '@/api/commodityreference'
export default {
  components: { imgUpload, wangEnduit, taxForm },
  data () {
    return {
      oldType: '',
      goodsOneClassIdOptions: [],
      goodsTwoClassIdOptions: [],
      goodsThreeClassIdOptions: [],
      formTool: {
        type: 'DRUG', // 商品属性
        name: '', // 商品名称
        imageList: [], // 图片
        image: '', // 商品主图片
        commonName: '', // 通用名
        shortName: '', // 商品简称
        beSelfSupport: '', // 是否自营商品
        details: null, // 商品详情
        marketPriceType: 1, // 市场价类型
        priceTagType: 1, // 价格标签模式
        taxCode: '', // 税务分类编码
        kingdeeCode: '', // 金蝶云编码
        specification: '', // 规格
        factory: '', // 生产厂家
        approvalNumber: '', // 批准文号
        goodsSkuUnit: '', // 单位
        storageCondition: '', // 存储条件
        level: '', // 等级
        placeOrigin: '', // 产地
        medicineCode: '', // 第三方编码
        prescriptionType: '', // 处方类型
        dosageForm: '', // 剂型
        barCodeRetrospection: '', // 码上放心追溯码
        barCodeImage: [], // 码上放心追溯码
        servicePromise: [] // 服务与承诺
      },
      rules: {
        // { required: true, validator: moneyFix, trigger: 'blur' }
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        imageList: [
          { required: true, message: '请上传商品图片', trigger: 'blur' }
        ],
        specification: [
          { required: true, message: '请输入规格', trigger: 'blur' }
        ],
        factory: [
          { required: true, message: '请输入生产厂家', trigger: 'blur' }
        ]
      },
      isClear: false, // 清除富文本编辑内容
      dialogEdit: false,
      servicePromiseList: [
        { value: 'exemption_postage', name: '直邮包邮' },
        { value: 'lightning', name: '闪电配送' },
        { value: 'ticket_sale', name: '带票销售' }
      ],
      priceKindList: [ // 市场价种类
        { value: 'conceal', name: '隐藏' },
        { value: 'show', name: '显示' },
        { value: 'lineation', name: '划线' }
      ],
      propertyList: [ // 价格标签模式
        { value: 'DRUG', name: '药品' },
        { value: 'MADI', name: '医疗器械' },
        { value: 'TCMDP', name: '中药饮品' },
        { value: 'FOOD', name: '食品' },
        { value: 'OTHER', name: '非药品' }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
    this.query()
    if (this.$route.query.editType) {
      this.getDetail()
    }
  },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
  methods: {
    // 返回
    back () {
      this.$router.push('/platformproductManage/commodityreference-index')
    },
    getDetail () { // 获取商品信息
      console.log(this.$route)
      const params = {
        id: this.$route.query.goodsId
      }
      getDetail(params).then(res => {
        if (res.code === 0) {
          this.formTool = res.data
          this.oldType = this.formTool.type
          if (res.data.imageList) {
            this.formTool.imageList = res.data.imageList.split(',')
          } else {
            this.formTool.imageList = []
          }
          if (res.data.barCodeImage) {
            this.formTool.barCodeImage = res.data.barCodeImage.split(',')
          } else {
            this.formTool.barCodeImage = []
          }
          if (res.data.servicePromise) {
            this.formTool.servicePromise = res.data.servicePromise.split(',')
          } else {
            this.formTool.servicePromise = []
          }
          if (this.formTool.goodsOneClassId) {
            goodsclassTwo(this.formTool.goodsOneClassId).then(res => {
              if (res.code == 0) {
                this.goodsTwoClassIdOptions = res.data
              }
            }).catch(err => {
              console.log(err)
            })
          }
          if (this.formTool.goodsTwoClassId) {
            goodsclassTwo(this.formTool.goodsTwoClassId).then(res => {
              if (res.code == 0) {
                this.goodsThreeClassIdOptions = res.data
                console.log(this.formTool.goodsThreeClassId)
                console.log(this.goodsThreeClassIdOptions, 'this.goodsThreeClassIdOptions')
              }
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
    },
    submit () {
      const params = Object.assign({}, this.formTool)
      params.image = params.imageList[0] || ''
      params.imageList = params.imageList.join()
      params.barCodeImage = params.barCodeImage.join()
      params.servicePromise = params.servicePromise.join()
      if (this.$route.query.editType) {
        editGoods(params).then(res => {
          if (res.code === 0) {
            this.$message.success('提交成功')
            this.back()
          }
        })
      } else {
        addGoods(params).then(res => {
          if (res.code === 0) {
            this.$message.success('提交成功')
            this.back()
          }
        })
      }
    },
    watchEndit (val) { // 监听富文本编辑传过来的数据
      this.formTool.details = val
    },
    searchTax () {
      this.dialogEdit = true
    },
    closeDialog () {
      this.dialogEdit = false
    },
    changMoney (index, val) {

    },
    transferTax (params) {
      // console.log(params, 'transferTax')
      this.formTool.taxCode = params.taxCode
      this.formTool.taxId = params.id
      this.closeDialog()
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
    }
  }
}
</script>
<style lang='scss' scoped>
.comContent {
  padding: 0px;
}
.addGoods {
  width: 100%;
  height: 40px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
  .addFont {
    border: 1px dashed #d9d9d9;
    display: flex;
    width: 18px;
    font-size: 16px;
    justify-content: center;
    margin-right: 5px;
  }
}
.header {
  height: 56px;
  line-height: 56px;
  padding: 0 24px;
  border-bottom: 1px solid #f5f5f5;
}
.product {
  margin: 0 24px;
  margin-bottom: 24px;
}
.firstTitle {
  font-size: 16px;
  color: #262626;
  font-weight: 700;
}
.secondTitle {
  font-size: 14px;
  // color: #999999;
}
</style>
