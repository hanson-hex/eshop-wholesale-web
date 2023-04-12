<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <template v-for="(item,i) in tableOption">
        <el-table-column :key="i" :min-width="item.minWidth" :prop="item.prop" :label="item.label" :align="item.align || 'left'" :show-overflow-tooltip="item.overHidden || true">
          <template slot-scope="scope">
            <el-form-item :prop="'SKUlist.'+scope.$index+'.periodDate'" :rules="{type: 'date',required: true, message: '请填写有效期至', trigger: 'change'}" label-width="0">
              <!-- <el-date-picker
                v-model="scope.row.periodDate"
                type="date"
                placeholder="选择日期"
                style="width:140px"
              />
              <el-input></el-input> -->
            </el-form-item>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" align="left">
        <template slot-scope="scope">
          <slot name="menu" :row="scope.row" :$index="scope.$index" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default ({
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    }, // 列表数据
    tableOption: {
      type: Array,
      default() {
        return []
      }
    } // 表头
  },
  data() {
    return {

    }
  }
})
</script>

