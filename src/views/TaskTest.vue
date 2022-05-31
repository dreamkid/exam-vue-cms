<template>
<div class="task-box">
    <div class="task-test">
        <div class="test-head">
            <div class="head-title">任务测试</div>
            <div class="head-button">
                <el-button plain>编辑描述</el-button>
                <el-button plain>上传附件</el-button>
                <el-button plain>关联代码仓库</el-button>
                <el-button plain>阻塞关系</el-button>
                <el-button plain>引用资源</el-button>
            </div>
        </div>
        <div class="test-body">
            <div class="body-text">123</div>
            <div class="body-title">活动日志</div>
            <div class="body-block">
                <div class="radio">
                    <el-radio-group v-model="reverse">
                        <el-radio :label="true">全部</el-radio>
                        <el-radio :label="true">只看日志111</el-radio>
                        <el-radio :label="true">只看评论111</el-radio>
                    </el-radio-group>
                </div>

                <el-timeline class="block-timeline" :reverse="reverse">

                    <el-timeline-item  v-if="userName">
                        <div class="item">
                            <span>
                                {{ userName }}&nbsp;发布了任务
                            </span>
                            <span class="tip">
                                {{dateCorrect(createdAt)}}
                            </span>
                        </div>
                    </el-timeline-item>
                    <el-timeline-item v-for="(user, index) in receivedData" :key="index">
                        <div class="item">
                            <span>
                                {{ user.userName }}&nbsp; 被作为执行人
                            </span>
                            <span class="tip">
                            </span>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
    <div class="task-sidebar">
        <div class="sidebar-item">
            <div class="item-box">
                <div class="item-title">项目</div>
                <div class="item-state">{{userName}}</div>
            </div>
            <div class="item-box">
                <div class="item-title">状态</div>
                <div class="item-state">未开始</div>
            </div>
            <div class="item-box">
                <div class="item-title">处理人</div>
                <div class="item-state">
                    <template v-for="(item,index) in detail.receivedData">
                    <span :key="index">{{item.userName}}<span v-if="index!=detail.receivedData.length-1">,</span></span>
                    
                    </template>
                </div>
            </div>
            <div class="item-box">
                <div class="item-title">所属需求</div>
                <div v-if="detail.desc" class="item-state">{{detail.desc}}</div>
                <div v-else class="item-state">未关联需求</div>
            </div>
            <div class="item-box">
                <div class="item-title">迭代</div>
                <div class="item-state">未规划进迭代</div>
            </div>
        </div>
        <div class="sidebar-item">
            <div class="item-box">
                <div class="item-title">
                    优先级
                    <span>*</span>
                </div>
                <div class="item-state">中</div>
            </div>
            <div class="item-box">
                <div class="item-title">截止日期</div>
                <div class="item-state">未指定</div>
            </div>
            <div class="item-box">
                <div class="item-title">标签</div>
                <div class="item-state">+</div>
            </div>
            <div class="item-box">
                <div class="item-title">腾讯会议</div>
                <div class="item-state">
                    <span>快速会议</span>
                    <span>预定会议</span>
                </div>
            </div>
        </div>
        <div class="item-title pt-20">盒子组 创建于{{dateCorrect(createdAt)}}</div>
        <div class="item-title pt-20">盒子组 创建于99年前</div>
        <div class="item-title pt-20">盒子组 创建于99年前</div>
    </div>
</div>
</template>

<script>
import {
    getTaskDetailApi
} from '@/api/api.js'
import dateCorrect from '@/assets/mixins/dateCorrect.js'
export default {
    mixins: [dateCorrect],
    data() {
        return {
            reverse: false,
            userName:'',
            createdAt: '',
            detail:{},
            activities: [{
                    content: "活动按期开始",
                    timestamp: "2018-04-15",
                },
                {
                    content: "通过审核",
                    timestamp: "2018-04-13",
                },
                {
                    content: "创建成功",
                    timestamp: "2018-04-11",
                },
            ],
            receivedData: [],
        };
    },
    async created() {
        console.log(this.$route.params.taskId);
        let res = await getTaskDetailApi({
            taskId: this.$route.params.taskId
        });
        console.log(res);
        if (res.data.status == 1) {
            this.receivedData = res.data.data.receivedData;
            this.createdAt = res.data.data.createdAt;
            this.userName = res.data.data.userName;
            this.detail=res.data.data
        } else {
            this.$message({
                type: 'warning',
                message: '查询失败'
            })
        }
    },
    methods: {

    }
};
</script>

<style lang="scss" scoped>
.task-box {
    height: calc(100vh - 60px);
    display: grid;
    grid-template-columns: 3fr 1fr;

    .task-test {
        padding: 0 20px;
overflow: auto;
        .test-head {
            border-bottom: 1px solid rgba(128, 128, 128, 0.124);

            .head-title {
                padding: 20px 0;
                font-size: 18px;
                font-weight: 700;
            }

            .head-button {
                padding: 10px 0;

                ::v-deep .el-button {
                    padding: 8px;
                }
            }
        }

        .test-body {
            .body-text {
                padding: 50px 0;
            }

            .body-title {
                padding: 10px 0;
                font-size: 18px;
                font-weight: 700;
            }

            .body-block {
                .radio {
                    padding: 20px 0;
                }

                .block-timeline {
                    padding: 10px;

                    & .item {
                        position: relative;
                        bottom: 1px;
                        display: flex;
                        align-items: center;

                        .tip {
                            padding: 0 10px;
                            color: gray;
                            font-size: 12px;
                        }
                    }
                }
            }
        }

        // background-color: gray;
    }

    .task-sidebar {
        overflow: auto;
        border-left: 1px solid rgba(128, 128, 128, 0.124);
        padding: 0 20px;

        .sidebar-item {
            padding: 20px 0;
            border-bottom: 1px solid rgba(128, 128, 128, 0.124);

            .item-box {
                padding-bottom: 10px;

                .item-title {
                    font-size: 14px;
                    color: #6c788a;
                }

                .item-state {
                    padding: 5px 0;
                }
            }
        }
    }
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
