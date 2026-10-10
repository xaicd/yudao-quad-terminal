import { reactive, ref } from 'vue';

export interface TableOptions {
  getListApi: (params: any) => Promise<any>;
  delListApi?: (id: any) => Promise<any>;
}

export const useTable = (options: TableOptions) => {
  const loading = ref(false);
  const dataList = ref<any[]>([]);
  const total = ref(0);

  const queryParams = reactive({
    pageNo: 1,
    pageSize: 10,
  });

  const getList = async () => {
    try {
      loading.value = true;
      const res = await options.getListApi(queryParams);
      dataList.value = res.list || [];
      total.value = res.total || 0;
    } finally {
      loading.value = false;
    }
  };

  const handleQuery = () => {
    queryParams.pageNo = 1;
    getList();
  };

  const resetQuery = () => {
    queryParams.pageNo = 1;
    getList();
  };

  return {
    tableObject: {
      loading,
      dataList,
      total,
      queryParams,
    },
    tableMethods: {
      getList,
      handleQuery,
      resetQuery,
    },
  };
};
