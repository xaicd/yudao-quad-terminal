package cn.iocoder.yudao.framework.common.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 分页返回结果 POJO
 *
 * @param <T> 数据类型
 */
public class PageResult<T> implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 数据列表
     */
    private List<T> list;

    /**
     * 总记录数
     */
    private Long total;

    public PageResult() {
        this.list = new ArrayList<>();
        this.total = 0L;
    }

    public PageResult(List<T> list, Long total) {
        this.list = list;
        this.total = total;
    }

    public static <T> PageResult<T> empty() {
        return new PageResult<>(new ArrayList<>(), 0L);
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }
}
