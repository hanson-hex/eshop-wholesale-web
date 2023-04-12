<!-- 售后 -->
<template>
  <div class='afterSale classification'>
    <div style="padding:0px ">
      <StepWay :step-array="[{ name: '提交申请' }, { name: '卖家审批' }, { name: '买家退货' }, { name: '卖家收货' }, { name: '退款中' }, { name: '完成' }]"
               :index-step="indexStep"
               @stepBtn="stepBtn" />
      <div style="display: flex;justify-content: ;">
        <el-form ref="ruleForm"
                 :model="ruleForm"
                 :rules="rules"
                 size="small"
                 label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="售后商品"
                        prop="name"
                        style="display:flex;align-items: center;">
            <div style="display:flex;align-items: center;margin-left: -100px;">
              <img src="@/assets/shop.png"
                   width="100px"
                   alt="">
              <div style="margin-left:20px">
                <p style="margin:0;line-height:20px">葡萄糖注射液</p>
                <p style="margin:0;line-height:20px">国药准字H43022082</p>
                <p style="margin:0;line-height:20px">湖南科伦制药有限公司</p>
                <p style="margin:0;line-height:20px">82S*1瓶/1瓶</p>
              </div>

            </div>
          </el-form-item>
          <el-form-item label="售后数量"
                        prop="region">
            <el-input-number />
          </el-form-item>
          <el-form-item label="售后方式"
                        prop="region">
            <el-select v-model="ruleForm.region"
                       placeholder="请选择活动区域">
              <el-option label="区域一"
                         value="shanghai" />
              <el-option label="区域二"
                         value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="售后原因">
            <el-select v-model="ruleForm.region"
                       prop="region"
                       placeholder="请选择活动区域">
              <el-option label="区域一"
                         value="shanghai" />
              <el-option label="区域二"
                         value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="售后金额"
                        prop="jine">
            <el-input style="width:200px"
                      v-model="ruleForm.jine"
                      placeholder="请输入内容"></el-input> 元
          </el-form-item>
          <el-form-item label="说明"
                        prop="desc">
            <el-input v-model="ruleForm.desc"
                      type="textarea"
                      placeholder="200字以内" />
          </el-form-item>
          <el-form-item label="图片"
                        style="margin-bottom:0px!important">
            <ImgUpload v-model="ruleForm.imageList"
                       :limit="3"
                       style="position:relative;top:-8px">
              <template slot="tip">
                <p class="el-upload__tip"
                   style="margin:0px">
                  备注:图片格式为jpg或png，建议尺寸100*100，图片大小不得超过5M;第一张图片会作为商品展示图
                </p>
              </template>
            </ImgUpload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import StepWay from '@/components/step'
import ImgUpload from '@/components/imgUpload'
export default {
  components: { StepWay, ImgUpload },
  data () {
    return {
      indexStep: '1',
      ruleForm: {
        region: '',
        desc: '',
        jine: '',
        imageList: ['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg', 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg', 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',]
      },
      rules: {
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        jine: [
          { required: true, message: '请输入退款金额', trigger: 'blur' }
        ],
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 步骤条点击事件
    stepBtn (val) {
      console.log(val)
    },
    // 提交
    submitForm (ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {

          alert('submit!');
        } else {
          return false;
        }
      });

    }
  },
  created () {

  },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
}
</script>
<style lang='scss' scoped>
.afterSale {
  padding: 24px;
  height: 100%;
  width: 100%;
}
</style>