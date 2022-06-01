<template>
<el-wrap>
<!-- <div class="info"> -->
    <div class="box">
        <div class="header">创建任务</div>
        <div class="body">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item class="task-name p-15-30" label="任务名称">
                    <el-input placeholder="请输入任务名称" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item class="task-time p-15-30 " label="任务时长">
                    <!-- <div class="flex-align"> -->
                    <el-input maxlength="5" v-model="form.duration" placeholder=""></el-input>
                    <span class="hour">小时</span>
                    <!-- </div> -->
                </el-form-item>
                <el-form-item class="p-15-30 text-area" label="任务描述">
                    <el-input :rows="4" type="textarea" placeholder="请输入任务描述" v-model="form.desc" show-word-limit maxlength="80"></el-input>
                </el-form-item>
                <el-form-item class="p-15-30" label="执行人">
                    <el-select v-model="userArray" filterable multiple placeholder="请选择">
                        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="p-15-30" label="是否紧急">
                    <el-switch v-model="form.level">
                    </el-switch>
                </el-form-item>

                <el-form-item class="p-15-30">
                    <el-button type="primary" @click="createTask">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
<!-- </div> -->
</el-wrap>
</template>

<script>
import {
    queryUserlistApi,
    createTaskApi,
    replaseTaskApi
} from "@/api/api.js"
export default {
    // components: {
    //     Wrap
    // },
    data() {
        return {
            options: [],
            value: [],
            v: [],
            userArray: [],
            value2: true,
            input: '',
            form: {
                name: '',
                duration: 0,
                desc: '',
                level: false
            },
            taskId: ''
        }
    },
    async created() {
        let params = {};
        params.pagination = false;
        let res = await queryUserlistApi(params);
        if (res.data.status == 1) {
            this.options = res.data.data.data.rows
        }
    },
    methods: {
        open() {
            this.$confirm('是否需要跳转到任务列表', '即将跳转', {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '确认跳转',
                    cancelButtonText: '不需要跳转'
                })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '已经跳转'
                    });
                    this.$router.push({
                        name: 'taskList',
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消跳转'
                    })
                });
        },
        getValideResult() {
            var res = {
                result: false
            }
            if (!this.form.name) {
                res.message = {
                    type: 'warning',
                    message: '任务名未填写',
                }
            } else if (!this.form.duration && this.form.duration == '0') {
                res.message = {
                    type: 'warning',
                    message: '任务时间未填写',
                }
            } else if (typeof (Number(this.form.duration)) != 'number' || (this.form.duration.includes('.') && this.form.duration.split[1].length > 1)) {
                // console.log(this);

                res.message = {
                    type: 'warning',
                    message: '任务时间最多为1为小数',
                }
            } else if (!this.form.desc) {
                res.message = {
                    type: 'warning',
                    message: '任务描述未填写',
                }
            }
            // else if (!this.userArray) {
            //     res.message = {
            //         type: 'warning',
            //         message: '执行人未填写',
            //     }
            // }

            if (res.message) {
                this.$message(res.message);
            } else {
                res.result = true
            }
            return res.result
        },
        async createTask() {
            if (!this.getValideResult()) return
            let params = this.form;
            params.level = params.level ? 1 : 0;
            let task = {};
            let res = await createTaskApi(params);
            if (res.data.status == 1) {
                this.$message({
                    type: 'success',
                    message: '创建成功'
                })
            } else {
                this.$message({
                    type: 'warning',
                    message: '创建失败'
                })
            }
            task.userId = this.userArray;
            task.taskId = res.data.data[0].id;
            if (this.userArray[0]) {
                let release = await replaseTaskApi(task);
                if (release.data.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '发布成功'
                    })
                    this.form = {
                        name: '',
                        duration: 0,
                        desc: '',
                        level: false
                    }
                    this.userArray = []
                    this.open()
                } else {
                    this.$message({
                        type: 'warning',
                        message: '发布失败'
                    })
                }

            } else {
                this.form = {
                    name: '',
                    duration: 0,
                    desc: '',
                    level: false
                }
                this.userArray = []
                this.open()
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.info {
    padding: 20px;
}

.box {
    background-color: white;
height: 100%;
    & .header {
        padding: 20px 30px;
        font-weight: 700;
        border-bottom: 1px solid #f7f7f7;
    }

    & .body {
        padding: 15px 0;

        .task-name {
            width: 400px;
        }

        .text-area {
            ::v-deep .el-textarea {
                width: 400px;
            }
        }

        .task-time {

            // width: 150px;
            // margin-right: 4px;
            ::v-deep .el-input {
                display: inline;
            }

            ::v-deep .el-input__inner {
                width: 70px;
            }

            .hour {
                // width: 50px;
                margin-left: 8px;
            }
        }

        .nickname {
            padding: 20px 30px;
        }

        .sex {
            padding: 0 30px;
            margin: 0;
        }

        ::v-deep .el-form-item__label {
            padding-right: 20px;
        }

    }
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
