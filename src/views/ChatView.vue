<template>
  <div class="chat">
    <div class="main">
      <div class="left"></div>
      <div class="middle">
        <div class="middle-header">
          <div class="m-header-left">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <span>&nbsp;&nbsp;</span>
            <span>SYuH</span>
          </div>
          <div class="m-header-right">
            <div class="item"><i class="el-icon-user-solid"></i></div>
            <div class="item"><i class="el-icon-phone"></i></div>
            <div class="item"><i class="el-icon-s-platform"></i></div>
            <div class="item"><i class="el-icon-message-solid"></i></div>
          </div>
        </div>
        <div class="middle-content">
          <div v-for="(item, index) in textArr" :key="index">
            <span>
              {{ item.name }} <span v-if="item.name">:</span>
            </span>
            <span>
              {{ item.msg }}
            </span>
          </div>
        </div>

        <div class="send">
          <el-input placeholder="请输入内容" v-model="obj.msg">
            <template slot="append">
              <span @click="sendSocketMsg">
                <i class="el-icon-s-promotion">发送</i>
              </span>
            </template>
          </el-input>
        </div>
      </div>
      <div class="right">right</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textArr: [],
      obj: {
        name: "6666",
        msg: "",
      },
    };
  },
  sockets: {
    connect: function () {
      //建立连接后调用的函数
      console.log("socket connected...");
    },
    res: function (message) {
      console.log("服务的返回的信息", message);
      this.textArr.push(message);
    },
    disconnect: function () {
      console.log("disconnect!");
    },
  },
  methods: {
    sendSocketMsg() {
      //向服务端发送消息
      this.$socket.emit("server", this.obj);
      //接收服务端相对应的webdata数据
      this.obj.msg = null;
    },
  },
};
</script>

<style scoped lang="scss">
.chat {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(206, 152, 152);
  & .main {
    display: flex;
    justify-content: space-between;
    height: 80%;
    width: 75%;
    background: rgb(255, 255, 255);
    border: 1px solid rgb(210, 210, 208);
    & .left {
      height: 100&;
      width: 25%;
      background: rgb(166, 91, 192);
      border-right: 2px solid rgb(226, 224, 221);
    }
    & .middle {
      height: 100&;
      width: 60%;
      & .middle-header {
        display: flex;
        justify-content: space-between;
        height: 60px;
        border-bottom: 2px solid rgb(226, 224, 221);
        align-items: center;
        padding: 0 20px;
        & .m-header-left {
          display: flex;
          align-items: center;
        }
        & .m-header-right {
          display: flex;
          & .item {
            padding-left: 15px;
          }
          & .el-icon-message-solid {
            color: rgb(129, 9, 241);
          }
        }
      }
      & img {
        width: 45px;
        height: 45px;
      }

      & .middle-content {
        height: 80%;
        border-bottom: 2px solid rgb(226, 224, 221);
      }

      & .send{
          height: 10%;
      }
    }
    & .right {
      height: 100&;
      width: 15%;
      border-left: 2px solid rgb(226, 224, 221);
      background: rgb(248, 246, 246);
    }
  }
}

::v-deep .el-input__inner {
  height: 55.5px;
}
</style>