<template>
  <div class="app-container p-4">
    <!-- 搜索工作栏 -->
    <el-card shadow="never" class="mb-4">
      <el-form :model="tableObject.queryParams" ref="queryFormRef" :inline="true">
        <el-form-item label="用户昵称" prop="nickname">
          <el-input
            v-model="tableObject.queryParams.nickname"
            placeholder="请输入用户昵称"
            clearable
            @keyup.enter="tableMethods.handleQuery"
          />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="tableObject.queryParams.mobile"
            placeholder="请输入手机号"
            clearable
            @keyup.enter="tableMethods.handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input
            v-model="tableObject.queryParams.status"
            placeholder="请输入状态"
            clearable
            @keyup.enter="tableMethods.handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="tableMethods.handleQuery">查询</el-button>
          <el-button @click="tableMethods.resetQuery">重置</el-button>
          <el-button type="success" plain @click="openForm('create')">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 列表数据 -->
    <el-card shadow="never">
      <el-table v-loading="tableObject.loading" :data="tableObject.dataList" border stripe>
        <el-table-column label="编号" align="center" prop="id" width="80" />
        <el-table-column label="用户昵称" align="center" prop="nickname" />
        <el-table-column label="手机号" align="center" prop="mobile" />
        <el-table-column label="头像" align="center" prop="avatar" />
        <el-table-column label="状态" align="center" prop="status" />
        <el-table-column label="积分" align="center" prop="point" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="操作" align="center" width="160">
          <template #default="scope">
            <el-button link type="primary" @click="openForm('update', scope.row.id)">修改</el-button>
            <el-button link type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页组件 -->
      <div class="pagination-container mt-4 flex justify-end">
        <el-pagination
          v-model:current-page="tableObject.queryParams.pageNo"
          v-model:page-size="tableObject.queryParams.pageSize"
          :total="tableObject.total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="tableMethods.handleQuery"
          @current-change="tableMethods.getList"
        />
      </div>
    </el-card>

    <!-- 表单弹窗 -->
    <el-dialog :title="dialogTitle" v-model="dialogVisible" width="600px">
      <el-form :model="formData" :rules="formRules" ref="formRef" label-width="100px">
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="formData.nickname" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-input v-model="formData.avatar" placeholder="请输入头像" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-input v-model="formData.status" placeholder="请输入状态" />
        </el-form-item>
        <el-form-item label="积分" prop="point">
          <el-input v-model="formData.point" placeholder="请输入积分" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="formLoading" @click="submitForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  getUserPageApi,
  getUserApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
  type UserVO,
} from '@/api/member/user';
import { useTable } from '@/hooks/web/useTable';

const { tableObject, tableMethods } = useTable({
  getListApi: getUserPageApi,
});

// 弹窗状态
const dialogVisible = ref(false);
const dialogTitle = ref('');
const formLoading = ref(false);
const formRef = ref();
const formData = reactive<UserVO>({
  id: undefined,
  nickname: undefined,
  mobile: undefined,
  avatar: undefined,
  status: undefined,
  point: undefined,
});

const formRules = {
  nickname: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
  mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'blur' }],
};

const openForm = async (type: 'create' | 'update', id?: number) => {
  dialogVisible.value = true;
  dialogTitle.value = type === 'create' ? '新增会员用户' : '修改会员用户';
  resetFormData();
  if (id) {
    formLoading.value = true;
    try {
      const res = await getUserApi(id);
      Object.assign(formData, res);
    } finally {
      formLoading.value = false;
    }
  }
};

const resetFormData = () => {
  formData.id = undefined;
  formData.nickname = undefined;
  formData.mobile = undefined;
  formData.avatar = undefined;
  formData.status = undefined;
  formData.point = undefined;
};

const submitForm = async () => {
  if (!formRef.value) return;
  const valid = await formRef.value.validate();
  if (!valid) return;
  formLoading.value = true;
  try {
    if (!formData.id) {
      await createUserApi(formData);
      ElMessage.success('创建成功');
    } else {
      await updateUserApi(formData);
      ElMessage.success('更新成功');
    }
    dialogVisible.value = false;
    tableMethods.getList();
  } finally {
    formLoading.value = false;
  }
};

const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('是否确认删除此项数据？', '提示', {
    type: 'warning',
  });
  await deleteUserApi(id);
  ElMessage.success('删除成功');
  tableMethods.getList();
};

onMounted(() => {
  tableMethods.getList();
});
</script>
