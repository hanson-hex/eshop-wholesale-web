<template>
  <div class="staus_plan fl_left">
    <div v-for="(i, index) in stepArray"
         :key="index"
         class="inner">
      <div :class="indexStep >= (+index + 1) ? 'active' : ''"
           class="step">
        <div :class="{ fl_center: !lineWord,line_center:lineWord}"
             @click="stepBtn(i, index)">
          <div class="status">
            <el-image v-if="indexStep > (+index + 1)"
                      class="icon_svg"
                      :src="icon" />
            <div v-else
                 class="idx">{{ (+index + 1) }}</div>
          </div>
          <div class="name"
               :class="indexStep > (+index + 1) ? 'sueccss' : ''">
            {{ i[optionsName.name] }}
          </div>
        </div>
      </div>
      <div v-if="stepArray.length != (+index + 1)"
           :class="indexStep >= (+index + 1) ? 'active' : ''"
           class="line" />
    </div>
  </div>
</template>
<script>

export default {
  props: {
    indexStep: {
      type: Number,
      default: 1
    },
    stepArray: {
      type: Array,
      default: () => {
        return []
      }
    },
    optionsName: {
      type: Object,
      default: () => {
        return { name: 'name' }
      }
    },
    lineWord: {
      type: Boolean,
      default: () => {
        return false
      }
    },

  },
  data () {
    return {
      icon: require(`@/assets/icon_detail_status.png`)
    }
  },
  methods: {
    stepBtn (i, index) {
      this.$emit('stepBtn', { content: i, index: index })
    }
  }
}
</script>
<style lang="scss" scoped>
.staus_plan {
  overflow: hidden;
  padding: 20px 32px 54px 32px;
  display: flex;
  // justify-content: center;
  align-items: center;
  width: 100%;

  .inner {
    display: flex;
    align-items: center;

    .step {
      position: relative;
      width: auto;
      height: 32px;
      .line_center {
        display: flex;
        align-content: center;
      }
      .status {
        margin-right: 6px;
        text-align: center;

        .idx {
          width: 32px;
          height: 32px;
          border-radius: 100%;
          border: 1px solid #e5e7ee;
          font-size: 14px;
          text-align: center;
          color: #91939a;
          line-height: 32px;
          margin: 0 auto;
        }
      }

      .icon_svg {
        width: 32px;
        height: 32px;
      }

      .name {
        color: #91939a;
        font-size: 16px;
        font-weight: 600;
        line-height: 32px;
        // margin-top: 10px;
      }

      .time {
        position: absolute;
        left: 40px;
        width: 150px;
        height: 22px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #91939a;
        line-height: 22px;
      }
    }

    .line {
      margin: 0 6px;
      width: 80px;
      height: 3px;
      background: #e5e7ee;
      border-radius: 1px;
    }

    .step.active {
      .status .idx {
        border: 1px solid #0da1a8;
        color: #fff;
        background: #0da1a8;
      }

      .name {
        color: #0da1a8;
      }

      .name.sueccss {
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .line.active {
      background: #0da1a8;
    }
  }
}
</style>
