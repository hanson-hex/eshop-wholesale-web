<template>
  <el-config-provider namespace="el" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings';
import { handleThemeStyle } from '@/utils/theme';
import { onMounted, nextTick } from 'vue';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
//zhCn.el.pagination.goto = '跳至';

onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme);
  });
});
</script>
