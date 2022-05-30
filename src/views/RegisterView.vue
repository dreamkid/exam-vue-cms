<template>
<div class="register flex-align flex-just">
    <div class="popup">
        <el-container class="container">
            <el-header class="header">
                <h3>用户注册</h3>
            </el-header>
            <el-main class="main box-shadow">
                <el-steps :active="active" finish-status="success" align-center>
                    <el-step title="填写信息"></el-step>
                    <el-step title="注册成功"></el-step>
                </el-steps>
                <template v-if="active==2">
                    <div class="flex-just flex-align mt-10">
                        登录成功,{{timeCount}}秒后跳转
                    </div>
                    <el-button class="regis mt-10" type="primary" @click="navigator('about')">立即跳转</el-button>
                </template>
                <template v-else>
                    <div class="flex-just flex-align mt-10">
                        <div class="flex-align star">*</div>
                        <el-input prefix-icon="el-icon-user" class="" v-model="username" placeholder="请输入用户名"></el-input>
                    </div>
                    <div class="flex-just flex-align mt-10">
                        <div class="flex-align star">*</div>
                        <el-input prefix-icon="el-icon-user" class="" v-model="name" placeholder="请输入姓名"></el-input>
                    </div>
                    <div class="flex-just flex-align mt-10">
                        <div class="flex-align star">*</div>
                        <el-input prefix-icon="el-icon-lock" class="" v-model="password" placeholder="请输入密码"></el-input>
                    </div>
                    <div class="flex-just flex-align mt-10">
                        <div class="flex-align star">*</div>
                        <el-input prefix-icon="el-icon-lock" class="" v-model="againPassword" placeholder="再次输入密码"></el-input>
                    </div>
                    <div class="flex-just flex-align mt-10">
                        <div class="flex-align star">*</div>
                        <el-input prefix-icon="el-icon-message" class="" v-model="email" placeholder="请输入邮箱"></el-input>
                    </div>
                    <div class="flex-just flex-align mt-10">
                        <div class="flex-align star">*</div>
                        <el-input prefix-icon="el-icon-mobile-phone" class="" v-model="phone" placeholder="请输入电话"></el-input>
                    </div>
                    <div class="flex-just flex-align mt-10">
                        <div class="flex-align star">*</div>
                        <div class="check flex-align">
                            <el-input placeholder="请输入验证码" v-model="captcha" maxlength="4"></el-input>
                            <!-- <img :src='captchaSrc' @click="getCaptcha"> -->
                            <captcha-com ref="captcha"></captcha-com>
                        </div>
                    </div>
                    <el-button class="regis mt-10" type="primary" @click="register">注册</el-button>
                </template>

            </el-main>

        </el-container>
    </div>
</div>
</template>

<script>
import {
    encrypt
} from '@/assets/utils';
import captchacom from '@/components/CaptchaCom.vue'
import {
    loginApi,
    registerApi,

} from '@/api/api.js'
export default {
    components: {
        'captcha-com': captchacom
    },
    data() {
        return {
            name:'',
            active: 1,
            username: '',
            password: '',
            againPassword: '',
            email: '',
            phone: '',
            captcha: '',
            captchaSrc: '/api/captcha',
            timeCount: 3,
            countDown: '',
            setInterval: ''
        };
    },
    created() {},
    methods: {
        navigator(page) {
            if (this.$route.name == page) {
                return
            }
            this.$router.push({
                name: page,
                query: {
                    name: this.username
                }
            });

        },
        getValideResult() {
            var res = {
                result: false
            }
            if (this.username == '') {
                res.message = {
                    type: 'warning',
                    message: '用户名不能为空',
                }
            }else if (this.name == '') {
                res.message = {
                    type: 'warning',
                    message: '真实姓名不能为空',
                }
            }  else if (this.password == '') {
                res.message = {
                    type: 'warning',
                    message: '用户密码不能为空',
                }
            } else if (this.againPassword != this.password) {
                res.message = {
                    type: 'warning',
                    message: '两次密码不一致',
                }
            } else if (this.mailbox == '') {
                res.message = {
                    type: 'warning',
                    message: '邮箱不能为空',
                }
            } else if (this.phone == '') {
                res.message = {
                    type: 'warning',
                    message: '手机号不能为空',
                }
            } else if (this.captcha == '') {
                res.message = {
                    type: 'warning',
                    message: '验证码不能为空',
                }
            }  else if (/(\W)/.test(this.username)) {
                res.message = {
                    type: 'warning',
                    message: '用户名中含有非法字符',
                }
            } else if (this.captcha.trim().length != 4) {
                res.message = {
                    type: 'warning',
                    message: '验证码输入不正确',
                }
            }
            if (res.message) {
                this.$message(res.message);
                this.$refs.captcha.getCaptcha()
            } else {
                res.result = true
            }
            return res.result
        },
        async register() {

            var isValide = this.getValideResult();

            if (!isValide) return;
            const {
                name,
                username,
                password,
                email,
                phone,
                captcha
            } = this;
            let res = await registerApi({
                name,
                username, //必填 用户名称
                password, //必填 用户密码
                email, //必填 用户邮箱
                phone, //必填 手机号码
                captcha, //必填 验证码
            })
            if (res.data.status !== 1) {
                this.$message({
                    type: 'warning',
                    message: res.data.msg,
                });
                this.$refs.captcha.getCaptcha()
                return
            }
            let loginResult = await loginApi({
                username, //必填 用户名称
                password: encrypt(password), //必填 用户密码
                captcha, //必填 验证码
            })
            sessionStorage.setItem('token', loginResult.data.data);
            this.$message({
                type: 'success',
                message: '注册成功',
            });
            this.active++;
            var _this = this;
            this.countDown = setInterval(function () {
                _this.timeCount--;
                if (_this.timeCount == 0) {
                    clearInterval(_this.countDown);

                    _this.navigator('page');
                }
            }, 1000)

        }
    },
    destroyed() {
        clearInterval(this.countDown)
    }
}
</script>

<style lang="scss" scoped>
.register {
    width: 100vw;
    height: 100vh;
    background-color: #f9f9fb;

    & .popup {

        width: 800px;
        min-width: 800px;
        // height: 600px;
        // border: 2px solid black;
        padding: 0 60px;
        box-sizing: border-box;
    }

    & .container {
        height: 100%;
        padding-bottom: 60px;
    }

    & .main {
        height: 100%;
        padding: 30px 20%;
        background-color: white;

        // border: 1px solid black;
        & .star {
            color: red;
            padding-right: 7px;
        }
    }
}

.check {
    display: grid;
    grid-template-columns: 3fr 2fr;

    gap: 0 15px;

}

.regis {
    width: 100%;
}
</style>
