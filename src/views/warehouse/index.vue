<template>
  <div class="classification">
    <el-form ref="formTool"
             :model="formTool"
             :inline="true"
             style="text-align: left">
      <el-form-item prop="storeName"
                    label="商品名称：">
        <el-input v-model="formTool.storeName"
                  placeholder="请输入商品名称"
                  `
                  size="small" />
      </el-form-item>
      <el-form-item prop="storeNum"
                    label="批准文号：">
        <el-input v-model="formTool.storeNum"
                  placeholder="请输入批准文号"
                  size="small" />
      </el-form-item>
      <el-form-item>
        <MyButton type="success"
                  text="查询"
                  @click="clickBtn" />
      </el-form-item>
      <el-form-item>
        <MyButton type="success"
                  text="重置"
                  @click="reset()" />
      </el-form-item>
      <el-form-item>
        <MyButton type="success"
                  text="批量上架"
                  @click="clickBtn" />
      </el-form-item>
    </el-form>
    <div class="center">
      <MyTable :table-data="tableData"
               :index="index"
               :selection="selection"
               :page="page"
               :operation="operation"
               :table-option.sync="tableOption"
               @page-change="getList"
               @handleSelectionChange="handleSelectionChange">
        <template slot="ranks"
                  slot-scope="scope">
          <el-image :src="scope.row.ranks"
                    style="width: 80px; height: 80px" />
        </template>
        <template slot="menu"
                  slot-scope="scope">
          <el-button type="button"
                     size="mini"
                     icon="el-icon-delete"
                     @click="deleteHandle(scope.row)">下架</el-button>
        </template>
      </MyTable>
    </div>
  </div>
</template>

<script>
import MyInput from '@/components/MyInput'
import MyButton from '@/components/myButton'
import MyTable from '@/components/myTable'

export default {
  components: { MyButton, MyTable }, // MyInput,
  data () {
    return {
      formTool: {
        storeName: '',
        storeNum: '',
      },
      text: '',
      clearable: true,

      operation: true,
      selection: true,
      index: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          ranks:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          ranks:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          ranks:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          ranks:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          ranks:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          ranks:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          ranks:
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        },
      ],
      tableOption: [
        { label: '编号', prop: 'date' },
        { label: '商品图', prop: 'ranks', slot: true }, // 这里表示自定义列
        { label: '商品名称', prop: 'name' },
        { label: '第三方商品编码', prop: 'address' },
        { label: '剩余库存数', prop: 'address' },
        { label: '有效期', prop: 'address' },
        { label: '发布时间', prop: 'address' },
      ],
      page: {
        total: 60,
        current: 1,
        size: 20,
        pageSizes: [20, 30, 50, 100],
      },
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
  methods: {
    change (val) {
      console.log(val)
      this.text = val
    },
    clickBtn () {
      console.log('111')
    },
    deleteHandle (row) {
      console.log(row)
    },
    getList () {
      console.log(this.page, 'page')
    },
    handleSelectionChange (val) {
      console.log(val)
    },
  },
}
</script>
<style lang="scss" scoped></style>
