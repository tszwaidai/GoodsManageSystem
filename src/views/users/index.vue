<template>
    <div class="app-container">
        <div class="head" style="margin-bottom: 15px">
            <el-input v-model="input" placeholder="请输入用户名"  style="width: 200px;"></el-input>
            <!-- 按钮 -->
            <el-button  type="primary" icon="el-icon-search"  style="margin-left: 10px;">
            搜索
            </el-button>
            <el-button  style="margin-left: 10px;" type="success" icon="el-icon-edit" >
                添加用户
            </el-button>
            <el-button  style="margin-left: 10px;" type="danger" icon="el-icon-delete" >
                批量删除
            </el-button>
        </div>

            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%;margin-top: 30px;"
                border
                @selection-change="handleSelectionChange">
                <el-table-column
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                    fixed
                    prop="userid"
                    label="学号"
                    width="100"
                />
                <el-table-column
                    prop="username"
                    label="用户名称"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="userpassword"
                    label="用户密码"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="usertele"
                    label="联系电话"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="userclub"
                    label="所属社团"
                    show-overflow-tooltip
                />
                <el-table-column
                    label="用户身份"
                    show-overflow-tooltip
                >
                    <template slot-scope="scope">
                    <el-tag v-if="scope.row.isadmin === 1" type="success">管理员</el-tag>
                    <el-tag v-else type="warning">学生</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="150"
                >
                    <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row,scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--分页条-->
            <!-- <el-pagination
            background
            :current-page.sync="queryParam.page"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="queryParam.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="recordTotal"
            style="margin-top: 15px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            /> -->
           

            <!--弹出框-->
            <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="30%">
            <!--普通表单-->
            <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">

                <el-form-item label="用户名称" prop="username">
                <el-input v-model="form.username" />
                </el-form-item>

                <el-form-item label="用户密码" prop="userpassword">
                <el-input v-model="form.userpassword" />
                </el-form-item>

                <el-form-item label="身份" prop="isadmin">
                <el-radio v-model="form.isadmin" :label="1">管理员</el-radio>
                <el-radio v-model="form.isadmin" :label="0">读者</el-radio>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
            </el-dialog>

    </div>
</template>

<script>
    // export default {
    //     data() {
    //         return {
    //         input: '',
    //         tableData: [{
    //             userid: '1',
    //             username: '王小虎',
    //             userpassword: '12345',
    //             usertele: '888',
    //             userclub: 'xx社团'
    //         }, 
    //         {
    //             userid: '1',
    //             username: '王小虎',
    //             userpassword: '12345',
    //             usertele: '888',
    //             userclub: 'xx社团'
    //         },
    //         {
    //             userid: '1',
    //             username: '王小虎',
    //             userpassword: '12345',
    //             usertele: '888',
    //             userclub: 'xx社团'
    //         }],
    //         multipleSelection: []
    //         }     
    //     } 

    // }
</script>

<style lang="scss" scoped>

</style>