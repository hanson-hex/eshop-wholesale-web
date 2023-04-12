<!--  -->
<template>
  <div class="myButton">
    <p>封装组件示例</p>
    <MyButton type="success" icon="el-icon-delete" text="删除" :disabled="disabled" :loading="loading" size="medium" :round="round" :plain="plain" :circle="circle" @click="clickBtn" />
    <MyInput :text="text" :clearable="clearable" @change="change" />
    <imgUpload v-model="image" />
    <wangEnduit :value="details" :is-clear="isClear" @changeEndit="watchEndit" />
    <MySelect :options="options" :value-key="valueKey" :multiple="multiple" :collapse="collapse" :text="textSelect" :clearable="clearable" :disabled="disabled" @change="changeSelect" />
    <MyTable :table-data="tableData" :page="page" :operation="operation" :table-option.sync="tableOption" @page-change="getList" @cell-click="cellClick">
      <template slot="ranks" slot-scope="scope">
        <el-tag>{{ scope.row.ranks }}</el-tag>
      </template>
      <template slot="menu" slot-scope="scope">
        <el-button type="button" size="mini" icon="el-icon-delete" @click="deleteHandle(scope.row)">删除</el-button>
      </template>
    </MyTable>
  </div>
</template>

<script>
import MyButton from '@/components/myButton'
import imgUpload from '@/components/imgUpload'
import wangEnduit from '@/components/wangEnduit'
import MyInput from '@/components/MyInput'
import MySelect from '@/components/mySelect'
import MyTable from '@/components/myTable'
export default {
  components: { MyButton, MyInput, MySelect, MyTable, imgUpload, wangEnduit },
  data() {
    return {
      text: 'text',
      clearable: true,
      isClear: false, // 清除富文本编辑内容
      disabled: false,
      loading: false,
      round: false,
      plain: false,
      circle: false,
      image: [],
      textSelect: '',
      details: '',
      multiple: true,
      collapse: true,
      valueKey: 'value',
      options: [{
        value: '选项1',
        label: '黄金糕',
        disabled: true
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

      operation: true,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        ranks: '编辑'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        ranks: '编辑'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        ranks: '编辑'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        ranks: '编辑'
      }],
      tableOption: [
        { label: '日期', prop: 'date' },
        { label: '姓名', prop: 'name' },
        { label: '地址', prop: 'address' },
        { label: '职级', prop: 'ranks', slot: true } // 这里表示自定义列
      ],
      page: {
        total: 10,
        current: 1,
        size: 10
      }
    }
  },
  computed: {},
  watch: {},
  created() {

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
    watchEndit(val) { // 监听富文本编辑传过来的数据
      console.log(val)
    },
    getList() {
      console.log(this.page, 'page')
    }, // 数据获取
    cellClick(e) {
      console.log(e, 'e')
    },
    deleteHandle(row) {
      console.log(row, 'row')
    },
    clickBtn() {
      console.log('111')
    },
    change(val) {
      console.log(val)
      this.text = val
    },
    changeSelect(value) {
      console.log(value)
      this.textSelect = value
    },
    changeO(value) {
      console.log(value)
    }
  }
}
</script>
<style lang='scss' scoped>
.myButton {
  padding: 30px;
}
</style>
