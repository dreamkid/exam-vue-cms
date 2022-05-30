<template>
<div class="ajax"></div>
</template>

<script>
export default ({
    created() {
        var params = {
            username: 'xiaoming',
            password: 999999,
            captcha: 8888
        };
        // var xhr = new XMLHttpRequest();
        // xhr.open('POST', '/api/user/login',true);
        // xhr.onload = function () {
        //     if (xhr.status == 200) {
        //         console.log(xhr.responseText);
        //     }
        // }
        // xhr.send(JSON.stringify(params) )
        //-------------------------------------
        function ajax({
            type,
            url,
            params = {},
            success
        }) {
            var xhr = new XMLHttpRequest();
            xhr.open(type, url, true);
            xhr.onload = function () {
                if (xhr.status == 200) {
                    // console.log(xhr.responseText);
                    success(xhr.responseText)
                }
            }
            xhr.send(JSON.stringify(params))
        }

        // ajax({
        //     type: 'POST',
        //     url: '/api/user/login',
        //     params,
        //     success(res) {
        //         console.log('----回调----');
        //         console.log(res);
        //     }
        // });
        //----------------------------------------

        function myAxios(url, params) {
            return new Promise(function (resolve) {
                ajax({
                    type: 'POST',
                    url,
                    params,
                    success(res) {
                        console.log('----回调----');
                        resolve(res);
                    }
                });
            })
        }

        // myAxios('/api/user/login', params).then(res => {
        //     console.log(res);
        //     return myAxios('/api/user/login', params)
        // }).then(res => {
        //     console.log(res);
        // })
        //----------------------------------------------
        class Axios {
            constructor() {

            }
            post(url, params) {
                return myAxios(url, params);
            }
        }

        var axios = new Axios();
        axios.post('/api/user/login', params).then(res => {
            console.log(res);
        })
        //---------------------------------------------------
        setTimeout(function () {
            console.log(1);
        }, 2000);
        setTimeout(function () {
            console.log(2);
        }, 1000);

        class Mypromise {
            constructor(fun) {
                this.callback = fun;
                this.resolveBack=null;
                this.rejectBack=null;
                setTimeout(()=>{
                    this.callback(this.resolve.bind(this),this.reject.bind(this));
                })
            }
            resolve(params) {
            this.resolveBack(params)
            }
            reject(params) {
            this.rejectBack(params)
            }
            then(callback) {
                this.resolveBack=callback
            }
            catch(callback) {
                this.rejectBack=callback
            }
        }
        new Mypromise(function (resolve,reject) {
            // if(a){
            // reject('false');
            resolve('true');
            var a=Math.random();
            if(a==9){
            reject('false');
            }
            // }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
        async function fn1() {
            await console.log(1)
            console.log(2)
            await fn2()
            console.log(3)
        }
        async function fn2() {
            await console.log(4)
            console.log(5)
            await console.log(6)
        }
        const result = fn1();
        console.log(result);
        console.log(7)
    },
})
</script>
