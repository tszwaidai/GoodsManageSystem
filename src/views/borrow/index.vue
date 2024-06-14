<template>
  <div class="app-container">
    <div class="head" style="margin-bottom: 15px">
        <el-input  v-model="searchModel.username" placeholder="请输入用户名" style="width: 200px;"></el-input>
        <el-input  v-model="searchModel.goodsname" placeholder="请输入物品名称" style="width: 200px; margin-left: 10px;"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="getBorrowList">
          搜索
        </el-button>
        <el-button type="warning" icon="el-icon-refresh" style="margin-left: 10px;" @click="resetSearch">
            重置
          </el-button>
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-edit" @click="openEditUI(null)">
          添加借用记录
        </el-button>
    </div>

    <el-table
        :data="tableData"
        style="width: 100%; margin-top: 30px;"
        border
      >

        <el-table-column prop="userName" label="申请人"  />
        <el-table-column prop="goodsName" label="申请物品"  />
        <el-table-column prop="borrowTime" label="借用时间"  />
        <el-table-column prop="returnTime" label="归还时间"  />
        <el-table-column fixed="right" label="操作" width="450">
          <template slot-scope="scope">
            <el-button type="warning" size="small" >通过</el-button>
            <el-button type="danger" size="small" >不通过</el-button>
            <el-button type="warning" size="small" >归还</el-button>
            <el-button type="success" size="small" >丢失</el-button>
            <el-button type="primary" size="small" @click="openEditUI(scope.row.borrowId)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteBorrow(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top: 15px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchModel.pageNo"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="searchModel.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <el-dialog @close="clearForm" :title="title" :visible.sync="dialogFormVisible" width="30%">
      <!--普通表单-->
      <el-form  :model="borrowForm" ref="borrowFormRef" :rules="rules" label-width="120px" >
        <el-form-item label="申请人" prop="userId">
          <el-select  v-model="borrowForm.userId"  placeholder="请选择申请人"  >
            <el-option  
              v-for="type in users"
              :key="type.userId"
              :label="type.userName"
              :value="type.userId"
             />
          </el-select>
        </el-form-item>

        <el-form-item label="申请物品" prop="goodsId">
          <el-select  v-model="borrowForm.goodsId"  placeholder="请选择申请物品"  >
            <el-option  
              v-for="type in goodsInfo"
              :key="type.goodsId"
              :label="type.goodsName"
              :value="type.goodsId"
             />
          </el-select>          
        </el-form-item>

        <el-form-item label="借用时间" prop="borrowTime">
          <el-date-picker v-model="borrowForm.borrowTime" type="datetime" placeholder="请选择借用时间" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveBorrow">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import borrowApi from '@/api/borrow'
import infoApi from '@/api/goodsInfo'
import userApi from '@/api/userManage'


  export default {
    data(){
      return {
        borrowForm: {},
        dialogFormVisible: false,
        title: '',
        total: 0,
        searchModel: {
          pageNo: 1, // 当前页码
          pageSize: 10, // 每页显示数量
          goodsname: '', // 物品名称
          username: '', // 用户名
        },
        tableData: [],
        users: [],
        goodsInfo: [],
        rules: {
          userId :{ required: true, message: '请选择申请人', trigger: 'blur' },
          goodsId :{ required: true, message: '请选择申请物品', trigger: 'blur' },
        }
      }
    },
    methods: {
      saveBorrow() {
        //触发表单验证
        this.$refs.borrowFormRef.validate((valid) => {
        if (valid) {
          borrowApi.saveBorrow(this.borrowForm).then(response => {
            this.$message({
              message: response.msg,
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.getBorrowList();
          });
        } else {
            console.log("提交错误!");
            return false;
          }
        });
      },
      //删除
      deleteBorrow(borrow){
        this.$confirm(`您确认删除这条记录？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
            borrowApi.deleteBorrowById(borrow.borrowId).then(response => {
              this.$message({
                type: 'success',
                message: '记录删除成功'
              });
              this.getBorrowList();
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },
      //获取表格数据
      getBorrowList(){
        borrowApi.getBorrowList(this.searchModel).then(res => {
          this.tableData = res.data;
          this.total = res.total;
        });
      },
      // 处理分页器中每页显示数量的变化
      handleSizeChange(pageSize) {
          this.searchModel.pageSize = pageSize;
          this.getBorrowList();
        },
      // 处理分页器中当前页码的变化
      handleCurrentChange(pageNo) {
        this.searchModel.pageNo = pageNo;
        this.getBorrowList();
      
      },
      // 重置
      resetSearch() {
        this.searchModel.username = '';
        this.searchModel.goodsname = '';
        this.getBorrowList();
      },
      // 清理表单验证
      clearForm(){
        this.borrowForm = {};
        this.$refs.borrowFormRef.clearValidate();
      },
      // 打开表单
      openEditUI(borrowId){
        if (borrowId == null){
          this.title = '新增借阅记录';
        }else{
          this.title = '修改借阅记录';
          //根据id查询类型信息
          borrowApi.getBorrowById(borrowId).then(response => {
            this.borrowForm = response.data;
          });
        }
        this.dialogFormVisible = true;
      },
      // 获取物品数据
      getGoods() {
        infoApi.getInfoList(this.searchModel) 
          .then(res => {
            this.goodsInfo = res.data;
          });
      },
      getUser() {
        userApi.getUserList(this.searchModel)
        .then(res => {
            this.users = res.data;
          });
      }

    },
    created(){
      this.getBorrowList();
      this.getGoods();
      this.getUser();
    }
  }
</script>

<style lang="scss" scoped>

</style>