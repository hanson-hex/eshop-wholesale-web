<template>
  <div class="classification">
    <div class="top fl_bet">
      <div class="name">购物车（全部{{ (list && list.length) || 0 }}）</div>
      <!-- <div class="feature fl_center">
        <div class="sel">已选择<b>{{multipleSelection&&multipleSelection.length || 0}}</b>件商品</div>
        <div class="add_all fl_bet">
          <span class="sel">商品合计：</span>
          <span class="price">¥ {{totalMoney}}</span>
        </div>
        <el-button type="primary" class="closing">去结算</el-button>
      </div> -->
    </div>
    <publicTable ref="publicTable" :table-data="list" :colum-obj="columObj" :page-obj="pageObj" @switchChange="switchChange" @editInputBlur="editInputBlur" @rowClick="rowClick" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" @handleSelectionChange="handleSelectionChange" />
    <div class="bottom fl_bet top">
      <!-- <div class="fl_center">
        <div class="sel_all">
          <el-checkbox v-model="checked" @change="toggleSelection"
            >全选</el-checkbox
          >
        </div>
        <div class="sel btn" @click="delCommodity">删除选中商品</div>
      </div> -->
      <div class="feature fl_center">
        <div class="sel">
          已选择<b>{{ (multipleSelection && multipleSelection.length) || 0 }}</b>种商品
        </div>
        <div class="add_all fl_bet">
          <span class="sel">商品合计：</span>
          <el-button class="price" :loading="isLoading">{{
            isLoading ? '计算中' : '¥ ' + totalMoney
          }}</el-button>
        </div>
        <el-button type="primary" class="closing" @click="goDetail">去结算</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { getPage, delCart, postCart, goodesCheck } from '@/api/shoppingcart/shoppingcart'
import { mapGetters, mapState } from 'vuex'
import publicTable from '@/components/publicTable'
import { returnFloat, accMul, correspondingVal } from '@/utils/validate'
export default {
  name: 'PurchaseIndex',
  components: { publicTable },
  data() {
    return {
      isLoading: false,
      checked: false,
      list: [],
      totalMoney: 0,
      multipleSelection: [],
      selectionIs: false,
      allList: [],

      pageObj: {
        // 分页对象
        isShow: false,
        position: 'right', // 分页组件位置
        total: 0,
        page: {
          size: 10,
          current: 1,
          goodsName: '',
          supplierId: '',
          type: '',
        },
      },
      tableData: [],
      columObj: {
        tableName: 'table',
        // 选择框
        isShow: false,
        selection: true,
        // 选择框根据条件是否可选
        selectable: () => {
          return true
        },
        lazy: 'true',
        loading: false,
        // column列,columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
        // prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
        columnData: [
          {
            imageText: true,
            prop: 'image',
            prop2: 'name',
            prop3: 'factory',
            label: '商品信息',
            width: '300',
            align: 'left',
            sortable: false,
            ownDefinedReturn: (row) => {
              return row.factory
            },
          },
          {
            text: true,
            prop: 'specification',
            label: '规格',
            width: '',
            align: 'center',
            ownDefinedReturn: (row) => {
              // returnFloat(accMul(row.qty, row.price))
              return row.specification
            },
          },
          {
            ownDefined: true,
            prop: 'price',
            label: '单价',
            width: '',
            align: 'center',
            ownDefinedReturn: (row) => {
              return returnFloat(row.price)
            },
          },

          {
            numInput: true,
            prop: 'qty',
            label: '数量',
            width: '200',
            align: 'center',
            buttonClick: this.numBtn,
          },
          {
            ownStyle: true,
            prop: 'smallPrice',
            label: '小计',
            width: '',
            align: 'center',
            ownDefinedReturn: (row) => {
              return returnFloat(accMul(row.qty, row.price))
            },
          },
          {
            isOperation: true,
            label: '操作',
            width: '280',
            align: 'center',
            sortable: false,
            operation: [
              {
                type: 'text',
                label: '删除',
                icon: '',
                color: '#444',
                buttonClick: this.detelBtn,
                isShow: () => {
                  return true
                },
                lineisShow: () => {
                  return false
                },
              },
            ],
          },
        ],
      },
    }
  },
  computed: {
    emptyText() {
      if (this.loading) {
        return '正在加载'
      } else {
        return '暂无数据'
      }
    },
    ...mapGetters(['permissions']),
    ...mapState('App', {
      selectList: 'selectList',
    }),
  },
  methods: {
    rowOperation(row, $index) {
      console.log(row, $index)
    },
    switchChange(row, $index, prop) {
      console.log(row, $index, prop)
    },
    rowClick(row, column) {
      // 点击行触发，编辑点击的所在列，排除selection选择框
      if (
        column.type != 'selection' &&
        this.columObj.columnData[column.index].editRow === null
      ) {
        this.columObj.columnData[column.index].editRow = row.rowIndex
      }
    },
    editInputBlur(row, $index, prop, columIndex) {
      this.columObj.columnData[columIndex].editRow = null
    },
    // 页码变化
    handleCurrentChange(e) {
      this.pageObj.page.current = e
      this.queryTableData()
    },
    // 条数变化
    handleSizeChange(e) {
      this.pageObj.page.size = e
      this.pageObj.page.current = 1
      this.queryTableData()
    },
    numBtn(row) {
      this.informchange(row)
    },
    detelBtn(row) {
      this.isLoading = true
      let idList = [row.id]
      delCart(idList)
        .then(() => {
          this.isLoading = false
          this.$message.success('删除成功～')
          this.queryTableData()
          this.totalMoney = 0
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    queryTableData() {
      getPage()
        .then((res) => {
          this.isLoading = false
          this.list = res.data ? res.data.cartVos : []
          this.totalMoney = res.data ? res.data.sumPrice : ''
          this.selectionIs = false
          this.$nextTick(() => {
            let arr = []
            this.list.forEach((row) => {
              if (row.beSelect) {
                this.$refs.publicTable.$refs.table.toggleRowSelection(row)
                this.selectionIs = false
                arr.push(row)
              }
            })
            this.multipleSelection = Array.from(new Set(arr))
            this.selectionIs = true
          })
        })
        .catch(() => {
          this.isLoading = false
        })
    },
    toggleSelection(value) {
      this.checked = value
      if (value) {
        console.log(this.$refs)
        this.list.forEach((row) => {
          this.$refs.multipleTable.toggleAllSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      if (this.selectionIs) {
        this.isLoading = true
        let result = []
        let ids = []
        this.list.forEach(item => {
          if (!item.beSelect) {
            result.push({ id: item.id, beSelect: false })
          } else {
            result.push({ id: item.id, beSelect: true })
          }
        })
        if (val.length > 0) {
          val.forEach(item => {
            ids.push(item.id)
          })
        }
        result.forEach(item => {
          if (ids.length > 0 && ids.indexOf(item.id) > -1) {
            item.beSelect = true
          } else {
            item.beSelect = false
          }
        })
        // let unresult = this.list
        //   .concat(val)
        //   .filter(
        //     (item, index, arr) => arr.indexOf(item) === arr.lastIndexOf(item)
        //   )
        // unresult.forEach((row) => {
        //   result.push({ id: row.id, beSelect: false })
        // })
        // if (val.length > 0) {
        //   val.forEach((row) => {
        //     result.push({ id: row.id, beSelect: true })
        //   })
        // }
        this.multipleSelection = val
        goodesCheck(result).then((res) => {
          if (res.code == 0) {
            this.isLoading = false
            if (!res.data || !res.data.sumPrice) {
              this.totalMoney = 0
            } else {
              this.totalMoney = res.data.sumPrice
            }
          }
        })
      }
    },
    reduceMoney() {
      // refreshGoodsQuick(list)
      //   .then((res) => {
      //     if (res.data.code == 0) {
      //       this.totalMoney = returnFloat(res.data.data.sumPrice);
      //     }
      //     this.isLoading = false;
      //   })
      //   .catch(() => {
      //     this.isLoading = false;
      //   });
    },
    // delCommodity() {
    //   this.isLoading = true;
    //   let idList = [];
    //   this.multipleSelection.forEach((element) => {
    //     idList.push(element.id);
    //   });
    //   delCart(idList)
    //     .then((res) => {
    //       this.isLoading = false;
    //       this.$message.success("删除成功～");
    //       this.queryTableData();
    //       this.totalMoney = 0;
    //     })
    //     .catch(() => {
    //       this.isLoading = false;
    //     });
    // },
    goDetail() {
      const that = this
      if (this.multipleSelection.length > 0) {
        let allids = []
        let isqty = false
        this.multipleSelection.forEach((res) => {
          if (!res.qty || res.qty < 1) {
            isqty = true
            return that.$message.error('商品数量不能小于1～')
          }
          allids.push({ id: res.goodsId, qty: res.qty })
        })
        if (isqty) return
        this.$router.push({
          path: '/drugprocurement/shoppingcart-confirmOrder',
          query: { ids: JSON.stringify(allids) },
        })
      } else {
        this.$message.error('请先选择商品～')
      }
    },
    informchange(data) {
      let list = {
        goodsSkuId: data.goodsSkuId,
        qty: data.qty,
      }

      if (!data.qty || data.qty < 1) {
        return this.$message.error('商品数量不能小于1～')
      }
      postCart(list)
        .then((res) => {
          if (res.code == 0) {
            if (this.multipleSelection.length > 0) {
              if (this.multipleSelection.indexOf(data) != -1) {
                this.handleSelectionChange(this.multipleSelection)
              }
            }
            this.ischange = false
          }
        })
        .catch(() => {
          this.ischange = true
        })
    },
  },
  activated() {
    this.queryTableData()
  },
  created() { },
  mounted() {
    this.queryTableData()
  },
}
</script>
<style lang="scss" scoped>
// @import '../../styles/main.css';
.classification {
  padding: 0 32px 95px 32px;
  position: relative;
  // width: 1640px;

  .top {
    height: 52px;
    margin: 17px 0;

    .name {
      font-size: 18px;
      font-weight: bold;
      width: auto;
      max-width: 200px;
    }
    .sel:hover,
    .price:hover {
      cursor: pointer;
    }
    .feature {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      padding-right: 30px;
      .sel {
        display: flex;
        align-items: center;
        margin-right: 22px;
        font-size: 14px;
        font-weight: normal;
      }
      .add_all {
        display: flex;
        align-items: center;
        margin-right: 29px;
        .price {
          font-size: 18px;
          border: 0;
          color: red !important;
          font-weight: 600;
        }
      }
    }
    .sel.btn:hover {
      color: #2c7a51;
    }
    .closing {
      width: 94px;
      height: 52px;
      background: #2c7a51;
      border-radius: 100px;
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
      border: 0;
      padding: 0 0;
    }
  }
  .bottom {
    // position: fixed;
    bottom: 0;
    width: calc(100% - 208px);
    left: 228px;
    height: 72px;
    z-index: 10;
    margin: 0 auto;
    padding: 10px 32px;
    background-color: #ffffff;
    .sel_all {
      width: 76px;
      margin-right: 19px;
      font-size: 14px;
      padding-left: 16px;
    }
  }
}

.custom__table {
  position: relative;
  .cell {
    .el-input-number__decrease {
      width: 20px !important;
      height: 20px !important;
      border-radius: 3px !important;
      border: 1px solid #e4e4e4 !important;
      color: #999999 !important;
      background-color: #ffffff !important;
    }
  }
  ::v-deep thead {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    height: 37px;
    line-height: 37px;
    background: #f8f8f8;
  }

  // ::v-deep tbody tr {
  //   height: 156px;
  // }

  ::v-deep .el-table__cell.is-left .cell,
  ::v-deep .el-table__cell.is-right .cell {
    padding: 0 30px !important;
  }

  ::v-deep tbody tr td:nth-child(7),
  ::v-deep tbody tr td:nth-child(6),
  ::v-deep tbody tr td:nth-child(9) {
    font-weight: 520;
  }
}
</style>
