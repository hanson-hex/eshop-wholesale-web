<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div> -->
    首页
    <div>
      <el-button v-hasPermi="perma" type="primary" icon="el-icon-plus">新增</el-button>
      <el-button v-hasPermi="permb" type="primary" icon="el-icon-plus">编辑</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfo } from '/src/api/user'
// import { auditCompanyList } from '@/api/auditcenter'

export default {
  name: 'Dashboard',
  data () {
    return {
      perma: ['system:config:add'],
      permb: ['system:config:edit']
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  
  created() {
    // this.getList()
  },
  mounted() {

  },
  methods: {
    getList() {
      getUserInfo({}).then(res => {
        console.log('info', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
