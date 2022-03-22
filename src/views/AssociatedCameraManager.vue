<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i>设备
        </el-breadcrumb-item>
        <el-breadcrumb-item>关联管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input
          v-model="query.name"
          placeholder="视频流名称"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="videoName"
          label="视频流名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cameraNumber"
          label="摄像头编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cameraAdder"
          label="摄像头地址"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import {cameraToVideoManager} from "../api/index";

export default {
  name: "URLManager",
  setup() {
    const query = reactive({
      name: "",
      cameraId: "",
      cameraAddr: "",
    });
    const tableData = ref([]);
    const pageTotal = ref(0);

    const getDate = () =>{
      cameraToVideoManager().then((res)=>{
                tableData.value=res.data;
            });
    };
    getDate();

    const handleEdit = (index, row) => {
      return;
    };

    const handleDelete = (index, row) => {
      return;
    };

    return {
      query,
      tableData,
      pageTotal,
      handleEdit,
      handleDelete,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
