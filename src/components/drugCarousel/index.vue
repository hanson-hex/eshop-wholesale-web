<template>
  <div class="img-container">
    <div class="details-show-img">
      <div class="img">
        <img id="bigImg" :src="detailsImg" alt="" class="leftImg" />
      </div>
      <ul class="Abbreviations" id="Abbreviations">
        <li
          v-for="item in imgList"
          @mouseenter="($event) => enter($event, item.id)"
          :data="item.id"
          :key="item.id"
          :class="['img-item', detailsImg === item.url ? 'active' : '']"
        >
          <img :src="item.url" alt="" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const props = defineProps({
  imgList: {
    type: Array<{
      url: string;
      id: number;
    }>,
    default: () => {
      return [
        {
          url: 'https://youcaikeji.com/Uploads/Data/20210723/65209a4600ac1fb9b11a0c34102719cf.jpg',
          id: 1,
        },
        {
          url: 'https://youcaikeji.com/Uploads/Data/20210723/9419eb52b6f91a3a161f24f7b1889cd4.jpg',
          id: 2,
        },
      ];
    },
  },
});
const detailsImg = ref<string>(props.imgList.length > 0 ? props.imgList[0].url : '');
const enter = (event: any, id: number) => {
  detailsImg.value = props.imgList.find((item) => item.id == id)?.url || '';
};
</script>

<style lang="scss" scoped>
.img-container {
  width: 428px;
  float: left;
  .details-show-img {
    display: inline-block;
    .img {
      width: 422px;
      height: 424px;
      position: relative;
      overflow: hidden;
      img {
        width: 422px;
        height: 425px;
        padding-top: 0px;
        border-radius: 12px;
        display: block;
      }
    }
    .Abbreviations {
      margin-top: 12px;
      padding: 0;
    }
    .img-item {
      border: 1px solid #d9d9d9;
      width: 65px;
      height: 68px;
      box-sizing: border-box;
      display: inline-flex;
      flex-wrap: nowrap;
      border-radius: 6px;
      position: relative;
      margin-right: 6px;
      cursor: pointer;
      overflow: hidden;
      img {
        display: block;
        margin: 0 auto;
        height: 100%;
        max-width: 68px;
      }
    }
    .active {
      border: 1px solid red;
    }
    img-item:last-child {
      margin-right: 0;
    }
  }
}
</style>
