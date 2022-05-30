<template>
<div>

    <!-- <el-main> -->
    <div class="main-head">所有者</div>
    <div class="main-body">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色成员" name="first">角色成员</el-tab-pane>
            <el-tab-pane label="功能权限" name="second">
                <div class="flex-between flex-align">
                    <div>设置角色对应的功能操作、应用管理、后台管理权限</div>
                    <div>
                        <el-checkbox>全选</el-checkbox>
                    </div>
                </div>
                <div class="power-grid">
                    <div class="rows">
                        <div class="columns1">
                            <el-checkbox v-model="checked">消息</el-checkbox>
                        </div>
                        <div class="columns flex-even">
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">消息应用设置</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">创建公开群组</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">创建私有群组</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">管理公开群组</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">群组企业公告中发送消息</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">群组中删除消息</el-checkbox>
                            </div>

                        </div>
                    </div>
                    <div class="rows">
                        <div class="columns1">
                            <el-checkbox v-model="checked">项目</el-checkbox>
                        </div>
                        <div class="columns flex-even">
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">消息应用设置</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">创建公开群组</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">创建私有群组</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">管理公开群组</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">群组企业公告中发送消息</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">群组中删除消息</el-checkbox>
                            </div>

                        </div>
                    </div>
                    <div class="rows">
                        <div class="columns1">
                            <el-checkbox v-model="checked">日历</el-checkbox>
                        </div>
                        <div class="columns flex-even">
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">消息应用设置</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">创建公开群组</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">创建私有群组</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">管理公开群组</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">群组企业公告中发送消息</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">群组中删除消息</el-checkbox>
                            </div>

                        </div>
                    </div>
                    <div class="rows">
                        <div class="columns1">
                            <el-checkbox v-model="checked">网盘</el-checkbox>
                        </div>
                        <div class="columns flex-even">
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">消息应用设置</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">创建公开群组</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">创建私有群组</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">管理公开群组</el-checkbox>
                                <el-checkbox v-model="checked" class="checkbox">群组企业公告中发送消息</el-checkbox>
                            </div>
                            <div>
                                <el-checkbox v-model="checked" class="checkbox">群组中删除消息</el-checkbox>
                            </div>

                        </div>
                    </div>
                </div>

            </el-tab-pane>
            <el-tab-pane label="数据范围" name="third">数据范围</el-tab-pane>
        </el-tabs>
    </div>
</div>
<!-- </el-main> -->
<!-- </div> -->
</template>
<script>
export default {
    data(){
        return{
            checked:false,
            activeName:'second'

        }
    },
    methods:{

        handleClick(tab, event) {
            console.log(tab, event);
        },
    }
}
</script>
<style lang="scss" scoped>
.main-head {
    padding: 20px 0;
    font-size: 20px;
    color: #727f90;
}

.main-body {
    ::v-deep .el-tabs__item {
        // padding: 0 20px;
    }

    ::v-deep .el-tabs__content {
        padding-left: 20px;
    }

    .power-grid {
        margin-top: 30px;
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr;

        .rows {
            display: grid;
            grid-template-columns: 1fr 6fr;

            .columns1 {
                padding: 70px 50px;
                padding-left: 20px;
                box-sizing: border-box;
                background-color: #0dedf8;
            }

            .columns {
                .checkbox {
                    margin-left: 10px;
                    margin-right: 50px;
                }
            }
        }
    }

}
</style>
