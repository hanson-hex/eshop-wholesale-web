<template>
  <span class="breadcrumb__item">
    <span :class="['breadcrumb__inner', to ? 'is-link' : '']" ref="link" role="link">
      <slot></slot>
    </span>
    <span class="breadcrumb__separator" role="presentation">{{ separator }}</span>
  </span>
</template>
<script>
export default {
  name: 'BreadcrumbItem',
  inject: ['breadcrumb'],
  props: {
    to: {
      type: Object,
      default() {
        return null;
      },
    },
    replace: Boolean,
  },
  data() {
    return {
      separator: '',
    };
  },

  mounted() {
    this.separator = this.breadcrumb.separator;
    const link = this.$refs.link;
    link.setAttribute('role', 'link');
    link.addEventListener('click', (_) => {
      const { to, $router } = this;
      if (!to || !$router) return;
      this.replace ? $router.replace(to) : $router.push(to);
    });
  },
};
</script>

<style scope lang="scss">
.breadcrumb__item {
  font-size: 14px;
  line-height: 1;
}

.breadcrumb__inner.is-link,
.breadcrumb__inner a {
  font-weight: 700;
  text-decoration: none;
  // transition: var(--el-transition-color);
  color: #8c8c8c;
}
.breadcrumb__inner.is-link:hover,
.el-breadcrumb__inner a:hover {
  // color: var(--el-color-primary);
  cursor: pointer;
}

.breadcrumb__item:last-child .el-breadcrumb__inner,
.breadcrumb__item:last-child .el-breadcrumb__inner:hover,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a,
.el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
  font-weight: 400;
  cursor: text;
}

.breadcrumb__item {
  .breadcrumb__separator {
    margin-left: 18px;
    margin-right: 18px;
  }
}

.breadcrumb__item:last-child {
  .breadcrumb__separator {
    display: none;
    margin-right: 0px;
  }
}
</style>
