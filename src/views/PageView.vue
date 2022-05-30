<template>
<div class="page">
    <div class="mask" v-if="popup">
        <div class="eject">
            <div class="flex-align">
                <div class="start">*</div>
                <el-input class="eject-input" placeholder="请输入题目" v-model="form.title">
                    <template slot="prepend">题目标题:</template>
                </el-input>
            </div>
            <div class="flex-align" v-for="(item,i) in answerArr" :key="i">
                <div v-if="i!=2&&i!=3" class="start">*</div>
                <div v-else class="null"></div>
                <el-input v-model="form['question'+item.title]" class="eject-input" :placeholder="item.placeholder">
                    <template slot="prepend">选项 {{item.title}} :</template>
                    <el-button v-if="i==answerArr.length-1 && i!=3" @click="addOption" slot="append" icon="el-icon-circle-plus-outline"></el-button>
                    <el-button v-if="i==answerArr.length-1 && i!=1" @click="reduceOption(item.title)" slot="append" icon="el-icon-remove-outline"></el-button>
                </el-input>
            </div>

            <div class="flex-between">
                <div class="options ml-10">
                    正确答案：
                    <el-radio-group class="radio" v-model="form.answer">
                        <el-radio-button :label="item.title" v-for="(item,i) in answerArr" :key="i">{{item.title}}</el-radio-button>
                    </el-radio-group>
                </div>
                <div class="options">
                    困难程度：
                    <el-radio-group class="radio" v-model="form.level">
                        <el-radio-button :label=1>简单</el-radio-button>
                        <el-radio-button :label=2>普通</el-radio-button>
                        <el-radio-button :label=3>困难</el-radio-button>
                    </el-radio-group>
                </div>
            </div>

            <div class="create-button flex-around" v-if="questionState=='create'">
                <el-button type="danger" plain @click="hiddenPopup">取消创建</el-button>
                <el-button type="primary" plain @click="createQuestion">创建题目</el-button>
            </div>
            <div class="create-button flex-around" v-if="questionState=='update'">
                <el-button type="danger" plain @click="hiddenPopup">取消修改</el-button>
                <el-button type="primary" plain @click="updateQuestion">修改题目</el-button>
            </div>
        </div>
    </div>
    <div class="title">

        <div class="question-type flex-align" @click="tab($event)">
            <span class="type-title">所属题型:</span>
            <button class="flex-align type-button active">全部(888)</button>
            <button class="flex-align type-button">单选(222)</button>
            <button class="flex-align type-button">多选(222)</button>

        </div>
        <div class="question-degree flex-align mt-15" @click="tab($event)">
            <span class="type-title">难易程度:</span>
            <button class="flex-align type-button active">全部(222)</button>
            <button class="flex-align type-button">简单(22)</button>
            <button class="flex-align type-button">困难(52)</button>

        </div>
        <div class="question-form flex-between mt-15">

            <div class="form-button flex-align">
                <el-button type="primary" size="small" @click="showPopup('create')">添加习题</el-button>
                <el-button type="primary" size="small">批量导入</el-button>
                <el-button type="primary" size="small">加入公共习题库</el-button>
            </div>
            <div class="form-inputn">
                <el-input v-model="queryInput" placeholder="请输入要搜索的内容">
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="getQuestionList"></i>
                </el-input>
            </div>
        </div>
    </div>
    <el-empty v-if="!dataTotal" description="暂无题目"></el-empty>
    <template v-else v-for="(item,index) in data">
        <div class="question-card" :key="index">
            <div class="card-title flex-between">
                <div class="title-left flex-align">
                    <span class="title-time">创建时间: &nbsp; {{dateCorrect(item.createdAt)}}</span>

                    <div class="title-button flex-align">
                        <button class="button-type flex-align">{{typeClass(item.type)}}</button>
                        <button class="button-level flex-align">{{levelClass(item.level)}}</button>
                    </div>
                    <span>使用次数:99次</span>
                </div>
                <div class="title-right">
                    <span class="icon" @click="showPopup('update',item)">
                        <i class="el-icon-document" style="color:#808080;"></i>
                    </span>
                    <span class="icon" @click="openDeletePopup(item)">
                        <i class="el-icon-delete" style="color:#808080;"></i>
                    </span>
                </div>
            </div>

            <div class="card-text">

                <div class="card-ask flex-align mt-10">
                    <el-checkbox></el-checkbox>
                    <span class="card-question">{{item.title}}</span>
                </div>
                <div class="card-options">
                    <el-radio-group v-model="item.answer" class="card-group">
                        <el-radio class="radio" label="A" disabled>{{item.questionA}}</el-radio>
                        <el-radio class="radio" label="B" disabled>{{item.questionB}}</el-radio>
                        <el-radio v-if="item.questionC" class="radio" label="C" disabled>{{item.questionC}}</el-radio>
                        <el-radio v-if="item.questionD" class="radio" label="D" disabled>{{item.questionD}}</el-radio>
                    </el-radio-group>
                </div>
                <div class="card-answer">
                    答案:{{item.answer}}
                </div>
            </div>
            <div class="card-tip">
                <div class="card-know">所属知识点:<span>知识1</span><span>知识1</span><span>知识1</span></div>
                <div class="card-analysis">解析:<span>这是一条解析</span></div>
            </div>
        </div>

    </template>
    <div v-if="dataTotal" class="mt-20 bottom" style="padding:0">
        <el-pagination background layout="sizes, prev, pager, next,total" :total="dataTotal" :page-size="pageSize" :page-sizes="[5,10,15,20,30,50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
    </div>

</div>
</template>

<script>
import {
    listQuestionApi,
    deleteQuestionApi,
    createQuestionApi,
    updateQuestionApi,
    infoApi
} from '@/api/api.js'
import dateCorrect from '@/assets/mixins/dateCorrect.js'
export default {
    mixins: [dateCorrect],
    data() {
        return {
            userId: '',
            userPageSize: '',
            questionId: '',
            questionType: 1,
            questionState: 'create',
            popup: false,
            data: [],
            dataTotal: 0,
            pageNum: 1,
            pageSize: 10,
            answerArr: [],
            answerAllArr: [{
                id: 1,
                title: 'A',
                placeholder: '请输入答案A'
            }, {
                id: 2,
                title: 'B',
                placeholder: '请输入答案B'
            }, {
                id: 3,
                title: 'C',
                placeholder: '请输入答案C,非必填'
            }, {
                id: 4,
                title: 'D',
                placeholder: '请输入答案D,非必填'
            }],
            form: {
                type: 1,
                title: '',
                questionA: '',
                questionB: '',
                questionC: '',
                questionD: '',
                answer: '',
                level: '',
            },
            answer: '',
            queryInput: ''
        };
    },
    destroyed() {
           window.removeEventListener('keydown', this.keyDown)
    },
    created() {
           window.addEventListener('keydown', this.keyDown)
        // window.addEventListener('keydown', e => {
        //     if (e.code == 'Enter' || e.code == 'NumpadEnter') {
        //         // event.preventDefault();
        //         console.log(1);
        //         this.getQuestionList();
        //         // event.preventDefault();
        //     }
        // })
        infoApi().then(res => {
            if (res.data.status == 1) {
                this.userId = res.data.data[0].phone;
                if (!localStorage.getItem(this.userId)) {
                    localStorage.setItem(this.userId, JSON.stringify({
                        'pageSize': 10
                    }));
                }
                this.pageSize = JSON.parse(localStorage.getItem(this.userId))['pageSize'];
                this.getQuestionList();
            }
        })
    },
    watch: {
        answerArr(newValue) {
            var flag = false;
            newValue.forEach(e => {
                if (e.title == this.form.answer) {
                    flag = true
                }
            });
            if (!flag) {
                this.form.answer = ''
            }

        },
        pageSize(newVue) {
            var newPage = JSON.parse(localStorage.getItem(this.userId));
            newPage['pageSize'] = newVue;
            localStorage.setItem(this.userId, JSON.stringify(newPage));
        }
    },

    methods: {
        keyDown(e) {
console.log(1);
            if (e.code == 'Enter' || e.code == 'NumpadEnter') {
                this.getQuestionList();
            }
        },
        showPopup(value, item) {
            this.resetData();
            this.questionState = value;
            if (this.questionState == 'update') {
                this.form = JSON.parse(JSON.stringify(item));
                this.answer = this.form.answer;
                if (this.form.questionD) {
                    this.answerArr = this.answerAllArr.slice(0, 4)
                } else if (this.form.questionC) {
                    this.answerArr = this.answerAllArr.slice(0, 3)
                }
                delete this.form.updatedAt;
                delete this.form.createdAt;
            }
            this.popup = true;
        },

        hiddenPopup() {
            this.popup = false;

        },
        levelClass(value) {
            if (value == 1) {
                return '简单'
            } else if (value == 2) {
                return '普通'
            } else {
                return '困难'
            }
        },
        typeClass(value) {
            if (value == '1') {
                return '单'
            }
        },
        getValideResult() {
            var res = {
                result: false
            }
            const obj = {
                title: '题目标题',
                questionA: '答案A',
                questionB: '答案B',
                questionC: '答案C',
                questionD: '答案D',
                answer: '正确答案',
                level: '难度',
            }
            for (const key in this.form) {
                if (this.answerArr.length <= 2 && key == 'questionC') continue
                if (this.answerArr.length <= 3 && key == 'questionD') continue
                if (!this.form[key]) {
                    res.message = {
                        type: 'warning',
                        message: '请填写' + obj[key],
                    }
                    break
                }

            }

            if (res.message) {
                this.$message(res.message);
            } else {
                res.result = true
            }
            return res.result
        },
        resetData() {
            this.answerArr = this.answerAllArr.slice(0, 2);
            this.form = {
                type: 1,
                title: '',
                questionA: '',
                questionB: '',
                questionC: '',
                questionD: '',
                answer: '',
                level: '',
            }
        },
        createQuestion() {
            this.uploadQuestion(createQuestionApi)
        },
        updateQuestion() {

            this.uploadQuestion(updateQuestionApi)
        },
        async uploadQuestion(uploadApi) {

            if (!this.getValideResult()) return;
            let parameter = this.form;
            console.log(parameter);
            parameter.type = this.questionType
            if (uploadApi == updateQuestionApi) {
                this.questionState = 'update'
                // parameter.id = this.questionId;
            }
            let res = await uploadApi(
                parameter
            )
            if (res.data.status == 1) {
                const message = this.questionState == 'create' ? '创建' : '修改';
                this.$message({
                    type: 'success',
                    message: message + '成功',
                });
                this.hiddenPopup();
                this.getQuestionList();
            } else {
                this.$message({
                    type: 'warning',
                    message: res.data.msg,
                });
            }
        },
        addOption() {
            this.answerArr.push(this.answerAllArr[this.answerArr.length]);
        },
        reduceOption(title) {
            this.answerArr.pop();
            this.form['question' + title] = '';
        },
        tab() {},
        openDeletePopup({
            id,
            type
        }) {
            this.$confirm('是否删除该题目?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.deleteQuestion(id, type)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        async deleteQuestion(id, type) {
            let res = await deleteQuestionApi({
                id,
                type,

            })
            if (res.data.status == 1) {
                this.$message({
                    type: 'success',
                    message: '删除成功',
                });
                this.getQuestionList();
            } else {
                this.$message({
                    type: 'warning',
                    message: '删除失败',
                });
            }

        },
        async getQuestionList() {

            let title = this.queryInput.trim();
            if (title) {
                this.pageNum = 1
            }
            const {
                pageNum,
                pageSize,
            } = this;
            let res = await listQuestionApi({
                type: 1,
                pageSize,
                pageNum,
                title
            })
            if (res.data.status == 1) {
                this.data = res.data.data.rows;
                this.dataTotal = res.data.data.count;
                if (this.data.length == 0 && this.dataTotal != 0) {
                    this.pageNum--;
                    this.getQuestionList();
                }
            }
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.getQuestionList()
            // this.queryQuestion()
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.getQuestionList()
        },
        // async queryQuestion() {
        //     console.log(this.queryInput);
        //     let params = {};
        //     params.type = 1;
        //     params.pageNum = 1;
        //     params.title = this.queryInput.trim();
        //     params.pageSize = this.pageSize;
        //     let res = await listQuestionApi(params);
        //     if (res.data.status == 1) {
        //         this.data = res.data.data.rows;
        //         this.dataTotal = res.data.data.count;
        //     }
        // }
    },
};
</script>

<style lang="scss" scoped>
.mask {
    min-width: 1000px;
    position: absolute;
    left: 0px;
    top: 0px;
    background: rgba(0, 0, 0, 0.56);
    width: 100vw;
    height: 100vh;
    z-Index: 99;
    display: flex;
    justify-content: center;
    align-items: center;

    & .eject {
        & .start {
            width: 10px;
            text-align: center;
            color: red;

        }

        & .null {
            width: 10px;

        }

        min-width: 800px;
        border-radius: 10px;
        width: 800px;
        background-color: #fff;
        // cursor: pointer;
        // opacity: 100%;
        padding: 40px 70px;
        box-sizing: border-box;

        & .eject-input {
            padding: 10px 0;

            ::v-deep .el-input-group__prepend {
                width: 60px;
                text-align: right;
            }
        }

        & .options {
            color: gray;
            padding: 10px 0;

            & .radio {
                margin-left: 5px;
            }
        }

        & .create-button {
            padding: 10px 0;
        }
    }
}

.page {
    padding: 20px;
    box-sizing: border-box;
    overflow-y: scroll;
    height: calc(100vh - 60px);

    & .title {
        background-color: rgba(128, 128, 128, 0.081);
        border-radius: 10px;
        border: 1px solid rgba(128, 128, 128, 0.132);
        padding: 20px;

        & .type-title {
            font-weight: 600;
            color: rgba(0, 0, 0, 0.606);
            margin-right: 15px;

        }

        & .type-button {
            padding: 0px 8px;
            font-size: 12px;
            border-radius: 10px;
            margin: 0 5px;
            color: rgba(128, 128, 128, 0.713);
            border: 1px solid rgba(128, 128, 128, 0.712);
            font-weight: 500;
            background-color: white;
            box-sizing: border-box;
        }

        & .active {
            color: #f48277;
            font-weight: 500;
            border: 1px solid #f48277;
        }

        & .question-form {
            & .form-button {
                & .el-button {
                    background-color: #0067e1;
                    border: #0067e1;
                }
            }
        }
    }
}

.question-card {
    border-radius: 10px;
    border: 1px solid rgba(128, 128, 128, 0.132);
    padding: 15px 20px;
    margin-top: 20px;

    & .card-title {
        .title-left {
            color: gray;
            font-size: 14px;

            & .title-button {
                margin: 0 35px;

                & .button-level {
                    font-size: 12px;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 2px 6px;
                    margin: 0 2px;
                    background-image: linear-gradient(#f24937, #f97259);
                }

                & .button-type {
                    font-size: 12px;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 2px 6px;
                    margin: 0 2px;
                    background-image: linear-gradient(#68d68d, #68d6a3);
                }
            }
        }

        & .title-right {
            & .icon {
                font-size: 20px;
                padding: 0 5px;
            }
        }
    }

    & .card-text {
        & .card-ask {
            & .card-question {
                margin-left: 10px;
            }
        }

        & .card-options {
            .card-group {
                width: 100%;
                min-width: 800px;
                padding: 20px 20px;

                ::v-deep .el-radio {
                    // padding: 10px 20px;
                    padding-right: 50px;
                    margin: 0;

                    .el-radio__label {
                        font-size: 16px;
                    }
                }
            }

        }

        & .card-answer {
            padding-left: 35px;
        }

    }

    & .card-tip {
        color: #929090;
        font-size: 14px;
        margin-top: 15px;
        border-top: 1px dashed rgba(128, 128, 128, 0.775);

        & .card-know {
            padding: 10px 0;
        }

        & .card-analysis {
            padding: 5px 0;
        }
    }

}

::-webkit-scrollbar {
    width: 0;
    height: 0;
}
</style>
