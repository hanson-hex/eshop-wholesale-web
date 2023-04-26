<template>
  <div class="page-tabs-box">
    <div class="main1200 page-tabs">
      <div class="page-tabs-left">
        <div v-for="(li, i) in tabsList" :key="i" class="page-tabs-li" :class="{ act: tabsIndex == i }" @click="tabsChange(i)">
          {{ li.name + (li.num ? '(' + li.num + ')' : '') }}
        </div>
      </div>
      <div class="page-tabs-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="pageTabs">
import { useRouter } from 'vue-router';
import { ref, reactive, PropType } from 'vue';
const router = useRouter();
type tabType = {
  type: string;
  name: string;
  num: number;
  // label: string[]; // ['门店上新,"很下饭"']
};

const props = defineProps({
  tabsIndex: {
    type: Number,
    default: 0,
  },
  tabsList: {
    type: Array as PropType<tabType[]>,
    default: () => [],
  },
});

const emit = defineEmits(['tabsChange']);
// {{ props.name }}  {{newName}}
// const newName = computed(() => {
//   return props.img;
// });
// function goClick() {
//   emit('tabChange');
// }
// const tabsIndex = ref(0);
// const tabsList = reactive([
//   { type: '0', name: '全部宝贝', num: 36 },
//   { type: '1', name: '降价', num: 12 },
//   { type: '2', name: '失效', num: 2 },
// ]);
function tabsChange(i: number): void {
  if (props.tabsIndex != i) {
    emit('tabsChange', i);
  }
}
</script>

<style lang="scss" scoped>
.page-tabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  &-box {
    background-color: #fff;
    border-bottom: 1px solid #f2f2f2;
    margin: 8px 0 12px;
  }
  &-left {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &-li {
    color: var(--color-59);
    margin-right: 30px;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    position: relative;
    line-height: 56px;
    &.act {
      color: var(--main-color);
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: 0;
        left: 0;
        background-color: var(--main-color);
      }
    }
  }
  &-right {
    position: relative;
  }
}
</style>
