<!-- myTabs -->
<template>
  <div class="tabs_box">
    <p v-for="(li,i) in tabs" :key="i" :class="{'act':tabi == (keyname?li[keyname]:i)}" @click="tabChange(keyname?li[keyname]:i)">
      {{ li.name }} <span v-if="!(numhide || li.numhide)">{{ '(' +li.num + ')' }}</span></p>
  </div>
</template>

<script>
export default {
  // name:"myTabs",
  // components: {},
  // 属性参考element-ui
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    tabi: {
      type: [Number, String],
      default: 0
    },
    keyname: {
      type: String,
      default: ''
    },
    numhide: {
      type: Boolean,
      default: false
    },
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  // data() {
  //   return {

  //   }
  // },
  // computed: {
  //   tabIndex: {
  //     get() {
  //       return this.value
  //     },
  //     set(val) {
  //       this.$emit('change', this.inputText)
  //     }
  //   }
  // },
  // created() {

  // },
  // mounted() {

  // },
  // beforeCreate() { },
  // beforeMount() { },
  // beforeUpdate() { },
  // updated() { },
  // beforeDestroy() { },
  // destroyed() { },
  // activated() { },
  methods: {
    tabChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
<style lang='scss' scoped>
.tabs {
  &_box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid #eee;
    margin-bottom: 10px;
    p {
      font-size: 16px;
      color: #595959 !important;
      cursor: pointer;
      position: relative;
      margin-right: 16px !important;
      &.act {
        color: #0da1a8 !important;
        &:before {
          content: '';
          position: absolute;
          width: 100%;
          height: 2px;
          background: #0da1a8 !important;
          bottom: -16px;
          left: 0;
        }
      }
    }
  }
}
</style>
