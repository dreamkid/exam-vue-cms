import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import PageView from '../views/PageView.vue'
import JsView from '../views/JsView.vue'
import AjaxView from '../views/AjaxView.vue'
import UserInfo from '../views/UserInfo.vue'
import TaskView from '../views/TaskView.vue'
import ChatView from '../views/ChatView.vue'
import CreateTask from '../views/CreateTask.vue'
import TaskList from '../views/TaskList.vue'
import UserList from '../views/UserList.vue'
import UserPower from '../views/UserPower.vue'
import AddUser from '../views/AddUser.vue'
import TaskTest from '../views/TaskTest.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: LoginView
    }, {
        path: '/register',
        name: 'register',
        component: RegisterView
    }, {
        path: '/ajax',
        name: 'ajax',
        component: AjaxView
    },
    {
        path: '/chat',
        name: 'chat',
        component: ChatView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue'),

        children: [{
            path: '/page',
            name: 'page',
            component: PageView
        }, {
            path: '/js',
            name: 'js',
            component: JsView
        }, {
            path: '/userinfo',
            name: 'userinfo',
            component: UserInfo
        }, {
            path: '/task',
            name: 'task',
            component: TaskView
        }, {
            path: '/createTask',
            name: 'createTask',
            component: CreateTask
        }, {
            path: '/taskList',
            name: 'taskList',
            component: TaskList
        }, {
            path: 'userList',
            name: 'userList',
            component: UserList
        }, {
            path: 'userPower',
            name: 'userPower',
            component: UserPower
        }, {
            path: 'addUser',
            name: 'addUser',
            component: AddUser
        }, {
            path: 'taskTest',
            name: 'taskTest',
            component: TaskTest
        }]
    },

]

const router = new VueRouter({
    routes
})

export default router