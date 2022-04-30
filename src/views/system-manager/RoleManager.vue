<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 权限管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" @click="handleAdd" class="addBtn">新添</el-button>
            </div>

            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="roleId" label="岗位编号" width="100" align="center"></el-table-column>
                <el-table-column prop="roleName" label="岗位名称"></el-table-column>
                <el-table-column prop="description" label="备注"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleDrawer(scope.$index, scope.row)">分配用户</el-button>
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
            <el-form label-width="150px">
                <el-form-item label="岗位编号">
                    <el-input v-model="form.roleId" disabled></el-input>
                </el-form-item>
                <el-form-item label="岗位名称" :required="true">
                    <el-input v-model="form.roleName"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
     <el-drawer v-model="drawer" :direction="direction">
    <template #title>
      <div style="text-align: center">
        <span>请为</span>
        <span style="color:red;">{{selectRoleName}}</span>
        <span>岗位分配相应用户</span>
      </div>
    </template>
    <template #default>
      <div>
            <el-table :data="tableUserData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="userId" label="用户编号" width="55" align="center"></el-table-column>
                <el-table-column prop="userName" label="用户名称"></el-table-column>
                <el-table-column prop="userRoleName" label="岗位名称"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="text" @click="handleAllotUser(scope.$index, scope.row)" v-if="scope.row.userRoleId == null">分配
                        </el-button>
                        <el-button type="text" @click="handleDelAllotUser(scope.$index, scope.row)" v-if="scope.row.userRoleId === selectRoleId">取消分配
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { addNewRole, addRoleToUser, delRole, delRoleToUser, editRole, listRoles } from "../../api/role";
import { listAllUsers, listAllUsersWithRole } from '../../api/user';

export default {
    name: "RoleManager",
    setup() {
        const query = reactive({
            pageIndex: 1,
            pageSize: 10,
        });
        const tableData = ref([]);
        const pageTotal = ref(0);
        // 获取表格数据
        //--------------------------------------缺少分页
        const getData = () => {
            listRoles().then((res) => {
                console.log('查询：',res)
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
            // 二次确认删除
            ElMessageBox.confirm("确定要删除吗？", "提示", {
                type: "warning",
            })
                .then(() => {
                    delRole(row.roleId).then((res) => {
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
            roleId: '',
            roleName: '',
            description: '',
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
            console.log("添加表格内容：")
            console.log(form)
            if (addOrEdit == 1) {//添加
                addNewRole(form).then((res) => {
                    ElMessage.success(`添加成功`);
                    handleSearch();
                });
            }
            if (addOrEdit == 2) {
                editRole(form).then((res) => {
                   ElMessage.success(`修改第 ${idx + 1} 行成功`);
                   handleSearch();
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

        //侧边抽屉和相关函数
        const tableUserData = ref([]);
        const direction = ref('rtl')
        const drawer = ref(false);
        const selectRoleId = ref(0);
        const selectRoleName = ref();
        const handleDrawer = (index,row) => {
            drawer.value = true;
            selectRoleId.value = row.roleId;
            selectRoleName.value = row.roleName;
            getUserData();
        };
        const getUserData = () => {
            listAllUsersWithRole(query).then((res) => {
                tableUserData.value = res.data;
                console.log('分配用户res',res)
            });
        };
        const handleAllotUser = (index,row) => {
            addRoleToUser(row.userId,selectRoleId.value).then((res) => {
                getUserData();
            })
        };
        const handleDelAllotUser = (index,row) => {
            delRoleToUser(row.userId,selectRoleId.value).then((res) => {
                getUserData();
            })
        };


        //格式化数据操作

        return {
            query,
            tableData,
            pageTotal,
            editVisible,
            form,
            drawer,
            direction,
            tableUserData,
            selectRoleId,
            selectRoleName,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            handleAdd,
            handleDrawer,
            handleAllotUser,
            handleDelAllotUser,
            getUserData,
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
