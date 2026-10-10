package cn.iocoder.yudao.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * 平台健康状态与契约探针控制器
 */
@RestController
@RequestMapping("/admin-api/infra")
public class HealthController {

    @GetMapping("/health")
    public Map<String, Object> health() {
        Map<String, Object> result = new HashMap<>();
        result.put("code", 0);
        result.put("msg", "success");
        Map<String, Object> data = new HashMap<>();
        data.put("status", "UP");
        data.put("runtime", System.getProperty("java.version"));
        data.put("platform", "yudao-quad-terminal");
        result.put("data", data);
        return result;
    }
}
