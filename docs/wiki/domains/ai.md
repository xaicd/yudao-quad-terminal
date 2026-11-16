# 业务域百科：`ai` · AI 大模型中枢

> **后端模块目录**：`apps/backend/yudao-module-ai` | **Maven Server 构件**：`yudao-module-ai-server`  
> **实测 Java 源码规模**：**226** 个文件 | **强依赖闭包**：`system`

---

## 1. 领域定位与核心能力
基于 JDK 17 + Spring AI 的多模型路由、流式对话、RAG 企业知识库检索、AI 写作与思维导图生成能力。

---

## 2. 四端路由与物理表映射
- **REST API 契约前缀**：`/admin-api/ai/** & /app-api/ai/**`
- **PC 管理端视图目录**：`apps/admin/src/views/ai`
- **代表性物理数据表**：`ai_api_key, ai_model, ai_chat_conversation, ai_chat_message, ai_knowledge, ai_knowledge_document, ai_write, ai_mind_map`

---

## 3. 按需裁剪与上下文检索
```bash
# 极速提取 ai 领域控制器、表结构与前端 API 切片（~150 Tokens）
pnpm ctx:query ai

# 预览仅保留 ai 及其依赖闭包时的模块裁剪计划
pnpm trim:modules --keep system,infra,ai --dry-run
```
