<template>
  <div class="itemCont">
    <div class="itemImg">
      <el-image lazy :src="item.image" alt="" :preview-src-list="item.image ? [item.image] : []" style="width: 205px; height: 205px" />
    </div>
    <el-tooltip class="item" effect="dark" :content="item.name" placement="top">
      <div class="itemBox name">
        {{ item.name || '' }}
      </div>
    </el-tooltip>
    <div class="itemBox factory">
      {{ item.specification || '' }}
    </div>
    <div class="itemBox factory">
      {{ item.specification || '' }}
    </div>

    <div class="opt">
      <el-button @click="apply" color="#F5222D" plain>提交申请 帮您找药</el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="申请全球找药" class="custom-dialog" :before-close="handleClose">
      <div class="dialog-content-wrapper">
        <div class="warn">
          <img class="warn-icon" src="@/assets/images/warning-circle-fill.png" alt="" />
          为了更快帮您找到您需要的商品，请尽量细致的填写信息（星号为必填）
        </div>
        <div class="dialog-content">
          <div class="item">
            <el-image lazy :src="getImageUrl()" alt="" :preview-src-list="item.image ? [item.image] : []" style="width: 116px; height: 116px" />
            <div class="desc">
              <div class="item-name">
                {{ item.name || '' }}
              </div>
              <div class="item-text">
                {{ item.specification || '' }}
              </div>
              <div class="item-text">
                {{ item.specification || '' }}
              </div>
              <div class="item-text one-line">
                <span>期望单价：≤ </span>
                <el-input v-model="input1" class="price-input" size="large" placeholder="请输入金额" prefix-icon="" />
                <span> 期望数量: </span>
                <el-input-number v-model="num" :step="1" />
                盒
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="info-header">
            <div class="people-info">申请人信息</div>
            <div class="line"></div>
          </div>
          <el-form label-position="top" :inline="true" ref="formRef" :model="numberValidateForm" label-width="100px" class="demo-ruleForm">
            <el-col :span="12">
              <el-form-item label="机构名称" prop="name" :rules="[]">
                <el-input v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="客户姓名"
                prop="age"
                :rules="[
                  {
                    required: true,
                  },
                ]"
              >
                <el-input placeholder="请输入客户名称" v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="联系方式"
                prop="age"
                :rules="[
                  {
                    required: true,
                  },
                ]"
              >
                <el-input placeholder="请输入联系方式" v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="备用电话"
                prop="age"
                :rules="[
                  {
                    required: true,
                  },
                ]"
              >
                <el-input placeholder="请输入备用电话" v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="收货地址"
                prop="age"
                :rules="[
                  {
                    required: true,
                  },
                ]"
              >
                <div class="address">
                  <!-- value绑定的是对象，当改变值的可以取item的值，这时候必须制定value-key的值，标识选择框中显示的字段名称 -->
                  <el-select v-model="data.provinceObj" placeholder="请选择" @change="provinceChange" value-key="name">
                    <el-option
                      v-for="(province, index) in data.provinceData"
                      :key="index"
                      :label="province.name"
                      :value="province"
                    ></el-option> </el-select
                  >&nbsp;&nbsp;
                  <el-select v-model="data.cityObj" placeholder="请选择" @change="cityChange" value-key="name">
                    <el-option v-for="(city, index) in data.cityData" :key="index" :label="city.name || ''" :value="city"></el-option> </el-select
                  >&nbsp;&nbsp;
                  <el-select v-model="data.countryObj" placeholder="请选择" @change="countryChange" value-key="name">
                    <el-option
                      v-for="(country, index) in data.countryData"
                      :key="index"
                      :label="country.name || ''"
                      :value="country"
                    ></el-option> </el-select
                  >&nbsp;&nbsp;
                </div>

                <el-input placeholder="请输入详细地址" v-model.number="numberValidateForm.age" type="text" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="备注"
                prop="age"
                :rules="[
                  {
                    required: true,
                  },
                ]"
              >
                <el-input class="mark" placeholder="请输入备注信息" type="textarea" v-model.number="numberValidateForm.age" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否接受代替厂家及规格" prop="resource">
                <el-radio-group v-model="numberValidateForm.age">
                  <el-radio label="接受" />
                  <el-radio label="不接受" />
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12"> </el-col>
            <div class="bottom-btn">
              <el-form-item>
                <el-radio-group v-model="numberValidateForm.age">
                  <el-radio label="Sponsor">
                    <span class="person-info"> 《个人信息收集处理告知书》 </span>
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button class="cancel" type="primary" plain @click="submitForm(formRef)">取消</el-button>
                <el-button type="primary" @click="submitForm(formRef)">提交申请</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>

      <!-- <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </span>
    </template> -->
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import ProvinceCityCountry from '@/assets/json/address';

const formRef = ref<FormInstance>();

const data = reactive({
  provinceObj: { name: '' },
  cityObj: { name: '' },
  countryObj: { name: '' },
  provinceData: ProvinceCityCountry.address,
  cityData: [],
  countryData: [],
});
// 省份change
const provinceChange = (value: any) => {
  data.cityData = value.children; // 市下拉列表
  data.countryData = []; // 清空区县下拉列表数据
  data.cityObj = {
    name: '',
  }; // 清空市输入框内容
  data.countryObj = {
    name: '',
  }; // 清空区县输入框内容
};
// 市change
const cityChange = (value: any) => {
  data.countryData = value.children; // 县区下拉框列表
  data.countryObj = {
    name: '',
  }; // 清空区县输入框内容
};
// 县change
const countryChange = (value: any) => {
  console.log(data);
};

const numberValidateForm = reactive({
  age: '',
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};

const input1 = ref<string>('');
const num = ref<number>(0);

const getImageUrl = () => {
  return new URL('@/assets/images/default.png', import.meta.url).href;
};

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const dialogVisible = ref<boolean>(false);
const handleClose = () => {
  dialogVisible.value = false;
};
const apply = () => {
  dialogVisible.value = true;
};
</script>

<style lang="scss" scoped>
.itemCont {
  width: 223px;
  // height: 325px;
  // margin: 0 0 8px 8px;
  border-radius: 4px;
  padding-bottom: 8px;
  border: 1px solid #fff;
  &:hover {
    border: 1px solid #ff4d50;
    border-radius: 4px;
    box-shadow: 0px 6px 10px 0px rgba(255, 77, 80, 0.2), 0px 3px 4px -5px rgba(255, 77, 80, 0.5);
  }

  .factory {
    color: #595959;
    font-size: 14px;
    height: 22px;
    font-size: 14px;
    font-family: PingFang SC, PingFang SC-Regular;
    font-weight: 400;
    text-align: left;
    color: #595959;
    line-height: 22px;
  }

  .itemBox {
    padding: 0px 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 22px;
    margin: 0;
    font-size: 14px;
    color: #595959;
  }

  .name {
    display: block !important;
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    padding: 4px 10px;
    color: #262626;
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #262626;
    line-height: 24px;
    margin-bottom: 8px;
  }
  .shopName {
    display: flex;
    justify-content: start;
    align-items: center;
    img {
      margin-right: 8px;
    }
  }
  .opt {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    padding-left: 10px;
    padding-right: 10px;
    button {
      width: 100%;
      background-color: #fff;
    }
    button:hover {
      background-color: #f6212d;
    }
  }

  .itemImg {
    width: 100%;
    padding: 8px;
    display: flex;
    justify-content: center;
  }

  .price {
    font-weight: 700;
    justify-content: end;
  }

  .shopCar {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    p {
      margin: 0px;
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Medium;
      font-weight: 500;
      text-align: left;
      color: #f6212d;
      line-height: 32px;
    }
    .el-button {
      padding: 8px 12px;
    }
  }
}
:deep(.el-dialog__body) {
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;
}
.custom-dialog {
  min-width: 800px;
  .dialog-content-wrapper {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
    // min-width: 800px;
    .warn {
      display: flex;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 16px;
      .warn-icon {
        width: 18px;
        height: 18px;
        margin-right: 10px;
      }
      min-height: 40px;
      background-color: #fff9e6;
      border: 1px solid #ffdb88;
      border-radius: 4px;
    }
    .dialog-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .item {
        display: flex;
        flex-direction: row;
        .desc {
          margin-left: 16px;
          .item-title {
            width: 100%;
            height: 44px;
            text-align: center;
            line-height: 44px;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 16px;
          }
          .item-name {
            color: #262626;
            font-size: 16px;
            margin-top: 5px;
            margin-bottom: 5px;
          }
          .item-text {
            font-size: 14px;
            color: #595959;
          }
          .one-line {
            .price-input {
              width: 140px;
              margin-right: 32px;
            }
            :deep(.el-input-number) {
              margin-right: 10px;
              margin-left: 5px;
            }
          }
        }
      }
    }
    .address {
      margin-bottom: 8px;
      :deep(.el-select) {
        width: 31%;
      }
      .mark {
        textarea {
          height: 75px;
        }
      }
    }
    .bottom-btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 52px;
      align-items: center;
      border-top: 1px solid #f2f2f2;
      .el-form-item {
        margin-bottom: 0;
      }
      .cancel {
        background-color: #fff;
      }
      .person-info {
        font-size: 14px;
        color: #f5222d;
      }
    }
  }
}
</style>
