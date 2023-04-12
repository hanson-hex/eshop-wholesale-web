<template>
  <div>
    <!-- ref="infoFormTwo" :model="infoFormTwo" label-position="top" -->
    <div class="ruleFormCont">
      <template v-for="(ul,index) in nallTypes">
        <div v-if="ul.show"
             :key="index"
             label-width="800px"
             style="margin-bottom:30px;">
          <!-- :prop="infoFormTwo[ul.keyTime]" -->
          <!-- slot="label" -->
          <div style="width: 800px;margin-bottom:10px;">
            <div style="display: flex; justify-content: space-between">
              <div><span v-if="ul.type != '09' && ul.require"
                      style="color: red; margin-right: 10px">*</span>{{ ul.name }}</div>
              <div v-if="!ul.timehide">
                <span style="margin-right: 10px;font-weight:400;color:#999;"
                      class="mainColor">有效期</span>
                <el-date-picker v-model="infoFormTwo[ul.keyTime]"
                                type="daterange"
                                size="mini"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期" />
              </div>
            </div>
          </div>
          <div class="uploadCont">
            <div class="imgList">
              <div v-for="(li,i) in infoFormTwo[ul.keyImg]"
                   :key="i"
                   class="imgList_li">
                <el-image class="imgList_li_img"
                          style=""
                          :src="li"
                          :preview-src-list="infoFormTwo[ul.keyImg]" />
                <p class="imgList_li_close"
                   @click="imgDel([ul.keyImg],i)"><i class="el-icon-delete" /></p>
              </div>
              <div class="imgList_li imgList_li_add"
                   @click="goUpload([ul.keyImg])">
                <i class="el-icon-plus" />
              </div>
            </div>
            <div v-if="ul.desc"
                 class="desc">{{ ul.desc }}</div>
            <div v-if="ul.type == '09'"
                 class="more_input">
              <p class="more_p"
                 style="margin-bottom:5px;">备注</p>
              <el-input v-model="infoFormTwo.remarks"
                        type="txtarea" />
            </div>
          </div>
        </div>
      </template>
      <!-- <el-form-item label-width="600px">
        <div slot="label" style="width: 600px">
          <div style="display: flex; justify-content: space-between">
            <div>
              <span style="color: red; margin-right: 10px">*</span>
              医疗机构执业许可证
            </div>
            <div>
              <span style="margin-right: 10px" class="mainColor">查看示例</span>
              <el-date-picker
                v-model="numberValidateFormTwo.certifysFour"
                type="daterange"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </div>
        </div>
        <div class="uploadCont">
          <upload
            :request-id="numberValidateFormOne.requestId"
            :type-img="'04'"
          />
        </div>
      </el-form-item>
      <el-form-item
        v-if="selectNum === 0 || selectNum === 2 || selectNum === 3"
        label-width="600px"
      >
        <div slot="label" style="width: 600px">
          <div style="display: flex; justify-content: space-between">
            <div>
              <span style="color: red; margin-right: 10px">*</span>授权委托书
            </div>
            <div>
              <span style="margin-right: 10px" class="mainColor">查看示例</span>
              <span style="margin-right: 10px" class="mainColor">下载模板</span>
              <el-date-picker
                v-model="numberValidateFormTwo.certifysSix"
                type="daterange"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </div>
        </div>
        <div class="uploadCont">
          <upload
            :request-id="numberValidateFormOne.requestId"
            :type-img="'06'"
          />
        </div>
      </el-form-item>
      <el-form-item
        v-if="selectNum === 0 || selectNum === 2 || selectNum === 3"
        label-width="600px"
      >
        <div slot="label" style="width: 600px">
          <div style="display: flex; justify-content: space-between">
            <div>
              <span style="color: red; margin-right: 10px">*</span
              >被委托人身份证复印件(正反两面)
            </div>
            <div>
              <el-date-picker
                v-model="numberValidateFormTwo.certifysFive"
                type="daterange"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </div>
        </div>
        <div class="uploadCont">
          <upload
            :request-id="numberValidateFormOne.requestId"
            :type-img="'05'"
          />
        </div>
      </el-form-item>
      <el-form-item
        v-if="selectNum === 0 || selectNum === 2 || selectNum === 3"
        label-width="600px"
      >
        <div slot="label" style="width: 600px">
          <div style="display: flex; justify-content: space-between">
            <div>
              <span style="color: red; margin-right: 10px">*</span>营业执照
            </div>
            <div>
              <span style="margin-right: 10px" class="mainColor">查看示例</span>
              <el-date-picker
                v-model="numberValidateFormTwo.certifysOne"
                type="daterange"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </div>
        </div>
        <div class="uploadCont">
          <upload
            :request-id="numberValidateFormOne.requestId"
            :type-img="'01'"
          />
        </div>
      </el-form-item>
      <el-form-item
        v-if="selectNum === 2 || selectNum === 3"
        label-width="600px"
      >
        <div slot="label" style="width: 600px">
          <div style="display: flex; justify-content: space-between">
            <div>
              <span style="color: red; margin-right: 10px">*</span
              >食品经营许可证
            </div>
            <div>
              <span style="margin-right: 10px" class="mainColor">查看示例</span>
              <el-date-picker
                v-model="numberValidateFormTwo.certifysThree"
                type="daterange"
                size="mini"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </div>
          </div>
        </div>
        <div class="uploadCont">
          <upload
            :request-id="numberValidateFormOne.requestId"
            :type-img="'03'"
          />
        </div>
      </el-form-item>
      <el-form-item
        v-if="selectNum === 2 || selectNum === 3"
        label-width="600px"
      >
        <div slot="label" style="width: 600px">
          <div style="display: flex; justify-content: space-between">
            <div>第二类医疗器械经营备案凭证</div>
            <div>
              <span style="margin-right: 10px" class="mainColor">查看示例</span>
            </div>
          </div>
        </div>
        <div class="uploadCont">
          <upload
            :request-id="numberValidateFormOne.requestId"
            :type-img="'07'"
          />
        </div>
      </el-form-item>
      <el-form-item v-if="selectNum === 0" label-width="600px">
        <div slot="label" style="width: 600px">
          <div style="display: flex; justify-content: space-between">
            <div>开票信息和开户许可证</div>
            <div>
              <span style="margin-right: 10px" class="mainColor">查看示例</span>
            </div>
          </div>
        </div>
        <div class="uploadCont">
          <upload
            :request-id="numberValidateFormOne.requestId"
            :type-img="'08'"
          />
        </div>
      </el-form-item> -->
      <!-- <el-form-item label-width="600px">
        <div slot="label" style="width: 600px">
          <div style="display: flex; justify-content: space-between">
            <div>其他</div>
            <div>
              <span style="margin-right: 10px" class="mainColor">查看示例</span>
            </div>
          </div>
        </div>
        <div class="uploadCont">
          备注
          <el-input v-model="infoFormTwo.remarks" type="txtarea" />
        </div>
      </el-form-item> -->
      <div style="margin-bottom:30px;">
        <el-button type="primary"
                   @click="submitFormTwo">下一步</el-button>
      </div>
      <span class="tip"
            style="margin-bottom: 60px">
        提示：为保证结果准确性，请保证企业类型、证照编码与实际相符
      </span>
    </div>
    <MyUpload ref="imgupload"
              :request-id="requestId"
              @upload="uploadSubmit" />

  </div>
</template>

<script>
import MyUpload from './myupload.vue'
// import { mapGetters } from 'vuex'
import { postshopSubmit, shopFinish } from "@/api/merchantsettlement/index";
import { deepClone } from "@/utils/index"
export default {
  components: {
    MyUpload
  },
  data () {
    return {
      allTypes: [
        { show: false, require: false, name: '营业许可证', type: '01', keyTime: 'certifys01Time', keyImg: 'certifys01Img' },
        { show: false, require: false, name: '药品经营许可证', type: '02', keyTime: 'certifys02Time', keyImg: 'certifys02Img' },
        { show: false, require: false, name: '食品经营许可证', type: '03', keyTime: 'certifys03Time', keyImg: 'certifys03Img' },
        { show: false, require: false, name: '医药机构执业许可证', type: '04', keyTime: 'certifys04Time', keyImg: 'certifys04Img' },
        { show: false, require: false, name: '被委托人身份证复印件(正反两面)', type: '05', keyTime: 'certifys05Time', keyImg: 'certifys05Img' },
        { show: false, require: false, name: '授权委托书', type: '06', keyTime: 'certifys06Time', keyImg: 'certifys06Img' },
        { show: false, require: false, name: '第二类医疗器械经营备案凭证', type: '07', keyTime: 'certifys07Time', keyImg: 'certifys07Img' },
        { show: false, require: false, name: '开票信息和开户许可证', type: '08', keyTime: 'certifys08Time', keyImg: 'certifys08Img' },
        { show: true, require: false, name: '其他', type: '09', keyTime: 'certifys09Time', keyImg: 'certifys09Img', timehide: true }
      ],
      infoFormTwo: {
        certifys01Img: [], certifys01Time: [],
        certifys02Img: [], certifys02Time: [],
        certifys03Img: [], certifys03Time: [],
        certifys04Img: [], certifys04Time: [],
        certifys05Img: [], certifys05Time: [],
        certifys06Img: [], certifys06Time: [],
        certifys07Img: [], certifys07Time: [],
        certifys08Img: [], certifys08Time: [],
        certifys09Img: [], certifys09Time: [],
        remarks: '',
      },
      // 按钮等待
      formload: false,
      // rules: {
      //   certifys01Time: [{ required: true, message: '请输入营业许可证有效期', trigger: `blur` }],
      //   certifys02Time: [{ required: true, message: '请输入药品经营许可证有效期', trigger: `blur` }],
      //   certifys03Time: [{ required: true, message: '请输入食品经营许可证有效期', trigger: `blur` }],
      //   certifys04Time: [{ required: true, message: '请输入医药机构执业许可证有效期', trigger: `blur` }],
      //   certifys05Time: [{ required: true, message: '请输入被委托人身份证复印件有效期', trigger: `blur` }],
      //   certifys06Time: [{ required: true, message: '请输入授权委托书有效期', trigger: `blur` }],
      //   certifys07Time: [{ required: true, message: '请输入第二类医疗器械经营备案凭证有效期', trigger: `blur` }],
      //   certifys08Time: [{ required: true, message: '请输入开票信息和开户许可证有效期', trigger: `blur` }]
      // },
    };
  },
  props: {
    requestId: {
      type: String,
      default: "",
    },
    code: {
      type: String,
      default: "",
    },
  },
  computed: {
    nallTypes () {
      const { code, allTypes } = this
      let types = deepClone(allTypes)
      if (code == '1') {
        types[0].show = true
        types[0].require = true
        types[3].show = true
        types[3].require = true
        types[4].show = true
        types[4].require = true
        types[5].show = true
        types[5].require = true
      }
      if (code == '2') {
        types[2].show = true
        types[2].require = true
        types[7].show = true
      }
      if (code == '3' || code == '4') {
        types[0].show = true
        types[0].require = true
        types[1].show = true
        types[1].require = true
        types[2].show = true
        types[2].require = true
        types[5].show = true
        types[5].require = true
        types[4].show = true
        types[4].require = true
        types[6].show = true
      }
      return types
    }
  },
  mounted () { },
  methods: {
    goUpload (type) {
      // console.log(type)
      this.$refs['imgupload'].open(type)
    },
    uploadSubmit (obj) {
      const { type, url } = obj
      this.infoFormTwo[type].push(url);
    },
    imgDel (key, i) {
      this.$confirm('此操作删除上传的图片, 是否确认操作?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
      }).then(() => {
        this.infoFormTwo[key].splice(i, 1);
      }).catch(() => {
        this.$message.warning('您已取消操作');
      });
    },
    submitFormTwo () {
      const { requestId, code } = this
      const {
        certifys01Img, certifys01Time, certifys02Img, certifys02Time,
        certifys03Img, certifys03Time, certifys04Img, certifys04Time,
        certifys05Img, certifys05Time, certifys06Img, certifys06Time,
        certifys07Img, certifys07Time, certifys08Img, certifys08Time,
        certifys09Img, certifys09Time, remarks
      } = this.infoFormTwo
      if (code == '1') {
        if (certifys01Img.length == 0) { this.$message.error('请上传营业许可证照片'); return }
        if (certifys01Time.length == 0) { this.$message.error('请输入营业许可证有效期'); return }
        // if (certifys02Img.length == 0) { this.$message.error('请上传药品经营许可证照片'); return }
        // if (certifys02Time.length == 0) { this.$message.error('请输入药品经营许可证有效期'); return }
        // if (certifys03Img.length == 0) { this.$message.error('请上传食品经营许可证照片'); return }
        // if (certifys03Time.length == 0) { this.$message.error('请输入食品经营许可证有效期'); return }
        if (certifys04Img.length == 0) { this.$message.error('请上传医药机构执业许可证照片'); return }
        if (certifys04Time.length == 0) { this.$message.error('请输入医药机构执业许可证有效期'); return }
        if (certifys05Img.length == 0) { this.$message.error('请上传被委托人身份证照片'); return }
        if (certifys05Time.length == 0) { this.$message.error('请输入被委托人身份证有效期'); return }
        if (certifys06Img.length == 0) { this.$message.error('请上传授权委托书照片'); return }
        if (certifys06Time.length == 0) { this.$message.error('请输入授权委托书有效期'); return }
      } else if (code == '2') {
        if (certifys03Img.length == 0) { this.$message.error('请上传食品经营许可证照片'); return }
        if (certifys03Time.length == 0) { this.$message.error('请输入食品经营许可证有效期'); return }
      } else {
        if (certifys01Img.length == 0) { this.$message.error('请上传营业许可证照片'); return }
        if (certifys01Time.length == 0) { this.$message.error('请输入营业许可证有效期'); return }
        if (certifys02Img.length == 0) { this.$message.error('请上传药品经营许可证照片'); return }
        if (certifys02Time.length == 0) { this.$message.error('请输入药品经营许可证有效期'); return }
        if (certifys03Img.length == 0) { this.$message.error('请上传食品经营许可证照片'); return }
        if (certifys03Time.length == 0) { this.$message.error('请输入食品经营许可证有效期'); return }
        // if (certifys04Img.length == 0) { this.$message.error('请上传医药机构执业许可证照片');return }
        // if (certifys04Time.length == 0) { this.$message.error('请输入医药机构执业许可证有效期');return }
        if (certifys05Img.length == 0) { this.$message.error('请上传被委托人身份证照片'); return }
        if (certifys05Time.length == 0) { this.$message.error('请输入被委托人身份证有效期'); return }
        if (certifys06Img.length == 0) { this.$message.error('请上传授权委托书照片'); return }
        if (certifys06Time.length == 0) { this.$message.error('请输入授权委托书有效期'); return }
        // if (certifys07Img.length == 0) { this.$message.error('请上传第二类医疗器械经营备案凭证照片');return }
        // if (certifys07Time.length == 0) { this.$message.error('请输入第二类医疗器械经营备案凭证有效期');return }
        // if (certifys08Img.length == 0) { this.$message.error('请上传开票信息和开户许可证照片');return }
        // if (certifys08Time.length == 0) { this.$message.error('请输入开票信息和开户许可证有效期');return }
      }
      // if (!remarks) { this.$message.error('请填写备注信息');return }
      let new_data = []
      if (code == '1') {
        new_data = [
          { time: certifys01Time, images: certifys01Img, code: '01' },
          // { time: certifys02Time, images: certifys02Img, code: '02' },
          // { time: certifys03Time, images: certifys03Img, code: '03' },
          { time: certifys04Time, images: certifys04Img, code: '04' },
          { time: certifys05Time, images: certifys05Img, code: '05' },
          { time: certifys06Time, images: certifys06Img, code: '06' },
          // { time: certifys07Time, images: certifys07Img, code: '07' },
          // { time: certifys08Time, images: certifys08Img, code: '08' },
          { time: certifys09Time, images: certifys09Img, code: '09' }
        ]
      } else if (code == '2') {
        new_data = [
          // { time: certifys01Time, images: certifys01Img, code: '01' },
          // { time: certifys02Time, images: certifys02Img, code: '02' },
          { time: certifys03Time, images: certifys03Img, code: '03' },
          // { time: certifys04Time, images: certifys04Img, code: '04' },
          // { time: certifys05Time, images: certifys05Img, code: '05' },
          // { time: certifys06Time, images: certifys06Img, code: '06' },
          // { time: certifys07Time, images: certifys07Img, code: '07' },
          { time: certifys08Time, images: certifys08Img, code: '08' },
          { time: certifys09Time, images: certifys09Img, code: '09' }
        ]
      } else {
        new_data = [
          { time: certifys01Time, images: certifys01Img, code: '01' },
          { time: certifys02Time, images: certifys02Img, code: '02' },
          { time: certifys03Time, images: certifys03Img, code: '03' },
          // { time: certifys04Time, images: certifys04Img, code: '04' },
          { time: certifys05Time, images: certifys05Img, code: '05' },
          { time: certifys06Time, images: certifys06Img, code: '06' },
          { time: certifys07Time, images: certifys07Img, code: '07' },
          // { time: certifys08Time, images: certifys08Img, code: '08' },
          { time: certifys09Time, images: certifys09Img, code: '09' }
        ]
      }
      let certifys = new_data.map(li => {
        const { time, images, code } = li
        let new_li = {
          code, images, termType: "02",
          startValidDate: code == '09' ? '' : time[0],
          endValidDate: code == '09' ? '' : time[1]
        }
        return new_li
      })
      let d = { requestId, remarks, certifys }
      console.log(d)
      shopFinish(d).then((res) => {
        const { code, data } = res
        if (code === 0 && data) {
          this.$message.success(`提交成功！`);
          this.$emit("setStep", true);
        } else {
          this.$message.error(`提交失败！`);
          this.$emit("setStep", false);
        }
      }).catch(() => { });
    }
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

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

.ruleFormCont {
  width: 800px;
  padding-bottom: 30px;
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
    width: 800px;
    padding: 16px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    // overflow-x: scroll;
  }
}
</style>
