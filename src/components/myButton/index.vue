<!--  -->
<template>
  <el-button :type="type" :icon="icon" :disabled="disabled" :loading="loading" :size="size" :round="round" :plain="plain" :circle="circle" @click="click">{{ text }}</el-button>

</template>

<script>

export default {
  components: {},
  // 属性参考element-ui
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: '提交'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    round: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

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
    click() {
      this.$emit('click')
    }
  }
}
</script>
<style lang='scss' scoped>
//  样式统一设置在styles-->element-ui.scss
</style>
