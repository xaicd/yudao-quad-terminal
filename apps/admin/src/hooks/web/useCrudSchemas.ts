import { reactive } from 'vue';

export interface CrudSchema {
  field: string;
  label: string;
  type?: string;
  isSearch?: boolean;
  isTable?: boolean;
  isForm?: boolean;
  dictType?: string;
  form?: {
    component?: string;
    rules?: any[];
    value?: any;
    colProps?: { span: number };
  };
  table?: {
    width?: number | string;
    align?: string;
  };
}

export const useCrudSchemas = (schemas: CrudSchema[]) => {
  const allSchemas = reactive({
    allColumns: schemas,
    tableColumns: schemas.filter((item) => item.isTable !== false),
    searchSchema: schemas.filter((item) => item.isSearch === true),
    formSchema: schemas.filter((item) => item.isForm !== false),
  });

  return {
    allSchemas,
  };
};
