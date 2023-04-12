<!--  -->
<template>
  <div class="classification">
    <div class="header">
      定价区域
    </div>
    <div class="content">
      <div class="top">
        <div class="imgBox">
          <div class="">
            <img :src="headData.image"
                 alt=""
                 style="width: 80px;height:80px">
          </div>
          <div style="padidng-left:20px"
               class="fontBox">
            <span class="spanFont jiaolang">{{ headData.goodsName }}</span>
            <span class="spanFont">{{ headData.approvalNumber }}</span>
            <span class="spanFont company">{{ headData.factory }}</span>
          </div>
        </div>
      </div>
      <el-divider />
      <div class="center">
        <el-form ref="formName"
                 :model="studentData">
          <el-table :data="studentData.tableData"
                    :span-method="objectSpanMethod"
                    border
                    style="width: 100%"
                    align="left">
            <el-table-column prop="regionName"
                             label="定价区域"
                             align="left">
              <template slot-scope="scope">
                <span style="margin-right:20px">{{ scope.row.regionName }} </span>
                <el-link v-if="addType == 'true'"
                         type="primary"
                         :underline="false"
                         @click="click(scope.row,scope.$index)">定义</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="agencyTypeName"
                             label="机构类型"
                             align="left" />
            <el-table-column prop="retailPrice"
                             label="零售价（元）"
                             :rules="rules.retailPrice"
                             align="right">
              <template slot-scope="scope">
                <el-form-item size="small"
                              :prop="'tableData.' + scope.$index + '.retailPrice'"
                              :rules="rules.retailPrice">
                  <el-input-number v-model="scope.row.retailPrice"
                                   controls-position="right"
                                   :min="0" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="wholesalePrice"
                             label="批发价（元）"
                             :rules="rules.wholesalePrice"
                             align="right">
              <template slot-scope="scope">
                <el-form-item size="small"
                              :prop="'tableData.' + scope.$index + '.wholesalePrice'"
                              :rules="rules.wholesalePrice">
                  <el-input-number v-model="scope.row.wholesalePrice"
                                   controls-position="right"
                                   :min="0" />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="wholesaleMinAmount"
                             :rules="rules.wholesaleMinAmount"
                             label="起订量"
                             align="right">
              <template slot-scope="scope">
                <el-form-item size="small"
                              :prop="'tableData.' + scope.$index + '.wholesaleMinAmount'"
                              :rules="rules.wholesaleMinAmount">
                  <el-input-number v-model="scope.row.wholesaleMinAmount"
                                   controls-position="right"
                                   :min="0" />
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div v-if="addType == 'true'"
           class="addGoods"
           @click="add()">
        <span class="addFont">
          +
        </span>
        <span style="font-size:14px;color:#595959">
          新增定价区域
        </span>
      </div>
      <div class="bottom">
        <!-- <el-button v-if="addType == 'true'" size="small" type="primary" icon="el-icon-plus" @click="add()">新增定价区域</el-button> -->
        <el-button size="small"
                   type="primary"
                   @click="submitDetail(1)">保存定价区域</el-button>
      </div>
    </div>

    <el-dialog title="新增区域"
               :visible.sync="dialogVisible"
               width="30%"
               :before-close="handleClose">
      <el-form ref="formTool"
               :model="formTool"
               :inline="true"
               style="text-align:left;">
        <el-form-item prop="name"
                      label="区域名称：">
          <el-input v-model="formTool.name"
                    placeholder="请输入区域"
                    clearable
                    size="small" />
        </el-form-item>
      </el-form>
      <div style="max-height:300px;overflow:auto">
        <el-tree ref="tree"
                 show-checkbox
                 node-key="id"
                 highlight-current
                 class="filter-tree"
                 :data="data"
                 :props="defaultProps"
                 default-expand-all
                 :filter-node-method="filterNode"
                 @check="check" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button size="small"
                   @click="dialogVisible = false">取消</el-button>
        <el-button type="primary"
                   size="small"
                   @click="submit">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getgoodsregionpricerelation, editgoodsregionpricerelation, addgoodsregionpricerelation, provincetree, regionids } from '@/api/platformproductManage/pricingmanagement'
export default {
  components: {},
  data () {
    return {
      index: '',
      checkedNodes: [], // 选中的节点
      dialogVisible: false,
      addType: 'false',
      goodsRegionId: '',
      headData: {
        image: '',
        approvalNumber: '',
        factory: '',
        goodsName: ''
      },
      formTool: {
        name: ''
      },
      rules: {
        retailPrice: [
          {
            required: true,
            message: '请输入零售价',
            trigger: ['blur']
          }
        ],
        wholesalePrice: [
          {
            required: true,
            message: '请输入批发价',
            trigger: ['blur']
          }
        ],
        wholesaleMinAmount: [
          {
            required: true,
            message: '请输入起订量',
            trigger: ['blur']
          }
        ]
      },
      studentData: {
        tableData: []
      },
      // tableData: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {},
  watch: {
    'formTool.name' (val) {
      this.$refs.tree.filter(val)
    },
    dialogVisible (newVal, oldVal) {
      if (newVal == true) {
        this.reset()
      }
    }
  },
  created () {
    this.addType = this.$route.query.addType
    this.goodsRegionId = this.$route.query.goodsRegionId
    this.headData.image = this.$route.query.image
    this.headData.goodsName = this.$route.query.goodsName
    this.headData.approvalNumber = this.$route.query.approvalNumber
    this.headData.factory = this.$route.query.factory
    if (this.addType == 'false') {
      this.getgoodsregionpricerelation()
    } else {
      this.provincetree()
    }
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
  methods: {
    // 清除复选框状态
    reset () {
      this.data.forEach(ele => { // 把已选中的复选框清除
        this.$nextTick(() => {
          // this.$refs.tree.setChecked(ele.id, false, true)
        })
      })
    },
    // 复选框选中按钮
    check (data, item) {
      console.log(item)
      console.log(data)
    },
    // 提交
    submit () {
      if (this.$refs.tree.getCheckedNodes().length > 0) {
        var regionNameArr = []
        var orgCodeArr = []
        this.$refs.tree.getCheckedNodes().forEach(item => {
          regionNameArr.push(item.label)
          orgCodeArr.push(item.id)
        })
        this.dialogVisible = false
        this.data.forEach(item => {
          if (orgCodeArr.indexOf(item.id) > -1) {
            this.$set(item, 'disabled', true)
          }
        })
        this.studentData.tableData[this.index].regionName = regionNameArr.join()
        this.studentData.tableData[this.index + 1].regionName = regionNameArr.join()
        this.studentData.tableData[this.index + 2].regionName = regionNameArr.join()
        this.studentData.tableData[this.index].orgCode = orgCodeArr.join()
        this.studentData.tableData[this.index + 1].orgCode = orgCodeArr.join()
        this.studentData.tableData[this.index + 2].orgCode = orgCodeArr.join()
      } else {
        this.$message.warning('请先选择地区')
      }
    },
    // 过滤节点
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 合并列
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    // 点击定义
    click (row, index) {
      this.index = index
      this.dialogVisible = true
      if (row.orgCode) {
        let arr = row.orgCode.split(',')
        this.data.forEach(item => {
          if (arr.indexOf(item.id) > -1) {
            this.$set(item, 'disabled', false)
            this.$nextTick(() => {
              this.$refs.tree.setCheckedKeys(item.id, true)
            })
          }
        })
      } else {
        let arrCode = []
        let arr = []
        this.studentData.tableData.forEach(el => {
          if (el.orgCode) {
            arrCode = el.orgCode.split(',')
            arrCode.forEach(item => {
              if (arr.indexOf(item) == -1) {
                arr.push(item)
              }
            })
          }
        })
        this.data.forEach(item => {
          this.$refs.tree.setChecked(item.id, false, true)
          if (arr.indexOf(item.id) > -1) {
            this.$nextTick(() => {
              this.$set(item, 'disabled', true)
            })
          }
        })
      }
    },
    // 新增
    add () {
      this.studentData.tableData.push(
        {
          regionName: '',
          orgCode: '',
          agencyTypeName: '地办',
          retailPrice: '0',
          wholesalePrice: '0',
          wholesaleMinAmount: 0
        },
        {
          regionName: '',
          orgCode: '',
          agencyTypeName: '省办',
          retailPrice: '0',
          wholesalePrice: '0',
          wholesaleMinAmount: 0
        },
        {
          regionName: '',
          orgCode: '',
          agencyTypeName: '药企',
          retailPrice: '0',
          wholesalePrice: '0',
          wholesaleMinAmount: 0
        }
      )
    },
    // 关闭弹窗
    handleClose (done) {
      this.dialogVisible = false
    },
    // 查询详情
    getgoodsregionpricerelation () {
      getgoodsregionpricerelation(this.goodsRegionId).then(res => {
        if (res.code == 0) {
          this.studentData.tableData = res.data
          if (res.data.length > 0) {
            this.headData = res.data[0]
          }
        }
      })
    },
    // 编辑商品区域定价(保存)
    submitDetail () {
      this.$refs['formName'].validate((valid) => {
        if (valid) {
          if (this.studentData.tableData.length > 0) {
            if (this.addType == 'true') {
              let params = {
                goodsId: this.goodsRegionId,
                regions: []
              }
              this.studentData.tableData.forEach((item, index) => {
                if ((index + 3) % 3 == 0) {
                  const obj1 = {
                    agencyType: '1',
                    agencyTypeName: this.studentData.tableData[index].agencyTypeName,
                    retailPrice: this.studentData.tableData[index].retailPrice,
                    wholesalePrice: this.studentData.tableData[index].wholesalePrice,
                    wholesaleMinAmount: this.studentData.tableData[index].wholesaleMinAmount
                  }
                  const obj2 = {
                    agencyType: '2',
                    agencyTypeName: this.studentData.tableData[index + 1].agencyTypeName,
                    retailPrice: this.studentData.tableData[index + 1].retailPrice,
                    wholesalePrice: this.studentData.tableData[index + 1].wholesalePrice,
                    wholesaleMinAmount: this.studentData.tableData[index + 1].wholesaleMinAmount
                  }
                  const obj3 = {
                    agencyType: '3',
                    agencyTypeName: this.studentData.tableData[index + 2].agencyTypeName,
                    retailPrice: this.studentData.tableData[index + 2].retailPrice,
                    wholesalePrice: this.studentData.tableData[index + 2].wholesalePrice,
                    wholesaleMinAmount: this.studentData.tableData[index + 2].wholesaleMinAmount
                  }
                  this.$set(item, 'children', [obj1, obj2, obj3])
                  var arr = []
                  const orgCodeArr = item.orgCode.split(',')
                  orgCodeArr.forEach((el, i) => {
                    const obj = {
                      regionId: el,
                      regionName: (item.regionName.split(','))[i],
                      priceDetaileds: item.children
                    }
                    params.regions.push(obj)
                  })
                }
              })
              addgoodsregionpricerelation(params).then(res => {
                if (res.code == 0) {
                  this.$message.success('新增成功')
                  this.$router.push('/platformproductManage/commodityreference-pricingmanagement-pricingmanagement')
                }
              })
            } else {
              let params = {
                id: this.goodsRegionId,
                priceDetaileds: [
                ]
              }
              this.studentData.tableData.forEach(item => {
                const obj = {
                  priceDetaileId: item.priceDetaileId,
                  retailPrice: item.retailPrice,
                  wholesalePrice: item.wholesalePrice,
                  wholesaleMinAmount: item.wholesaleMinAmount
                }
                params.priceDetaileds.push(obj)
              })
              editgoodsregionpricerelation(params).then(res => {
                if (res.code == 0) {
                  this.$message.success('保存成功')
                  this.$router.push('/platformproductManage/commodityreference-pricingmanagement-pricingmanagement')
                }
              })
            }
          } else {
            this.$message.warning('请先新增定价区域')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 获取省组织列表
    provincetree () {
      provincetree().then(res => {
        if (res.code == 0) {
          if (res.data && res.data.length > 0) {
            this.data = []
            res.data.forEach(item => {
              const obj = {
                id: item.orgCode,
                label: item.orgName
              }
              this.data.push(obj)
            })
            this.regionids()
          }
        }
      })
    },
    // 查询禁用区域定价组织ID集合
    regionids () {
      regionids(this.goodsRegionId).then(res => {
        if (res.code == 0) {
          if (res.data.length > 0) {
            this.data.forEach(item => {
              if (res.data.indexOf(item.id) > -1) {
                this.$set(item, 'disabled', true)
              }
            })
          }
        }
      })
    }
  }

}
</script>
<style lang='scss' scoped>
.addGoods {
  width: 100%;
  height: 40px;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 10px;
  .addFont {
    border: 1px dashed #d9d9d9;
    display: flex;
    width: 18px;
    font-size: 16px;
    justify-content: center;
    margin-right: 5px;
  }
}
.classification {
  padding: 0px;
  .header {
    height: 56px;
    line-height: 56px;
    padding: 0 24px;
    font-size: 16px;
    font-family: PingFang SC, PingFang SC-Medium;
    font-weight: 700;
    text-align: left;
    color: #262626;
    border-bottom: 1px solid #f2f2f2;
  }
  .content {
    margin: 0 24px;
    margin-bottom: 24px;
    height: calc(100% - 80px);
  }
  .top {
    padding-top: 24px;
    padding-bottom: 0px;
    // height: calc(100% - 90px);
    .imgBox {
      display: flex;
      align-items: center;
      .fontBox {
        padding-left: 7px;
        .spanFont {
          color: #595959;
          font-size: 14px;
          display: block;
          text-align: left;
        }
        .jiaolang {
          font-size: 16px;
          color: #262626;
          padding-bottom: 4px;
        }
        .company {
          color: #8c8c8c;
          font-size: 14px;
          padding-top: 4px;
        }
      }
    }
  }
  .center {
    height: calc(100% - 235px);
    overflow: auto;
    ::v-deep.cell {
      .el-form-item {
        max-width: 130px;
        margin: 0 auto 18px auto;
      }
      .el-input {
        max-width: 150px;
        ::v-deep .el-input__inner {
          text-align: center;
        }
      }
    }
    ::v-deep .el-table tbody tr:hover > td {
      background-color: transparent !important;
    }
  }
  .bottom {
    padding-top: 20px;
  }
}
.el-table::before {
  height: 1px;
}
</style>
