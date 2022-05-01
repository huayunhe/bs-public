<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i>设备
        </el-breadcrumb-item>
        <el-breadcrumb-item>漂浮物 视频管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input
          v-model="query.name"
          placeholder="漂浮物视频编号"
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
        <el-table-column label="视频流名称" align="center">
          <template #default="scope">
            <a href="/#/VideoManager">{{ scope.row.name }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="videoFloaterId"
          label="漂浮物视频编号"
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
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >查看视频</el-button
            >
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
    <el-dialog title="查看视频" v-model="editVisible" width="50%">
      <video
        controls
        autoplay
        height="421"
        width="700"
        src="src\assets\video\HwVideoEditor_2022_01_06_234738779.mp4"
        type="video/mp4"
      >
        <!-- <source  type="video/mp4"> -->
      </video>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog title="上传" v-model="uploadVisible" width="35%">
      <el-form label-width="85px">
        <el-form-item label="视频编号">
          <el-input v-model="query.videoFloaterId"></el-input>
        </el-form-item>
        <el-form-item label="摄像头编号">
          <el-input v-model="query.cameraId"></el-input>
        </el-form-item>
      </el-form>
      <el-upload
        class="avatar-uploader"
        :drag="{ plus }"
        action="http://localhost:8084/videoFloater/uploadVideoFloater"
        multiple
        name="file"
        :data="query"
        :show-file-list="false"
        :on-success="handleVideoSuccess"
        :before-upload="beforeUploadVideo"
        :on-progress="uploadVideoProcess"
      >
        <i v-if="plus" class="el-icon-upload"></i>
        <div v-if="plus" class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <el-progress
          v-if="videoFlag == true"
          type="circle"
          :percentage="videoUploadPercent"
          style="margin-top: 10px"
        ></el-progress>
        <div class="el-upload__tip" slot="tip">
          只能上传mp4/wmv/avi文件，且不超过300M
        </div>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="uploadVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUpload">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import {
  getVideoFloaterList,
  addVideoFloater,
} from "../../api/device-manager-api";

export default {
  name: "VideoFloaterManager",
  setup() {
    const query = reactive({
      name: "",
      videoFloaterId: "",
      cameraId: "",
      cameraAddr: "",
      videoUrl: "",
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    const editVisible = ref(false);
    const uploadVisible = ref(false);
    const videoFlag = ref(false);
    const plus = ref(true);
    const videoUploadPercent = ref(0);

    const getData = () => {
      getVideoFloaterList(query).then((res) => {
        tableData.value=res.data;
        pageTotal.value = res.pageTotal;
      });
    };
    getData();

    const handleEdit = (index, row) => {
      editVisible.value = true;
      return;
    };
    const handleUpload = () => {
      uploadVisible.value = true;
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
    const saveUpload = () => {
      console.log(query);
      addVideoFloater(query).then((res) => {
        console.log(res);
        if (res.code === 200) {
          ElMessage.success("上传成功");
          uploadVisible.value = false;
          return;
        } else {
          ElMessage.error(res.msg);
        }
      });
    };
    const beforeUploadVideo = (file) => {
      const isLt300M = file.size / 1024 / 1024 < 300;
      if (
        ["video/mp4", "video/avi", "video/x-ms-wmv"].indexOf(file.type) == -1
      ) {
        ElMessage.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt300M) {
        ElMessage.error("上传视频大小不能超过300MB哦!");
        return false;
      }
    };
    // 视频上传过程中执行
    const uploadVideoProcess = (event, file, fileList) => {
      plus.value = false;
      videoFlag.value = true;
      videoUploadPercent.value = file.percentage.toFixed(0);
    };
    // 视频上传成功是执行
    const handleVideoSuccess = (res, file) => {
      plus.value = false;
      videoUploadPercent.value = 100;
      console.log(res);
      // 如果为200代表视频保存成功
      if (res.code === 200) {
        // 接收视频传回来保存地址
        // 至于怎么使用看你啦~
        query.videoUrl = res.data;
        ElMessage.success("视频上传成功！");
      } else {
        ElMessage.error("视频上传失败，请重新上传！");
      }
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      uploadVisible,
      videoFlag,
      plus,
      videoUploadPercent,
      handleEdit,
      handleUpload,
      beforeUploadVideo,
      uploadVideoProcess,
      handleVideoSuccess,
      handleDelete,
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
