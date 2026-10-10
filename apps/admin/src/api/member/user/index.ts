import { request } from '@/utils/request';

export interface UserVO {
  id?: number;
  nickname?: string;
  mobile?: string;
  avatar?: string;
  status?: number;
  point?: number;
  createTime?: string;
}

export interface UserPageReqVO {
  pageNo: number;
  pageSize: number;
  nickname?: string;
  mobile?: string;
  status?: number;
}

// 查询会员用户分页列表
export const getUserPageApi = (params: UserPageReqVO) => {
  return request.get({ url: '/admin-api/member/user/page', params });
};

// 查询会员用户详情
export const getUserApi = (id: number) => {
  return request.get({ url: '/admin-api/member/user/get', params: { id } });
};

// 新增会员用户
export const createUserApi = (data: UserVO) => {
  return request.post({ url: '/admin-api/member/user/create', data });
};

// 修改会员用户
export const updateUserApi = (data: UserVO) => {
  return request.put({ url: '/admin-api/member/user/update', data });
};

// 删除会员用户
export const deleteUserApi = (id: number) => {
  return request.delete({ url: '/admin-api/member/user/delete', params: { id } });
};
