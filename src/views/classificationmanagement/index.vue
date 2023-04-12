<!--  -->
<template>
  <div class="classification">
    <div class="main">
      <!-- <div class="beizhu">
        备注：分类管理只可增加，不可删除，请谨慎操作！
      </div> -->
      <div class="topHeader">
        <div class="topHeaderManger">
          药品分类管理
        </div>
        <div class="tip">
          <i class="el-icon-warning" style="color: #f99b0d; margin-right: 10px" />备注：分类管理只可增加，不可删除，请谨慎操作！
        </div>
      </div>
      <div class="fenlei">
        <div class="box">
          <div class="top">
            <span class="mingcheng">一级分类</span>
            <span class="add" @click="add(1)">新增一级分类</span>
          </div>
          <div class="center">
            <ul>
              <li v-for="(item,index) in listOne" :key="index" :class="item.id == activeOne ? 'activeClass':''" @click="clickLi(item,index)">{{ item.name }}</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="top">
            <span class="mingcheng">二级分类</span>
            <span class="add" @click="add(2)">新增二级分类</span>
          </div>
          <div class="center">
            <ul>
              <li v-for="(item,index) in listTwo" :key="index" :class="item.id == activeTwo ? 'activeClass':''" @click="clickLiTwo(item,index)">{{ item.name }}</li>
            </ul>
          </div>
        </div>
        <div class="box">
          <div class="top">
            <span class="mingcheng">三级分类</span>
            <span class="add" @click="add(3)">新增三级分类</span>
          </div>
          <div class="center">
            <ul>
              <li v-for="(item,index) in listThree" :key="index" :class="item.id == activeThree ? 'activeClass':''" @click="clickLiThree(item,index)">{{ item.name }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="resetForm" style="margin-top:25vh">
      <el-form ref="ruleForm" :inline="true" :model="form" :rules="rules">
        <el-form-item label="分类名称：" prop="name">
          <el-input v-model="form.name" size="small" placeholder="分类名称" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="resetForm">取 消</el-button>
        <el-button type="primary" size="small" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { goodsclassOne, goodsclassTwo, goodsclass } from '@/api/classificationmanagement.js'

export default {
  components: {},
  data() {
    return {
      title: '',
      dialogVisible: false,
      form: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      level: 1,
      parentId: '',
      activeOne: 0,
      listOne: [],
      activeTwo: 0,
      listTwo: [],
      activeThree: 0,
      listThree: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.goodsclassOne()
  },
  mounted() {

  },
  beforeCreate() { },
  beforeMount() { },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
  activated() { },
  methods: {
    add(num) {
      switch (num) {
        case 1:
          this.title = '新增一级分类'
          this.level = 1
          this.parentId = 0
          break
        case 2:
          this.title = '新增二级分类'
          this.level = 2
          this.parentId = this.activeOne
          break
        case 3:
          this.title = '新增三级分类'
          this.level = 3
          this.parentId = this.activeTwo
          break
      }
      this.dialogVisible = true
    },
    submit() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          const params = {
            id: '',
            level: this.level,
            name: this.form.name,
            parentId: this.parentId,
            sort: ''
          }
          goodsclass(params).then(res => {
            if (res.code === 0) {
              this.$message.success('新增成功')
              this.$refs['ruleForm'].resetFields()
              this.dialogVisible = false
              this.goodsclassOne()
            } else {
              this.$message.success('新增失败')
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
      this.dialogVisible = false
    },
    goodsclassOne() {
      goodsclassOne().then(res => {
        if (res.code === 0) {
          this.listOne = res.data
          if (this.listOne.length > 0) {
            this.activeOne = this.listOne[0].id
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
            this.activeTwo = this.listTwo[0].id
            this.goodsclassThree(this.listTwo[0].id)
          }
        }
      })
    },
    goodsclassThree(id) {
      goodsclassTwo(id).then(res => {
        if (res.code === 0) {
          this.listThree = res.data
          if (this.listThree.length > 0) {
            this.activeThree = this.listThree[0].id
          }
        }
      })
    },
    clickLi(item, index) {
      this.activeOne = item.id
      this.goodsclassTwo(item.id)
    },
    clickLiTwo(item, index) {
      this.activeTwo = item.id
      this.goodsclassThree(item.id)
    },
    clickLiThree(item) {
      this.activeThree = item.id
    }
  }
}
</script>
<style lang='scss' scoped>
.classification {
  padding: 0px;
  .main {
    height: 100%;
    .topHeader {
      padding: 0 24px;
      height: 56px;
      line-height: 56px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f5f5f5;
      .topHeaderManger {
        font-size: 16px;
        font-family: PingFang SC, PingFang SC-Medium;
        font-weight: 700;
        color: #262626;
        margin-right: 16px;
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
        padding: 4px 20px;
      }
    }

    .beizhu {
      color: red;
      padding: 20px;
    }
    .fenlei {
      width: calc(100% - 48px);
      display: flex;
      justify-content: space-between;
      margin: 0 24px;
      .box {
        width: 33%;
        padding: 0 5px;
        .top {
          padding: 10px 0 10px 0;
          .mingcheng {
            color: black;
            font-size: 16px;
            font-weight: 600;
          }
          .add {
            font-size: 16px;
            color: rgb(13, 161, 168);
            float: right;
            &:hover {
              cursor: pointer;
            }
          }
        }
        .center {
          border: 1px solid #ccc;
          height: 665px;
          overflow: auto;
          border-radius: 4px;
          ul {
            padding-left: 0px;
            margin: 0px 0 0px 0;
            .activeClass {
              background: #f2f8f9;
              color: #0da1a8;
              border-left: 4px solid #0da1a8;
            }
            li {
              font-size: 14px;
              color: #595959;
              list-style-type: none;
              cursor: pointer;
              padding: 6px 6px;
            }
          }
        }
      }
    }
  }
  ::v-deep .el-form-item__content {
    width: 300px;
  }
}
</style>
