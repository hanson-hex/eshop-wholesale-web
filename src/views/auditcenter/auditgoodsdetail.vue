
<!--  -->
<template>
  <div class="comContent">
    <!-- <el-page-header content="待审核商品信息" style="padding-top:16px" @back="goBack" /> -->
    <div class="header">商品审核</div>
    <div class="center">
      <GoodsInfo :goods-info="info"
                 :isedit="false" />
      <div class="status_txt">当前商品审核状态:
        <MyTypes />
      </div>
      <div class="dia_btn">
        <MyButton type=""
                  icon=""
                  text="返回上一页"
                  class="btn_w150"
                  @click="goBack" />
        <MyButton type="primary"
                  icon=""
                  text="审核通过"
                  class="btn_w150"
                  @click="openDialog(true)" />
        <MyButton type="danger"
                  icon=""
                  text="驳回"
                  class="btn_w150"
                  @click="openDialog(false)" />
        <!-- <MyButton type="danger" icon="" text="测试按钮" class="btn_w150" @click="openTest" /> -->
      </div>
      <Success ref="sucDom"
               @sure="sucSubmit" />
      <Err ref="errDom"
           @sure="errSubmit" />
    </div>

  </div>
</template>

<script>
import MyTypes from '@/components/myTypes'
import MyButton from '@/components/myButton'
import { auditTypes } from '@/utils/enumeration'
import { goodsCheckSure } from '@/api/auditcenter'
import { getDetail } from '@/api/productManage/auditProduct'
import Success from './components/success.vue'
import Err from './components/err.vue'
import GoodsInfo from './components/goodsInfo.vue'
// import { concat } from '@/mock/user'
export default {
  components: { MyButton, GoodsInfo, Err, Success, MyTypes }, //, MyTable, Success
  data () {
    return {
      auditTrue: false,
      id: null,
      info: {},
      status: '',
    }
  },
  computed: {
    statusText () {
      return auditTypes(this.status)
    }
  },
  watch: {},
  created () {
    const { goodsId } = this.$route.query
    console.log(this.$route.query)
    if (goodsId) {
      this.id = goodsId
      this.getInfo()
    }
  },
  mounted () { },
  methods: {
    getInfo () {
      getDetail({ id: this.id }).then(res => {
        if (res.code === 0) {
          // console.log(res.data)
          const { imageList, barCodeImage, servicePromise } = res.data
          this.info = res.data
          this.status = res.data.status
          // console.log(imageList)
          this.info.imageList = imageList.split(',')
          this.info.barCodeImage = barCodeImage.split(',')
          this.info.servicePromise = servicePromise.split(',')
        }
      })
    },
    openDialog (val) {
      this.auditTrue = val
      if (val) {
        // this.$refs['sucDom'].open()
        this.$confirm('此操作将商品审核状态设置为通过, 是否确认操作?', '提示', {
          confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
        }).then(() => {
          this.goAudit({ status: "ALREADY" })
        }).catch(() => {
          this.$message.warning('您已取消操作');
        });
      } else {
        this.$refs['errDom'].open()
      }
    },
    openTest () {
      this.$refs['sucDom'].open()
    },
    sucSubmit (val) {
      console.log(val)
    },
    errSubmit (desc) {
      this.goAudit({ checkReason: desc, status: "FAIL" })
    },
    goAudit (obj) {
      let d = { ...obj, goodsId: this.id }
      goodsCheckSure(d).then(res => {
        if (res.code === 0) {
          this.$message.success('审核状态修改操作成功');
          this.$router.push('/audit/auditcenter-auditgoods')
          // this.getInfo()
        } else {
          this.$message.warning(res.msg);
        }
      })
    },
    goBack () {
      this.$router.push('/audit/auditcenter-auditgoods')
    }
  }
}
</script>
<style lang='scss' scoped>
.comContent {
  padding: 0px;
}
.header {
  padding: 0 24px;
  height: 56px;
  line-height: 56px;
  border-bottom: 1px solid #f2f2f2;
}
.center {
  margin: 0 24px;
}
.btn_w150 {
  width: 150px;
  margin-right: 8px;
}
.dia {
  &_btn {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 20px 0;
  }
}
.status {
  &_txt {
    margin: 10px 0;
    font-size: 14px;
    span {
      margin-left: 10px;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
