<!--  -->
<template>
  <div class="classification">
    <div class="main">
      <div class="top">
        <span class="titleFont">{{ title }}</span>
        <el-button v-if="status=='DataImportSuc'"
                   size="small"
                   type="primary"
                   style="margin-left:20px"
                   @click="runMatch">执行匹配</el-button>
        <span style="float:right">
          <!-- <el-button v-if="status == 'MatchFinish'" size="small" icon="el-icon-bottom" @click="fileExport">导出失败商品</el-button> -->
          <el-button size="small"
                     icon="el-icon-top"
                     @click="dialogVisible=true">批量导入</el-button>
          <el-button v-if="status == 'MatchFinish'"
                     size="small"
                     type="primary"
                     icon="el-icon-plus"
                     @click="productDataImport">确定导入</el-button>
        </span>
      </div>
      <div class="content">
        <div class="leftChoice">
          <div class="leftCenter">
            <ul>
              <li v-for="(item,index) in listOne"
                  :key="item.id"
                  :class="item.id == clickId ? 'activeClass':''"
                  @click="clickLi(item,index)">{{ item.shopName }}</li>
            </ul>
          </div>
        </div>
        <div v-if="status == 'MatchFinish'"
             class="center">
          <el-form ref="formTool"
                   :model="formTool"
                   :inline="true"
                   style="text-align:left;">
            <el-form-item prop="chemName"
                          label="药品通用名：">
              <el-input v-model="formTool.chemName"
                        placeholder="请输入药品通用名"
                        clearable
                        size="small" />
            </el-form-item>
            <el-form-item>
              <el-button size="small"
                         type="primary"
                         @click="matchDataPage(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="small"
                         @click="reset()">重置</el-button>
            </el-form-item>
          </el-form>
          <div class="myTable">
            <MyTable :index="false"
                     :table-data="matchTableData"
                     :page="page"
                     :table-option.sync="tableOption"
                     @page-change="getList"
                     @rowClick="rowClick" />
          </div>
          <div class="myTable"
               style="border-left:1px solid #ccc">
            <MyTable :index="false"
                     :is-loading="isLoading"
                     :table-data="tableData"
                     :showpage="false"
                     :table-option.sync="tableOption"
                     @handleSelectionChange="handleSelectionChange"
                     @rowClick="rowClickRight" />
            <el-button v-if="status == 'MatchFinish'"
                       class="submitBtn"
                       size="small"
                       type="primary"
                       icon="el-icon-plus"
                       @click="MatchDataConfirm">确定关联</el-button>
          </div>
        </div>
      </div>

    </div>
    <el-dialog title="批量导入"
               :visible.sync="dialogVisible"
               width="30%">
      <div>
        <div class="box">
          <p>1: 先下载导入模板，按格式填写数据</p>
          <p style="color:orange">（注：Excel 中黄色为必填字段，其他为非必填字段，请按示例格式规范填写）</p>
          <el-button size="small"
                     icon="el-icon-bottom"
                     type="primary"
                     @click="fileTemplate">下载模板</el-button>
        </div>
        <div class="box">
          <p>2: 选择保存的Excel文件，点击导入即可完成批量导入</p>
          <p style="color:orange">（注：仅限 xlsx 格式）</p>
          <el-upload class="upload-demo"
                     accept=".xlsx"
                     :action="action"
                     :on-success="success"
                     multiple
                     :headers="headers">
            <el-button size="small"
                       icon="el-icon-top"
                       type="primary">表格导入</el-button>
          </el-upload>
        </div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisible = false">取 消</el-button>
        <el-button size="small"
                   type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MyTable from '@/components/myTable'
import { getToken } from "@/utils/auth";
import { getmatchTask, matchDataPage, unMatchDataPage, runMatch, fileExport, productDataImport, fileTemplate, targetDataPage, MatchDataConfirm, getList } from '@/api/release'

export default {
  components: { MyTable },
  data () {
    return {
      clickId: '', // 选中的医药公司id
      listOne: [], // 医药公司列表
      timer: '', // 定时器
      isLoading: false, // 右侧表格的loading
      orgDateId: '', // 源数据id
      selectList: '', // 右边选中的数据
      formTool: {
        chemName: ''
      },
      action: '',
      status: '',
      title: '待导入',
      taskId: '',
      tableDataOne: [],
      tableDataTwo: [],
      activeName: '0',
      total: 0,
      totalTwo: 0,
      dialogVisible: false,
      matchTableData: [], // 左边数据
      tableData: [], // 右边数据
      tableOption: [
        { label: '批准文号', prop: 'nationalCode', width: '130px' },
        {
          label: '药品通用名/医疗器械产品名称', prop: 'chemName'
        },
        { label: '规格', prop: 'specification', width: '200px' },
        { label: '生产厂家', prop: 'factory' },
        { label: '剂型', prop: 'dosage', width: '130px' },
      ],
      page: {
        total: 0,
        current: 1,
        size: 20
      }
    }
  },
  computed: {
    headers: function () {
      return {
        Authorization: 'Bearer ' + getToken(),
      }
    },
  },
  watch: {},
  created () {
    this.getCompanyList()
    // this.getmatchTask()
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
    // 单机某条医药公司数据
    clickLi (item, index) {
      this.clickId = item.id
      // console.log(https://gateway.cbyyk.com, 'https://gateway.cbyyk.com')
      this.action = 'https://gateway.cbyyk.com' + `/drug/matchTask/fileImport?shopId=${this.clickId}`
      this.getmatchTask(this.clickId)
    },
    // 获取医药公司列表
    getCompanyList () {
      getList().then(res => {
        if (res.code == 0) {
          this.listOne = res.data
          this.clickId = this.listOne[0].id
          // console.log(https://gateway.cbyyk.com, 'https://gateway.cbyyk.com')
          this.action = 'https://gateway.cbyyk.com' + `/drug/matchTask/fileImport?shopId=${this.clickId}`
          this.getmatchTask(this.clickId)
        }
      })
    },
    // tab 切换
    handleClick () {
      this.page = {
        total: 0,
        current: 1,
        size: 10
      }
      if (this.activeName === '0') {
        this.matchDataPage()
      } else if (this.activeName === '1') {
        this.unMatchDataPage()
      }
    },
    getList () {
      if (this.activeName === '0') {
        this.matchDataPage()
      } else if (this.activeName === '1') {
        this.unMatchDataPage()
      }
    },
    handleSelectionChange (val) {
      this.selectList = val
      // if (this.activeName === '0') {
      //   this.matchDataPage()
      // } else if (this.activeName === '1') {
      //   this.unMatchDataPage()
      // }
    },
    // 下载模板
    fileTemplate () {
      fileTemplate().then(res => {
        console.log(res, 123123123)
      })
    },
    // 上传成功
    success (res) {
      if (res.code === 1) {
        this.$message.error(res.msg)
      } else {
        this.$message.success('上传成功')
        this.dialogVisible = false
        this.getmatchTask(this.clickId)
      }
    },
    // 执行匹配
    runMatch () {
      const params = {
        taskId: this.taskId
      }
      runMatch(params).then(res => {
        this.$message.success('正在执行匹配，请耐心等待')
        this.timer = setInterval(() => {
          this.getmatchTask(this.clickId)
        }, 1000)
      })
    },
    // 确定导入
    productDataImport () {
      productDataImport(this.taskId).then(res => {
        if (res.code === 0) {
          this.$message.success('导入成功')
          this.tableData = []
          this.getmatchTask(this.clickId)
        } else {
          this.$message.error('导入失败')
        }
      })
    },
    // // 失败数据导出
    fileExport () {
      const params = {
        taskId: this.taskId
      }
      fileExport(params).then(res => {
        console.log(res)
      })
    },
    // 获取可执行任务
    getmatchTask (id) {
      let params = {
        shopId: id
      }
      getmatchTask(params).then(res => {
        if (res.data) {
          this.status = res.data.status
          this.taskId = res.data.id
          if (res.data.status === 'MatchFinish') {
            this.matchDataPage()
          }
          switch (this.status) {
            case 'MatchFinish':
              clearInterval(this.timer)
              this.title = '匹配完成'
              break
            case 'Exception':
              this.title = '匹配异常'
              break
            case 'Matching':
              this.title = '匹配中,请耐心等待'
              break
            case 'Import':
              this.title = '导入完成'
              break
            case 'DataImportSuc':
              this.title = '数据导入完成'
              break
            case 'DataImportFail':
              this.title = '数据导入失败'
              break
            default:
              this.title = '待导入'
              break
          }
        } else {
          this.status = ''
        }
      })
    },
    // 匹配数据分页
    matchDataPage (current) {
      if (current) {
        this.page.current = current
      }
      const params = {
        chemName: this.formTool.chemName,
        taskId: this.taskId,
        startPage: this.page.current,
        pageSize: this.page.size
      }
      matchDataPage(params).then(res => {
        if (res.data) {
          this.matchTableData = res.data.records
          this.page.total = res.data.total
          this.total = res.data.total
        } else {
          this.matchTableData = []
          this.total = 0
          this.page.total = 0
        }
      })
    },
    // 不匹配数据分页
    unMatchDataPage () {
      const params = {
        taskId: this.taskId,
        startPage: this.page.current,
        pageSize: this.page.size
      }
      unMatchDataPage(params).then(res => {
        if (res.data) {
          this.matchTableData = res.data.records
          this.page.total = res.data.total
          this.totalTwo = res.data.total
        } else {
          this.matchTableData = []
          this.totalTwo = 0
          this.page.total = 0
        }
      })
    },
    // 点击当前行
    rowClick (row, column, event) {
      this.orgDateId = row.row.id
      this.isLoading = true
      targetDataPage(row.row.nationalCode).then(res => {
        if (res.code == 0) {
          this.tableData = res.data
          this.isLoading = false
        } else {
          this.isLoading = false
        }
      })
    },
    rowClickRight (row, column, event) {
      this.selectList = row.row
    },
    // 匹配数据确认
    MatchDataConfirm () {
      if (this.selectList != '') {
        let params = {
          taskId: this.taskId,
          orgDateId: this.orgDateId,
          productId: this.selectList.productId,
          factorDicId: this.selectList.factorDicId,
          centerDrugCode: this.selectList.centerDrugCode,
          goodsId: this.selectList.goodsId,
          packUnit: this.selectList.packUnit
        }
        MatchDataConfirm(params).then(res => {
          if (res.code == 0) {
            this.$message.success('关联成功')
            this.selectList = ''
            this.matchDataPage()
            this.tableData = []
          } else {
            this.$message.error('关联失败')
          }
        })
      } else {
        this.$message.warning('请选择一条数据进行关联')
      }
    },
    reset () {
      this.formTool.chemName = ''
    }
  }
}
</script>
<style lang='scss' scoped>
.classification {
  padding: 0px;
  .main {
    .top {
      // padding-top: 10px;
      line-height: 56px;
      height: 56px;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 24px;
      .titleFont {
        font-size: 16px;
        font-weight: 700;
        color: #262626;
      }
    }
    .content {
      margin: 24px 24px 0 24px;
      height: calc(100% - 102px);
    }
    .leftChoice {
      height: 100%;
      display: inline-block;
      width: 20%;
      overflow: auto;
      border: 1px solid #ddd;
      vertical-align: top;
      border-radius: 4px;
      .leftCenter {
        overflow: auto;
        ul {
          padding-left: 0px;
          margin: 10px 0 10px 0;
          .activeClass {
            background: #f2f8f9;
            color: #0da1a8;
            border-left: 4px solid #0da1a8;
          }
          li {
            color: #595959;
            list-style-type: none;
            cursor: pointer;
            padding: 6px 6px;
            font-size: 14px;
            // padding-left: 10px;
          }
        }
      }
    }
    .center {
      height: 100%;
      display: inline-block;
      margin-left: 10px;
      width: calc(80% - 10px);
      .myTable {
        display: inline-block;
        vertical-align: top;
        padding: 0px 10px;
        width: 50%;
        height: calc(100% - 96px);
        .submitBtn {
          float: right;
          margin-top: 5px;
        }
      }
      .el-tabs--border-card {
        height: 100%;
      }
      ::v-deep .el-badge__content--success {
        background: rgb(61, 180, 185);
      }
      ::v-deep .el-table__body-wrapper {
        height: calc(100% - 93px);
      }
    }
  }
}
</style>
