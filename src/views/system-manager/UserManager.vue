<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 巡检区域设置
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <span>根据用户编号或名称搜索：</span>
                <el-input v-model="query.userInput" placeholder="请输入内容" class="handle-input mr10"></el-input>
                <span>根据手机号搜索：</span>
                <el-input v-model="query.phoneInput" placeholder="请输入内容" class="handle-input mr10"></el-input>
                <span>根据身份证号搜索：</span>
                <el-input v-model="query.cardInput" placeholder="请输入内容" class="handle-input mr10"></el-input>
                <span>根据地址搜索：</span>
                <el-input v-model="query.addrInput" placeholder="请输入内容" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" @click="handleAdd" class="addBtn">新添</el-button>
            </div>

            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="userId" label="用户编号" width="55" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户名称"></el-table-column>
                <el-table-column prop="userPhone" label="手机号"></el-table-column>
                <el-table-column prop="userCard" label="身份证"></el-table-column>
                <el-table-column prop="userAddr" label="用户地址"></el-table-column>
                <el-table-column prop="userAddrDetail" label="详细地址"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">修改信息
                        </el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleEditPassword(scope.$index, scope.row)">修改密码</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                    :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
            </div>
        </div>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="用户名称" >
                    <el-input v-model="form.userName"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.userPhone"></el-input>
                </el-form-item>
                <el-form-item label="身份证">
                    <el-input v-model="form.userCard"></el-input>
                </el-form-item>
                <el-form-item label="用户地址">
                    <el-input v-model="form.userAddr"></el-input>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input v-model="form.userAddrDetail"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog title="修改密码" v-model="editPasswordVisible" width="30%">
            <el-form label-width="70px">
                <el-form-item label="请输入密码">
                    <el-input v-model="form.userPassword"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="editPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
              </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { addUser, delUser, EditInfo, EditPassword, listAllUsers } from "../../api/user";

export default {
    name: "UserManager",
    setup() {
        const query = reactive({
            userInput:'',
            phoneInput:'',
            cardInput:'',
            addrInput:'',
            pageIndex: 1,
            pageSize: 10,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        //--------------------------------------缺少分页
        const getData = () => {
            listAllUsers(query).then((res) => {
                console.log(res)
                tableData.value = res.data;
                //pageTotal.value = res.pageTotal || 50;
            });
        };
        getData();
        // 查询操作
        const handleSearch = () => {
            query.pageIndex = 1;
            getData();
        };
        // 分页导航
        const handlePageChange = (val) => {
            query.pageIndex = val;
            getData();
        };

        // 删除操作
        const handleDelete = (index,row) => {
            console.log(row.userId)
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    delUser(row.userId).then((res) => {
                        if(res.code == 200) {
                            ElMessage.success("删除成功");
                            handleSearch();
                        }
                        else {
                            ElMessage.success("删除失败");
                        }
                    });
                })
                .catch(() => {});
        };

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        let form = reactive({
            userId: '',
            userName: '',
            userPhone: '',
            userPassword: '',
            userCard: '',
            userAddr: '',
            userAddrDetail: '',
            userCode: '',
        });
        let idx = -1;
        let addOrEdit = 1;//标识确认按钮是添加、编辑、修改密码发送的请求
        const handleEdit = (index, row) => {
            addOrEdit = 2;
            idx = index;
            Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
            editVisible.value = true;
            console.log(form)
        };
        const saveEdit = () => {
            editVisible.value = false;
            editPasswordVisible.value = false;
            console.log("添加表格内容：")
            console.log(form)
            if (addOrEdit == 1) {//添加
                addUser(form).then((res) => {
                    ElMessage.success(`添加成功`);
                    handleSearch();
                });
            }
            if (addOrEdit == 2) {
                EditInfo(form).then((res) => {
                   ElMessage.success(`修改第 ${idx + 1} 行成功`);
                   handleSearch();
                });
            }
            if (addOrEdit == 3) {
                EditPassword(form.userId,form.userPassword).then((res) => {
                   if(res.code === 200) {
                      ElMessage.success('修改密码成功');
                      handleSearch();
                   }
                });
            }
            /* Object.keys(form).forEach((item) => {
                tableData.value[idx][item] = form[item];//分页时可能会有bug
            }); */
        };
        const handleAdd = () => {
            addOrEdit = 1;
            Object.keys(form).forEach((item) => {
                form[item] = '';
            });
            editVisible.value = true;
        };

        let editPasswordVisible = ref(false)
        const handleEditPassword = (index,row) => {
          addOrEdit = 3;
          Object.keys(form).forEach((item) => {
                form[item] = row[item];
            });
          editPasswordVisible.value = true;
        };


        //格式化数据操作

        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            editPasswordVisible,
            handleEditPassword,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            handleAdd,
        };
    },
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
    width: 100%;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 150px;
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
.addBtn {
    float: right;
    margin-bottom: 20px;
}
</style>
