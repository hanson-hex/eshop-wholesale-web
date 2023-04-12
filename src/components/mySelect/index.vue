<!-- myselect -->
<template>
  <div class="mySelect">
    <el-select v-model="value" :multiple="multiple" :collapse-tags="collapse" :placeholder="placeholder" :disabled="disabled" :clearable="clearable" :size="size" :value-key="valueKey" @change="change">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="valueKey=='value'? item:item.value" :disabled="item.disabled" />
    </el-select>
  </div>
</template>

<script>

export default {
  components: {},
  // 属性参考element-ui
  props: {
    text: {
      type: [String, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'medium'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: Boolean,
      default: false
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      value: this.text
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
    change(val) {
      this.$emit('change', val)
    }
  }
}
</script>
<style lang='scss' scoped>
</style>
