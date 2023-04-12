<template>
  <div>
    <el-form ref="numberValidateForm"
             :model="numberValidateForm"
             label-width="100px"
             class="ruleFormCont"
             label-position="top"
             :rules="rules">
      <el-form-item label="企业类型"
                    prop="selectNum">
        <div class="selectCont">
          <div v-for="(item, index) in shopList"
               :key="index"
               :class="{
              itemCont: true,
              mainActive: numberValidateForm.selectNum === index,
              mainBorder: numberValidateForm.selectNum != index,
            }"
               @click="selectBtn(item, index)">
            {{ item.typeName }}
          </div>
        </div>
      </el-form-item>
      <div v-if="numberValidateForm.selectNum === 0">
        <el-form-item label="医疗机构执业许可证"
                      prop="licenceNo">
          <el-input v-model="numberValidateForm.licenceNo"
                    placeholder="请输入医疗机构执业许可证"
                    style="width: 400px"
                    :disabled="iseditor" />
        </el-form-item>
      </div>
      <div v-if="numberValidateForm.selectNum === 2 || numberValidateForm.selectNum === 3">
        <el-form-item label="营业执照编码"
                      prop="idNumber">
          <el-input v-model="numberValidateForm.idNumber"
                    placeholder="请输入营业执照编码"
                    style="width: 400px"
                    :disabled="iseditor" />
        </el-form-item>
      </div>
      <el-form-item label="负责人姓名"
                    prop="concatName">
        <el-input v-model="numberValidateForm.concatName"
                  placeholder="请输入负责人姓名"
                  style="width: 400px"
                  :disabled="iseditor" />
      </el-form-item>
      <el-form-item label="负责人联系电话"
                    prop="concatPhone">
        <el-input v-model="numberValidateForm.concatPhone"
                  placeholder="请输入负责人联系电话"
                  style="width: 400px"
                  :disabled="iseditor" />
      </el-form-item>
      <el-form-item label="售后联系电话"
                    prop="servicePhone">
        <el-input v-model="numberValidateForm.servicePhone"
                  placeholder="请输入售后联系电话"
                  style="width: 400px"
                  :disabled="iseditor" />
      </el-form-item>
      <el-form-item label="经营范围"
                    prop="scopeIds">
        <el-checkbox-group v-model="numberValidateForm.scopeIds">
          <el-checkbox v-for="(item, index) in areaList"
                       :key="index + 'r'"
                       :label="item.id"
                       :name="item.id"
                       :disabled="iseditor">{{ item.scopeName || "" }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-if="!iseditor">
        <el-button type="primary"
                   size="small"
                   :loading="formload"
                   @click="submitForm('numberValidateForm')">信息认证</el-button>
      </el-form-item>
    </el-form>
    <span v-if="!iseditor"
          class="tip down">
      提示：为保证结果准确性，请保证企业类型、证照编码与实际相符
    </span>
  </div>
</template>
<script>
// import top from '../index/top/index.vue'
// import { mapGetters } from 'vuex'
import {
  getShoparea,
  getUserarea,
  postShopapply,
} from "@/api/merchantsettlement/index";
// import { regionProvince, regionCity, regionArea } from '@/api/index'
export default {
  components: {},
  data () {
    return {
      // 按钮等待
      formload: false,
      // // 表单对象的赋值
      numberValidateForm: {
        selectNum: 0,
        typeCode: '',
        licenceNo: '', // 医疗机构执业许可证
        idNumber: '', // 营业执照编码
        concatName: '', // 负责人姓名
        concatPhone: '', // 负责人电话
        servicePhone: '', // 服务电话 
        scopeIds: [], // 经营范围
      },
      // 地区的列表
      areaList: [],
      // 不同身份的列表
      shopList: [],
      rules: {
        typeCode: [
          { required: true, message: `请选择类型`, trigger: `change` },
        ],
        licenceNo: [
          {
            required: true,
            message: `请输入医疗机构执业许可证`,
            trigger: `blur`,
          },
        ],
        idNumber: [
          { required: true, message: `请输入营业执照编码`, trigger: `blur` },
        ],

        concatName: [
          { required: true, message: `请输入负责人名字`, trigger: `blur` },
        ],
        concatPhone: [
          { required: true, message: `请输入负责人手机号码`, trigger: `blur` },
        ],
        servicePhone: [
          { required: true, message: `请输入售后服务手机号码`, trigger: `blur` },
        ],
        scopeIds: [
          { required: true, message: `请选择经营范围`, trigger: `change` },
        ],
      },
    };
  },
  props: {
    // selectNum: {
    //   type: Number,
    //   default: 0,
    // },
    // numberValidateForm: {
    //   type: Object,
    //   default: () => {
    //     return {
    //       scopeIds: [],
    //     };
    //   },
    // },
    iseditor: {
      type: Boolean,
      default: false,
    },
  },
  mounted () {
    this.getShoparea();
    this.getUserarea();
  },
  methods: {
    getShoparea () {
      getShoparea(0).then((res) => {
        if (res.code === 0) {
          this.shopList = res.data;
          this.numberValidateForm.typeCode = res.data[0].typeCode;
        }
      });
    },
    getUserarea () {
      getUserarea().then((res) => {
        if (res.code === 0) {
          this.areaList = res.data;
        }
      });
    },
    selectBtn (item, index) {
      this.numberValidateForm.selectNum = index;
      this.numberValidateForm.typeCode = item.typeCode;
    },
    submitForm (formName) {
      this.formload = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const {
            selectNum, typeCode,
            licenceNo, // 医疗机构执业许可证
            idNumber, // 营业执照编码
            concatName, // 负责人姓名
            concatPhone, // 负责人电话
            servicePhone, // 售后服务电话
            scopeIds, // 经营范围
          } = this.numberValidateForm
          let d = { typeCode, concatName, servicePhone, concatPhone, scopeIds: scopeIds.join(',') }
          if (selectNum == 0) {
            d.licenceNo = licenceNo
          }
          if (selectNum == 2 || selectNum == 3) {
            d.idNumber = idNumber
          }
          // this.numberValidateForm.scopeIds =
          //   this.numberValidateForm.scopeIds.toString();
          // console.log(d)
          // this.formload = false;
          postShopapply(d)
            .then((res) => {
              const { code, data } = res
              if (code === 0 && data && data.result) {
                this.$message.success(`提交成功！`);
                this.$emit("setStep", data.requestId, typeCode);
              } else {
                this.$message.error(`提交失败！`);
              }
              this.formload = false;
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
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";
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
        content: "";
        position: absolute;
        bottom: 0px;
        right: 0px;
        border-bottom: 25px solid #{$borderColorActive};
        border-left: 25px solid transparent;
      }

      /* 三角形勾 */
      &::before {
        content: "";
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
</style>
