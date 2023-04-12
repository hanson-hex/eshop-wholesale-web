<template>
  <div class="info_box">
    <!-- <el-divider content-position="left">文字资料</el-divider>
    <div class="info_ul">
      <div class="info_li">
        <div class="info_title">企业名称：</div>
        <div class="info_r">{{ info.shopName || '' }}</div>
      </div>
      <div class="info_li">
        <div class="info_title">企业类型：</div>
        <div class="info_r">{{ info.shopTypeName || '' }}</div>
      </div>
      <div class="info_li">
        <div class="info_title">医疗机构执业许可证：</div>
        <div class="info_r">{{ info.certifys[0].licenceNo || '' }}</div>
      </div>
      <div v-if="info.shopTypeCode == '3' || info.shopTypeCode == '4'" class="info_li">
        <div class="info_title">营业执照编码：</div>
        <div class="info_r">{{ info.certifys[0].idNumber || '' }}</div>
      </div>
      <div class="info_li">
        <div class="info_title">负责人姓名：</div>
        <div class="info_r">{{ info.concatName || '' }}</div>
      </div>
      <div class="info_li">
        <div class="info_title">负责人联系电话：</div>
        <div class="info_r">{{ info.concatPhone || '' }}</div>
      </div>
      <div class="info_li">
        <div class="info_title">售后服务电话：</div>
        <div class="info_r">{{ info.servicePhone || '' }}</div>
      </div>
      <div class="info_li">
        <div class="info_title">经营范围：</div>
        <div class="info_r"><span v-for="(li,i) in info.scopes" :key="i" class="info_txt">{{ li }}</span></div>
      </div>

      <div class="info_li">
        <div class="info_title">所在区域：</div>
        <div class="info_r">{{ info.provinceName+info.cityName+info.areaName+info.address }}</div>
      </div>
      <div class="info_li">
        <div class="info_title">发票类型：</div>
        <div class="info_r"><span v-for="(li,i) in info.invoiceTypes" :key="i" class="info_txt">{{ li }}</span></div>
      </div>
    </div>
    <el-divider content-position="left">图片资料</el-divider>
    <div class="info_ul" style="max-width:800px;margin-bottom:30px;">
      <div v-for="(ul,i) in certifys" :key="i" class="info_img_box">
        <div class="info_img_txt">
          <p>{{ allTypes[ul.code] }}</p>
          <p v-if="ul.code != '09'">证件有效期 {{ (ul.startValidDate || '') +' 至 '+ (ul.endValidDate || '') }}</p>
        </div>
        <div class="info_imgs">
          <el-image v-for="(li,j) in ul.imgs" :key="j" class="info_imgs_li" :src="li" :preview-src-list="ul.imgs" />
        </div>
        <div v-if="ul.code == '09'" class="info_r">备注：{{ info.remarks || '无备注' }}</div>
      </div>
    </div> -->
    <div>
      <el-form ref="info" :model="info" label-width="100px" class="ruleFormCont" label-position="top">
        <el-form-item label="企业类型" prop="selectNum">
          <div class="selectCont">
            <div v-for="(item, index) in shopList" :key="index" :class="{
              itemCont: true,
              mainActive: info.shopTypeName === item.typeName,
              mainBorder: info.shopTypeName != item.typeName,
            }" @click="selectBtn(item, index)">
              {{ item.typeName }}
            </div>
          </div>
        </el-form-item>
        <div v-if="info.certifys.length > 0">
          <el-form-item label="医疗机构执业许可证" prop="licenceNo">
            <el-input v-model="info.certifys[0].licenceNo" placeholder="请输入医疗机构执业许可证" style="width: 400px" disabled />
          </el-form-item>
        </div>
        <div v-if="info.certifys.length > 0">
          <el-form-item v-if="info.shopTypeCode == '3' || info.shopTypeCode == '4'" label="营业执照编码" prop="idNumber">
            <el-input v-model="info.certifys[0].idNumber" placeholder="请输入营业执照编码" style="width: 400px" disabled />
          </el-form-item>
        </div>
        <el-form-item label="负责人姓名" prop="concatName">
          <el-input v-model="info.concatName" placeholder="请输入负责人姓名" style="width: 400px" disabled />
        </el-form-item>
        <el-form-item label="负责人联系电话" prop="concatPhone">
          <el-input v-model="info.concatPhone" placeholder="请输入负责人联系电话" style="width: 400px" disabled />
        </el-form-item>
        <el-form-item label="售后联系电话" prop="servicePhone">
          <el-input v-model="info.servicePhone" placeholder="请输入售后联系电话" style="width: 400px" disabled />
        </el-form-item>
        <el-form-item label="经营范围" prop="scopeIds">
          <el-checkbox-group v-model="info.scopes">
            <el-checkbox v-for="(item, index) in info.scopes" :key="index + 'r'" :label="item" :name="item" disabled>{{ item || "" }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="info.shopName" placeholder="请输入企业名称" style="width: 400px" disabled />
        </el-form-item>
        <el-form-item label="所在区域" prop="province">
          <el-select v-model="info.provinceName" placeholder="请选择省" disabled style="width: 126px">
            <el-option v-for="(item, index) in provinceData" :key="index" :label="item.rname" :value="item.id" />
          </el-select>
          <el-select v-model="info.cityName" placeholder="请选择市" disabled style="margin-left: 12px; width: 126px">
            <el-option v-for="(item, index) in cityData" :key="index" :label="item.rname" :value="item.id" />
          </el-select>
          <el-select v-model="info.areaName" placeholder="请选择区" disabled style="margin-left: 11px; width: 126px">
            <el-option v-for="(item, index) in areaData" :key="index" :label="item.rname" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="info.address" disabled placeholder="请输入详细地址" style="width: 400px" />
        </el-form-item>
        <el-form-item label="发票类型" prop="invoiceType">
          <el-checkbox-group v-model="info.invoiceType" disabled>
            <el-checkbox v-for="(item, index) in info.invoiceTypes" :key="index" :label="item" :name="item" checked>{{ item || "" }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="ruleForm">
        <template v-for="(ul,index) in certifys">
          <div :key="index" label-width="800px" style="margin-bottom:30px;">
            <!-- :prop="infoFormTwo[ul.keyTime]" -->
            <!-- slot="label" -->
            <div style="width: 800px;margin-bottom:10px;">
              <div style="display: flex; justify-content: space-between;font-size:14px;;color:#262626">
                <div><span v-if="ul.code != '09' && ul.require" style="color: red; margin-right: 10px">*</span>{{ allTypes[ul.code] }}</div>
                <div>
                  <span style="margin-right: 10px;font-weight:400;color:#999;" class="mainColor">有效期</span>
                  <el-date-picker v-model="ul.date" type="daterange" size="mini" format="yyyy-MM-dd" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" disabled />
                </div>
              </div>
            </div>
            <div class="uploadCont">
              <div class="imgList">
                <div v-for="(li,i) in ul.imgs" :key="i" class="imgList_li">
                  <el-image class="imgList_li_img" style="" :src="li" :preview-src-list="ul.imgs" disabled />
                  <!-- <p class="imgList_li_close" @click="imgDel([ul.keyImg],i)"><i class="el-icon-delete" /></p> -->
                </div>
              </div>
              <div v-if="ul.desc" class="desc">{{ ul.desc }}</div>
              <div v-if="ul.type == '09'" class="more_input">
                <p class="more_p" style="margin-bottom:5px;">备注</p>
                <el-input v-if="ul.code == '09'" v-model="info.remarks" type="txtarea" disabled />
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

  </div>
</template>
<script>
// import top from '../index/top/index.vue'
// import { mapGetters } from 'vuex'
import {
  getShoparea,
  getUserarea,
  postShopapply,
  getinvoicetypeList,
} from "@/api/merchantsettlement/index";
// import { regionProvince, regionCity, regionArea } from '@/api/index'
export default {
  components: {},
  data() {
    return {
      provinceData: [],
      cityData: [],
      areaData: [],
      invoicetypeData: [], // 发票类型
      // 地区的列表
      areaList: [],
      // 不同身份的列表
      shopList: [],
      allTypes: {
        '01': '营业许可证', '02': '药品经营许可证', '03': '食品经营许可证', '04': '医药机构执业许可证',
        '05': '被委托人身份证复印件(正反两面)', '06': '授权委托书', '07': '第二类医疗器械经营备案凭证',
        '08': '开票信息和开户许可证', '09': '其他',
      },
      info: {
        scopeIds: [],
        invoiceTypes: [],
        certifys: [],
      }
    };
  },
  props: {
    // info: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       scopeIds: [],
    //       invoiceTypes: [],
    //       certifys: [],
    //     };
    //   },
    // },
  },
  computed: {
    certifys() {
      const { certifys } = this.info
      // let nCertifys = []
      // let types = deepClone(allTypes)
      // if (code == '2') {
      //   types[2].show = true
      //   types[2].require = true
      //   types[7].show = true
      // }
      certifys.forEach(element => {
        this.$set(element, 'date', [element.startValidDate || '', element.endValidDate || ''])
      });
      return certifys.map(li => {
        return {
          ...li,
          imgs: li.images.map(el => el.certityImage)
        }
      })
    },
  },
  mounted() {
    this.getShoparea();
    this.getUserarea();
    this.getinvoicetypeList()
  },
  methods: {
    getInfo(info) {
      this.info = info
    },
    getinvoicetypeList() {
      getinvoicetypeList().then((res) => {
        if (res.code === 0) {
          this.invoicetypeData = res.data;
        }
      });
    },
    getUserarea() {
      getUserarea().then((res) => {
        if (res.code === 0) {
          this.areaList = res.data;
        }
      });
    },
    getShoparea() {
      getShoparea(0).then((res) => {
        if (res.code === 0) {
          this.shopList = res.data;
          // this.numberValidateForm.typeCode = res.data[0].typeCode;
        }
      });
    },

  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
::v-deep .el-form--label-top .el-form-item__label {
  padding: 8px !important;
}
.info_box {
  width: 800px;
  display: flex;
  margin: 0 auto;
  justify-content: center;
}
.down {
  margin-top: 60px;
  margin-bottom: 60px;
}
.tip {
  background: #fff9e6;
  border: 1px solid #ffdb88;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #595959;
  line-height: 22px;
  padding: 10px 20px;
}

.ruleFormCont {
  width: 600px;
  padding-top: 30px;
  .selectCont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemCont {
      width: 22%;
      height: 70px;
      border: 2px solid #{$borderColor};
      border-radius: 4px;
      font-size: #{$fontSize};
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      color: #{$fontColor};
      text-align: center;
      line-height: 70px;
      position: relative;
      cursor: pointer;
    }
    .mainActive {
      border: 2px solid #{$borderColorActive};
      color: #{$fontColorActive};
      /* 三角形 */
      &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        right: 0px;
        border-bottom: 25px solid #{$borderColorActive};
        border-left: 25px solid transparent;
      }

      /* 三角形勾 */
      &::before {
        content: '';
        position: absolute;
        width: 12px;
        height: 6px;
        background: transparent;
        bottom: 6px;
        right: 3px;
        border: 2px solid white;
        border-top: none;
        border-right: none;
        transform: rotate(-55deg);
        z-index: 9;
      }
    }
  }
  .uploadCont {
    width: 600px;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    overflow-x: scroll;
  }
}
.allheight {
  height: 100vh !important;
}
.status {
  &_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 40px;
    h3 {
      font-size: 30px;
      font-weight: 400;
      color: #333;
      line-height: 2;
    }
  }
  &_ico {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 70px;
    color: #fff;
    font-size: 30px;
    line-height: 1;
    border-radius: 100%;
  }
  &_success {
    background: #32bf78;
  }
  &_err {
    background: #f56c6c;
  }
}

.contentCont {
  .contentInner {
    padding: 20px;
    background: #fff;
    height: $contentHeight;
    overflow-y: scroll;
    // height: calc(100vh - 48px);
    .tip {
      background: #fff9e6;
      border: 1px solid #ffdb88;
      border-radius: 4px;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #595959;
      line-height: 22px;
      padding: 10px 20px;
    }
    .staus_plan {
      overflow: hidden;
      padding: 32px 32px 54px 32px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      .step {
        position: relative;
        width: auto;
        height: 32px;
        .status {
          margin-right: 8px;
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
          line-height: 24px;
          margin-top: 10px;
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
        margin: 0 16px;
        width: 98px;
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
    .formCont {
      width: 800px;
      display: flex;
      margin: 0 auto;
      justify-content: center;
    }
  }
}
.imgList {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  &_li {
    display: block;
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
    margin-right: 10px;
    position: relative;
    overflow: hidden;
    &:hover {
      .imgList_li_close {
        top: 5px;
      }
    }
    &_img {
      width: 100px;
      height: 100px;
    }
    &_close {
      position: absolute;
      z-index: 2;
      right: 5px;
      top: -50px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #f00;
    }
    &_add {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #ccc;
      cursor: pointer;
      background: #f5f5f5;
      border-radius: 6px;
      font-size: 36px;
      line-height: 1;
      color: #bbb;
      &:hover {
        border: 1px solid #3db4b9;
      }
    }
  }
}
.down {
  margin-top: 60px;
  margin-bottom: 60px;
}
.tip {
  background: #fff9e6;
  border: 1px solid #ffdb88;
  border-radius: 4px;
  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #595959;
  line-height: 22px;
  padding: 10px 20px;
}

.ruleForm {
  width: 800px;
  padding-bottom: 30px;
  .selectCont {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .itemCont {
      width: 22%;
      height: 70px;
      border: 2px solid #{$borderColor};
      border-radius: 4px;
      font-size: #{$fontSize};
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 600;
      color: #{$fontColor};
      text-align: center;
      line-height: 70px;
      position: relative;
      cursor: pointer;
    }
    .mainActive {
      border: 2px solid #{$borderColorActive};
      color: #{$fontColorActive};
      /* 三角形 */
      &::after {
        content: '';
        position: absolute;
        bottom: 0px;
        right: 0px;
        border-bottom: 25px solid #{$borderColorActive};
        border-left: 25px solid transparent;
      }

      /* 三角形勾 */
      &::before {
        content: '';
        position: absolute;
        width: 12px;
        height: 6px;
        background: transparent;
        bottom: 6px;
        right: 3px;
        border: 2px solid white;
        border-top: none;
        border-right: none;
        transform: rotate(-55deg);
        z-index: 9;
      }
    }
  }
  .uploadCont {
    width: 800px;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    // overflow-x: scroll;
  }
}
</style>
