package cn.iocoder.yudao.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Yudao-Cloud 后端服务启动入口 (单体集成/微服务聚合模式)
 */
@SpringBootApplication
public class YudaoServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(YudaoServerApplication.class, args);
        System.out.println("=================================================================");
        System.out.println("  (^_^) Yudao-Cloud 后端服务启动成功！统一接口入口: http://localhost:48080");
        System.out.println("  Swagger/Knife4j 接口文档: http://localhost:48080/doc.html");
        System.out.println("=================================================================");
    }
}
