<template>
  <div class="aptitude">
    <div class="tip">
      <i class="el-icon-warning"
         style="color: #0DA1A8;margin-right: 8px;" />本平台所有商家均已办理市场主体登记
    </div>
    <div class="itemCont">
      <div class="item">
        <p class="itemTitle">基本信息</p>
        <div class="content">
          <p>
            <span class="label">企业名称：</span>
            <span class="desc">{{objData.shopName}}</span>
          </p>
          <p>
            <span class="label">法人代表：</span>
            <span class="desc">{{objData.concatName}}</span>
          </p>
          <p>
            <span class="label">注册地址：</span>
            <span class="desc">{{objData.address}}</span>
          </p>
          <p>
            <span class="label">入驻时间：</span>
            <span class="desc">{{objData.createTime}}</span>
          </p>
        </div>
      </div>
      <div class="item">
        <p class="itemTitle">企业介绍</p>
        <div class="content">
          {{objData.shopDesc}}
        </div>
      </div>
      <div class="item">
        <p class="itemTitle">经营范围</p>
        <div class="content">
          {{objData.scopes?.join('、')}}
        </div>
      </div>
      <div class="item">
        <p class="itemTitle">销售区域</p>
        <div class="content">
          {{objData.saleAreaList}}
        </div>
      </div>
      <div class="item">
        <p class="itemTitle">配送政策</p>
        <div class="content">
          {{objData.sendRule}}
        </div>
      </div>
      <div class="item">
        <p class="itemTitle">销售政策与条款</p>
        <div class="content">
          {{objData.salePolicyAndTerm}}
        </div>
      </div>

    </div>
    <div class="lineTitle">
      <div class="titleContentLeft">
        <div class="line"></div>
        <p>资料下载</p>
      </div>
      <div class="titleContentRight">
        <el-button type="text"
                   icon="el-icon-download"
                   @click="handleLoad"
                   :loading="isload">企业资质</el-button>
      </div>
    </div>
    <div class="itemCont imgCont">
      <div class="itemImg"
           v-for="i in imgData"
           :key="i">
        <el-image :src="i.certityImage||avater"
                  width="280px"
                  style="height:186px;padding: 30px 8px;"></el-image>
        <div class="name">
          {{getLabel(i.certityType)}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import avater from "/public/img/bg.png"
import { getcertificate, download, details } from '@/api/store/index'
export default {
  data () {
    return {
      avater: avater,
      objData: {},
      isload: false,
      shopId: '',
      imgData: [],
      typeData: [
        { value: '01', label: '营业许可证' },
        { value: '02', label: '药品经营许可证' },
        { value: '03', label: '食品经营许可证' },
        { value: '04', label: '医药机构执业许可证' },
        { value: '05', label: '被委托人身份证复印件(正反两面)' },
        { value: '06', label: '授权委托书' },
        { value: '07', label: '第二类医疗器械经营备案凭证' },
        { value: '08', label: '开票信息和开户许可证' },
        { value: '09', label: '其他' },

      ]
    }
  },
  created () {
    this.shopId = this.getQueryString('shopId')
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    getLabel (val) {
      let result = ''
      let thatIndex = this.typeData.findIndex(res => res.value == val)
      if (thatIndex != -1) {
        result = this.typeData[thatIndex].label
      }
      return result
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      }
      return null;
    },
    getDetail () {
      getcertificate({ shopId: this.shopId }).then(res => {
        if (res.code == 0) {
          this.objData = res.data
        } else {
          this.$message({ type: "warning", message: res.msg })
        }
      })
      details({ shopId: this.shopId }).then(res => {
        if (res.code == 0) {
          let newArray = []
          res.data?.certifys?.forEach(element => {
            if (element.images && element.images.length) {
              newArray = newArray.concat(element.images)
            }
          });
          console.log(newArray);
          this.imgData = newArray ?? []
        } else {
          this.$message({ type: "warning", message: res.msg })
        }
      })
    },
    handleLoad () {
      this.isload = true
      download({ shopId: this.shopId }).then(res => {
        // 处理返回的文件流
        this.isload = false
        const blob = res
        if (blob && blob.size === 0) {
          this.$message({ type: "warning", message: "内容为空，无法下载" })
          return
        }
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = '商家资质'
        document.body.appendChild(link)
        link.click()
        window.setTimeout(function () {
          URL.revokeObjectURL(blob)
          document.body.removeChild(link)
        }, 0)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.aptitude {
  height: calc(100vh - 200px);
  overflow: auto;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .tip {
    width: 928px;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #595959;
    line-height: 22px;
    padding: 17px 0px;
  }
  .itemCont {
    display: grid;
    grid-template-columns: 592px 592px;
    grid-template-rows: auto auto auto;
    grid-column-gap: 16px;
    grid-row-gap: 16px;
    .item {
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      padding: 0px 24px;
      .itemTitle {
        color: #262626;
        line-height: 24px;
        margin: 16px 0px;
        font-weight: 600;
        font-size: 16px;
        // padding: 16px 0px;
      }
      .content {
        line-height: 22px;
        font-size: 14px;
        padding-bottom: 24px;
        color: rgba(0, 0, 0, 0.65);
        p {
          margin: 0px;
          .label {
            color: rgba(0, 0, 0, 0.85);
          }
          .desc {
            color: rgba(0, 0, 0, 0.65);
          }
        }
      }
    }
  }
  .lineTitle {
    margin-top: 24px;
    font-weight: 600;
    text-align: left;
    color: #262626;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    .titleContentLeft {
      display: flex;
      justify-content: start;
      align-items: center;
      .line {
        width: 3px;
        height: 16px;
        border-radius: 2px;
        background: #0da1a8;
        margin-right: 8px;
      }
    }
    .titleContentRight {
      display: flex;
      justify-content: right;
      align-items: center;
      .el-button {
        padding: 0px;
        margin-left: 16px;
      }
    }
  }
  .imgCont {
    grid-template-columns: 288px 288px 288px 288px;
    .itemImg {
      width: 288px;
      overflow: hidden;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      text-align: center;
      .name {
        color: #fff;
        font-size: 16px;
        line-height: 40px;
        text-align: center;
        background: rgba(0, 0, 0, 0.3);
        &:hover {
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }
}
</style>