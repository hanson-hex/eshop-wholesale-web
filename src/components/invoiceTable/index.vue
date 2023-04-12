<!-- myTabs -->
<template>
 <!-- v-for="(ul,i) in demos" :key="i" -->
    <div class="table_li">
        <div class="table_li_title">
          <p>订单日期：{{ info.time }}</p>
          <p>订单号：{{ info.ordernum }}</p>
        </div>
        <div class="table_el">
           <!-- border="1" cellspacing="0" cellpadding="8" -->
          <table cellspacing="0" cellpadding="8">
            <tr>
              <th>商品</th>
              <th>单价</th>
              <th>数量</th>
              <th>应付款</th>
              <th>实付款</th>
              <th>开票金额</th>
              <th>交易操作</th>
            </tr>
            <tr v-for="(li, j) in info.goods" :key="j">
              <td><div>{{ li.name }}</div></td>
              <td><div>{{ li.price }}</div></td>
              <td><div>x{{ li.num }}</div></td>
              <td v-if="j == 0" :rowspan="info.goods.length"><div>{{ info.pay }}</div></td>
              <td v-if="j == 0" :rowspan="info.goods.length"><div>{{ info.realypay }}</div></td>
              <td v-if="j == 0" :rowspan="info.goods.length"><div>{{ info.yun }}</div></td>
              <td v-if="j == 0" :rowspan="info.goods.length"><div @click="elClick(1)">操作按钮</div></td>
            </tr>
          </table>
        </div>
      </div>
</template>

<script>
export default {
  // name:"myTabs",
  // components: {},
  // 属性参考element-ui
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    // tabi: {
    //   type: Number,
    //   default: 0
    // },
    // numhide: {
    //   type: Boolean,
    //   default: false
    // },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  // data() {
  //   return {

  //   }
  // },
  // computed: {
  //   tabIndex: {
  //     get() {
  //       return this.value
  //     },
  //     set(val) {
  //       this.$emit('change', this.inputText)
  //     }
  //   }
  // },
  // created() {

  // },
  // mounted() {

  // },
  // beforeCreate() { },
  // beforeMount() { },
  // beforeUpdate() { },
  // updated() { },
  // beforeDestroy() { },
  // destroyed() { },
  // activated() { },
  methods: {
    elClick(i) {
      this.$emit('click', this.info, i)
    }
  }
}
</script>
<style lang='scss' scoped>
.table{
  &_li{
    position: relative;
    &_title{
      display: flex;
      align-items: center;
      padding: 0 20px;
      background: #e4e4e4;
      p{
        margin-right: 30px;
        color: #333;
        margin: 10px 0;
      }
    }
  }
  &_el{
    table{
      width: 100%;
      border-top:1px solid #ccc;
      border-left:1px solid #ccc;
    }
    // tr{}
    th{
      background: #eee;
      border-bottom:1px solid #ccc;
      border-right:1px solid #ccc;
      div{
        font-weight: 400;
        font-size: 16px;
      }
    }
    td{
      border-bottom:1px solid #ccc;
      border-right:1px solid #ccc;
      div{
        text-align: center;
        // cursor: pointer;
      }
    }
  }
}
</style>
