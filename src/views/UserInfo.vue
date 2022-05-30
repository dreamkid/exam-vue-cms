<template>
<div class="info">
    <div class="box">
        <div class="header">基本信息</div>
        <div class="body">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item class="p-15-30" label="账号昵称">
                    <el-input v-model="form.avatarName"></el-input>
                </el-form-item>
                <el-form-item class="p-15-30" label="真实姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item class="sex" label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio :label=1>男</el-radio>
                        <el-radio :label=0>女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item class="p-15-30" label="所在地">
                    <el-select v-model="form.provinceNo" placeholder="请选择" class="pb-10">
                        <el-option v-for="(item,i) in province" :key="i" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select>
                    <span class="city">省</span>
                    <el-select v-model="form.cityNo" placeholder="请选择">
                        <el-option v-for="(item,i) in city" :key="i" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select>
                    <span class="city">市</span>
                    <el-select v-model="form.areaNo" placeholder="请选择">
                        <el-option v-for="(item,i) in area" :key="i" :label="item.name" :value="item.code">
                        </el-option>
                    </el-select>
                    <span class="city">区</span>

                </el-form-item>
                <el-form-item class="p-15-30" label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item class="p-15-30" label="手机号">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item class="p-15-30" label="简介">
                    <el-input :rows="4" type="textarea" v-model="form.desc" show-word-limit maxlength="80"></el-input>
                </el-form-item>
                <el-form-item class="p-15-30">
                    <el-button size="mini" type="primary" round @click="update">修改</el-button>
                    <el-button size="mini" round>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="box mt-20">
        <div class="header"></div>
    </div>
    <div class="box mt-20">
        <div class="header">企业信息</div>
    </div>
</div>
</template>

<script>
import cityJson from '@/city.js/citydata.json'
import {
    infoApi,
    updateInfoApi
} from '@/api/api.js'
export default {
    data() {
        return {
            form: {
                avatarName: '',
                name: '',
                sex: '',
                provinceNo: '',
                cityNo: '',
                areaNo: '',
                email: '',
                phone: '',
                desc: '',
            },
            province: [],
            city: [],
            area: [],
        }
    },
    async created() {
        cityJson.forEach(item => {
            this.province.push(item)
        })
        let res = await infoApi();
        if (res.data.status == 1) {
            this.form = res.data.data[0];
            delete this.form.townNo
            delete this.form.updatedAt
            delete this.form.createdAt
            delete this.form.id
        }
    },
    watch: {
        'form.provinceNo': function () {
            this.city = this.province.find(e => e.code == this.form.provinceNo).children;
            // this.form.cityNo = this.city.find(e => e.code == this.form.cityNo) ? this.form.cityNo : '';
        },
        'form.cityNo': function () {
            this.area = this.city.find(e => e.code == this.form.cityNo) ? this.city.find(e => e.code == this.form.cityNo).children : [];
            //     this.form.areaNo = this.area?(this.area.find(e => e.code == this.form.areaNo) ? this.form.areaNo : ''):'';
        }

    },
    methods: {
        getValideResult() {
            var res = {
                result: false
            };
            if (!this.form.phone) {
                res.message = {
                    type: 'warning',
                    message: '请填写手机号',
                }
            } else if (!this.form.email) {
                res.message = {
                    type: 'warning',
                    message: '请填写邮箱',
                }
            }
            if (res.message) {
                this.$message(res.message);
            } else {
                res.result = true
            }
            return res.result
        },
        async update() {
            if (!this.getValideResult()) return
            let res = await updateInfoApi(this.form);
            if (res.data.status == 1) {
                this.$message({
                    type: 'success',
                    message: '修改成功',
                });
            }
            let ress = await infoApi();
            if (ress.data.status == 1) {
                this.form = ress.data.data[0];
                delete this.form.townNo
                delete this.form.updatedAt
                delete this.form.createdAt
                delete this.form.id
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.info {
    padding: 20px;
}

.box {
    background-color: white;

    & .header {
        padding: 20px 30px;
        font-weight: 700;
        border-bottom: 1px solid #f7f7f7;
    }

    & .body {
        padding: 15px 0;

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

        .city {
            padding-right: 30px;
            padding-left: 10px;
        }

        ::v-deep .el-button {
            width: 80px;
            margin-right: 10px;
        }
    }
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
