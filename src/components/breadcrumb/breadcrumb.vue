<template>
  <div class="breadcrumb" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',

  provide() {
    return {
      breadcrumb: this,
    };
  },

  props: {
    separator: {
      type: String,
      default: '/',
    },
  },

  mounted() {
    const items = this.$el.querySelectorAll('.breadcrumb__item');
    if (items.length) {
      items[items.length - 1].setAttribute('aria-current', 'page');
    }
  },
};
</script>

<style scope lang="scss">
.breadcrumb {
  font-size: 14px;
  line-height: 1;
}
</style>
