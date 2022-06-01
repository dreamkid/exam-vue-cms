<template>
<div class="home">
    <el-container>
        <el-header class="header flex-align">
            <div class="logo flex-align">
                <img src='../assets/menu.png' class="logo-icon mr-10">
                <span class="logo-text">现代学徒元平台</span>
            </div>
            <div class="state flex-align">
                <div>某某市 2020月-07-20 15:00 星期五 21~55℃ 晴 风力 112级 风向 无持续风向微风</div>
                <div class="flex-align">
                    <img class="icon mr-10" src='../assets/icon_avatar.png'>
                    <span>hi,{{avatarName}}</span>
                    <!-- <span v-if="loginStatus">hi,{{phone}}</span> -->
                    <!-- <span v-else>请登录</span> -->
                </div>
                <div class="close flex-align" @click="leave">
                    <img class="close-icon mr-10" src='../assets/close.png'>
                    <span>退出</span>
                </div>
            </div>
        </el-header>
        <el-container class="container">
            <el-aside width="200px" class="aside">

                <el-menu :default-active="select" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="rgb(11, 27, 52)" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <img class="icon-left1" src="../assets/study.png">
                            <span>题库管理</span>
                        </template>
                        <!-- <el-menu-item-group> -->
                            <el-menu-item index="1-1" @click="navigator('page')">题库管理</el-menu-item>
                            <el-menu-item index="1-2" @click="navigator('taskTest')">HTML题库</el-menu-item>
                            <el-menu-item index="1-3">CSS题库</el-menu-item>
                            <el-menu-item index="1-4" @click="navigator('js')">JS题库</el-menu-item>
                        <!-- </el-menu-item-group> -->
                    </el-submenu>
                    <el-menu-item index="2" @click="navigator('createTask')">
                        
                        <img class="icon-left4" src="../assets/text.png">
                        <span slot="title">创建任务</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="navigator('taskList')" >
                        <img class="icon-left2" src="../assets/talk.png">
                        <span slot="title" >任务列表</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="navigator('userList')">
                        <img class="icon-left3" src="../assets/class.png">
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                     <el-menu-item index="8" @click="navigator('addUser')">
                        <img class="icon-left3" src="../assets/class.png">
                        <span slot="title">角色权限</span>
                    </el-menu-item>
                     <el-menu-item index="9" @click="navigator('userPower')">
                        <img class="icon-left3" src="../assets/class.png">
                        <span slot="title">角色权限</span>
                    </el-menu-item>
                    <el-menu-item index="5" @click="navigator('task')">
                        <img class="icon-left3" src="../assets/class.png">
                        <span slot="title">聊天窗口</span>
                    </el-menu-item>
                    <el-submenu index="6">
                        <template slot="title">
                            <img class="icon-left1" src="../assets/study.png">
                            <span>账号设置</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="5-1" @click="navigator('userinfo')">个人资料</el-menu-item>
                            <el-menu-item index="5-2">修改头像</el-menu-item>
                            <el-menu-item index="5-3">修改密码</el-menu-item>
                            <el-menu-item index="5-4" @click="navigator('js')">账号绑定</el-menu-item>
                            <el-menu-item index="5-5" @click="navigator('js')">认证信息</el-menu-item>
                            <el-menu-item index="5-6" @click="navigator('js')">企业链接</el-menu-item>
                            <el-menu-item index="5-7" @click="navigator('js')">焦点图片</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <el-main>

                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {
    infoApi,
    logoutApi
} from '@/api/api.js'
export default {
    name: 'HomeView',
    data() {
        return {
            select: '1-1',
            phone: '',
            id: '',
            email: '',
            avatarName:''
        }
    },
    created() {
       
        infoApi().then(res => {
            if (res.data.status == 401) {
                this.$message({
                    type: 'warning',
                    message: '用户未登录',
                });
                this.navigator('login')
            } else if (res.data.status == 1) {

                this.phone = res.data.data.phone;
                this.id = res.data.data.id;
                localStorage.setItem('userId',this.id)
                this.email = res.data.data.email;
                this.avatarName = res.data.data.avatarName;

            }
        })

    },
    methods: {
        navigator(page) {
            if (this.$route.name == page) {
                return
            }
            this.$router.push({
                name: page,
            });

        },
        leave() {
            var params = {};
            logoutApi(params).then((res) => {
                console.log(res);
                if (res.data.status == 1) {
                    sessionStorage.removeItem('token');
                    this.$message({
                        type: "success",
                        message: res.data.msg
                    })
                    this.navigator('login');
                } else {
                    this.$message({
                        type: "warning",
                        message: res.data.msg
                    })
                }
            });
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

    }
}
</script>

<style lang="scss" scoped>
.home {
    min-width: 1000px;
    // min-height: 370px;

    .header {
        height: var(--header-height);
        background-image: linear-gradient(rgb(85, 155, 247), rgb(16, 96, 226));
        color: white;
        justify-content: space-between;
    }

    .state {
        font-size: 10px;
        gap: 0 40px;

    }
}

.el-main {
    padding: 0;
    background-color: #f7f7f7;
}

.logo {
    padding-left: 40px;

    .logo-icon {
        width: 25px;
        height: 25px;
    }

    .logo-text {
        font-size: 20px;
    }
}

.close-icon {
    height: 20px;
    width: 20px;
}

.container {
    height: calc(100vh - var(--header-height));
    // height: 50px;
    overflow-y: scroll;

}

::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.aside {
    background-color: rgb(11, 27, 52);

    .el-menu-vertical-demo {
        border: none;
    }

}

.icon-left1 {
    width: 25px;
    height: 25px;
    padding-right: 10px;
    padding-left: 10px;
}

.icon-left2 {
    width: 25px;
    height: 25px;
    padding-right: 10px;
    padding-left: 10px;
}

.icon-left3 {
    width: 35px;
    height: 30px;
    padding-right: 5px;
    padding-left: 5px;
}

.icon-left4 {
    width: 25px;
    height: 25px;
    padding-right: 10px;
    padding-left: 10px;
}

// .nav {
//     width: 200px;
// }

// .el-menu-vertical-demo {
//     height: calc(100vh - var(--header-height));
// }
</style>
