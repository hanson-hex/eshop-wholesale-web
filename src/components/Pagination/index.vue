<template>
  <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination :current-page.sync="currentPage" :page-size.sync="pageSize" :layout="layout" :page-sizes="pageSizes" :total="total" v-bind="$attrs" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  background: #fff;
  .el-pagination {
    text-align: right;
    color: #595959;
    .btn-prev,
    .btn-next {
      color: #ff5f17;
    }
    span:not([class*='suffix']),
    button {
      color: #000000;
      font-size: 12px;
      padding: 0;
    }
    button:hover {
      color: #ff5f17;
      background: rgba(255, 95, 23, 0.15);
      border-radius: 8px;
      min-width: 26px;
      height: 26px;
      margin: 0px 5px;
    }
    .btn-prev,
    .btn-next {
      padding: 0;
    }
    .el-input--medium .el-input__inner {
      width: 32px;
      height: 22px;
      border-radius: 6px;
      border: 1px solid #ff5f17 !important;
      padding: 0 !important;
    }
  }
  .el-pager li {
    color: #c4ced7;
  }
  .el-pager li.active {
    color: #ffffff;
    background-color: #000000;
    height: 26px;
    min-width: 26px;
    min-height: 26px;
    line-height: 26px;
    cursor: default;
    border-radius: 8px;
  }
  .el-pager li:hover {
    color: #ff5f17;
  }
}
.pagination-container.hidden {
  display: none;
}
</style>
