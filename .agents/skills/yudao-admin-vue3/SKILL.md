---
name: yudao-admin-vue3
description: Yudao-UI-Admin-Vue3 前端运营管理中台研发指南。指导 AI 员工 (门神 FDSE) 基于 Vue 3 + Vite + Element Plus + Pinia 标准规范构建企业级运营后台，严格执行两字操作按钮、权限指令控制、数据字典封装与防抖防遮挡交互准则。
---

# Yudao-UI-Admin-Vue3 运营后台研发法典 (Admin Vue3 Skill)

> **最高法典契约**：PC 管理端是企业运营与掌柜指挥的大脑。界面必须遵循**高信噪比、极简两字按钮、零死穴交互**原则。所有写操作必须加设二次确认浮层与防重复提交，所有敏感按钮必须绑定 `v-hasPermi` 权限指令。

---

## §1 核心目录组织与模块落盘

```
apps/admin/src/
├── api/             # 业务接口定义 (严格从 @yudao-quad-terminal/api-client 派生类型)
├── components/      # 公共组件 (DictSelect, DictTag, FileUpload, ImagePreview)
├── hooks/           # 通用 Hooks (useTable 分页查询, usePermission 权限判断)
├── layout/          # 中台经典布局 (Sidebar 侧边栏, Header 顶栏, TagsView 标签页)
├── router/          # 路由配置 (动态权限路由合并与守卫)
├── store/           # Pinia 状态管理 (user 登录态, permission 菜单权限, app 设置)
├── utils/           # 工具库 (request.ts 请求拦截器, auth.ts Token 缓存)
└── views/           # 业务视图页面 (按微服务模块分目录: system/, infra/, member/, pay/)
```

---

## §2 标准 CURD 页面开发范式 (SOP)

```vue
<template>
  <div class="app-container">
    <!-- 1. 顶部极简搜索表单 -->
    <el-card shadow="never" class="mb-4">
      <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
        <el-form-item label="用户账号" prop="username">
          <el-input v-model="queryParams.username" placeholder="请输入用户账号" clearable @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <dict-select v-model="queryParams.status" dict-type="sys_common_status" placeholder="全部状态" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="Search" @click="handleQuery">查询</el-button>
          <el-button icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 2. 操作工具栏 -->
    <el-card shadow="never">
      <div class="mb-3 flex justify-between">
        <div>
          <el-button type="primary" plain icon="Plus" v-hasPermi="['system:user:create']" @click="openForm('create')">
            新增
          </el-button>
        </div>
      </div>

      <!-- 3. 数据表格 -->
      <el-table v-loading="loading" :data="list">
        <el-table-column label="用户编号" align="center" prop="id" width="100" />
        <el-table-column label="用户账号" align="center" prop="username" />
        <el-table-column label="用户昵称" align="center" prop="nickname" />
        <el-table-column label="状态" align="center" prop="status">
          <template #default="scope">
            <dict-tag dict-type="sys_common_status" :value="scope.row.status" />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="180" />
        <el-table-column label="操作" align="center" width="160">
          <template #default="scope">
            <el-button link type="primary" v-hasPermi="['system:user:update']" @click="openForm('update', scope.row.id)">
              修改
            </el-button>
            <el-button link type="danger" v-hasPermi="['system:user:delete']" @click="handleDelete(scope.row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 4. 底部分页 -->
      <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.pageNo"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
      />
    </el-card>

    <!-- 5. 抽屉/弹窗表单 -->
    <user-form ref="formRef" @success="getList" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getUserPage, deleteUser } from '@/api/system/user';

const loading = ref(false);
const list = ref([]);
const total = ref(0);
const formRef = ref();

const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  username: undefined,
  status: undefined
});

const getList = async () => {
  loading.value = true;
  try {
    const res = await getUserPage(queryParams);
    list.value = res.data.list;
    total.value = res.data.total;
  } finally {
    loading.value = false;
  }
};

const handleQuery = () => {
  queryParams.pageNo = 1;
  getList();
};

const handleDelete = async (id: number) => {
  await ElMessageBox.confirm('确认删除该用户吗？', '提示', { type: 'warning' });
  await deleteUser(id);
  ElMessage.success('删除成功');
  getList();
};

onMounted(() => {
  getList();
});
</script>
```

---

## §3 门神 (FDSE) 研发硬铁律

1. **两字按钮铁律**：核心按钮文案必须极简收敛（【查询】【重置】【新增】【修改】【删除】【导出】【启用】【停用】），杜绝口语化长文案；
2. **防重复点击防抖**：所有异步提交按钮必须加 `loading` 状态绑定，防止网络微卡时连续狂点产生多条脏数据；
3. **敏感权限控制**：写操作按钮必须显式绑定 `v-hasPermi="['xxx:xxx:xxx']"`，无权限人员不得见。
