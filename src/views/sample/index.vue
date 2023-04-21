<template>
  <div class="app-container">
    样例页面
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="基础组件样式" name="first">
        <div>
          <div>
            <span>img使用svg<img class="test-img-svg" :src="ICON_Test_Svg" alt="" /></span>
            <span>
              svgicon组件使用svg
              <svg-icon class="custom-fill-svg" :icon-class="'404'" />
            </span>
          </div>
          <span>elementplus常用组件样式处理案例</span>
          <div>
            <div>
              <el-button id="idPopStyle" type="primary" @click="onClicked">主要按钮</el-button
              ><el-button id="idPopDialog" type="primary" :icon="Edit" @click="onClicked">主要按钮2 弹窗dialog</el-button>
              <el-button plain>边框按钮</el-button><el-button plain :icon="Edit">边框按钮</el-button>
              <el-button plain size="small">小边框按钮</el-button>
              <el-button plain class="is-dash">边框虚线按钮</el-button>
              <el-button type="danger">危险按钮</el-button>
              <el-button type="warning">警告按钮</el-button>
              <el-button plain disabled>禁用按钮</el-button>
            </div>
          </div>
          <div class="v-gap">
            <el-dropdown>
              <el-button type="primary">
                主要下拉菜单<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                  <el-dropdown-item>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown class="h-gap">
              <el-button type="primary" size="small">
                small下拉菜单<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                  <el-dropdown-item>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-dropdown class="h-gap">
              <el-button type="plain">
                边框下拉菜单<el-icon class="el-icon--right"><arrow-down /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                  <el-dropdown-item>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="v-gap">
            <span>下拉选项</span>
            <el-select v-model="selectOb.value" placeholder="请选择" class="h-gap">
              <el-option v-for="item in selectOb.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="selectOb.value" placeholder="请选择" class="h-gap" disabled>
              <el-option v-for="item in selectOb.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="v-gap" style="display: flex">
            <span>输入框</span>
            <div class="h-gap"><el-input v-model="inputObj" placeholder="请输入" clearable /></div>
            <div class="h-gap"><el-input v-model="inputObj" placeholder="请输入" disabled /></div>
          </div>
          <div class="v-gap">
            <span>日期选择</span>
            <div class="h-gap" style="display: inline-block"><el-date-picker v-model="datePickerObj" type="date" placeholder="请选择" /></div>
            <div class="h-gap" style="display: inline-block">
              <el-date-picker v-model="datePicker2Obj" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
            </div>
            <div class="h-gap" style="display: inline-block">
              <el-time-select v-model="timeSelectObj" placeholder="请选择" />
            </div>
            <div class="h-gap" style="display: inline-block">
              <el-time-picker v-model="timePickerObj" placeholder="请选择" />
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="表格样式" name="second">
        <div>
          <span>表格样式如下</span><br />
          <el-table :data="tableData" style="width: 100%" height="150">
            <el-table-column fixed prop="date" label="Date" width="150" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="state" label="状态" width="120">
              <template #default="scope">
                <el-switch v-model="scope.row.state" active-text="是" inactive-text="否" inline-prompt />
              </template>
            </el-table-column>
            <el-table-column prop="city" label="City" width="320" />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="zip" label="Zip" width="120" />
            <el-table-column label="操作" width="188">
              <div class="tab-op-col">
                <el-button text type="primary">添加</el-button>
                <el-button text type="primary">删除</el-button>
                <el-button text type="primary">查看详情</el-button>
              </div>
            </el-table-column>
          </el-table>
          <div class="v-gap"></div>
          <el-pagination
            v-model:current-page="pagination.currentPage"
            v-model:page-size="pagination.pageSize"
            :page-sizes="pagination.pageSizes"
            layout="total, prev, pager, next,sizes, jumper"
            :total="400"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="其它" name="third">暂无</el-tab-pane>
      <el-tab-pane label="Task" name="fourth" disabled>暂无</el-tab-pane>
    </el-tabs>
    <el-dialog v-model="dlgBaseInfo.visiable" title="测试dialog">
      <div>dialog内容</div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import ICON_Test_Svg from '@/assets/icons/svg/404.svg';
import { ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Share, Upload } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';

const dlgBaseInfo = reactive({ title: '测试', width: '60%', visiable: false, showFoot: true });

interface ITable {
  date: string;
  name?: string;
  state?: boolean;
  city?: string;
  address?: string;
  zip?: string;
}

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
});

const tableData = ref(<ITable[]>[]);

for (let i = 1; i <= 100; i++) {
  tableData.value.push({
    date: '2016-05-0' + i,
    name: 'Tom',
    state: i % 2 == 0 ? true : false,
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  });
}

const activeName = ref('first');

const selectOb = ref({
  value: '',
  options: [
    { value: 'v1', label: '选项一' },
    { value: 'v2', label: '选项二' },
    { value: 'v3', label: '选项三' },
  ],
});
const inputObj = ref('');
const datePickerObj = ref(new Date());
const datePicker2Obj = ref(null);
const timeSelectObj = ref(null);
const timePickerObj = ref(null);

const onClicked = (e: any) => {
  switch (e.currentTarget.id) {
    case 'idPopStyle':
      {
        openModelDlg();
      }
      break;
    case 'idPopDialog':
      {
        dlgBaseInfo.visiable = true;
      }
      break;
  }
};
const openModelDlg = () => {
  ElMessageBox.confirm('确定删除这条信息', '标题', {
    type: 'warning',
    customClass: 'with-split-line',
  });
};
</script>

<style lang="scss" scoped>
.app-container {
  .test-img-svg {
    width: 40px;
    height: 40px;
    fill: #f00;
  }
  .custom-fill-svg {
    width: 30px;
    height: 30px;
    fill: #f00;
  }
  .v-gap {
    margin-top: 12px;
  }
  .h-gap {
    margin-left: 8px;
  }

  .date-range-separator-icon {
    width: 16px;
    height: 16px;
  }
}
</style>
