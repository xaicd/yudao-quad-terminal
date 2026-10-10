package cn.iocoder.yudao.framework.common.pojo;

import java.io.Serializable;

/**
 * 通用返回结果 POJO
 *
 * @param <T> 数据类型
 */
public class CommonResult<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 错误码 (0 表示成功)
     */
    private Integer code;

    /**
     * 返回数据
     */
    private T data;

    /**
     * 错误提示，用户可读
     */
    private String msg;

    public CommonResult() {
    }

    public CommonResult(Integer code, T data, String msg) {
        this.code = code;
        this.data = data;
        this.msg = msg;
    }

    public static <T> CommonResult<T> success(T data) {
        return new CommonResult<>(0, data, "success");
    }

    public static <T> CommonResult<T> success() {
        return new CommonResult<>(0, null, "success");
    }

    public static <T> CommonResult<T> error(Integer code, String msg) {
        return new CommonResult<>(code, null, msg);
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
