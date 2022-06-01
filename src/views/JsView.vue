<template>
<el-wrap>
    <div class="title">
        <div class="question-type flex-align">
            <span class="type-title">适用考试：</span>
            <el-button class="type-button flex-align" :plain=true type="danger" round size="mini">全部(888)</el-button>
            <el-button class="type-button flex-align" :plain=true type="danger" round size="mini">期中考试(222)</el-button>
            <el-button class="type-button flex-align" :plain=true type="danger" round size="mini">期末考试(222)</el-button>
        </div>
        <div class="question-degree flex-align mt-15">
            <span class="type-title">试卷形式：</span>
            <el-button class="type-button flex-align" type="danger" :plain=true round size="mini">全部</el-button>
            <el-button class="type-button flex-align" type="danger" :plain=true round size="mini">考生同卷</el-button>

        </div>
        <div class="question-form flex-between mt-15">

            <div class="form-button flex-align">
                <el-button type="primary" size="small">策略组卷</el-button>
                <el-button type="primary" size="small">手动组卷</el-button>
                <el-button type="primary" size="small">导入试卷</el-button>
            </div>
            <div class="form-inputn">
                <el-input placeholder="请输入要搜索的内容" suffix-icon="el-icon-search">
                </el-input>
            </div>
        </div>
    </div>
    <div class="question-card">
        <div class="card-title flex-between">
            <div class="title-left flex-align">
                <span class="title-time">创建时间:XX-XX-XX 15:25:00</span>

                <div class="title-button flex-align">
                    <el-button type="primary" size="mini" class="button-degree flex-align">期中考试</el-button>
                    <el-button type="primary" size="mini" class="button-degree flex-align">考生同卷</el-button>
                </div>
                <span class="title-num">满分: 100</span>
                <span class="title-num">使用次数: 99次</span>
            </div>
            <div class="title-right">
                <span class="icon">
                    <i class="el-icon-printer"> </i>
                </span>
                <span class="icon">
                    <i class="el-icon-document"></i>
                </span>
                <span class="icon">
                    <i class="el-icon-delete"> </i>
                </span>

            </div>
        </div>
        <div class="question-title">
            1.Java程序设计期中考试试卷

        </div>

    </div>
    

</el-wrap>
</template>

<script>
export default {

    data() {
        return {
            
        };
    },

};
</script>

<style lang="scss" scoped>


.title {
        background-color: rgba(128, 128, 128, 0.081);
        border-radius: 10px;
        border: 1px solid rgba(128, 128, 128, 0.132);
        padding: 20px;

        & .type-title {
            font-weight: 600;
        }
    }


.type-button {
    height: 10px;
}

.form-button {
    & .el-button {
        background-color: #0067e1;
        border: #0067e1;
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

                & .button-degree {
                    height: 10px;
                    padding: 7px 4px;
                }
            }

            & .title-num {
                padding: 0 15px;
            }
        }

        .title-right {
            & .icon {
                font-size: 20px;
                padding: 0 5px;
            }
        }
    }

    & .question-title {
        padding: 10px 0;
    }

}
</style>
