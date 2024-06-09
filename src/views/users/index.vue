<template>
    <div class="app-container">
      <div class="head" style="margin-bottom: 15px">
        <el-input v-model="searchModel.username" placeholder="请输入用户名" style="width: 200px;"></el-input>
        <el-button type="primary" icon="el-icon-search" style="margin-left: 10px;" @click="getUserList">
          搜索
        </el-button>
        <el-button style="margin-left: 10px;" type="success" icon="el-icon-edit">
          添加用户
        </el-button>
       
      </div>
  
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 30px;"
        border
      >
        <el-table-column prop="userName" label="用户名称"  />
        <el-table-column prop="userPassword" label="用户密码"  />
        <el-table-column prop="tele" label="联系电话"  />
        <el-table-column prop="club" label="所属社团"  />
        <el-table-column label="用户身份" >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isAdmin === 1" type="success">管理员</el-tag>
            <el-tag v-else type="warning">学生</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="handleUpdate(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
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
    </div>
  </template>
  
  <script>
  import userApi from '@/api/userManage'
  
  export default {
    data() {
      return {
        total: 0,
        searchModel: {
          pageNo: 1, // 当前页码
          pageSize: 10 // 每页显示数量
        },
        tableData: [] // 表格数据
      }
    },
    
    methods: {
        // 处理分页器中每页显示数量的变化
        handleSizeChange(pageSize) {
          this.searchModel.pageSize = pageSize;
          this.getUserList();
        },
        
        // 处理分页器中当前页码的变化
        handleCurrentChange(pageNo) {
          this.searchModel.pageNo = pageNo;
          this.getUserList();
        
        },
      // 获取数据
        getUserList(){
          userApi.getUserList(this.searchModel).then(response =>{
            this.tableData = response.data;
            this.total = response.total;
          })
        },
        
    },
    //钩子函数
    created() {
      this.getUserList();
      
    }

  }
  </script>
  
  <style lang="scss" scoped>
  
  </style>
  