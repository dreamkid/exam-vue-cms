<template>
<div class="block">
    <div class="aside">
        <div class="calendar">
            <el-calendar class="calendar-box" v-model="value"></el-calendar>
        </div>
        <div class="task">
            <div class="task-head flex-between">

                <span class="task-title">Today Task (3)</span>
                <span class="task-add el-icon-plus"></span>
            </div>
            <div class="task-body flex-align">
                <div class="flex-between task-text">
                    <div class="flex-align">
                        <input style="" type="checkbox">
                        <span class="">
                            Working on Asla
                        </span>
                    </div>
                    <span class="task-time">
                        08:00 - 10.00Am
                    </span>
                </div>
                <div class="flex-between task-text">
                    <div class="flex-align">
                        <input style="" type="checkbox">
                        <span class="">
                            Working on Asla
                        </span>
                    </div>
                    <span class="task-time">
                        08:00 - 10.00Am
                    </span>
                </div>
                <div class="flex-between task-text">
                    <div class="flex-align">
                        <input style="" type="checkbox">
                        <span class="">
                            Working on Asla
                        </span>
                    </div>
                    <span class="task-time">
                        08:00 - 10.00Am
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="chat">
        <!-- <div class="chat-head"> -->
        <div class="head-top flex-between flex-align">
            <span class="chat-title">Notification</span>
            <span class="chat-tip">View all</span>
        </div>
        <div class="chat-write">
            <div class="write-icon">
                <span class="el-icon-edit-outline"></span>
            </div>
            <div class="write-tip">
                <div class="">Emily Just sent you task to assign</div>
                <div class="tip-time ptb-5">18 Aug 2020 - 10.00 Am</div>
                <el-button type="warning">Assign Now</el-button>
            </div>
        </div>

        <div class="chat-box">
            <div class="team-chat flex-between flex-align">
                <div class="flex-around flex-align">
                    <span class="team-title">Team Chat</span>
                    <div class="flex-align">
                        <img class="team-img" src="../assets/icon_avatar.png">
                        <img class="team-img" src="../assets/icon_avatar.png">
                        <img class="team-img" src="../assets/icon_avatar.png">
                        <span class="team-num">{{personNum}}+</span>
                    </div>

                </div>
                <div>
                    <el-button type="primary"><i class="el-icon-user peo-img"></i>Invite People</el-button>
                </div>
            </div>

            <div class="talk" ref="talk">
                <div style="" ref="chatrecord" class="talk-box">
                    <template v-for="(item, index) in textArr">
                        <div ref="talkchat" class="talk-people my-talk" :key="index" v-if="typeof(item)=='object'&&item.avatarName==obj.avatarName">
                            <div class="head-portrait ">
                                {{ item.avatarName.substr(0,1) }}
                            </div>
                            <div class="user">
                                <div class="user-name my-name">{{item.avatarName}}</div>
                                <div class="user-msg my-msg">{{item.msg}}</div>
                                <div class="mychat-time">{{dateDiffer(item.date)}}</div>
                            </div>
                        </div>
                        <div ref="talkchat" class="talk-people" :key="index" v-if="typeof(item)=='object'&&item.avatarName!=obj.avatarName">
                            <div class="head-portrait ">
                                {{ item.avatarName.substr(0,1) }}
                            </div>


                            
                            <div class="user">
                                <div class="user-name">{{item.avatarName}}</div>
                                <div class="user-msg">{{item.msg}}</div>
                                <div class="chat-time">{{dateDiffer(item.date)}}</div>
                            </div>
                        </div>
                    </template>
                </div>

            </div>
            <el-input v-model="msg" class="bottom-input" placeholder="请输入内容">
                <el-button slot="append" icon="el-icon-position" @click="sendSocketMsg">发送</el-button>
            </el-input>
        </div>

    </div>
</div>
</template>

<script>
import {
    infoApi
} from '@/api/api.js'

// import dateDiffer from '@/assets/mixins/dateDiffer.js'
export default {
    // mixins: [dateDiffer],
    data() {
        return {
            textArr: [],
            obj: {
                type: 1,
                userId: '',
                avatarName: "",
                msg: "",
            },
            msg: '',
            checked: true,
            radio: 3,
            a: true,
            b: false,
            value: new Date(),
            personNum: 0
        };
    },
    watch: {
        msg() {
            console.log(this.textArr);
        }
    },
    async created() {
        window.addEventListener('keydown', this.keyDown);
        let res = await infoApi();
        if (res.data.status == 1) {
            this.obj.userId = res.data.data[0].id;
            this.obj.avatarName = res.data.data[0].avatarName;
        }
        let params = {};
        params.userId = this.obj.userId;
        params.avatarName = this.obj.avatarName;
        this.$socket.emit('addUser', params)
    },
    mounted() {},
    destroyed() {
        console.log('销毁');
        console.log(this.keyDown);
        window.removeEventListener('keydown', this.keyDown, false);
        let params = {};
        params.userId = this.obj.userId;
        params.avatarName = this.obj.avatarName;
        this.$socket.emit('removeUser', params)
    },

    sockets: {
        userCount: function (personNum) {
            console.log(personNum);
            this.personNum = personNum;
        },
        connect: function () {
            //建立连接后调用的函数
            console.log("socket connected...");

        },
        receiveMsg: function (message) {
            console.log("服务的返回的信息", message);
            this.textArr.push(message);

            this.$nextTick(() => {
                var talk = this.$refs.talkchat;
                talk[talk.length - 1].scrollIntoView(false)
            })
        },
        disconnect: function () {
            console.log("disconnect!");
        },
    },
    methods: {
        dateDiffer(value) {
            var date1 = new Date(value)
            // return new Date()
         var date2 = new Date()

            var date3 = date2.getTime() - date1.getTime()

            var subMintutes = Math.floor(date3 / (60 * 1000))

            var subHours = Math.floor(date3 / (60 * 60 * 1000))

            var days = Math.floor(date3 / (24 * 3600 * 1000))

            if (days >= 1) {
                return days + '天前'
            } else if (subHours >= 1) {
                return subHours + '小时前'
            } else if (subMintutes >= 1) {
                return subMintutes + '分钟前'
            } else {
                return '刚刚'
            }
        },
        getInputResult() {
            if (!this.msg || !this.msg.trim()) {
                this.$message({
                    type: 'warning',
                    message: '请输入内容',
                })
                return false  
            } else {
                return true
            }
        },
        keyDown(e) {
            if (e.code == 'Enter' || e.code == 'NumpadEnter') {
                this.sendSocketMsg();
            }
        },
        sendSocketMsg() {
            // console.log(document.querySelector('.talk').scrollTop);
            if (this.getInputResult()) {
                //向服务端发送消息
                this.obj.msg = this.msg;
                this.$socket.emit("sendMsg", this.obj);
                //接收服务端相对应的webdata数据
                this.obj.msg = null;
                this.msg = '';
            }

        },
    }
};
</script>

<style lang="scss" scoped>
.block {
    background-color: #12b7f5;
    height: 100%;
    min-height: 370px;
    min-width: 815px;
    box-sizing: border-box;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;

    & .aside {
        display: grid;
        grid-template-rows: 2fr 1fr;
        overflow: scroll;

        .calendar {
            box-sizing: border-box;
            background-color: white;

            ::v-deep .el-calendar-day {
                height: calc(30px + 1vh);
            }
        }

        .task {
            box-sizing: border-box;
            background-color: white;
            padding: 0 10px;
            padding-bottom: 10px;
            display: grid;
            grid-template-rows: 1fr 4fr;

            .task-head {
                box-sizing: border-box;
                padding: 5px 0;

                .task-title {
                    font-size: 18px;
                    font-weight: 700;
                }

                .task-add {
                    font-size: 25px;
                }
            }

            .task-body {
                box-sizing: border-box;
                margin-top: 15px;
                // height: calc(100% - 50px);
                padding: 10px 20px;
                background-color: #e8e8f1;
                border-radius: 5px;
                display: grid;
                grid-template-rows: 1fr 1fr 1fr;

                input[type=checkbox] {
                    margin: 0;
                    margin-right: 15px;
                    background-color: red;
                    -ms-transform: scale(2);
                    /* IE */
                    -moz-transform: scale(2);
                    /* FireFox */
                    -webkit-transform: scale(2);
                    /* Safari and Chrome */
                    -o-transform: scale(2);
                    /* Opera */
                }

                .task-text {
                    padding: 10px 0;
                    font-size: 14px;
                    color: gray;

                    .task-time {
                        font-size: 12px;
                        color: #8888ba;
                        font-weight: 700;
                    }
                }
            }
        }
    }

    .chat {

        display: grid;
        grid-auto-rows: 50px 100px auto;
        background-color: white;
        padding: 0 6px;

        .head-top {
            padding: 15px 0;

            .chat-title {
                font-size: 20px;
                font-weight: 700;
            }

            .chat-tip {
                color: #ffcb7f;
            }
        }

        .chat-write {
            border-radius: 10px;
            color: white;
            display: flex;
            padding: 10px 10px;
            background: url("../assets/yuan.jpg") no-repeat;
            background-color: #58419c;
            background-position: right bottom;
            background-size: 15%;

            .write-icon {
                width: 35px;
                height: 35px;
                display: flex;
                justify-content: center;
                align-items: center;
                // padding: 4px;
                border-radius: 5px;
                background-color: #7763ba;
                font-size: 28px;

                .el-icon-edit-outline {}
            }

            .write-tip {
                margin-left: 20px;

                ::v-deep .el-button {
                    background-color: #ffc97f;
                    border-color: #ffc97f;
                }

                .tip-time {
                    font-size: 12px;
                    color: #a591d0;
                }
            }

        }

        .chat-box {
            background-color: white;
            display: grid;
            position: relative;
            grid-template-rows: 70px auto 40px;
            padding-bottom: 10px;
            margin-bottom: 10px;

            .team-chat {
                background-color: white;

                ::v-deep .el-button {
                    background-color: #59409e;
                    border-color: #59409e;
                    padding: 10px;
                }

                .peo-img {
                    font-size: 18px;
                    padding: 0 5px;
                }

                .team-title {
                    font-size: 20px;
                    font-weight: 700;
                    padding-right: 10px;
                }

                .team-img {
                    width: 30px;
                    height: 30px;
                    vertical-align: middle;
                }

                .team-num {
                    font-size: 14px;
                }
            }

            .talk {
                position: relative;
                background-color: #e6e6f4;
                border-radius: 10px;
                box-sizing: border-box;
                // height: calc(100% - 40px);
                overflow: hidden;

                .talk-box {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    overflow: scroll;

                    .my-talk {
                        flex-direction: row-reverse;
                    }

                    .talk-people {
                        display: flex;
                        padding: 2px 0;
                        margin: 8px;

                        .head-portrait {
                            width: 40px;
                            height: 40px;
                            display: flex;
                            box-sizing: border-box;
                            border-radius: 50%;
                            justify-content: center;
                            align-items: center;
                            color: white;
                            background-color: #59409e;
                        }

                        .user {
                            margin: 0 6px;
                            display: flex;
                            flex-direction: column;

                            .user-name {
                                font-size: 13px;

                            }

                            .my-name {
                                text-align: right;
                            }

                            .user-msg {
                                display: inline-block;
                                margin: 2px 0;
                                margin-right: auto;
                                min-height: 20.8px;
                                min-width: 9.39px;
                                max-width: 200px;
                                background-color: white;
                                padding: 8px;
                                border-radius: 10px;
                                word-break: break-all;
                            }

                            .my-msg {
                                margin-right: 0;
                                margin-left: auto;
                                background-color: #eeedfb;
                            }

                            .chat-time {
                                font-size: 4px;
                                color: gray;
                                text-align: left;
                            }

                            .mychat-time {
                                font-size: 4px;
                                color: gray;
                                text-align: right;
                            }
                        }

                    }
                }

            }

            .bottom-input {
                height: 40px;
                position: absolute;
                bottom: 0;
            }
        }

    }
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
