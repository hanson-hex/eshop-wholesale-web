<template>
  <!-- 添加或修改菜单对话框 -->
  <el-dialog :title="!form.menuId ? '新增' : '编辑'" :visible.sync="visible">
    <el-form ref="dataForm" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item key="aa1" label="菜单类型" prop="type">
            <el-radio-group v-model="form.type" size="small">
              <el-radio-button label="0">菜单</el-radio-button>
              <el-radio-button label="1">按钮</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
        </el-col> -->
      </el-row>
      <el-form-item key="aa2" label="上级菜单">
        <!-- @change="paMenuChange" -->
        <el-cascader v-model="form.parentId" :props="{ checkStrictly: true }" :options="menuOptions" />
        <!-- <treeselect
          v-model="form.parentId"
          :options="menuOptions"
          :normalizer="normalizer"
          :show-count="true"
          placeholder="选择上级菜单"
        /> -->
      </el-form-item>
      <el-form-item v-if="form.type === '0'" key="aa3" label="图标" prop="icon">
        <!-- <span>{{ form.icon }}</span> -->
        <el-popover placement="bottom-start" width="750" trigger="click" @show="$refs['iconSelect'].reset()">
          <IconSelect ref="iconSelect" @selected="selected" />
          <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
            <svg-icon v-if="form.icon && !form.icon.includes('el-icon')" slot="prefix"
            :icon-class="form.icon" class="el-input__icon"
              style="height: 20px;width: 16px;margin-top:12px;margin-left: 4px;" />
              <!-- {{form.icon.includes('el-icon')}} -->
            <i v-if="form.icon && form.icon.includes('el-icon')" slot="prefix" :class="[form.icon, 'sub-el-icon', 'el-input__icon']" />
            <!-- <i v-if="form.icon" slot="prefix" class="el-icon-search el-input__icon" /> -->
            <i v-if="!form.icon" slot="prefix" class="el-icon-search el-input__icon" />
          </el-input>
        </el-popover>
        <!-- <avue-input-icon
          v-model="form.icon"
          :icon-list="iconList"
        /> -->
      </el-form-item>
      <el-form-item key="aa4" label="菜单名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item v-if="form.type !== '1'" key="aa5" label="路由地址" prop="path">
        <el-input v-model="form.path" placeholder="请输入路由地址" />
      </el-form-item>
      <el-form-item v-if="form.type === '1'" key="aa6" label="权限标识" prop="permission">
        <el-input v-model="form.permission" placeholder="请输入权限标识" maxlength="50" />
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item key="aa7" label="排序" prop="sortOrder">
            <el-input-number v-model="form.sortOrder" controls-position="right" :min="0" :step="1" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-if="form.type !== '1'" key="aa8" label="路由缓冲" prop="keepAlive">
            <el-radio-group v-model="form.keepAlive">
              <el-radio-button label="0">否</el-radio-button>
              <el-radio-button label="1">是</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item key="aa9" label="显示在菜单" prop="keepAlive">
            <el-radio-group v-model="form.showState">
              <el-radio-button label="0">显示</el-radio-button>
              <el-radio-button label="1">不显示</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dataFormSubmit">确 定</el-button>
      <el-button @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addObj, fetchMenuTree, getObj, putObj } from '@/api/system'
import IconSelect from "@/components/IconSelect";
// import Treeselect from '@riophae/vue-treeselect'
// import iconList from '@/const/iconList'
// import '@riophae/vue-treeselect/dist/vue-treeselect.css'

const CheckTrees = (d, my_rule) => {
  let new_trees = []
  for (let i = 0; i < d.length; i++) {
    // console.log(d[i].rules)
    const { label, id, children } = d[i]
    let d_li = { label, value: id }
    if (children && children.length > 0) {
      d_li.children = CheckTrees(children)
    }
    new_trees.push(d_li)
    // if (rules && rules.length > 0) {
    //   if (rules.includes(my_rule)) {
    //     let d_li = { name, path, hidden, component, meta }
    //     if (children && children.length > 0) {
    //       d_li.children = CheckRoles(children, my_rule)
    //     }
    //     new_trees.push(d_li)
    //   }
    // }
  }
  return new_trees
}

function indexOf(arr, id, index = []) {
  index = index.slice()
  for (let i of arr) {
    if (id === i.value) {
      index.push(i.value)
      return index
    } else if (i.children) {
      index.push(i.value)
      let ret = indexOf(i.children, id, index)
      if (ret) {
        return ret
      }
      index.pop()
    }
  }
}

export default {
  name: 'MenuForm',
  components: { IconSelect },
  // components: { Treeselect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 菜单树选项
      menuOptions: [],
      // 是否显示弹出层
      visible: false,
      // 图标
      // iconList: iconList,
      iconList: [],
      pId: null,
      form: {
        menuId: undefined,
        name: undefined,
        path: undefined,
        icon: '',
        permission: undefined,
        parentId: [-1],
        type: '0',
        keepAlive: '0',
        sortOrder: 999,
        showState: '0'
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' },
        ],
        sortOrder: [
          { required: true, message: '菜单顺序不能为空', trigger: 'blur' },
        ],
        path: [
          { required: true, message: '路由地址不能为空', trigger: 'blur' },
        ],
        keepAlive: [
          { required: true, message: '路由缓冲不能为空', trigger: 'blur' },
        ],
        permission: [
          { required: true, message: '权限标识不能为空', trigger: 'blur' },
        ],
      },
      isEdit: false,
    }
  },
  methods: {
    selected(name) {
      this.form.icon = name;
    },
    async init(isEdit, id) {
      // console.log(isEdit, id)
      this.isEdit = isEdit
      this.form = {
        menuId: undefined,
        name: undefined,
        path: undefined,
        icon: '',
        permission: undefined,
        parentId: [-1],
        type: '0',
        keepAlive: '0',
        sortOrder: 999,
        showState: '0'
      }
      if (id != null) {
        this.pId = id
      } else {
        this.pId = null
      }
      this.visible = true
      await this.getTreeselect()
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (isEdit) {
          getObj(id).then((res) => {
            const { menuId, name, path, icon, permission, type, keepAlive, sortOrder, showState } = res.data
            this.form = { ...this.form, menuId, name, path, icon, permission, type, keepAlive, sortOrder, showState }
          })
        } else {
          this.form.menuId = undefined
        }
      })
    },
    paMenuChange(val) {
      console.log(val)
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const { menuId, name, path, icon, permission, parentId, type, keepAlive, sortOrder, showState } = this.form;
          const data = { name, path, icon, permission, type, keepAlive, sortOrder, showState }

          if (parentId === undefined || parentId.length == 0) {
            data.parentId = -1
          } else {
            data.parentId = parentId[parentId.length - 1]
          }
          // if (this.form.parentId === undefined) {
          //   this.form.parentId = -1
          // }

          if (menuId) {
            data.menuId = menuId
            putObj(data).then(() => {
              this.$message.success('修改成功')
              this.visible = false
              this.$emit('refreshDataList')
            })
          } else {
            addObj(data).then(() => {
              this.$message.success('添加成功')
              this.visible = false
              this.$emit('refreshDataList')
            })
          }
        }
      })
    },
    /** 查询菜单下拉树结构 */
    getTreeselect() {
      fetchMenuTree().then((res) => {
        this.menuOptions = []
        const menu = { value: -1, label: '根菜单', children: [] }
        menu.children = CheckTrees(res.data)
        this.menuOptions.push(menu)
        if (this.pId) {
          let aa = indexOf(this.menuOptions, this.pId)
          // console.log(aa)
          if (this.isEdit) {
            aa.pop()
            console.log(aa)
            this.form.parentId = aa
          } else {
            this.form.parentId = aa
          }
        }
      })
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.id,
        label: node.name,
        children: node.children,
      }
    },
  },
}
</script>
