<!-- myTabs -->
<template>
  <span class="com_type" :class="{'success':(type=='ALREADY' || type == '2'),'err':(type=='FAIL' || type == '1')}">
    {{ typeText || '待审核' }}
  </span>
</template>

<script>
import { auditTypes } from '@/utils/enumeration'
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    typeText() {
      return auditTypes(this.type)
    }
  },
  methods: {
    tabChange() {
      this.$emit('click')
    }
  }
}
</script>
<style lang='scss' scoped>
.com {
  &_type {
    position: relative;
    color: #595959;
    font-size: 14px;
    &:before {
      content: '';
      display: inline-block;
      margin-right: 3px;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      // vertical-align: middle;
      background: #f99b0d;
    }
    &.success {
      &:before {
        background: #0da1a8;
      }
    }
    &.err {
      &:before {
        background: #ff4d4f;
      }
    }
  }
}
</style>
