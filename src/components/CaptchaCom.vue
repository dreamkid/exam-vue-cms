<template>
    <div>
        <img :src='captchaSrc' @click="getCaptcha">
    </div>
</template>
<script>
import { getCaptchaApi } from '@/api/api.js'

export default ({
    data() {
        return {
            captchaSrc:''
        }
    },
    created() {
        this.captchaSrc = getCaptchaApi()
    },
    methods: {
        getCaptcha(){
            this.captchaSrc = getCaptchaApi()
        }
    },
})
</script>
