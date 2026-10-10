import { request } from '@/utils/request';

export interface OrderVO {
  id?: number;
  orderNo?: string;
  userId?: number;
  totalPrice?: number;
  status?: number;
  payTime?: string;
  remark?: string;
  createTime?: string;
}

export interface OrderPageReqVO {
  pageNo: number;
  pageSize: number;
  orderNo?: string;
  status?: number;
}

// 查询商城订单分页列表
export const getOrderPageApi = (params: OrderPageReqVO) => {
  return request.get({ url: '/admin-api/trade/order/page', params });
};

// 查询商城订单详情
export const getOrderApi = (id: number) => {
  return request.get({ url: '/admin-api/trade/order/get', params: { id } });
};

// 新增商城订单
export const createOrderApi = (data: OrderVO) => {
  return request.post({ url: '/admin-api/trade/order/create', data });
};

// 修改商城订单
export const updateOrderApi = (data: OrderVO) => {
  return request.put({ url: '/admin-api/trade/order/update', data });
};

// 删除商城订单
export const deleteOrderApi = (id: number) => {
  return request.delete({ url: '/admin-api/trade/order/delete', params: { id } });
};
