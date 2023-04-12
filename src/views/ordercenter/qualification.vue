
<!-- 查看资质 -->
<template>
  <div class="comContent">
    <!-- <el-page-header content="企业资质审核明细" style="padding-top:16px" @back="goBack" /> -->
    <div class="header">企业资质明细</div>
    <!-- <div class="center" style="margin-top:25px;"> -->
    <!-- 内容组件展示部分 -->
    <!-- <p>{{ info.shopName }} - {{ info.status }}</p> -->
    <!-- </div> -->
    <!-- :info="info" -->
    <div class="center">
      <CompanyInfo ref="infoBox" />
      <div v-if="btnShow"
           class="status_txt">当前审核状态:
        <MyTypes />
      </div>
      <div class="dia_btn"
           v-if="btnShow">
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
      </div>
    </div>

  </div>
</template>

<script>
import MyTypes from '@/components/myTypes'
import MyButton from '@/components/myButton'
import CompanyInfo from '../auditcenter/components/companyInfo'
import { drugenumeration } from '@/utils/enumeration'
import { auditTypes } from '@/utils/enumeration'
import { auditCompanyDetail, auditCompanyEdit } from '@/api/auditcenter'

export default {
  components: { MyButton, CompanyInfo, MyTypes }, //, MyTable
  data () {
    return {
      btnShow: false,
      auditTrue: false,
      reqId: null,
      id: null,
      info: {
        shopName: '',
        status: ''
      },
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
    const { id, btnShow } = this.$route.query
    console.log(id)
    if (id) {
      this.reqId = id
      this.getInfo()
    }
    // console.log(this.$route.query)
    // console.log(this.$route.params)
  },
  mounted () { },
  methods: {
    openDialog (val) {
      let t = this
      this.auditTrue = val
      if (val) {
        this.$refs['sucDom'].open()
      } else {
        this.$refs['errDom'].open()
      }
    },
    sucSubmit (obj) {
      let d = {
        ...obj,
        // relationType: "01", // 00.商户 01.省总 02.地总 03，诊所
        // deptId: 415, // 组织机构ID
        // orgCode: "ty94qfEn", // 组织机构CODE
        // roleId: 2, // 角色待定
        status: "2" // 1.未通过，2.通过
      }
      this.goAudit(d)
    },
    errSubmit (desc) {
      // console.log('remarks:'+desc)
      this.goAudit({ remarks: desc, status: "1" })
    },
    goAudit (obj) {
      let d = { ...obj, shopId: this.id }
      auditCompanyEdit(d).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.$message.success('操作成功');
          this.goBack()
          // this.getInfo()
        } else {
          this.$message.warning(res.msg);
        }
      })
    },
    getInfo () {
      auditCompanyDetail(this.reqId).then(res => {
        // console.log(res)
        if (res.code === 0) {
          this.info = res.data
          this.id = res.data.id
          this.status = this.info.status
          this.$refs['infoBox'].getInfo(res.data)
          // this.info.status = auditTypes(this.info.status)
        }
      })
    },
    goBack () {
      // console.log('go back');
      this.$router.push('/audit/auditcenter-auditcompany')

      // this.$router.go(-1)：后退+刷新；
      // this.$router.go(0)：刷新；
      // this.$router.go(1) ：前进
      // this.$router.back():后退 ；
      // this.$router.back(0) 刷新；
      // this.$router.back(1)：前进
    }
  }
}
</script>
<style lang='scss' scoped>
.comContent {
  padding: 0px;
}
.header {
  height: 56px;
  line-height: 56px;
  padding: 0 24px;
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
