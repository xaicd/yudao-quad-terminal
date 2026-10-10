package cn.iocoder.yudao.framework.common.pojo;

import java.io.Serializable;

/**
 * 分页请求参数基类
 */
public class PageParam implements Serializable {

    private static final long serialVersionUID = 1L;

    private static final Integer PAGE_NO_DEFAULT = 1;
    private static final Integer PAGE_SIZE_DEFAULT = 10;

    /**
     * 页码，从 1 开始
     */
    private Integer pageNo = PAGE_NO_DEFAULT;

    /**
     * 每页条数
     */
    private Integer pageSize = PAGE_SIZE_DEFAULT;

    public Integer getPageNo() {
        return pageNo;
    }

    public void setPageNo(Integer pageNo) {
        this.pageNo = pageNo;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }
}
