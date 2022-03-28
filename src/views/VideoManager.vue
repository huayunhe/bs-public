<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i>设备
        </el-breadcrumb-item>
        <el-breadcrumb-item>视频流管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="水位" name="waterLevel">
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
            <el-table-column label="视频流名称" align="center">
              <template #default="scope">
                <a href="/#/VideoManager">{{ scope.row.name }}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="cameraId"
              label="摄像头编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="cameraAddr"
              label="摄像头地址"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                  >详情</el-button
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
        </el-tab-pane>
        <el-tab-pane label="水面漂浮物" name="floater">
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
            <el-table-column label="视频流名称" align="center">
              <template #default="scope">
                <a href="/#/VideoManager">{{ scope.row.name }}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="cameraId"
              label="摄像头编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="cameraAddr"
              label="摄像头地址"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                  >详情</el-button
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
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <video controls autoplay>
        <source src="https://www.w3cschool.cn/statics/demosource/movie.mp4" type="video/mp4">
      </video>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { getFloaterList } from "../api/alarm-manager-api";
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
    const editVisible = ref(false);
    const videoURL = ref('');
    const activeName = "waterLevel";

    const getData = () => {
      getFloaterList(query).then((res) => {
        tableData.value = res.list;
        pageTotal.value = res.pageTotal;
      });
    };
    getData();

    const handleEdit = (index, row) => {
      editVisible.value = true;
      return;
    };

    const handleDelete = (index, row) => {
      editVisible.value = false;
      return;
    };

    const saveEdit = () => {
      editVisible.value = false;
      return;
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      activeName,
      handleEdit,
      handleDelete,
      saveEdit,
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
