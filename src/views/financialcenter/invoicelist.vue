
<!--  -->
<template>
  <div class="comContent">
    <MyTabs class="myTabs" :tabi="tabsIndex" :tabs="tabsData" numhide @change="tabChange" />
    <div class="topHeader">
      <div style="height:40px">
        <el-form ref="formTool" :model="formTool" :inline="true">
          <el-form-item prop="invoiceNo">
            <el-input v-model="formTool.invoiceNo" clearable placeholder="发票号码/订单编号" size="small" />
          </el-form-item>
          <el-form-item prop="content">
            <el-select v-model="formTool.content" clearable placeholder="发票内容" size="mini">
              <el-option v-for="li in contentType" :key="li.value" :label="li.label" :value="li.value" />
            </el-select>
          </el-form-item>
          <el-form-item prop="date">
            <el-date-picker v-model="formTool.date" type="daterange" size="small" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
          </el-form-item>
        </el-form>
      </div>

      <div>
        <MyButton type="primary" text="查询" @click="getList()" />
        <MyButton type="" text="重置" @click="reset()" />
      </div>

    </div>

    <div class="center">
      <MyTable :table-data="tableData" :index="index" expand :selection="selection" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getList" @handleSelectionChange="handleSelectionChange">
        <!-- <template slot="image" slot-scope="scope">
          <el-image :src="scope.row.image" style="width: 80px; height: 80px" />
        </template>
        <template slot="type" slot-scope="scope">
          <el-image :src="scope.row.image" style="width: 80px; height: 80px" />
        </template> -->
        <template slot="expand" slot-scope="props">
          <div class="expand_box">
            <div class="expand_li"><strong>表id：</strong><span>{{ props.row.id }}</span></div>
            <div class="expand_li"><strong>订单号：</strong><span>{{ props.row.orderId }}</span></div>
            <div class="expand_li"><strong>开票流水号：</strong><span>{{ props.row.serialNo }}</span></div>
            <div class="expand_li"><strong>发票号：</strong><span>{{ props.row.invoiceNo }}</span></div>
            <div class="expand_li"><strong>开票时间：</strong><span>{{ props.row.invoiceTime }}</span></div>
            <div class="expand_li"><strong>申请开票时间：</strong><span>{{ props.row.submitTime }}</span></div>
            <div class="expand_li"><strong>开票完成时间：</strong><span>{{ props.row.finishTime }}</span></div>
            <div class="expand_li"><strong>发票抬头：</strong><span>{{ props.row.title }}</span></div>

            <div class="expand_li"><strong>发票状态：</strong><span>{{ allStatus[props.row.status] }}</span></div>
            <div class="expand_li"><strong>发票类型：</strong><span>{{ allTypes[props.row.type] }}</span></div>
            <div class="expand_li"><strong>发票金额：</strong><span>{{ props.row.amount }}</span></div>
            <div class="expand_li"><strong>发票内容：</strong><span>{{ props.row.content }}</span></div>
            <div class="expand_li"><strong>创建者：</strong><span>{{ props.row.createBy }}</span></div>
            <div v-if="props.row.imgUrl" class="expand_li"><strong>发票预览：</strong>
              <div class="expand_li_more">
                <el-image class="expand_li_img" :src="props.row.imgUrl" :preview-src-list="[props.row.imgUrl]" />
              </div>
            </div>
            <div v-if="props.row.fileUrl" class="expand_li"><strong>发票PDF地址：</strong>
              <div class="expand_li_more">
                <a class="expand_li_link" :href="props.row.fileUrl" target="_blank">查看文件</a>
                <!-- <el-button type="text" size="mini" @click="goFileView(props.row.fileUrl)">查看文件</el-button> -->
              </div>
            </div>
            <!-- integer	 -->
            <!-- 订单id	integer	 -->
            <!-- string	 -->
            <!-- sallerShopId	卖家商户id	integer	 -->
            <!-- buyerShopId	买方商户id（收票方）	integer	 -->
            <!-- invoiceNo	发票号	string	 -->
            <!-- title	发票抬头	string	 -->
            <!-- fileUrl	发票pdf文件地址	string	 -->
            <!-- imgUrl	发票预览图片地址	string	 -->
            <!-- status	发票状态1.申请中 2.申请失败（驳回）3.开票中，4.已开票	string	 -->
            <!-- invoiceTime	开票时间	string	 -->
            <!-- submitTime	申请开票时间	string	 -->
            <!-- finishTime	开票完成时间	string	 -->
            <!-- type	发票类型：1-增值税电子专用发票, 2-增值税电子普通发票	string	 -->
            <!-- amount	发票金额	number	 -->
            <!-- content	发票内容	string	 -->
            <!-- createTime	创建时间	string	 -->
            <!-- updateTime	修改时间	string	 -->
            <!-- createBy	创建者	string	 -->
            <!-- updateBy	更新人	string -->
          </div>
        </template>
        <!-- <template slot="menu" slot-scope="scope">
          <el-button type="button" size="mini" icon="el-icon-edit" @click="editDetail(scope.row)">编辑</el-button>
        </template> -->
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/myButton'
import MyTable from '@/components/myTable'
import MyTabs from '@/components/myTabs'
import { drugenumeration } from '@/utils/enumeration'
import { getcheckList } from '@/api/productManage/auditProduct'
import { getContentType, sellerPage, buyerPage } from '@/api/financialcenter'
export default {
  components: { MyButton, MyTable, MyTabs },
  data() {
    return {
      tabsData: [{ name: '销项开票记录' }, { name: '进项开票记录' }],
      tabsIndex: 0,
      text: '',
      clearable: true,
      allStatus: { '1': '申请中', '2': '申请失败（驳回）', '3': '开票中', '4': '已开票' },
      allTypes: { '1': '增值税电子专用发票', '2': '增值税电子普通发票' },
      formTool: {
        date: null,
        invoiceNo: '',
        content: ''
      },
      contentType: [],
      invoiceType: [],
      operation: false,
      selection: false,
      index: false,
      tableData: [],
      tableOption: [
        { label: '开票日期', prop: 'invoiceTime' },
        { label: '发票号码', prop: 'invoiceNo' }, // 这里表示自定义列, slot: true
        { label: '发票抬头', prop: 'title' },
        { label: '发票内容', prop: 'content' },
        { label: '发票类型', prop: 'type' },
        { label: '订单号', prop: 'orderId' }
      ],
      page: {
        total: 0,
        current: 1,
        size: 10
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getType()
    this.getList()
  },
  mounted() {

  },
  beforeCreate() { },
  beforeMount() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { },
  methods: {
    goFileView(url) {
      if (!url) { this.$message.err('跳转路径为空'); return }
      window.open(url, '_blank');
    },
    tabChange(i) {
      this.tabsIndex = i
      this.page.current = 1
      this.page.total = 0
      this.tableData = []
      this.getList()
    },
    getType() {
      getContentType().then((res) => {
        if (res.code == 0) {
          const { contentType, invoiceType } = res.data
          this.contentType = contentType.map(li => {
            return { label: li.value, value: li.code }
          })
          this.invoiceType = invoiceType.map(li => {
            return { label: li.value, value: li.code }
          })
        }
      })
    },
    getList() {
      const { current, size } = this.page
      const { date, invoiceNo, content } = this.formTool
      // date: null,
      // invoiceNo: '',
      // content: ''
      // startDate: 2023-02-01
      // endDate: 2023-02-04
      const d = { current, size } // ,pages: 10
      if (content) { d.content = content }
      if (invoiceNo) { d.invoiceNo = invoiceNo }
      if (date && date.length > 0) {
        d.startDate = date[0]
        d.endDate = date[1]
      }
      // console.log(d)
      if (this.tabsIndex == 0) {
        this.getListA(d)
      } else {
        this.getListB(d)
      }
    },
    getListA(d) {
      sellerPage(d).then((res) => {
        if (res.code == 0) {
          console.log(res)
          const { records, total } = res.data;
          this.tableData = records
          this.page.total = total
        }
      })
    },
    getListB(d) {
      buyerPage(d).then((res) => {
        if (res.code == 0) {
          console.log(res)
          const { records, total } = res.data;
          this.tableData = records
          this.page.total = total
        }
      })
    },
    reset() {
      // this.formTool.storeName = ''
      this.$refs.formTool.resetFields()
      this.formTool = { date: null, invoiceNo: '', content: '' }
      this.page.current = 1
      this.getList()
    },
    typeCheck(type) {
      // GENERAL.增值税电子专用发票 dedicated.增值税电子普通发票
      if (type) {
        let item = this.invoiceType.filter((i) => i.code == type)
        return item[0].value
      }
    },
    contentCheck(type) {
      // GENERAL.增值税电子专用发票 dedicated.增值税电子普通发票
      if (type) {
        let item = this.contentType.filter((i) => i.code == type)
        return item[0].value
      }
    },
    handleSelectionChange(val) { }
  }
}
</script>
<style lang='scss' scoped>
.comContent {
  padding: 0px;
}
.expand {
  &_box {
    padding: 20px 30px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  &_li {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 45%;
    margin-right: 3%;
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 10px;
    word-break: break-all;
    strong {
      margin-right: 10px;
      font-weight: 400;
      color: #000;
    }
    span {
      color: #666;
    }
    &_more {
      position: relative;
    }
    &_link {
      color: #0da1a8;
      &:hover {
        color: #3db4b9;
      }
    }
    &_img {
      width: 100px;
      height: 100px;
    }
  }
}
.center {
  margin: 0 24px;
  height: calc(100% - 140px);
}
.myTabs {
  height: 56px;
  padding: 0 24px;
  border-bottom: 1px solid #f5f5f5 !important;
}
.topHeader {
  padding: 0 24px;
  display: flex;
  text-align: left;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  line-height: 56px;
}
.el-form-item {
  margin-bottom: 0px !important;
}
</style>
