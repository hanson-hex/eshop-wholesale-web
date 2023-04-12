<!-- 定价管理里面的表格组件 -->
<template>
  <div class="price">
    <el-table :data="tableData" style="width: 100%" :span-method="arraySpanMethod" :default-expand-all="true">
      <el-table-column type="expand" style="width:1px">
        <template slot-scope="scope">
          <table v-if="scope.row.priceDetailedList.length > 0" rules="all" frame="border" class="builtinTableClass">
            <tr v-for="(item,index) in scope.row.priceDetailedList" :key="index">
              <th v-if="index % 3 == 0" class="thClass" style="min-width:398px" rowspan="3">
                <div class="imageBox">
                  <el-image :src="scope.row.image || avater" alt="" style="width: 80px;height:80px" />
                  <div class="fontBox">
                    <p class="name">{{ scope.row.goodsName }}</p>
                    <p class="duanluo pihao">{{ scope.row.approvalNumber }}</p>
                    <p class="duanluo">{{ scope.row.factory }}</p>
                  </div>
                </div>
              </th>
              <th v-if="index % 3 == 0" class="thClass" style="min-width:100px" rowspan="3">
                <p class="duanluo">{{ scope.row.regionName }}</p>
              </th>
              <th class="thClass" style="min-width:100px">
                <p class="duanluo">{{ item.agencyTypeName }}</p>
              </th>
              <th class="thClass" style="text-align:left;min-width:100px">
                <div>
                  <p class="duanluo">{{ item.retailPrice }}</p>
                </div>
              </th>
              <th class="thClass" style="text-align:left;min-width:100px">
                <div>
                  <p class="duanluo">{{ item.wholesalePrice }}
                  </p>
                </div>
              </th>
              <th class="thClass" style="text-align:left;min-width:100px">
                <div>
                  <p class="duanluo">{{ item.wholesaleMinAmount }}
                  </p>
                </div>
              </th>
              <th v-if="index % 3 == 0" class="thClass" style="min-width:200px" rowspan="3">
                <div>
                  <p>{{ scope.row.createTime }}</p>
                  <p>{{ scope.row.updateBy ? scope.row.updateBy : scope.row.createBy }}</p>
                </div>
              </th>
              <th v-if="index % 3 == 0" class="thClass" style="min-width:120px" rowspan="3">
                <div>
                  <el-link type="primary" :underline="false" style="margin-right:10px" @click="clickPrice(scope.row.id)">定价</el-link>
                  <el-link type="primary" :underline="false" @click="clickDel(scope.row.id)">删除</el-link>
                </div>
              </th>
            </tr>
          </table>
        </template>
      </el-table-column>
      <el-table-column label="商品信息" prop="orderCode" min-width="350" align="left" />
      <el-table-column label="定义区域" prop="orderCode" align="left" min-width="100" />
      <el-table-column label="机构类型" prop="orderCode" align="left" min-width="100" />
      <el-table-column label="零售价" prop="orderCode" align="left" min-width="100" />
      <el-table-column label="批发价" prop="orderCode" align="left" min-width="100" />
      <el-table-column label="起订量" prop="orderCode" align="left" min-width="100" />
      <el-table-column label="最后操作人" prop="orderCode" align="left" min-width="200" />
      <el-table-column label="操作" prop="orderCode" align="left" min-width="120" />
    </el-table>
  </div>
</template>

<script>
// import { checkStatus } from '@/utils/status'
import avater from "/public/img/default.png"

export default {
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    routerType: {
      type: String,
      default: 'sale'
    }
  },
  data() {
    return {
      avater: avater
    };
  },
  computed: {
    // getStatus() {
    //   return (type, status) => checkStatus(type, status)
    // }
  },
  watch: {},
  methods: {
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      // if (rowIndex == 0) {
      if (columnIndex == 1) {
        return [1, 7];
      } else {
        return [0, 0]
      }
      // }
    },
    // 定价
    clickPrice(goodsRegionId) {
      this.$emit('clickPrice', goodsRegionId)
    },
    // 删除
    clickDel(goodsRegionId) {
      this.$emit('clickDel', goodsRegionId)
    }
  },
  created() {
    console.log(this.tableData, '13488188003')
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
.price {
  height: 100%;
  overflow: auto;
  ::v-deep tbody {
    tr :first-child {
      th {
        padding: 10px 0;
      }
    }
  }
}
::v-deep .el-table__expanded-cell {
  padding: 0px 0px;
}
.builtinTableClass {
  width: 100%;
  border-color: #ebeef5;
}
.thClass {
  text-align: center;
  padding: 5px 0px;
  div {
    color: #595959 !important;
    font-size: 14px;
    font-weight: 400;
    // font-family: PingFangSC, PingFangSC-Regular;
    padding: 0px 10px;
  }
  .submit {
    text-align: center !important;
  }
  .btn {
    display: block;
    padding: 5px 0;
  }
}
.imageBox {
  display: flex;
  align-items: center;
  .name {
    margin: 7px 0;
    color: #262626;
  }
  .pihao {
    color: #595959;
  }
  .el-image {
    padding: 0px !important;
  }
}
.duanluo {
  margin: 3px;
  font-weight: 400;
  .detail {
    float: right;
  }
}
.lastStatus {
  float: right;
}
::v-deep .el-table--enable-row-transition .el-table__body td.el-table__cell {
  background: #edf6f6;
  padding: 10px 0;
  border-radius: 4px;
}
::v-deep
  .el-table--enable-row-transition
  .el-table__body
  td.el-table__expanded-cell {
  background: #fff;
  margin: 16px 0 0px 0;
}
::v-deep
  .el-table--enable-row-hover
  .el-table__body
  tr:hover
  > td.el-table__expanded-cell {
  background: #fff !important;
}

.el-table td.el-table__cell div {
  // color: white;
  text-align: left;
}
::v-deep .el-table td.el-table__cell {
  border-bottom: none;
}
::v-deep .el-table tbody tr:hover > td {
  background: #edf6f6 !important;
}
.icon_status {
  height: 20px;
  width: 20px;
  vertical-align: top;
}
.text {
  margin-left: 10px;
}
.yellow {
  color: #f99b0d;
}
.green {
  color: #32bf78;
}
.gray {
  color: #8c8c8c;
}
.marrinLeft {
  margin-left: 16px;
}
::v-deep .expanded {
  display: none;
}
</style>
