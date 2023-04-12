<template>
  <div class="comContent shopingcart">
    <div class="header">
      新建分账规则
    </div>
    <div class="content">
      <div class="top">
        <div class="left_topic" style="padding-bottom:24px">分账规则名称</div>
        <el-input v-model="ruleName" size="small" placeholder="请输入分账规则名称" style="width:300px" />
        <el-divider />
      </div>
      <div class="center">
        <div class="left_topic mb20" style="display:inline-block">分账对象设置</div>
        <div v-for="(item,index) in tableData" :key="index" class="fenzhangbox">
          <div>
            <div class="topic" style="display: flex;justify-content: space-between;align-items: center;">
              <div>
                分账对象设置
              </div>
              <el-button v-if="index > 0" class="teshuBtn" size="small" type="primary" @click="deleteRow(index)">移除分账对象</el-button>
            </div>
            <div class="box">
              <div class="everyone">
                <div class="titleName">商户名称：</div>
                <div class="inputInner">
                  <el-input v-model="item.shopName" size="small" placeholder="商户名称" style="width:300px" />
                  <el-button size="small" type="primary" style="margin-left:8px" @click="chooseShop('name',index)">选择商户</el-button>
                </div>
              </div>
              <div class="everyone">
                <div class="titleName">
                  商户编号：
                </div>
                <div class="inputInner">
                  <el-input v-model="item.merchantNo" size="small" disabled style="width:160px" />
                </div>
              </div>
              <div class="everyone">
                <div class="titleName">
                  分账金额：
                </div>
                <span />
                <div class="inputInner">
                  <el-input v-model="item.amount" size="small" placeholder="分账金额" style="width:160px" /> 元
                </div>
              </div>
              <div class="everyone">
                <div class="titleName">费用类型：</div>
                <div class="inputInner">
                  <el-select v-model="item.costType" size="small" placeholder="请选择" style="width:160px">
                    <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="topic">分账账期设置</div>
            <div class="box">
              <div class="everyone">
                <div class="titleName">
                  到账类型：
                </div>
                <div class="inputInner">
                  T +
                  <el-input-number v-model="item.receivedDay" size="small" controls-position="right" :min="0" /> 日到账
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="topic">待付费用
              <el-switch v-model="item.includeService" active-color="#0DA1A8" inactive-color="#ff4949" style="margin-left:8px" />
              <span class="zhushi">
                备注：本项为春播组织内部地办支付给省办咨询服务费专有选项；
              </span>
            </div>
            <div class="box">
              <div class="everyone">
                <div class="titleName">
                  商户名称：
                </div>
                <div class="inputInner">
                  <el-input v-model="item.serviceShopName" size="small" placeholder="商户名称" style="width:300px" />
                  <el-button size="small" type="primary" style="margin-left:8px" @click="chooseShop('daozhangnum',index)">选择商户</el-button>
                </div>
              </div>
              <div class="everyone">
                <div class="titleName">
                  分账金额：
                </div>
                <div class="inputInner">
                  <el-input v-model="item.serviceAmount" type="number" size="small" placeholder="金额" style="width:100px" /> 元
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="addGoods" @click="addRow()">
          <span class="addFont">
            +
          </span>
          <span style="font-size:14px;color:#595959">
            添加商品价格
          </span>
        </div>
        <el-divider />
      </div>
      <div class="mt20">
        <el-button type="" size="small" style="width:160px" @click="returnMain">取消新建</el-button>
        <el-button type="primary" size="small" style="width:160px" @click="edit">提交分账规则</el-button>
      </div>
    </div>

    <el-dialog title="选择商户" :visible.sync="dialogTableVisible" style="posisiton:relative">
      <div class="search">
        <span>商家名称：</span>
        <el-input v-model="shopName" size="small" placeholder="请输入商家名称" style="width:300px" />
        <el-button size="small" type="primary" style="margin-left:8px" @click="merchantInfo(1)">查询</el-button>
        <el-button size="small" style="margin-left:8px" @click="reset">重置</el-button>
      </div>
      <div class="center">
        <MyTable :table-data="tableDatadialog" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getcheckList">
          <template slot="caozuo" slot-scope="scope">
            <el-link :underline="false" type="primary" @click="addShop(scope.row)">确定</el-link>
          </template>
        </MyTable>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { merchantInfo, ledgerRulessave, geCostType, ledgerRulesupdate, getLedgerRulesItems } from '@/api/divisionrulemanagement/divisionrule'
import MyTable from '@/components/myTable'
export default {
  components: { MyTable },
  data() {
    return {
      id: '',
      editType: '',
      status: true,
      ziduan: '', // 区分选的是哪个地方的商户
      index: '', // 区分选的是哪条数据的商户
      shopName: '', // 查询商家的条件
      ruleName: '', // 分账规则的名称
      dialogTableVisible: false,
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      options: [],
      tableData: [
        {
          shopName: '',
          amount: '',
          serviceAmount: '',
          serviceShopName: '',
          serviceShopId: '',
          shopId: '',
          serviceMerchantNo: '',
          includeService: true,
          costType: '',
          receivedDay: '',
          merchantNo: ''
        }
      ],
      value: '',

      operation: false,
      tableDatadialog: [
        {
          goodsId: 111,
          createTime: 23424
        }
      ],
      page: {
        total: 10,
        current: 1,
        size: 10
      },
      tableOption: [
        { label: '康贝商户号', prop: 'merchantNo' },
        { label: '康贝商户名称', prop: 'shopName' },
        { label: '操作', prop: 'caozuo', slot: true, width: '60px' },
      ]
    }
  },
  created() {
    this.editType = this.$route.query.editType
    this.geCostType()
    this.merchantInfo()
    if (this.editType == 'true') {
      this.id = this.$route.query.id
      this.getLedgerRulesItems(this.id)
    }
  },
  methods: {
    // 类型列表
    geCostType() {
      geCostType().then(res => {
        if (res.code == 0) {
          this.options = res.data
          if (this.editType != 'true') {
            this.tableData[0].costType = this.options[0].code
          }
        }
      })
    },
    // 添加列表
    addRow() {
      const params =
      {
        shopName: '',
        amount: '',
        serviceAmount: '',
        serviceShopName: '',
        serviceShopId: '',
        shopId: '',
        serviceMerchantNo: '',
        includeService: true,
        costType: '',
        receivedDay: '',
        merchantNo: ''
      }

      this.tableData.push(params)
    },
    // 删除
    deleteRow(index) {
      this.tableData.splice(index, 1)
    },
    // 选择商户按钮
    chooseShop(ziduan, index) {
      this.ziduan = ziduan
      this.index = index
      this.dialogTableVisible = true
    },
    // 返回
    returnMain() {
      this.$router.push('/commissionmanagement/commissionmanagement-divisionrulemanagement')
    },
    // 保存
    edit() {
      let params = {
        id: this.id,
        ruleName: this.ruleName,
        status: this.status,
        ledgerRulesItemList: this.tableData
      }
      if (this.editType == 'true') {
        ledgerRulesupdate(params).then(res => {
          if (res.code == 0) {
            this.$message.success('更新成功')
            this.$router.push('/commissionmanagement/commissionmanagement-divisionrulemanagement')
          }
        })
      } else {
        ledgerRulessave(params).then(res => {
          if (res.code == 0) {
            this.$message.success('保存成功')
            this.$router.push('/commissionmanagement/commissionmanagement-divisionrulemanagement')
          }
        })
      }
    },
    // 查询商户名称
    getcheckList() {
      this.merchantInfo()
    },
    // 确定选择商户
    addShop(row) {
      if (this.ziduan == 'name') {
        this.tableData[this.index].shopName = row.shopName
        this.tableData[this.index].merchantNo = row.merchantNo
        this.tableData[this.index].shopId = row.shopId
      } else {
        this.tableData[this.index].serviceShopName = row.shopName
        this.tableData[this.index].serviceMerchantNo = row.merchantNo
        this.tableData[this.index].serviceShopId = row.shopId
      }
      this.dialogTableVisible = false
    },
    // 查询商户
    merchantInfo(current) {
      if (current) {
        this.page.current = current
      }
      let params = {
        ...this.page,
        shopName: this.shopName
      }
      merchantInfo(params).then(res => {
        if (res.code == 0) {
          if (res.data) {
            this.tableDatadialog = res.data.records
            this.page.total = res.data.total
          }
        }
      })
    },
    // 重置
    reset() {
      this.shopName = ''
    },
    // 编辑进来查询详情
    getLedgerRulesItems(id) {
      getLedgerRulesItems(id).then(res => {
        if (res.code == 0) {
          this.tableData = res.data.ledgerRulesItemList
          this.ruleName = res.data.ruleName
          this.status = res.data.status
        }
      })
    }
  }
}

</script>
<style lang="scss" scoped>
.shopingcart {
  padding: 0px;
  .el-divider--horizontal {
    margin: 24px 0 !important;
  }
  .header {
    height: 56px;
    line-height: 56px;
    padding: 0 24px;
    border-bottom: 1px solid #f5f5f5;
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 700;
    text-align: left;
    color: #262626;
  }
  .content {
    margin: 0 24px;
    margin-bottom: 24px;
  }
  .fenzhangbox {
    margin: 24px 0px;
    padding: 0px 24px;
    border: 1px solid #f5f5f5;
    border-radius: 4px;
    .topic {
      margin-top: 24px;
      font-size: 16px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 700;
      text-align: left;
      color: rgba(0, 0, 0, 0.85);
      .zhushi {
        margin-left: 16px;
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #f6212d;
      }
      .teshuBtn {
        font-size: 14px;
        font-family: PingFang SC, PingFang SC-Regular;
        font-weight: 400;
        text-align: left;
        color: #f6212d;
        width: 116px;
        height: 32px;
        background: #ffffff;
        border: 1px solid #ff4d50;
        border-radius: 4px;
      }
    }
    .box {
      display: flex;
      padding: 16px 0px;
      border-bottom: 1px solid #f5f5f5;
      .everyone {
        padding: 5px;
        margin-right: 32px;
        .titleName {
          font-size: 14px;
          font-family: PingFang SC, PingFang SC-Regular;
          font-weight: 400;
          text-align: left;
          color: #262626;
          padding-bottom: 8px;
        }
        .inputInner {
          font-size: 14px;
          color: #262626;
        }
      }
    }
  }
  .center {
    // height: calc(100% - 70px);
    .addGoods {
      width: 134px;
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
  }
  ::v-deep.el-dialog__body {
    height: 600px;
    overflow: auto;
  }
  .search {
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 54px;
  }
}
.top {
  padding-top: 32px;
}
</style>
