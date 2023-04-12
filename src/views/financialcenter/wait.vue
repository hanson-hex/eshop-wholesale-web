<template>
  <div class="classification card new">
    <div class="search fl_bet">
      <div class="left">
        <div class="search_name">待开发票</div>
      </div>
      <div class="right fl_cen">
        <el-date-picker v-model="time" size="small" class="picker" type="daterange" align="left" unlink-panels value-format="yyyy-MM-dd" start-placeholder="开始日期" range-separator="-" end-placeholder="结束日期" :picker-options="pickerOptions" clearable @change="queryTableData(1)" />
        <el-input v-model="query.code" size="small" placeholder="订单号" style="width: 176px; margin-left: 8px" clearable @keyup.enter.native="queryTableData(1)" />
        <el-button size="small" type="primary" style="margin-left:10px" @click="queryTableData(1)">查询</el-button>
        <el-button size="small" @click="reset()">重置</el-button>
      </div>
    </div>
    <div class="tables collapse_list">
      <el-collapse v-if="tableData.length > 0" v-model="activeNames" :loading="isLoading" accordion @change="handleChange">
        <el-collapse-item v-for="(row, index) in tableData" :key="index" :name="row.id">
          <template slot="title">
            <div class="top_list fl_bet">
              <div class="items fl">
                <div class="item big">{{ row.orderTime }}</div>
                <div class="item nums">
                  <span>订单号：</span>
                  <span class="msg">{{ row.orderCode }}</span>
                </div>
                <div class="status fl_cen">
                  <el-image class="icon_status" :src="getStatus(1, row.status)" />
                  <span class="text" :class="getStatus(3, row.status)">{{ getStatus(2, row.status) }}
                  </span>
                </div>
              </div>
              <div class="btns" @click.stop="stopClick">
                <el-button v-if="row.clinicName" class="popover_btn">{{
                  row.clinicName
                }}</el-button>
                <el-button v-if="row.serialStatus=='CHECK'" class="detail_btn" @click.stop="watchBtn(row.id, row.orderId)">同意开票
                </el-button>
                <el-button v-if="row.serialStatus=='CHECK'" class="detail_btn" @click.stop="uploadFaPiao(row.id, row.orderId)">上传开票
                </el-button>
              </div>
            </div>
          </template>
          <div class="bom_list">
            <div v-for="(item, index) in tableList" :key="index" class="list fl_cen border_no" :loading="isLoading">
              <div class="left fl_cen">
                <div class="img fl_center">
                  <el-image :src="item.image" />
                </div>
                <div class="names">
                  <div>{{ item.goodsName }}</div>
                  <div>
                    <!-- {{ validateBtn('factory', item, 'baseSupplierTypeEnums') }} -->
                  </div>
                </div>
              </div>
              <div class="cen">{{ item.specification }}</div>
              <div class="right fl_end">
                <div>× {{ item.qty }}</div>
                <div>￥ {{ item.smallPrice }}</div>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-empty v-else style="height:100%;width:100%" description="暂无数据" />
    </div>
    <!-- 分页 -->
    <div class="bottom">
      <!-- <Pagination :total="query.pages" :loading="isLoading" :table="query" :current-page.sync="query.size" @changePage="changePage" @changeSize="changeSize" /> -->
      <Pagination :total="query.pages" :page.sync="query.current" :limit.sync="query.size" @pagination="changePage" />
    </div>

    <el-dialog title="上传开票" :visible.sync="dialogVisible" width="60%" :before-close="()=>{dialogVisible=false}">
      <p style="margin:10px 0px">上传附件信息(上传实物盖章发票清晰扫描文件，多张发票请扫描成一个PDF，文件命名规格:公司名称 +结算单号</p>
      <div>
        <el-upload ref="upload" class="upload-demo" action="#" :data="fileData" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-change="change" :on-exceed="handleExceed" :file-list="fileList" :on-success="success" :auto-upload="false" accept=".jpg, .png, .pdf">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">附件不能超过10M，最多上传1个，文件格式PDF、JPG、PNG</div>
        </el-upload>
      </div>
      <p class="tip" style="margin-top:10px">说明:提交发票时发票信息列表中的开票金额累加后应大于等于结算单的计算总金额</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'
import { busiPage, manual, print, goodorderDetail } from '@/api/financial/wait'
import { checkStatus } from '@/utils/status'
// import { correspondingVal } from '@/util/validate'
export default {
  name: 'WaitIndex',
  components: { Pagination },
  data() {
    return {
      isLoading: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近15天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      time: '',
      query: {
        current: 1,
        size: 10,
        pages: 0,
        code: '',
        status: '',
        startOrderTime: '',
        endOrderTime: '',
      },
      activeNames: '',
      tableData: [],
      tableList: [],
      dialogVisible: false,
      // 上传相关
      fileList: [],
      action: '',
      fileData: {
        orderId: '',
      }
    }
  },
  computed: {
    ...mapGetters(['permissions']),
    ...mapState('App', {
      selectList: 'selectList',
    }),
    getStatus() {
      return (type, status) => checkStatus(type, status)
    },
  },
  methods: {
    // validateBtn(val, row, name) {
    //   return correspondingVal(name, row, val, this.selectList)
    // },
    // 重置查询
    reset() {
      this.time = []
      this.query = {
        current: 1,
        size: 10,
        pages: 0,
        code: '',
        status: '',
        startOrderTime: '',
        endOrderTime: '',
      }
    },
    // 查询
    queryTableData(current) {
      if (current) {
        this.query.current = current
      }
      this.isLoading = true
      if (this.time != null && this.time.length > 0) {
        this.query.startDate = this.time[0]
        this.query.endDate = this.time[1]
      } else {
        this.query.startDate = null
        this.query.endDate = null
      }
      busiPage(this.query)
        .then((res) => {
          this.isLoading = false
          if (res.data && res.code != 1) {
            this.tableData = res.data.records || []
            this.query.pages = res.data.total
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
    // 切换page current 等
    changePage(val) {
      this.queryTableData()
    },
    // 点击展开
    handleChange() {
      // console.log(this.activeNames);
      this.tableList = []
      this.getdemoList()
    },
    async getdemoList() {
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
    watchBtn(i) {
      let params = {
        id: i
      }
      print(params).then((res) => {
        if (res.code == 0) {
          this.$message.success('申请开票中，请注意查看消息中心的开票成功提示')
          this.queryTableData(1)
        } else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.msg)
      })
    },
    uploadFaPiao(row) {
      this.fileData.orderId = row
      this.dialogVisible = true
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 10 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    change(file, fileList) {
      this.fileList = fileList
      console.log(file)
      console.log(fileList)
    },
    submitUpload(file) {
      let formData = new FormData()
      // if (!file || !file.raw) {
      //   return
      // }
      if (this.fileList.length > 0) {
        this.fileList.forEach(item => {
          formData.append('file', item.raw)
        })
      }
      formData.append('orderId', this.fileData.orderId)
      // 上传
      manual(formData).then((res) => {
        if (res.code == 0) {
          // this.$emit('uploadSuccess', res.data.url)
          // this.$emit('uploadiseditor', false)
          this.$message.success('上传成功！')
          this.queryTableData(1)
          this.dialogVisible = false
        } else {
          // this.$emit('uploadiseditor', false)
          this.$message.error(res.msg)
        }
      })
        .catch(() => {
          // this.$emit('uploadFile', '')
          // this.$emit('uploadiseditor', false)
        })
    },
    success(res) {
      console.log(res)
    }
  },
  mounted() {
    this.queryTableData()
  },
  created() {
    this.action = process.env.VUE_APP_API_BASE_URL + '/sale/sale/invoice/manual'
  },
}
</script>
<style lang="scss" scoped>
@import '@/styles/index.scss';
.classification {
  padding: 0px;
  .search {
    height: 56px;
    padding: 0 24px;
  }
  .collapse_list {
    padding: 0 24px;
    height: calc(100% - 103px);
    overflow: auto;
  }
  .bottom {
    padding: 0 24px;
  }
  .left {
    display: inline-block;
  }
  .right {
    float: right;
  }
  .tables {
    padding-top: 0;
  }
}
</style>
