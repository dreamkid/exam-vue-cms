import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import './common.scss'
import VueSocketIO from 'vue-socket.io'

import GlobalComponent from '@/components/main.js'
Vue.use(GlobalComponent)

Vue.use(ElementUI)
    // import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

//将App页面渲染并扔到app元素中
//#app 指的是public下面的index.html
new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app') //mount:挂载


Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://192.168.0.120:7001', //这个地址是服务端地址
    // connection: 'http://8.131.89.181:7001',
}))