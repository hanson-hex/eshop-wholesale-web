import { createApp } from 'vue';

// import ElementPlus from 'element-plus';
// import locale from 'element-plus/lib/locale/lang/zh-cn'; // 中文语言
//import 'element-plus/dist/index.css';

/**按需加载并且全局引入variables.scss 变量,弹窗样式会丢失，在这里引用,暂时没找到其它方法 */
import 'element-plus/theme-chalk/base.css';
import 'element-plus/theme-chalk/el-button.css';
import 'element-plus/theme-chalk/el-message-box.css';
import 'element-plus/theme-chalk/el-overlay.css';
import 'element-plus/theme-chalk/el-message.css';
import '@/assets/styles/index.scss'; // global css
import '@/assets/styles/tailwind.css';

import App from './App.vue';
import store from './store';
import router from './router';

// svg图标
import 'virtual:svg-icons-register';
import SvgIcon from '@/components/SvgIcon/index.vue';
import elementIcons from '@/components/SvgIcon/svgicon';

import './permission';

const app = createApp(App);

// 全局组件挂载
app.use(router);
app.use(store);
app.use(elementIcons);
app.component('SvgIcon', SvgIcon);

// 使用element-plus 并且设置全局的大小
// app.use(ElementPlus, {
//   locale: locale,
//   // 支持 large、default、small
//   //size: Cookies.get('size') || 'default',
// });

app.mount('#app');
