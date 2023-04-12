<!-- success -->
<template>
  <el-dialog title="审批通过"
             :visible.sync="dialogShow"
             width="600px">
    <div class="dia_content">
      <el-form ref="formTool"
               :model="formTool"
               label-width="100px"
               :label-position="'right'"
               :inline="false"
               style="text-align:left;">
        <el-form-item prop="radio"
                      v-if="formTool.radio != '03'"
                      label="用户角色">
          <el-select v-model="formTool.roleId"
                     placeholder="请选择用户角色"
                     size="mini">
            <el-option v-for="li in rolesData"
                       :key="li.value"
                       :label="li.label"
                       :value="li.value" />
          </el-select>
        </el-form-item>
        <el-form-item prop="radio"
                      label="商户类型">
          <el-radio-group v-model="formTool.radio">
            <el-radio v-for="(li,i) in radioData"
                      :key="i"
                      :label="li.value">{{ li.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="formTool.radio != '00'"
                      prop="radio"
                      label="选择关联组织">
          <el-cascader ref="selectDom"
                       v-model="formTool.select"
                       :props="{ checkStrictly: true }"
                       clearable
                       placeholder="请选择关联组织"
                       size="mini"
                       :options="selectData"
                       @change="selectChange" />
        </el-form-item>
        <el-form-item prop="remarks"
                      label="备注">
          <el-input v-model="formTool.remarks"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    placeholder="请输入驳备注"
                    size="small" />
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer"
          class="dia_footer">
      <el-button size="small"
                 @click="dialogShow = false">取消</el-button>
      <el-button type="primary"
                 size="small"
                 @click="goSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { deptTree } from '@/api/auditcenter'
import { getRolesList } from '@/api/user'
// import { deepClone } from '@/utils/index'
export default {
  data () {
    return {
      formTool: {
        roleId: '',
        select: null,
        radio: '',
        remarks: ''
      },
      dialogShow: false,
      radioData: [
        { label: '商户', value: '00' },
        { label: '省办', value: '01' },
        { label: '地办', value: '02' },
        { label: '诊所', value: '03' }
      ],
      rolesData: [],
      deptData: [],
      selectData: []
    }
  },
  mounted () {
    this.getRoles()
    this.getDeptTree()
  },
  // created() {
  //   this.getDeptTree()
  // },
  watch: {},
  methods: {
    getRoles () {
      getRolesList({}).then(res => {
        // console.log(res)
        const { code, data } = res
        if (code == 0) {
          this.rolesData = data.map(li => {
            return { label: li.roleName, value: li.roleId }
          })
        }
      })
    },
    getDeptTree () {
      deptTree().then(res => {
        // let new_d = deepClone(res.data)
        // new_d[0].id = 11111
        // console.log(new_d)
        // console.log(res.data)
        if (res.code === 0) {
          // this.info = res.data
          // this.deptData = this.treeReset(res.data)
          // this.selectData = deepClone(this.deptData)
          this.selectData = this.treeReset(res.data)
        }
      })
    },
    treeReset (arrData) {
      let t = this;
      return arrData.map(li => {
        let d = {
          label: li.orgName,
          value: li.orgId,
          code: li.orgCode
        }
        if (li.children && li.children.length > 0) {
          d.children = t.treeReset(li.children)
        }
        return d
      })
    },
    open () {
      this.dialogShow = true
      this.formTool = { roleId: '', select: null, radio: '' }
    },
    close () {
      this.dialogShow = false
    },
    selectChange (val) {
      let checkEl = this.$refs['selectDom'].getCheckedNodes()
      console.log(checkEl[0].data)
      console.log(val)
    },
    goSubmit () {
      const { radio, select, roleId, remarks } = this.formTool
      if (!roleId && radio != '03') { this.$message.error('请选择用户角色'); return }
      if (!radio) { this.$message.error('请选择部门类型'); return }
      let d = {}
      if (radio != '00') {
        if (!select || select.length == 0) { this.$message.error('请选择关联机构'); return }
        let checkEl = this.$refs['selectDom'].getCheckedNodes()[0].data
        console.log(checkEl)
        // relationType: "01", // 00.商户 01.省总 02.地总 03，诊所
        // deptId: 415, // 组织机构ID
        // orgCode: "ty94qfEn", // 组织机构CODE
        d.deptId = checkEl.value
        d.orgCode = checkEl.code
      }
      d.relationType = radio
      d.roleId = roleId
      d.remarks = remarks
      // console.log('d', d)
      // return;
      if (radio == '03') {
        d.roleId = ''
      }
      this.$emit('sure', d)
      setTimeout(() => {
        this.close()
      }, 300)
    }
  }
}
</script>
<style lang='scss' scoped>
.dia {
  &_content {
    display: block;
  }
  &_footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
