<!-- 选择单位弹窗 -->
<template>
  <div class="dialog">
    <el-dialog title="选择单位" :visible.sync="visible" width="30%" :before-close="handleClose">
      <div class="dialogBox">
        <span v-for="(item,index) in unitList" :key="index" :class="checkIndex==index?'activeBox': 'everyOneBox'" @click="submitCheck(item,index)">{{ item }}</span>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  props: {
    unitList: {
      type: Array,
      default: function () {
        return []
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      checkIndex: 0,
      // dialogVisible: false,
    };
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible
      },
      set(val) {
        this.$emit('update:dialogVisible', val)
      }
    }
  },
  watch: {},
  methods: {
    // 确认选中的单位
    submitCheck(item, index) {
      this.checkIndex = index
      // this.formTool.skus[this.tableIndex].unit = item
      this.$emit('submitCheck', item)
      this.$parent.dialogVisible = false
    },
    // 选中
    handleClose() {
      this.$parent.dialogVisible = false
    }
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
.dialogBox {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  span {
    font-size: 14px;
    color: #595959;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 5px 15px;
  }
  .everyOneBox {
    border: 1px solid #dcdfe6;
  }
  .activeBox {
    border: 2px solid #0da1a8;
  }
}
</style>
