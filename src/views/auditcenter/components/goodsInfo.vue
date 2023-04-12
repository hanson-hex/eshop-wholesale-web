<template>
  <div class="info_box">
    <el-form ref="editForm"
             label-width="120px"
             :model="formTool"
             size="small">
      <div class="left_topic mb20">基本信息</div>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="商品属性">
            <el-radio-group v-model="info.type"
                            disabled>
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
            <span class="oneClass">{{ info.goodsOneClassName }} {{ info.goodsTwoClassName }} {{ info.goodsThreeClassName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="商品名称"
                        prop="name">
            <el-input v-model="info.name"
                      placeholder="请输入商品名称"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="商品简称">
            <el-input v-model="info.shortName"
                      placeholder="请输入商品简称"
                      disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="left_topic mb20">详细信息</div>
      <el-row v-if="info.type == 'DRUG'"
              :gutter="10">
        <el-col :span="6">
          <el-form-item label="通用名"
                        prop="commonName"
                        :rules="{required: true, message: '请填写通用名', trigger: 'blur'}">
            <el-input v-model="info.commonName"
                      placeholder="请输入通用名"
                      disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="图片">
            <div class="imgs_box">
              <img v-for="(li,i) in info.imageList"
                   :key="i"
                   :src="li"
                   alt="">
            </div>
            <!-- <imgUpload v-model="info.imageList" :isEdit="false">
              <template slot="tip">
                <p class="el-upload__tip">
                  备注:图片格式为jpg或png，建议尺寸100*100，图片大小不得超过5M;第一张图片会作为商品展示图
                </p>
              </template>
            </imgUpload> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="商品详情">
            <!-- <div v-html="info.details" /> -->
            <wangEnduit ref="wangEnduit"
                        :value="info.details"
                        :is-clear="isClear"
                        disabled
                        @changeEndit="watchEndit" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="left_topic mb20">商品价格标签</div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="售价前缀">
            <el-input v-model="info.sellingPricePrefix"
                      placeholder="请输入售价前缀"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="市场价">
            <el-radio-group v-model="info.marketPriceType"
                            disabled>
              <el-radio v-for="item in priceKindList"
                        :key="item.value"
                        :label="item.value">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="价格标签模式">
            <el-radio-group v-model="info.priceTagType"
                            disabled>
              <el-radio label="cash">现金</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="left_topic mb20">商品价格</div>
      <el-table :data="info.skus"
                style="width: 100%">
        <el-table-column prop="goodsSkuName"
                         label="SKU名称"
                         min-width="160">
          <template slot-scope="scope">
            <el-form-item :prop="'skus.'+scope.$index+'.goodsSkuName'"
                          :rules="{required: true, message: '请填写SKU名称', trigger: 'blur'}"
                          label-width="0">
              <el-input v-model="scope.row.goodsSkuName"
                        maxlength="4"
                        placeholder="请填写SKU名称"
                        disabled
                        @input="changMoney(scope.$index,scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="goodsSkuUnit"
                         label="单位"
                         min-width="160">
          <template slot-scope="scope">
            <el-form-item :prop="'skus.'+scope.$index+'.goodsSkuUnit'"
                          :rules="{required: true, message: '单位', trigger: 'blur'}"
                          label-width="0">
              <el-input v-model="scope.row.goodsSkuUnit"
                        style="width:50%"
                        maxlength="4"
                        placeholder="单位"
                        disabled
                        @input="changMoney(scope.$index,scope.row)" />
              <el-link type="primary"
                       :underline="false"
                       disabled
                       @click="choiceDanwei">选择单位</el-link>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="salePrice"
                         label="零售价/元"
                         min-width="120">
          <template slot-scope="scope">
            <el-form-item :prop="'skus.'+scope.$index+'.salePrice'"
                          :rules="{required: true, message: '请填写零售价', trigger: 'blur'}"
                          label-width="0">
              <el-input v-model="scope.row.salePrice"
                        maxlength="4"
                        placeholder="请填写零售价"
                        disabled
                        @input="changMoney(scope.$index,scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="marketPrice"
                         label="市场价/元"
                         min-width="120">
          <template slot-scope="scope">
            <el-form-item :prop="'skus.'+scope.$index+'.marketPrice'"
                          :rules="{required: true, message: '请填写市场价', trigger: 'blur'}"
                          label-width="0">
              <el-input v-model="scope.row.marketPrice"
                        maxlength="4"
                        placeholder="请填写市场价"
                        disabled
                        @input="changMoney(scope.$index,scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="purchasePrice"
                         label="批发价/元"
                         min-width="120">
          <template slot-scope="scope">
            <el-form-item :prop="'skus.'+scope.$index+'.purchasePrice'"
                          :rules="{required: true, message: '请填写批发价', trigger: 'blur'}"
                          label-width="0">
              <el-input v-model="scope.row.purchasePrice"
                        placeholder="请填写批发价"
                        disabled
                        @input="changMoney(scope.$index,scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="startWholesale"
                         label="起批量"
                         min-width="120">
          <template slot-scope="scope">
            <el-form-item :prop="'skus.'+scope.$index+'.startWholesale'"
                          :rules="{required: true, message: '请填写起批量', trigger: 'blur'}"
                          label-width="0">
              <el-input v-model="scope.row.startWholesale"
                        placeholder="请填写起批量"
                        disabled
                        @input="changMoney(scope.$index,scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="goodsSkuInventory"
                         label="库存"
                         min-width="120">
          <template slot-scope="scope">
            <el-form-item :prop="'skus.'+scope.$index+'.goodsSkuInventory'"
                          :rules="{required: true, message: '请填写库存', trigger: 'blur'}"
                          label-width="0">
              <el-input v-model="scope.row.goodsSkuInventory"
                        placeholder="请填写库存"
                        disabled />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="expireTime"
                         label="有效期至"
                         width="230">
          <template slot-scope="scope">
            <el-form-item :prop="'skus.'+scope.$index+'.expireTime'"
                          :rules="{type: 'string',required: true, message: '请填写有效期至', trigger: ['change','blur']}"
                          label-width="0">
              <el-date-picker v-model="scope.row.expireTime"
                              value-format="yyyy-MM-dd hh:mm:ss"
                              type="datetime"
                              placeholder="选择日期"
                              style="width:200px" />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="producedTime"
                         label="生产日期"
                         width="150">
          <template slot-scope="scope">
            <el-form-item :prop="'skus.'+scope.$index+'.producedTime'"
                          :rules="{type: 'string',required: true, message: '请填写生产日期', trigger: ['change','blur']}"
                          label-width="0">
              <el-date-picker v-model="scope.row.producedTime"
                              value-format="yyyy-MM-dd"
                              type="date"
                              placeholder="选择日期"
                              style="width:140px" />
            </el-form-item>
          </template>
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-if="formTool.skus.length != 1" style="margin-bottom:20px" type="text" size="mini" @click.native.prevent="deleteRow(scope.$index, formTool.skus)">
              移除
            </el-button>
            <el-button v-if="(scope.$index+1) == 1" style="margin-bottom:20px" type="text" size="mini" @click.native.prevent="addRow()">
              新增
            </el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <!-- <el-divider /> -->
      <div class="left_topic mb20"
           style="margin-top:16px">税务编码</div>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="税务分类编码">
            <el-input v-model="info.taxCode"
                      placeholder="请输入售价前缀"
                      disabled />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="4">
          <el-button type="text" size="small" @click="searchTax()">搜索税务分类编码</el-button>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="金蝶云编码">
            <el-input v-model="info.kingdeeCode"
                      placeholder="请输入金蝶云编码"
                      disabled />
            <!-- <p class="markedWords mt10">备注：金蝶云编码仅适用于金蝶发票云用户，非金蝶用户可以不用填写。</p> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="left_topic mb20">规格参数</div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="规格"
                        prop="specification"
                        :rules="{required: true, message: '请填写规格', trigger: 'blur'}">
            <el-input v-model="info.specification"
                      placeholder="请输入规格"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="生产厂家"
                        prop="factory"
                        :rules="{required: true, message: '请填写生产厂家', trigger: 'blur'}">
            <el-input v-model="info.factory"
                      placeholder="请输入生产厂家"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="批准文号"
                        prop="approvalNumber"
                        :rules="{required: (formTool.type == 'TCMDP' || formTool.type == 'OTHER') ? false : true, message: '请填写批准文号', trigger: 'blur'}">
            <el-input v-model="info.approvalNumber"
                      placeholder="请输入批准文号"
                      disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col v-if="info.type == 'TCMDP'"
                :span="6">
          <el-form-item label="等级"
                        prop="level">
            <el-input v-model="info.level"
                      placeholder="请输入等级"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col v-if="info.type == 'TCMDP'"
                :span="6">
          <el-form-item label="产地"
                        prop="placeOrigin">
            <el-input v-model="info.placeOrigin"
                      placeholder="请输入产地"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="存储条件"
                        prop="storageCondition"
                        :rules="{required: formTool.type == 'DRUG' ? true : false, message: '请填写存储条件', trigger: 'blur'}">
            <el-input v-model="info.storageCondition"
                      placeholder="请输入存储条件"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col v-if="info.type == 'DRUG'"
                :span="6">
          <el-form-item label="处方类型"
                        prop="prescriptionType"
                        :rules="{required: true, message: '请填写处方类型', trigger: 'blur'}">
            <el-input v-model="info.prescriptionType"
                      placeholder="请输入处方类型"
                      disabled />
          </el-form-item>
        </el-col>
        <el-col v-if="info.type == 'DRUG'"
                :span="6">
          <el-form-item label="剂型"
                        prop="dosageForm"
                        :rules="{required: true, message: '请填写剂型', trigger: 'blur'}">
            <el-input v-model="info.dosageForm"
                      placeholder="请输入剂型"
                      disabled />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
              <el-form-item label="第三方商品码">
                <el-input v-model="info.medicineCode" placeholder="请输入第三方商品码" disabled />
              </el-form-item>
            </el-col> -->
      </el-row>
      <p class="markedWords mt10">温暖提示：部分商品包装更换频繁，如货品与图片不安全一致，请以收到的商品实物为准。如页面存在有效期信息，为库存产品最近有效期，实际产品有效期以到货产品有效期为准。如发现商品存在质量问题，请拨打春播云药库质量投诉专线电话：400-888-6688</p>
      <el-divider />
      <div class="left_topic mb20">溯源信息</div>
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item label="码上放心追溯码">
            <el-input v-model="info.barCodeRetrospection"
                      placeholder="请输入码上放心追溯码"
                      disabled />
            <div class="imgs_box"
                 style="margin-top:15px;">
              <img v-for="(li,i) in info.barCodeImage"
                   :key="i"
                   :src="li"
                   alt="">
            </div>
            <!-- <imgUpload v-model="info.barCodeImage" :limit="1" :isEdit="false" /> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <div class="left_topic mb20">服务与承诺</div>
      <div class="pl20">
        <el-checkbox-group v-model="info.servicePromise"
                           disabled>
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
    </el-form>
  </div>
</template>
<script>
// import imgUpload from '@/components/imgUpload'
import wangEnduit from '@/components/wangEnduit'
// import taxForm from '@/views/auditProduct/taxForm.vue'
import { moneyFix } from '@/utils/validate'
import { getDetail, editGoods, addGoods } from '@/api/productManage/auditProduct'
export default {
  components: { wangEnduit },
  props: {
    // tabi: {
    //   type: [Number, String],
    //   default: 0
    // },
    // keyname: {
    //   type: String,
    //   default: ''
    // },
    isedit: {
      type: Boolean,
      default: false
    },
    goodsInfo: {
      type: Object,
      default: () => {
        return {
          medicineCode: '',
          servicePromise: ''
        }
      }
    }
  },
  data () {
    return {
      formTool: {
        type: 'DRUG', // 商品属性
        name: '', // 商品名称
        shortName: '', // 商品简称
        imageList: [], // 图片
        image: '', // 商品主图片
        commonName: '', // 通用名
        details: null, // 商品详情
        marketPriceType: 'conceal', // 市场价类型
        priceTagType: 'cash', // 价格标签模式
        taxCode: '', // 税务分类编码
        taxId: '', // 税务编码ID
        kingdeeCode: '', // 金蝶云编码
        factory: '', // 生产厂家
        approvalNumber: '', // 批准文号
        storageCondition: '', // 存储条件
        prescriptionType: '', // 处方类型
        dosageForm: '', // 剂型
        barCodeRetrospection: '', // 码上放心追溯码
        barCodeImage: [], // 码上放心追溯码
        servicePromise: [], // 服务与承诺
        medicineCode: '', // 第三方商品编码
        specification: '', // 规格
        level: '', // 等级
        placeOrigin: '', // 产地
        goodsOneClassId: '',
        goodsOneClassName: '',
        goodsThreeClassId: '',
        goodsThreeClassName: '',
        goodsTwoClassId: '',
        goodsTwoClassName: '',
        skus: [
          {
            goodsSkuName: '', // SKU名称
            goodsSkuUnit: '',
            salePrice: '', // 零售价
            marketPrice: '', // 市场价
            purchasePrice: '', // 批发价
            startWholesale: '', // 起批量
            goodsSkuInventory: '', // 库存
            expireTime: '', // 有效期至
            producedTime: '' // 生产日期
          }
        ]
      },
      rules: {
        // { required: true, validator: moneyFix, trigger: 'blur' }
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
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
  computed: {
    info: {
      get () {
        return this.goodsInfo
      },
      set (val) {
        this.$emit('update:goodsInfo', val)
      }
    },
  },
  watch: {},
  created () {
    // const query = this.$route.query
    // if (query.goodsId) {
    //   this.getDetail(query.goodsId)
    // } else {
    //   this.formTool.goodsOneClassId = query.goodsOneClassId
    //   this.formTool.goodsTwoClassId = query.goodsTwoClassId
    //   this.formTool.goodsThreeClassId = query.goodsThreeClassId
    //   this.formTool.goodsOneClassName = query.goodsOneClassName
    //   this.formTool.goodsTwoClassName = query.goodsTwoClassName
    //   this.formTool.goodsThreeClassName = query.goodsThreeClassName
    // }
  },
  mounted () {
    this.$refs.wangEnduit.editor.disable()
  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
  methods: {
    back () {
      if (this.$route.query.goodsId) {
        this.$router.push('/productManage/auditProduct-index')
      } else {
        this.$router.push('/productManage/publishProduct-add')
      }
    },
    transferTax (val) { // 接收税务分类编码传过来的数据
      this.formTool.taxId = val.id
      this.formTool.taxCode = val.taxCode
    },
    closeDialog () {
      this.dialogEdit = false
    },
    getDetail (goodsId) { // 获取商品信息
      const params = {
        id: goodsId
      }
      getDetail(params).then(res => {
        if (res.code === 0) {
          this.formTool = res.data
          this.formTool.imageList = res.data.imageList.split(',')
          this.formTool.barCodeImage = res.data.barCodeImage.split(',')
          this.formTool.servicePromise = res.data.servicePromise.split(',')
        }
      })
    },
    submit () {
      const params = Object.assign({}, this.formTool)
      params.image = params.imageList[0] || ''
      params.imageList = params.imageList.join()
      params.barCodeImage = params.barCodeImage.join()
      params.servicePromise = params.servicePromise.join()
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          console.log(this.params)
          if (this.$route.query.goodsId) {
            editGoods(params).then(res => {
              if (res.code === 0) {
                this.$message.success('编辑成功')
                this.back()
              }
            })
          } else {
            addGoods(params).then(res => {
              if (res.code === 0) {
                this.$message.success('新增成功')
                this.$router.push('/productManage/publishProduct-index')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    watchEndit (val) { // 监听富文本编辑传过来的数据
      this.formTool.details = val
    },
    searchTax () {
      this.dialogEdit = true
    },
    changMoney (index, val) {

    },
    addRow () {
      const params = {
        subGoodsName: '',
        retailPrice: '',
        marketPrice: '',
        tradePrice: '',
        riseNum: '',
        inventory: '',
        periodDate: '',
        productDate: ''
      }
      this.formTool.skus.unshift(params)
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    // 选择单位
    choiceDanwei (row) {
      console.log(row)
    }
  }
}
</script>
<style lang='scss' scoped>
.oneClass {
  color: #595959;
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
.info_box {
  margin: 20px 0;
}
.imgs_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  img {
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
