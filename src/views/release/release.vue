<!-- 新批量发布商品 -->
<template>
  <div class='comContent'>
    <div class="header">
      <div class="title">批量发布商品（待发布商品）</div>
      <div class="headerBox">
        <div class="everyOneBox">
          <span class="number">202</span>
          <span style="padding-left:8px">个商品可一键上架</span>
          <br />
          <div class="secodeBox">
            <span>202
              <span style="padding-left:8px">个商品通用名称、商品名称、规格、包装单位、批准文号、厂家、产地与标准库ID不一致，发布后将使用标准库信息</span>
            </span><br />
            <span style="display:inline-block; margin-top:5px">
              202
              <span style="padding-left:8px">个商品69码与标准库ID不一致</span></span>
          </div>
        </div>
        <div class="everyOneBox">
          <span class="number">218</span>
          <span style="padding-left:8px">个商品没有商品图片</span>
          <br />
          <div class="secodeBox">
            <span>商品发布后将导致在首页、推荐等重要位置流量受限，立即搜索无图商品，批量上传商品图片</span>
          </div>
        </div>
        <div class="everyOneBox">
          <span class="number">222</span>
          <span style="padding-left:8px">个商品存在问题</span>
          <br />
          <div class="secodeBox">
            <span>其中包括匹配失败、匹配结果多个、商品信息不全/单位不规范、商品经营范围不在企业经营范围内、暂无销售权限</span>
          </div>
        </div>
      </div>
    </div>
    <div class="search">
      <div class="">
        <el-input size="small"
                  v-model="input"
                  placeholder="请输入内容"
                  min-width="50px"></el-input>
      </div>
      <div class="everyItem">
        <el-input size="small"
                  v-model="input"
                  placeholder="请输入内容"
                  min-width="50px"></el-input>
      </div>
      <div class="everyItem">
        <el-input size="small"
                  v-model="input"
                  placeholder="请输入内容"
                  min-width="50px"></el-input>
      </div>
      <div class="everyItem">
        <el-input size="small"
                  v-model="input"
                  placeholder="请输入内容"
                  min-width="50px"></el-input>
      </div>
      <div class="everyItem">
        <el-input size="small"
                  v-model="input"
                  placeholder="请输入内容"
                  min-width="50px"></el-input>
      </div>
      <div class="everyItem">
        <el-select size="small"
                   v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="everyItem">
        <el-select size="small"
                   v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="everyItem">
        <el-select size="small"
                   v-model="value"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="everyItem"
           style="display:flex">
        <el-button size="small"
                   type="primary"
                   @click="query">查询</el-button>
        <el-button size="small"
                   type="primary"
                   @click="reset">重置</el-button>
      </div>
    </div>
    <div class="buttonClass">
      <div class="buttons">
        <el-button size="small"
                   type="primary"
                   @click="shelf">一键上架</el-button>
        <el-button size="small"
                   type="primary"
                   @click="match">重新匹配</el-button>
        <el-button size="small"
                   @click="importGoods">批量导入商品</el-button>
        <el-button size="small"
                   @click="uploadPicture">批量上传商品图片</el-button>
        <el-button size="small"
                   @click="deriveGoods">导出商品</el-button>
        <el-button size="small"
                   @click="importRecord">商品导入记录</el-button>
        <el-button size="small"
                   @click="deleteGoods">删除</el-button>
      </div>
      <div class="buttonFont">
        注：该列表内的商品包含“ERP对接抓取的商品” 和 “Excel批量上传的商品”，如您未对接ERP则可点击“批量导入商品”按钮上传商品
      </div>
    </div>
    <div class="bottom">
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane label="未发布（222）"
                     name="first">
          <div class="activeBox"
               v-if="activeName == 'first'">
            <MyTable :table-data="tableData"
                     :index="index"
                     :selection="selection"
                     :page="page"
                     :operation="operation"
                     :table-option.sync="tableOption"
                     @page-change="getList"
                     @handleSelectionChange="handleSelectionChange">
              <template slot="unit"
                        slot-scope="scope">
                <span>
                  {{scope.row.unit}}
                </span>
                <i class="el-icon-edit-outline"></i>
              </template>
              <template slot="caozuo"
                        slot-scope="">
                <el-link type="primary"
                         :underline="false">补充商品信息</el-link>
              </template>
            </MyTable>
          </div>

        </el-tab-pane>
        <el-tab-pane label="已发布（211）"
                     name="second">
          <div class="activeBox"
               v-if="activeName == 'second'">
            <MyTable :table-data="tableData"
                     :isLoading="isLoading"
                     :index="index"
                     :selection="selection"
                     :page="page"
                     :operation="operation"
                     :table-option.sync="tableOption"
                     @page-change="getList"
                     @handleSelectionChange="handleSelectionChange">
              <template slot="unit"
                        slot-scope="scope">
                <span>
                  {{scope.row.unit}}
                </span>
                <i class="el-icon-edit-outline"></i>
              </template>
              <template slot="caozuo"
                        slot-scope="">
                <el-link type="primary"
                         :underline="false">补充商品信息</el-link>
              </template>
            </MyTable>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog title="商品匹配结果不一致提醒"
               :visible.sync="dialogVisible"
               width="30%">
      <span>您有202个商品通用名称、商品名称、规格、包装单位、批准文号、厂家、产地与匹配的标配不一致，发布后将使用标配信息，请检查无误后再发布或重新创建商品</span>
      <p>提示：请认证检查列表上的标红信息，否则将导致客户收到的货物与平台展示的商品信息不符，引起客诉！</p>
    </el-dialog>
  </div>

</template>

<script>
import MyTable from '@/components/myTable'
export default {

  components: { MyTable },
  data () {
    return {
      dialogVisible: true,
      isLoading: false,
      operation: false, // table组件中的操作按钮
      selection: true, // 表格是否支持选择
      index: false, // 表格中的序号
      tableData: [ // 表格数据
        {
          image: 111,
          name: 111,
          taxCode: 111,
          factory: 111,
          approvalNumber: 111,
          createTime: 111,
          status: 111,
          unit: 111,
          caozuo: 111,
        }
      ],
      tableOption: [ // table中的columns
        // { label: '编号', prop: 'goodsId' },
        { label: '匹配状态', prop: 'image' }, // 这里表示自定义列
        { label: '商品来源', prop: 'name' },
        { label: 'ERP编码', prop: 'taxCode' },
        { label: '商品名称', prop: 'factory' },
        { label: '条码', prop: 'approvalNumber' },
        { label: '批准文号', prop: 'createTime' },
        { label: '生产厂家', prop: 'status' },
        { label: '产地', prop: 'status' },
        { label: '规格', prop: 'status' },
        { label: '单位', prop: 'unit', slot: true },
        { label: '价格', prop: 'status' },
        { label: '库存', prop: 'status' },
        { label: '匹配ID', prop: 'status' },
        { label: '是否有图', prop: 'status' },
        { label: '操作', prop: 'caozuo', slot: true, minWidth: '100' },
      ],
      page: { // 表格中的page
        total: 10,
        current: 1,
        size: 10
      },
      activeName: 'first', // tab
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      input: '',
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获取page
    getList () {

      console.log(this.page)
    },
    // 选中
    handleSelectionChange (val) {
      console.log(val)
    },
    // 查询
    query () {

    },
    // 重置
    reset () {

    },
    // 一键上架
    shelf () {

    },
    // 重新匹配
    match () {

    },
    // 批量导入商品
    importGoods () {

    },
    // 批量上传商品图片
    uploadPicture () {

    },

    // 导出商品
    deriveGoods () {

    },
    // 商品导入记录
    importRecord () {

    },
    // 删除
    deleteGoods () {

    },
    // tab切换
    handleClick () {
    }
  },
  created () {

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
}
</script>
<style lang='scss' scoped>
.comContent {
  .header {
    .title {
      height: 56px;
      line-height: 56px;
      font-size: 16px;
      font-weight: 700;
      color: #262626;
    }
    .headerBox {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .everyOneBox {
        width: 32.5%;
        padding: 15px;
        font-size: 14px;
        color: #595959;
        border: 1px solid #f5f5f5;
        border-radius: 4px;
        .number {
          font-size: 16px;
          color: #262626;
        }
        .secodeBox {
          width: 100%;
          margin-top: 15px;
        }
      }
    }
  }
  .search {
    display: flex;
    padding: 24px 0;
    .everyItem {
      margin-left: 8px;
    }
  }
  .buttonClass {
    .buttons {
      display: flex;
    }
    .buttonFont {
      padding-top: 15px;
      font-size: 14px;
      color: #595959;
    }
  }
  .bottom {
    height: calc(100% - 318px);
    ::v-deep .el-tabs {
      height: 100%;
      .el-tabs__header {
        border-bottom: 1px solid #f5f5f5;
      }
      .el-tabs__content {
        height: calc(100% - 56px);
        .el-tab-pane {
          height: calc(100% - 45px);
          .activeBox {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>