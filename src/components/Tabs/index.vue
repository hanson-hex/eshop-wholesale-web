<!--  -->
<template>
  <div class='tabs'>
    <el-tabs v-model="active"
             class="headerTabs"
             @tab-click="handleClick">

      <el-tab-pane :label="item.label"
                   v-for="(item,index) in tabsList"
                   :key="index"
                   :name="item.name">
        <span v-if="item.value  > 0"
              slot="label">
          {{item.label}}
          <el-badge :value="item.value"
                    class="item" />
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  components: {},
  // model: {
  //   prop: 'activeName',
  //   event: 'tab-click'
  // },
  props: {
    activeName: {
      type: String,
      default: 'first'
    },
    tabsList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      // active: this.activeName
    };
  },
  computed: {
    active: {
      get () {
        return this.activeName
      },
      set (val) {
        this.$emit('update:activeName', val)
        return val
      }
    }
  },
  watch: {},
  methods: {
    handleClick (val) {
      // console.log(val)
      // this.active = val.name
      // this.$parent.activeName = this.active
      this.$emit('tab-click')
    }
  },
  created () {

  },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
}
</script>
<style lang='scss' scoped>
.headerTabs {
  padding: 0px 24px;
  border-bottom: 1px solid #f5f5f5;
}
</style>