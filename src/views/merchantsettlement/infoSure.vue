<template>
  <div>
    <el-form ref="numberValidateFormOne" :model="numberValidateFormOne" label-width="100px" class="ruleFormCont" label-position="top" :rules="rules">
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="numberValidateFormOne.name" placeholder="请输入企业名称" style="width: 400px" />
      </el-form-item>
      <el-form-item label="所在区域" prop="province">
        <el-select v-model="numberValidateFormOne.province" placeholder="请选择省" style="width: 126px" @change="provinceBtn">
          <el-option v-for="(item, index) in provinceData" :key="index" :label="item.rname" :value="item.id" />
        </el-select>
        <el-select v-model="numberValidateFormOne.city" placeholder="请选择市" style="margin-left: 12px; width: 126px" @change="cityBtn">
          <el-option v-for="(item, index) in cityData" :key="index" :label="item.rname" :value="item.id" />
        </el-select>
        <el-select v-model="numberValidateFormOne.area" placeholder="请选择区" style="margin-left: 11px; width: 126px" @change="areaBtn">
          <el-option v-for="(item, index) in areaData" :key="index" :label="item.rname" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="详细地址" prop="address">
        <el-input v-model="numberValidateFormOne.address" placeholder="请输入详细地址" style="width: 400px" />
      </el-form-item>
      <el-form-item label="发票类型" prop="invoiceType">
        <el-checkbox-group v-model="numberValidateFormOne.invoiceType">
          <el-checkbox v-for="(item, index) in invoicetypeData" :key="index" :label="item.code" :name="item.name">{{ item.name || "" }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="formOneload" @click="submitFormOne('numberValidateFormOne')">下一步</el-button>
      </el-form-item>
      <span class="tip" style="margin-bottom: 60px">
        提示：为保证结果准确性，请保证企业类型、证照编码与实际相符
      </span>
    </el-form>
  </div>
</template>
<script>
// import top from '../index/top/index.vue'
// import { mapGetters } from 'vuex'
import {
  regionProvince,
  regionCity,
  regionArea,
  getinvoicetypeList,
  postshopSubmit,
} from "@/api/merchantsettlement/index";
// import { regionProvince, regionCity, regionArea } from '@/api/index'
export default {
  components: {},
  data() {
    return {
      invoicetypeData: [],
      formOneload: false,
      numberValidateFormOne: {
        province: "",
        city: "",
        area: "",
        invoiceType: [],
      },
      provinceData: {},
      cityData: [],
      areaData: [],
      // 按钮等待
      formload: false,
      // // 表单对象的赋值
      // numberValidateForm: {},
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
        scopeIds: [
          { required: true, message: `请选择经营范围`, trigger: `change` },
        ],
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
    };
  },
  props: {
    requestId: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.getinvoicetypeList();
    this.getProvince();
  },
  methods: {
    submitFormOne(formName) {
      this.formOneload = true;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.numberValidateFormOne)
          const {
            address, area, areaName, city, cityName, invoiceType, name, province, provinceName
          } = this.numberValidateFormOne
          const d = {
            address, area, areaName, city, cityName, name, province, provinceName,
            invoiceType: invoiceType.join(','), requestId: this.requestId
          }
          console.log(d)
          // this.numberValidateFormOne.invoiceType =
          //   this.numberValidateFormOne.invoiceType.toString();
          // this.numberValidateFormOne.requestId = this.requestId;
          postshopSubmit(d).then((res) => {
            const { code, data } = res
            if (code === 0 && data && data.result) {
              this.$message.success(`提交成功！`);
              this.$emit("setStep", data.requestId);
            } else {
              this.$message.error(`提交失败！`);
            }
            this.formOneload = false;
          }).catch(() => {
            this.formOneload = false;
          });
        } else {
          this.formOneload = false;
          return false;
        }
      });
    },
    getProvince() {
      regionProvince().then((res) => {
        if (res.code === 0) {
          this.provinceData = res.data;
        }
      });
    },
    getinvoicetypeList() {
      getinvoicetypeList().then((res) => {
        if (res.code === 0) {
          this.invoicetypeData = res.data;
        }
      });
    },
    provinceBtn(item) {
      this.cityData = [];
      this.areaData = [];
      const provinceIndex = this.provinceData.findIndex(
        (res) => res.id === item
      );
      this.numberValidateFormOne.provinceName =
        this.provinceData[provinceIndex].rname;
      regionCity(item).then((res) => {
        this.cityData = res.data;
        this.numberValidateFormOne.city = ``;
        this.numberValidateFormOne.area = ``;
      });
    },
    cityBtn(item) {
      this.areaData = [];
      const cityIndex = this.cityData.findIndex((res) => res.id === item);
      this.numberValidateFormOne.cityName = this.cityData[cityIndex].rname;
      regionArea(item).then((res) => {
        this.numberValidateFormOne.area = "";
        this.areaData = res.data;
      });
    },
    areaBtn(item) {
      const areaIndex = this.areaData.findIndex((res) => res.id === item);
      this.numberValidateFormOne.areaName = this.areaData[areaIndex].rname;
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/styles/variables.scss';
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
</style>
