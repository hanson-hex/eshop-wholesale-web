<template>
  <div class="zt__table">
    <!-- :max-height="maxHeight" -->
    <el-table v-loading="isLoading"
              :max-height="maxHeight"
              highlight-current-row
              :data="tableData"
              :border="border"
              @cell-click="cellClick"
              @selection-change="handleSelectionChange"
              @current-change="handleCurrentChange"
              @row-click="rowClick">
      <el-table-column v-if="selection"
                       type="selection"
                       width="55"
                       align="left" />
      <el-table-column v-if="index"
                       type="index"
                       label="序号"
                       align="left"
                       width="50">
        <template slot-scope="scope">
          <span>{{ scope.$index + (page.current - 1) * page.size + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column v-if="expand"
                       type="expand"
                       label=""
                       align="left"
                       width="50">
        <template slot-scope="props">
          <slot name="expand"
                :row="props.row"
                :$index="props.$index" />
        </template>
      </el-table-column>
      <template v-for="(item,i) in tableOption">
        <el-table-column :key="i"
                         :min-width="item.minWidth"
                         :max-width="item.maxWidth"
                         :width="item.width"
                         :prop="item.prop"
                         :label="item.label"
                         :align="item.align || 'left'"
                         :show-overflow-tooltip="item.overHidden || true"
                         :fixed="item.fixed">
          <template slot-scope="scope">
            <slot v-if="item.slot"
                  :name="scope.column.property"
                  :row="scope.row"
                  :$index="scope.$index" />
            <span v-else>{{ scope.row[scope.column.property] }}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column v-if="operation"
                       label="操作"
                       align="left">
        <template slot-scope="scope">
          <slot name="menu"
                :row="scope.row"
                :$index="scope.$index" />
        </template>
      </el-table-column>
    </el-table>
    <Pagination v-show="page.total>0 && showpage"
                :total="page.total"
                :page-sizes="page.pageSizes"
                :page.sync="page.current"
                :limit.sync="page.size"
                @pagination="pageChange" />
  </div>
</template>

<script>
import Pagination from '../Pagination'
export default {
  name: 'ZtTable',
  components: {
    Pagination
  },
  props: {
    maxHeight: {
      type: String,
      default () {
        return '100%'
      }
    },
    isLoading: {
      type: Boolean,
      default () {
        return false
      }
    },
    selection: {
      type: Boolean,
      default () {
        return false
      }
    }, // 是否设置勾选，默认不设置
    index: {
      type: Boolean,
      default () {
        return true
      }
    }, // 是否设置序号，默认设置
    showpage: { // 是否显示分页组件
      type: Boolean,
      default () {
        return true
      }
    },
    expand: { // 是否显示expand扩展组件
      type: Boolean,
      default () {
        return false
      }
    },
    border: {
      type: Boolean,
      default () {
        return false
      }
    }, // 是否设置边框，默认不要
    operation: {
      type: Boolean,
      default () {
        return false
      }
    }, // 是否有操作列，默认无
    tableData: {
      type: Array,
      default () {
        return []
      }
    }, // 列表数据
    tableOption: {
      type: Array,
      default () {
        return []
      }
    }, // 表头
    page: {
      type: Object,
      default () {
        return {
          total: 0,
          current: 1,
          page: 10,
          pageSizes: [10, 20, 30, 50]
        }
      }
    } // 分页
  },
  computed: {
    // currentPage: {
    //   get() {
    //     return this.page.current
    //   },
    //   set(val) {
    //     this.$emit('update:page.current', val)
    //   }
    // },
    // limit: {
    //   get() {
    //     return this.page.size
    //   },
    //   set(val) {
    //     this.$emit('update:page.size', val)
    //   }
    // }
  },
  methods: {
    pageChange () {
      this.$emit('page-change')
    },
    cellClick (row, column, cell, event) {
      this.$emit('cell-click', { row, column, cell, event })
    },
    rowClick (row, column, event) {
      this.$emit('rowClick', { row, column, event })
    },
    handleSelectionChange (val) {
      this.$emit('handleSelectionChange', val)
    },
    handleCurrentChange (val) {
      this.$emit('handleCurrentChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.zt__table {
  height: 100%;
  width: 100%;
  ::v-deep .el-table {
    height: 100%;
    .el-table__body-wrapper {
      height: calc(100% - 48px);
      overflow: auto;
      // overflow-x: hidden;
    }
  }
  ::v-deep .el-pagination {
    padding: 10px 0 0 0;
  }
}
</style>
