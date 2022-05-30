<template>
<div class="about flex-align flex-just">
    <div class="login flex-align flex-just">
        <div class="logo flex-com">
            <div class="icon-logo box-shadow">H9</div>
            <div class="sub-title mt-20">mobideo</div>
            <div class="desc">DIGITIZING INDUSTRAL SERVICES</div>
        </div>
        <div class="form">
            <div class="">

                <div class="label">USERNAME</div>
                <el-input v-model="username" placeholder="请输入内容"></el-input>
            </div>
            <div class="">
                <div class="label">PASS WORD</div>
                <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
            </div>
            <div class="flex-just flex-align mt-5">
                <el-input placeholder="请输入验证码" v-model="captcha" maxlength="4"></el-input>
                <captcha-com ref="captcha"></captcha-com>
            </div>
            <div class="flex-align flex-between">
                <div class="retrievePassword">找回密码</div>
                <div class="register" @click="navigator('register')">注册账号</div>
            </div>
            <el-button class="login-button mt-5 mb-5" type="primary" @click="submit">LOG IN</el-button>
        </div>
    </div>
</div>
</template>

<script>
//npm install axios
//  第一个参数是接口名，第二个参数是服务端需要的数据，
import captchacom from '@/components/CaptchaCom.vue'
import {
    encrypt
} from '@/assets/utils';
import {
    loginApi,
} from '@/api/api.js';
export default {
    data() {
        return {
            username: '',
            password: '',
            captcha: '',
            captchaSrc: '/api/captcha',
        };
    },
    components: {
        'captcha-com': captchacom
    },
    mounted() {

        window.addEventListener('keydown', this.keyDown);

    },
    created() {

        // window.removeEventListener('keydown', this.keyDown)
    },
    destroyed() {

        window.removeEventListener('keydown', this.keyDown)
    },
    methods: {

        getValideResult() {
            var res = {
                result: false
            }
            if (this.username == '') {
                res.message = {
                    type: 'warning',
                    message: '用户名不能为空',
                }
            } else if (this.password == '') {
                res.message = {
                    type: 'warning',
                    message: '用户密码不能为空',
                }
            } else if (this.captcha == '') {
                res.message = {
                    type: 'warning',
                    message: '验证码不能为空',
                }
            } else if (this.username.trim().length > 15 || this.username.trim().length < 6) {
                res.message = {
                    type: 'warning',
                    message: '用户名不能超出6到15位',
                }
            } else if (/(\W)/.test(this.username)) {
                res.message = {
                    type: 'warning',
                    message: '用户名中含有非法字符',
                }
            } else if (this.password.trim().length > 15 || this.password.trim().length < 6) {
                res.message = {
                    type: 'warning',
                    message: '用户名不能超出6到15位',
                }
            } else if (this.captcha.trim().length != 4) {
                res.message = {
                    type: 'warning',
                    message: '验证码输入不正确',
                }
            }
            if (res.message) {
                this.$message(res.message);
                console.log(this.$refs.captcha);
                this.$refs.captcha.getCaptcha()
            } else {
                res.result = true
            }
            return res.result
        },
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
        keyDown(e) {
            console.log(999);
            if (e.code == 'Enter' || e.code == 'NumpadEnter') {
                this.submit();
            }
        },
        async submit() {
            var isValide = this.getValideResult();
            if (!isValide) return;
            const {
                username,
                password,
                captcha
            } = this;
            let res = await loginApi({
                username,
                password: encrypt(password),
                captcha,
            });
            if (res.data.status == 1) {
                this.$message({
                    type: 'success',
                    message: '登录成功',
                });
                // window.removeEventListener('keydown', this.keyDown)
                sessionStorage.setItem('token', res.data.data)
                this.navigator('page');
            } else {
                this.$message({
                    type: 'warning',
                    message: res.data.msg,
                });
                this.$refs.captcha.getCaptcha()
            }

        }
    },
}
</script>

<style lang="scss">
.about {
    height: 100vh;
    background-color: #ccdbea;

    & .login {
        display: grid;
        grid-template-columns: 2.5fr 3.1fr;
        gap: 0 10px;
        color: #0c80e7;

        & .logo {
            color: white;
            z-index: 99;
            height: 500px;
            background-color: #1e80e1;
            transform: skewX(-10deg)translateX(45px);

            & .icon-logo {
                padding: 20px;
                font-size: 60px;
                box-sizing: border-box;
                transform: skewX(10deg);
            }

            & .sub-title {
                font-size: 40px;
            }

            & .desc {
                font-size: 12px;
            }
        }

        & .form {
            width: 300px;
            font-size: 12px;
            padding: 10px 80px 10px 100px;
            min-height: 50%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            background-color: #ffffff;

            & .label {
                padding: 5px 0;
            }
        }
    }

}
</style>
