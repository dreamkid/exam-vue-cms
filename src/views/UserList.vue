<template>
<div class="box">
    <h1 class="user-head">User Management</h1>
    <el-table class="table" size='small' :data="tableData"   style="width: 100%">
        <el-table-column prop="avatarName"  align="center" label="昵称">
        </el-table-column>
        <el-table-column prop="id" align="center" label="ID" >
        </el-table-column>
        <el-table-column prop="name" align="center" label="真实姓名" >
        </el-table-column>
        <el-table-column prop="phone" align="center" label="手机号" >
        </el-table-column>
        <el-table-column prop="email" align="center" label="邮箱"  >
        </el-table-column>
        <el-table-column align='center' label="性别" >
            <template slot-scope="scope">
                {{ scope.row.sex==1?'男':'女' }}
            </template>
        </el-table-column>
        <el-table-column align='center' label="操作" width="200">
             <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
        </el-table-column>
    </el-table>
    <div v-if="dataTotal" class="mtb-20 bottom" style="padding:0">
        <el-pagination background layout="sizes, prev, pager, next,total" :total="dataTotal" :page-size="pageSize" :page-sizes="[5,10,15,20,30,50]" @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</div>
</template>

<script>
import {
    queryUserlistApi
} from '@/api/api.js'
export default {
    data() {
        return {
            dataTotal: 0,
            tableData: [],
            pageSize:10,
        }
    },
    async created() {
        let res = await queryUserlistApi();
        if (res.data.status == 1) {
            this.tableData = res.data.data.data.rows;
            this.dataTotal=res.data.data.data.count ;
            console.log(res.data.data.data.rows);
            console.log(this.tableData);

        }
    },
    methods: {
        async getQueryUser(pageSize,pageNum) {
            let params={};
            params.pageSize=pageSize;
            params.pageNum=pageNum;
            let res = await queryUserlistApi(params);
            if (res.data.status == 1) {
            this.tableData = res.data.data.data.rows;
            console.log(res.data.data.data.rows);
            console.log(this.tableData);
        }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.getQueryUser(val)
            this.pageSize=val;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.getQueryUser(this.pageSize,val)
        }
    }
}
</script>

<style lang="scss" scoped>
.box{
padding: 20px;
    .user-head{
    color: #59409e;
    padding: 0 40px;
    font-weight: 500;
}
.table {


}
}
</style>
