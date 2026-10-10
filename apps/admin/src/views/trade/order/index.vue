<template>
  <div class="app-container p-4">
    <!-- 搜索工作栏 -->
    <el-card shadow="never" class="mb-4">
      <el-form :model="tableObject.queryParams" ref="queryFormRef" :inline="true">
        <el-form-item label="订单流水号" prop="orderNo">
          <el-input
            v-model="tableObject.queryParams.orderNo"
            placeholder="请输入订单流水号"
            clearable
            @keyup.enter="tableMethods.handleQuery"
          />
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-input
            v-model="tableObject.queryParams.status"
            placeholder="请输入订单状态"
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
        <el-table-column label="订单流水号" align="center" prop="orderNo" />
        <el-table-column label="买家用户编号" align="center" prop="userId" />
        <el-table-column label="实付总金额(分)" align="center" prop="totalPrice" />
        <el-table-column label="订单状态" align="center" prop="status" />
        <el-table-column label="支付时间" align="center" prop="payTime" />
        <el-table-column label="用户备注" align="center" prop="remark" />
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
        <el-form-item label="订单流水号" prop="orderNo">
          <el-input v-model="formData.orderNo" placeholder="请输入订单流水号" />
        </el-form-item>
        <el-form-item label="买家用户编号" prop="userId">
          <el-input v-model="formData.userId" placeholder="请输入买家用户编号" />
        </el-form-item>
        <el-form-item label="实付总金额(分)" prop="totalPrice">
          <el-input v-model="formData.totalPrice" placeholder="请输入实付总金额(分)" />
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-input v-model="formData.status" placeholder="请输入订单状态" />
        </el-form-item>
        <el-form-item label="支付时间" prop="payTime">
          <el-input v-model="formData.payTime" placeholder="请输入支付时间" />
        </el-form-item>
        <el-form-item label="用户备注" prop="remark">
          <el-input v-model="formData.remark" placeholder="请输入用户备注" />
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
  getOrderPageApi,
  getOrderApi,
  createOrderApi,
  updateOrderApi,
  deleteOrderApi,
  type OrderVO,
} from '@/api/trade/order';
import { useTable } from '@/hooks/web/useTable';

const { tableObject, tableMethods } = useTable({
  getListApi: getOrderPageApi,
});

// 弹窗状态
const dialogVisible = ref(false);
const dialogTitle = ref('');
const formLoading = ref(false);
const formRef = ref();
const formData = reactive<OrderVO>({
  id: undefined,
  orderNo: undefined,
  userId: undefined,
  totalPrice: undefined,
  status: undefined,
  payTime: undefined,
  remark: undefined,
});

const formRules = {
  orderNo: [{ required: true, message: '订单流水号不能为空', trigger: 'blur' }],
  userId: [{ required: true, message: '买家用户编号不能为空', trigger: 'blur' }],
  totalPrice: [{ required: true, message: '实付总金额(分)不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '订单状态不能为空', trigger: 'blur' }],
};

const openForm = async (type: 'create' | 'update', id?: number) => {
  dialogVisible.value = true;
  dialogTitle.value = type === 'create' ? '新增商城订单' : '修改商城订单';
  resetFormData();
  if (id) {
    formLoading.value = true;
    try {
      const res = await getOrderApi(id);
      Object.assign(formData, res);
    } finally {
      formLoading.value = false;
    }
  }
};

const resetFormData = () => {
  formData.id = undefined;
  formData.orderNo = undefined;
  formData.userId = undefined;
  formData.totalPrice = undefined;
  formData.status = undefined;
  formData.payTime = undefined;
  formData.remark = undefined;
};

const submitForm = async () => {
  if (!formRef.value) return;
  const valid = await formRef.value.validate();
  if (!valid) return;
  formLoading.value = true;
  try {
    if (!formData.id) {
      await createOrderApi(formData);
      ElMessage.success('创建成功');
    } else {
      await updateOrderApi(formData);
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
  await deleteOrderApi(id);
  ElMessage.success('删除成功');
  tableMethods.getList();
};

onMounted(() => {
  tableMethods.getList();
});
</script>
