import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入element-ui组件
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementUI)
//引入elementUI 引入完毕

//引入axios
import axios from 'axios'
// axios.defaults.baseURL="https://lab.isaaclin.cn/nCoV/api";
Vue.prototype.axios = axios
//引入完毕

//轻量的处理时间和日期的javascript库
import dayjs from 'dayjs';
Vue.prototype.dayjs = dayjs;
//引入完成

//引入vxe-table表格组件
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
Vue.use(VXETable)
//引入完成


//引入导航组件,并且注册为全剧组件
import Header from './components/Header.vue'
Vue.component('el-header',Header);
import ceshi from './echarts/ceshi.vue'
Vue.component('el-ceshi',ceshi)
//引入导航组件,并且注册为全剧组件

// 引入qs
import qs from 'qs';
Vue.prototype.qs = qs;
// 引入qs完毕

//百度echarts
// import echarts from 'vue-echarts';
// Vue.component('v-chart', echarts)
// import echarts from 'echarts';
// Vue.prototype.echarts = echarts;
//百度echarts

//引入可视化组件库 DataV
import DataV from '@jiaminghi/data-view'
Vue.use(DataV);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
