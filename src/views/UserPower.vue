<template>
<div class="user-box">
    <el-container>
        <el-header class="header">
            <div class="user-head flex-align">
                <img src="../assets/user-power.png">
                <span class="head-text">角色管理</span>
            </div>
        </el-header>
        <el-container class="container">
            <el-aside class="aside">
                <div class="aside-head">
                    <div class="head-add flex-align">
                        <img src="../assets/addUser.png">
                        新增角色
                    </div>
                    <div class="head-add flex-align">
                        <img src="../assets/addUsers.png">
                        新建分组
                    </div>
                </div>
                <div class="options">
                    <el-col>
                        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                            <el-submenu :index="group.id.toString()" v-for="(group) in RoleGrouplist" :key="group.id">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>{{group.groupName}}</span>
                                </template>
                                <el-menu-item :index="group.id+'-'+user.id" v-for="(user) in group.childrenArr" :key="user.id">{{user.roleName}}</el-menu-item>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </div>

            </el-aside>
            <el-main class="main">
                <el-tree :data="RoleGrouplist" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
                <power-use></power-use>
            </el-main>
        </el-container>
    </el-container>

    <!-- 
    <div>

    </div> -->
</div>
</template>

<script>
import {
    getRolelistApi,
    getRoleGrouplistApi
} from '@/api/api.js'
const cityOptions = ['上海', '北京', '广州', '深圳'];
import PowerUse from "@/components/PowerUse.vue"
export default {
    data() {
        return {
            activeName: 'second',

            checkAll: false,
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            isIndeterminate: true,
            Rolelist: [],
            RoleGrouplist: [],
            defaultProps: {
                children: 'childrenArr',
                label: 'name'
            }
        };
    },
    async created() {
        let [Rolelist, RoleGrouplist] = await Promise.all([getRolelistApi({
            pagination: false
        }), getRoleGrouplistApi({
            pagination: false
        })]);
        this.Rolelist = Rolelist.data.data.rows;
        this.RoleGrouplist = RoleGrouplist.data.data.rows;
        this.RoleGrouplist.forEach(item => {
            item.childrenArr = this.Rolelist.filter((e) => (e.groupId == item.id));
            console.log(item.childrenArr);
            item.childrenArr.forEach(i=>{
                i.name=i.roleName
            })
            item.name=item.groupName;
        });
        console.log(this.RoleGrouplist);
    },
    components: {
        'power-use': PowerUse
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },

        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style lang="scss" scoped>
.user-box {
    min-width: 1040px;
    padding: 0 35px;
    background-color: white;

    ::v-deep .header {
        height: 80px !important;
    }

    .header {
        box-sizing: border-box;
        border-bottom: 3px solid #ebeff1;
        // border: 1px solid red;

        .user-head {
            // padding: 25px 0;
            height: 100%;

            img {
                width: 30px;
                height: 30px;
                margin-right: 15px;
            }

            .head-text {
                color: #727f90;
                font-size: 22px;
                font-weight: 500;
            }
        }
    }

    .container {
        height: calc(100vh - 140px);

        ::v-deep .el-aside {
            overflow: visible;
        }

        .aside {
            box-sizing: border-box;
            border-right: 3px solid #ebeff1;

            // background-color: red;
            // width: 100px;
            .aside-head {
                display: flex;
                justify-content: space-around;

                .head-add {
                    padding: 20px 0;
                    color: #5996e0;
                    font-weight: bold;

                    img {
                        width: 25px;
                        height: 25px;
                    }
                }
            }

            .options {
                height: calc(100% - 65px);
                overflow: auto;
            }

            ::v-deep .el-menu {

                border: none;
            }
        }
    }

    .main {
        padding: 0;
        padding-left: 20px;

    }
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
