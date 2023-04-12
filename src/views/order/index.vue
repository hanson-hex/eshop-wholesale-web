<!--  -->
<template>
  <div class="order">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- <el-form v-for="(item,index) in props.row.children" :key="index" label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ item.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ item.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ item.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ item.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ item.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ item.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ item.desc }}</span>
            </el-form-item>
          </el-form> -->
          <table>
            <tr v-for="(item,index) in props.row.children" :key="index">
              <th>
                {{ item.name }}
              </th>
              <th>
                {{ item.name }}
              </th>
              <th>
                {{ item.name }}
              </th>
              <th>
                {{ item.name }}
              </th>
              <th>
                {{ item.name }}
              </th>
            </tr>
          </table>
        </template>
      </el-table-column>
      <el-table-column label="商品 ID" prop="id" />
      <el-table-column label="商品名称" prop="name" />
      <el-table-column label="描述" prop="desc" />
    </el-table>
  </div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      tableData: [{
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
        children: [
          {
            id: '12987122',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'

          }
        ]
      }, {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }, {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333'
      }]
    };
  },
  computed: {},
  watch: {},
  methods: {

  },
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
}
</script>
<style lang='scss' scoped>
</style>
