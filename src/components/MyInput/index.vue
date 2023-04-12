<!-- input -->
<template>
  <el-input
    v-model="inputText"
    :size="size"
    :type="type"
    :placeholder="placeholder"
    :clearable="clearable"
    :disabled="disabled"
    @input="change"
  />
</template>

<script>

export default {
  components: {},
  // 属性参考element-ui
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
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
      default: 'small'
    }
  },
  data() {
    return {

    }
  },
  computed: {
    inputText: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('change', this.inputText)
      }
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
  methods: {
    change(val) {
      this.$emit('change', val)
    }
  }
}
</script>
<style lang='scss' scoped>

</style>
