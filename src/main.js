import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import qs from 'qs';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import store from './vuex/store'

var instance = axios.create({
    baseURL: 'http://localhost:3000'
});

Vue.use(ElementUI);
Vue.prototype.$axios = instance;
Vue.prototype.$qs = qs;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
