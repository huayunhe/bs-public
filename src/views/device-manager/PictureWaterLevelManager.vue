<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i>设备
        </el-breadcrumb-item>
        <el-breadcrumb-item>水位图片管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input
          v-model="query.name"
          placeholder="图片编号"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button
          type="primary"
          icon="el-icon-circle-plus"
          @click="handleUpload"
          >上传
        </el-button>
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
          prop="pictureId"
          label="图片编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cameraId"
          label="摄像头编号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cameraAdder"
          label="摄像头地址"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="rulerId"
          label="水尺编号"
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

    <!-- 编辑弹出框 -->
    <el-dialog title="上传" v-model="uploadVisible" width="35%">
      <el-form label-width="85px">
        <el-form-item label="图片编号">
          <el-input v-model="query.pictureId"></el-input>
        </el-form-item>
        <el-form-item label="摄像头编号">
          <el-input v-model="query.cameraId"></el-input>
        </el-form-item>
        <el-form-item label="水尺编号">
          <el-input v-model="query.rulerId"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8084/pictureWaterLevel/uploadPictureWaterLevel"
        name="file"
        :data="query"
        :limit="1"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传一张jpg/png格式的图片 ，且不超过10Mkb</div>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUpload">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { getPictureWaterLevelList } from "../../api/device-manager-api";
export default {
  name: "PictureWaterLevelManager",
  setup() {
    const query = reactive({
      name: "",
      pictureId:"",
      cameraId: "",
      cameraAddr: "",
      rulerId:"",
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    const editVisible = ref(false);
    const imageUrl = ref("");
    const uploadVisible = ref(false);
    const pictureId=1;

    const getData = () => {
      getPictureWaterLevelList(query).then((res) => {
        tableData.value = res.data;
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
    const handleUpload = (index, row) => {
      uploadVisible.value = true;
      return;
    };

    const handleAvatarSuccess = (res, file) => {
      imageUrl.value = URL.createObjectURL(file.raw);
    };

    const beforeAvatarUpload = (file) => {
      const isJPGAndPNG = file.type === "image/jpeg"|| item.file.type == 'image/png';
      const isLt10M = file.size / 1024 / 1024 < 10;

      if (!isJPGAndPNG) {
        this.$message.error("上传图片只能是 JPG、PNG 格式!");
      }
      if (!isLt10M) {
        this.$message.error("上传图片大小不能超过 10MB!");
      }
      return isJPGAndPNG && isLt10M;
    };

    const saveEdit = () => {
      editVisible.value = false;
      tableData.value.push({
        thumb: imageUrl,
      });
      return;
    };
    const saveUpload = () => {
      console.log(query);
      addPictureWaterLevel(query).then((res) => {
          console.log(res)
          if(res.code===200) {
              ElMessage.success('上传成功');
              uploadVisible.value = false;
              return;
          }
          else {
              ElMessage.error(res.msg);
          }
      });
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      imageUrl,
      uploadVisible,
      pictureId,
      handleEdit,
      handleUpload,
      handleDelete,
      handleAvatarSuccess,
      beforeAvatarUpload,
      saveEdit,
      saveUpload,
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
    border-color: #409EFF;
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
