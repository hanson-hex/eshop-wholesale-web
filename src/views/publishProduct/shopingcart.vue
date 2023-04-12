<template>
  <div class="comContent shopingcart">
    <div class="header">加入药品</div>
    <div class="center">
      <div class="left_topic mb20" style="margin-top:10px">基本信息</div>
      <el-divider />
      <div class="produceDetail">
        <div class="shopImg">
          <el-image style="width: 100px; height: 100px" :src="shopDetail.image || avater" />
        </div>
        <div class="introduce">
          <div class="list name">{{ shopDetail.name }}</div>
          <div class="list factory mb20">{{ shopDetail.factory }}</div>
          <div class="list factory">{{ shopDetail.approvalNumber }}</div>
        </div>
      </div>
      <el-divider />
      <div class="left_topic mb20">商品价格</div>
      <el-form ref="shopingcart" :model="formTool" size="small">
        <el-table :data="formTool.SKUlist" style="width: 100%">
          <el-table-column prop="goodsSkuName" label="SKU名称" min-width="160">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.goodsSkuName'" :rules="{required: true, message: '请填写SKU名称', trigger: 'blur'}" label-width="0">
                <el-input v-model="scope.row.goodsSkuName" placeholder="请填写SKU名称" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="goodsSkuUnit" label="单位" min-width="160">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.goodsSkuUnit'" :rules="{required: true, message: '单位', trigger: 'blur'}" label-width="0" style="display:flex;">
                <el-input v-model="scope.row.goodsSkuUnit" style="width:50%" maxlength="4" disabled placeholder="单位" @input="changMoney(scope.$index,scope.row)" />
                <el-link style="margin-left:16px" type="primary" :underline="false" @click="choiceUnit(scope.$index)">选择单位</el-link>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="medicineCode" label="第三方商品编码" min-width="160">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.medicineCode'" :rules="{required: true, message: '请填写第三方商品编码', trigger: 'blur'}" label-width="0">
                <el-input v-model="scope.row.medicineCode" placeholder="请填写第三方商品编码" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="salePrice" label="零售价/元" min-width="120">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.salePrice'" :rules="{required: true, message: '请填写零售价', trigger: 'blur'}" label-width="0">
                <el-input v-model="scope.row.salePrice" :disabled="!edit" placeholder="请填写零售价" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="marketPrice" label="市场价/元" min-width="120">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.marketPrice'" :rules="{required: true, message: '请填写市场价', trigger: 'blur'}" label-width="0">
                <el-input v-model="scope.row.marketPrice" placeholder="请填写市场价" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="purchasePrice" label="批发价/元" min-width="120">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.purchasePrice'" :rules="{required: true, message: '请填写批发价', trigger: 'blur'}" label-width="0">
                <el-input v-model="scope.row.purchasePrice" :disabled="!edit" placeholder="请填写批发价" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="startWholesale" label="起批量" min-width="120">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.startWholesale'" :rules="{required: true, message: '请填写起批量', trigger: 'blur'}" label-width="0">
                <el-input v-model="scope.row.startWholesale" :disabled="!edit" placeholder="请填写起批量" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="goodsSkuInventory" label="库存" min-width="120">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.goodsSkuInventory'" :rules="{required: true, message: '请填写库存', trigger: 'blur'}" label-width="0">
                <el-input v-model="scope.row.goodsSkuInventory" placeholder="请填写库存" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="expireTime" label="有效期至" width="210">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.expireTime'" :rules="{required: true, message: '请填写有效期至', trigger: 'blur'}" label-width="0">
                <el-date-picker v-model="scope.row.expireTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择日期" style="width:200px" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="producedTime" label="生产日期" width="150">
            <template slot-scope="scope">
              <el-form-item :prop="'SKUlist.'+scope.$index+'.producedTime'" :rules="{required: true, message: '请填写生产日期', trigger: 'blur'}" label-width="0">
                <el-date-picker v-model="scope.row.producedTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" style="width:140px" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button v-if="formTool.SKUlist.length != 1" :disabled="!edit" style="margin-bottom:20px;color:#F6212D;font-size:14px" type="text" size="mini" @click.native.prevent="deleteRow(scope.$index, formTool.SKUlist)">
                移除
              </el-button>
              <!-- <el-button v-if="(scope.$index+1) == 1" :disabled="!edit" style="margin-bottom:20px" type="text" size="mini" @click.native.prevent="addRow()">
              新增
            </el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <div v-if="edit" class="addGoods" @click="addRow()">
          <span class="addFont">
            +
          </span>
          <span style="font-size:14px;color:#595959">
            添加商品价格
          </span>
        </div>
      </el-form>
      <div class="mt20" style="margin-bottom:24px">
        <el-button type="primary" size="small" @click="comfirm">提交并加入仓库</el-button>
      </div>
    </div>
    <UnitDialog :unit-list="unitList" :dialog-visible="dialogVisible" @submitCheck="submitCheck" />
  </div>
</template>
<script>
import UnitDialog from '@/components/unitDialog'
import { addSku, support } from '@/api/productManage/publishProduct'
import { getunitList } from '@/api/productManage/auditProduct'
import avater from "/public/img/default.png"
export default {
  components: { UnitDialog },
  data() {
    return {
      tableIndex: 0, // 点击单位表格中的index
      // checkIndex: 0, // 选中的index
      dialogVisible: false, // 弹窗
      unitList: ['粒', '盒'],
      avater: avater,
      srcList: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'],
      edit: true, // 编辑零售价，批发价，起批量
      shopDetail: {},
      formTool: {
        SKUlist: [
          {
            goodsSkuName: '', // SKU名称
            goodsSkuUnit: '', // 单位
            salePrice: '', // 零售价
            marketPrice: '', // 市场价
            purchasePrice: '', // 批发价
            startWholesale: '', // 起批量
            goodsSkuInventory: '', // 库存
            expireTime: '', // 有效期至
            producedTime: '', // 生产日期
            medicineCode: '' // 第三方商品编码
          }
        ]
      }
    }
  },
  created() {
    this.getunitList()
    this.support()
    this.shopDetail = this.$route.query
  },
  methods: {
    // 获取单位字典
    getunitList() {
      getunitList().then(res => {
        if (res.code == 0) {
          this.unitList = res.data || []
          this.formTool.SKUlist[0].goodsSkuUnit = this.unitList.length > 0 ? this.unitList[0] : ''
        }
      })
    },
    // 选择单位
    choiceUnit(index) {
      this.tableIndex = index
      this.dialogVisible = true
    },
    // 确认选中的单位
    submitCheck(item) {
      this.formTool.SKUlist[this.tableIndex].goodsSkuUnit = item
    },
    // 提交
    comfirm() {
      const _that = this
      this.$refs['shopingcart'].validate((valid) => {
        const params = Object.assign({}, this.formTool)
        params.SKUlist.forEach(item => {
          item.goodsId = _that.shopDetail.goodsId
        })
        console.log(params.SKUlist)
        if (valid) {
          addSku(params.SKUlist).then(res => {
            if (res.code === 0) {
              this.$message.success('提交成功')
              this.$router.push('/productManage/publishProduct-index')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 新增行
    addRow() {
      if (this.edit == true) {
        const params = {
          subGoodsName: '',
          goodsSkuUnit: this.unitList[0],
          retailPrice: '',
          marketPrice: '',
          tradePrice: '',
          riseNum: '',
          inventory: '',
          periodDate: '',
          productDate: ''
        }
        this.formTool.SKUlist.push(params)
      }
    },
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    // 获取sku自营商品定价
    support() {
      let params = {
        goodsId: this.$route.query.goodsId
      }
      support(params).then(res => {
        if (res.code == 0) {
          if (res.data.length != 0) {
            this.formTool.SKUlist = res.data
            this.edit = false
          }
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
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
  padding: 0 24px;
  height: 56px;
  font-size: 16px;
  font-family: PingFangSC, PingFangSC-Medium;
  font-weight: 700;
  text-align: left;
  color: #262626;
  line-height: 56px;
  border: 1px solid #f5f5f5;
}
.center {
  margin: 0 24px;
}
.shopingcart {
  padding: 0px;
  .produceDetail {
    display: flex;
    .introduce {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: #262626;
        margin-bottom: 10px;
      }
      .factory {
        color: #595959;
        font-size: 14px;
      }
    }
  }
  ::v-deep .el-table th.el-table__cell > .cell {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #8c8c8c;
  }
  ::v-deep .el-table .cell {
    padding-left: 5px;
    padding-right: 5px;
  }
}
</style>
