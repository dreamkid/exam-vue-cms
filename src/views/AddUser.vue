<template>
<div class="user-box">
    <div class="box-head">新增角色权限</div>
    <div class="box-body">
        <div class="user-name flex-align">
            <div class="name flex-align">
                <span class="start">*</span>
                <div class="">角色名称</div>
                <el-input v-model="input" placeholder="请输入新增用户名称"></el-input>
            </div>
            <div class="flex-align">
                <span class="start">*</span>
                <span>所属部门</span>
                <el-select class="ml-15" v-model="value" placeholder="请选择">
                    <el-option v-for="item in groupList" :key="item.id" :label="item.groupName" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <div class="ml-20">
                 <el-button type="primary">确认新增</el-button>
            </div>
        </div>
        <div class="all mtb-20">选择所有权限</div>
        <div class="user-power">
            <power-use></power-use>
        </div>
    </div>
</div>
</template>

<script>
import {
    getRoleGrouplistApi,
    // createRoleApi
} from "@/api/api.js";
import PowerUse from "@/components/PowerUse.vue"
export default {
    data() {
        return {
            input: '',
            groupList: [],
            value: ''

        }
    },
    async created() {
        let res = await getRoleGrouplistApi({
            pagination: false
        });
        if (res.data.status == 1) {

            this.groupList = res.data.data.rows
        }
    },
    methods: {

    },
    components: {
        'power-use': PowerUse
    }
}
</script>

<style lang="scss" scoped>
.user-box {
    
    padding: 0 20px;

    .box-head {
        padding: 20px 0;
        color: #727f90;
        font-size: 22px;
        font-weight: 500;
    }

    .box-body {
        background-color: white;
        padding: 0 20px;

        .user-name {
            padding: 20px 0;
            border-bottom: 2px solid #ebeff1;

            .start {
                color: red;
                padding-right: 2px;

            }

            .name {
                ::v-deep .el-input {
                    width: 200px;
                    // padding: 0 20px;
                    margin-left: 10px;
                    margin-right: 30px;
                }
            }
        }
    }

}

::v-deep .el-popper {
    min-width: 200px;
    // background-color: red !important;
}
</style>
