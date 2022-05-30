<template>
<div class="list-box">
    <div class="list-head">
        <div class="head-title">任务列表</div>
        <div class="flex-align flex-center head-input">
            <div class="flex-align block first-input">
                <span class="mr-5">任务名称 :</span>
                <el-input class="block" v-model="taskName" placeholder="请输入内容"></el-input>
            </div>
            <div class="flex-align ">
                <span class="mr-5">创建时间 :</span>
                <el-date-picker class="block" v-model="taskTime" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            </div>
            <div class="flex-align block">

                <span class="mr-5">任务执行人 :</span>
                <el-select class="block" v-model="searchUser" placeholder="请选择">
                    <el-option v-for="item in searchOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="flex-align">
                <el-button type="primary" @click="searchTask()">搜索</el-button>
                <el-button type="">清空</el-button>
            </div>
        </div>
    </div>
    <div class="table">
        <el-table size="small" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="100" align="center"></el-table-column>
            <el-table-column prop="id" label="任务ID" width align="center"></el-table-column>
            <el-table-column prop="taskName" label="任务名称" width show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="userName" label="创建者" width align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="level" label="紧急程度" width align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-link :type="scope.row.level==1?'danger':'primary'" :underline="false">{{ scope.row.level==1?'紧急':'普通' }}</el-link>
                    <!-- <el-button :type="scope.row.level==1?'danger':'primary'" round size="mini">{{ scope.row.level==1?'紧急':'普通' }}</el-button> -->
                </template>
            </el-table-column>
            <el-table-column prop="desc" label="任务描述" align="center" width="100" show-overflow-tooltip></el-table-column>
            <el-table-column label="任务领取状态" align="center" show-overflow-tooltip width>
                <template slot-scope="scope">
                    <el-tag :type="scope.row.isReceived==1?'danger':'primary'" :underline="false">{{ scope.row.isReceived==1?'已领取':'未领取' }}</el-tag>
                    <!-- <el-button :type="scope.row.isReceived==1?'danger':'primary'" round size="mini">{{ scope.row.isReceived==1?'已领取':'未领取' }}</el-button> -->
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" show-overflow-tooltip width="300">
                <template slot-scope="scope">
                    <!-- <el-link class="link" type="primary">编辑任务</el-link> -->
                    <el-link class="link" type="primary">
                        <span @click="getTaskInfo(scope.row.id)">发布任务</span>
                    </el-link>
                    <el-link class="link" type="primary" v-if="scope.row.isReceived!=1" @click="openReceive(scope.row.id)">领取任务</el-link>
                    <el-link class="link" @click="checkTask(scope.row.id)" type="primary">任务详情</el-link>
                </template>
            </el-table-column>
        </el-table>
        <div v-if="dataTotal" class="mt-10 bottom" style="padding:0">
            <el-pagination background layout="sizes, prev, pager, next,total" :total="dataTotal" :page-size="pageSize" :page-sizes="[5,10,15,20,30,50]" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <!-- <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination> -->

        <el-dialog class="releaseBox" center title="发布任务" :visible.sync="dialogFormVisible">
            <el-select v-model="implementUser" filterable multiple placeholder="请选择">
                <el-option v-for="item in userOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="uploadTask">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</div>
</template>

<script>
import {
    getTaskListApi,
    replaseTaskApi,
    getTaskDetailApi,
    queryUserlistApi,
} from "@/api/api.js";
export default {
    data() {
        return {
            taskName: '',
            taskTime: '',
            taskId: "",
            pickerOptions: '',
            searchOptions: [],
            searchUser: [],
            userOptions: [],
            allUser: [],
            repeatData: [],
            implementUser: [],
            pageSize: 10,
            pageNum: 1,
            pageCount: 0,
            tableData: [],
            multipleSelection: [],
            dataTotal: 0,
            drawer: false,

            dialogFormVisible: false,
            form: {
                name: "",
                type: [],
                resource: "",
                desc: "",
            },
        };
    },
    async created() {
        let res = await getTaskListApi();
        if (res.data.status == 1) {
            console.log(res.data);
            this.tableData = res.data.data.rows;
            this.dataTotal = res.data.data.count;
            this.pageCount = res.data.data.pageCount;
        }
        let userRes = await queryUserlistApi({
            pagination: false,
        });
        if (userRes.data.status == 1) {
            this.allUser = userRes.data.data.data.rows;
        }
    },

    methods: {
        async searchTask() {
            let res = await getTaskListApi({
                taskName: this.taskName
            })
            if (res.data.status == 1) {
                console.log(res);

                this.tableData = res.data.data.rows;
                this.dataTotal = res.data.data.count;
                this.pageCount = res.data.data.pageCount;
            }
        },
        checkTask(taskId) {
            this.$router.push({
                name: 'taskTest',
                params: {
                    taskId: taskId
                }
            })
        },
        async getTaskList() {
            let params = {};
            params.pageSize = this.pageSize;
            params.pageNum = this.pageNum;
            let res = await getTaskListApi(params);
            if (res.data.status == 1) {
                this.tableData = res.data.data.rows;
                this.dataTotal = res.data.data.count;
                this.pageCount = res.data.data.pageCount;
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.getTaskList();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageNum = val;
            this.getTaskList();
        },
        async receive(taskId) {
            var userId = [localStorage.getItem("userId")];

            let res = await replaseTaskApi({
                userId,
                taskId,
            });
            if (res.data.status == 1) {
                this.$message({
                    type: "success",
                    message: "领取成功!",
                });

                this.getTaskList();
            }
        },
        async getTaskInfo(taskId) {
            this.implementUser = [];
            this.taskId = taskId;
            this.dialogFormVisible = true;
            let res = await getTaskDetailApi({
                taskId,
            });
            if (res.data.status == 1) {
                this.repeatData = res.data.data.receivedData;
                let arr = [];

                this.allUser.forEach((item) => {
                    if (!this.repeatData.find((i) => i.userId == item.id)) {
                        arr.push(item);
                    }
                });

                this.userOptions = arr;
            }
        },
        async uploadTask() {
            // console.log(this.implementUser);
            var params = {};
            params.taskId = this.taskId;
            params.userId = this.implementUser;
            let res = await replaseTaskApi(params);

            console.log(res);
            if (res.data.status == 1) {
                this.$message({
                    type: "success",
                    message: "发布成功!",
                });
                // this.implementUser=[]
                this.getTaskList();
                this.dialogFormVisible = false;
            } else {
                this.$message({
                    type: "warning",
                    message: "发布失败",
                });
            }
        },
        openReceive(taskId) {
            this.$confirm("是否领取任务?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    this.receive(taskId);
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消领取",
                    });
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.list-box {
    padding: 20px;

    .list-head {
        margin-bottom: 20px;
        background-color: white;
        box-sizing: border-box;

        .head-title {
            font-size: 16px;
            font-weight: 700;
            padding: 15px 10px;
        }

        .head-input {
            padding: 20px 10px;

            font-size: 14px;

            .first-input {
                ::v-deep .el-input {
                    width: 170px;
                }
            }

            .block {
                margin-right: 15px;
            }
        }
    }

    .table {
        // ::v-deep .cell {
        //     padding: 20px;
        // }

        .link {
            padding: 0 10px;
            font-size: 12px;
        }

        .releaseBox {
            ::v-deep .el-dialog {
                // margin: 0!important;
                margin-top: 25vh !important;
                // display: flex;
                // justify-content: center;
                // align-items: center;
            }

            ::v-deep .el-dialog__body {
                text-align: center;
            }
        }
    }
}
</style>
