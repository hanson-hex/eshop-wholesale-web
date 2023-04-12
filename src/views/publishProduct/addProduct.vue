<template>
  <div class="comContent addProduct">
    <div class="firstTopic text-left mb20 header">商品信息</div>
    <!-- <el-divider /> -->
    <el-form ref="shopingcart" :model="formTool" size="small" style="margin-top:10px;" class="leimu">
      <el-row :gutter="10" type="flex" justify="space-between">
        <el-col :span="10">
          <el-form-item label="您最近使用的类目">
            <el-select v-model="formTool.selectValue" style="width:300px;display:inline-block" value-key="id" placeholder="请选择" @change="selectVale">
              <el-option v-for="item in recentlyList" :key="item.id" :value="item">
                <span>{{ item ? item.goodsOneClassName + ">" + item.goodsTwoClassName + ">" + item.goodsThreeClassName : ''
                }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <div style="display:inline-block;padding-right:5px">
          <el-button type="primary" :disabled="!selectItem.goodsThreeClassId" size="small" @click="comfirm">下一步</el-button>
        </div>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24" style="padding:0px">
          <div class="fenlei">
            <div class="box">
              <div class="center">
                <ul>
                  <li v-for="(item, index) in listOne" :key="item.id" :class="item.id == selectItem.goodsOneClassId ? 'activeClass' : ''" @click="clickLi(item, index)">{{
                      item.name }}</li>
                </ul>
              </div>
            </div>
            <div class="box">
              <div class="center">
                <ul>
                  <li v-for="(item, index) in listTwo" :key="item.id" :class="item.id == selectItem.goodsTwoClassId ? 'activeClass' : ''" @click="clickLiTwo(item, index)">{{
                      item.name }}</li>
                </ul>
              </div>
            </div>
            <div class="box">
              <div class="center">
                <ul>
                  <li v-for="(item, index) in listThree" :key="item.id" :class="item.id == selectItem.goodsThreeClassId ? 'activeClass' : ''" @click="clickLiThree(item, index)">
                    {{ item.name }}</li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getRecently } from '@/api/com'
import { goodsclassOne, goodsclassTwo } from '@/api/classificationmanagement.js'
export default {
  data() {
    return {
      formTool: {
        selectValue: ''
      },
      activeOne: 0,
      listOne: [],
      activeTwo: 0,
      listTwo: [],
      activeThree: 0,
      listThree: [],
      selectItem: {
        goodsOneClassId: '',
        goodsOneClassName: '',
        goodsThreeClassId: '',
        goodsThreeClassName: '',
        goodsTwoClassId: '',
        goodsTwoClassName: ''
      },
      recentlyList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getRecently()
      this.goodsclassOne()
    },
    getRecently() {
      getRecently().then(res => {
        if (res.code === 0) {
          this.recentlyList = res.data
        }
      })
    },
    async selectVale(item) {
      this.formTool.selectValue = item.goodsOneClassName + '>' + item.goodsTwoClassName + '>' + item.goodsThreeClassName
      this.selectItem.goodsOneClassId = item.goodsOneClassId
      this.selectItem.goodsTwoClassId = item.goodsTwoClassId
      this.selectItem.goodsThreeClassId = item.goodsThreeClassId
      this.selectItem.goodsOneClassName = item.goodsOneClassName
      this.selectItem.goodsTwoClassName = item.goodsTwoClassName
      this.selectItem.goodsThreeClassName = item.goodsThreeClassName
      goodsclassTwo(this.selectItem.goodsOneClassId).then(res => {
        if (res.code === 0) {
          this.listTwo = res.data
        }
      })
      goodsclassTwo(this.selectItem.goodsTwoClassId).then(res => {
        if (res.code === 0) {
          this.listThree = res.data
        }
      })
    },
    comfirm() {
      console.log(this.selectItem)
      // this.$router.push({ name: 'auditProductEdit', params: { name: '123' }})
      this.$router.push({ path: '/productManage/auditProduct-edit', query: this.selectItem })
      // this.$refs['shopingcart'].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    goodsclassOne() {
      goodsclassOne().then(res => {
        if (res.code === 0) {
          this.listOne = res.data
          if (this.listOne.length > 0) {
            this.selectItem.goodsOneClassId = this.listOne[0].id
            this.selectItem.goodsOneClassName = this.listOne[0].name
            this.goodsclassTwo(this.listOne[0].id)
          }
        }
      })
    },
    goodsclassTwo(id) {
      goodsclassTwo(id).then(res => {
        if (res.code === 0) {
          this.listTwo = res.data
          this.listThree = []
          if (this.listTwo.length > 0) {
            this.selectItem.goodsTwoClassId = this.listTwo[0].id
            this.goodsclassThree(this.listTwo[0].id)
            this.selectItem.goodsTwoClassName = this.listTwo[0].name
          }
        }
      })
    },
    goodsclassThree(id) {
      goodsclassTwo(id).then(res => {
        if (res.code === 0) {
          this.listThree = res.data
          if (this.listThree.length > 0) {
            this.selectItem.goodsThreeClassId = this.listThree[0].id
            this.selectItem.goodsThreeClassName = this.listThree[0].name
          } else {
            this.selectItem.goodsThreeClassId = ''
            this.selectItem.goodsThreeClassName = ''
          }
        }
      })
    },
    clickLi(item, index) {
      this.selectItem.goodsOneClassId = item.id
      this.selectItem.goodsOneClassName = item.name
      this.formTool.selectItem
      this.goodsclassTwo(item.id)
    },
    clickLiTwo(item, index) {
      this.selectItem.goodsTwoClassId = item.id
      this.selectItem.goodsTwoClassName = item.name
      this.goodsclassThree(item.id)
    },
    clickLiThree(item) {
      this.selectItem.goodsThreeClassId = item.id
      this.selectItem.goodsThreeClassName = item.name
    }
  }
}

</script>
<style lang="scss" scoped>
.addProduct {
  height: calc(100vh - 145px);
  padding: 0px;
  .header {
    height: 56px;
    line-height: 56px;
    padding: 0 24px;
    border-bottom: 1px solid #f5f5f5;
    margin-bottom: 0px;
  }
  .leimu {
    margin: 0 24px;
  }
  .fenlei {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .box {
      width: 33%;
      padding: 0px 5px;

      .center {
        border: 1px solid #dcdfe6;
        border-radius: 4px;

        ul {
          height: 652px;
          overflow-y: auto;
          margin: 0;
          padding-left: 0;

          .activeClass {
            background: #f2f8f9;
            color: #0da1a8;
            border-left: 4px solid #0da1a8;
          }

          li {
            color: #595959;
            list-style-type: none;
            cursor: pointer;
            padding: 6px 6px;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
