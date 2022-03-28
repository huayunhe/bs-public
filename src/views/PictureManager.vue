<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i>设备
        </el-breadcrumb-item>
        <el-breadcrumb-item>图片管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="水位" name="waterLevel">
          <div class="handle-box">
            <el-input
              v-model="query.name"
              placeholder="名称"
              class="handle-input mr10"
            ></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button
              type="primary"
              icon="el-icon-circle-plus"
              @click="handleEdit"
              >上传</el-button
            >
          </div>
          <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column label="图片(查看大图)" align="center">
              <template #default="scope">
                <el-image
                  class="table-td-thumb"
                  :src="scope.row.thumb"
                  :preview-src-list="[scope.row.thumb]"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column
              prop="cameraId"
              label="图片编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="cameraAddr"
              label="图片地址"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
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
              placeholder="名称"
              class="handle-input mr10"
            ></el-input>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
            <el-button
              type="primary"
              icon="el-icon-circle-plus"
              @click="handleEdit"
              >上传</el-button
            >
          </div>
          <el-table
            :data="tableData"
            border
            class="table"
            ref="multipleTable"
            header-cell-class-name="table-header"
          >
            <el-table-column label="图片(查看大图)" align="center">
              <template #default="scope">
                <el-image
                  class="table-td-thumb"
                  :src="scope.row.thumb"
                  :preview-src-list="[scope.row.thumb]"
                >
                </el-image>
              </template>
            </el-table-column>
            <el-table-column
              prop="cameraId"
              label="图片编号"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="cameraAddr"
              label="图片地址"
              align="center"
            ></el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
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
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
    const imageUrl = ref("");
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

    const handleAvatarSuccess = (res, file) => {
      imageUrl.value = URL.createObjectURL(file.raw);
    };

    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    };

    const saveEdit = () => {
      editVisible.value = false;
      tableData.value.push({
        thumb: imageUrl,
      });
      return;
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      imageUrl,
      activeName,
      handleEdit,
      handleDelete,
      handleAvatarSuccess,
      beforeAvatarUpload,
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
