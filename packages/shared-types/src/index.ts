export interface CommonResult<T = any> {
  code: number;
  data: T;
  msg: string;
}
export enum TerminalEnum {
  PC_ADMIN = 1,
  WECHAT_MINIAPP = 10,
  NATIVE_APP = 20
}
