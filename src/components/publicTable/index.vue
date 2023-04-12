<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-table :ref="columObj.tableName" v-loading="columObj.loading" size="medium" :data="tableData" :stripe="false"
      :border="false" :fit="true" :show-header="true" :highlight-current-row="true" :row-class-name="tableRowClassName"
      class="custom__table tables" @row-click="rowClick" @selection-change="handleSelectionChange">
      <!-- 选择框是否开启，selectable控制是否单行禁用 -->
      <el-table-column v-if="columObj.selection" type="selection" :selectable="columObj.selectable" width="50px"
        align="left" />
      <!-- 普通列 -->
      <el-table-column v-for="(column, columIndex) in columObj.columnData" :key="columIndex" :prop="column.prop"
        :label="column.label" :width="column.width" :fixed="column.fixed" :align="column.align || 'center'"
        :sortable="column.sortable" :index="columIndex" show-overflow-tooltip>
        <template slot-scope="{ row, $index }">
          <el-input-number v-if="column.numInput" v-model="row[column.prop]" :step="1" :step-strictly="true" :min="1"
            :max="99999999" @change="column.buttonClick(row, $index)" />
          <!-- 默认展示 -->
          <span v-if="column.text && column.editRow != $index">
            {{ row[column.prop] }}
          </span>
          <!-- 状态对象展示 -->
          <span v-if="column.status && row[column.prop]">
            {{ row[column.prop].msg }}
          </span>
          <!-- 自定义内容 -->
          <span v-if="column.ownDefined">
            {{ column.ownDefinedReturn(row, $index) }}
          </span>
          <!-- 自定义样式内容 -->
          <span v-if="column.ownStyle">
            <!-- <slot></slot> -->
            <span style="color: red; font-size: 16px; font-weight: 600">￥{{ column.ownDefinedReturn(row, $index) }}</span>
          </span>
          <!-- switch开关 -->
          <el-switch v-if="column.switch" v-model="row[column.prop]" :active-value="column.activeVal || true"
            :inactive-value="column.inactiveVal || false" :inactive-text="
              row[column.prop] ? column.openText : column.closeText
            " active-color="#0DA1A8" :disabled="!column.ownDefinedReturn(row, $index)"
            @change="switchChange(row, $index, column.prop)" />
          <!-- 图片展示 -->
          <el-popover trigger="hover" placement="top" popper-class="popper">
            <!-- <img v-if="column.image" :src="viewUrl + row[column.prop]" /> -->
            <el-image v-if="column.image" slot="reference" :src="viewUrl + row[column.prop] || avater">
              <div slot="error" class="image-slot fl_center">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
          </el-popover>
          <!-- 根据table表定制化药品图片和名称厂商的样式 -->
          <div v-if="column.imageText" style="
                display: flex;
                justify-items: center;
                justify-content: flex-start;
                height: 60px;
              ">
            <!-- 图片展示 -->
            <el-image slot="reference" :src="row[column.prop] || avater" style="width: 60px">
              <div slot="error" class="image-slot fl_center" style="width: 80px; height: 80px">
                <i class="el-icon-picture-outline" />
              </div>
            </el-image>
            <div style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  margin-left: 10px;
                  width: 70%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                ">
              <p style="
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: 0px;
                  ">
                {{ row[column.prop2] }}
              </p>
              <p style="
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: 0px;
                  ">
                {{ column.ownDefinedReturn(row, $index) }}
              </p>
            </div>
          </div>

          <!-- 图片数组 -->
          <el-popover v-if="column.imageArr" trigger="hover" placement="top" popper-class="popper">
            <img v-if="row[column.prop].length > 0" :src="row[column.prop][0] || avater">
            <el-image v-if="row[column.prop].length > 0" slot="reference" :src="row[column.prop][0] || avater"
              :preview-src-list="row[column.prop]" />
          </el-popover>

          <!-- 可编辑input，仅在text默认展示类型才可编辑-->
          <el-input v-if="column.editRow == $index" v-model="row[column.prop]" v-focus
            @blur="editInputBlur(row, $index, column.prop, columIndex)" />
          <!-- 可编辑input，每一行都可编辑-->
          <el-input v-if="column.isEdit" v-model="row[column.prop]" v-focus type="number" min="0"
            @blur="editInputBlur(row, $index, column.prop, columIndex)" />
          <!-- 操作按钮 -->
          <template v-if="column.isOperation">
            <div>
              <span v-for="(operations, index) in column.operation" :key="index">
                <el-button v-if="operations.isShow(row, $index)" :icon="operations.icon" :type="operations.type" :style="{
                  color: operations.color
                    ? operations.color + `!important`
                    : `none`,
                }" size="small" class="text_btn" @click="operations.buttonClick(row, $index)">{{ operations.label
}}</el-button>
                <el-divider v-if="operations.lineisShow(row, $index)" direction="vertical" />
              </span>
            </div>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div v-if="columObj.isShow" class="page_div" :style="{ textAlign: pageObj.position || 'center' }">
      <el-pagination :hide-on-single-page="false" :current-page="pageObj.page.current" :pager-count="7"
        :page-size="pageObj.page.size" background layout="total,prev, pager, next,sizes" :total="pageObj.total"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script>
import avater from "/public/img/default.png"
export default {
  directives: {
    // 自定义指令,用于可编辑input自动获取焦点
    focus: {
      inserted: function (e) {
        e.querySelector('input').focus()
      }
    }
  },
  props: {
    tableData: {
      type: Array,
      required: true
    },
    columObj: {
      type: Object,
      required: {
        isShow: false
      }
    },
    // columObj.type(如果为""空，就不会加载多选框，或者index编号),lazy(是否支持懒加载)
    // columnData.columType(列类型,可选text(默认为普通文字模式),input(input可编辑框),switch(switch开关),image(图片),operation(操作按钮))
    // prop(参数),label(列名),width(宽度),align(对齐方式),sortable(是否支持排序)
    // 如果为操作列,则需要填写需要的操作按钮,类型为Object。type(按钮样式,参考el—botton类型),label(按钮文字)icon(参考el-icon),color(字体颜色),buttonClick为点击后调用的方法名称
    pageObj: {
      type: Object,
      required: true
    }
  },
  data() {
    let readUploadFileUrl = this.$store.state.user.readUploadFileUrl
    return {
      viewUrl: readUploadFileUrl,
      avater: avater
    }
  },
  methods: {
    // 数据前面的勾选
    handleSelectionChange(row) {
      this.$emit('handleSelectionChange', row)
    },
    // switchChange调用
    switchChange(row, $index, prop) {
      this.$emit('switchChange', row, $index, prop)
    },
    // 帮助点击行，获取点击的下标
    tableRowClassName({ row, rowIndex }) {
      row.rowIndex = rowIndex
    },
    // 点击行
    rowClick(row, column, event) {
      this.$emit('rowClick', row, column, event)
    },
    // 可编辑input失去焦点
    editInputBlur(row, $index, prop, columIndex) {
      this.$emit('editInputBlur', row, $index, prop, columIndex)
    },
    // 条数变化
    handleSizeChange(e) {
      this.$emit('handleSizeChange', e)
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit('handleCurrentChange', e)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-button {
  margin: 0 6px;
}

::v-deep .el-input__inner {
  border: 1px solid rgba(0, 105, 52, 0.1);
}

::v-deep .el-image__inner {
  height: 50px;
}

// switch左边文字颜色
::v-deep .el-switch__label--left {
  color: #606266;
}

img {
  height: 400px;
}

.page_div {
  padding: 15px 0;
}

.tables {
  ::v-deep .el-table__header thead th {
    height: 54px !important;
    background-color: #d1f2f6 !important;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85) !important;
    line-height: 22px;
    font-size: 14px !important;
    font-weight: 600;
    line-height: 22px;
  }
}</style>
