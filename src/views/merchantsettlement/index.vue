<template>
  <div class="contentCont">
    <!-- <div class="contentHeader">
      <top />
    </div> -->
    <div class="contentInner"
         :class="{ allheight: onlyPage }">
      <div class="tip">
        <i class="el-icon-warning"
           style="color: #f99b0d; margin-right: 10px" />为严格执行《药片管理法》及《药品经营质量管理规范》的相关规定，企业名称请填写《营业执照》中的企业名称，收货地址请在《药品经营许可证》中仓库地址的基础上进行完善，以便物流能准确的配送;
      </div>
      <div class="staus_plan fl_left">
        <div :class="indexStep >= 1 ? 'active' : ''"
             class="step">
          <div class="fl_center">
            <div class="status">
              <el-image v-if="indexStep > 1"
                        class="icon_svg"
                        :src="icon" />
              <div v-else
                   class="idx">1</div>
            </div>
            <div class="name"
                 :class="indexStep > 1 ? 'sueccss' : ''">
              企业信息
            </div>
          </div>
        </div>
        <div :class="indexStep >= 1 ? 'active' : ''"
             class="line" />
        <div :class="indexStep >= 2 ? 'active' : ''"
             class="step">
          <div class="fl_center">
            <div class="status fl_center">
              <el-image v-if="indexStep > 2"
                        class="icon_svg"
                        :src="icon" />
              <div v-else
                   class="idx">2</div>
            </div>
            <div class="name"
                 :class="indexStep > 2 ? 'sueccss' : ''">
              信息确认
            </div>
          </div>
        </div>
        <div :class="indexStep >= 2 ? 'active' : ''"
             class="line" />
        <div :class="indexStep >= 3 ? 'active' : ''"
             class="step">
          <div class="fl_center">
            <div class="status">
              <el-image v-if="indexStep > 3"
                        class="icon_svg"
                        :src="icon" />
              <div v-else
                   class="idx">3</div>
            </div>
            <div class="name"
                 :class="indexStep > 3 ? 'sueccss' : ''">
              上传资质照片
            </div>
          </div>
        </div>
        <div :class="indexStep >= 3 ? 'active' : ''"
             class="line" />
        <div :class="indexStep >= 4 ? 'active' : ''"
             class="step">
          <div class="fl_center">
            <div class="status">
              <el-image v-if="indexStep > 4"
                        class="icon_svg"
                        :src="icon" />
              <div v-else
                   class="idx">4</div>
            </div>
            <div class="name"
                 :class="indexStep > 4 ? 'sueccss' : ''">
              等待审核
            </div>
          </div>
        </div>
      </div>
      <div v-if="indexStep === 1"
           class="formCont">
        <infoFormEdit @setStep="setStep" />
      </div>
      <div v-if="indexStep === 2"
           class="formCont">
        <infoSure :request-id="numberValidateFormOne.requestId"
                  @setStep="setStep" />
      </div>
      <div v-if="indexStep === 3"
           class="formCont">
        <formUpload :code="typeCode"
                    :request-id="numberValidateFormOne.requestId"
                    @setStep="goEnd" />
      </div>
      <div v-if="indexStep === 4"
           class="formCont">
        <div v-if="endStatus"
             class="status_box">
          <div class="status_ico status_success"><i class="el-icon-check" /></div>
          <h3>您已提交资质，请等待审核</h3>
        </div>
        <div v-else
             class="status_box">
          <div class="status_ico status_err"><i class="el-icon-close" /></div>
          <h3>您已提交失败，请稍后重试</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import top from '../index/top/index.vue'
import Upload from "./upload.vue";
import infoFormEdit from "./infoFormEdit.vue";
import infoSure from "./infoSure.vue";
import formUpload from "./formUpload.vue";
// import { mapGetters } from 'vuex'
// import {
//   getUserarea,
//   getShoparea,
//   postShopapply,
//   getinvoicetypeList,
//   postshopSubmit,
//   shopFinish
// } from '@/api/examination'
// import { regionProvince, regionCity, regionArea } from '@/api/index'
export default {
  components: {
    // Upload,
    infoFormEdit,
    infoSure,
    formUpload,
  },
  data () {
    return {
      indexStep: 1,
      typeCode: null,
      endStatus: false,
      icon: require(`@/assets/icon_detail_status.png`),
      numberValidateForm: {
        typeCode: 0,
        licenceNo: ``,
        idNumber: ``,
        concatName: ``,
        concatPhone: ``,
        scopeIds: [],
      },
      rules: {
        name: [
          {
            required: true,
            message: `请输入企业名称`,
            trigger: `blur`,
          },
        ],
        province: [
          {
            required: true,
            message: `请选择省份`,
            trigger: `change`,
          },
        ],
        city: [
          {
            required: true,
            message: `请选择地级市`,
            trigger: `change`,
          },
        ],
        area: [
          {
            required: true,
            message: `请选择市级区`,
            trigger: `change`,
          },
        ],
        address: [
          {
            required: true,
            message: `请输入详细地址`,
            trigger: `blur`,
          },
        ],
        invoiceType: [
          {
            required: true,
            message: `请选择发票类型`,
            trigger: `change`,
          },
        ],
      },

      numberValidateFormOne: {
        invoiceType: [],
        province: ``,
        city: ``,
        area: ``,
        requestId: ``,
      },

      selectNum: 0,
      dialogImageUrl: ``,
      dialogVisible: false,
      disabled: false,
      areaList: [],
      shopList: [],
      invoicetypeData: [],
      provinceData: [],
      cityData: [],
      areaData: [],
      formOneload: false,
      formload: false,
      numberValidateFormTwo: {
        certifysOne: [],
        certifysTwo: [],
        certifysThree: [],
        certifysFour: [],
        certifysFive: [],
        certifysSix: [],
        certifysSeven: [],
        certifysEight: [],
        certifysNine: [],
        remarks: ``,
      },
    };
  },
  computed: {
    // ...mapGetters(['tagWel', 'website'])
    onlyPage () {
      return window.location.hash == '#/mymerchantsettlementb'
    }
  },
  created () {
    // this.getUserarea()
    // this.getShoparea()
    // this.getinvoicetypeList()
    // this.getProvince()
  },
  methods: {
    // 修改步骤
    setStep (val, code) {
      console.log(val)
      this.numberValidateFormOne.requestId = val;
      this.indexStep += 1;
      if (code) {
        this.typeCode = code
      }
    },
    goEnd (val) {
      this.indexStep += 1;
      this.endStatus = val || false
    },
    change (val) {
      console.log(val, `val`);
    },
    getinvoicetypeList () {
      getinvoicetypeList().then((res) => {
        this.invoicetypeData = res.data;
        this.numberValidateFormOne.invoiceType = [res.data[0].code];
      });
    },
    getProvince () {
      regionProvince().then((res) => {
        this.provinceData = res.data;
      });
    },

    cityBtn (item) {
      this.areaData = [];
      const cityIndex = this.cityData.findIndex((res) => res.id === item);
      this.numberValidateFormOne.cityName = this.cityData[cityIndex].rname;
      regionArea(item).then((res) => {
        this.numberValidateFormOne.area = ``;
        this.areaData = res.data;
      });
    },
    areaBtn (item) {
      const areaIndex = this.areaData.findIndex((res) => res.id === item);
      this.numberValidateFormOne.areaName = this.areaData[areaIndex].rname;
      this.numberValidateFormOne.area = item;
    },
    handleRemove (file) {
      console.log(file);
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload (file) {
      console.log(file);
    },
    selectBtn (item, index) {
      this.selectNum = index;
      this.numberValidateForm.typeCode = item.typeCode;
    },
    submitForm (formName) {
      this.formload = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.numberValidateForm.scopeIds =
            this.numberValidateForm.scopeIds.toString();
          postShopapply(this.numberValidateForm)
            .then((res) => {
              if (res.code === 0 && res.data && res.data.result) {
                this.numberValidateFormOne.requestId = res.data.requestId;
                this.$message.success(`提交成功！`);
                this.formload = false;
                this.indexStep += 1;
              } else {
                this.$message.error(`提交失败！`);
                this.formload = false;
              }
            })
            .catch((res) => {
              this.formload = false;
            });
        } else {
          this.formload = false;
          return false;
        }
      });
    },
    // submitFormTwo(name) {
    //   if (
    //     this.selectNum === 0 &&
    //     (this.numberValidateFormTwo.certifysOne.length < 1 ||
    //       this.numberValidateFormTwo.certifysFive.length < 1 ||
    //       this.numberValidateFormTwo.certifysSix.length < 1 ||
    //       this.numberValidateFormTwo.certifysFour.length < 1)
    //   ) {
    //     this.$message.info(`请选择有效日期!`);
    //     return;
    //   }
    //   if (
    //     (this.selectNum === 2 || this.selectNum === 3) &&
    //     (this.numberValidateFormTwo.certifysOne.length < 1 ||
    //       this.numberValidateFormTwo.certifysTwo.length < 1 ||
    //       this.numberValidateFormTwo.certifysThree.length < 1 ||
    //       this.numberValidateFormTwo.certifysFive.length < 1 ||
    //       this.numberValidateFormTwo.certifysSix.length < 1)
    //   ) {
    //     this.$message.info(`请选择有效日期!`);
    //     return;
    //   }
    //   // 资质类型： 01-->营业许可证"), 02-->药品经营许可证"), 03-->食品经营许可证"),
    //   //  04-->医药机构执业许可证"), 05-->被委托人身份证复印件(正反两面)"), 06-->授权委托书"),
    //   //   07-->第二类医疗器械经营备案凭证"), 08-->开票信息和开户许可证"), 09-->其他");

    //   const params = {
    //     // 业务流水号
    //     requestId: this.numberValidateFormOne.requestId || ``,
    //     // 备注
    //     remarks: this.numberValidateFormTwo.remarks || ``,
    //     certifys: [
    //       {
    //         // 资质编号：
    //         code: `01`,
    //         // 开始日期
    //         startValidDate: this.numberValidateFormTwo.certifysOne[0] || ``,
    //         // 结束日期
    //         endValidDate: this.numberValidateFormTwo.certifysOne[1] || ``,
    //       },
    //       {
    //         // 资质编号：
    //         code: `02`,
    //         // 开始日期
    //         startValidDate: this.numberValidateFormTwo.certifysTwo[0] || ``,
    //         // 结束日期
    //         endValidDate: this.numberValidateFormTwo.certifysTwo[1] || ``,
    //       },
    //       {
    //         // 资质编号：
    //         code: `03`,
    //         // 开始日期
    //         startValidDate: this.numberValidateFormTwo.certifysThree[0] || ``,
    //         // 结束日期
    //         endValidDate: this.numberValidateFormTwo.certifysThree[1] || ``,
    //       },
    //       {
    //         // 资质编号：
    //         code: `04`,
    //         // 开始日期
    //         startValidDate: this.numberValidateFormTwo.certifysFour[0] || ``,
    //         // 结束日期
    //         endValidDate: this.numberValidateFormTwo.certifysFour[1] || ``,
    //       },
    //       {
    //         // 资质编号：
    //         code: `05`,
    //         // 开始日期
    //         startValidDate: this.numberValidateFormTwo.certifysFive[0] || ``,
    //         // 结束日期
    //         endValidDate: this.numberValidateFormTwo.certifysFive[1] || ``,
    //       },
    //       {
    //         // 资质编号：
    //         code: `06`,
    //         // 开始日期
    //         startValidDate: this.numberValidateFormTwo.certifysSix[0] || ``,
    //         // 结束日期
    //         endValidDate: this.numberValidateFormTwo.certifysSix[1] || ``,
    //       },
    //       {
    //         // 资质编号：
    //         code: `07`,
    //         // 开始日期
    //         startValidDate: ``,
    //         // 结束日期
    //         endValidDate: ``,
    //       },
    //       {
    //         // 资质编号：
    //         code: `08`,
    //         // 开始日期
    //         startValidDate: ``,
    //         // 结束日期
    //         endValidDate: ``,
    //       },
    //       {
    //         // 资质编号：
    //         code: `09`,
    //         // 开始日期
    //         startValidDate: ``,
    //         // 结束日期
    //         endValidDate: ``,
    //       },
    //     ],
    //   };
    //   shopFinish(params).then((res) => {
    //     if (res.data.code === 0 && res.data) {
    //       this.$store
    //         .dispatch(`GetMenu`, { type: true, id: -1 })
    //         .then((data) => {
    //           if (!data) {
    //             this.$message.success(`已提交审核，请耐心等待`);
    //             // this.$router.push({ path: '/register' })
    //           }
    //           if (data.length === 0) return;
    //           this.$router.$avueRouter.formatRoutes(data, true);
    //           this.$router.push({ path: this.tagWel.value });
    //         });
    //     }
    //   });
    // },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/variables.scss";

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
</style>
