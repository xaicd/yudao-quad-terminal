# Yudao-Quad-Terminal 全域接口与实体浓缩卡片 (API & Entity Digest)

> **面向 AI Agent 的超轻量上下文指南**：无需逐一阅读大型 Java 或 Vue 源文件，直接参考本摘要或使用 `node scripts/agent-context-compressor.mjs --query <keyword>` 获取精确切片。

## 1. 系统概览 (System Overview)

- **后端微服务/单体控制器总数**: 595 个
- **已暴露 REST 接口总数**: 3088 个
- **实体物理表总数**: 0 张
- **前端 API 包装总数**: 455 个模块

## 2. 后端 RESTful 控制器接口索引

| 控制器 | 基础路径 | 业务名称 | 接口数 | 对应文件 |
|---|---|---|---|---|
| `AiChatConversationController` | `/ai/chat/conversation` | 管理后台 - AI 聊天对话 | 9 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/chat/AiChatConversationController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/chat/AiChatConversationController.java) |
| `AiChatMessageController` | `/ai/chat/message` | 管理后台 - 聊天消息 | 8 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/chat/AiChatMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/chat/AiChatMessageController.java) |
| `AiImageController` | `/ai/image` | 管理后台 - AI 绘画 | 13 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/image/AiImageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/image/AiImageController.java) |
| `AiKnowledgeController` | `/ai/knowledge` | 管理后台 - AI 知识库 | 6 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/knowledge/AiKnowledgeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/knowledge/AiKnowledgeController.java) |
| `AiKnowledgeDocumentController` | `/ai/knowledge/document` | 管理后台 - AI 知识库文档 | 7 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/knowledge/AiKnowledgeDocumentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/knowledge/AiKnowledgeDocumentController.java) |
| `AiKnowledgeSegmentController` | `/ai/knowledge/segment` | 管理后台 - AI 知识库段落 | 9 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/knowledge/AiKnowledgeSegmentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/knowledge/AiKnowledgeSegmentController.java) |
| `AiMindMapController` | `/ai/mind-map` | 管理后台 - AI 思维导图 | 4 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/mindmap/AiMindMapController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/mindmap/AiMindMapController.java) |
| `AiApiKeyController` | `/ai/api-key` | 管理后台 - AI API 密钥 | 6 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/model/AiApiKeyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/model/AiApiKeyController.java) |
| `AiChatRoleController` | `/ai/chat-role` | 管理后台 - AI 聊天角色 | 11 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/model/AiChatRoleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/model/AiChatRoleController.java) |
| `AiModelController` | `/ai/model` | 管理后台 - AI 模型 | 6 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/model/AiModelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/model/AiModelController.java) |
| `AiToolController` | `/ai/tool` | 管理后台 - AI 工具 | 6 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/model/AiToolController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/model/AiToolController.java) |
| `AiMusicController` | `/ai/music` | 管理后台 - AI 音乐 | 9 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/music/AiMusicController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/music/AiMusicController.java) |
| `AiWorkflowController` | `/ai/workflow` | 管理后台 - AI 工作流 | 6 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/workflow/AiWorkflowController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/workflow/AiWorkflowController.java) |
| `AiWriteController` | `/ai/write` | 管理后台 - AI 写作 | 4 | [apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/write/AiWriteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-ai/yudao-module-ai-server/src/main/java/cn/iocoder/yudao/module/ai/controller/admin/write/AiWriteController.java) |
| `BpmCommentController` | `/bpm/comment` | 管理后台 - 流程评论 | 2 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/comment/BpmCommentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/comment/BpmCommentController.java) |
| `BpmCategoryController` | `/bpm/category` | 管理后台 - BPM 流程分类 | 7 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmCategoryController.java) |
| `BpmFormController` | `/bpm/form` | 管理后台 - 动态表单 | 6 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmFormController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmFormController.java) |
| `BpmModelController` | `/bpm/model` | 管理后台 - 流程模型 | 14 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmModelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmModelController.java) |
| `BpmProcessDefinitionController` | `/bpm/process-definition` | 管理后台 - 流程定义 | 4 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmProcessDefinitionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmProcessDefinitionController.java) |
| `BpmProcessExpressionController` | `/bpm/process-expression` | 管理后台 - BPM 流程表达式 | 5 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmProcessExpressionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmProcessExpressionController.java) |
| `BpmProcessListenerController` | `/bpm/process-listener` | 管理后台 - BPM 流程监听器 | 5 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmProcessListenerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmProcessListenerController.java) |
| `BpmUserGroupController` | `/bpm/user-group` | 管理后台 - 用户组 | 6 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmUserGroupController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/definition/BpmUserGroupController.java) |
| `BpmOALeaveController` | `/bpm/oa/leave` | 管理后台 - OA 请假申请 | 3 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/oa/BpmOALeaveController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/oa/BpmOALeaveController.java) |
| `BpmProcessInstanceController` | `/bpm/process-instance` | 管理后台 - 流程实例 | 10 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/task/BpmProcessInstanceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/task/BpmProcessInstanceController.java) |
| `BpmProcessInstanceCopyController` | `/bpm/process-instance/copy` | 管理后台 - 流程实例抄送 | 1 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/task/BpmProcessInstanceCopyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/task/BpmProcessInstanceCopyController.java) |
| `BpmTaskController` | `/bpm/task` | 管理后台 - 流程任务实例 | 15 | [apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/task/BpmTaskController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-bpm/yudao-module-bpm-server/src/main/java/cn/iocoder/yudao/module/bpm/controller/admin/task/BpmTaskController.java) |
| `CrmBusinessController` | `/crm/business` | 管理后台 - CRM 商机 | 13 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/business/CrmBusinessController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/business/CrmBusinessController.java) |
| `CrmBusinessStatusController` | `/crm/business-status` | 管理后台 - CRM 商机状态 | 7 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/business/CrmBusinessStatusController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/business/CrmBusinessStatusController.java) |
| `CrmClueController` | `/crm/clue` | 管理后台 - 线索 | 9 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/clue/CrmClueController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/clue/CrmClueController.java) |
| `CrmContactController` | `/crm/contact` | 管理后台 - CRM 联系人 | 15 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/contact/CrmContactController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/contact/CrmContactController.java) |
| `CrmContractConfigController` | `/crm/contract-config` | 管理后台 - CRM 合同配置 | 2 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/contract/CrmContractConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/contract/CrmContractConfigController.java) |
| `CrmContractController` | `/crm/contract` | 管理后台 - CRM 合同 | 12 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/contract/CrmContractController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/contract/CrmContractController.java) |
| `CrmCustomerController` | `/crm/customer` | 管理后台 - CRM 客户 | 16 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/customer/CrmCustomerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/customer/CrmCustomerController.java) |
| `CrmCustomerLimitConfigController` | `/crm/customer-limit-config` | 管理后台 - CRM 客户限制配置 | 5 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/customer/CrmCustomerLimitConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/customer/CrmCustomerLimitConfigController.java) |
| `CrmCustomerPoolConfigController` | `/crm/customer-pool-config` | 管理后台 - CRM 客户公海配置 | 2 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/customer/CrmCustomerPoolConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/customer/CrmCustomerPoolConfigController.java) |
| `CrmFollowUpRecordController` | `/crm/follow-up-record` | 管理后台 - 跟进记录 | 4 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/followup/CrmFollowUpRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/followup/CrmFollowUpRecordController.java) |
| `CrmOperateLogController` | `/crm/operate-log` | 管理后台 - CRM 操作日志 | 1 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/operatelog/CrmOperateLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/operatelog/CrmOperateLogController.java) |
| `CrmPerformanceConfigController` | `/crm/performance-config` | 管理后台 - CRM 业绩目标设置 | 5 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/performance/CrmPerformanceConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/performance/CrmPerformanceConfigController.java) |
| `CrmPermissionController` | `/crm/permission` | 管理后台 - CRM 数据权限 | 5 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/permission/CrmPermissionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/permission/CrmPermissionController.java) |
| `CrmProductCategoryController` | `/crm/product-category` | 管理后台 - CRM 产品分类 | 5 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/product/CrmProductCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/product/CrmProductCategoryController.java) |
| `CrmProductController` | `/crm/product` | 管理后台 - CRM 产品 | 6 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/product/CrmProductController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/product/CrmProductController.java) |
| `CrmReceivableController` | `/crm/receivable` | 管理后台 - CRM 回款 | 9 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/receivable/CrmReceivableController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/receivable/CrmReceivableController.java) |
| `CrmReceivablePlanController` | `/crm/receivable-plan` | 管理后台 - CRM 回款计划 | 9 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/receivable/CrmReceivablePlanController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/receivable/CrmReceivablePlanController.java) |
| `CrmStatisticsCustomerController` | `/crm/statistics-customer` | 管理后台 - CRM 客户统计 | 12 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsCustomerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsCustomerController.java) |
| `CrmStatisticsFunnelController` | `/crm/statistics-funnel` | 管理后台 - CRM 销售漏斗 | 6 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsFunnelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsFunnelController.java) |
| `CrmStatisticsPerformanceController` | `/crm/statistics-performance` | 管理后台 - CRM 员工业绩统计 | 4 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsPerformanceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsPerformanceController.java) |
| `CrmStatisticsPerformanceTargetController` | `/crm/statistics-performance-target` | 管理后台 - CRM 业绩目标统计 | 1 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsPerformanceTargetController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsPerformanceTargetController.java) |
| `CrmStatisticsPortraitController` | `/crm/statistics-portrait` | 管理后台 - CRM 客户画像 | 4 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsPortraitController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsPortraitController.java) |
| `CrmStatisticsProductController` | `/crm/statistics-product` | 管理后台 - CRM 产品统计 | 2 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsProductController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsProductController.java) |
| `CrmStatisticsRankController` | `/crm/statistics-rank` | 管理后台 - CRM 排行榜统计 | 8 | [apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsRankController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-crm/yudao-module-crm-server/src/main/java/cn/iocoder/yudao/module/crm/controller/admin/statistics/CrmStatisticsRankController.java) |
| `ErpAccountController` | `/erp/account` | 管理后台 - ERP 结算账户 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/finance/ErpAccountController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/finance/ErpAccountController.java) |
| `ErpFinancePaymentController` | `/erp/finance-payment` | 管理后台 - ERP 付款单 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/finance/ErpFinancePaymentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/finance/ErpFinancePaymentController.java) |
| `ErpFinanceReceiptController` | `/erp/finance-receipt` | 管理后台 - ERP 收款单 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/finance/ErpFinanceReceiptController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/finance/ErpFinanceReceiptController.java) |
| `ErpProductCategoryController` | `/erp/product-category` | 管理后台 - ERP 产品分类 | 6 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/product/ErpProductCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/product/ErpProductCategoryController.java) |
| `ErpProductController` | `/erp/product` | 管理后台 - ERP 产品 | 6 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/product/ErpProductController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/product/ErpProductController.java) |
| `ErpProductUnitController` | `/erp/product-unit` | 管理后台 - ERP 产品单位 | 6 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/product/ErpProductUnitController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/product/ErpProductUnitController.java) |
| `ErpPurchaseInController` | `/erp/purchase-in` | 管理后台 - ERP 采购入库 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/purchase/ErpPurchaseInController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/purchase/ErpPurchaseInController.java) |
| `ErpPurchaseOrderController` | `/erp/purchase-order` | 管理后台 - ERP 采购订单 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/purchase/ErpPurchaseOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/purchase/ErpPurchaseOrderController.java) |
| `ErpPurchaseReturnController` | `/erp/purchase-return` | 管理后台 - ERP 采购退货 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/purchase/ErpPurchaseReturnController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/purchase/ErpPurchaseReturnController.java) |
| `ErpSupplierController` | `/erp/supplier` | 管理后台 - ERP 供应商 | 6 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/purchase/ErpSupplierController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/purchase/ErpSupplierController.java) |
| `ErpCustomerController` | `/erp/customer` | 管理后台 - ERP 客户 | 6 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/sale/ErpCustomerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/sale/ErpCustomerController.java) |
| `ErpSaleOrderController` | `/erp/sale-order` | 管理后台 - ERP 销售订单 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/sale/ErpSaleOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/sale/ErpSaleOrderController.java) |
| `ErpSaleOutController` | `/erp/sale-out` | 管理后台 - ERP 销售出库 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/sale/ErpSaleOutController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/sale/ErpSaleOutController.java) |
| `ErpSaleReturnController` | `/erp/sale-return` | 管理后台 - ERP 销售退货 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/sale/ErpSaleReturnController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/sale/ErpSaleReturnController.java) |
| `ErpPurchaseStatisticsController` | `/erp/purchase-statistics` | 管理后台 - ERP 采购统计 | 2 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/statistics/ErpPurchaseStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/statistics/ErpPurchaseStatisticsController.java) |
| `ErpSaleStatisticsController` | `/erp/sale-statistics` | 管理后台 - ERP 销售统计 | 2 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/statistics/ErpSaleStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/statistics/ErpSaleStatisticsController.java) |
| `ErpStockCheckController` | `/erp/stock-check` | 管理后台 - ERP 库存调拨单 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockCheckController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockCheckController.java) |
| `ErpStockController` | `/erp/stock` | 管理后台 - ERP 产品库存 | 4 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockController.java) |
| `ErpStockInController` | `/erp/stock-in` | 管理后台 - ERP 其它入库单 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockInController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockInController.java) |
| `ErpStockMoveController` | `/erp/stock-move` | 管理后台 - ERP 库存调拨单 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockMoveController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockMoveController.java) |
| `ErpStockOutController` | `/erp/stock-out` | 管理后台 - ERP 其它出库单 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockOutController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockOutController.java) |
| `ErpStockRecordController` | `/erp/stock-record` | 管理后台 - ERP 产品库存明细 | 3 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpStockRecordController.java) |
| `ErpWarehouseController` | `/erp/warehouse` | 管理后台 - ERP 仓库 | 7 | [apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpWarehouseController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-erp/yudao-module-erp-server/src/main/java/cn/iocoder/yudao/module/erp/controller/admin/stock/ErpWarehouseController.java) |
| `FmsClosingPeriodController` | `/fms/closing/period` | 管理后台 - FMS 结账期间 | 4 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/closing/FmsClosingPeriodController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/closing/FmsClosingPeriodController.java) |
| `FmsClosingSchemeController` | `/fms/closing/scheme` | 管理后台 - FMS 结账方案 | 6 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/closing/FmsClosingSchemeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/closing/FmsClosingSchemeController.java) |
| `FmsClosingTemplateController` | `/fms/closing/template` | 管理后台 - FMS 结账模板 | 4 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/closing/FmsClosingTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/closing/FmsClosingTemplateController.java) |
| `FmsClosingVoucherController` | `/fms/closing/voucher` | 管理后台 - FMS 结转凭证 | 3 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/closing/FmsClosingVoucherController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/closing/FmsClosingVoucherController.java) |
| `FmsAccountSetController` | `/fms/config/account-set` | 管理后台 - FMS 账套 | 5 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsAccountSetController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsAccountSetController.java) |
| `FmsAccountUserController` | `/fms/config/account-user` | 管理后台 - FMS 账套用户 | 3 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsAccountUserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsAccountUserController.java) |
| `FmsAuxiliaryItemController` | `/fms/config/auxiliary-item` | 管理后台 - FMS 辅助核算项目 | 9 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsAuxiliaryItemController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsAuxiliaryItemController.java) |
| `FmsAuxiliaryTypeController` | `/fms/config/auxiliary-type` | 管理后台 - FMS 辅助核算类别 | 5 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsAuxiliaryTypeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsAuxiliaryTypeController.java) |
| `FmsCurrencyController` | `/fms/config/currency` | 管理后台 - FMS 币别 | 5 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsCurrencyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsCurrencyController.java) |
| `FmsDigestController` | `/fms/config/digest` | 管理后台 - FMS 常用摘要 | 5 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsDigestController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsDigestController.java) |
| `FmsFinanceIndicatorController` | `/fms/config/finance-indicator` | 管理后台 - FMS 财务指标 | 5 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsFinanceIndicatorController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsFinanceIndicatorController.java) |
| `FmsFinanceParameterController` | `/fms/config/finance-parameter` | 管理后台 - FMS 财务参数 | 2 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsFinanceParameterController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsFinanceParameterController.java) |
| `FmsInitialBalanceController` | `/fms/config/initial-balance` | 管理后台 - FMS 初始余额 | 4 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsInitialBalanceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsInitialBalanceController.java) |
| `FmsSubjectController` | `/fms/config/subject` | 管理后台 - FMS 会计科目 | 9 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsSubjectController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsSubjectController.java) |
| `FmsVoucherTemplateCategoryController` | `/fms/config/voucher-template-category` | 管理后台 - FMS 凭证模板分类 | 5 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsVoucherTemplateCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsVoucherTemplateCategoryController.java) |
| `FmsVoucherTemplateController` | `/fms/config/voucher-template` | 管理后台 - FMS 凭证模板 | 5 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsVoucherTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsVoucherTemplateController.java) |
| `FmsVoucherWordController` | `/fms/config/voucher-word` | 管理后台 - FMS 凭证字 | 5 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsVoucherWordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/config/FmsVoucherWordController.java) |
| `FmsHomeController` | `/fms/home` | 管理后台 - FMS 首页 | 2 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/home/FmsHomeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/home/FmsHomeController.java) |
| `FmsLedgerController` | `/fms/ledger` | 管理后台 - FMS 账簿 | 10 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/ledger/FmsLedgerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/ledger/FmsLedgerController.java) |
| `FmsBalanceSheetController` | `/fms/report/balance-sheet` | 管理后台 - FMS 资产负债表 | 3 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/report/FmsBalanceSheetController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/report/FmsBalanceSheetController.java) |
| `FmsCashFlowStatementController` | `/fms/report/cash-flow-statement` | 管理后台 - FMS 现金流量表 | 6 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/report/FmsCashFlowStatementController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/report/FmsCashFlowStatementController.java) |
| `FmsIncomeStatementController` | `/fms/report/income-statement` | 管理后台 - FMS 利润表 | 3 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/report/FmsIncomeStatementController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/report/FmsIncomeStatementController.java) |
| `FmsVoucherController` | `/fms/voucher` | 管理后台 - FMS 凭证 | 15 | [apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/voucher/FmsVoucherController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-fms/yudao-module-fms-server/src/main/java/cn/iocoder/yudao/module/fms/controller/admin/voucher/FmsVoucherController.java) |
| `HrmAttendanceClockController` | `/hrm/attendance/clock` | 管理后台 - HRM 打卡记录 | 8 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceClockController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceClockController.java) |
| `HrmAttendanceGroupController` | `/hrm/attendance/group` | 管理后台 - HRM 考勤组 | 7 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceGroupController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceGroupController.java) |
| `HrmAttendanceHolidayController` | `/hrm/attendance/holiday` | 管理后台 - HRM 考勤节假日 | 6 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceHolidayController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceHolidayController.java) |
| `HrmAttendanceLeaveController` | `/hrm/attendance/leave` | 管理后台 - HRM 请假 | 3 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceLeaveController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceLeaveController.java) |
| `HrmAttendanceStatisticsController` | `/hrm/attendance/statistics` | 管理后台 - HRM 考勤统计 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/attendance/HrmAttendanceStatisticsController.java) |
| `HrmEmployeeCertificateController` | `/hrm/employee/certificate` | 管理后台 - HRM 员工证书 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeCertificateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeCertificateController.java) |
| `HrmEmployeeChangeRecordController` | `/hrm/employee/change-record` | 管理后台 - HRM 员工异动记录 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeChangeRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeChangeRecordController.java) |
| `HrmEmployeeContactController` | `/hrm/employee/contact` | 管理后台 - HRM 员工联系人 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeContactController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeContactController.java) |
| `HrmEmployeeContractController` | `/hrm/employee/contract` | 管理后台 - HRM 员工合同 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeContractController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeContractController.java) |
| `HrmEmployeeController` | `/hrm/employee` | 管理后台 - HRM 员工档案 | 23 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeController.java) |
| `HrmEmployeeEducationExperienceController` | `/hrm/employee/education-experience` | 管理后台 - HRM 员工教育经历 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeEducationExperienceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeEducationExperienceController.java) |
| `HrmEmployeeFieldConfigController` | `/hrm/employee/config` | 管理后台 - HRM 员工字段配置 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeFieldConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeFieldConfigController.java) |
| `HrmEmployeeFileController` | `/hrm/employee/file` | 管理后台 - HRM 员工材料附件 | 2 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeFileController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeFileController.java) |
| `HrmEmployeePersonalNoteController` | `/hrm/employee/personal-note` | 管理后台 - HRM 员工个人备忘 | 2 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeePersonalNoteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeePersonalNoteController.java) |
| `HrmEmployeeQuitInfoController` | `/hrm/employee/quit-info` | 管理后台 - HRM 员工离职信息 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeQuitInfoController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeQuitInfoController.java) |
| `HrmEmployeeSalaryCardController` | `/hrm/employee/salary-card` | 管理后台 - HRM 员工工资卡 | 3 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeSalaryCardController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeSalaryCardController.java) |
| `HrmEmployeeTrainingExperienceController` | `/hrm/employee/training-experience` | 管理后台 - HRM 员工培训经历 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeTrainingExperienceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeTrainingExperienceController.java) |
| `HrmEmployeeWorkExperienceController` | `/hrm/employee/work-experience` | 管理后台 - HRM 员工工作经历 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeWorkExperienceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/employee/HrmEmployeeWorkExperienceController.java) |
| `HrmHomeController` | `/hrm/home` | 管理后台 - HRM 首页 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/home/HrmHomeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/home/HrmHomeController.java) |
| `HrmInsuranceEmployeeInfoController` | `/hrm/insurance/employee-info` | 管理后台 - HRM 员工参保信息 | 3 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceEmployeeInfoController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceEmployeeInfoController.java) |
| `HrmInsuranceMonthEmployeeRecordController` | `/hrm/insurance/month-employee-record` | 管理后台 - HRM 员工月度社保 | 6 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceMonthEmployeeRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceMonthEmployeeRecordController.java) |
| `HrmInsuranceMonthRecordController` | `/hrm/insurance/month-record` | 管理后台 - HRM 月度社保表 | 6 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceMonthRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceMonthRecordController.java) |
| `HrmInsuranceSchemeController` | `/hrm/insurance/scheme` | 管理后台 - HRM 社保方案 | 6 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceSchemeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceSchemeController.java) |
| `HrmInsuranceStandardController` | `/hrm/insurance/standard` | 管理后台 - HRM 标准参保数据 | 2 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceStandardController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/insurance/HrmInsuranceStandardController.java) |
| `HrmOperateLogController` | `/hrm/operate-log` | 管理后台 - HRM 操作日志 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/operatelog/HrmOperateLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/operatelog/HrmOperateLogController.java) |
| `HrmPerformanceAssessmentController` | `/hrm/performance/assessment` | 管理后台 - HRM 员工绩效考核 | 13 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/performance/HrmPerformanceAssessmentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/performance/HrmPerformanceAssessmentController.java) |
| `HrmPerformanceAssessmentTemplateController` | `/hrm/performance/assessment-template` | 管理后台 - HRM 绩效考核模板 | 7 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/performance/HrmPerformanceAssessmentTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/performance/HrmPerformanceAssessmentTemplateController.java) |
| `HrmPerformancePlanController` | `/hrm/performance/plan` | 管理后台 - HRM 绩效计划 | 12 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/performance/HrmPerformancePlanController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/performance/HrmPerformancePlanController.java) |
| `HrmPerformanceResultTemplateController` | `/hrm/performance/result-template` | 管理后台 - HRM 绩效结果模板 | 7 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/performance/HrmPerformanceResultTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/performance/HrmPerformanceResultTemplateController.java) |
| `HrmPortalAttendanceClockController` | `/hrm/portal/attendance/clock` | 管理后台 - HRM 员工端考勤打卡 | 3 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/attendance/HrmPortalAttendanceClockController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/attendance/HrmPortalAttendanceClockController.java) |
| `HrmPortalAttendanceLeaveController` | `/hrm/portal/attendance/leave` | 管理后台 - HRM 员工端请假 | 3 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/attendance/HrmPortalAttendanceLeaveController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/attendance/HrmPortalAttendanceLeaveController.java) |
| `HrmPortalAttendanceStatisticsController` | `/hrm/portal/attendance/statistics` | 管理后台 - HRM 员工端考勤统计 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/attendance/HrmPortalAttendanceStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/attendance/HrmPortalAttendanceStatisticsController.java) |
| `HrmPortalEmployeeCertificateController` | `/hrm/portal/employee/certificate` | 管理后台 - HRM 员工端证书 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeCertificateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeCertificateController.java) |
| `HrmPortalEmployeeContactController` | `/hrm/portal/employee/contact` | 管理后台 - HRM 员工端联系人 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeContactController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeContactController.java) |
| `HrmPortalEmployeeController` | `/hrm/portal/employee` | 管理后台 - HRM 员工端档案 | 3 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeController.java) |
| `HrmPortalEmployeeEducationExperienceController` | `/hrm/portal/employee/education-experience` | 管理后台 - HRM 员工端教育经历 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeEducationExperienceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeEducationExperienceController.java) |
| `HrmPortalEmployeeFieldConfigController` | `/hrm/portal/employee/field-config` | 管理后台 - HRM 员工端档案字段配置 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeFieldConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeFieldConfigController.java) |
| `HrmPortalEmployeeQuitInfoController` | `/hrm/portal/employee/quit-info` | 管理后台 - HRM 员工端离职信息 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeQuitInfoController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeQuitInfoController.java) |
| `HrmPortalEmployeeTrainingExperienceController` | `/hrm/portal/employee/training-experience` | 管理后台 - HRM 员工端培训经历 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeTrainingExperienceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeTrainingExperienceController.java) |
| `HrmPortalEmployeeWorkExperienceController` | `/hrm/portal/employee/work-experience` | 管理后台 - HRM 员工端工作经历 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeWorkExperienceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/employee/HrmPortalEmployeeWorkExperienceController.java) |
| `HrmPortalHomeController` | `/hrm/portal/home` | 管理后台 - HRM 员工端首页 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/home/HrmPortalHomeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/home/HrmPortalHomeController.java) |
| `HrmPortalInsuranceController` | `/hrm/portal/insurance/record` | 管理后台 - HRM 员工端社保 | 2 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/insurance/HrmPortalInsuranceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/insurance/HrmPortalInsuranceController.java) |
| `HrmPortalPerformanceAssessmentController` | `/hrm/portal/performance/assessment` | 管理后台 - HRM 员工端绩效考核 | 19 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/performance/HrmPortalPerformanceAssessmentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/performance/HrmPortalPerformanceAssessmentController.java) |
| `HrmPortalSalarySlipController` | `/hrm/portal/salary/slip` | 管理后台 - HRM 员工端工资条 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/salary/HrmPortalSalarySlipController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/portal/salary/HrmPortalSalarySlipController.java) |
| `HrmRecruitCandidateController` | `/hrm/recruit/candidate` | 管理后台 - HRM 招聘候选人 | 12 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitCandidateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitCandidateController.java) |
| `HrmRecruitChannelController` | `/hrm/recruit/channel` | 管理后台 - HRM 招聘渠道 | 7 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitChannelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitChannelController.java) |
| `HrmRecruitConfigController` | `/hrm/recruit/config` | 管理后台 - HRM 招聘设置 | 2 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitConfigController.java) |
| `HrmRecruitInterviewController` | `/hrm/recruit/interview` | 管理后台 - HRM 招聘面试 | 6 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitInterviewController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitInterviewController.java) |
| `HrmRecruitPostController` | `/hrm/recruit/post` | 管理后台 - HRM 招聘职位 | 7 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitPostController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitPostController.java) |
| `HrmRecruitPostTypeController` | `/hrm/recruit/post-type` | 管理后台 - HRM 招聘职位类型 | 1 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitPostTypeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/recruit/HrmRecruitPostTypeController.java) |
| `HrmSalaryChangeRecordController` | `/hrm/salary/change-record` | 管理后台 - HRM 定薪/调薪记录 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryChangeRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryChangeRecordController.java) |
| `HrmSalaryChangeTemplateController` | `/hrm/salary/change-template` | 管理后台 - HRM 调薪模板 | 5 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryChangeTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryChangeTemplateController.java) |
| `HrmSalaryConfigController` | `/hrm/salary/config` | 管理后台 - HRM 薪资配置 | 3 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryConfigController.java) |
| `HrmSalaryEmployeeInfoController` | `/hrm/salary/employee-info` | 管理后台 - HRM 员工薪资信息 | 7 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryEmployeeInfoController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryEmployeeInfoController.java) |
| `HrmSalaryGroupController` | `/hrm/salary/group` | 管理后台 - HRM 薪资组 | 6 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryGroupController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryGroupController.java) |
| `HrmSalaryMonthEmployeeRecordController` | `/hrm/salary/month-employee-record` | 管理后台 - HRM 员工月度工资 | 4 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryMonthEmployeeRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryMonthEmployeeRecordController.java) |
| `HrmSalaryMonthRecordController` | `/hrm/salary/month-record` | 管理后台 - HRM 月度工资表 | 9 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryMonthRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryMonthRecordController.java) |
| `HrmSalaryOptionController` | `/hrm/salary/option` | 管理后台 - HRM 薪资项 | 7 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryOptionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryOptionController.java) |
| `HrmSalarySlipController` | `/hrm/salary/slip` | 管理后台 - HRM 工资条 | 3 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalarySlipController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalarySlipController.java) |
| `HrmSalarySlipSendRecordController` | `/hrm/salary/slip-send-record` | 管理后台 - HRM 工资条发放记录 | 5 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalarySlipSendRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalarySlipSendRecordController.java) |
| `HrmSalarySlipTemplateController` | `/hrm/salary/slip-template` | 管理后台 - HRM 工资条模板 | 5 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalarySlipTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalarySlipTemplateController.java) |
| `HrmSalaryTaxRuleController` | `/hrm/salary/tax-rule` | 管理后台 - HRM 计税规则 | 5 | [apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryTaxRuleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-hrm/yudao-module-hrm-server/src/main/java/cn/iocoder/yudao/module/hrm/controller/admin/salary/HrmSalaryTaxRuleController.java) |
| `ImChannelMaterialController` | `/im/channel/material` | 用户 APP - IM 频道素材 | 1 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/channel/ImChannelMaterialController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/channel/ImChannelMaterialController.java) |
| `ImConversationReadController` | `/im/conversation-read` | 管理后台 - IM 会话读位置 | 1 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/conversation/ImConversationReadController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/conversation/ImConversationReadController.java) |
| `ImFacePackController` | `/im/face-pack` | 管理后台 - IM 表情包 | 1 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/face/ImFacePackController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/face/ImFacePackController.java) |
| `ImFaceUserItemController` | `/im/face-user-item` | 管理后台 - IM 个人表情 | 3 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/face/ImFaceUserItemController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/face/ImFaceUserItemController.java) |
| `ImFriendController` | `/im/friend` | 管理后台 - IM 好友 | 7 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/friend/ImFriendController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/friend/ImFriendController.java) |
| `ImFriendRequestController` | `/im/friend-request` | 管理后台 - IM 好友申请 | 6 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/friend/ImFriendRequestController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/friend/ImFriendRequestController.java) |
| `ImGroupController` | `/im/group` | 管理后台 - 群 | 16 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/group/ImGroupController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/group/ImGroupController.java) |
| `ImGroupMemberController` | `/im/group-member` | 管理后台 - 群成员 | 3 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/group/ImGroupMemberController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/group/ImGroupMemberController.java) |
| `ImGroupRequestController` | `/im/group-request` | 管理后台 - IM 加群申请 | 7 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/group/ImGroupRequestController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/group/ImGroupRequestController.java) |
| `ImChannelManagerController` | `/im/manager/channel` | 管理后台 - IM 频道 | 6 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/channel/ImChannelManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/channel/ImChannelManagerController.java) |
| `ImChannelMaterialManagerController` | `/im/manager/channel-material` | 管理后台 - IM 频道素材 | 6 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/channel/ImChannelMaterialManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/channel/ImChannelMaterialManagerController.java) |
| `ImFacePackItemManagerController` | `/im/manager/face-pack-item` | 管理后台 - IM 表情包项 | 6 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/face/ImFacePackItemManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/face/ImFacePackItemManagerController.java) |
| `ImFacePackManagerController` | `/im/manager/face-pack` | 管理后台 - IM 表情包 | 6 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/face/ImFacePackManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/face/ImFacePackManagerController.java) |
| `ImFaceUserItemManagerController` | `/im/manager/face-user-item` | 管理后台 - IM 用户表情 | 2 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/face/ImFaceUserItemManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/face/ImFaceUserItemManagerController.java) |
| `ImFriendManagerController` | `/im/manager/friend` | 管理后台 - IM 好友管理 | 1 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/friend/ImFriendManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/friend/ImFriendManagerController.java) |
| `ImFriendRequestManagerController` | `/im/manager/friend-request` | 管理后台 - IM 好友申请管理 | 1 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/friend/ImFriendRequestManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/friend/ImFriendRequestManagerController.java) |
| `ImGroupManagerController` | `/im/manager/group` | 管理后台 - IM 群聊管理 | 5 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/group/ImGroupManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/group/ImGroupManagerController.java) |
| `ImGroupMemberManagerController` | `/im/manager/group/member` | 管理后台 - IM 群成员管理 | 1 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/group/ImGroupMemberManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/group/ImGroupMemberManagerController.java) |
| `ImGroupRequestManagerController` | `/im/manager/group-request` | 管理后台 - IM 加群申请管理 | 1 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/group/ImGroupRequestManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/group/ImGroupRequestManagerController.java) |
| `ImChannelMessageManagerController` | `/im/manager/channel-message` | 管理后台 - IM 频道消息 | 4 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/message/ImChannelMessageManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/message/ImChannelMessageManagerController.java) |
| `ImGroupMessageManagerController` | `/im/manager/message/group` | 管理后台 - IM 群聊消息 | 2 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/message/ImGroupMessageManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/message/ImGroupMessageManagerController.java) |
| `ImPrivateMessageManagerController` | `/im/manager/message/private` | 管理后台 - IM 私聊消息 | 2 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/message/ImPrivateMessageManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/message/ImPrivateMessageManagerController.java) |
| `ImRtcCallManagerController` | `/im/manager/rtc` | 管理后台 - IM 通话记录 | 3 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/rtc/ImRtcCallManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/rtc/ImRtcCallManagerController.java) |
| `ImSensitiveWordManagerController` | `/im/manager/sensitive-word` | 管理后台 - IM 敏感词 | 6 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/sensitiveword/ImSensitiveWordManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/sensitiveword/ImSensitiveWordManagerController.java) |
| `ImStatisticsManagerController` | `/im/manager/statistics` | 管理后台 - IM 数据看板 | 6 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/statistics/ImStatisticsManagerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/manager/statistics/ImStatisticsManagerController.java) |
| `ImChannelMessageController` | `/im/channel/message` | 用户 APP - IM 频道消息 | 2 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/message/ImChannelMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/message/ImChannelMessageController.java) |
| `ImGroupMessageController` | `/im/message/group` | 管理后台 - IM 群聊消息 | 6 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/message/ImGroupMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/message/ImGroupMessageController.java) |
| `ImPrivateMessageController` | `/im/message/private` | 管理后台 - IM 私聊消息 | 6 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/message/ImPrivateMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/message/ImPrivateMessageController.java) |
| `ImRtcCallController` | `/im/rtc` | 管理后台 - IM 实时通话 | 9 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/rtc/ImRtcCallController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/rtc/ImRtcCallController.java) |
| `ImRtcLiveKitController` | `/im/livekit` | LiveKit Webhook 回调 | 1 | [apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/rtc/ImRtcLiveKitController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-im/yudao-module-im-server/src/main/java/cn/iocoder/yudao/module/im/controller/admin/rtc/ImRtcLiveKitController.java) |
| `CodegenController` | `/infra/codegen` | 管理后台 - 代码生成器 | 10 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/codegen/CodegenController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/codegen/CodegenController.java) |
| `ConfigController` | `/infra/config` | 管理后台 - 参数配置 | 7 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/config/ConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/config/ConfigController.java) |
| `DataSourceConfigController` | `/infra/data-source-config` | 管理后台 - 数据源配置 | 6 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/db/DataSourceConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/db/DataSourceConfigController.java) |
| `Demo01ContactController` | `/infra/demo01-contact` | 管理后台 - 示例联系人 | 6 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo01/Demo01ContactController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo01/Demo01ContactController.java) |
| `Demo02CategoryController` | `/infra/demo02-category` | 管理后台 - 示例分类 | 5 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo02/Demo02CategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo02/Demo02CategoryController.java) |
| `Demo03StudentErpController` | `/infra/demo03-student-erp` | 管理后台 - 学生 | 18 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo03/erp/Demo03StudentErpController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo03/erp/Demo03StudentErpController.java) |
| `Demo03StudentInnerController` | `/infra/demo03-student-inner` | 管理后台 - 学生 | 8 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo03/inner/Demo03StudentInnerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo03/inner/Demo03StudentInnerController.java) |
| `Demo03StudentNormalController` | `/infra/demo03-student-normal` | 管理后台 - 学生 | 8 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo03/normal/Demo03StudentNormalController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/demo/demo03/normal/Demo03StudentNormalController.java) |
| `FileConfigController` | `/infra/file-config` | 管理后台 - 文件配置 | 7 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/file/FileConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/file/FileConfigController.java) |
| `FileController` | `/infra/file` | 管理后台 - 文件存储 | 5 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/file/FileController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/file/FileController.java) |
| `ApiAccessLogController` | `/infra/api-access-log` | 管理后台 - API 访问日志 | 2 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/logger/ApiAccessLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/logger/ApiAccessLogController.java) |
| `ApiErrorLogController` | `/infra/api-error-log` | 管理后台 - API 错误日志 | 3 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/logger/ApiErrorLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/logger/ApiErrorLogController.java) |
| `RedisController` | `/infra/redis` | 管理后台 - Redis 监控 | 1 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/redis/RedisController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/admin/redis/RedisController.java) |
| `AppFileController` | `/infra/file` | 用户 App - 文件存储 | 2 | [apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/app/file/AppFileController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-infra/yudao-module-infra-server/src/main/java/cn/iocoder/yudao/module/infra/controller/app/file/AppFileController.java) |
| `IotAlertConfigController` | `/iot/alert-config` | 管理后台 - IoT 告警配置 | 6 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/alert/IotAlertConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/alert/IotAlertConfigController.java) |
| `IotAlertRecordController` | `/iot/alert-record` | 管理后台 - IoT 告警记录 | 3 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/alert/IotAlertRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/alert/IotAlertRecordController.java) |
| `IotDeviceController` | `/iot/device` | 管理后台 - IoT 设备 | 16 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceController.java) |
| `IotDeviceGroupController` | `/iot/device-group` | 管理后台 - IoT 设备分组 | 6 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceGroupController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceGroupController.java) |
| `IotDeviceMessageController` | `/iot/device/message` | 管理后台 - IoT 设备消息 | 3 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceMessageController.java) |
| `IotDeviceModbusConfigController` | `/iot/device-modbus-config` | 管理后台 - IoT 设备 Modbus 连接配置 | 2 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceModbusConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceModbusConfigController.java) |
| `IotDeviceModbusPointController` | `/iot/device-modbus-point` | 管理后台 - IoT 设备 Modbus 点位配置 | 5 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceModbusPointController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDeviceModbusPointController.java) |
| `IotDevicePropertyController` | `/iot/device/property` | 管理后台 - IoT 设备属性 | 2 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDevicePropertyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/device/IotDevicePropertyController.java) |
| `IotOtaFirmwareController` | `/iot/ota/firmware` | 管理后台 - IoT OTA 固件 | 5 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/ota/IotOtaFirmwareController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/ota/IotOtaFirmwareController.java) |
| `IotOtaTaskController` | `/iot/ota/task` | 管理后台 - IoT OTA 升级任务 | 4 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/ota/IotOtaTaskController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/ota/IotOtaTaskController.java) |
| `IotOtaTaskRecordController` | `/iot/ota/task/record` | 管理后台 - IoT OTA 升级任务记录 | 3 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/ota/IotOtaTaskRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/ota/IotOtaTaskRecordController.java) |
| `IotProductCategoryController` | `/iot/product-category` | 管理后台 - IoT 产品分类 | 6 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/product/IotProductCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/product/IotProductCategoryController.java) |
| `IotProductController` | `/iot/product` | 管理后台 - IoT 产品 | 9 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/product/IotProductController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/product/IotProductController.java) |
| `IotDataRuleController` | `/iot/data-rule` | 管理后台 - IoT 数据流转规则 | 5 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/rule/IotDataRuleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/rule/IotDataRuleController.java) |
| `IotDataSinkController` | `/iot/data-sink` | 管理后台 - IoT 数据流转目的 | 6 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/rule/IotDataSinkController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/rule/IotDataSinkController.java) |
| `IotSceneRuleController` | `/iot/scene-rule` | 管理后台 - IoT 场景联动 | 7 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/rule/IotSceneRuleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/rule/IotSceneRuleController.java) |
| `IotStatisticsController` | `/iot/statistics` | 管理后台 - IoT 数据统计 | 2 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/statistics/IotStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/statistics/IotStatisticsController.java) |
| `IotThingModelController` | `/iot/thing-model` | 管理后台 - IoT 产品物模型 | 7 | [apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/thingmodel/IotThingModelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-iot/yudao-module-iot-server/src/main/java/cn/iocoder/yudao/module/iot/controller/admin/thingmodel/IotThingModelController.java) |
| `ProductBrandController` | `/product/brand` | 管理后台 - 商品品牌 | 7 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/brand/ProductBrandController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/brand/ProductBrandController.java) |
| `ProductCategoryController` | `/product/category` | 管理后台 - 商品分类 | 5 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/category/ProductCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/category/ProductCategoryController.java) |
| `ProductCommentController` | `/product/comment` | 管理后台 - 商品评价 | 5 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/comment/ProductCommentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/comment/ProductCommentController.java) |
| `ProductFavoriteController` | `/product/favorite` | 管理后台 - 商品收藏 | 1 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/favorite/ProductFavoriteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/favorite/ProductFavoriteController.java) |
| `ProductBrowseHistoryController` | `/product/browse-history` | 管理后台 - 商品浏览记录 | 1 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/history/ProductBrowseHistoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/history/ProductBrowseHistoryController.java) |
| `ProductPropertyController` | `/product/property` | 管理后台 - 商品属性项 | 6 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/property/ProductPropertyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/property/ProductPropertyController.java) |
| `ProductPropertyValueController` | `/product/property/value` | 管理后台 - 商品属性值 | 6 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/property/ProductPropertyValueController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/property/ProductPropertyValueController.java) |
| `ProductSpuController` | `/product/spu` | 管理后台 - 商品 SPU | 8 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/spu/ProductSpuController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/admin/spu/ProductSpuController.java) |
| `AppCategoryController` | `/product/category` | 用户 APP - 商品分类 | 2 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/category/AppCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/category/AppCategoryController.java) |
| `AppProductCommentController` | `/product/comment` | 用户 APP - 商品评价 | 1 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/comment/AppProductCommentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/comment/AppProductCommentController.java) |
| `AppFavoriteController` | `/product/favorite` | 用户 APP - 商品收藏 | 5 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/favorite/AppFavoriteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/favorite/AppFavoriteController.java) |
| `AppProductBrowseHistoryController` | `/product/browse-history` | 用户 APP - 商品浏览记录 | 3 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/history/AppProductBrowseHistoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/history/AppProductBrowseHistoryController.java) |
| `AppProductSpuController` | `/product/spu` | 用户 APP - 商品 SPU | 3 | [apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/spu/AppProductSpuController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-product-server/src/main/java/cn/iocoder/yudao/module/product/controller/app/spu/AppProductSpuController.java) |
| `ArticleCategoryController` | `/promotion/article-category` | 管理后台 - 文章分类 | 6 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/article/ArticleCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/article/ArticleCategoryController.java) |
| `ArticleController` | `/promotion/article` | 管理后台 - 文章管理 | 5 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/article/ArticleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/article/ArticleController.java) |
| `BannerController` | `/promotion/banner` | 管理后台 - Banner 管理 | 5 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/banner/BannerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/banner/BannerController.java) |
| `BargainActivityController` | `/promotion/bargain-activity` | 管理后台 - 砍价活动 | 6 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/bargain/BargainActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/bargain/BargainActivityController.java) |
| `BargainHelpController` | `/promotion/bargain-help` | 管理后台 - 砍价助力 | 1 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/bargain/BargainHelpController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/bargain/BargainHelpController.java) |
| `BargainRecordController` | `/promotion/bargain-record` | 管理后台 - 砍价记录 | 1 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/bargain/BargainRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/bargain/BargainRecordController.java) |
| `CombinationActivityController` | `/promotion/combination-activity` | 管理后台 - 拼团活动 | 7 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/combination/CombinationActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/combination/CombinationActivityController.java) |
| `CombinationRecordController` | `/promotion/combination-record` | 管理后台 - 拼团记录 | 2 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/combination/CombinationRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/combination/CombinationRecordController.java) |
| `CouponController` | `/promotion/coupon` | 管理后台 - 优惠劵 | 4 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/coupon/CouponController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/coupon/CouponController.java) |
| `CouponTemplateController` | `/promotion/coupon-template` | 管理后台 - 优惠劵模板 | 7 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/coupon/CouponTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/coupon/CouponTemplateController.java) |
| `DiscountActivityController` | `/promotion/discount-activity` | 管理后台 - 限时折扣活动 | 6 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/discount/DiscountActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/discount/DiscountActivityController.java) |
| `DiyPageController` | `/promotion/diy-page` | 管理后台 - 装修页面 | 8 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/diy/DiyPageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/diy/DiyPageController.java) |
| `DiyTemplateController` | `/promotion/diy-template` | 管理后台 - 装修模板 | 8 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/diy/DiyTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/diy/DiyTemplateController.java) |
| `KeFuConversationController` | `/promotion/kefu-conversation` | 管理后台 - 客服会话 | 4 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/kefu/KeFuConversationController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/kefu/KeFuConversationController.java) |
| `KeFuMessageController` | `/promotion/kefu-message` | 管理后台 - 客服消息 | 3 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/kefu/KeFuMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/kefu/KeFuMessageController.java) |
| `PointActivityController` | `/promotion/point-activity` | 管理后台 - 积分商城活动 | 7 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/point/PointActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/point/PointActivityController.java) |
| `RewardActivityController` | `/promotion/reward-activity` | 管理后台 - 满减送活动 | 6 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/reward/RewardActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/reward/RewardActivityController.java) |
| `SeckillActivityController` | `/promotion/seckill-activity` | 管理后台 - 秒杀活动 | 7 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/seckill/SeckillActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/seckill/SeckillActivityController.java) |
| `SeckillConfigController` | `/promotion/seckill-config` | 管理后台 - 秒杀时段 | 8 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/seckill/SeckillConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/admin/seckill/SeckillConfigController.java) |
| `AppActivityController` | `/promotion/activity` | 用户 APP - 营销活动 | 1 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/activity/AppActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/activity/AppActivityController.java) |
| `AppArticleCategoryController` | `/promotion/article-category` | 用户 APP - 文章分类 | 0 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/article/AppArticleCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/article/AppArticleCategoryController.java) |
| `AppArticleController` | `/promotion/article` | 用户 APP - 文章 | 1 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/article/AppArticleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/article/AppArticleController.java) |
| `AppBannerController` | `/promotion/banner` | 用户 APP - 首页 Banner | 2 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/banner/AppBannerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/banner/AppBannerController.java) |
| `AppBargainActivityController` | `/promotion/bargain-activity` | 用户 App - 砍价活动 | 3 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/bargain/AppBargainActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/bargain/AppBargainActivityController.java) |
| `AppBargainHelpController` | `/promotion/bargain-help` | 用户 App - 砍价助力 | 2 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/bargain/AppBargainHelpController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/bargain/AppBargainHelpController.java) |
| `AppBargainRecordController` | `/promotion/bargain-record` | 用户 App - 砍价记录 | 4 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/bargain/AppBargainRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/bargain/AppBargainRecordController.java) |
| `AppCombinationActivityController` | `/promotion/combination-activity` | 用户 APP - 拼团活动 | 3 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/combination/AppCombinationActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/combination/AppCombinationActivityController.java) |
| `AppCombinationRecordController` | `/promotion/combination-record` | 用户 APP - 拼团活动 | 4 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/combination/AppCombinationRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/combination/AppCombinationRecordController.java) |
| `AppCouponController` | `/promotion/coupon` | 用户 App - 优惠劵 | 4 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/coupon/AppCouponController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/coupon/AppCouponController.java) |
| `AppCouponTemplateController` | `/promotion/coupon-template` | 用户 App - 优惠劵模板 | 4 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/coupon/AppCouponTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/coupon/AppCouponTemplateController.java) |
| `AppDiyPageController` | `/promotion/diy-page` | 用户 APP - 装修页面 | 1 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/diy/AppDiyPageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/diy/AppDiyPageController.java) |
| `AppDiyTemplateController` | `/promotion/diy-template` | 用户 APP - 装修模板 | 2 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/diy/AppDiyTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/diy/AppDiyTemplateController.java) |
| `AppKeFuMessageController` | `/promotion/kefu-message` | 用户 APP - 客服消息 | 3 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/kefu/AppKeFuMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/kefu/AppKeFuMessageController.java) |
| `AppPointActivityController` | `/promotion/point-activity` | 用户 App - 积分商城活动 | 3 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/point/AppPointActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/point/AppPointActivityController.java) |
| `AppRewardActivityController` | `/promotion/reward-activity` | 用户 App - 满减送活动 | 1 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/reward/AppRewardActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/reward/AppRewardActivityController.java) |
| `AppSeckillActivityController` | `/promotion/seckill-activity` | 用户 App - 秒杀活动 | 4 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/seckill/AppSeckillActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/seckill/AppSeckillActivityController.java) |
| `AppSeckillConfigController` | `/promotion/seckill-config` | 用户 App - 秒杀时间段 | 1 | [apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/seckill/AppSeckillConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-promotion-server/src/main/java/cn/iocoder/yudao/module/promotion/controller/app/seckill/AppSeckillConfigController.java) |
| `MemberStatisticsController` | `/statistics/member` | 管理后台 - 会员统计 | 7 | [apps/backend/yudao-module-mall/yudao-module-statistics-server/src/main/java/cn/iocoder/yudao/module/statistics/controller/admin/member/MemberStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-statistics-server/src/main/java/cn/iocoder/yudao/module/statistics/controller/admin/member/MemberStatisticsController.java) |
| `PayStatisticsController` | `/statistics/pay` | 管理后台 - 支付统计 | 1 | [apps/backend/yudao-module-mall/yudao-module-statistics-server/src/main/java/cn/iocoder/yudao/module/statistics/controller/admin/pay/PayStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-statistics-server/src/main/java/cn/iocoder/yudao/module/statistics/controller/admin/pay/PayStatisticsController.java) |
| `ProductStatisticsController` | `/statistics/product` | 管理后台 - 商品统计 | 3 | [apps/backend/yudao-module-mall/yudao-module-statistics-server/src/main/java/cn/iocoder/yudao/module/statistics/controller/admin/product/ProductStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-statistics-server/src/main/java/cn/iocoder/yudao/module/statistics/controller/admin/product/ProductStatisticsController.java) |
| `TradeStatisticsController` | `/statistics/trade` | 管理后台 - 交易统计 | 6 | [apps/backend/yudao-module-mall/yudao-module-statistics-server/src/main/java/cn/iocoder/yudao/module/statistics/controller/admin/trade/TradeStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-statistics-server/src/main/java/cn/iocoder/yudao/module/statistics/controller/admin/trade/TradeStatisticsController.java) |
| `AfterSaleController` | `/trade/after-sale` | 管理后台 - 售后订单 | 8 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/aftersale/AfterSaleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/aftersale/AfterSaleController.java) |
| `BrokerageRecordController` | `/trade/brokerage-record` | 管理后台 - 佣金记录 | 2 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/brokerage/BrokerageRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/brokerage/BrokerageRecordController.java) |
| `BrokerageUserController` | `/trade/brokerage-user` | 管理后台 - 分销用户 | 6 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/brokerage/BrokerageUserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/brokerage/BrokerageUserController.java) |
| `BrokerageWithdrawController` | `/trade/brokerage-withdraw` | 管理后台 - 佣金提现 | 5 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/brokerage/BrokerageWithdrawController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/brokerage/BrokerageWithdrawController.java) |
| `TradeConfigController` | `/trade/config` | 管理后台 - 交易中心配置 | 2 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/config/TradeConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/config/TradeConfigController.java) |
| `DeliveryExpressController` | `/trade/delivery/express` | 管理后台 - 快递公司 | 6 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/delivery/DeliveryExpressController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/delivery/DeliveryExpressController.java) |
| `DeliveryExpressTemplateController` | `/trade/delivery/express-template` | 管理后台 - 快递运费模板 | 7 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/delivery/DeliveryExpressTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/delivery/DeliveryExpressTemplateController.java) |
| `DeliveryPickUpStoreController` | `/trade/delivery/pick-up-store` | 管理后台 - 自提门店 | 8 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/delivery/DeliveryPickUpStoreController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/delivery/DeliveryPickUpStoreController.java) |
| `TradeOrderController` | `/trade/order` | 管理后台 - 交易订单 | 11 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/order/TradeOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/admin/order/TradeOrderController.java) |
| `AppAfterSaleController` | `/trade/after-sale` | 用户 App - 交易售后 | 5 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/aftersale/AppAfterSaleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/aftersale/AppAfterSaleController.java) |
| `AppAfterSaleLogController` | `/trade/after-sale-log` | 用户 App - 售后日志 | 1 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/aftersale/AppAfterSaleLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/aftersale/AppAfterSaleLogController.java) |
| `AppBrokerageRecordController` | `/trade/brokerage-record` | 用户 APP - 分销用户 | 2 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/brokerage/AppBrokerageRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/brokerage/AppBrokerageRecordController.java) |
| `AppBrokerageUserController` | `/trade/brokerage-user` | 用户 APP - 分销用户 | 7 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/brokerage/AppBrokerageUserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/brokerage/AppBrokerageUserController.java) |
| `AppBrokerageWithdrawController` | `/trade/brokerage-withdraw` | 用户 APP - 分销提现 | 3 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/brokerage/AppBrokerageWithdrawController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/brokerage/AppBrokerageWithdrawController.java) |
| `AppCartController` | `/trade/cart` | 用户 App - 购物车 | 7 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/cart/AppCartController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/cart/AppCartController.java) |
| `AppTradeConfigController` | `/trade/config` | 用户 App - 交易配置 | 1 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/config/AppTradeConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/config/AppTradeConfigController.java) |
| `AppDeliverExpressController` | `/trade/delivery/express` | 用户 App - 快递公司 | 1 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/delivery/AppDeliverExpressController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/delivery/AppDeliverExpressController.java) |
| `AppDeliverPickUpStoreController` | `/trade/delivery/pick-up-store` | 用户 App - 自提门店 | 2 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/delivery/AppDeliverPickUpStoreController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/delivery/AppDeliverPickUpStoreController.java) |
| `AppTradeOrderController` | `/trade/order` | 用户 App - 交易订单 | 12 | [apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/order/AppTradeOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mall/yudao-module-trade-server/src/main/java/cn/iocoder/yudao/module/trade/controller/app/order/AppTradeOrderController.java) |
| `AddressController` | `/member/address` | 管理后台 - 用户收件地址 | 1 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/address/AddressController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/address/AddressController.java) |
| `MemberConfigController` | `/member/config` | 管理后台 - 会员设置 | 2 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/config/MemberConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/config/MemberConfigController.java) |
| `MemberGroupController` | `/member/group` | 管理后台 - 用户分组 | 6 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/group/MemberGroupController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/group/MemberGroupController.java) |
| `MemberExperienceRecordController` | `/member/experience-record` | 管理后台 - 会员经验记录 | 2 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/level/MemberExperienceRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/level/MemberExperienceRecordController.java) |
| `MemberLevelController` | `/member/level` | 管理后台 - 会员等级 | 6 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/level/MemberLevelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/level/MemberLevelController.java) |
| `MemberLevelRecordController` | `/member/level-record` | 管理后台 - 会员等级记录 | 2 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/level/MemberLevelRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/level/MemberLevelRecordController.java) |
| `MemberPointRecordController` | `/member/point/record` | 管理后台 - 签到记录 | 1 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/point/MemberPointRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/point/MemberPointRecordController.java) |
| `MemberSignInConfigController` | `/member/sign-in/config` | 管理后台 - 签到规则 | 5 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/signin/MemberSignInConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/signin/MemberSignInConfigController.java) |
| `MemberSignInRecordController` | `/member/sign-in/record` | 管理后台 - 签到记录 | 1 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/signin/MemberSignInRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/signin/MemberSignInRecordController.java) |
| `MemberTagController` | `/member/tag` | 管理后台 - 会员标签 | 7 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/tag/MemberTagController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/tag/MemberTagController.java) |
| `MemberUserController` | `/member/user` | 管理后台 - 会员用户 | 5 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/user/MemberUserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/admin/user/MemberUserController.java) |
| `AppAddressController` | `/member/address` | 用户 APP - 用户收件地址 | 6 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/address/AppAddressController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/address/AppAddressController.java) |
| `AppAuthController` | `/member/auth` | 用户 APP - 认证 | 10 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/auth/AppAuthController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/auth/AppAuthController.java) |
| `AppMemberExperienceRecordController` | `/member/experience-record` | 用户 App - 会员经验记录 | 1 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/level/AppMemberExperienceRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/level/AppMemberExperienceRecordController.java) |
| `AppMemberLevelController` | `/member/level` | 用户 App - 会员等级 | 1 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/level/AppMemberLevelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/level/AppMemberLevelController.java) |
| `AppMemberPointRecordController` | `/member/point/record` | 用户 App - 签到记录 | 1 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/point/AppMemberPointRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/point/AppMemberPointRecordController.java) |
| `AppMemberSignInConfigController` | `/member/sign-in/config` | 用户 App - 签到规则 | 1 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/signin/AppMemberSignInConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/signin/AppMemberSignInConfigController.java) |
| `AppMemberSignInRecordController` | `/member/sign-in/record` | 用户 App - 签到记录 | 3 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/signin/AppMemberSignInRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/signin/AppMemberSignInRecordController.java) |
| `AppSocialUserController` | `/member/social-user` | 用户 App - 社交用户 | 5 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/social/AppSocialUserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/social/AppSocialUserController.java) |
| `AppMemberUserController` | `/member/user` | 用户 APP - 用户个人中心 | 6 | [apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/user/AppMemberUserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-member/yudao-module-member-server/src/main/java/cn/iocoder/yudao/module/member/controller/app/user/AppMemberUserController.java) |
| `MesCalCalendarController` | `/mes/cal/calendar` | 管理后台 - MES 排班日历 | 1 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/calendar/MesCalCalendarController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/calendar/MesCalCalendarController.java) |
| `MesCalHolidayController` | `/mes/cal/holiday` | 管理后台 - MES 假期设置 | 3 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/holiday/MesCalHolidayController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/holiday/MesCalHolidayController.java) |
| `MesCalPlanController` | `/mes/cal/plan` | 管理后台 - MES 排班计划 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/plan/MesCalPlanController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/plan/MesCalPlanController.java) |
| `MesCalPlanShiftController` | `/mes/cal/plan-shift` | 管理后台 - MES 计划班次 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/plan/MesCalPlanShiftController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/plan/MesCalPlanShiftController.java) |
| `MesCalPlanTeamController` | `/mes/cal/plan-team` | 管理后台 - MES 计划班组关联 | 3 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/plan/MesCalPlanTeamController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/plan/MesCalPlanTeamController.java) |
| `MesCalTeamController` | `/mes/cal/team` | 管理后台 - MES 班组 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/team/MesCalTeamController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/team/MesCalTeamController.java) |
| `MesCalTeamMemberController` | `/mes/cal/team-member` | 管理后台 - MES 班组成员 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/team/MesCalTeamMemberController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/team/MesCalTeamMemberController.java) |
| `MesCalTeamShiftController` | `/mes/cal/team-shift` | 管理后台 - MES 班组排班 | 1 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/team/MesCalTeamShiftController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/cal/team/MesCalTeamShiftController.java) |
| `MesDvCheckPlanController` | `/mes/dv/check-plan` | 管理后台 - MES 点检保养方案 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkplan/MesDvCheckPlanController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkplan/MesDvCheckPlanController.java) |
| `MesDvCheckPlanMachineryController` | `/mes/dv/check-plan-machinery` | 管理后台 - MES 点检保养方案设备 | 3 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkplan/MesDvCheckPlanMachineryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkplan/MesDvCheckPlanMachineryController.java) |
| `MesDvCheckPlanSubjectController` | `/mes/dv/check-plan-subject` | 管理后台 - MES 点检保养方案项目 | 3 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkplan/MesDvCheckPlanSubjectController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkplan/MesDvCheckPlanSubjectController.java) |
| `MesDvCheckRecordController` | `/mes/dv/check-record` | 管理后台 - MES 设备点检记录 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkrecord/MesDvCheckRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkrecord/MesDvCheckRecordController.java) |
| `MesDvCheckRecordLineController` | `/mes/dv/check-record-line` | 管理后台 - MES 设备点检记录明细 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkrecord/MesDvCheckRecordLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/checkrecord/MesDvCheckRecordLineController.java) |
| `MesDvMachineryController` | `/mes/dv/machinery` | 管理后台 - MES 设备台账 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/machinery/MesDvMachineryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/machinery/MesDvMachineryController.java) |
| `MesDvMachineryTypeController` | `/mes/dv/machinery-type` | 管理后台 - MES 设备类型 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/machinery/MesDvMachineryTypeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/machinery/MesDvMachineryTypeController.java) |
| `MesDvMaintenRecordController` | `/mes/dv/mainten-record` | 管理后台 - MES 设备保养记录 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/maintenrecord/MesDvMaintenRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/maintenrecord/MesDvMaintenRecordController.java) |
| `MesDvMaintenRecordLineController` | `/mes/dv/mainten-record-line` | 管理后台 - MES 设备保养记录明细 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/maintenrecord/MesDvMaintenRecordLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/maintenrecord/MesDvMaintenRecordLineController.java) |
| `MesDvRepairController` | `/mes/dv/repair` | 管理后台 - MES 维修工单 | 8 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/repair/MesDvRepairController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/repair/MesDvRepairController.java) |
| `MesDvRepairLineController` | `/mes/dv/repair-line` | 管理后台 - MES 维修工单行 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/repair/MesDvRepairLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/repair/MesDvRepairLineController.java) |
| `MesDvSubjectController` | `/mes/dv/subject` | 管理后台 - MES 点检保养项目 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/subject/MesDvSubjectController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/dv/subject/MesDvSubjectController.java) |
| `MesHomeStatisticsController` | `/mes/home-statistics` | 管理后台 - MES 首页统计 | 3 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/home/MesHomeStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/home/MesHomeStatisticsController.java) |
| `MesMdAutoCodePartController` | `/mes/md/auto-code-part` | 管理后台 - MES 编码规则组成 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/autocode/MesMdAutoCodePartController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/autocode/MesMdAutoCodePartController.java) |
| `MesMdAutoCodeRecordController` | `/mes/md/auto-code-record` | 管理后台 - MES 编码生成记录 | 1 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/autocode/MesMdAutoCodeRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/autocode/MesMdAutoCodeRecordController.java) |
| `MesMdAutoCodeRuleController` | `/mes/md/auto-code-rule` | 管理后台 - MES 编码规则 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/autocode/MesMdAutoCodeRuleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/autocode/MesMdAutoCodeRuleController.java) |
| `MesMdClientController` | `/mes/md-client` | 管理后台 - MES 客户 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/client/MesMdClientController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/client/MesMdClientController.java) |
| `MesMdItemBatchConfigController` | `/mes/md/item-batch-config` | 管理后台 - MES 物料批次属性配置 | 2 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdItemBatchConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdItemBatchConfigController.java) |
| `MesMdItemController` | `/mes/md/item` | 管理后台 - MES 物料产品 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdItemController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdItemController.java) |
| `MesMdItemTypeController` | `/mes/md/item-type` | 管理后台 - MES 物料产品分类 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdItemTypeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdItemTypeController.java) |
| `MesMdProductBomController` | `/mes/md/product-bom` | 管理后台 - MES 产品BOM | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdProductBomController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdProductBomController.java) |
| `MesMdProductSipController` | `/mes/md/product-sip` | 管理后台 - MES 产品SIP | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdProductSipController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdProductSipController.java) |
| `MesMdProductSopController` | `/mes/md/product-sop` | 管理后台 - MES 产品SOP | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdProductSopController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/item/MesMdProductSopController.java) |
| `MesMdUnitMeasureController` | `/mes/md/unit-measure` | 管理后台 - MES 计量单位 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/unitmeasure/MesMdUnitMeasureController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/unitmeasure/MesMdUnitMeasureController.java) |
| `MesMdVendorController` | `/mes/md-vendor` | 管理后台 - MES 供应商 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/vendor/MesMdVendorController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/vendor/MesMdVendorController.java) |
| `MesMdWorkshopController` | `/mes/md-workshop` | 管理后台 - MES 车间 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkshopController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkshopController.java) |
| `MesMdWorkstationController` | `/mes/md-workstation` | 管理后台 - MES 工作站 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkstationController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkstationController.java) |
| `MesMdWorkstationMachineController` | `/mes/md-workstation-machine` | 管理后台 - MES 设备资源 | 3 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkstationMachineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkstationMachineController.java) |
| `MesMdWorkstationToolController` | `/mes/md-workstation-tool` | 管理后台 - MES 工装夹具资源 | 4 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkstationToolController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkstationToolController.java) |
| `MesMdWorkstationWorkerController` | `/mes/md-workstation-worker` | 管理后台 - MES 人力资源 | 4 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkstationWorkerController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/md/workstation/MesMdWorkstationWorkerController.java) |
| `MesProAndonConfigController` | `/mes/pro/andon-config` | 管理后台 - MES 安灯呼叫配置 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/andon/MesProAndonConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/andon/MesProAndonConfigController.java) |
| `MesProAndonRecordController` | `/mes/pro/andon-record` | 管理后台 - MES 安灯呼叫记录 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/andon/MesProAndonRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/andon/MesProAndonRecordController.java) |
| `MesProCardController` | `/mes/pro/card` | 管理后台 - MES 生产流转卡 | 9 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/card/MesProCardController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/card/MesProCardController.java) |
| `MesProCardProcessController` | `/mes/pro/card-process` | 管理后台 - MES 流转卡工序记录 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/card/MesProCardProcessController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/card/MesProCardProcessController.java) |
| `MesProFeedbackController` | `/mes/pro/feedback` | 管理后台 - MES 生产报工 | 8 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/feedback/MesProFeedbackController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/feedback/MesProFeedbackController.java) |
| `MesProProcessContentController` | `/mes/pro/process-content` | 管理后台 - MES 生产工序内容 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/process/MesProProcessContentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/process/MesProProcessContentController.java) |
| `MesProProcessController` | `/mes/pro/process` | 管理后台 - MES 生产工序 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/process/MesProProcessController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/process/MesProProcessController.java) |
| `MesProRouteController` | `/mes/pro/route` | 管理后台 - MES 工艺路线 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/route/MesProRouteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/route/MesProRouteController.java) |
| `MesProRouteProcessController` | `/mes/pro/route-process` | 管理后台 - MES 工艺路线工序 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/route/MesProRouteProcessController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/route/MesProRouteProcessController.java) |
| `MesProRouteProductBomController` | `/mes/pro/route-product-bom` | 管理后台 - MES 工艺路线产品 BOM | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/route/MesProRouteProductBomController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/route/MesProRouteProductBomController.java) |
| `MesProRouteProductController` | `/mes/pro/route-product` | 管理后台 - MES 工艺路线产品 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/route/MesProRouteProductController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/route/MesProRouteProductController.java) |
| `MesProTaskController` | `/mes/pro/task` | 管理后台 - MES 生产任务 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/task/MesProTaskController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/task/MesProTaskController.java) |
| `MesProTaskIssueController` | `/mes/pro/task-issue` | 管理后台 - MES 生产任务投料 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/task/MesProTaskIssueController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/task/MesProTaskIssueController.java) |
| `MesProWorkOrderBomController` | `/mes/pro/work-order-bom` | 管理后台 - MES 生产工单 BOM | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/workorder/MesProWorkOrderBomController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/workorder/MesProWorkOrderBomController.java) |
| `MesProWorkOrderController` | `/mes/pro/work-order` | 管理后台 - MES 生产工单 | 8 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/workorder/MesProWorkOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/workorder/MesProWorkOrderController.java) |
| `MesProWorkRecordController` | `/mes/pro/workrecord` | 管理后台 - MES 工作记录 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/workrecord/MesProWorkRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/pro/workrecord/MesProWorkRecordController.java) |
| `MesQcDefectController` | `/mes/qc/defect` | 管理后台 - MES 缺陷类型 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/defect/MesQcDefectController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/defect/MesQcDefectController.java) |
| `MesQcDefectRecordController` | `/mes/qc/defect-record` | 管理后台 - MES 质检缺陷记录 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/defectrecord/MesQcDefectRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/defectrecord/MesQcDefectRecordController.java) |
| `MesQcIndicatorController` | `/mes/qc/indicator` | 管理后台 - MES 质检指标 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/indicator/MesQcIndicatorController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/indicator/MesQcIndicatorController.java) |
| `MesQcIndicatorResultController` | `/mes/qc/indicator-result` | 管理后台 - MES 检验结果 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/indicatorresult/MesQcIndicatorResultController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/indicatorresult/MesQcIndicatorResultController.java) |
| `MesQcIpqcController` | `/mes/qc/ipqc` | 管理后台 - MES 过程检验单（IPQC） | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/ipqc/MesQcIpqcController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/ipqc/MesQcIpqcController.java) |
| `MesQcIpqcLineController` | `/mes/qc/ipqc/line` | 管理后台 - MES 过程检验单行 | 2 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/ipqc/MesQcIpqcLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/ipqc/MesQcIpqcLineController.java) |
| `MesQcIqcController` | `/mes/qc/iqc` | 管理后台 - MES 来料检验单（IQC） | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/iqc/MesQcIqcController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/iqc/MesQcIqcController.java) |
| `MesQcIqcLineController` | `/mes/qc/iqc/line` | 管理后台 - MES 来料检验单行 | 2 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/iqc/MesQcIqcLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/iqc/MesQcIqcLineController.java) |
| `MesQcOqcController` | `/mes/qc/oqc` | 管理后台 - MES 出货检验单（OQC） | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/oqc/MesQcOqcController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/oqc/MesQcOqcController.java) |
| `MesQcOqcLineController` | `/mes/qc/oqc/line` | 管理后台 - MES 出货检验单行 | 2 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/oqc/MesQcOqcLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/oqc/MesQcOqcLineController.java) |
| `MesQcPendingInspectController` | `/mes/qc/pending-inspect` | 管理后台 - MES 待检任务 | 1 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/pendinginspect/MesQcPendingInspectController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/pendinginspect/MesQcPendingInspectController.java) |
| `MesQcRqcController` | `/mes/qc/rqc` | 管理后台 - MES 退货检验单（RQC） | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/rqc/MesQcRqcController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/rqc/MesQcRqcController.java) |
| `MesQcRqcLineController` | `/mes/qc/rqc/line` | 管理后台 - MES 退货检验单行 | 2 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/rqc/MesQcRqcLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/rqc/MesQcRqcLineController.java) |
| `MesQcTemplateController` | `/mes/qc/template` | 管理后台 - MES 质检方案 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/template/MesQcTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/template/MesQcTemplateController.java) |
| `MesQcTemplateIndicatorController` | `/mes/qc/template/indicator` | 管理后台 - MES 质检方案-检测指标项 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/template/MesQcTemplateIndicatorController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/template/MesQcTemplateIndicatorController.java) |
| `MesQcTemplateItemController` | `/mes/qc/template/item` | 管理后台 - MES 质检方案-产品关联 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/template/MesQcTemplateItemController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/qc/template/MesQcTemplateItemController.java) |
| `MesTmToolController` | `/mes/tm/tool` | 管理后台 - MES 工具台账 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/tm/tool/MesTmToolController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/tm/tool/MesTmToolController.java) |
| `MesTmToolTypeController` | `/mes/tm/tool-type` | 管理后台 - MES 工具类型 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/tm/tool/MesTmToolTypeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/tm/tool/MesTmToolTypeController.java) |
| `MesWmArrivalNoticeController` | `/mes/wm/arrival-notice` | 管理后台 - MES 到货通知单 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/arrivalnotice/MesWmArrivalNoticeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/arrivalnotice/MesWmArrivalNoticeController.java) |
| `MesWmArrivalNoticeLineController` | `/mes/wm/arrival-notice-line` | 管理后台 - MES 到货通知单行 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/arrivalnotice/MesWmArrivalNoticeLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/arrivalnotice/MesWmArrivalNoticeLineController.java) |
| `MesWmBarcodeConfigController` | `/mes/wm/barcode-config` | 管理后台 - MES 条码配置 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/barcode/MesWmBarcodeConfigController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/barcode/MesWmBarcodeConfigController.java) |
| `MesWmBarcodeController` | `/mes/wm/barcode` | 管理后台 - MES 条码清单 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/barcode/MesWmBarcodeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/barcode/MesWmBarcodeController.java) |
| `MesWmBatchController` | `/mes/wm/batch` | 管理后台 - MES 批次管理 | 4 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/batch/MesWmBatchController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/batch/MesWmBatchController.java) |
| `MesWmItemConsumeLineController` | `/mes/wm/item-consume-line` | 管理后台 - MES 物料消耗记录行 | 1 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/itemconsume/MesWmItemConsumeLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/itemconsume/MesWmItemConsumeLineController.java) |
| `MesWmItemReceiptController` | `/mes/wm/item-receipt` | 管理后台 - MES 采购入库单 | 9 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/itemreceipt/MesWmItemReceiptController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/itemreceipt/MesWmItemReceiptController.java) |
| `MesWmItemReceiptDetailController` | `/mes/wm/item-receipt-detail` | 管理后台 - MES 采购入库明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/itemreceipt/MesWmItemReceiptDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/itemreceipt/MesWmItemReceiptDetailController.java) |
| `MesWmItemReceiptLineController` | `/mes/wm/item-receipt-line` | 管理后台 - MES 采购入库单行 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/itemreceipt/MesWmItemReceiptLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/itemreceipt/MesWmItemReceiptLineController.java) |
| `MesWmMaterialStockController` | `/mes/wm/material-stock` | 管理后台 - MES 库存台账 | 4 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/materialstock/MesWmMaterialStockController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/materialstock/MesWmMaterialStockController.java) |
| `MesWmMiscIssueController` | `/mes/wm/misc-issue` | 管理后台 - MES 杂项出库单 | 8 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/miscissue/MesWmMiscIssueController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/miscissue/MesWmMiscIssueController.java) |
| `MesWmMiscIssueLineController` | `/mes/wm/misc-issue-line` | 管理后台 - MES 杂项出库单行 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/miscissue/MesWmMiscIssueLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/miscissue/MesWmMiscIssueLineController.java) |
| `MesWmMiscReceiptController` | `/mes/wm/misc-receipt` | 管理后台 - MES 杂项入库单 | 8 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/miscreceipt/MesWmMiscReceiptController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/miscreceipt/MesWmMiscReceiptController.java) |
| `MesWmMiscReceiptLineController` | `/mes/wm/misc-receipt-line` | 管理后台 - MES 杂项入库单行 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/miscreceipt/MesWmMiscReceiptLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/miscreceipt/MesWmMiscReceiptLineController.java) |
| `MesWmOutsourceIssueController` | `/mes/wm/outsource-issue` | 管理后台 - MES 外协发料单 | 10 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourceissue/MesWmOutsourceIssueController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourceissue/MesWmOutsourceIssueController.java) |
| `MesWmOutsourceIssueDetailController` | `/mes/wm/outsource-issue-detail` | 管理后台 - MES 外协发料单明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourceissue/MesWmOutsourceIssueDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourceissue/MesWmOutsourceIssueDetailController.java) |
| `MesWmOutsourceIssueLineController` | `/mes/wm/outsource-issue-line` | 管理后台 - MES 外协发料单行 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourceissue/MesWmOutsourceIssueLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourceissue/MesWmOutsourceIssueLineController.java) |
| `MesWmOutsourceReceiptController` | `/mes/wm/outsource-receipt` | 管理后台 - MES 外协入库单 | 9 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourcereceipt/MesWmOutsourceReceiptController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourcereceipt/MesWmOutsourceReceiptController.java) |
| `MesWmOutsourceReceiptDetailController` | `/mes/wm/outsource-receipt-detail` | 管理后台 - MES 外协入库明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourcereceipt/MesWmOutsourceReceiptDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourcereceipt/MesWmOutsourceReceiptDetailController.java) |
| `MesWmOutsourceReceiptLineController` | `/mes/wm/outsource-receipt-line` | 管理后台 - MES 外协入库单行 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourcereceipt/MesWmOutsourceReceiptLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/outsourcereceipt/MesWmOutsourceReceiptLineController.java) |
| `MesWmPackageController` | `/mes/wm/package` | 管理后台 - MES 装箱单 | 8 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/packages/MesWmPackageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/packages/MesWmPackageController.java) |
| `MesWmPackageLineController` | `/mes/wm/package-line` | 管理后台 - MES 装箱明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/packages/MesWmPackageLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/packages/MesWmPackageLineController.java) |
| `MesWmProductIssueController` | `/mes/wm/product-issue` | 管理后台 - MES 领料出库单 | 10 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productissue/MesWmProductIssueController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productissue/MesWmProductIssueController.java) |
| `MesWmProductIssueDetailController` | `/mes/wm/product-issue-detail` | 管理后台 - MES 领料出库明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productissue/MesWmProductIssueDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productissue/MesWmProductIssueDetailController.java) |
| `MesWmProductIssueLineController` | `/mes/wm/product-issue-line` | 管理后台 - MES 领料出库单行 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productissue/MesWmProductIssueLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productissue/MesWmProductIssueLineController.java) |
| `MesWmProductProduceLineController` | `/mes/wm/product-produce-line` | 管理后台 - MES 生产入库单行 | 1 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productproduce/MesWmProductProduceLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productproduce/MesWmProductProduceLineController.java) |
| `MesWmProductReceiptController` | `/mes/wm/product-receipt` | 管理后台 - MES 产品收货单 | 10 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productreceipt/MesWmProductReceiptController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productreceipt/MesWmProductReceiptController.java) |
| `MesWmProductReceiptDetailController` | `/mes/wm/product-receipt-detail` | 管理后台 - MES 产品收货单明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productreceipt/MesWmProductReceiptDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productreceipt/MesWmProductReceiptDetailController.java) |
| `MesWmProductReceiptLineController` | `/mes/wm/product-receipt-line` | 管理后台 - MES 产品收货单行 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productreceipt/MesWmProductReceiptLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productreceipt/MesWmProductReceiptLineController.java) |
| `MesWmProductSalesController` | `/mes/wm/product-sales` | 管理后台 - MES 销售出库单 | 11 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productsales/MesWmProductSalesController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productsales/MesWmProductSalesController.java) |
| `MesWmProductSalesDetailController` | `/mes/wm/product-sales-detail` | 管理后台 - MES 销售出库明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productsales/MesWmProductSalesDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productsales/MesWmProductSalesDetailController.java) |
| `MesWmProductSalesLineController` | `/mes/wm/product-sales-line` | 管理后台 - MES 销售出库单行 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productsales/MesWmProductSalesLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/productsales/MesWmProductSalesLineController.java) |
| `MesWmReturnIssueController` | `/mes/wm/return-issue` | 管理后台 - MES 生产退料单 | 9 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnissue/MesWmReturnIssueController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnissue/MesWmReturnIssueController.java) |
| `MesWmReturnIssueDetailController` | `/mes/wm/return-issue-detail` | 管理后台 - MES 生产退料明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnissue/MesWmReturnIssueDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnissue/MesWmReturnIssueDetailController.java) |
| `MesWmReturnIssueLineController` | `/mes/wm/return-issue-line` | 管理后台 - MES 生产退料单行 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnissue/MesWmReturnIssueLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnissue/MesWmReturnIssueLineController.java) |
| `MesWmReturnSalesController` | `/mes/wm/return-sales` | 管理后台 - MES 销售退货单 | 10 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnsales/MesWmReturnSalesController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnsales/MesWmReturnSalesController.java) |
| `MesWmReturnSalesDetailController` | `/mes/wm/return-sales-detail` | 管理后台 - MES 销售退货明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnsales/MesWmReturnSalesDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnsales/MesWmReturnSalesDetailController.java) |
| `MesWmReturnSalesLineController` | `/mes/wm/return-sales-line` | 管理后台 - MES 销售退货单行 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnsales/MesWmReturnSalesLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnsales/MesWmReturnSalesLineController.java) |
| `MesWmReturnVendorController` | `/mes/wm/return-vendor` | 管理后台 - MES 供应商退货单 | 10 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnvendor/MesWmReturnVendorController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnvendor/MesWmReturnVendorController.java) |
| `MesWmReturnVendorDetailController` | `/mes/wm/return-vendor-detail` | 管理后台 - MES 供应商退货明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnvendor/MesWmReturnVendorDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnvendor/MesWmReturnVendorDetailController.java) |
| `MesWmReturnVendorLineController` | `/mes/wm/return-vendor-line` | 管理后台 - MES 供应商退货单行 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnvendor/MesWmReturnVendorLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/returnvendor/MesWmReturnVendorLineController.java) |
| `MesWmSalesNoticeController` | `/mes/wm/sales-notice` | 管理后台 - MES 发货通知单 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/salesnotice/MesWmSalesNoticeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/salesnotice/MesWmSalesNoticeController.java) |
| `MesWmSalesNoticeLineController` | `/mes/wm/sales-notice-line` | 管理后台 - MES 发货通知单行 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/salesnotice/MesWmSalesNoticeLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/salesnotice/MesWmSalesNoticeLineController.java) |
| `MesWmSnController` | `/mes/wm/sn` | 管理后台 - MES SN 码 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/sn/MesWmSnController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/sn/MesWmSnController.java) |
| `MesWmStockTakingPlanController` | `/mes/wm/stocktaking-plan` | 管理后台 - MES 盘点方案 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/plan/MesWmStockTakingPlanController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/plan/MesWmStockTakingPlanController.java) |
| `MesWmStockTakingPlanParamController` | `/mes/wm/stocktaking-plan-param` | 管理后台 - MES 盘点方案参数 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/plan/MesWmStockTakingPlanParamController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/plan/MesWmStockTakingPlanParamController.java) |
| `MesWmStockTakingTaskController` | `/mes/wm/stocktaking-task` | 管理后台 - MES 盘点任务 | 8 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/task/MesWmStockTakingTaskController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/task/MesWmStockTakingTaskController.java) |
| `MesWmStockTakingTaskLineController` | `/mes/wm/stocktaking-task-line` | 管理后台 - MES 盘点任务行 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/task/MesWmStockTakingTaskLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/task/MesWmStockTakingTaskLineController.java) |
| `MesWmStockTakingTaskResultController` | `/mes/wm/stocktaking-task-result` | 管理后台 - MES 盘点结果 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/task/MesWmStockTakingTaskResultController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/stocktaking/task/MesWmStockTakingTaskResultController.java) |
| `MesWmTransferController` | `/mes/wm/transfer` | 管理后台 - MES 转移单 | 10 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/transfer/MesWmTransferController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/transfer/MesWmTransferController.java) |
| `MesWmTransferDetailController` | `/mes/wm/transfer-detail` | 管理后台 - MES 调拨明细 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/transfer/MesWmTransferDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/transfer/MesWmTransferDetailController.java) |
| `MesWmTransferLineController` | `/mes/wm/transfer-line` | 管理后台 - MES 转移单行 | 5 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/transfer/MesWmTransferLineController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/transfer/MesWmTransferLineController.java) |
| `MesWmWarehouseAreaController` | `/mes/wm/warehouse-area` | 管理后台 - MES 库位 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/warehouse/MesWmWarehouseAreaController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/warehouse/MesWmWarehouseAreaController.java) |
| `MesWmWarehouseController` | `/mes/wm/warehouse` | 管理后台 - MES 仓库 | 6 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/warehouse/MesWmWarehouseController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/warehouse/MesWmWarehouseController.java) |
| `MesWmWarehouseLocationController` | `/mes/wm/warehouse-location` | 管理后台 - MES 库区 | 7 | [apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/warehouse/MesWmWarehouseLocationController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mes/yudao-module-mes-server/src/main/java/cn/iocoder/yudao/module/mes/controller/admin/wm/warehouse/MesWmWarehouseLocationController.java) |
| `MpAccountController` | `/mp/account` | 管理后台 - 公众号账号 | 8 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/account/MpAccountController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/account/MpAccountController.java) |
| `MpMaterialController` | `/mp/material` | 管理后台 - 公众号素材 | 2 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/material/MpMaterialController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/material/MpMaterialController.java) |
| `MpMenuController` | `/mp/menu` | 管理后台 - 公众号菜单 | 3 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/menu/MpMenuController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/menu/MpMenuController.java) |
| `MpAutoReplyController` | `/mp/auto-reply` | 管理后台 - 公众号自动回复 | 5 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/message/MpAutoReplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/message/MpAutoReplyController.java) |
| `MpMessageController` | `/mp/message` | 管理后台 - 公众号消息 | 2 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/message/MpMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/message/MpMessageController.java) |
| `MpMessageTemplateController` | `/mp/message-template` | 管理后台 - 公众号模版消息 | 5 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/message/MpMessageTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/message/MpMessageTemplateController.java) |
| `MpDraftController` | `/mp/draft` | 管理后台 - 公众号草稿 | 4 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/news/MpDraftController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/news/MpDraftController.java) |
| `MpFreePublishController` | `/mp/free-publish` | 管理后台 - 公众号发布能力 | 3 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/news/MpFreePublishController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/news/MpFreePublishController.java) |
| `MpOpenController` | `/mp/open` | 管理后台 - 公众号回调 | 2 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/open/MpOpenController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/open/MpOpenController.java) |
| `MpStatisticsController` | `/mp/statistics` | 管理后台 - 公众号统计 | 4 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/statistics/MpStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/statistics/MpStatisticsController.java) |
| `MpTagController` | `/mp/tag` | 管理后台 - 公众号标签 | 7 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/tag/MpTagController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/tag/MpTagController.java) |
| `MpUserController` | `/mp/user` | 管理后台 - 公众号粉丝 | 4 | [apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/user/MpUserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-mp/yudao-module-mp-server/src/main/java/cn/iocoder/yudao/module/mp/controller/admin/user/MpUserController.java) |
| `OaAnnouncementController` | `/oa/announcement` | 管理后台 - OA 公告 | 9 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/announcement/OaAnnouncementController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/announcement/OaAnnouncementController.java) |
| `OaAttendanceController` | `/oa/attendance` | 管理后台 - OA 考勤 | 9 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/attendance/OaAttendanceController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/attendance/OaAttendanceController.java) |
| `OaContactCategoryController` | `/oa/contact-category` | 管理后台 - OA 联系人分类 | 6 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/contact/OaContactCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/contact/OaContactCategoryController.java) |
| `OaContactController` | `/oa/contact` | 管理后台 - OA 通讯录 | 10 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/contact/OaContactController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/contact/OaContactController.java) |
| `OaDiscussionController` | `/oa/discussion` | 管理后台 - OA 讨论 | 6 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/discussion/OaDiscussionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/discussion/OaDiscussionController.java) |
| `OaDiscussionLikeController` | `/oa/discussion-like` | 管理后台 - OA 讨论点赞 | 2 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/discussion/OaDiscussionLikeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/discussion/OaDiscussionLikeController.java) |
| `OaDiscussionReplyController` | `/oa/discussion-reply` | 管理后台 - OA 讨论回复 | 3 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/discussion/OaDiscussionReplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/discussion/OaDiscussionReplyController.java) |
| `OaDiscussionVoteController` | `/oa/discussion-vote` | 管理后台 - OA 讨论投票 | 1 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/discussion/OaDiscussionVoteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/discussion/OaDiscussionVoteController.java) |
| `OaFileFavoriteController` | `/oa/file-favorite` | 管理后台 - 云盘收藏 | 2 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/file/OaFileFavoriteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/file/OaFileFavoriteController.java) |
| `OaFileNodeController` | `/oa/file-node` | 管理后台 - 云盘文件 | 11 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/file/OaFileNodeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/file/OaFileNodeController.java) |
| `OaFilePermissionController` | `/oa/file-permission` | 管理后台 - 云盘共享权限 | 3 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/file/OaFilePermissionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/file/OaFilePermissionController.java) |
| `OaLeaveApplyController` | `/oa/leave-apply` | 管理后台 - 请假申请 | 5 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/leave/OaLeaveApplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/leave/OaLeaveApplyController.java) |
| `OaMailAccountController` | `/oa/mail-account` | 管理后台 - 企业邮箱账号 | 7 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/mail/OaMailAccountController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/mail/OaMailAccountController.java) |
| `OaMailFolderController` | `/oa/mail-folder` | 管理后台 - 企业邮箱文件夹 | 1 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/mail/OaMailFolderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/mail/OaMailFolderController.java) |
| `OaMailMessageController` | `/oa/mail-message` | 管理后台 - 企业邮箱邮件 | 11 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/mail/OaMailMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/mail/OaMailMessageController.java) |
| `OaMailProviderController` | `/oa/mail-provider` | 管理后台 - 企业邮箱服务配置 | 6 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/mail/OaMailProviderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/mail/OaMailProviderController.java) |
| `OaMeetingRoomBookingController` | `/oa/meeting-room-booking` | 管理后台 - 会议室预定 | 10 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/meetingroom/OaMeetingRoomBookingController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/meetingroom/OaMeetingRoomBookingController.java) |
| `OaMeetingRoomController` | `/oa/meeting-room` | 管理后台 - 会议室 | 6 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/meetingroom/OaMeetingRoomController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/meetingroom/OaMeetingRoomController.java) |
| `OaNoteCategoryController` | `/oa/note-category` | 管理后台 - OA 笔记目录 | 6 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/note/OaNoteCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/note/OaNoteCategoryController.java) |
| `OaNoteController` | `/oa/note` | 管理后台 - OA 笔记 | 9 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/note/OaNoteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/note/OaNoteController.java) |
| `OaOfficialDocReceiveController` | `/oa/officialdoc-receive` | 管理后台 - 公文收文 | 8 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/officialdoc/OaOfficialDocReceiveController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/officialdoc/OaOfficialDocReceiveController.java) |
| `OaOfficialDocSendController` | `/oa/officialdoc-send` | 管理后台 - 公文发文 | 7 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/officialdoc/OaOfficialDocSendController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/officialdoc/OaOfficialDocSendController.java) |
| `OaOfficialDocTemplateController` | `/oa/officialdoc-template` | 管理后台 - 套红模板 | 6 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/officialdoc/OaOfficialDocTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/officialdoc/OaOfficialDocTemplateController.java) |
| `OaOvertimeApplyController` | `/oa/overtime-apply` | 管理后台 - 加班申请 | 5 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/overtime/OaOvertimeApplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/overtime/OaOvertimeApplyController.java) |
| `OaPlanController` | `/oa/plan` | 管理后台 - OA 工作计划 | 7 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/plan/OaPlanController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/plan/OaPlanController.java) |
| `OaRegularApplyController` | `/oa/regular-apply` | 管理后台 - 转正申请 | 5 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/regular/OaRegularApplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/regular/OaRegularApplyController.java) |
| `OaReimbursementController` | `/oa/reimbursement` | 管理后台 - 费用报销 | 5 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/reimbursement/OaReimbursementController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/reimbursement/OaReimbursementController.java) |
| `OaResignApplyController` | `/oa/resign-apply` | 管理后台 - 离职申请 | 5 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/resign/OaResignApplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/resign/OaResignApplyController.java) |
| `OaScheduleController` | `/oa/schedule` | 管理后台 - OA 日程 | 8 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/schedule/OaScheduleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/schedule/OaScheduleController.java) |
| `OaSealApplyController` | `/oa/seal-apply` | 管理后台 - 用印申请 | 8 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/seal/OaSealApplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/seal/OaSealApplyController.java) |
| `OaSealController` | `/oa/seal` | 管理后台 - 印章 | 5 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/seal/OaSealController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/seal/OaSealController.java) |
| `OaSupplyApplyController` | `/oa/supply-apply` | 管理后台 - 用品领用申请 | 7 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/supply/OaSupplyApplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/supply/OaSupplyApplyController.java) |
| `OaSupplyIssueController` | `/oa/supply-issue` | 管理后台 - 领用发放 | 3 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/supply/OaSupplyIssueController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/supply/OaSupplyIssueController.java) |
| `OaSupplyItemController` | `/oa/supply-item` | 管理后台 - 办公用品 | 7 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/supply/OaSupplyItemController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/supply/OaSupplyItemController.java) |
| `OaTaskController` | `/oa/task` | 管理后台 - OA 任务 | 9 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/task/OaTaskController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/task/OaTaskController.java) |
| `OaTravelApplyController` | `/oa/travel-apply` | 管理后台 - 出差申请 | 8 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/travel/OaTravelApplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/travel/OaTravelApplyController.java) |
| `OaTravelReimbursementController` | `/oa/travel-reimbursement` | 管理后台 - 出差报销 | 7 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/travel/OaTravelReimbursementController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/travel/OaTravelReimbursementController.java) |
| `OaVehicleApplyController` | `/oa/vehicle-apply` | 管理后台 - 用车申请 | 8 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/vehicle/OaVehicleApplyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/vehicle/OaVehicleApplyController.java) |
| `OaVehicleController` | `/oa/vehicle` | 管理后台 - 车辆 | 5 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/vehicle/OaVehicleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/vehicle/OaVehicleController.java) |
| `OaVehicleReturnController` | `/oa/vehicle-return` | 管理后台 - 还车申请 | 7 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/vehicle/OaVehicleReturnController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/vehicle/OaVehicleReturnController.java) |
| `OaWorkReportController` | `/oa/work-report` | 管理后台 - OA 工作汇报 | 8 | [apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/workreport/OaWorkReportController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-oa/yudao-module-oa-server/src/main/java/cn/iocoder/yudao/module/oa/controller/admin/workreport/OaWorkReportController.java) |
| `PayAppController` | `/pay/app` | 管理后台 - 支付应用信息 | 7 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/app/PayAppController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/app/PayAppController.java) |
| `PayChannelController` | `/pay/channel` | 管理后台 - 支付渠道 | 6 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/channel/PayChannelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/channel/PayChannelController.java) |
| `PayDemoOrderController` | `/pay/demo-order` | 管理后台 - 示例订单 | 5 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/demo/PayDemoOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/demo/PayDemoOrderController.java) |
| `PayDemoWithdrawController` | `/pay/demo-withdraw` | 管理后台 - 示例提现订单 | 4 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/demo/PayDemoWithdrawController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/demo/PayDemoWithdrawController.java) |
| `PayNotifyController` | `/pay/notify` | 管理后台 - 回调通知 | 5 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/notify/PayNotifyController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/notify/PayNotifyController.java) |
| `PayOrderController` | `/pay/order` | 管理后台 - 支付订单 | 5 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/order/PayOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/order/PayOrderController.java) |
| `PayRefundController` | `/pay/refund` | 管理后台 - 退款订单 | 2 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/refund/PayRefundController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/refund/PayRefundController.java) |
| `PayTransferController` | `/pay/transfer` | 管理后台 - 转账单 | 2 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/transfer/PayTransferController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/transfer/PayTransferController.java) |
| `PayWalletController` | `/pay/wallet` | 管理后台 - 用户钱包 | 3 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/wallet/PayWalletController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/wallet/PayWalletController.java) |
| `PayWalletRechargeController` | `/pay/wallet-recharge` | 管理后台 - 钱包充值 | 3 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/wallet/PayWalletRechargeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/wallet/PayWalletRechargeController.java) |
| `PayWalletRechargePackageController` | `/pay/wallet-recharge-package` | 管理后台 - 钱包充值套餐 | 5 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/wallet/PayWalletRechargePackageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/wallet/PayWalletRechargePackageController.java) |
| `PayWalletTransactionController` | `/pay/wallet-transaction` | 管理后台 - 钱包余额明细 | 1 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/wallet/PayWalletTransactionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/admin/wallet/PayWalletTransactionController.java) |
| `AppPayChannelController` | `/pay/channel` | 用户 App - 支付渠道 | 1 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/channel/AppPayChannelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/channel/AppPayChannelController.java) |
| `AppPayOrderController` | `/pay/order` | 用户 APP - 支付订单 | 2 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/order/AppPayOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/order/AppPayOrderController.java) |
| `AppPayTransferController` | `/pay/transfer` | 用户 APP - 转账单 | 1 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/transfer/AppPayTransferController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/transfer/AppPayTransferController.java) |
| `AppPayWalletController` | `/pay/wallet` | 用户 APP - 钱包 | 1 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/wallet/AppPayWalletController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/wallet/AppPayWalletController.java) |
| `AppPayWalletRechargeController` | `/pay/wallet-recharge` | 用户 APP - 钱包充值 | 2 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/wallet/AppPayWalletRechargeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/wallet/AppPayWalletRechargeController.java) |
| `AppPayWalletRechargePackageController` | `/pay/wallet-recharge-package` | 用户 APP - 钱包充值套餐 | 1 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/wallet/AppPayWalletRechargePackageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/wallet/AppPayWalletRechargePackageController.java) |
| `AppPayWalletTransactionController` | `/pay/wallet-transaction` | 用户 APP - 钱包余额明细 | 2 | [apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/wallet/AppPayWalletTransactionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pay/yudao-module-pay-server/src/main/java/cn/iocoder/yudao/module/pay/controller/app/wallet/AppPayWalletTransactionController.java) |
| `PmsKnowledgeContentPermissionController` | `/pms/kb/content-permission` | 管理后台 - PMS 知识内容协作权限 | 2 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/content/PmsKnowledgeContentPermissionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/content/PmsKnowledgeContentPermissionController.java) |
| `PmsKnowledgeDocumentController` | `/pms/kb/document` | 管理后台 - PMS 知识库文档 | 6 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/content/PmsKnowledgeDocumentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/content/PmsKnowledgeDocumentController.java) |
| `PmsKnowledgeDocumentLabelController` | `/pms/kb/document-label` | 管理后台 - PMS 知识库文档标签 | 6 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/content/PmsKnowledgeDocumentLabelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/content/PmsKnowledgeDocumentLabelController.java) |
| `PmsKnowledgeFolderController` | `/pms/kb/folder` | 管理后台 - PMS 知识库文件夹 | 6 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/content/PmsKnowledgeFolderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/content/PmsKnowledgeFolderController.java) |
| `PmsKnowledgeDocumentCommentController` | `/pms/kb/document-comment` | 管理后台 - PMS 知识库文档评论 | 3 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeDocumentCommentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeDocumentCommentController.java) |
| `PmsKnowledgeDocumentLikeController` | `/pms/kb/document-like` | 管理后台 - PMS 知识库文档点赞 | 2 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeDocumentLikeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeDocumentLikeController.java) |
| `PmsKnowledgeDocumentShareController` | `/pms/kb/document-share` | 管理后台 - PMS 知识库文档分享 | 5 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeDocumentShareController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeDocumentShareController.java) |
| `PmsKnowledgeFavoriteController` | `/pms/kb/favorite` | 管理后台 - PMS 知识关注 | 4 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeFavoriteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeFavoriteController.java) |
| `PmsKnowledgeViewRecordController` | `/pms/kb/view-record` | 管理后台 - PMS 知识最近浏览 | 1 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeViewRecordController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/interaction/PmsKnowledgeViewRecordController.java) |
| `PmsKnowledgeGroupController` | `/pms/kb/group` | 管理后台 - PMS 知识库分组 | 7 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/library/PmsKnowledgeGroupController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/library/PmsKnowledgeGroupController.java) |
| `PmsKnowledgeLibraryController` | `/pms/kb/library` | 管理后台 - PMS 知识库 | 5 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/library/PmsKnowledgeLibraryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/library/PmsKnowledgeLibraryController.java) |
| `PmsKnowledgeLibraryMemberController` | `/pms/kb/library-member` | 管理后台 - PMS 知识库成员 | 3 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/library/PmsKnowledgeLibraryMemberController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/library/PmsKnowledgeLibraryMemberController.java) |
| `PmsKnowledgeLibraryTemplateController` | `/pms/kb/library-template` | 管理后台 - PMS 知识库模板 | 6 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/library/PmsKnowledgeLibraryTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/library/PmsKnowledgeLibraryTemplateController.java) |
| `PmsKnowledgeRecycleController` | `/pms/kb/recycle` | 管理后台 - PMS 知识库回收站 | 6 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/recycle/PmsKnowledgeRecycleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/kb/recycle/PmsKnowledgeRecycleController.java) |
| `PmsIterationController` | `/pms/pm/iteration` | 管理后台 - PMS 项目迭代 | 8 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/iteration/PmsIterationController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/iteration/PmsIterationController.java) |
| `PmsProjectAnnouncementController` | `/pms/pm/project-announcement` | 管理后台 - PMS 项目公告 | 5 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectAnnouncementController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectAnnouncementController.java) |
| `PmsProjectController` | `/pms/pm/project` | 管理后台 - PMS 项目 | 10 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectController.java) |
| `PmsProjectFavoriteController` | `/pms/pm/project-favorite` | 管理后台 - PMS 项目收藏 | 2 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectFavoriteController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectFavoriteController.java) |
| `PmsProjectGroupController` | `/pms/pm/project-group` | 管理后台 - PMS 项目分组 | 6 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectGroupController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectGroupController.java) |
| `PmsProjectMemberController` | `/pms/pm/project-member` | 管理后台 - PMS 项目成员 | 4 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectMemberController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectMemberController.java) |
| `PmsProjectTemplateController` | `/pms/pm/project-template` | 管理后台 - PMS 项目模板 | 5 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/project/PmsProjectTemplateController.java) |
| `PmsWorkbenchController` | `/pms/pm/workbench` | 管理后台 - PMS 工作台 | 3 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workbench/PmsWorkbenchController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workbench/PmsWorkbenchController.java) |
| `PmsWorkItemActivityController` | `/pms/pm/work-item-activity` | 管理后台 - PMS 工作项动态 | 1 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemActivityController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemActivityController.java) |
| `PmsWorkItemCommentController` | `/pms/pm/work-item-comment` | 管理后台 - PMS 工作项评论 | 4 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemCommentController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemCommentController.java) |
| `PmsWorkItemController` | `/pms/pm/work-item` | 管理后台 - PMS 工作项 | 14 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemController.java) |
| `PmsWorkItemLabelController` | `/pms/pm/work-item-label` | 管理后台 - PMS 工作项标签 | 4 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemLabelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemLabelController.java) |
| `PmsWorkItemStatusController` | `/pms/pm/work-item-status` | 管理后台 - PMS 工作项状态 | 9 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemStatusController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemStatusController.java) |
| `PmsWorkItemWorkLogController` | `/pms/pm/work-item-work-log` | 管理后台 - PMS 工作项工时 | 5 | [apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemWorkLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-pms/yudao-module-pms-server/src/main/java/cn/iocoder/yudao/module/pms/controller/admin/pm/workitem/PmsWorkItemWorkLogController.java) |
| `GoViewDataController` | `/report/go-view/data` | 管理后台 - GoView 数据 | 0 | [apps/backend/yudao-module-report/yudao-module-report-server/src/main/java/cn/iocoder/yudao/module/report/controller/admin/goview/GoViewDataController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-report/yudao-module-report-server/src/main/java/cn/iocoder/yudao/module/report/controller/admin/goview/GoViewDataController.java) |
| `GoViewProjectController` | `/report/go-view/project` | 管理后台 - GoView 项目 | 5 | [apps/backend/yudao-module-report/yudao-module-report-server/src/main/java/cn/iocoder/yudao/module/report/controller/admin/goview/GoViewProjectController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-report/yudao-module-report-server/src/main/java/cn/iocoder/yudao/module/report/controller/admin/goview/GoViewProjectController.java) |
| `AuthController` | `/system/auth` | 管理后台 - 认证 | 10 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/auth/AuthController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/auth/AuthController.java) |
| `CaptchaController` | `/system/captcha` | 管理后台 - 验证码 | 2 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/captcha/CaptchaController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/captcha/CaptchaController.java) |
| `DeptController` | `/system/dept` | 管理后台 - 部门 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/dept/DeptController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/dept/DeptController.java) |
| `PostController` | `/system/post` | 管理后台 - 岗位 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/dept/PostController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/dept/PostController.java) |
| `DictDataController` | `/system/dict-data` | 管理后台 - 字典数据 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/dict/DictDataController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/dict/DictDataController.java) |
| `DictTypeController` | `/system/dict-type` | 管理后台 - 字典类型 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/dict/DictTypeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/dict/DictTypeController.java) |
| `AreaController` | `/system/area` | 管理后台 - 地区 | 2 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/ip/AreaController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/ip/AreaController.java) |
| `LoginLogController` | `/system/login-log` | 管理后台 - 登录日志 | 2 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/logger/LoginLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/logger/LoginLogController.java) |
| `OperateLogController` | `/system/operate-log` | 管理后台 - 操作日志 | 2 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/logger/OperateLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/logger/OperateLogController.java) |
| `MailAccountController` | `/system/mail-account` | 管理后台 - 邮箱账号 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/mail/MailAccountController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/mail/MailAccountController.java) |
| `MailLogController` | `/system/mail-log` | 管理后台 - 邮件日志 | 2 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/mail/MailLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/mail/MailLogController.java) |
| `MailTemplateController` | `/system/mail-template` | 管理后台 - 邮件模版 | 8 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/mail/MailTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/mail/MailTemplateController.java) |
| `NoticeController` | `/system/notice` | 管理后台 - 通知公告 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/notice/NoticeController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/notice/NoticeController.java) |
| `NotifyMessageController` | `/system/notify-message` | 管理后台 - 我的站内信 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/notify/NotifyMessageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/notify/NotifyMessageController.java) |
| `NotifyTemplateController` | `/system/notify-template` | 管理后台 - 站内信模版 | 8 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/notify/NotifyTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/notify/NotifyTemplateController.java) |
| `OAuth2ClientController` | `/system/oauth2-client` | 管理后台 - OAuth2 客户端 | 6 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/oauth2/OAuth2ClientController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/oauth2/OAuth2ClientController.java) |
| `OAuth2OpenController` | `/system/oauth2` | 管理后台 - OAuth2.0 授权 | 5 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/oauth2/OAuth2OpenController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/oauth2/OAuth2OpenController.java) |
| `OAuth2TokenController` | `/system/oauth2-token` | 管理后台 - OAuth2.0 令牌 | 3 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/oauth2/OAuth2TokenController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/oauth2/OAuth2TokenController.java) |
| `OAuth2UserController` | `/system/oauth2/user` | 管理后台 - OAuth2.0 用户 | 2 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/oauth2/OAuth2UserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/oauth2/OAuth2UserController.java) |
| `MenuController` | `/system/menu` | 管理后台 - 菜单 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/permission/MenuController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/permission/MenuController.java) |
| `PermissionController` | `/system/permission` | 管理后台 - 权限 | 5 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/permission/PermissionController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/permission/PermissionController.java) |
| `RoleController` | `/system/role` | 管理后台 - 角色 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/permission/RoleController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/permission/RoleController.java) |
| `SmsCallbackController` | `/system/sms/callback` | 管理后台 - 短信回调 | 0 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/sms/SmsCallbackController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/sms/SmsCallbackController.java) |
| `SmsChannelController` | `system/sms-channel` | 管理后台 - 短信渠道 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/sms/SmsChannelController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/sms/SmsChannelController.java) |
| `SmsLogController` | `/system/sms-log` | 管理后台 - 短信日志 | 2 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/sms/SmsLogController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/sms/SmsLogController.java) |
| `SmsTemplateController` | `/system/sms-template` | 管理后台 - 短信模板 | 8 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/sms/SmsTemplateController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/sms/SmsTemplateController.java) |
| `SocialClientController` | `/system/social-client` | 管理后台 - 社交客户端 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/social/SocialClientController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/social/SocialClientController.java) |
| `SocialUserController` | `/system/social-user` | 管理后台 - 社交用户 | 5 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/social/SocialUserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/social/SocialUserController.java) |
| `TenantController` | `/system/tenant` | 管理后台 - 租户 | 9 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/tenant/TenantController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/tenant/TenantController.java) |
| `TenantPackageController` | `/system/tenant-package` | 管理后台 - 租户套餐 | 7 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/tenant/TenantPackageController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/tenant/TenantPackageController.java) |
| `UserController` | `/system/user` | 管理后台 - 用户 | 12 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/user/UserController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/user/UserController.java) |
| `UserProfileController` | `/system/user/profile` | 管理后台 - 用户个人中心 | 3 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/user/UserProfileController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/admin/user/UserProfileController.java) |
| `AppDictDataController` | `/system/dict-data` | 用户 App - 字典数据 | 1 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/app/dict/AppDictDataController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/app/dict/AppDictDataController.java) |
| `AppAreaController` | `/system/area` | 用户 App - 地区 | 1 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/app/ip/AppAreaController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/app/ip/AppAreaController.java) |
| `AppTenantController` | `/system/tenant` | 用户 App - 租户 | 1 | [apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/app/tenant/AppTenantController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-system/yudao-module-system-server/src/main/java/cn/iocoder/yudao/module/system/controller/app/tenant/AppTenantController.java) |
| `WmsHomeStatisticsController` | `/wms/home-statistics` | 管理后台 - WMS 首页统计 | 3 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/home/WmsHomeStatisticsController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/home/WmsHomeStatisticsController.java) |
| `WmsInventoryController` | `/wms/inventory` | 管理后台 - WMS 库存统计 | 2 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/inventory/WmsInventoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/inventory/WmsInventoryController.java) |
| `WmsInventoryHistoryController` | `/wms/inventory-history` | 管理后台 - WMS 库存流水 | 1 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/inventory/WmsInventoryHistoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/inventory/WmsInventoryHistoryController.java) |
| `WmsItemBrandController` | `/wms/item-brand` | 管理后台 - WMS 商品品牌 | 6 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/item/WmsItemBrandController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/item/WmsItemBrandController.java) |
| `WmsItemCategoryController` | `/wms/item-category` | 管理后台 - WMS 商品分类 | 6 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/item/WmsItemCategoryController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/item/WmsItemCategoryController.java) |
| `WmsItemController` | `/wms/item` | 管理后台 - WMS 商品 | 7 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/item/WmsItemController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/item/WmsItemController.java) |
| `WmsItemSkuController` | `/wms/item-sku` | 管理后台 - WMS 商品 SKU | 1 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/item/WmsItemSkuController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/item/WmsItemSkuController.java) |
| `WmsMerchantController` | `/wms/merchant` | 管理后台 - WMS 往来企业 | 6 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/merchant/WmsMerchantController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/merchant/WmsMerchantController.java) |
| `WmsWarehouseController` | `/wms/warehouse` | 管理后台 - WMS 仓库 | 6 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/warehouse/WmsWarehouseController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/md/warehouse/WmsWarehouseController.java) |
| `WmsCheckOrderController` | `/wms/check-order` | 管理后台 - WMS 盘库单 | 8 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/check/WmsCheckOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/check/WmsCheckOrderController.java) |
| `WmsCheckOrderDetailController` | `/wms/check-order-detail` | 管理后台 - WMS 盘库单明细 | 1 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/check/WmsCheckOrderDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/check/WmsCheckOrderDetailController.java) |
| `WmsMovementOrderController` | `/wms/movement-order` | 管理后台 - WMS 移库单 | 8 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/movement/WmsMovementOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/movement/WmsMovementOrderController.java) |
| `WmsMovementOrderDetailController` | `/wms/movement-order-detail` | 管理后台 - WMS 移库单明细 | 1 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/movement/WmsMovementOrderDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/movement/WmsMovementOrderDetailController.java) |
| `WmsReceiptOrderController` | `/wms/receipt-order` | 管理后台 - WMS 入库单 | 8 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/receipt/WmsReceiptOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/receipt/WmsReceiptOrderController.java) |
| `WmsReceiptOrderDetailController` | `/wms/receipt-order-detail` | 管理后台 - WMS 入库单明细 | 1 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/receipt/WmsReceiptOrderDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/receipt/WmsReceiptOrderDetailController.java) |
| `WmsShipmentOrderController` | `/wms/shipment-order` | 管理后台 - WMS 出库单 | 8 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/shipment/WmsShipmentOrderController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/shipment/WmsShipmentOrderController.java) |
| `WmsShipmentOrderDetailController` | `/wms/shipment-order-detail` | 管理后台 - WMS 出库单明细 | 1 | [apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/shipment/WmsShipmentOrderDetailController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-module-wms/yudao-module-wms-server/src/main/java/cn/iocoder/yudao/module/wms/controller/admin/order/shipment/WmsShipmentOrderDetailController.java) |
| `DefaultController` | `/admin-api/bpm/**` | - | 0 | [apps/backend/yudao-server/src/main/java/cn/iocoder/yudao/server/controller/DefaultController.java](file:////host-workspace/xaicd/yudao-quad-terminal/apps/backend/yudao-server/src/main/java/cn/iocoder/yudao/server/controller/DefaultController.java) |

## 3. 详细接口清单

### 📦 `AiChatConversationController` (管理后台 - AI 聊天对话)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/ai/chat/conversation/create-my` | 创建【我的】聊天对话 | `CommonResult<Long>` | `@RequestBody @Valid AiChatConversationCreateMyReqVO createReqVO` |
| `PUT` | `/ai/chat/conversation/update-my` | 更新【我的】聊天对话 | `CommonResult<Boolean>` | `@RequestBody @Valid AiChatConversationUpdateMyReqVO updateReqVO` |
| `GET` | `/ai/chat/conversation/my-list` | 获得【我的】聊天对话列表 | `CommonResult<List<AiChatConversationRespVO>>` | `-` |
| `GET` | `/ai/chat/conversation/get-my` | 获得【我的】聊天对话 | `CommonResult<AiChatConversationRespVO>` | `@RequestParam("id") Long id` |
| `DELETE` | `/ai/chat/conversation/delete-my` | 删除聊天对话 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/ai/chat/conversation/delete-by-unpinned` | 删除未置顶的聊天对话 | `CommonResult<Boolean>` | `-` |
| `GET` | `/ai/chat/conversation/page` | 获得对话分页 | `CommonResult<PageResult<AiChatConversationRespVO>>` | `AiChatConversationPageReqVO pageReqVO` |
| `GET` | `/ai/chat/conversation/get` | 获得对话 | `CommonResult<AiChatConversationRespVO>` | `@RequestParam("id") Long id` |
| `DELETE` | `/ai/chat/conversation/delete-by-admin` | - | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `AiChatMessageController` (管理后台 - 聊天消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/ai/chat/message/send` | - | `CommonResult<AiChatMessageSendRespVO>` | `@Valid @RequestBody AiChatMessageSendReqVO sendReqVO` |
| `POST` | `/ai/chat/message` | - | `Flux<CommonResult<AiChatMessageSendRespVO>>` | `@Valid @RequestBody AiChatMessageSendReqVO sendReqVO` |
| `GET` | `/ai/chat/message/list-by-conversation-id` | - | `CommonResult<List<AiChatMessageRespVO>>` | `@RequestParam("conversationId") Long conversationId` |
| `DELETE` | `/ai/chat/message/delete` | - | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/ai/chat/message/delete-by-conversation-id` | - | `CommonResult<Boolean>` | `@RequestParam("conversationId") Long conversationId` |
| `GET` | `/ai/chat/message/page` | 获得消息分页 | `CommonResult<PageResult<AiChatMessageRespVO>>` | `AiChatMessagePageReqVO pageReqVO` |
| `GET` | `/ai/chat/message/get` | 获得消息 | `CommonResult<AiChatMessageRespVO>` | `@RequestParam("id") Long id` |
| `DELETE` | `/ai/chat/message/delete-by-admin` | - | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `AiImageController` (管理后台 - AI 绘画)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/ai/image/my-page` | 获取【我的】绘图分页 | `CommonResult<PageResult<AiImageRespVO>>` | `@Validated AiImagePageReqVO pageReqVO` |
| `GET` | `/ai/image/public-page` | 获取公开的绘图分页 | `CommonResult<PageResult<AiImageRespVO>>` | `AiImagePublicPageReqVO pageReqVO` |
| `GET` | `/ai/image/get-my` | 获取【我的】绘图记录 | `CommonResult<AiImageRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/image/my-list-by-ids` | 获取【我的】绘图记录列表 | `CommonResult<List<AiImageRespVO>>` | `@RequestParam("ids") List<Long> ids` |
| `POST` | `/ai/image/draw` | - | `CommonResult<Long>` | `@Valid @RequestBody AiImageDrawReqVO drawReqVO` |
| `DELETE` | `/ai/image/delete-my` | - | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/ai/image/midjourney/imagine` | - | `CommonResult<Long>` | `@Valid @RequestBody AiMidjourneyImagineReqVO reqVO` |
| `POST` | `/ai/image/midjourney/notify` | - | `CommonResult<Boolean>` | `@Valid @RequestBody MidjourneyApi.Notify notify` |
| `POST` | `/ai/image/midjourney/action` | - | `CommonResult<Long>` | `@Valid @RequestBody AiMidjourneyActionReqVO reqVO` |
| `GET` | `/ai/image/page` | 获得绘画分页 | `CommonResult<PageResult<AiImageRespVO>>` | `@Valid AiImagePageReqVO pageReqVO` |
| `GET` | `/ai/image/get` | 获得绘画 | `CommonResult<AiImageRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/ai/image/update` | 更新绘画 | `CommonResult<Boolean>` | `@Valid @RequestBody AiImageUpdateReqVO updateReqVO` |
| `DELETE` | `/ai/image/delete` | 删除绘画 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `AiKnowledgeController` (管理后台 - AI 知识库)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/ai/knowledge/page` | 获取知识库分页 | `CommonResult<PageResult<AiKnowledgeRespVO>>` | `@Valid AiKnowledgePageReqVO pageReqVO` |
| `GET` | `/ai/knowledge/get` | 获得知识库 | `CommonResult<AiKnowledgeRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/ai/knowledge/create` | 创建知识库 | `CommonResult<Long>` | `@RequestBody @Valid AiKnowledgeSaveReqVO createReqVO` |
| `PUT` | `/ai/knowledge/update` | 更新知识库 | `CommonResult<Boolean>` | `@RequestBody @Valid AiKnowledgeSaveReqVO updateReqVO` |
| `DELETE` | `/ai/knowledge/delete` | 删除知识库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/knowledge/simple-list` | 获得知识库的精简列表 | `CommonResult<List<AiKnowledgeRespVO>>` | `-` |

### 📦 `AiKnowledgeDocumentController` (管理后台 - AI 知识库文档)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/ai/knowledge/document/page` | 获取文档分页 | `CommonResult<PageResult<AiKnowledgeDocumentRespVO>>` | `@Valid AiKnowledgeDocumentPageReqVO pageReqVO` |
| `GET` | `/ai/knowledge/document/get` | 获取文档详情 | `CommonResult<AiKnowledgeDocumentRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/ai/knowledge/document/create` | 新建文档（单个） | `CommonResult<Long>` | `@RequestBody @Valid AiKnowledgeDocumentCreateReqVO reqVO` |
| `POST` | `/ai/knowledge/document/create-list` | 新建文档（多个） | `CommonResult<List<Long>>` | `@RequestBody @Valid AiKnowledgeDocumentCreateListReqVO reqVO` |
| `PUT` | `/ai/knowledge/document/update` | 更新文档 | `CommonResult<Boolean>` | `@Valid @RequestBody AiKnowledgeDocumentUpdateReqVO reqVO` |
| `PUT` | `/ai/knowledge/document/update-status` | 更新文档状态 | `CommonResult<Boolean>` | `@Valid @RequestBody AiKnowledgeDocumentUpdateStatusReqVO reqVO` |
| `DELETE` | `/ai/knowledge/document/delete` | 删除文档 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `AiKnowledgeSegmentController` (管理后台 - AI 知识库段落)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/ai/knowledge/segment/get` | 获取段落详情 | `CommonResult<AiKnowledgeSegmentRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/knowledge/segment/page` | 获取段落分页 | `CommonResult<PageResult<AiKnowledgeSegmentRespVO>>` | `@Valid AiKnowledgeSegmentPageReqVO pageReqVO` |
| `POST` | `/ai/knowledge/segment/create` | 创建段落 | `CommonResult<Long>` | `@Valid @RequestBody AiKnowledgeSegmentSaveReqVO createReqVO` |
| `PUT` | `/ai/knowledge/segment/update` | 更新段落内容 | `CommonResult<Boolean>` | `@Valid @RequestBody AiKnowledgeSegmentSaveReqVO reqVO` |
| `PUT` | `/ai/knowledge/segment/update-status` | 启禁用段落内容 | `CommonResult<Boolean>` | `@Valid @RequestBody AiKnowledgeSegmentUpdateStatusReqVO reqVO` |
| `DELETE` | `/ai/knowledge/segment/delete` | 删除段落 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/knowledge/segment/split` | 切片内容 | `CommonResult<List<AiKnowledgeSegmentRespVO>>` | `@RequestParam("url") @URL String url, @RequestParam(value = "segmentMaxTokens") Integer segmentMaxTokens` |
| `GET` | `/ai/knowledge/segment/get-process-list` | 获取文档处理列表 | `CommonResult<List<AiKnowledgeSegmentProcessRespVO>>` | `@RequestParam("documentIds") List<Long> documentIds` |
| `GET` | `/ai/knowledge/segment/search` | 搜索段落内容 | `CommonResult<List<AiKnowledgeSegmentSearchRespVO>>` | `@Valid AiKnowledgeSegmentSearchReqVO reqVO` |

### 📦 `AiMindMapController` (管理后台 - AI 思维导图)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/ai/mind-map` | 导图生成（流式） | `Flux<CommonResult<String>>` | `@RequestBody @Valid AiMindMapGenerateReqVO generateReqVO` |
| `DELETE` | `/ai/mind-map/delete` | 删除思维导图 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/mind-map/get` | 获得思维导图 | `CommonResult<AiMindMapRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/mind-map/page` | 获得思维导图分页 | `CommonResult<PageResult<AiMindMapRespVO>>` | `@Valid AiMindMapPageReqVO pageReqVO` |

### 📦 `AiApiKeyController` (管理后台 - AI API 密钥)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/ai/api-key/create` | 创建 API 密钥 | `CommonResult<Long>` | `@Valid @RequestBody AiApiKeySaveReqVO createReqVO` |
| `PUT` | `/ai/api-key/update` | 更新 API 密钥 | `CommonResult<Boolean>` | `@Valid @RequestBody AiApiKeySaveReqVO updateReqVO` |
| `DELETE` | `/ai/api-key/delete` | 删除 API 密钥 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/api-key/get` | 获得 API 密钥 | `CommonResult<AiApiKeyRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/api-key/page` | 获得 API 密钥分页 | `CommonResult<PageResult<AiApiKeyRespVO>>` | `@Valid AiApiKeyPageReqVO pageReqVO` |
| `GET` | `/ai/api-key/simple-list` | 获得 API 密钥分页列表 | `CommonResult<List<AiModelRespVO>>` | `-` |

### 📦 `AiChatRoleController` (管理后台 - AI 聊天角色)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/ai/chat-role/my-page` | 获得【我的】聊天角色分页 | `CommonResult<PageResult<AiChatRoleRespVO>>` | `@Valid AiChatRolePageReqVO pageReqVO` |
| `GET` | `/ai/chat-role/get-my` | 获得【我的】聊天角色 | `CommonResult<AiChatRoleRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/ai/chat-role/create-my` | 创建【我的】聊天角色 | `CommonResult<Long>` | `@Valid @RequestBody AiChatRoleSaveMyReqVO createReqVO` |
| `PUT` | `/ai/chat-role/update-my` | 更新【我的】聊天角色 | `CommonResult<Boolean>` | `@Valid @RequestBody AiChatRoleSaveMyReqVO updateReqVO` |
| `DELETE` | `/ai/chat-role/delete-my` | 删除【我的】聊天角色 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/chat-role/category-list` | 获得聊天角色的分类列表 | `CommonResult<List<String>>` | `-` |
| `POST` | `/ai/chat-role/create` | 创建聊天角色 | `CommonResult<Long>` | `@Valid @RequestBody AiChatRoleSaveReqVO createReqVO` |
| `PUT` | `/ai/chat-role/update` | 更新聊天角色 | `CommonResult<Boolean>` | `@Valid @RequestBody AiChatRoleSaveReqVO updateReqVO` |
| `DELETE` | `/ai/chat-role/delete` | 删除聊天角色 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/chat-role/get` | 获得聊天角色 | `CommonResult<AiChatRoleRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/chat-role/page` | 获得聊天角色分页 | `CommonResult<PageResult<AiChatRoleRespVO>>` | `@Valid AiChatRolePageReqVO pageReqVO` |

### 📦 `AiModelController` (管理后台 - AI 模型)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/ai/model/create` | 创建模型 | `CommonResult<Long>` | `@Valid @RequestBody AiModelSaveReqVO createReqVO` |
| `PUT` | `/ai/model/update` | 更新模型 | `CommonResult<Boolean>` | `@Valid @RequestBody AiModelSaveReqVO updateReqVO` |
| `DELETE` | `/ai/model/delete` | 删除模型 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/model/get` | 获得模型 | `CommonResult<AiModelRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/model/page` | 获得模型分页 | `CommonResult<PageResult<AiModelRespVO>>` | `@Valid AiModelPageReqVO pageReqVO` |
| `GET` | `/ai/model/simple-list` | 获得模型列表 | `CommonResult<List<AiModelRespVO>>` | `@RequestParam("type") Integer type, @RequestParam(value = "platform", required = false) String platform` |

### 📦 `AiToolController` (管理后台 - AI 工具)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/ai/tool/create` | 创建工具 | `CommonResult<Long>` | `@Valid @RequestBody AiToolSaveReqVO createReqVO` |
| `PUT` | `/ai/tool/update` | 更新工具 | `CommonResult<Boolean>` | `@Valid @RequestBody AiToolSaveReqVO updateReqVO` |
| `DELETE` | `/ai/tool/delete` | 删除工具 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/tool/get` | 获得工具 | `CommonResult<AiToolRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/tool/page` | 获得工具分页 | `CommonResult<PageResult<AiToolRespVO>>` | `@Valid AiToolPageReqVO pageReqVO` |
| `GET` | `/ai/tool/simple-list` | 获得工具列表 | `CommonResult<List<AiToolRespVO>>` | `-` |

### 📦 `AiMusicController` (管理后台 - AI 音乐)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/ai/music/my-page` | 获得【我的】音乐分页 | `CommonResult<PageResult<AiMusicRespVO>>` | `@Valid AiMusicPageReqVO pageReqVO` |
| `POST` | `/ai/music/generate` | 音乐生成 | `CommonResult<List<Long>>` | `@RequestBody @Valid AiSunoGenerateReqVO reqVO` |
| `DELETE` | `/ai/music/delete-my` | - | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/music/get-my` | 获取【我的】音乐 | `CommonResult<AiMusicRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/ai/music/update-my` | 修改【我的】音乐 目前只支持修改标题 | `CommonResult<Boolean>` | `AiMusicUpdateMyReqVO updateReqVO` |
| `GET` | `/ai/music/page` | 获得音乐分页 | `CommonResult<PageResult<AiMusicRespVO>>` | `@Valid AiMusicPageReqVO pageReqVO` |
| `GET` | `/ai/music/get` | 获得音乐 | `CommonResult<AiMusicRespVO>` | `@RequestParam("id") Long id` |
| `DELETE` | `/ai/music/delete` | 删除音乐 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/ai/music/update` | 更新音乐 | `CommonResult<Boolean>` | `@Valid @RequestBody AiMusicUpdateReqVO updateReqVO` |

### 📦 `AiWorkflowController` (管理后台 - AI 工作流)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/ai/workflow/create` | 创建 AI 工作流 | `CommonResult<Long>` | `@Valid @RequestBody AiWorkflowSaveReqVO createReqVO` |
| `PUT` | `/ai/workflow/update` | 更新 AI 工作流 | `CommonResult<Boolean>` | `@Valid @RequestBody AiWorkflowSaveReqVO updateReqVO` |
| `DELETE` | `/ai/workflow/delete` | 删除 AI 工作流 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/workflow/get` | 获得 AI 工作流 | `CommonResult<AiWorkflowRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/workflow/page` | 获得 AI 工作流分页 | `CommonResult<PageResult<AiWorkflowRespVO>>` | `@Valid AiWorkflowPageReqVO pageReqVO` |
| `POST` | `/ai/workflow/test` | 测试 AI 工作流 | `CommonResult<Object>` | `@Valid @RequestBody AiWorkflowTestReqVO testReqVO` |

### 📦 `AiWriteController` (管理后台 - AI 写作)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/ai/write` | 写作生成（流式） | `Flux<CommonResult<String>>` | `@RequestBody @Valid AiWriteGenerateReqVO generateReqVO` |
| `DELETE` | `/ai/write/delete` | 删除写作 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/write/get` | 获得写作 | `CommonResult<AiWriteRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/ai/write/page` | 获得写作分页 | `CommonResult<PageResult<AiWriteRespVO>>` | `@Valid AiWritePageReqVO pageReqVO` |

### 📦 `BpmCommentController` (管理后台 - 流程评论)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/bpm/comment/list-by-process-instance-id` | 获得指定流程实例的评论列表 | `CommonResult<List<BpmCommentRespVO>>` | `@RequestParam("processInstanceId") String processInstanceId` |
| `POST` | `/bpm/comment/create` | 创建流程评论 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmCommentCreateReqVO reqVO` |

### 📦 `BpmCategoryController` (管理后台 - BPM 流程分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/bpm/category/create` | 创建流程分类 | `CommonResult<Long>` | `@Valid @RequestBody BpmCategorySaveReqVO createReqVO` |
| `PUT` | `/bpm/category/update` | 更新流程分类 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmCategorySaveReqVO updateReqVO` |
| `PUT` | `/bpm/category/update-sort-batch` | 批量更新流程分类的排序 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `DELETE` | `/bpm/category/delete` | 删除流程分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/category/get` | 获得流程分类 | `CommonResult<BpmCategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/category/page` | 获得流程分类分页 | `CommonResult<PageResult<BpmCategoryRespVO>>` | `@Valid BpmCategoryPageReqVO pageReqVO` |
| `GET` | `/bpm/category/simple-list` | 获取流程分类的精简信息列表 | `CommonResult<List<BpmCategoryRespVO>>` | `-` |

### 📦 `BpmFormController` (管理后台 - 动态表单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/bpm/form/create` | 创建动态表单 | `CommonResult<Long>` | `@Valid @RequestBody BpmFormSaveReqVO createReqVO` |
| `PUT` | `/bpm/form/update` | 更新动态表单 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmFormSaveReqVO updateReqVO` |
| `DELETE` | `/bpm/form/delete` | 删除动态表单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/form/get` | 获得动态表单 | `CommonResult<BpmFormRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/form` | 获得动态表单的精简列表 | `CommonResult<List<BpmFormRespVO>>` | `-` |
| `GET` | `/bpm/form/page` | 获得动态表单分页 | `CommonResult<PageResult<BpmFormRespVO>>` | `@Valid BpmFormPageReqVO pageVO` |

### 📦 `BpmModelController` (管理后台 - 流程模型)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/bpm/model/list` | 获得模型分页 | `CommonResult<List<BpmModelRespVO>>` | `@RequestParam(value = "name", required = false) String name` |
| `GET` | `/bpm/model/get` | 获得模型 | `CommonResult<BpmModelRespVO>` | `@RequestParam("id") String id` |
| `GET` | `/bpm/model/export` | 导出模型 | `CommonResult<BpmModelSaveReqVO>` | `@RequestParam("id") String id` |
| `POST` | `/bpm/model/create` | 新建模型 | `CommonResult<String>` | `@Valid @RequestBody BpmModelSaveReqVO createRetVO` |
| `POST` | `/bpm/model/import` | 导入模型 | `CommonResult<String>` | `@RequestParam("file") MultipartFile file, @RequestParam(value = "key", required = false) String key, @RequestParam(value = "name", required = false) String name) throws IOException { BpmModelSaveReqVO reqVO; try { reqVO = JsonUtils.parseObject(file.getBytes(), BpmModelSaveReqVO.class); } catch (RuntimeException ex` |
| `PUT` | `/bpm/model/update` | 修改模型 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmModelSaveReqVO modelVO` |
| `PUT` | `/bpm/model/update-sort-batch` | 批量修改模型排序 | `CommonResult<Boolean>` | `@RequestParam("ids") List<String> ids` |
| `POST` | `/bpm/model/deploy` | 部署模型 | `CommonResult<Boolean>` | `@RequestParam("id") String id` |
| `PUT` | `/bpm/model/update-state` | 修改模型的状态 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmModelUpdateStateReqVO reqVO` |
| `PUT` | `/bpm/model/update-bpmn` | 修改模型的 BPMN | `CommonResult<Boolean>` | `@Valid @RequestBody BpmModeUpdateBpmnReqVO reqVO` |
| `DELETE` | `/bpm/model/delete` | 删除模型 | `CommonResult<Boolean>` | `@RequestParam("id") String id` |
| `DELETE` | `/bpm/model/clean` | 清理模型 | `CommonResult<Boolean>` | `@RequestParam("id") String id` |
| `GET` | `/bpm/model/simple/get` | 获得仿钉钉流程设计模型 | `CommonResult<BpmSimpleModelNodeVO>` | `@RequestParam("id") String modelId` |
| `POST` | `/bpm/model/simple/update` | 保存仿钉钉流程设计模型 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmSimpleModelUpdateReqVO reqVO` |

### 📦 `BpmProcessDefinitionController` (管理后台 - 流程定义)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/bpm/process-definition/page` | 获得流程定义分页 | `CommonResult<PageResult<BpmProcessDefinitionRespVO>>` | `BpmProcessDefinitionPageReqVO pageReqVO` |
| `GET` | `/bpm/process-definition` | 获得流程定义列表 | `CommonResult<List<BpmProcessDefinitionRespVO>>` | `@RequestParam("suspensionState") Integer suspensionState` |
| `GET` | `/bpm/process-definition/simple-list` | 获得流程定义精简列表 | `CommonResult<List<BpmProcessDefinitionRespVO>>` | `-` |
| `GET` | `/bpm/process-definition` | 获得流程定义 | `CommonResult<BpmProcessDefinitionRespVO>` | `@RequestParam(value = "id", required = false) String id, @RequestParam(value = "key", required = false) String key` |

### 📦 `BpmProcessExpressionController` (管理后台 - BPM 流程表达式)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/bpm/process-expression/create` | 创建流程表达式 | `CommonResult<Long>` | `@Valid @RequestBody BpmProcessExpressionSaveReqVO createReqVO` |
| `PUT` | `/bpm/process-expression/update` | 更新流程表达式 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmProcessExpressionSaveReqVO updateReqVO` |
| `DELETE` | `/bpm/process-expression/delete` | 删除流程表达式 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/process-expression/get` | 获得流程表达式 | `CommonResult<BpmProcessExpressionRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/process-expression/page` | 获得流程表达式分页 | `CommonResult<PageResult<BpmProcessExpressionRespVO>>` | `@Valid BpmProcessExpressionPageReqVO pageReqVO` |

### 📦 `BpmProcessListenerController` (管理后台 - BPM 流程监听器)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/bpm/process-listener/create` | 创建流程监听器 | `CommonResult<Long>` | `@Valid @RequestBody BpmProcessListenerSaveReqVO createReqVO` |
| `PUT` | `/bpm/process-listener/update` | 更新流程监听器 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmProcessListenerSaveReqVO updateReqVO` |
| `DELETE` | `/bpm/process-listener/delete` | 删除流程监听器 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/process-listener/get` | 获得流程监听器 | `CommonResult<BpmProcessListenerRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/process-listener/page` | 获得流程监听器分页 | `CommonResult<PageResult<BpmProcessListenerRespVO>>` | `@Valid BpmProcessListenerPageReqVO pageReqVO` |

### 📦 `BpmUserGroupController` (管理后台 - 用户组)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/bpm/user-group/create` | 创建用户组 | `CommonResult<Long>` | `@Valid @RequestBody BpmUserGroupSaveReqVO createReqVO` |
| `PUT` | `/bpm/user-group/update` | 更新用户组 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmUserGroupSaveReqVO updateReqVO` |
| `DELETE` | `/bpm/user-group/delete` | 删除用户组 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/user-group/get` | 获得用户组 | `CommonResult<BpmUserGroupRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/user-group/page` | 获得用户组分页 | `CommonResult<PageResult<BpmUserGroupRespVO>>` | `@Valid BpmUserGroupPageReqVO pageVO` |
| `GET` | `/bpm/user-group/simple-list` | 获取用户组精简信息列表 | `CommonResult<List<BpmUserGroupRespVO>>` | `-` |

### 📦 `BpmOALeaveController` (管理后台 - OA 请假申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/bpm/oa/leave/create` | 创建请求申请 | `CommonResult<Long>` | `@Valid @RequestBody BpmOALeaveCreateReqVO createReqVO` |
| `GET` | `/bpm/oa/leave/get` | 获得请假申请 | `CommonResult<BpmOALeaveRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/bpm/oa/leave/page` | 获得请假申请分页 | `CommonResult<PageResult<BpmOALeaveRespVO>>` | `@Valid BpmOALeavePageReqVO pageVO` |

### 📦 `BpmProcessInstanceController` (管理后台 - 流程实例)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/bpm/process-instance/my-page` | 获得我的实例分页列表 | `CommonResult<PageResult<BpmProcessInstanceRespVO>>` | `@Valid BpmProcessInstancePageReqVO pageReqVO` |
| `GET` | `/bpm/process-instance/manager-page` | 获得管理流程实例的分页列表 | `CommonResult<PageResult<BpmProcessInstanceRespVO>>` | `@Valid BpmProcessInstancePageReqVO pageReqVO` |
| `POST` | `/bpm/process-instance/create` | 新建流程实例 | `CommonResult<String>` | `@Valid @RequestBody BpmProcessInstanceCreateReqVO createReqVO` |
| `GET` | `/bpm/process-instance/get` | 获得指定流程实例 | `CommonResult<BpmProcessInstanceRespVO>` | `@RequestParam("id") String id` |
| `DELETE` | `/bpm/process-instance/cancel-by-start-user` | 用户取消流程实例 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmProcessInstanceCancelReqVO cancelReqVO` |
| `DELETE` | `/bpm/process-instance/cancel-by-admin` | 管理员取消流程实例 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmProcessInstanceCancelReqVO cancelReqVO` |
| `GET` | `/bpm/process-instance/get-approval-detail` | 获得审批详情 | `CommonResult<BpmApprovalDetailRespVO>` | `@Valid BpmApprovalDetailReqVO reqVO` |
| `GET` | `/bpm/process-instance/get-next-approval-nodes` | 获取下一个执行的流程节点 | `CommonResult<List<BpmApprovalDetailRespVO.ActivityNode>>` | `@Valid BpmApprovalDetailReqVO reqVO` |
| `GET` | `/bpm/process-instance/get-bpmn-model-view` | 获取流程实例的 BPMN 模型视图 | `CommonResult<BpmProcessInstanceBpmnModelViewRespVO>` | `@RequestParam(value = "id") String id` |
| `GET` | `/bpm/process-instance/get-print-data` | 获得流程实例的打印数据 | `CommonResult<BpmProcessPrintDataRespVO>` | `@RequestParam("processInstanceId") String processInstanceId` |

### 📦 `BpmProcessInstanceCopyController` (管理后台 - 流程实例抄送)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/bpm/process-instance/copy/page` | 获得抄送流程分页列表 | `CommonResult<PageResult<BpmProcessInstanceCopyRespVO>>` | `@Valid BpmProcessInstanceCopyPageReqVO pageReqVO` |

### 📦 `BpmTaskController` (管理后台 - 流程任务实例)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/bpm/tasktodo-page` | 获取 Todo 待办任务分页 | `CommonResult<PageResult<BpmTaskRespVO>>` | `@Valid BpmTaskPageReqVO pageVO` |
| `GET` | `/bpm/taskdone-page` | 获取 Done 已办任务分页 | `CommonResult<PageResult<BpmTaskRespVO>>` | `@Valid BpmTaskPageReqVO pageVO` |
| `GET` | `/bpm/taskmanager-page` | 获取全部任务的分页 | `CommonResult<PageResult<BpmTaskRespVO>>` | `@Valid BpmTaskPageReqVO pageVO` |
| `GET` | `/bpm/task/list-by-process-instance-id` | 获得指定流程实例的任务列表 | `CommonResult<List<BpmTaskRespVO>>` | `@RequestParam("processInstanceId") String processInstanceId` |
| `PUT` | `/bpm/task/approve` | 通过任务 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmTaskApproveReqVO reqVO` |
| `PUT` | `/bpm/task/reject` | 不通过任务 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmTaskRejectReqVO reqVO` |
| `GET` | `/bpm/task/list-by-return` | 获取所有可退回的节点 | `CommonResult<List<BpmTaskRespVO>>` | `@RequestParam("id") String id` |
| `PUT` | `/bpm/task/return` | 退回任务 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmTaskReturnReqVO reqVO` |
| `PUT` | `/bpm/task/delegate` | 委派任务 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmTaskDelegateReqVO reqVO` |
| `PUT` | `/bpm/task/transfer` | 转派任务 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmTaskTransferReqVO reqVO` |
| `PUT` | `/bpm/task/create-sign` | 加签 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmTaskSignCreateReqVO reqVO` |
| `DELETE` | `/bpm/task/delete-sign` | 减签 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmTaskSignDeleteReqVO reqVO` |
| `PUT` | `/bpm/task/copy` | 抄送任务 | `CommonResult<Boolean>` | `@Valid @RequestBody BpmTaskCopyReqVO reqVO` |
| `PUT` | `/bpm/task/withdraw` | 撤回任务 | `CommonResult<Boolean>` | `@RequestParam("taskId") String taskId` |
| `GET` | `/bpm/task/list-by-parent-task-id` | 获得指定父级任务的子任务列表 | `CommonResult<List<BpmTaskRespVO>>` | `@RequestParam("parentTaskId") String parentTaskId` |

### 📦 `CrmBusinessController` (管理后台 - CRM 商机)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/business/create` | 创建商机 | `CommonResult<Long>` | `@Valid @RequestBody CrmBusinessSaveReqVO createReqVO` |
| `PUT` | `/crm/business/update` | 更新商机 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmBusinessSaveReqVO updateReqVO` |
| `PUT` | `/crm/business/update-status` | 更新商机状态 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmBusinessUpdateStatusReqVO updateStatusReqVO` |
| `DELETE` | `/crm/business/delete` | 删除商机 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/business/get` | 获得商机 | `CommonResult<CrmBusinessRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/business/simple-all-list` | 获得商机的精简列表 | `CommonResult<List<CrmBusinessRespVO>>` | `-` |
| `GET` | `/crm/business/list-by-customer` | 获得商机列表，基于指定客户 | `CommonResult<List<CrmBusinessRespVO>>` | `@RequestParam("customerId") Long customerId` |
| `GET` | `/crm/business/list-by-contact` | 获得商机列表，基于指定联系人 | `CommonResult<List<CrmBusinessRespVO>>` | `@RequestParam("contactId") Long contactId` |
| `GET` | `/crm/business/page` | 获得商机分页 | `CommonResult<PageResult<CrmBusinessRespVO>>` | `@Valid CrmBusinessPageReqVO pageVO` |
| `GET` | `/crm/business/page-by-customer` | 获得商机分页，基于指定客户 | `CommonResult<PageResult<CrmBusinessRespVO>>` | `@Valid CrmBusinessPageReqVO pageReqVO` |
| `GET` | `/crm/business/page-by-contact` | 获得联系人的商机分页 | `CommonResult<PageResult<CrmBusinessRespVO>>` | `@Valid CrmBusinessPageReqVO pageReqVO` |
| `GET` | `/crm/business/export-excel` | 导出商机 Excel | `void` | `@Valid CrmBusinessPageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PAGE_SIZE_NONE); List<CrmBusinessDO> list = businessService.getBusinessPage(exportReqVO, getLoginUserId()).getList(); // 导出 Excel ExcelUtils.write(response, "商机.xls", "数据", CrmBusinessRespVO.class, buildBusinessDetailList(list)); } public List<CrmBusinessRespVO> buildBusinessDetailList(List<CrmBusinessDO> list` |
| `PUT` | `/crm/business/transfer` | 商机转移 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmBusinessTransferReqVO reqVO` |

### 📦 `CrmBusinessStatusController` (管理后台 - CRM 商机状态)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/business-status/create` | 创建商机状态 | `CommonResult<Long>` | `@Valid @RequestBody CrmBusinessStatusSaveReqVO createReqVO` |
| `PUT` | `/crm/business-status/update` | 更新商机状态 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmBusinessStatusSaveReqVO updateReqVO` |
| `DELETE` | `/crm/business-status/delete` | 删除商机状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/business-status/get` | 获得商机状态 | `CommonResult<CrmBusinessStatusRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/business-status/page` | 获得商机状态分页 | `CommonResult<PageResult<CrmBusinessStatusRespVO>>` | `@Valid PageParam pageReqVO` |
| `GET` | `/crm/business-status/type-simple-list` | 获得商机状态组列表 | `CommonResult<List<CrmBusinessStatusRespVO>>` | `-` |
| `GET` | `/crm/business-status/status-simple-list` | 获得商机状态列表 | `CommonResult<List<CrmBusinessStatusRespVO.Status>>` | `@RequestParam("typeId") Long typeId` |

### 📦 `CrmClueController` (管理后台 - 线索)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/clue/create` | 创建线索 | `CommonResult<Long>` | `@Valid @RequestBody CrmClueSaveReqVO createReqVO` |
| `PUT` | `/crm/clue/update` | 更新线索 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmClueSaveReqVO updateReqVO` |
| `DELETE` | `/crm/clue/delete` | 删除线索 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/clue/get` | 获得线索 | `CommonResult<CrmClueRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/clue/page` | 获得线索分页 | `CommonResult<PageResult<CrmClueRespVO>>` | `@Valid CrmCluePageReqVO pageVO` |
| `GET` | `/crm/clue/export-excel` | 导出线索 Excel | `void` | `@Valid CrmCluePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PAGE_SIZE_NONE); List<CrmClueDO> list = clueService.getCluePage(pageReqVO, getLoginUserId()).getList(); // 导出 Excel ExcelUtils.write(response, "线索.xls", "数据", CrmClueRespVO.class, buildClueDetailList(list)); } private List<CrmClueRespVO> buildClueDetailList(List<CrmClueDO> list` |
| `PUT` | `/crm/clue/transfer` | 线索转移 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmClueTransferReqVO reqVO` |
| `PUT` | `/crm/clue/transform` | 线索转化为客户 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/clue/follow-count` | 获得分配给我的、待跟进的线索数量 | `CommonResult<Long>` | `-` |

### 📦 `CrmContactController` (管理后台 - CRM 联系人)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/contact/create` | 创建联系人 | `CommonResult<Long>` | `@Valid @RequestBody CrmContactSaveReqVO createReqVO` |
| `PUT` | `/crm/contact/update` | 更新联系人 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmContactSaveReqVO updateReqVO` |
| `DELETE` | `/crm/contact/delete` | 删除联系人 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/contact/get` | 获得联系人 | `CommonResult<CrmContactRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/contact/simple-all-list` | 获得联系人的精简列表 | `CommonResult<List<CrmContactRespVO>>` | `-` |
| `GET` | `/crm/contact/list-by-customer` | 获得联系人列表，基于指定客户 | `CommonResult<List<CrmContactRespVO>>` | `@RequestParam("customerId") Long customerId` |
| `GET` | `/crm/contact/page` | 获得联系人分页 | `CommonResult<PageResult<CrmContactRespVO>>` | `@Valid CrmContactPageReqVO pageVO` |
| `GET` | `/crm/contact/page-by-customer` | 获得联系人分页，基于指定客户 | `CommonResult<PageResult<CrmContactRespVO>>` | `@Valid CrmContactPageReqVO pageVO` |
| `GET` | `/crm/contact/page-by-business` | 获得联系人分页，基于指定商机 | `CommonResult<PageResult<CrmContactRespVO>>` | `@Valid CrmContactPageReqVO pageVO` |
| `GET` | `/crm/contact/export-excel` | 导出联系人 Excel | `void` | `@Valid CrmContactPageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageNo(PAGE_SIZE_NONE); List<CrmContactDO> list = contactService.getContactPage(exportReqVO, getLoginUserId()).getList(); ExcelUtils.write(response, "联系人.xls", "数据", CrmContactRespVO.class, buildContactDetailList(list)); } private List<CrmContactRespVO> buildContactDetailList(List<CrmContactDO> contactList` |
| `PUT` | `/crm/contact/transfer` | 联系人转移 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmContactTransferReqVO reqVO` |
| `POST` | `/crm/contact/create-business-list` | 创建联系人与商机的关联 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmContactBusinessReqVO createReqVO` |
| `POST` | `/crm/contact/create-business-list2` | 创建联系人与商机的关联 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmContactBusiness2ReqVO createReqVO` |
| `DELETE` | `/crm/contact/delete-business-list` | 删除联系人与联系人的关联 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmContactBusinessReqVO deleteReqVO` |
| `DELETE` | `/crm/contact/delete-business-list2` | 删除联系人与联系人的关联 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmContactBusiness2ReqVO deleteReqVO` |

### 📦 `CrmContractConfigController` (管理后台 - CRM 合同配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/contract-config/get` | 获取合同配置 | `CommonResult<CrmContractConfigRespVO>` | `-` |
| `PUT` | `/crm/contract-config/save` | 更新合同配置 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmContractConfigSaveReqVO updateReqVO` |

### 📦 `CrmContractController` (管理后台 - CRM 合同)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/contract/create` | 创建合同 | `CommonResult<Long>` | `@Valid @RequestBody CrmContractSaveReqVO createReqVO` |
| `PUT` | `/crm/contract/update` | 更新合同 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmContractSaveReqVO updateReqVO` |
| `DELETE` | `/crm/contract/delete` | 删除合同 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/contract/get` | 获得合同 | `CommonResult<CrmContractRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/contract/page` | 获得合同分页 | `CommonResult<PageResult<CrmContractRespVO>>` | `@Valid CrmContractPageReqVO pageVO` |
| `GET` | `/crm/contract/page-by-customer` | 获得合同分页，基于指定客户 | `CommonResult<PageResult<CrmContractRespVO>>` | `@Valid CrmContractPageReqVO pageVO` |
| `GET` | `/crm/contract/page-by-business` | 获得合同分页，基于指定商机 | `CommonResult<PageResult<CrmContractRespVO>>` | `@Valid CrmContractPageReqVO pageVO` |
| `GET` | `/crm/contract/export-excel` | 导出合同 Excel | `void` | `@Valid CrmContractPageReqVO exportReqVO, HttpServletResponse response) throws IOException { PageResult<CrmContractDO> pageResult = contractService.getContractPage(exportReqVO, getLoginUserId()); // 导出 Excel ExcelUtils.write(response, "合同.xls", "数据", CrmContractRespVO.class, BeanUtils.toBean(pageResult.getList(), CrmContractRespVO.class)); } @PutMapping("/transfer") @Operation(summary = "合同转移") @PreAuthorize("@ss.hasPermission('crm:contract:update')") public CommonResult<Boolean> transferContract(@Valid @RequestBody CrmContractTransferReqVO reqVO` |
| `PUT` | `/crm/contract/submit` | 提交合同审批 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/contract/audit-count` | 获得待审核合同数量 | `CommonResult<Long>` | `-` |
| `GET` | `/crm/contract/remind-count` | 获得即将到期（提醒）的合同数量 | `CommonResult<Long>` | `-` |
| `GET` | `/crm/contract/simple-list` | 获得合同精简列表 | `CommonResult<List<CrmContractRespVO>>` | `@RequestParam("customerId") Long customerId` |

### 📦 `CrmCustomerController` (管理后台 - CRM 客户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/customer/create` | 创建客户 | `CommonResult<Long>` | `@Valid @RequestBody CrmCustomerSaveReqVO createReqVO` |
| `PUT` | `/crm/customer/update` | 更新客户 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmCustomerSaveReqVO updateReqVO` |
| `PUT` | `/crm/customer/update-deal-status` | 更新客户的成交状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("dealStatus") Boolean dealStatus` |
| `DELETE` | `/crm/customer/delete` | 删除客户 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/customer/get` | 获得客户 | `CommonResult<CrmCustomerRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/customer/page` | 获得客户分页 | `CommonResult<PageResult<CrmCustomerRespVO>>` | `@Valid CrmCustomerPageReqVO pageVO` |
| `GET` | `/crm/customer/put-pool-remind-page` | 获得待进入公海客户分页 | `CommonResult<PageResult<CrmCustomerRespVO>>` | `@Valid CrmCustomerPageReqVO pageVO` |
| `GET` | `/crm/customer/put-pool-remind-count` | 获得待进入公海客户数量 | `CommonResult<Long>` | `-` |
| `GET` | `/crm/customer/today-contact-count` | 获得今日需联系客户数量 | `CommonResult<Long>` | `-` |
| `GET` | `/crm/customer/follow-count` | 获得分配给我、待跟进的线索数量的客户数量 | `CommonResult<Long>` | `-` |
| `GET` | `/crm/customer` | 获取客户精简信息列表 | `CommonResult<List<CrmCustomerRespVO>>` | `-` |
| `GET` | `/crm/customer/export-excel` | 导出客户 Excel | `void` | `@Valid CrmCustomerPageReqVO pageVO, HttpServletResponse response) throws IOException { pageVO.setPageSize(PAGE_SIZE_NONE); // 不分页 List<CrmCustomerDO> list = customerService.getCustomerPage(pageVO, getLoginUserId()).getList(); // 导出 Excel ExcelUtils.write(response, "客户.xls", "数据", CrmCustomerRespVO.class, buildCustomerDetailList(list)); } @GetMapping("/get-import-template") @Operation(summary = "获得导入客户模板") public void importTemplate(HttpServletResponse response) throws IOException { // 手动创建导出 demo List<CrmCustomerImportExcelVO> list = Arrays.asList( CrmCustomerImportExcelVO.builder().name("芋道").industryId(1).level(1).source(1) .mobile("15601691300").telephone("").qq("").wechat("").email("yunai@iocoder.cn") .areaId(null).detailAddress("").remark("").build(), CrmCustomerImportExcelVO.builder().name("源码").industryId(1).level(1).source(1) .mobile("15601691300").telephone("").qq("").wechat("").email("yunai@iocoder.cn") .areaId(null).detailAddress("").remark("").build() ); // 输出 ExcelUtils.write(response, "客户导入模板.xls", "客户列表", CrmCustomerImportExcelVO.class, list); } @PostMapping("/import") @Operation(summary = "导入客户") @PreAuthorize("@ss.hasPermission('crm:customer:import')") public CommonResult<CrmCustomerImportRespVO> importExcel(@Valid CrmCustomerImportReqVO importReqVO) throws Exception { List<CrmCustomerImportExcelVO> list = ExcelUtils.read(importReqVO.getFile(), CrmCustomerImportExcelVO.class); return success(customerService.importCustomerList(list, importReqVO)); } @PutMapping("/transfer") @Operation(summary = "转移客户") @PreAuthorize("@ss.hasPermission('crm:customer:update')") public CommonResult<Boolean> transferCustomer(@Valid @RequestBody CrmCustomerTransferReqVO reqVO` |
| `PUT` | `/crm/customer/lock` | 锁定/解锁客户 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmCustomerLockReqVO lockReqVO` |
| `PUT` | `/crm/customer/put-pool` | 数据放入公海 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/crm/customer/receive` | 领取公海客户 | `CommonResult<Boolean>` | `@RequestParam(value = "ids") List<Long> ids` |
| `PUT` | `/crm/customer/distribute` | 分配公海给对应负责人 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmCustomerDistributeReqVO distributeReqVO` |

### 📦 `CrmCustomerLimitConfigController` (管理后台 - CRM 客户限制配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/customer-limit-config/create` | 创建客户限制配置 | `CommonResult<Long>` | `@Valid @RequestBody CrmCustomerLimitConfigSaveReqVO createReqVO` |
| `PUT` | `/crm/customer-limit-config/update` | 更新客户限制配置 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmCustomerLimitConfigSaveReqVO updateReqVO` |
| `DELETE` | `/crm/customer-limit-config/delete` | 删除客户限制配置 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/customer-limit-config/get` | 获得客户限制配置 | `CommonResult<CrmCustomerLimitConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/customer-limit-config/page` | 获得客户限制配置分页 | `CommonResult<PageResult<CrmCustomerLimitConfigRespVO>>` | `@Valid CrmCustomerLimitConfigPageReqVO pageVO` |

### 📦 `CrmCustomerPoolConfigController` (管理后台 - CRM 客户公海配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/customer-pool-config/get` | 获取客户公海规则设置 | `CommonResult<CrmCustomerPoolConfigRespVO>` | `-` |
| `PUT` | `/crm/customer-pool-config/save` | 更新客户公海规则设置 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmCustomerPoolConfigSaveReqVO updateReqVO` |

### 📦 `CrmFollowUpRecordController` (管理后台 - 跟进记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/follow-up-record/create` | 创建跟进记录 | `CommonResult<Long>` | `@Valid @RequestBody CrmFollowUpRecordSaveReqVO createReqVO` |
| `DELETE` | `/crm/follow-up-record/delete` | 删除跟进记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/follow-up-record/get` | 获得跟进记录 | `CommonResult<CrmFollowUpRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/follow-up-record/page` | 获得跟进记录分页 | `CommonResult<PageResult<CrmFollowUpRecordRespVO>>` | `@Valid CrmFollowUpRecordPageReqVO pageReqVO` |

### 📦 `CrmOperateLogController` (管理后台 - CRM 操作日志)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/operate-log/page` | 获得操作日志 | `CommonResult<PageResult<CrmOperateLogRespVO>>` | `@Valid CrmOperateLogPageReqVO pageReqVO` |

### 📦 `CrmPerformanceConfigController` (管理后台 - CRM 业绩目标设置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/performance-config/create` | 创建业绩目标 | `CommonResult<Long>` | `@Valid @RequestBody CrmPerformanceConfigSaveReqVO createReqVO` |
| `PUT` | `/crm/performance-config/update` | 更新业绩目标 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmPerformanceConfigSaveReqVO updateReqVO` |
| `DELETE` | `/crm/performance-config/delete` | 删除业绩目标 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/performance-config/get` | 获得业绩目标 | `CommonResult<CrmPerformanceConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/performance-config/page` | 获得业绩目标分页 | `CommonResult<PageResult<CrmPerformanceConfigRespVO>>` | `@Valid CrmPerformanceConfigPageReqVO pageReqVO` |

### 📦 `CrmPermissionController` (管理后台 - CRM 数据权限)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/permission/create` | 创建数据权限 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmPermissionSaveReqVO reqVO` |
| `PUT` | `/crm/permission/update` | 编辑数据权限 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmPermissionUpdateReqVO updateReqVO` |
| `DELETE` | `/crm/permission/delete` | 删除数据权限 | `CommonResult<Boolean>` | `@RequestParam("ids") Collection<Long> ids` |
| `DELETE` | `/crm/permission/delete-self` | 删除自己的数据权限 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/permission/list` | 获得数据权限列表 | `CommonResult<List<CrmPermissionRespVO>>` | `@RequestParam("bizType") Integer bizType, @RequestParam("bizId") Long bizId` |

### 📦 `CrmProductCategoryController` (管理后台 - CRM 产品分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/product-category/create` | 创建产品分类 | `CommonResult<Long>` | `@Valid @RequestBody CrmProductCategoryCreateReqVO createReqVO` |
| `PUT` | `/crm/product-category/update` | 更新产品分类 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmProductCategoryCreateReqVO updateReqVO` |
| `DELETE` | `/crm/product-category/delete` | 删除产品分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/product-category/get` | 获得产品分类 | `CommonResult<CrmProductCategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/product-category/list` | 获得产品分类列表 | `CommonResult<List<CrmProductCategoryRespVO>>` | `@Valid CrmProductCategoryListReqVO listReqVO` |

### 📦 `CrmProductController` (管理后台 - CRM 产品)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/product/create` | 创建产品 | `CommonResult<Long>` | `@Valid @RequestBody CrmProductSaveReqVO createReqVO` |
| `PUT` | `/crm/product/update` | 更新产品 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmProductSaveReqVO updateReqVO` |
| `DELETE` | `/crm/product/delete` | 删除产品 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/product/get` | 获得产品 | `CommonResult<CrmProductRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/product/simple-list` | 获得产品精简列表 | `CommonResult<List<CrmProductRespVO>>` | `-` |
| `GET` | `/crm/product/page` | 获得产品分页 | `CommonResult<PageResult<CrmProductRespVO>>` | `@Valid CrmProductPageReqVO pageVO` |

### 📦 `CrmReceivableController` (管理后台 - CRM 回款)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/receivable/create` | 创建回款 | `CommonResult<Long>` | `@Valid @RequestBody CrmReceivableSaveReqVO createReqVO` |
| `PUT` | `/crm/receivable/update` | 更新回款 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmReceivableSaveReqVO updateReqVO` |
| `DELETE` | `/crm/receivable/delete` | 删除回款 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/receivable/get` | 获得回款 | `CommonResult<CrmReceivableRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/receivable/page` | 获得回款分页 | `CommonResult<PageResult<CrmReceivableRespVO>>` | `@Valid CrmReceivablePageReqVO pageReqVO` |
| `GET` | `/crm/receivable/page-by-customer` | 获得回款分页，基于指定客户 | `CommonResult<PageResult<CrmReceivableRespVO>>` | `@Valid CrmReceivablePageReqVO pageReqVO` |
| `GET` | `/crm/receivable/export-excel` | 导出回款 Excel | `void` | `@Valid CrmReceivablePageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PAGE_SIZE_NONE); List<CrmReceivableDO> list = receivableService.getReceivablePage(exportReqVO, getLoginUserId()).getList(); // 导出 Excel ExcelUtils.write(response, "回款.xls", "数据", CrmReceivableRespVO.class, buildReceivableDetailList(list)); } private List<CrmReceivableRespVO> buildReceivableDetailList(List<CrmReceivableDO> receivableList` |
| `PUT` | `/crm/receivable/submit` | 提交回款审批 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/receivable/audit-count` | 获得待审核回款数量 | `CommonResult<Long>` | `-` |

### 📦 `CrmReceivablePlanController` (管理后台 - CRM 回款计划)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/crm/receivable-plan/create` | 创建回款计划 | `CommonResult<Long>` | `@Valid @RequestBody CrmReceivablePlanSaveReqVO createReqVO` |
| `PUT` | `/crm/receivable-plan/update` | 更新回款计划 | `CommonResult<Boolean>` | `@Valid @RequestBody CrmReceivablePlanSaveReqVO updateReqVO` |
| `DELETE` | `/crm/receivable-plan/delete` | 删除回款计划 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/receivable-plan/get` | 获得回款计划 | `CommonResult<CrmReceivablePlanRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/crm/receivable-plan/page` | 获得回款计划分页 | `CommonResult<PageResult<CrmReceivablePlanRespVO>>` | `@Valid CrmReceivablePlanPageReqVO pageReqVO` |
| `GET` | `/crm/receivable-plan/page-by-customer` | 获得回款计划分页，基于指定客户 | `CommonResult<PageResult<CrmReceivablePlanRespVO>>` | `@Valid CrmReceivablePlanPageReqVO pageReqVO` |
| `GET` | `/crm/receivable-plan/export-excel` | 导出回款计划 Excel | `void` | `@Valid CrmReceivablePlanPageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PAGE_SIZE_NONE); List<CrmReceivablePlanDO> list = receivablePlanService.getReceivablePlanPage(exportReqVO, getLoginUserId()).getList(); // 导出 Excel ExcelUtils.write(response, "回款计划.xls", "数据", CrmReceivablePlanRespVO.class, buildReceivableDetailList(list)); } private List<CrmReceivablePlanRespVO> buildReceivableDetailList(List<CrmReceivablePlanDO> receivablePlanList` |
| `GET` | `/crm/receivable-plan/simple-list` | 获得回款计划精简列表 | `CommonResult<List<CrmReceivablePlanRespVO>>` | `@RequestParam("customerId") Long customerId, @RequestParam("contractId") Long contractId` |
| `GET` | `/crm/receivable-plan/remind-count` | 获得待回款提醒数量 | `CommonResult<Long>` | `-` |

### 📦 `CrmStatisticsCustomerController` (管理后台 - CRM 客户统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/statistics-customer/get-customer-summary-by-date` | 获取客户总量分析(按日期) | `CommonResult<List<CrmStatisticsCustomerSummaryByDateRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-customer-summary-by-user` | 获取客户总量分析(按用户) | `CommonResult<List<CrmStatisticsCustomerSummaryByUserRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-follow-up-summary-by-date` | 获取客户跟进次数分析(按日期) | `CommonResult<List<CrmStatisticsFollowUpSummaryByDateRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-follow-up-summary-by-user` | 获取客户跟进次数分析(按用户) | `CommonResult<List<CrmStatisticsFollowUpSummaryByUserRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-follow-up-summary-by-type` | 获取客户跟进次数分析(按类型) | `CommonResult<List<CrmStatisticsFollowUpSummaryByTypeRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-contract-summary` | 获取客户的首次合同、回款信息列表 | `CommonResult<List<CrmStatisticsCustomerContractSummaryRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-pool-summary-by-date` | 获取公海客户分析(按日期) | `CommonResult<List<CrmStatisticsPoolSummaryByDateRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-pool-summary-by-user` | 获取公海客户分析(按用户) | `CommonResult<List<CrmStatisticsPoolSummaryByUserRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-customer-deal-cycle-by-date` | 获取客户成交周期(按日期) | `CommonResult<List<CrmStatisticsCustomerDealCycleByDateRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-customer-deal-cycle-by-user` | 获取客户成交周期(按用户) | `CommonResult<List<CrmStatisticsCustomerDealCycleByUserRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-customer-deal-cycle-by-area` | 获取客户成交周期(按用户) | `CommonResult<List<CrmStatisticsCustomerDealCycleByAreaRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |
| `GET` | `/crm/statistics-customer/get-customer-deal-cycle-by-product` | 获取客户成交周期(按用户) | `CommonResult<List<CrmStatisticsCustomerDealCycleByProductRespVO>>` | `@Valid CrmStatisticsCustomerReqVO reqVO` |

### 📦 `CrmStatisticsFunnelController` (管理后台 - CRM 销售漏斗)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/statistics-funnel/get-funnel-summary` | 获取销售漏斗统计数据 | `CommonResult<CrmStatisticFunnelSummaryRespVO>` | `@Valid CrmStatisticsFunnelReqVO reqVO` |
| `GET` | `/crm/statistics-funnel/get-business-summary-by-end-status` | 获取商机结束状态统计 | `CommonResult<List<CrmStatisticsBusinessSummaryByEndStatusRespVO>>` | `@Valid CrmStatisticsFunnelReqVO reqVO` |
| `GET` | `/crm/statistics-funnel/get-business-summary-by-status` | 获取商机阶段统计 | `CommonResult<List<CrmStatisticsBusinessSummaryByStatusRespVO>>` | `@Valid CrmStatisticsFunnelReqVO reqVO` |
| `GET` | `/crm/statistics-funnel/get-business-summary-by-date` | 获取新增商机分析(按日期) | `CommonResult<List<CrmStatisticsBusinessSummaryByDateRespVO>>` | `@Valid CrmStatisticsFunnelReqVO reqVO` |
| `GET` | `/crm/statistics-funnel/get-business-inversion-rate-summary-by-date` | 获取商机转化率分析(按日期) | `CommonResult<List<CrmStatisticsBusinessInversionRateSummaryByDateRespVO>>` | `@Valid CrmStatisticsFunnelReqVO reqVO` |
| `GET` | `/crm/statistics-funnel/get-business-page-by-date` | 获得商机分页(按日期) | `CommonResult<PageResult<CrmBusinessRespVO>>` | `@Valid CrmStatisticsFunnelReqVO pageVO` |

### 📦 `CrmStatisticsPerformanceController` (管理后台 - CRM 员工业绩统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/statistics-performance/get-contract-count-performance` | 合同数量统计 | `CommonResult<List<CrmStatisticsPerformanceRespVO>>` | `@Valid CrmStatisticsPerformanceReqVO performanceReqVO` |
| `GET` | `/crm/statistics-performance/get-contract-price-performance` | 合同金额统计 | `CommonResult<List<CrmStatisticsPerformanceRespVO>>` | `@Valid CrmStatisticsPerformanceReqVO performanceReqVO` |
| `GET` | `/crm/statistics-performance/get-receivable-price-performance` | 回款金额统计 | `CommonResult<List<CrmStatisticsPerformanceRespVO>>` | `@Valid CrmStatisticsPerformanceReqVO performanceReqVO` |
| `GET` | `/crm/statistics-performance/get-contract-summary` | 合同汇总表 | `CommonResult<List<CrmStatisticsPerformanceSummaryRespVO>>` | `@Valid CrmStatisticsPerformanceReqVO performanceReqVO` |

### 📦 `CrmStatisticsPerformanceTargetController` (管理后台 - CRM 业绩目标统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/statistics-performance-target/get-performance-target-summary` | 获取业绩目标完成情况 | `CommonResult<List<CrmStatisticsPerformanceTargetRespVO>>` | `@Valid CrmStatisticsPerformanceTargetReqVO reqVO` |

### 📦 `CrmStatisticsPortraitController` (管理后台 - CRM 客户画像)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/statistics-portrait/get-customer-area-summary` | 获取客户地区统计数据 | `CommonResult<List<CrmStatisticCustomerAreaRespVO>>` | `@Valid CrmStatisticsPortraitReqVO reqVO` |
| `GET` | `/crm/statistics-portrait/get-customer-industry-summary` | 获取客户行业统计数据 | `CommonResult<List<CrmStatisticCustomerIndustryRespVO>>` | `@Valid CrmStatisticsPortraitReqVO reqVO` |
| `GET` | `/crm/statistics-portrait/get-customer-level-summary` | 获取客户级别统计数据 | `CommonResult<List<CrmStatisticCustomerLevelRespVO>>` | `@Valid CrmStatisticsPortraitReqVO reqVO` |
| `GET` | `/crm/statistics-portrait/get-customer-source-summary` | 获取客户来源统计数据 | `CommonResult<List<CrmStatisticCustomerSourceRespVO>>` | `@Valid CrmStatisticsPortraitReqVO reqVO` |

### 📦 `CrmStatisticsProductController` (管理后台 - CRM 产品统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/statistics-product/get-product-sales-list` | 获取产品销售情况统计 | `CommonResult<List<CrmStatisticsProductSalesRespVO>>` | `@Valid CrmStatisticsProductReqVO reqVO` |
| `GET` | `/crm/statistics-product/get-product-category-summary` | 获取产品分类销售分析 | `CommonResult<List<CrmStatisticsProductCategoryRespVO>>` | `@Valid CrmStatisticsProductReqVO reqVO` |

### 📦 `CrmStatisticsRankController` (管理后台 - CRM 排行榜统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/crm/statistics-rank/get-contract-price-rank` | 获得合同金额排行榜 | `CommonResult<List<CrmStatisticsRankRespVO>>` | `@Valid CrmStatisticsRankReqVO rankingReqVO` |
| `GET` | `/crm/statistics-rank/get-receivable-price-rank` | 获得回款金额排行榜 | `CommonResult<List<CrmStatisticsRankRespVO>>` | `@Valid CrmStatisticsRankReqVO rankingReqVO` |
| `GET` | `/crm/statistics-rank/get-contract-count-rank` | 获得签约合同数量排行榜 | `CommonResult<List<CrmStatisticsRankRespVO>>` | `@Valid CrmStatisticsRankReqVO rankingReqVO` |
| `GET` | `/crm/statistics-rank/get-product-sales-rank` | 获得产品销量排行榜 | `CommonResult<List<CrmStatisticsRankRespVO>>` | `@Valid CrmStatisticsRankReqVO rankingReqVO` |
| `GET` | `/crm/statistics-rank/get-customer-count-rank` | 获得新增客户数排行榜 | `CommonResult<List<CrmStatisticsRankRespVO>>` | `@Valid CrmStatisticsRankReqVO rankingReqVO` |
| `GET` | `/crm/statistics-rank/get-contacts-count-rank` | 获得新增联系人数排行榜 | `CommonResult<List<CrmStatisticsRankRespVO>>` | `@Valid CrmStatisticsRankReqVO rankingReqVO` |
| `GET` | `/crm/statistics-rank/get-follow-count-rank` | 获得跟进次数排行榜 | `CommonResult<List<CrmStatisticsRankRespVO>>` | `@Valid CrmStatisticsRankReqVO rankingReqVO` |
| `GET` | `/crm/statistics-rank/get-follow-customer-count-rank` | 获得跟进客户数排行榜 | `CommonResult<List<CrmStatisticsRankRespVO>>` | `@Valid CrmStatisticsRankReqVO rankingReqVO` |

### 📦 `ErpAccountController` (管理后台 - ERP 结算账户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/account/create` | 创建结算账户 | `CommonResult<Long>` | `@Valid @RequestBody ErpAccountSaveReqVO createReqVO` |
| `PUT` | `/erp/account/update` | 更新结算账户 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpAccountSaveReqVO updateReqVO` |
| `PUT` | `/erp/account/update-default-status` | 更新结算账户默认状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("defaultStatus") Boolean defaultStatus` |
| `DELETE` | `/erp/account/delete` | 删除结算账户 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/account/get` | 获得结算账户 | `CommonResult<ErpAccountRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/account/simple-list` | 获得结算账户精简列表 | `CommonResult<List<ErpAccountRespVO>>` | `-` |
| `GET` | `/erp/account/page` | 获得结算账户分页 | `CommonResult<PageResult<ErpAccountRespVO>>` | `@Valid ErpAccountPageReqVO pageReqVO` |

### 📦 `ErpFinancePaymentController` (管理后台 - ERP 付款单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/finance-payment/create` | 创建付款单 | `CommonResult<Long>` | `@Valid @RequestBody ErpFinancePaymentSaveReqVO createReqVO` |
| `PUT` | `/erp/finance-payment/update` | 更新付款单 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpFinancePaymentSaveReqVO updateReqVO` |
| `PUT` | `/erp/finance-payment/update-status` | 更新付款单的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/finance-payment/delete` | 删除付款单 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/finance-payment/get` | 获得付款单 | `CommonResult<ErpFinancePaymentRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/finance-payment/page` | 获得付款单分页 | `CommonResult<PageResult<ErpFinancePaymentRespVO>>` | `@Valid ErpFinancePaymentPageReqVO pageReqVO` |
| `GET` | `/erp/finance-payment/export-excel` | 导出付款单 Excel | `void` | `@Valid ErpFinancePaymentPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpFinancePaymentRespVO> list = buildFinancePaymentVOPageResult(financePaymentService.getFinancePaymentPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "付款单.xls", "数据", ErpFinancePaymentRespVO.class, list); } private PageResult<ErpFinancePaymentRespVO> buildFinancePaymentVOPageResult(PageResult<ErpFinancePaymentDO> pageResult` |

### 📦 `ErpFinanceReceiptController` (管理后台 - ERP 收款单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/finance-receipt/create` | 创建收款单 | `CommonResult<Long>` | `@Valid @RequestBody ErpFinanceReceiptSaveReqVO createReqVO` |
| `PUT` | `/erp/finance-receipt/update` | 更新收款单 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpFinanceReceiptSaveReqVO updateReqVO` |
| `PUT` | `/erp/finance-receipt/update-status` | 更新收款单的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/finance-receipt/delete` | 删除收款单 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/finance-receipt/get` | 获得收款单 | `CommonResult<ErpFinanceReceiptRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/finance-receipt/page` | 获得收款单分页 | `CommonResult<PageResult<ErpFinanceReceiptRespVO>>` | `@Valid ErpFinanceReceiptPageReqVO pageReqVO` |
| `GET` | `/erp/finance-receipt/export-excel` | 导出收款单 Excel | `void` | `@Valid ErpFinanceReceiptPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpFinanceReceiptRespVO> list = buildFinanceReceiptVOPageResult(financeReceiptService.getFinanceReceiptPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "收款单.xls", "数据", ErpFinanceReceiptRespVO.class, list); } private PageResult<ErpFinanceReceiptRespVO> buildFinanceReceiptVOPageResult(PageResult<ErpFinanceReceiptDO> pageResult` |

### 📦 `ErpProductCategoryController` (管理后台 - ERP 产品分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/product-category/create` | 创建产品分类 | `CommonResult<Long>` | `@Valid @RequestBody ErpProductCategorySaveReqVO createReqVO` |
| `PUT` | `/erp/product-category/update` | 更新产品分类 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpProductCategorySaveReqVO updateReqVO` |
| `DELETE` | `/erp/product-category/delete` | 删除产品分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/product-category/get` | 获得产品分类 | `CommonResult<ErpProductCategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/product-category/list` | 获得产品分类列表 | `CommonResult<List<ErpProductCategoryRespVO>>` | `@Valid ErpProductCategoryListReqVO listReqVO` |
| `GET` | `/erp/product-category/simple-list` | 获得产品分类精简列表 | `CommonResult<List<ErpProductCategoryRespVO>>` | `-` |

### 📦 `ErpProductController` (管理后台 - ERP 产品)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/product/create` | 创建产品 | `CommonResult<Long>` | `@Valid @RequestBody ProductSaveReqVO createReqVO` |
| `PUT` | `/erp/product/update` | 更新产品 | `CommonResult<Boolean>` | `@Valid @RequestBody ProductSaveReqVO updateReqVO` |
| `DELETE` | `/erp/product/delete` | 删除产品 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/product/get` | 获得产品 | `CommonResult<ErpProductRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/product/page` | 获得产品分页 | `CommonResult<PageResult<ErpProductRespVO>>` | `@Valid ErpProductPageReqVO pageReqVO` |
| `GET` | `/erp/product/simple-list` | 获得产品精简列表 | `CommonResult<List<ErpProductRespVO>>` | `-` |

### 📦 `ErpProductUnitController` (管理后台 - ERP 产品单位)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/product-unit/create` | 创建产品单位 | `CommonResult<Long>` | `@Valid @RequestBody ErpProductUnitSaveReqVO createReqVO` |
| `PUT` | `/erp/product-unit/update` | 更新产品单位 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpProductUnitSaveReqVO updateReqVO` |
| `DELETE` | `/erp/product-unit/delete` | 删除产品单位 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/product-unit/get` | 获得产品单位 | `CommonResult<ErpProductUnitRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/product-unit/page` | 获得产品单位分页 | `CommonResult<PageResult<ErpProductUnitRespVO>>` | `@Valid ErpProductUnitPageReqVO pageReqVO` |
| `GET` | `/erp/product-unit/simple-list` | 获得产品单位精简列表 | `CommonResult<List<ErpProductUnitRespVO>>` | `-` |

### 📦 `ErpPurchaseInController` (管理后台 - ERP 采购入库)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/purchase-in/create` | 创建采购入库 | `CommonResult<Long>` | `@Valid @RequestBody ErpPurchaseInSaveReqVO createReqVO` |
| `PUT` | `/erp/purchase-in/update` | 更新采购入库 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpPurchaseInSaveReqVO updateReqVO` |
| `PUT` | `/erp/purchase-in/update-status` | 更新采购入库的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/purchase-in/delete` | 删除采购入库 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/purchase-in/get` | 获得采购入库 | `CommonResult<ErpPurchaseInRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/purchase-in/page` | 获得采购入库分页 | `CommonResult<PageResult<ErpPurchaseInRespVO>>` | `@Valid ErpPurchaseInPageReqVO pageReqVO` |
| `GET` | `/erp/purchase-in/export-excel` | 导出采购入库 Excel | `void` | `@Valid ErpPurchaseInPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpPurchaseInRespVO> list = buildPurchaseInVOPageResult(purchaseInService.getPurchaseInPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "采购入库.xls", "数据", ErpPurchaseInRespVO.class, list); } private PageResult<ErpPurchaseInRespVO> buildPurchaseInVOPageResult(PageResult<ErpPurchaseInDO> pageResult` |

### 📦 `ErpPurchaseOrderController` (管理后台 - ERP 采购订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/purchase-order/create` | 创建采购订单 | `CommonResult<Long>` | `@Valid @RequestBody ErpPurchaseOrderSaveReqVO createReqVO` |
| `PUT` | `/erp/purchase-order/update` | 更新采购订单 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpPurchaseOrderSaveReqVO updateReqVO` |
| `PUT` | `/erp/purchase-order/update-status` | 更新采购订单的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/purchase-order/delete` | 删除采购订单 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/purchase-order/get` | 获得采购订单 | `CommonResult<ErpPurchaseOrderRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/purchase-order/page` | 获得采购订单分页 | `CommonResult<PageResult<ErpPurchaseOrderRespVO>>` | `@Valid ErpPurchaseOrderPageReqVO pageReqVO` |
| `GET` | `/erp/purchase-order/export-excel` | 导出采购订单 Excel | `void` | `@Valid ErpPurchaseOrderPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpPurchaseOrderRespVO> list = buildPurchaseOrderVOPageResult(purchaseOrderService.getPurchaseOrderPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "采购订单.xls", "数据", ErpPurchaseOrderRespVO.class, list); } private PageResult<ErpPurchaseOrderRespVO> buildPurchaseOrderVOPageResult(PageResult<ErpPurchaseOrderDO> pageResult` |

### 📦 `ErpPurchaseReturnController` (管理后台 - ERP 采购退货)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/purchase-return/create` | 创建采购退货 | `CommonResult<Long>` | `@Valid @RequestBody ErpPurchaseReturnSaveReqVO createReqVO` |
| `PUT` | `/erp/purchase-return/update` | 更新采购退货 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpPurchaseReturnSaveReqVO updateReqVO` |
| `PUT` | `/erp/purchase-return/update-status` | 更新采购退货的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/purchase-return/delete` | 删除采购退货 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/purchase-return/get` | 获得采购退货 | `CommonResult<ErpPurchaseReturnRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/purchase-return/page` | 获得采购退货分页 | `CommonResult<PageResult<ErpPurchaseReturnRespVO>>` | `@Valid ErpPurchaseReturnPageReqVO pageReqVO` |
| `GET` | `/erp/purchase-return/export-excel` | 导出采购退货 Excel | `void` | `@Valid ErpPurchaseReturnPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpPurchaseReturnRespVO> list = buildPurchaseReturnVOPageResult(purchaseReturnService.getPurchaseReturnPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "采购退货.xls", "数据", ErpPurchaseReturnRespVO.class, list); } private PageResult<ErpPurchaseReturnRespVO> buildPurchaseReturnVOPageResult(PageResult<ErpPurchaseReturnDO> pageResult` |

### 📦 `ErpSupplierController` (管理后台 - ERP 供应商)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/supplier/create` | 创建供应商 | `CommonResult<Long>` | `@Valid @RequestBody ErpSupplierSaveReqVO createReqVO` |
| `PUT` | `/erp/supplier/update` | 更新供应商 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpSupplierSaveReqVO updateReqVO` |
| `DELETE` | `/erp/supplier/delete` | 删除供应商 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/supplier/get` | 获得供应商 | `CommonResult<ErpSupplierRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/supplier/page` | 获得供应商分页 | `CommonResult<PageResult<ErpSupplierRespVO>>` | `@Valid ErpSupplierPageReqVO pageReqVO` |
| `GET` | `/erp/supplier/simple-list` | 获得供应商精简列表 | `CommonResult<List<ErpSupplierRespVO>>` | `-` |

### 📦 `ErpCustomerController` (管理后台 - ERP 客户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/customer/create` | 创建客户 | `CommonResult<Long>` | `@Valid @RequestBody ErpCustomerSaveReqVO createReqVO` |
| `PUT` | `/erp/customer/update` | 更新客户 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpCustomerSaveReqVO updateReqVO` |
| `DELETE` | `/erp/customer/delete` | 删除客户 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/customer/get` | 获得客户 | `CommonResult<ErpCustomerRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/customer/page` | 获得客户分页 | `CommonResult<PageResult<ErpCustomerRespVO>>` | `@Valid ErpCustomerPageReqVO pageReqVO` |
| `GET` | `/erp/customer/simple-list` | 获得客户精简列表 | `CommonResult<List<ErpCustomerRespVO>>` | `-` |

### 📦 `ErpSaleOrderController` (管理后台 - ERP 销售订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/sale-order/create` | 创建销售订单 | `CommonResult<Long>` | `@Valid @RequestBody ErpSaleOrderSaveReqVO createReqVO` |
| `PUT` | `/erp/sale-order/update` | 更新销售订单 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpSaleOrderSaveReqVO updateReqVO` |
| `PUT` | `/erp/sale-order/update-status` | 更新销售订单的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/sale-order/delete` | 删除销售订单 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/sale-order/get` | 获得销售订单 | `CommonResult<ErpSaleOrderRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/sale-order/page` | 获得销售订单分页 | `CommonResult<PageResult<ErpSaleOrderRespVO>>` | `@Valid ErpSaleOrderPageReqVO pageReqVO` |
| `GET` | `/erp/sale-order/export-excel` | 导出销售订单 Excel | `void` | `@Valid ErpSaleOrderPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpSaleOrderRespVO> list = buildSaleOrderVOPageResult(saleOrderService.getSaleOrderPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "销售订单.xls", "数据", ErpSaleOrderRespVO.class, list); } private PageResult<ErpSaleOrderRespVO> buildSaleOrderVOPageResult(PageResult<ErpSaleOrderDO> pageResult` |

### 📦 `ErpSaleOutController` (管理后台 - ERP 销售出库)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/sale-out/create` | 创建销售出库 | `CommonResult<Long>` | `@Valid @RequestBody ErpSaleOutSaveReqVO createReqVO` |
| `PUT` | `/erp/sale-out/update` | 更新销售出库 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpSaleOutSaveReqVO updateReqVO` |
| `PUT` | `/erp/sale-out/update-status` | 更新销售出库的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/sale-out/delete` | 删除销售出库 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/sale-out/get` | 获得销售出库 | `CommonResult<ErpSaleOutRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/sale-out/page` | 获得销售出库分页 | `CommonResult<PageResult<ErpSaleOutRespVO>>` | `@Valid ErpSaleOutPageReqVO pageReqVO` |
| `GET` | `/erp/sale-out/export-excel` | 导出销售出库 Excel | `void` | `@Valid ErpSaleOutPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpSaleOutRespVO> list = buildSaleOutVOPageResult(saleOutService.getSaleOutPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "销售出库.xls", "数据", ErpSaleOutRespVO.class, list); } private PageResult<ErpSaleOutRespVO> buildSaleOutVOPageResult(PageResult<ErpSaleOutDO> pageResult` |

### 📦 `ErpSaleReturnController` (管理后台 - ERP 销售退货)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/sale-return/create` | 创建销售退货 | `CommonResult<Long>` | `@Valid @RequestBody ErpSaleReturnSaveReqVO createReqVO` |
| `PUT` | `/erp/sale-return/update` | 更新销售退货 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpSaleReturnSaveReqVO updateReqVO` |
| `PUT` | `/erp/sale-return/update-status` | 更新销售退货的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/sale-return/delete` | 删除销售退货 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/sale-return/get` | 获得销售退货 | `CommonResult<ErpSaleReturnRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/sale-return/page` | 获得销售退货分页 | `CommonResult<PageResult<ErpSaleReturnRespVO>>` | `@Valid ErpSaleReturnPageReqVO pageReqVO` |
| `GET` | `/erp/sale-return/export-excel` | 导出销售退货 Excel | `void` | `@Valid ErpSaleReturnPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpSaleReturnRespVO> list = buildSaleReturnVOPageResult(saleReturnService.getSaleReturnPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "销售退货.xls", "数据", ErpSaleReturnRespVO.class, list); } private PageResult<ErpSaleReturnRespVO> buildSaleReturnVOPageResult(PageResult<ErpSaleReturnDO> pageResult` |

### 📦 `ErpPurchaseStatisticsController` (管理后台 - ERP 采购统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/erp/purchase-statistics/summary` | 获得采购统计 | `CommonResult<ErpPurchaseSummaryRespVO>` | `-` |
| `GET` | `/erp/purchase-statistics/time-summary` | 获得采购时间段统计 | `CommonResult<List<ErpPurchaseTimeSummaryRespVO>>` | `@RequestParam(value = "count", defaultValue = "6") Integer count` |

### 📦 `ErpSaleStatisticsController` (管理后台 - ERP 销售统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/erp/sale-statistics/summary` | 获得销售统计 | `CommonResult<ErpSaleSummaryRespVO>` | `-` |
| `GET` | `/erp/sale-statistics/time-summary` | 获得销售时间段统计 | `CommonResult<List<ErpSaleTimeSummaryRespVO>>` | `@RequestParam(value = "count", defaultValue = "6") Integer count` |

### 📦 `ErpStockCheckController` (管理后台 - ERP 库存调拨单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/stock-check/create` | 创建库存调拨单 | `CommonResult<Long>` | `@Valid @RequestBody ErpStockCheckSaveReqVO createReqVO` |
| `PUT` | `/erp/stock-check/update` | 更新库存调拨单 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpStockCheckSaveReqVO updateReqVO` |
| `PUT` | `/erp/stock-check/update-status` | 更新库存调拨单的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/stock-check/delete` | 删除库存调拨单 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/stock-check/get` | 获得库存调拨单 | `CommonResult<ErpStockCheckRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/stock-check/page` | 获得库存调拨单分页 | `CommonResult<PageResult<ErpStockCheckRespVO>>` | `@Valid ErpStockCheckPageReqVO pageReqVO` |
| `GET` | `/erp/stock-check/export-excel` | 导出库存调拨单 Excel | `void` | `@Valid ErpStockCheckPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpStockCheckRespVO> list = buildStockCheckVOPageResult(stockCheckService.getStockCheckPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "库存调拨单.xls", "数据", ErpStockCheckRespVO.class, list); } private PageResult<ErpStockCheckRespVO> buildStockCheckVOPageResult(PageResult<ErpStockCheckDO> pageResult` |

### 📦 `ErpStockController` (管理后台 - ERP 产品库存)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/erp/stock/get` | 获得产品库存 | `CommonResult<ErpStockRespVO>` | `@RequestParam(value = "id", required = false) Long id, @RequestParam(value = "productId", required = false) Long productId, @RequestParam(value = "warehouseId", required = false) Long warehouseId` |
| `GET` | `/erp/stock/get-count` | 获得产品库存数量 | `CommonResult<BigDecimal>` | `@RequestParam("productId") Long productId` |
| `GET` | `/erp/stock/page` | 获得产品库存分页 | `CommonResult<PageResult<ErpStockRespVO>>` | `@Valid ErpStockPageReqVO pageReqVO` |
| `GET` | `/erp/stock/export-excel` | 导出产品库存 Excel | `void` | `@Valid ErpStockPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpStockRespVO> list = buildStockVOPageResult(stockService.getStockPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "产品库存.xls", "数据", ErpStockRespVO.class, list); } private PageResult<ErpStockRespVO> buildStockVOPageResult(PageResult<ErpStockDO> pageResult` |

### 📦 `ErpStockInController` (管理后台 - ERP 其它入库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/stock-in/create` | 创建其它入库单 | `CommonResult<Long>` | `@Valid @RequestBody ErpStockInSaveReqVO createReqVO` |
| `PUT` | `/erp/stock-in/update` | 更新其它入库单 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpStockInSaveReqVO updateReqVO` |
| `PUT` | `/erp/stock-in/update-status` | 更新其它入库单的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/stock-in/delete` | 删除其它入库单 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/stock-in/get` | 获得其它入库单 | `CommonResult<ErpStockInRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/stock-in/page` | 获得其它入库单分页 | `CommonResult<PageResult<ErpStockInRespVO>>` | `@Valid ErpStockInPageReqVO pageReqVO` |
| `GET` | `/erp/stock-in/export-excel` | 导出其它入库单 Excel | `void` | `@Valid ErpStockInPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpStockInRespVO> list = buildStockInVOPageResult(stockInService.getStockInPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "其它入库单.xls", "数据", ErpStockInRespVO.class, list); } private PageResult<ErpStockInRespVO> buildStockInVOPageResult(PageResult<ErpStockInDO> pageResult` |

### 📦 `ErpStockMoveController` (管理后台 - ERP 库存调拨单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/stock-move/create` | 创建库存调拨单 | `CommonResult<Long>` | `@Valid @RequestBody ErpStockMoveSaveReqVO createReqVO` |
| `PUT` | `/erp/stock-move/update` | 更新库存调拨单 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpStockMoveSaveReqVO updateReqVO` |
| `PUT` | `/erp/stock-move/update-status` | 更新库存调拨单的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/stock-move/delete` | 删除库存调拨单 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/stock-move/get` | 获得库存调拨单 | `CommonResult<ErpStockMoveRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/stock-move/page` | 获得库存调拨单分页 | `CommonResult<PageResult<ErpStockMoveRespVO>>` | `@Valid ErpStockMovePageReqVO pageReqVO` |
| `GET` | `/erp/stock-move/export-excel` | 导出库存调拨单 Excel | `void` | `@Valid ErpStockMovePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpStockMoveRespVO> list = buildStockMoveVOPageResult(stockMoveService.getStockMovePage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "库存调拨单.xls", "数据", ErpStockMoveRespVO.class, list); } private PageResult<ErpStockMoveRespVO> buildStockMoveVOPageResult(PageResult<ErpStockMoveDO> pageResult` |

### 📦 `ErpStockOutController` (管理后台 - ERP 其它出库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/stock-out/create` | 创建其它出库单 | `CommonResult<Long>` | `@Valid @RequestBody ErpStockOutSaveReqVO createReqVO` |
| `PUT` | `/erp/stock-out/update` | 更新其它出库单 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpStockOutSaveReqVO updateReqVO` |
| `PUT` | `/erp/stock-out/update-status` | 更新其它出库单的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/erp/stock-out/delete` | 删除其它出库单 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/erp/stock-out/get` | 获得其它出库单 | `CommonResult<ErpStockOutRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/stock-out/page` | 获得其它出库单分页 | `CommonResult<PageResult<ErpStockOutRespVO>>` | `@Valid ErpStockOutPageReqVO pageReqVO` |
| `GET` | `/erp/stock-out/export-excel` | 导出其它出库单 Excel | `void` | `@Valid ErpStockOutPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpStockOutRespVO> list = buildStockOutVOPageResult(stockOutService.getStockOutPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "其它出库单.xls", "数据", ErpStockOutRespVO.class, list); } private PageResult<ErpStockOutRespVO> buildStockOutVOPageResult(PageResult<ErpStockOutDO> pageResult` |

### 📦 `ErpStockRecordController` (管理后台 - ERP 产品库存明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/erp/stock-record/get` | 获得产品库存明细 | `CommonResult<ErpStockRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/stock-record/page` | 获得产品库存明细分页 | `CommonResult<PageResult<ErpStockRecordRespVO>>` | `@Valid ErpStockRecordPageReqVO pageReqVO` |
| `GET` | `/erp/stock-record/export-excel` | 导出产品库存明细 Excel | `void` | `@Valid ErpStockRecordPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<ErpStockRecordRespVO> list = buildStockRecrodVOPageResult(stockRecordService.getStockRecordPage(pageReqVO)).getList(); // 导出 Excel ExcelUtils.write(response, "产品库存明细.xls", "数据", ErpStockRecordRespVO.class, list); } private PageResult<ErpStockRecordRespVO> buildStockRecrodVOPageResult(PageResult<ErpStockRecordDO> pageResult` |

### 📦 `ErpWarehouseController` (管理后台 - ERP 仓库)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/erp/warehouse/create` | 创建仓库 | `CommonResult<Long>` | `@Valid @RequestBody ErpWarehouseSaveReqVO createReqVO` |
| `PUT` | `/erp/warehouse/update` | 更新仓库 | `CommonResult<Boolean>` | `@Valid @RequestBody ErpWarehouseSaveReqVO updateReqVO` |
| `PUT` | `/erp/warehouse/update-default-status` | 更新仓库默认状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("defaultStatus") Boolean defaultStatus` |
| `DELETE` | `/erp/warehouse/delete` | 删除仓库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/warehouse/get` | 获得仓库 | `CommonResult<ErpWarehouseRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/erp/warehouse/page` | 获得仓库分页 | `CommonResult<PageResult<ErpWarehouseRespVO>>` | `@Valid ErpWarehousePageReqVO pageReqVO` |
| `GET` | `/erp/warehouse/simple-list` | 获得仓库精简列表 | `CommonResult<List<ErpWarehouseRespVO>>` | `-` |

### 📦 `FmsClosingPeriodController` (管理后台 - FMS 结账期间)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/closing/period/current-month` | 获得当前会计期间 | `CommonResult<String>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `GET` | `/fms/closing/period/overview` | 获得结账概况 | `CommonResult<FmsClosingOverviewRespVO>` | `@Valid FmsClosingQueryReqVO queryReqVO` |
| `PUT` | `/fms/closing/period/close` | 结账 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsClosingQueryReqVO queryReqVO` |
| `DELETE` | `/fms/closing/period/cancel` | 反结账 | `CommonResult<Boolean>` | `@Valid FmsClosingQueryReqVO queryReqVO` |

### 📦 `FmsClosingSchemeController` (管理后台 - FMS 结账方案)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/closing/scheme/list` | 获得结账方案列表 | `CommonResult<List<FmsClosingSchemeRespVO>>` | `@Valid FmsClosingQueryReqVO queryReqVO` |
| `POST` | `/fms/closing/scheme/create` | 创建结账方案 | `CommonResult<Long>` | `@Valid @RequestBody FmsClosingSchemeSaveReqVO createReqVO` |
| `PUT` | `/fms/closing/scheme/update` | 修改结账方案 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsClosingSchemeSaveReqVO updateReqVO` |
| `PUT` | `/fms/closing/scheme/update-profit-loss-settings` | 保存结转损益设置 | `CommonResult<Long>` | `@Valid @RequestBody FmsProfitLossSettingsSaveReqVO saveReqVO` |
| `PUT` | `/fms/closing/scheme/update-special-settings` | 保存专用结转设置 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsSpecialClosingSettingsSaveReqVO updateReqVO` |
| `DELETE` | `/fms/closing/scheme/delete` | 删除结账方案 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |

### 📦 `FmsClosingTemplateController` (管理后台 - FMS 结账模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/closing/template/list` | 获得结账模板列表 | `CommonResult<List<FmsClosingTemplateRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `POST` | `/fms/closing/template/create` | 创建结账模板 | `CommonResult<Long>` | `@Valid @RequestBody FmsClosingTemplateSaveReqVO createReqVO` |
| `PUT` | `/fms/closing/template/update` | 更新结账模板 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsClosingTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/fms/closing/template/delete` | 删除结账模板 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |

### 📦 `FmsClosingVoucherController` (管理后台 - FMS 结转凭证)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/closing/voucher/generate-profit-loss` | 生成结转损益凭证 | `CommonResult<Long>` | `@Valid @RequestBody FmsProfitLossGenerateReqVO generateReqVO` |
| `POST` | `/fms/closing/voucher/generate-scheme` | 生成结账方案凭证 | `CommonResult<Long>` | `@Valid @RequestBody FmsClosingSchemeGenerateReqVO generateReqVO` |
| `POST` | `/fms/closing/voucher/generate-list` | 批量生成结转凭证 | `CommonResult<List<Long>>` | `@Valid @RequestBody FmsClosingVoucherGenerateReqVO generateReqVO` |

### 📦 `FmsAccountSetController` (管理后台 - FMS 账套)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/account-set/create` | 创建账套 | `CommonResult<Long>` | `@Valid @RequestBody FmsAccountSetSaveReqVO createReqVO` |
| `PUT` | `/fms/config/account-set/update` | 更新账套 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsAccountSetSaveReqVO updateReqVO` |
| `PUT` | `/fms/config/account-set/initialize` | 初始化账套 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsAccountSetInitializeReqVO initializeReqVO` |
| `GET` | `/fms/config/account-set/get` | 获得账套 | `CommonResult<FmsAccountSetRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/fms/config/account-set/list` | 获得当前用户账套列表 | `CommonResult<List<FmsAccountSetRespVO>>` | `-` |

### 📦 `FmsAccountUserController` (管理后台 - FMS 账套用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/config/account-user/list` | 获得账套用户列表 | `CommonResult<List<FmsAccountUserRespVO>>` | `@RequestParam("accountSetId") Long accountSetId` |
| `PUT` | `/fms/config/account-user/update` | 更新账套用户列表 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsAccountUserUpdateReqVO updateReqVO` |
| `PUT` | `/fms/config/account-user/update-default-status` | 更新默认账套状态 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") Long accountSetId` |

### 📦 `FmsAuxiliaryItemController` (管理后台 - FMS 辅助核算项目)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/auxiliary-item/create` | 创建辅助核算项目 | `CommonResult<Long>` | `@Valid @RequestBody FmsAuxiliaryItemSaveReqVO createReqVO` |
| `PUT` | `/fms/config/auxiliary-item/update` | 更新辅助核算项目 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsAuxiliaryItemSaveReqVO updateReqVO` |
| `DELETE` | `/fms/config/auxiliary-item/delete-list` | 删除辅助核算项目 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("ids") @NotEmpty List<Long> ids` |
| `PUT` | `/fms/config/auxiliary-item/update-status` | 更新辅助核算项目状态 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsAuxiliaryItemStatusReqVO reqVO` |
| `GET` | `/fms/config/auxiliary-item/get` | 获得辅助核算项目 | `CommonResult<FmsAuxiliaryItemRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/auxiliary-item/page` | 获得辅助核算项目分页 | `CommonResult<PageResult<FmsAuxiliaryItemRespVO>>` | `@Valid FmsAuxiliaryItemPageReqVO pageReqVO` |
| `GET` | `/fms/config/auxiliary-item/simple-list` | 获得辅助核算项目精简列表 | `CommonResult<List<FmsAuxiliaryItemRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("auxiliaryTypeId") @NotNull Long auxiliaryTypeId` |
| `GET` | `/fms/config/auxiliary-item/export-excel` | 导出辅助核算项目 | `void` | `@Valid FmsAuxiliaryItemPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<FmsAuxiliaryItemDO> list = auxiliaryItemService .getAuxiliaryItemPage(pageReqVO, getLoginUserId()).getList(); FmsAuxiliaryTypeDO auxiliaryType = auxiliaryTypeService.getAuxiliaryType( pageReqVO.getAccountSetId(), pageReqVO.getAuxiliaryTypeId(), getLoginUserId()); ExcelUtils.write(response, auxiliaryType.getName() + ".xlsx", "辅助核算项目", buildAuxiliaryItemExcelHead(auxiliaryType.getType()), buildAuxiliaryItemExcelData(list, auxiliaryType.getType())); } @GetMapping("/get-import-template") @Operation(summary = "获得辅助核算项目导入模板") @Parameter(name = "type", description = "辅助核算类别类型", required = true, example = "1") @PreAuthorize("@ss.hasPermission('fms:config:auxiliary:import')") @ApiAccessLog(operateType = OperateTypeEnum.EXPORT) public void getAuxiliaryItemImportTemplate( @RequestParam("type") @InEnum(FmsAuxiliaryTypeEnum.class) Integer type, HttpServletResponse response) throws IOException { FmsAuxiliaryItemImportExcelVO example = new FmsAuxiliaryItemImportExcelVO() .setCode("001").setName("示例项目").setRemark("示例备注"); if (FmsAuxiliaryTypeEnum.INVENTORY.getType().equals(type)` |
| `POST` | `/fms/config/auxiliary-item/import` | 导入辅助核算项目 | `CommonResult<FmsAuxiliaryItemImportRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("auxiliaryTypeId") @NotNull Long auxiliaryTypeId, @RequestParam("file") MultipartFile file) throws Exception { List<FmsAuxiliaryItemImportExcelVO> importItems = ExcelUtils.read( file, FmsAuxiliaryItemImportExcelVO.class); return success(auxiliaryItemService.importAuxiliaryItemList( accountSetId, auxiliaryTypeId, importItems, getLoginUserId())); } /** 构建辅助核算项目导出的动态表头 */ private List<List<String>> buildAuxiliaryItemExcelHead(Integer type` |

### 📦 `FmsAuxiliaryTypeController` (管理后台 - FMS 辅助核算类别)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/auxiliary-type/create` | 创建辅助核算类别 | `CommonResult<Long>` | `@Valid @RequestBody FmsAuxiliaryTypeSaveReqVO createReqVO` |
| `PUT` | `/fms/config/auxiliary-type/update` | 更新辅助核算类别 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsAuxiliaryTypeSaveReqVO updateReqVO` |
| `DELETE` | `/fms/config/auxiliary-type/delete` | 删除辅助核算类别 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/auxiliary-type/list` | 获得辅助核算类别列表 | `CommonResult<List<FmsAuxiliaryTypeRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `GET` | `/fms/config/auxiliary-type/simple-list` | 获得辅助核算类别精简列表 | `CommonResult<List<FmsAuxiliaryTypeRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |

### 📦 `FmsCurrencyController` (管理后台 - FMS 币别)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/currency/create` | 创建币别 | `CommonResult<Long>` | `@Valid @RequestBody FmsCurrencySaveReqVO createReqVO` |
| `PUT` | `/fms/config/currency/update` | 更新币别 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsCurrencySaveReqVO updateReqVO` |
| `DELETE` | `/fms/config/currency/delete` | 删除币别 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/currency/list` | 获得币别列表 | `CommonResult<List<FmsCurrencyRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `GET` | `/fms/config/currency/simple-list` | 获得币别精简列表 | `CommonResult<List<FmsCurrencyRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |

### 📦 `FmsDigestController` (管理后台 - FMS 常用摘要)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/digest/create` | 创建常用摘要 | `CommonResult<Long>` | `@Valid @RequestBody FmsDigestSaveReqVO createReqVO` |
| `PUT` | `/fms/config/digest/update` | 修改常用摘要 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsDigestSaveReqVO updateReqVO` |
| `DELETE` | `/fms/config/digest/delete` | 删除常用摘要 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/digest/list` | 获得常用摘要管理列表 | `CommonResult<List<FmsDigestRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `GET` | `/fms/config/digest/simple-list` | 获得常用摘要精简列表 | `CommonResult<List<FmsDigestRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |

### 📦 `FmsFinanceIndicatorController` (管理后台 - FMS 财务指标)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/finance-indicator/create` | 创建首页财务指标 | `CommonResult<Long>` | `@Valid @RequestBody FmsFinanceIndicatorSaveReqVO reqVO` |
| `PUT` | `/fms/config/finance-indicator/update` | 修改首页财务指标 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsFinanceIndicatorSaveReqVO reqVO` |
| `DELETE` | `/fms/config/finance-indicator/delete` | 删除首页财务指标 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/finance-indicator/get` | 获得首页财务指标 | `CommonResult<FmsFinanceIndicatorRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/finance-indicator/list` | 获得首页财务指标列表 | `CommonResult<List<FmsFinanceIndicatorRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |

### 📦 `FmsFinanceParameterController` (管理后台 - FMS 财务参数)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/config/finance-parameter/get` | 获得财务参数 | `CommonResult<FmsFinanceParameterRespVO>` | `@RequestParam("accountSetId") Long accountSetId` |
| `PUT` | `/fms/config/finance-parameter/update` | 更新财务参数 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsFinanceParameterUpdateReqVO updateReqVO` |

### 📦 `FmsInitialBalanceController` (管理后台 - FMS 初始余额)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/config/initial-balance/list` | 获得初始余额列表 | `CommonResult<List<FmsInitialBalanceRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("subjectType") @NotNull Integer subjectType` |
| `PUT` | `/fms/config/initial-balance/save` | 保存初始余额 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsInitialBalanceSaveReqVO saveReqVO` |
| `GET` | `/fms/config/initial-balance/trial-balance` | 获得试算平衡结果 | `CommonResult<FmsTrialBalanceRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `GET` | `/fms/config/initial-balance/export-excel` | 导出初始余额 | `void` | `@RequestParam("accountSetId") @NotNull Long accountSetId, HttpServletResponse response) throws IOException { // 1. 读取初始余额列表，并展开为 Excel 行 List<FmsInitialBalanceExcelVO> rows = FmsInitialBalanceExcelHelper.toRows( initialBalanceService.getInitialBalanceList(accountSetId, null, getLoginUserId()), true); // 2. 输出 Excel ExcelUtils.write(response, "财务初始余额.xlsx", "财务初始余额", FmsInitialBalanceExcelVO.class, rows); } @GetMapping("/get-import-template") @Operation(summary = "获得初始余额导入模板") @Parameter(name = "accountSetId", description = "账套编号", required = true, example = "1024") @PreAuthorize("@ss.hasPermission('fms:config:initial-balance:import')") @ApiAccessLog(operateType = OperateTypeEnum.EXPORT) public void getInitialBalanceImportTemplate(@RequestParam("accountSetId") @NotNull Long accountSetId, HttpServletResponse response) throws IOException { // 1. 读取初始余额列表，并展开为 Excel 行 Long userId = getLoginUserId(); List<FmsInitialBalanceRespVO> initialBalances = initialBalanceService.getInitialBalanceList(accountSetId, null, userId); List<FmsInitialBalanceExcelVO> rows = FmsInitialBalanceExcelHelper.toRows(initialBalances, false); // 2. 生成导入模板，一月启用时只需要录入期初余额 FmsAccountSetDO accountSet = accountSetService.validateAccountSetReadPermission(accountSetId, userId); byte[] content = FmsInitialBalanceExcelHelper.writeTemplate( rows, LocalDateTimeUtils.isJanuary(accountSet.getStartTime())); // 3. 写入响应 ServletUtils.writeAttachment(response, "财务初始余额导入模板.xlsx", content); } @PostMapping("/import") @Operation(summary = "导入初始余额") @Parameter(name = "accountSetId", description = "账套编号", required = true, example = "1024") @PreAuthorize("@ss.hasPermission('fms:config:initial-balance:import')") @ApiAccessLog(operateType = OperateTypeEnum.IMPORT) public CommonResult<Integer> importInitialBalance( @RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("file") MultipartFile file) throws IOException { // 1. 读取 Excel List<FmsInitialBalanceExcelVO> rows; try { rows = FmsInitialBalanceExcelHelper.read(file); } catch (IllegalArgumentException | IOException ex` |

### 📦 `FmsSubjectController` (管理后台 - FMS 会计科目)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/subject/create` | 创建科目 | `CommonResult<Long>` | `@Valid @RequestBody FmsSubjectSaveReqVO createReqVO` |
| `PUT` | `/fms/config/subject/update` | 更新科目 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsSubjectSaveReqVO updateReqVO` |
| `DELETE` | `/fms/config/subject/delete-list` | 删除科目 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsSubjectDeleteReqVO deleteReqVO` |
| `PUT` | `/fms/config/subject/update-status` | 更新科目状态 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsSubjectStatusReqVO statusReqVO` |
| `GET` | `/fms/config/subject/get` | 获得科目 | `CommonResult<FmsSubjectRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/subject/get-usage` | 获得科目使用情况 | `CommonResult<FmsSubjectUsageRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/subject/list` | 获得科目列表 | `CommonResult<List<FmsSubjectRespVO>>` | `@Valid FmsSubjectListReqVO listReqVO` |
| `GET` | `/fms/config/subject/simple-list` | 获得科目精简列表 | `CommonResult<List<FmsSubjectRespVO>>` | `@Valid FmsSubjectListReqVO listReqVO` |
| `GET` | `/fms/config/subject/export-excel` | 导出科目 | `void` | `@Valid FmsSubjectListReqVO listReqVO, HttpServletResponse response) throws IOException { List<FmsSubjectDO> subjects = subjectService.getSubjectList(listReqVO, getLoginUserId()); ExcelUtils.write(response, "科目设置.xlsx", "科目设置", FmsSubjectRespVO.class, buildSubjectRespVOList(subjects)); } @GetMapping("/get-import-template") @Operation(summary = "获得科目导入模板") @PreAuthorize("@ss.hasPermission('fms:config:subject:import')") @ApiAccessLog(operateType = OperateTypeEnum.EXPORT) public void getSubjectImportTemplate(HttpServletResponse response) throws IOException { List<FmsSubjectImportExcelVO> list = Arrays.asList( FmsSubjectImportExcelVO.builder().code("1001").name("库存现金") .parentSubjectCode("0").balanceDirection("借").categoryName("流动资产").build(), FmsSubjectImportExcelVO.builder().code("100101").name("人民币现金") .parentSubjectCode("1001").balanceDirection("借").categoryName("流动资产") .auxiliaryNames("部门/职员").build()); ExcelUtils.write(response, "科目导入模板.xlsx", "科目列表", FmsSubjectImportExcelVO.class, list); } @PostMapping("/import") @Operation(summary = "导入科目") @Parameters({ @Parameter(name = "accountSetId", description = "账套编号", required = true, example = "1024"), @Parameter(name = "file", description = "Excel 文件", required = true) }) @PreAuthorize("@ss.hasPermission('fms:config:subject:import')") @ApiAccessLog(operateType = OperateTypeEnum.IMPORT) public CommonResult<FmsSubjectImportRespVO> importSubject( @RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("file") MultipartFile file) throws IOException { List<FmsSubjectImportExcelVO> importSubjects = ExcelUtils.read(file, FmsSubjectImportExcelVO.class); return success(subjectService.importSubjectList(accountSetId, importSubjects, getLoginUserId())); } // ==================== 拼接 VO ==================== private List<FmsSubjectRespVO> buildSubjectRespVOList(List<FmsSubjectDO> subjects` |

### 📦 `FmsVoucherTemplateCategoryController` (管理后台 - FMS 凭证模板分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/voucher-template-category/create` | 创建凭证模板分类 | `CommonResult<Long>` | `@Valid @RequestBody FmsVoucherTemplateCategorySaveReqVO createReqVO` |
| `PUT` | `/fms/config/voucher-template-category/update` | 修改凭证模板分类 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsVoucherTemplateCategorySaveReqVO updateReqVO` |
| `DELETE` | `/fms/config/voucher-template-category/delete` | 删除凭证模板分类 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/voucher-template-category/list` | 获得凭证模板分类列表 | `CommonResult<List<FmsVoucherTemplateCategoryRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `GET` | `/fms/config/voucher-template-category/simple-list` | 获得凭证模板分类精简列表 | `CommonResult<List<FmsVoucherTemplateCategoryRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |

### 📦 `FmsVoucherTemplateController` (管理后台 - FMS 凭证模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/voucher-template/create` | 创建凭证模板 | `CommonResult<Long>` | `@Valid @RequestBody FmsVoucherTemplateSaveReqVO createReqVO` |
| `PUT` | `/fms/config/voucher-template/update` | 修改凭证模板 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsVoucherTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/fms/config/voucher-template/delete` | 删除凭证模板 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/voucher-template/list` | 获得凭证模板列表 | `CommonResult<List<FmsVoucherTemplateRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `GET` | `/fms/config/voucher-template/simple-list` | 获得凭证模板精简列表 | `CommonResult<List<FmsVoucherTemplateRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |

### 📦 `FmsVoucherWordController` (管理后台 - FMS 凭证字)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/config/voucher-word/create` | 创建凭证字 | `CommonResult<Long>` | `@Valid @RequestBody FmsVoucherWordSaveReqVO createReqVO` |
| `PUT` | `/fms/config/voucher-word/update` | 修改凭证字 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsVoucherWordSaveReqVO updateReqVO` |
| `DELETE` | `/fms/config/voucher-word/delete` | 删除凭证字 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/config/voucher-word/list` | 获得凭证字管理列表 | `CommonResult<List<FmsVoucherWordRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `GET` | `/fms/config/voucher-word/simple-list` | 获得凭证字精简列表 | `CommonResult<List<FmsVoucherWordRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |

### 📦 `FmsHomeController` (管理后台 - FMS 首页)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/home/get` | 获得首页 | `CommonResult<FmsHomeRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId` |
| `GET` | `/fms/home/metric-detail` | 获得财务指标明细 | `CommonResult<FmsHomeMetricDetailRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("metricKey") @NotBlank String metricKey` |

### 📦 `FmsLedgerController` (管理后台 - FMS 账簿)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/ledger/detail/list` | 获得明细账 | `CommonResult<List<FmsLedgerDetailRespVO>>` | `@Valid FmsLedgerListReqVO listReqVO` |
| `GET` | `/fms/ledger/detail/subject-list` | 获得指定期间有发生额的明细账科目 | `CommonResult<List<FmsSubjectRespVO>>` | `@Valid FmsLedgerListReqVO listReqVO` |
| `GET` | `/fms/ledger/detail/export-excel` | 导出明细账 | `void` | `@Valid FmsLedgerListReqVO listReqVO, HttpServletResponse response) throws IOException { List<FmsLedgerDetailExportRespVO> rows = convertList( ledgerService.getDetailList(listReqVO, getLoginUserId()), item -> BeanUtils.toBean(item, FmsLedgerDetailExportRespVO.class) .setSubject(item.getSubjectCode() + " " + item.getSubjectName())); ExcelUtils.write(response, "明细账.xls", "明细账", FmsLedgerDetailExportRespVO.class, rows); } // ==================== 总账 ==================== @GetMapping("/general/list") @Operation(summary = "获得总账") @PreAuthorize("@ss.hasPermission('fms:ledger:general:query')") public CommonResult<List<FmsLedgerGeneralRespVO>> getGeneralList(@Valid FmsLedgerListReqVO listReqVO` |
| `GET` | `/fms/ledger/general/export-excel` | 导出总账 | `void` | `@Valid FmsLedgerListReqVO listReqVO, HttpServletResponse response) throws IOException { ExcelUtils.write(response, "总账.xls", "总账", FmsLedgerGeneralRespVO.class, ledgerService.getGeneralList(listReqVO, getLoginUserId())); } // ==================== 科目余额表 ==================== @GetMapping("/subject-balance/list") @Operation(summary = "获得科目余额表") @PreAuthorize("@ss.hasPermission('fms:ledger:subject-balance:query')") public CommonResult<List<FmsLedgerSubjectBalanceRespVO>> getSubjectBalanceList(@Valid FmsLedgerListReqVO listReqVO` |
| `GET` | `/fms/ledger/subject-balance/export-excel` | 导出科目余额表 | `void` | `@Valid FmsLedgerListReqVO listReqVO, HttpServletResponse response) throws IOException { ExcelUtils.write(response, "科目余额表.xls", "科目余额表", FmsLedgerSubjectBalanceRespVO.class, flattenSubjectBalanceList(ledgerService.getSubjectBalanceList(listReqVO, getLoginUserId()))); } // ==================== 多栏账 ==================== @GetMapping("/multi-column/list") @Operation(summary = "获得多栏账") @PreAuthorize("@ss.hasPermission('fms:ledger:multi-column:query')") public CommonResult<FmsLedgerMultiColumnRespVO> getMultiColumn(@Valid FmsLedgerListReqVO listReqVO` |
| `GET` | `/fms/ledger/multi-column/export-excel` | 导出多栏账 | `void` | `@Valid FmsLedgerListReqVO listReqVO, HttpServletResponse response) throws IOException { FmsLedgerMultiColumnRespVO result = ledgerService.getMultiColumn(listReqVO, getLoginUserId()); ExcelUtils.write(response, "多栏账.xls", "多栏账", FmsLedgerMultiColumnExcelHelper.buildHead(result), FmsLedgerMultiColumnExcelHelper.buildData(result)); } // ==================== 核算项目明细账 ==================== @GetMapping("/auxiliary-detail/list") @Operation(summary = "获得核算项目明细账") @PreAuthorize("@ss.hasPermission('fms:ledger:detail:query')") public CommonResult<List<FmsLedgerAuxiliaryDetailRespVO>> getAuxiliaryDetailList(@Valid FmsLedgerAuxiliaryListReqVO listReqVO` |
| `GET` | `/fms/ledger/auxiliary-detail/export-excel` | 导出核算项目明细账 | `void` | `@Valid FmsLedgerAuxiliaryListReqVO listReqVO, HttpServletResponse response) throws IOException { ExcelUtils.write(response, "核算项目明细账.xls", "核算项目明细账", FmsLedgerAuxiliaryDetailRespVO.class, ledgerService.getAuxiliaryDetailList(listReqVO, getLoginUserId())); } // ==================== 核算项目余额表 ==================== @GetMapping("/auxiliary-balance/list") @Operation(summary = "获得核算项目余额表") @PreAuthorize("@ss.hasPermission('fms:ledger:subject-balance:query')") public CommonResult<List<FmsLedgerAuxiliaryBalanceRespVO>> getAuxiliaryBalanceList(@Valid FmsLedgerAuxiliaryListReqVO listReqVO` |
| `GET` | `/fms/ledger/auxiliary-balance/export-excel` | 导出核算项目余额表 | `void` | `@Valid FmsLedgerAuxiliaryListReqVO listReqVO, HttpServletResponse response) throws IOException { ExcelUtils.write(response, "核算项目余额表.xls", "核算项目余额表", FmsLedgerAuxiliaryBalanceRespVO.class, ledgerService.getAuxiliaryBalanceList(listReqVO, getLoginUserId())); } // ==================== 数量金额明细账 ==================== @GetMapping("/quantity-detail/list") @Operation(summary = "获得数量金额明细账") @PreAuthorize("@ss.hasPermission('fms:ledger:detail:query')") public CommonResult<List<FmsLedgerQuantityDetailRespVO>> getQuantityDetailList(@Valid FmsLedgerListReqVO listReqVO` |
| `GET` | `/fms/ledger/quantity-detail/export-excel` | 导出数量金额明细账 | `void` | `@Valid FmsLedgerListReqVO listReqVO, HttpServletResponse response) throws IOException { ExcelUtils.write(response, "数量金额明细账.xls", "数量金额明细账", FmsLedgerQuantityDetailRespVO.class, ledgerService.getQuantityDetailList(listReqVO, getLoginUserId())); } // ==================== 数量金额总账 ==================== @GetMapping("/quantity-general/list") @Operation(summary = "获得数量金额总账") @PreAuthorize("@ss.hasPermission('fms:ledger:general:query')") public CommonResult<List<FmsLedgerQuantityGeneralRespVO>> getQuantityGeneralList(@Valid FmsLedgerListReqVO listReqVO` |
| `GET` | `/fms/ledger/quantity-general/export-excel` | 导出数量金额总账 | `void` | `@Valid FmsLedgerListReqVO listReqVO, HttpServletResponse response) throws IOException { ExcelUtils.write(response, "数量金额总账.xls", "数量金额总账", FmsLedgerQuantityGeneralRespVO.class, flattenQuantityGeneralList(ledgerService.getQuantityGeneralList( listReqVO, getLoginUserId()))); } private static List<FmsLedgerSubjectBalanceRespVO> flattenSubjectBalanceList(List<FmsLedgerSubjectBalanceRespVO> list` |

### 📦 `FmsBalanceSheetController` (管理后台 - FMS 资产负债表)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/report/balance-sheet/get` | 获得资产负债表 | `CommonResult<List<FmsBalanceSheetRowRespVO>>` | `@Valid FmsReportListReqVO listReqVO` |
| `GET` | `/fms/report/balance-sheet/export-excel` | 导出资产负债表 | `void` | `@Valid FmsReportListReqVO listReqVO, HttpServletResponse response) throws IOException { List<FmsBalanceSheetRowRespVO> list = balanceSheetService.getBalanceSheet(listReqVO, getLoginUserId()); ExcelUtils.write(response, "资产负债表.xls", "资产负债表", FmsBalanceSheetRowRespVO.class, list); } @PutMapping("/update") @Operation(summary = "更新资产负债表公式") @PreAuthorize("@ss.hasPermission('fms:report:balance-sheet:update')") public CommonResult<Boolean> updateBalanceSheetFormula(@Valid @RequestBody FmsReportFormulaUpdateReqVO updateReqVO` |
| `GET` | `/fms/report/balance-sheet/check` | 检查资产负债表 | `CommonResult<FmsBalanceSheetCheckRespVO>` | `@Valid FmsReportListReqVO listReqVO` |

### 📦 `FmsCashFlowStatementController` (管理后台 - FMS 现金流量表)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/report/cash-flow-statement/get` | 获得现金流量表 | `CommonResult<List<FmsReportItemRespVO>>` | `@Valid FmsReportListReqVO listReqVO` |
| `GET` | `/fms/report/cash-flow-statement/export-excel` | 导出现金流量表 | `void` | `@Valid FmsReportListReqVO listReqVO, HttpServletResponse response) throws IOException { List<FmsReportItemRespVO> list = cashFlowStatementService.getCashFlowStatement( listReqVO, getLoginUserId()); ExcelUtils.write(response, "现金流量表.xls", "现金流量表", FmsReportItemRespVO.class, list); } @PutMapping("/update") @Operation(summary = "更新现金流量表") @PreAuthorize("@ss.hasPermission('fms:report:cash-flow-statement:update')") public CommonResult<Boolean> updateCashFlowStatement( @Valid @RequestBody FmsCashFlowStatementUpdateReqVO updateReqVO` |
| `GET` | `/fms/report/cash-flow-statement/check` | 检查现金流量表 | `CommonResult<FmsCashFlowCheckRespVO>` | `@Valid FmsReportListReqVO listReqVO` |
| `GET` | `/fms/report/cash-flow-statement/adjustment/list` | 获得现金流量辅助数据列表 | `CommonResult<List<FmsCashFlowAdjustmentRespVO>>` | `@Valid FmsReportListReqVO listReqVO` |
| `PUT` | `/fms/report/cash-flow-statement/adjustment/update` | 更新现金流量辅助数据 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsCashFlowAdjustmentUpdateReqVO updateReqVO` |
| `PUT` | `/fms/report/cash-flow-statement/adjustment/update-formula` | 更新现金流量辅助数据公式 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsReportFormulaUpdateReqVO updateReqVO` |

### 📦 `FmsIncomeStatementController` (管理后台 - FMS 利润表)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/fms/report/income-statement/get` | 获得利润表 | `CommonResult<List<FmsReportItemRespVO>>` | `@Valid FmsReportListReqVO listReqVO` |
| `GET` | `/fms/report/income-statement/export-excel` | 导出利润表 | `void` | `@Valid FmsReportListReqVO listReqVO, HttpServletResponse response) throws IOException { List<FmsReportItemRespVO> list = incomeStatementService.getIncomeStatement(listReqVO, getLoginUserId()); ExcelUtils.write(response, "利润表.xls", "利润表", FmsReportItemRespVO.class, list); } @PutMapping("/update") @Operation(summary = "更新利润表公式") @PreAuthorize("@ss.hasPermission('fms:report:income-statement:update')") public CommonResult<Boolean> updateIncomeStatementFormula(@Valid @RequestBody FmsReportFormulaUpdateReqVO updateReqVO` |
| `GET` | `/fms/report/income-statement/check` | 检查利润表 | `CommonResult<FmsIncomeStatementCheckRespVO>` | `@Valid FmsReportListReqVO listReqVO` |

### 📦 `FmsVoucherController` (管理后台 - FMS 凭证)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/fms/voucher/create` | 创建凭证 | `CommonResult<Long>` | `@Valid @RequestBody FmsVoucherSaveReqVO createReqVO` |
| `PUT` | `/fms/voucher/update` | 更新凭证 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsVoucherSaveReqVO updateReqVO` |
| `PUT` | `/fms/voucher/update-attachments` | 更新凭证附件 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsVoucherAttachmentUpdateReqVO updateReqVO` |
| `DELETE` | `/fms/voucher/delete-list` | 删除凭证 | `CommonResult<Boolean>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("ids") @NotEmpty List<Long> ids` |
| `PUT` | `/fms/voucher/update-review-status` | 审核或反审核凭证 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsVoucherReviewReqVO reviewReqVO` |
| `PUT` | `/fms/voucher/tidy` | 整理凭证 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsVoucherTidyReqVO tidyReqVO` |
| `PUT` | `/fms/voucher/move` | 移动凭证 | `CommonResult<Boolean>` | `@Valid @RequestBody FmsVoucherMoveReqVO moveReqVO` |
| `GET` | `/fms/voucher/get` | 获得凭证详情 | `CommonResult<FmsVoucherRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("id") @NotNull Long id` |
| `GET` | `/fms/voucher/subject-balance-list` | 获得凭证科目余额列表 | `CommonResult<List<FmsVoucherSubjectBalanceRespVO>>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("month") @Pattern(regexp = "\\d{4}-(0[1-9]|1[0-2])", message = "会计期间格式不正确") String month` |
| `GET` | `/fms/voucher/auxiliary-balance` | 获得凭证辅助核算组合余额 | `CommonResult<FmsVoucherSubjectBalanceRespVO>` | `@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("month") @Pattern(regexp = "\\d{4}-(0[1-9]|1[0-2])", message = "会计期间格式不正确") String month, @RequestParam("subjectId") @NotNull Long subjectId, @RequestParam("auxiliaryItemIds") @NotEmpty List<Long> auxiliaryItemIds` |
| `GET` | `/fms/voucher/page` | 获得凭证分页 | `CommonResult<PageResult<FmsVoucherRespVO>>` | `@Valid FmsVoucherPageReqVO pageReqVO` |
| `GET` | `/fms/voucher/print-list` | 获得待打印凭证列表 | `CommonResult<List<FmsVoucherRespVO>>` | `@Valid FmsVoucherPageReqVO queryReqVO` |
| `GET` | `/fms/voucher/export-excel` | 导出凭证 | `void` | `@Valid FmsVoucherPageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PAGE_SIZE_NONE); List<FmsVoucherDO> list = voucherService.getVoucherPage(exportReqVO, getLoginUserId()).getList(); List<FmsVoucherRespVO> vouchers = buildVoucherRespVOList(exportReqVO.getAccountSetId(), list); ExcelUtils.write(response, "凭证列表.xls", "凭证列表", FmsVoucherExportRespVO.class, buildVoucherExportRespVOList(vouchers)); } @GetMapping("/get-import-template") @Operation(summary = "获得凭证导入模板") @PreAuthorize("@ss.hasPermission('fms:voucher:import')") @ApiAccessLog(operateType = OperateTypeEnum.EXPORT) public void getVoucherImportTemplate(@RequestParam("accountSetId") @NotNull Long accountSetId, HttpServletResponse response) throws IOException { FmsVoucherImportTemplateVO templateData = voucherService.getVoucherImportTemplateData(accountSetId, getLoginUserId()); ServletUtils.writeAttachment(response, "凭证导入模板.xlsx", FmsVoucherImportExcelHelper.writeTemplate(templateData)); } @PostMapping("/import") @Operation(summary = "导入凭证") @Parameters({ @Parameter(name = "accountSetId", description = "账套编号", required = true), @Parameter(name = "file", description = "Excel 文件", required = true) }) @PreAuthorize("@ss.hasPermission('fms:voucher:import')") @ApiAccessLog(operateType = OperateTypeEnum.IMPORT) public CommonResult<FmsVoucherImportRespVO> importVoucher(@RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("file") MultipartFile file) throws IOException { FmsVoucherImportTemplateVO templateData = voucherService.getVoucherImportTemplateData(accountSetId, getLoginUserId()); // 1. 解析导入文件 List<FmsVoucherImportExcelVO> rows; try { rows = FmsVoucherImportExcelHelper.read(file, templateData.getAuxiliaryTypes()); } catch (IllegalArgumentException | IOException exception` |
| `GET` | `/fms/voucher/statistics/list` | 获得凭证汇总 | `CommonResult<List<FmsVoucherStatisticsRespVO>>` | `@Valid FmsVoucherStatisticsReqVO queryReqVO` |
| `GET` | `/fms/voucher/statistics/export-excel` | 导出凭证汇总 | `void` | `@Valid FmsVoucherStatisticsReqVO queryReqVO, HttpServletResponse response) throws IOException { List<FmsVoucherStatisticsRespVO> list = voucherService.getVoucherStatisticsList(queryReqVO, getLoginUserId()); ExcelUtils.write(response, "凭证汇总表.xls", "凭证汇总", FmsVoucherStatisticsRespVO.class, list); } @GetMapping("/next-number") @Operation(summary = "获得下一凭证号") @Parameters({ @Parameter(name = "accountSetId", description = "账套编号", required = true), @Parameter(name = "voucherWordId", description = "凭证字编号", required = true), @Parameter(name = "voucherTime", description = "凭证日期", required = true) }) @PreAuthorize("@ss.hasAnyPermissions('fms:voucher:query', 'fms:voucher:create', 'fms:voucher:update')") public CommonResult<Integer> getNextVoucherNumber( @RequestParam("accountSetId") @NotNull Long accountSetId, @RequestParam("voucherWordId") @NotNull Long voucherWordId, @RequestParam("voucherTime") @NotNull @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND) LocalDateTime voucherTime` |

### 📦 `HrmAttendanceClockController` (管理后台 - HRM 打卡记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/attendance/clock/create` | 创建打卡记录 | `CommonResult<Long>` | `@Valid @RequestBody HrmAttendanceClockSaveReqVO createReqVO` |
| `PUT` | `/hrm/attendance/clock/update` | 修改打卡记录 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmAttendanceClockSaveReqVO updateReqVO` |
| `DELETE` | `/hrm/attendance/clock/delete` | 删除打卡记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/hrm/attendance/clock/delete-list` | 批量删除打卡记录 | `CommonResult<Boolean>` | `@RequestParam("ids") @NotEmpty(message = "打卡记录不能为空") List<Long> ids` |
| `GET` | `/hrm/attendance/clock/get` | 获得打卡记录 | `CommonResult<HrmAttendanceClockRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/attendance/clock/get-shift` | 获得员工实际班次和允许打卡时间 | `CommonResult<HrmAttendanceClockShiftRespVO>` | `@Valid HrmAttendanceClockShiftReqVO reqVO` |
| `GET` | `/hrm/attendance/clock/page` | 获得打卡记录分页 | `CommonResult<PageResult<HrmAttendanceClockRespVO>>` | `@Validated HrmAttendanceClockPageReqVO pageReqVO` |
| `GET` | `/hrm/attendance/clock/export-excel` | 导出打卡记录 | `void` | `@Validated HrmAttendanceClockPageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<HrmAttendanceClockRespVO> list = buildAttendanceClockRespVOList( attendanceClockService.getAttendanceClockList(exportReqVO)); ExcelUtils.write(response, "打卡记录.xls", "数据", HrmAttendanceClockRespVO.class, list); } // ==================== 拼接 VO ==================== private HrmAttendanceClockShiftRespVO buildAttendanceClockShiftRespVO( HrmAttendanceClockShiftReqVO reqVO, HrmAttendanceGroupDO.Shift shift` |

### 📦 `HrmAttendanceGroupController` (管理后台 - HRM 考勤组)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/attendance/group/create` | 创建考勤组 | `CommonResult<Long>` | `@Valid @RequestBody HrmAttendanceGroupSaveReqVO createReqVO` |
| `PUT` | `/hrm/attendance/group/update` | 修改考勤组 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmAttendanceGroupSaveReqVO updateReqVO` |
| `DELETE` | `/hrm/attendance/group/delete` | 删除考勤组 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/attendance/group/get` | 获得考勤组 | `CommonResult<HrmAttendanceGroupRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/attendance/group/my` | 获得员工所在考勤组 | `CommonResult<HrmAttendanceGroupRespVO>` | `@RequestParam("employeeId") Long employeeId` |
| `GET` | `/hrm/attendance/group/page` | 获得考勤组分页 | `CommonResult<PageResult<HrmAttendanceGroupRespVO>>` | `@Validated HrmAttendanceGroupPageReqVO pageReqVO` |
| `GET` | `/hrm/attendance/group/simple-list` | 获得考勤组精简列表 | `CommonResult<List<HrmAttendanceGroupRespVO>>` | `-` |

### 📦 `HrmAttendanceHolidayController` (管理后台 - HRM 考勤节假日)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/attendance/holiday/create` | 创建考勤节假日 | `CommonResult<Long>` | `@Valid @RequestBody HrmAttendanceHolidaySaveReqVO createReqVO` |
| `PUT` | `/hrm/attendance/holiday/update` | 修改考勤节假日 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmAttendanceHolidaySaveReqVO updateReqVO` |
| `DELETE` | `/hrm/attendance/holiday/delete` | 删除考勤节假日 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/attendance/holiday/get` | 获得考勤节假日 | `CommonResult<HrmAttendanceHolidayRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/attendance/holiday/check` | 检查日期是否为考勤节假日 | `CommonResult<HrmAttendanceHolidayRespVO>` | `@RequestParam("day") @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND) LocalDateTime day` |
| `GET` | `/hrm/attendance/holiday/page` | 获得考勤节假日分页 | `CommonResult<PageResult<HrmAttendanceHolidayRespVO>>` | `@Validated HrmAttendanceHolidayPageReqVO pageReqVO` |

### 📦 `HrmAttendanceLeaveController` (管理后台 - HRM 请假)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/attendance/leave/get` | 获得请假 | `CommonResult<HrmAttendanceLeaveRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/attendance/leave/page` | 获得请假分页 | `CommonResult<PageResult<HrmAttendanceLeaveRespVO>>` | `@Validated HrmAttendanceLeavePageReqVO pageReqVO` |
| `GET` | `/hrm/attendance/leave/export-excel` | 导出请假 | `void` | `@Validated HrmAttendanceLeavePageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<HrmAttendanceLeaveRespVO> list = buildAttendanceLeaveRespVOList( attendanceLeaveService.getAttendanceLeaveList(exportReqVO)); ExcelUtils.write(response, "请假记录.xls", "数据", HrmAttendanceLeaveRespVO.class, list); } // ==================== 拼接 VO ==================== private HrmAttendanceLeaveRespVO buildAttendanceLeaveRespVO(HrmAttendanceLeaveDO attendanceLeave` |

### 📦 `HrmAttendanceStatisticsController` (管理后台 - HRM 考勤统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/attendance/statistics/daily-detail` | 查询员工每日打卡明细 | `CommonResult<HrmAttendanceDailyDetailRespVO>` | `@Valid HrmAttendanceDailyDetailReqVO reqVO` |
| `GET` | `/hrm/attendance/statistics/month-record-page` | 查询员工月度考勤汇总 | `CommonResult<PageResult<HrmAttendanceMonthRecordRespVO>>` | `@Valid HrmAttendanceMonthRecordPageReqVO reqVO` |
| `GET` | `/hrm/attendance/statistics/month-daily-page` | 查询员工月度打卡概况 | `CommonResult<PageResult<HrmAttendanceMonthDailyOverviewRespVO>>` | `@Valid HrmAttendanceMonthRecordPageReqVO reqVO` |
| `GET` | `/hrm/attendance/statistics/month-record-export-excel` | 导出员工月度考勤汇总 | `void` | `@Validated HrmAttendanceMonthRecordPageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<HrmAttendanceMonthRecordRespVO> list = attendanceStatisticsService.getAttendanceMonthRecordList(exportReqVO); fillAttendanceMonthRecordDeptName(list); ExcelUtils.write(response, "员工月度考勤汇总.xls", "数据", HrmAttendanceMonthRecordRespVO.class, list); } @GetMapping("/month-daily-export-excel") @Operation(summary = "导出员工月度打卡概况") @PreAuthorize("@ss.hasPermission('hrm:attendance:clock:export')") @ApiAccessLog(operateType = OperateTypeEnum.EXPORT) public void exportAttendanceMonthDailyOverview(@Validated HrmAttendanceMonthRecordPageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<HrmAttendanceMonthDailyOverviewRespVO> list = attendanceStatisticsService.getAttendanceMonthDailyOverviewList(exportReqVO); fillAttendanceMonthDailyOverview(list); writeAttendanceMonthDailyOverview(response, YearMonth.of(exportReqVO.getYear(), exportReqVO.getMonth()), list); } @GetMapping("/month-detail") @Operation(summary = "查询员工月度考勤详情") @Parameters({ @Parameter(name = "employeeId", description = "员工编号", required = true, example = "1024"), @Parameter(name = "year", description = "年份", required = true, example = "2026"), @Parameter(name = "month", description = "月份", required = true, example = "8") }) @PreAuthorize("@ss.hasPermission('hrm:attendance:statistics:query')") public CommonResult<HrmAttendanceMonthDetailRespVO> getAttendanceMonthDetail( @RequestParam("employeeId") Long employeeId, @RequestParam("year") Integer year, @RequestParam("month") Integer month` |

### 📦 `HrmEmployeeCertificateController` (管理后台 - HRM 员工证书)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/certificate/list` | 获得员工证书列表 | `CommonResult<List<HrmEmployeeCertificateRespVO>>` | `@RequestParam("employeeId") Long employeeId` |
| `POST` | `/hrm/employee/certificate/create` | 创建员工证书 | `CommonResult<Long>` | `@Valid @RequestBody HrmEmployeeCertificateSaveReqVO reqVO` |
| `PUT` | `/hrm/employee/certificate/update` | 更新员工证书 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeCertificateSaveReqVO reqVO` |
| `DELETE` | `/hrm/employee/certificate/delete` | 删除员工证书 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `HrmEmployeeChangeRecordController` (管理后台 - HRM 员工异动记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/change-record/list` | 获得员工异动记录列表 | `CommonResult<List<HrmEmployeeChangeRecordRespVO>>` | `@RequestParam("employeeId") Long employeeId` |

### 📦 `HrmEmployeeContactController` (管理后台 - HRM 员工联系人)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/contact/list` | 获得员工联系人列表 | `CommonResult<List<HrmEmployeeContactRespVO>>` | `@RequestParam("employeeId") Long employeeId` |
| `POST` | `/hrm/employee/contact/create` | 创建员工联系人 | `CommonResult<Long>` | `@Valid @RequestBody HrmEmployeeContactSaveReqVO reqVO` |
| `PUT` | `/hrm/employee/contact/update` | 更新员工联系人 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeContactSaveReqVO reqVO` |
| `DELETE` | `/hrm/employee/contact/delete` | 删除员工联系人 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `HrmEmployeeContractController` (管理后台 - HRM 员工合同)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/contract/list` | 获得员工合同列表 | `CommonResult<List<HrmEmployeeContractRespVO>>` | `@RequestParam("employeeId") Long employeeId` |
| `POST` | `/hrm/employee/contract/create` | 创建员工合同 | `CommonResult<Long>` | `@Valid @RequestBody HrmEmployeeContractSaveReqVO reqVO` |
| `PUT` | `/hrm/employee/contract/update` | 更新员工合同 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeContractSaveReqVO reqVO` |
| `DELETE` | `/hrm/employee/contract/delete` | 删除员工合同 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `HrmEmployeeController` (管理后台 - HRM 员工档案)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/employee/create` | 创建员工档案 | `CommonResult<Long>` | `@Valid @RequestBody HrmEmployeeSaveReqVO createReqVO` |
| `POST` | `/hrm/employee/create-list` | 从未建档后台用户批量创建员工档案 | `CommonResult<List<Long>>` | `@RequestBody @NotEmpty(message = "待创建员工列表不能为空") @Size(max = 100, message = "单次最多创建 100 名员工") List<@Valid HrmEmployeeCreateFromUserReqVO> createReqVOList` |
| `GET` | `/hrm/employee/bound-user-id-list` | 获得已经建立员工档案的后台用户编号列表 | `CommonResult<List<Long>>` | `-` |
| `POST` | `/hrm/employee/send-profile-fill-message` | 发送填写员工档案通知 | `CommonResult<HrmEmployeeNotifyRespVO>` | `@RequestParam("ids") @NotEmpty(message = "员工不能为空") @Size(max = 100, message = "单次最多通知 100 名员工") List<Long> ids` |
| `PUT` | `/hrm/employee/update` | 更新员工档案 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeSaveReqVO updateReqVO` |
| `DELETE` | `/hrm/employee/delete` | 删除员工档案 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/hrm/employee/delete-list` | 批量删除员工档案 | `CommonResult<Boolean>` | `@RequestParam("ids") @NotEmpty List<Long> ids` |
| `GET` | `/hrm/employee/get` | 获得员工档案 | `CommonResult<HrmEmployeeRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/hrm/employee/confirm-entry` | 确认员工入职 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeConfirmEntryReqVO reqVO` |
| `POST` | `/hrm/employee/rehire` | 办理离职员工再入职 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeRehireReqVO reqVO` |
| `POST` | `/hrm/employee/regular` | 办理员工转正 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeRegularReqVO reqVO` |
| `POST` | `/hrm/employee/transfer` | 办理员工调岗 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeTransferReqVO reqVO` |
| `POST` | `/hrm/employee/promote` | 办理员工晋升 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeePromoteReqVO reqVO` |
| `POST` | `/hrm/employee/demote` | 办理员工降级 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeDemoteReqVO reqVO` |
| `POST` | `/hrm/employee/convert-to-full-time` | 办理员工转为全职 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeConvertToFullTimeReqVO reqVO` |
| `POST` | `/hrm/employee/quit` | 办理员工离职 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeQuitReqVO reqVO` |
| `PUT` | `/hrm/employee/cancel-quit` | 取消员工离职 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeCancelQuitReqVO reqVO` |
| `GET` | `/hrm/employee/page` | 获得员工档案分页 | `CommonResult<PageResult<HrmEmployeeRespVO>>` | `@Validated HrmEmployeePageReqVO pageReqVO` |
| `GET` | `/hrm/employee/list` | 获得员工列表 | `CommonResult<List<HrmEmployeeRespVO>>` | `@RequestParam("ids") @NotEmpty List<Long> ids` |
| `GET` | `/hrm/employee/simple-page` | 获得员工精简分页 | `CommonResult<PageResult<HrmEmployeeRespVO>>` | `@Validated HrmEmployeePageReqVO pageReqVO` |
| `GET` | `/hrm/employee/simple-list` | 获得员工精简列表 | `CommonResult<List<HrmEmployeeRespVO>>` | `@RequestParam("ids") @NotEmpty List<Long> ids` |
| `GET` | `/hrm/employee/export-excel` | 导出员工档案 | `void` | `@Validated HrmEmployeePageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<HrmEmployeeRespVO> list = buildEmployeeExportRespVOList(employeeService.getEmployeeList( BeanUtils.toBean(exportReqVO, HrmEmployeeListReqVO.class))); ExcelUtils.write(response, "员工档案.xlsx", "数据", HrmEmployeeRespVO.class, list); } @GetMapping("/get-import-template") @Operation(summary = "获得员工档案导入模板") @PreAuthorize("@ss.hasPermission('hrm:employee:import')") @ApiAccessLog(operateType = OperateTypeEnum.EXPORT) public void importTemplate(HttpServletResponse response) throws IOException { List<HrmEmployeeImportExcelVO> list = Collections.singletonList( HrmEmployeeImportExcelVO.builder() .name("张三").jobNumber("HRM001").mobile("15601691300") .country("中国").nation("汉族").idType(5).idNumber("OTHER-19900101") .sex(1).email("hrm@example.com").nativePlace("浙江杭州") .birthday(LocalDateTime.of(1990, 1, 1, 0, 0)) .address("杭州市西湖区").highestEducation(8) .deptId(1L).leaderJobNumber("HRM000") .postName("Java 工程师").postLevel("P6") .entryStatus(HrmEmployeeEntryStatusEnum.ACTIVE.getStatus()) .status(HrmEmployeeStatusEnum.REGULAR.getStatus()) .type(HrmEmployeeTypeEnum.FORMAL.getType()).probation(3) .entryTime(LocalDateTime.of(2026, 7, 9, 9, 0)) .regularTime(LocalDateTime.of(2026, 10, 9, 9, 0)) .workCity("杭州").workAddress("西湖区").workDetailAddress("文三路") .companyAgeStartTime(LocalDateTime.of(2026, 7, 9, 9, 0)) .userMobile("15601691301") .bankCardNumber("622202600001").bankAreaId(330100).bankName("招商银行") .bankBranchName("杭州高新支行").firstSocialSecurity(false) .firstAccumulationFund(false).socialSecurityNumber("SB20260001") .accumulationFundNumber("GJJ20260001") .socialSecurityStartMonth(LocalDateTime.of(2026, 7, 1, 0, 0)) .schemeName("杭州标准参保方案") .remark("示例员工").build() ); ExcelUtils.write(response, "员工档案导入模板.xlsx", "员工列表", HrmEmployeeImportExcelVO.class, list); } @PostMapping("/import") @Operation(summary = "导入员工档案") @Parameters({ @Parameter(name = "file", description = "Excel 文件", required = true), @Parameter(name = "duplicateStrategy", description = "重复员工处理策略：1 跳过，2 覆盖，3 判失败", example = "3") }) @PreAuthorize("@ss.hasPermission('hrm:employee:import')") @ApiAccessLog(operateType = OperateTypeEnum.IMPORT) public CommonResult<HrmEmployeeImportRespVO> importExcel( @RequestParam("file") MultipartFile file, @RequestParam(value = "duplicateStrategy", required = false, defaultValue = "3") Integer duplicateStrategy) throws Exception { List<HrmEmployeeImportExcelVO> list = ExcelUtils.read(file, HrmEmployeeImportExcelVO.class); return success(employeeService.importEmployeeList(list, duplicateStrategy)); } @GetMapping("/status-count") @Operation(summary = "获得员工状态统计") @PreAuthorize("@ss.hasPermission('hrm:employee:query')") public CommonResult<List<HrmEmployeeStatusCountRespVO>> getEmployeeStatusCount( @Validated HrmEmployeePageReqVO pageReqVO` |
| `GET` | `/hrm/employee/dept-statistics` | 获得员工部门统计 | `CommonResult<List<HrmEmployeeDeptStatisticsRespVO>>` | `-` |

### 📦 `HrmEmployeeEducationExperienceController` (管理后台 - HRM 员工教育经历)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/education-experience/list` | 获得员工教育经历列表 | `CommonResult<List<HrmEmployeeEducationExperienceRespVO>>` | `@RequestParam("employeeId") Long employeeId` |
| `POST` | `/hrm/employee/education-experience/create` | 创建员工教育经历 | `CommonResult<Long>` | `@Valid @RequestBody HrmEmployeeEducationExperienceSaveReqVO reqVO` |
| `PUT` | `/hrm/employee/education-experience/update` | 更新员工教育经历 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeEducationExperienceSaveReqVO reqVO` |
| `DELETE` | `/hrm/employee/education-experience/delete` | 删除员工教育经历 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `HrmEmployeeFieldConfigController` (管理后台 - HRM 员工字段配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/config/create-field/list` | 获得新建员工字段配置 | `CommonResult<List<HrmEmployeeFieldConfigRespVO>>` | `@RequestParam("entryStatus") Integer entryStatus` |
| `PUT` | `/hrm/employee/config/create-field/save` | 保存新建员工字段配置 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeCreateFieldConfigSaveReqVO reqVO` |
| `GET` | `/hrm/employee/config/archive-field/list` | 获得员工档案字段配置 | `CommonResult<List<HrmEmployeeFieldConfigRespVO>>` | `-` |
| `PUT` | `/hrm/employee/config/archive-field/save` | 保存员工档案字段配置 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeArchiveFieldConfigSaveReqVO reqVO` |

### 📦 `HrmEmployeeFileController` (管理后台 - HRM 员工材料附件)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/file/list` | 获得员工材料附件列表 | `CommonResult<List<HrmEmployeeFileRespVO>>` | `@RequestParam("employeeId") Long employeeId` |
| `PUT` | `/hrm/employee/file/save` | 保存员工材料附件 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeFileSaveReqVO reqVO` |

### 📦 `HrmEmployeePersonalNoteController` (管理后台 - HRM 员工个人备忘)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/employee/personal-note/create` | 创建员工个人备忘 | `CommonResult<Long>` | `@Valid @RequestBody HrmEmployeePersonalNoteCreateReqVO reqVO` |
| `DELETE` | `/hrm/employee/personal-note/delete` | 删除员工个人备忘 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `HrmEmployeeQuitInfoController` (管理后台 - HRM 员工离职信息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/quit-info/get` | 获得员工离职信息 | `CommonResult<HrmEmployeeQuitInfoRespVO>` | `@RequestParam("employeeId") Long employeeId` |

### 📦 `HrmEmployeeSalaryCardController` (管理后台 - HRM 员工工资卡)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/salary-card/get` | 获得员工工资卡 | `CommonResult<HrmEmployeeSalaryCardRespVO>` | `@RequestParam("employeeId") Long employeeId` |
| `PUT` | `/hrm/employee/salary-card/save` | 保存员工工资卡 | `CommonResult<Long>` | `@Valid @RequestBody HrmEmployeeSalaryCardSaveReqVO reqVO` |
| `DELETE` | `/hrm/employee/salary-card/delete` | 删除员工工资卡 | `CommonResult<Boolean>` | `@RequestParam("employeeId") Long employeeId` |

### 📦 `HrmEmployeeTrainingExperienceController` (管理后台 - HRM 员工培训经历)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/training-experience/list` | 获得员工培训经历列表 | `CommonResult<List<HrmEmployeeTrainingExperienceRespVO>>` | `@RequestParam("employeeId") Long employeeId` |
| `POST` | `/hrm/employee/training-experience/create` | 创建员工培训经历 | `CommonResult<Long>` | `@Valid @RequestBody HrmEmployeeTrainingExperienceSaveReqVO reqVO` |
| `PUT` | `/hrm/employee/training-experience/update` | 更新员工培训经历 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeTrainingExperienceSaveReqVO reqVO` |
| `DELETE` | `/hrm/employee/training-experience/delete` | 删除员工培训经历 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `HrmEmployeeWorkExperienceController` (管理后台 - HRM 员工工作经历)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/employee/work-experience/list` | 获得员工工作经历列表 | `CommonResult<List<HrmEmployeeWorkExperienceRespVO>>` | `@RequestParam("employeeId") Long employeeId` |
| `POST` | `/hrm/employee/work-experience/create` | 创建员工工作经历 | `CommonResult<Long>` | `@Valid @RequestBody HrmEmployeeWorkExperienceSaveReqVO reqVO` |
| `PUT` | `/hrm/employee/work-experience/update` | 更新员工工作经历 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmEmployeeWorkExperienceSaveReqVO reqVO` |
| `DELETE` | `/hrm/employee/work-experience/delete` | 删除员工工作经历 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `HrmHomeController` (管理后台 - HRM 首页)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/home/hr-statistics-summary` | 获得 HR 工作台统计 | `CommonResult<HrmHrHomeStatisticsRespVO>` | `-` |
| `GET` | `/hrm/home/hr-calendar` | 获得 HR 工作台日历 | `CommonResult<List<HrmHomeCalendarItemRespVO>>` | `@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate` |
| `GET` | `/hrm/home/team-statistics-summary` | 获得团队工作台统计 | `CommonResult<HrmTeamHomeStatisticsRespVO>` | `-` |
| `GET` | `/hrm/home/team-calendar` | 获得团队工作台日历 | `CommonResult<List<HrmHomeCalendarItemRespVO>>` | `@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate` |

### 📦 `HrmInsuranceEmployeeInfoController` (管理后台 - HRM 员工参保信息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/insurance/employee-info/get` | 获得员工参保信息 | `CommonResult<HrmInsuranceEmployeeInfoRespVO>` | `@RequestParam("employeeId") Long employeeId` |
| `PUT` | `/hrm/insurance/employee-info/save` | 保存员工参保信息 | `CommonResult<Long>` | `@Valid @RequestBody HrmInsuranceEmployeeInfoSaveReqVO reqVO` |
| `PUT` | `/hrm/insurance/employee-info/update-scheme` | 更新员工参保方案 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmInsuranceEmployeeInfoUpdateSchemeReqVO reqVO` |

### 📦 `HrmInsuranceMonthEmployeeRecordController` (管理后台 - HRM 员工月度社保)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/insurance/month-employee-record/page` | 获得员工月度社保分页 | `CommonResult<PageResult<HrmInsuranceMonthEmployeeRecordRespVO>>` | `@Valid HrmInsuranceMonthEmployeeRecordPageReqVO reqVO` |
| `GET` | `/hrm/insurance/month-employee-record/get` | 获得员工月度社保详情 | `CommonResult<HrmInsuranceMonthEmployeeRecordRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/hrm/insurance/month-employee-record/update` | 修改员工月度参保项目 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmInsuranceMonthEmployeeRecordUpdateReqVO reqVO` |
| `PUT` | `/hrm/insurance/month-employee-record/stop-list` | 批量停止员工参保 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmInsuranceMonthEmployeeRecordStopListReqVO reqVO` |
| `POST` | `/hrm/insurance/month-employee-record/create-list` | 添加参保人员 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmInsuranceMonthEmployeeRecordCreateListReqVO reqVO` |
| `GET` | `/hrm/insurance/month-employee-record/uninsured-employee-list` | 获得本月未参保员工 | `CommonResult<List<HrmEmployeeRespVO>>` | `@RequestParam("monthRecordId") Long monthRecordId` |

### 📦 `HrmInsuranceMonthRecordController` (管理后台 - HRM 月度社保表)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/insurance/month-record/create-first` | 创建首月社保表 | `CommonResult<Long>` | `@Valid @RequestBody HrmInsuranceMonthRecordCreateReqVO reqVO` |
| `POST` | `/hrm/insurance/month-record/create-next` | 创建下月社保表 | `CommonResult<Long>` | `-` |
| `DELETE` | `/hrm/insurance/month-record/delete` | 删除月度社保表 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/insurance/month-record/get` | 获得月度社保表 | `CommonResult<HrmInsuranceMonthRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/insurance/month-record/last` | 获得最近月度社保表 | `CommonResult<HrmInsuranceMonthRecordRespVO>` | `-` |
| `GET` | `/hrm/insurance/month-record/list` | 获得月度社保表列表 | `CommonResult<List<HrmInsuranceMonthRecordRespVO>>` | `@RequestParam(value = "year", required = false) Integer year` |

### 📦 `HrmInsuranceSchemeController` (管理后台 - HRM 社保方案)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/insurance/scheme/create` | 创建社保方案 | `CommonResult<Long>` | `@Valid @RequestBody HrmInsuranceSchemeSaveReqVO reqVO` |
| `PUT` | `/hrm/insurance/scheme/update` | 更新社保方案 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmInsuranceSchemeSaveReqVO reqVO` |
| `DELETE` | `/hrm/insurance/scheme/delete` | 删除社保方案 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/insurance/scheme/get` | 获得社保方案 | `CommonResult<HrmInsuranceSchemeRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/insurance/scheme/list` | 获得社保方案列表 | `CommonResult<List<HrmInsuranceSchemeRespVO>>` | `-` |
| `GET` | `/hrm/insurance/scheme/simple-list` | 获得社保方案精简列表 | `CommonResult<List<HrmInsuranceSchemeRespVO>>` | `-` |

### 📦 `HrmInsuranceStandardController` (管理后台 - HRM 标准参保数据)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/insurance/standard/type-list` | 获得标准参保类型列表 | `CommonResult<List<HrmInsuranceStandardTypeRespVO>>` | `@Valid HrmInsuranceStandardTypeListReqVO reqVO` |
| `GET` | `/hrm/insurance/standard/project-list` | 获得标准参保项目列表 | `CommonResult<List<HrmInsuranceStandardProjectRespVO>>` | `@Valid HrmInsuranceStandardProjectListReqVO reqVO` |

### 📦 `HrmOperateLogController` (管理后台 - HRM 操作日志)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/operate-log/page` | 获得操作日志 | `CommonResult<PageResult<HrmOperateLogRespVO>>` | `@Valid HrmOperateLogPageReqVO pageReqVO` |

### 📦 `HrmPerformanceAssessmentController` (管理后台 - HRM 员工绩效考核)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/performance/assessment/create-list` | 添加员工绩效考核 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPerformanceAssessmentBatchReqVO reqVO` |
| `DELETE` | `/hrm/performance/assessment/delete-list` | 移除员工绩效考核 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPerformanceAssessmentBatchReqVO reqVO` |
| `GET` | `/hrm/performance/assessment/page` | 获得员工绩效考核分页 | `CommonResult<PageResult<HrmPerformanceAssessmentRespVO>>` | `@Validated HrmPerformanceAssessmentPageReqVO reqVO` |
| `GET` | `/hrm/performance/assessment/unassigned-employee-id-list` | 获得未加入指定绩效计划的员工编号列表 | `CommonResult<List<Long>>` | `@RequestParam("planId") Long planId` |
| `GET` | `/hrm/performance/assessment/get` | 获得员工绩效考核 | `CommonResult<HrmPerformanceAssessmentRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/performance/assessment/process-record-list` | 获得绩效流程记录列表 | `CommonResult<List<HrmPerformanceProcessRecordRespVO>>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/performance/assessment/archive-page` | 获得绩效归档分页 | `CommonResult<PageResult<HrmPerformanceAssessmentRespVO>>` | `@Validated HrmPerformanceArchivePageReqVO reqVO` |
| `GET` | `/hrm/performance/assessment/archive-employee-page` | 获得员工绩效档案分页 | `CommonResult<PageResult<HrmPerformanceArchiveEmployeeRespVO>>` | `@Validated HrmPerformanceArchiveEmployeePageReqVO reqVO` |
| `GET` | `/hrm/performance/assessment/archive-get` | 获得绩效归档详情 | `CommonResult<HrmPerformanceAssessmentRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/performance/assessment/archive-process-record-list` | 获得绩效归档流程记录列表 | `CommonResult<List<HrmPerformanceProcessRecordRespVO>>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/performance/assessment/archive-plan-simple-list` | 获得绩效归档计划精简列表 | `CommonResult<List<HrmPerformancePlanRespVO>>` | `-` |
| `DELETE` | `/hrm/performance/assessment/archive-delete` | 删除绩效归档记录 | `CommonResult<Boolean>` | `@RequestParam("ids") @NotEmpty(message = "归档记录不能为空") List<Long> ids` |
| `DELETE` | `/hrm/performance/assessment/archive-employee-delete` | 删除员工的全部绩效档案 | `CommonResult<Boolean>` | `@RequestParam("employeeIds") @NotEmpty(message = "员工不能为空") List<Long> employeeIds` |

### 📦 `HrmPerformanceAssessmentTemplateController` (管理后台 - HRM 绩效考核模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/performance/assessment-template/create` | 创建绩效考核模板 | `CommonResult<Long>` | `@Valid @RequestBody HrmPerformanceAssessmentTemplateSaveReqVO createReqVO` |
| `PUT` | `/hrm/performance/assessment-template/update` | 更新绩效考核模板 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPerformanceAssessmentTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/hrm/performance/assessment-template/delete` | 删除绩效考核模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/hrm/performance/assessment-template/delete-list` | 批量删除绩效考核模板 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/hrm/performance/assessment-template/get` | 获得绩效考核模板 | `CommonResult<HrmPerformanceAssessmentTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/performance/assessment-template/page` | 获得绩效考核模板分页 | `CommonResult<PageResult<HrmPerformanceAssessmentTemplateRespVO>>` | `@Validated HrmPerformanceAssessmentTemplatePageReqVO pageReqVO` |
| `GET` | `/hrm/performance/assessment-template/simple-list` | 获得绩效考核模板精简列表 | `CommonResult<List<HrmPerformanceAssessmentTemplateRespVO>>` | `-` |

### 📦 `HrmPerformancePlanController` (管理后台 - HRM 绩效计划)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/performance/plan/create` | 创建绩效计划 | `CommonResult<Long>` | `@Valid @RequestBody HrmPerformancePlanSaveReqVO reqVO` |
| `PUT` | `/hrm/performance/plan/update` | 更新绩效计划 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPerformancePlanSaveReqVO reqVO` |
| `DELETE` | `/hrm/performance/plan/delete` | 删除绩效计划 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/performance/plan/get` | 获得绩效计划 | `CommonResult<HrmPerformancePlanRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/performance/plan/page` | 获得绩效计划分页 | `CommonResult<PageResult<HrmPerformancePlanRespVO>>` | `@Validated HrmPerformancePlanPageReqVO reqVO` |
| `POST` | `/hrm/performance/plan/start` | 启动绩效计划 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/hrm/performance/plan/open-scoring` | 开启绩效评分 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/hrm/performance/plan/start-interview` | 发起绩效面谈 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/hrm/performance/plan/archive` | 归档绩效计划 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/hrm/performance/plan/terminate` | 终止绩效计划 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/performance/plan/status-count` | 获得绩效计划状态统计 | `CommonResult<List<HrmPerformancePlanStageCountRespVO>>` | `@RequestParam("planId") Long planId` |
| `GET` | `/hrm/performance/plan/level-count` | 获得绩效结果等级统计 | `CommonResult<List<HrmPerformancePlanResultLevelCountRespVO>>` | `@RequestParam("planId") Long planId` |

### 📦 `HrmPerformanceResultTemplateController` (管理后台 - HRM 绩效结果模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/performance/result-template/create` | 创建绩效结果模板 | `CommonResult<Long>` | `@Valid @RequestBody HrmPerformanceResultTemplateSaveReqVO createReqVO` |
| `PUT` | `/hrm/performance/result-template/update` | 更新绩效结果模板 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPerformanceResultTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/hrm/performance/result-template/delete` | 删除绩效结果模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/hrm/performance/result-template/delete-list` | 批量删除绩效结果模板 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/hrm/performance/result-template/get` | 获得绩效结果模板 | `CommonResult<HrmPerformanceResultTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/performance/result-template/page` | 获得绩效结果模板分页 | `CommonResult<PageResult<HrmPerformanceResultTemplateRespVO>>` | `@Validated HrmPerformanceResultTemplatePageReqVO pageReqVO` |
| `GET` | `/hrm/performance/result-template/simple-list` | 获得绩效结果模板精简列表 | `CommonResult<List<HrmPerformanceResultTemplateRespVO>>` | `@RequestParam(value = "status", required = false) Integer status` |

### 📦 `HrmPortalAttendanceClockController` (管理后台 - HRM 员工端考勤打卡)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/attendance/clock/get-detail` | 获得我的打卡详情 | `CommonResult<HrmPortalAttendanceClockDetailRespVO>` | `-` |
| `POST` | `/hrm/portal/attendance/clock/create` | 手机端打卡 | `CommonResult<Long>` | `@Valid @RequestBody HrmPortalAttendanceClockCreateReqVO createReqVO` |
| `GET` | `/hrm/portal/attendance/clock/list` | 获得我的考勤记录 | `CommonResult<List<HrmPortalAttendanceRecordRespVO>>` | `@RequestParam(value = "year", required = false) Integer year, @RequestParam(value = "month", required = false) Integer month` |

### 📦 `HrmPortalAttendanceLeaveController` (管理后台 - HRM 员工端请假)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/attendance/leave/list` | 获得我的请假申请列表 | `CommonResult<List<HrmAttendanceLeaveRespVO>>` | `-` |
| `POST` | `/hrm/portal/attendance/leave/create` | 创建我的请假申请 | `CommonResult<Long>` | `@Valid @RequestBody HrmAttendanceLeaveCreateReqVO reqVO` |
| `PUT` | `/hrm/portal/attendance/leave/cancel` | 取消我的请假申请 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmAttendanceLeaveCancelReqVO reqVO` |

### 📦 `HrmPortalAttendanceStatisticsController` (管理后台 - HRM 员工端考勤统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/attendance/statistics/month-detail` | 获得我的月度考勤详情 | `CommonResult<HrmAttendanceMonthDetailRespVO>` | `@RequestParam(value = "year", required = false) Integer year, @RequestParam(value = "month", required = false) Integer month` |

### 📦 `HrmPortalEmployeeCertificateController` (管理后台 - HRM 员工端证书)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/employee/certificate/list` | 获得我的证书列表 | `CommonResult<List<HrmEmployeeCertificateRespVO>>` | `-` |

### 📦 `HrmPortalEmployeeContactController` (管理后台 - HRM 员工端联系人)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/employee/contact/list` | 获得我的联系人列表 | `CommonResult<List<HrmEmployeeContactRespVO>>` | `-` |

### 📦 `HrmPortalEmployeeController` (管理后台 - HRM 员工端档案)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/employee/get-bind-status` | 获得当前账号的员工绑定状态 | `CommonResult<Boolean>` | `-` |
| `GET` | `/hrm/portal/employee/get` | 获得我的员工档案 | `CommonResult<HrmPortalEmployeeRespVO>` | `-` |
| `PUT` | `/hrm/portal/employee/update` | 更新我的员工档案 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPortalEmployeeUpdateReqVO reqVO` |

### 📦 `HrmPortalEmployeeEducationExperienceController` (管理后台 - HRM 员工端教育经历)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/employee/education-experience/list` | 获得我的教育经历列表 | `CommonResult<List<HrmEmployeeEducationExperienceRespVO>>` | `-` |

### 📦 `HrmPortalEmployeeFieldConfigController` (管理后台 - HRM 员工端档案字段配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/employee/field-config/list` | 获得我的员工档案字段配置 | `CommonResult<List<HrmEmployeeFieldConfigRespVO>>` | `-` |

### 📦 `HrmPortalEmployeeQuitInfoController` (管理后台 - HRM 员工端离职信息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/employee/quit-info/get` | 获得我的离职信息 | `CommonResult<HrmEmployeeQuitInfoRespVO>` | `-` |

### 📦 `HrmPortalEmployeeTrainingExperienceController` (管理后台 - HRM 员工端培训经历)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/employee/training-experience/list` | 获得我的培训经历列表 | `CommonResult<List<HrmEmployeeTrainingExperienceRespVO>>` | `-` |

### 📦 `HrmPortalEmployeeWorkExperienceController` (管理后台 - HRM 员工端工作经历)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/employee/work-experience/list` | 获得我的工作经历列表 | `CommonResult<List<HrmEmployeeWorkExperienceRespVO>>` | `-` |

### 📦 `HrmPortalHomeController` (管理后台 - HRM 员工端首页)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/home/calendar` | 获得员工端首页日历 | `CommonResult<List<HrmHomeCalendarItemRespVO>>` | `@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate, @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate` |

### 📦 `HrmPortalInsuranceController` (管理后台 - HRM 员工端社保)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/insurance/record/list` | 获得我的社保记录 | `CommonResult<List<HrmPortalInsuranceRecordRespVO>>` | `@RequestParam(value = "year", required = false) Integer year` |
| `GET` | `/hrm/portal/insurance/record/get` | 获得我的社保记录详情 | `CommonResult<HrmPortalInsuranceRecordRespVO>` | `@RequestParam("id") Long id` |

### 📦 `HrmPortalPerformanceAssessmentController` (管理后台 - HRM 员工端绩效考核)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/performance/assessment/page` | 获得我的绩效分页 | `CommonResult<PageResult<HrmPortalPerformanceAssessmentRespVO>>` | `@Valid HrmPortalPerformanceAssessmentPageReqVO reqVO` |
| `GET` | `/hrm/portal/performance/assessment/task-count` | 获得我的绩效任务数量 | `CommonResult<HrmPortalPerformanceTaskCountRespVO>` | `@RequestParam(value = "search", required = false) String search` |
| `GET` | `/hrm/portal/performance/assessment/fill-quota-task-page` | 获得我的绩效指标填写任务分页 | `CommonResult<PageResult<HrmPerformanceAssessmentRespVO>>` | `@Valid HrmPortalPerformanceTaskPageReqVO reqVO` |
| `GET` | `/hrm/portal/performance/assessment/target-confirmation-task-page` | 获得我的绩效目标确认任务分页 | `CommonResult<PageResult<HrmPerformanceAssessmentRespVO>>` | `@Valid HrmPortalPerformanceTaskPageReqVO reqVO` |
| `GET` | `/hrm/portal/performance/assessment/review-task-page` | 获得我的绩效评分任务分页 | `CommonResult<PageResult<HrmPerformanceAssessmentRespVO>>` | `@Valid HrmPortalPerformanceTaskPageReqVO reqVO` |
| `GET` | `/hrm/portal/performance/assessment/result-audit-task-page` | 获得我的绩效结果审核任务分页 | `CommonResult<PageResult<HrmPerformanceAssessmentRespVO>>` | `@Valid HrmPortalPerformanceTaskPageReqVO reqVO` |
| `GET` | `/hrm/portal/performance/assessment/result-confirmation-task-page` | 获得我的绩效结果确认任务分页 | `CommonResult<PageResult<HrmPerformanceAssessmentRespVO>>` | `@Valid HrmPortalPerformanceTaskPageReqVO reqVO` |
| `GET` | `/hrm/portal/performance/assessment/appeal-task-page` | 获得我的绩效申诉处理任务分页 | `CommonResult<PageResult<HrmPerformanceAssessmentRespVO>>` | `@Valid HrmPortalPerformanceTaskPageReqVO reqVO` |
| `GET` | `/hrm/portal/performance/assessment/get` | 获得我的员工绩效考核明细 | `CommonResult<HrmPerformanceAssessmentRespVO>` | `@RequestParam("id") Long id, @RequestParam(value = "stageId", required = false) Long stageId` |
| `GET` | `/hrm/portal/performance/assessment/process-record-list` | 获得我的绩效流程记录 | `CommonResult<List<HrmPerformanceProcessRecordRespVO>>` | `@RequestParam("id") Long id, @RequestParam(value = "stageId", required = false) Long stageId` |
| `PUT` | `/hrm/portal/performance/assessment/fill-quota` | 填写我的绩效指标 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPortalPerformanceFillQuotaReqVO reqVO` |
| `PUT` | `/hrm/portal/performance/assessment/confirm-target` | 确认我的绩效目标 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPortalPerformanceConfirmReqVO reqVO` |
| `POST` | `/hrm/portal/performance/assessment/score-preview` | 试算绩效评分 | `CommonResult<HrmPortalPerformanceScorePreviewRespVO>` | `@Valid @RequestBody HrmPortalPerformanceScoreReqVO reqVO` |
| `PUT` | `/hrm/portal/performance/assessment/score` | 提交绩效自评或他评 | `CommonResult<HrmPortalPerformanceProcessRespVO>` | `@Valid @RequestBody HrmPortalPerformanceScoreReqVO reqVO` |
| `PUT` | `/hrm/portal/performance/assessment/reject-review-stage` | 驳回上一绩效评分阶段 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPortalPerformanceReviewRejectReqVO reqVO` |
| `PUT` | `/hrm/portal/performance/assessment/handle-result-audit` | 处理绩效结果审核 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPortalPerformanceHandleStageReqVO reqVO` |
| `PUT` | `/hrm/portal/performance/assessment/confirm-result` | 确认我的绩效结果 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPortalPerformanceConfirmReqVO reqVO` |
| `PUT` | `/hrm/portal/performance/assessment/submit-appeal` | 提交我的绩效申诉 | `CommonResult<HrmPortalPerformanceProcessRespVO>` | `@Valid @RequestBody HrmPortalPerformanceAppealReqVO reqVO` |
| `PUT` | `/hrm/portal/performance/assessment/handle-appeal` | 处理绩效申诉 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmPortalPerformanceHandleStageReqVO reqVO` |

### 📦 `HrmPortalSalarySlipController` (管理后台 - HRM 员工端工资条)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/portal/salary/slip/unread-summary` | 获得我的未读工资条概况 | `CommonResult<HrmPortalSalarySlipUnreadSummaryRespVO>` | `-` |
| `GET` | `/hrm/portal/salary/slip/list` | 获得我的工资条列表 | `CommonResult<List<HrmPortalSalarySlipRespVO>>` | `@Valid HrmPortalSalarySlipListReqVO reqVO` |
| `GET` | `/hrm/portal/salary/slip/get` | 获得我的工资条详情 | `CommonResult<HrmPortalSalarySlipRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/hrm/portal/salary/slip/read` | 标记我的工资条为已读 | `CommonResult<Boolean>` | `@RequestParam("ids") @NotEmpty(message = "工资条编号列表不能为空") List<Long> ids` |

### 📦 `HrmRecruitCandidateController` (管理后台 - HRM 招聘候选人)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/recruit/candidate/create` | 创建招聘候选人 | `CommonResult<Long>` | `@Valid @RequestBody HrmRecruitCandidateSaveReqVO createReqVO` |
| `PUT` | `/hrm/recruit/candidate/update` | 更新招聘候选人 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitCandidateSaveReqVO updateReqVO` |
| `PUT` | `/hrm/recruit/candidate/update-status` | 更新招聘候选人状态 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitCandidateUpdateStatusReqVO reqVO` |
| `PUT` | `/hrm/recruit/candidate/update-post` | 更新招聘候选人应聘职位 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitCandidateUpdatePostReqVO reqVO` |
| `PUT` | `/hrm/recruit/candidate/update-channel` | 更新招聘候选人渠道 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitCandidateUpdateChannelReqVO reqVO` |
| `PUT` | `/hrm/recruit/candidate/eliminate` | 淘汰招聘候选人 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitCandidateUpdateEliminateReqVO reqVO` |
| `POST` | `/hrm/recruit/candidate/convert-employee` | 候选人转员工档案 | `CommonResult<Long>` | `@Valid @RequestBody HrmRecruitCandidateEntryReqVO reqVO` |
| `DELETE` | `/hrm/recruit/candidate/delete` | 删除招聘候选人 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/recruit/candidate/get` | 获得招聘候选人 | `CommonResult<HrmRecruitCandidateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/recruit/candidate/page` | 获得招聘候选人分页 | `CommonResult<PageResult<HrmRecruitCandidateRespVO>>` | `@Validated HrmRecruitCandidatePageReqVO pageReqVO` |
| `GET` | `/hrm/recruit/candidate/clean-ids` | 获得待清理候选人编号 | `CommonResult<List<Long>>` | `@Valid HrmRecruitCandidateCleanReqVO reqVO` |
| `GET` | `/hrm/recruit/candidate/status-count` | 获得候选人状态数量 | `CommonResult<List<HrmRecruitStatusCountRespVO>>` | `@Validated HrmRecruitCandidatePageReqVO pageReqVO` |

### 📦 `HrmRecruitChannelController` (管理后台 - HRM 招聘渠道)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/recruit/channel/create` | 创建招聘渠道 | `CommonResult<Long>` | `@Valid @RequestBody HrmRecruitChannelSaveReqVO createReqVO` |
| `PUT` | `/hrm/recruit/channel/update` | 更新招聘渠道 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitChannelSaveReqVO updateReqVO` |
| `PUT` | `/hrm/recruit/channel/update-status` | 更新招聘渠道状态 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitChannelStatusReqVO statusReqVO` |
| `DELETE` | `/hrm/recruit/channel/delete` | 删除招聘渠道 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitChannelDeleteReqVO deleteReqVO` |
| `GET` | `/hrm/recruit/channel/get` | 获得招聘渠道 | `CommonResult<HrmRecruitChannelRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/recruit/channel/page` | 获得招聘渠道分页 | `CommonResult<PageResult<HrmRecruitChannelRespVO>>` | `@Validated HrmRecruitChannelPageReqVO pageReqVO` |
| `GET` | `/hrm/recruit/channel/simple-list` | 获得招聘渠道精简列表 | `CommonResult<List<HrmRecruitChannelRespVO>>` | `-` |

### 📦 `HrmRecruitConfigController` (管理后台 - HRM 招聘设置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/recruit/config/eliminate-reason/save` | 保存招聘淘汰原因 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitEliminateReasonSaveReqVO saveReqVO` |
| `GET` | `/hrm/recruit/config/eliminate-reason/list` | 获得招聘淘汰原因列表 | `CommonResult<List<String>>` | `-` |

### 📦 `HrmRecruitInterviewController` (管理后台 - HRM 招聘面试)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/recruit/interview/create` | 创建招聘面试 | `CommonResult<Long>` | `@Valid @RequestBody HrmRecruitInterviewSaveReqVO createReqVO` |
| `PUT` | `/hrm/recruit/interview/update` | 更新招聘面试 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitInterviewSaveReqVO updateReqVO` |
| `PUT` | `/hrm/recruit/interview/update-result` | 更新招聘面试结果 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitInterviewResultReqVO reqVO` |
| `DELETE` | `/hrm/recruit/interview/delete` | 删除招聘面试 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/recruit/interview/get` | 获得招聘面试 | `CommonResult<HrmRecruitInterviewRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/recruit/interview/list-by-candidate` | 获得候选人的招聘面试列表 | `CommonResult<List<HrmRecruitInterviewRespVO>>` | `@RequestParam("candidateId") Long candidateId` |

### 📦 `HrmRecruitPostController` (管理后台 - HRM 招聘职位)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/recruit/post/create` | 创建招聘职位 | `CommonResult<Long>` | `@Valid @RequestBody HrmRecruitPostSaveReqVO createReqVO` |
| `PUT` | `/hrm/recruit/post/update` | 更新招聘职位 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitPostSaveReqVO updateReqVO` |
| `PUT` | `/hrm/recruit/post/update-status` | 更新招聘职位状态 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmRecruitPostStatusReqVO reqVO` |
| `GET` | `/hrm/recruit/post/get` | 获得招聘职位 | `CommonResult<HrmRecruitPostRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/recruit/post/page` | 获得招聘职位分页 | `CommonResult<PageResult<HrmRecruitPostRespVO>>` | `@Validated HrmRecruitPostPageReqVO pageReqVO` |
| `GET` | `/hrm/recruit/post/simple-list` | 获得招聘职位精简列表 | `CommonResult<List<HrmRecruitPostRespVO>>` | `-` |
| `GET` | `/hrm/recruit/post/status-count` | 获得招聘职位状态数量 | `CommonResult<List<HrmRecruitStatusCountRespVO>>` | `@Validated HrmRecruitPostPageReqVO pageReqVO` |

### 📦 `HrmRecruitPostTypeController` (管理后台 - HRM 招聘职位类型)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/recruit/post-type/list` | 获得招聘职位类型列表 | `CommonResult<List<HrmRecruitPostTypeRespVO>>` | `@RequestParam(value = "status", required = false) Integer status` |

### 📦 `HrmSalaryChangeRecordController` (管理后台 - HRM 定薪/调薪记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/salary/change-record/get` | 获得定薪/调薪记录 | `CommonResult<HrmSalaryChangeRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/change-record/list` | 获得定薪/调薪记录列表 | `CommonResult<List<HrmSalaryChangeRecordRespVO>>` | `@RequestParam("employeeId") Long employeeId` |
| `PUT` | `/hrm/salary/change-record/cancel` | 取消定薪/调薪记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/hrm/salary/change-record/delete` | 删除定薪/调薪记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `HrmSalaryChangeTemplateController` (管理后台 - HRM 调薪模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/salary/change-template/create` | 创建调薪模板 | `CommonResult<Long>` | `@Valid @RequestBody HrmSalaryChangeTemplateSaveReqVO createReqVO` |
| `PUT` | `/hrm/salary/change-template/update` | 更新调薪模板 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmSalaryChangeTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/hrm/salary/change-template/delete` | 删除调薪模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/change-template/get` | 获得调薪模板 | `CommonResult<HrmSalaryChangeTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/change-template/list` | 获得调薪模板列表 | `CommonResult<List<HrmSalaryChangeTemplateRespVO>>` | `-` |

### 📦 `HrmSalaryConfigController` (管理后台 - HRM 薪资配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/salary/config/create` | 创建薪资配置 | `CommonResult<Long>` | `@Valid @RequestBody HrmSalaryConfigCreateReqVO reqVO` |
| `PUT` | `/hrm/salary/config/update` | 更新薪资配置 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmSalaryConfigUpdateReqVO reqVO` |
| `GET` | `/hrm/salary/config/get` | 获得薪资配置 | `CommonResult<HrmSalaryConfigRespVO>` | `-` |

### 📦 `HrmSalaryEmployeeInfoController` (管理后台 - HRM 员工薪资信息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/salary/employee-info/page` | 获得员工薪资信息分页 | `CommonResult<PageResult<HrmSalaryEmployeeInfoRespVO>>` | `@Validated HrmSalaryEmployeeInfoPageReqVO reqVO` |
| `GET` | `/hrm/salary/employee-info/status-count` | 获得员工薪资信息状态数量 | `CommonResult<List<HrmEmployeeStatusCountRespVO>>` | `@Validated HrmSalaryEmployeeInfoPageReqVO reqVO` |
| `GET` | `/hrm/salary/employee-info/get` | 获得员工薪资信息 | `CommonResult<HrmSalaryEmployeeInfoRespVO>` | `@RequestParam("employeeId") Long employeeId` |
| `GET` | `/hrm/salary/employee-info/get-adjustment-min-effect-date` | 获得最早调薪生效日期 | `CommonResult<LocalDate>` | `-` |
| `PUT` | `/hrm/salary/employee-info/update` | 修改员工薪资信息 | `CommonResult<Long>` | `@Valid @RequestBody HrmSalaryEmployeeInfoUpdateReqVO reqVO` |
| `PUT` | `/hrm/salary/employee-info/update-list` | 批量调薪 | `CommonResult<HrmSalaryEmployeeInfoUpdateListRespVO>` | `@Valid @RequestBody HrmSalaryEmployeeInfoUpdateListReqVO reqVO` |
| `GET` | `/hrm/salary/employee-info/get-fix-import-template` | 获得薪资档案定薪导入模板 | `void` | `HttpServletResponse response) throws IOException { List<HrmSalaryOptionDO> options = salaryEmployeeInfoService.getSalaryImportOptionList(); List<List<String>> head = buildFixSalaryImportHead(options); List<List<Object>> data = buildFixSalaryImportTemplateData(options); ExcelUtils.write(response, "薪资档案定薪导入模板.xls", "薪资档案", head, data); } @PostMapping("/import-fix") @Operation(summary = "导入薪资档案定薪") @Parameter(name = "file", description = "Excel 文件", required = true) @PreAuthorize("@ss.hasPermission('hrm:salary:employee-info:import')") @ApiAccessLog(operateType = OperateTypeEnum.IMPORT) public CommonResult<HrmSalaryEmployeeInfoImportRespVO> importFixExcel(@RequestParam("file") MultipartFile file) throws IOException { return success(salaryEmployeeInfoService.importFixSalaryList(ExcelUtils.read(file))); } @GetMapping("/get-change-import-template") @Operation(summary = "获得薪资档案调薪导入模板") @PreAuthorize("@ss.hasPermission('hrm:salary:employee-info:import')") @ApiAccessLog(operateType = OperateTypeEnum.EXPORT) public void getChangeImportTemplate(HttpServletResponse response) throws IOException { List<HrmSalaryOptionDO> options = salaryEmployeeInfoService.getSalaryImportOptionList(); List<List<String>> head = buildChangeSalaryImportHead(options); List<List<Object>> data = buildChangeSalaryImportTemplateData(options); ExcelUtils.write(response, "薪资档案调薪导入模板.xls", "薪资档案", head, data); } @PostMapping("/import-change") @Operation(summary = "导入薪资档案调薪") @Parameter(name = "file", description = "Excel 文件", required = true) @PreAuthorize("@ss.hasPermission('hrm:salary:employee-info:import')") @ApiAccessLog(operateType = OperateTypeEnum.IMPORT) public CommonResult<HrmSalaryEmployeeInfoImportRespVO> importChangeExcel(@RequestParam("file") MultipartFile file) throws IOException { return success(salaryEmployeeInfoService.importChangeSalaryList(ExcelUtils.read(file))); } // ==================== 拼接 VO ==================== private PageResult<HrmSalaryEmployeeInfoRespVO> buildSalaryEmployeeInfoRespVOPageResult( PageResult<HrmEmployeeDO> pageResult` |

### 📦 `HrmSalaryGroupController` (管理后台 - HRM 薪资组)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/salary/group/create` | 创建薪资组 | `CommonResult<Long>` | `@Valid @RequestBody HrmSalaryGroupSaveReqVO reqVO` |
| `PUT` | `/hrm/salary/group/update` | 修改薪资组 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmSalaryGroupSaveReqVO reqVO` |
| `DELETE` | `/hrm/salary/group/delete` | 删除薪资组 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/group/get` | 获得薪资组 | `CommonResult<HrmSalaryGroupRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/group/page` | 获得薪资组分页 | `CommonResult<PageResult<HrmSalaryGroupRespVO>>` | `@Validated HrmSalaryGroupPageReqVO reqVO` |
| `GET` | `/hrm/salary/group/simple-list` | 获得薪资组精简列表 | `CommonResult<List<HrmSalaryGroupRespVO>>` | `-` |

### 📦 `HrmSalaryMonthEmployeeRecordController` (管理后台 - HRM 员工月度工资)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `PUT` | `/hrm/salary/month-employee-record/update-list` | 批量修改员工工资项 | `CommonResult<Boolean>` | `@NotEmpty(message = "员工工资记录不能为空") @RequestBody List<@Valid HrmSalaryMonthEmployeeRecordUpdateReqVO> reqVOs` |
| `GET` | `/hrm/salary/month-employee-record/page` | 获得员工月度工资分页 | `CommonResult<PageResult<HrmSalaryMonthEmployeeRecordRespVO>>` | `@Valid HrmSalaryMonthEmployeeRecordPageReqVO reqVO` |
| `GET` | `/hrm/salary/month-employee-record/employee-page` | 获得指定员工的月度工资分页 | `CommonResult<PageResult<HrmSalaryMonthEmployeeRecordRespVO>>` | `@Valid HrmSalaryEmployeeMonthRecordPageReqVO reqVO` |
| `GET` | `/hrm/salary/month-employee-record/list` | 获得员工月度工资列表 | `CommonResult<List<HrmSalaryMonthEmployeeRecordRespVO>>` | `@Valid HrmSalaryMonthEmployeeRecordListReqVO reqVO` |

### 📦 `HrmSalaryMonthRecordController` (管理后台 - HRM 月度工资表)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/salary/month-record/create-next` | 创建下月工资表 | `CommonResult<Long>` | `-` |
| `POST` | `/hrm/salary/month-record/compute` | 核算工资表 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/hrm/salary/month-record` | 带导入文件核算工资表 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam(value = "syncInsuranceData", defaultValue = "true") boolean syncInsuranceData, @RequestParam(value = "syncAttendanceData", defaultValue = "false") boolean syncAttendanceData, @RequestParam(value = "attendanceFile", required = false) MultipartFile attendanceFile, @RequestParam(value = "additionalDeductionFile", required = false) MultipartFile additionalDeductionFile, @RequestParam(value = "cumulativeTaxFile", required = false) MultipartFile cumulativeTaxFile) throws IOException { salaryMonthRecordService.computeMonthRecord(id, syncInsuranceData, syncAttendanceData, ExcelUtils.read(attendanceFile), ExcelUtils.read(additionalDeductionFile), ExcelUtils.read(cumulativeTaxFile)); return success(true); } @GetMapping("/get-attendance-import-template") @Operation(summary = "获得工资表考勤导入模板") @Parameter(name = "monthRecordId", description = "月度工资表编号", example = "1024") @PreAuthorize("@ss.hasPermission('hrm:salary:month-record:compute')") @ApiAccessLog(operateType = OperateTypeEnum.EXPORT) public void getAttendanceImportTemplate( @RequestParam(value = "monthRecordId", required = false) Long monthRecordId, HttpServletResponse response) throws IOException { List<HrmEmployeeDO> employees = getPayrollImportEmployeeList(monthRecordId, false); List<List<Object>> data; if (monthRecordId == null` |
| `GET` | `/hrm/salary/month-record/get-cumulative-tax-import-template` | 获得工资表上月个税累计导入模板 | `void` | `@RequestParam(value = "monthRecordId", required = false) Long monthRecordId, HttpServletResponse response) throws IOException { List<List<String>> head = buildImportHead(Arrays.asList( "累计收入额（截至上月）", "累计减除费用（截至上月）", "累计专项扣除（截至上月）", "累计已预缴税额")); List<HrmEmployeeDO> employees = getPayrollImportEmployeeList(monthRecordId, true); List<List<Object>> data = buildImportTemplateData(employees, 4); ExcelUtils.write(response, "月度工资上月个税累计导入模板.xls", "月度工资", head, data); } @GetMapping("/get-additional-deduction-import-template") @Operation(summary = "获得工资表专项附加扣除导入模板") @Parameter(name = "monthRecordId", description = "月度工资表编号", example = "1024") @PreAuthorize("@ss.hasPermission('hrm:salary:month-record:compute')") @ApiAccessLog(operateType = OperateTypeEnum.EXPORT) public void getAdditionalDeductionImportTemplate( @RequestParam(value = "monthRecordId", required = false) Long monthRecordId, HttpServletResponse response) throws IOException { List<List<String>> head = buildImportHead(Arrays.asList( "累计子女教育", "累计住房租金", "累计住房贷款利息", "累计赡养老人", "累计继续教育")); List<HrmEmployeeDO> employees = getPayrollImportEmployeeList(monthRecordId, true); List<List<Object>> data = buildImportTemplateData(employees, 5); ExcelUtils.write(response, "月度工资专项附加扣除导入模板.xls", "月度工资", head, data); } @DeleteMapping("/delete") @Operation(summary = "删除月度工资表") @Parameter(name = "id", description = "工资表编号", required = true, example = "1024") @PreAuthorize("@ss.hasPermission('hrm:salary:month-record:delete')") public CommonResult<Boolean> deleteMonthRecord(@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/month-record/get` | 获得月度工资表 | `CommonResult<HrmSalaryMonthRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/month-record/page` | 获得月度工资表分页 | `CommonResult<PageResult<HrmSalaryMonthRecordRespVO>>` | `@Valid HrmSalaryMonthRecordPageReqVO reqVO` |
| `GET` | `/hrm/salary/month-record/last` | 获得最近月度工资表 | `CommonResult<HrmSalaryMonthRecordRespVO>` | `-` |
| `GET` | `/hrm/salary/month-record/payroll-readiness` | 获得工资核算准备情况 | `CommonResult<HrmSalaryPayrollReadinessRespVO>` | `@RequestParam(value = "monthRecordId", required = false) Long monthRecordId` |
| `GET` | `/hrm/salary/month-record/option-summary` | 获得工资项汇总 | `CommonResult<List<HrmSalaryOptionValueVO>>` | `@Valid HrmSalaryMonthEmployeeRecordListReqVO reqVO` |

### 📦 `HrmSalaryOptionController` (管理后台 - HRM 薪资项)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/salary/option/create` | 创建薪资项 | `CommonResult<Long>` | `@Valid @RequestBody HrmSalaryOptionSaveReqVO reqVO` |
| `PUT` | `/hrm/salary/option/update-enabled` | 更新薪资项启用状态 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmSalaryOptionUpdateEnabledReqVO reqVO` |
| `PUT` | `/hrm/salary/option/update-visible` | 更新薪资项显示状态 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmSalaryOptionUpdateVisibleReqVO reqVO` |
| `DELETE` | `/hrm/salary/option/delete` | 删除薪资项 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/hrm/salary/option/sync` | 同步标准薪资项 | `CommonResult<Boolean>` | `-` |
| `GET` | `/hrm/salary/option/list` | 获得薪资项列表 | `CommonResult<List<HrmSalaryOptionRespVO>>` | `-` |
| `GET` | `/hrm/salary/option/simple-list` | 获得薪资项精简列表 | `CommonResult<List<HrmSalaryOptionRespVO>>` | `@RequestParam(value = "adjustable", required = false) Boolean adjustable` |

### 📦 `HrmSalarySlipController` (管理后台 - HRM 工资条)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/hrm/salary/slip/page` | 获得工资条分页 | `CommonResult<PageResult<HrmSalarySlipRespVO>>` | `@Validated HrmSalarySlipPageReqVO reqVO` |
| `GET` | `/hrm/salary/slip/get` | 获得工资条 | `CommonResult<HrmSalarySlipRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/hrm/salary/slip/remark` | 修改工资条备注 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmSalarySlipRemarkReqVO reqVO` |

### 📦 `HrmSalarySlipSendRecordController` (管理后台 - HRM 工资条发放记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/salary/slip-send-record/create` | 发放工资条 | `CommonResult<Long>` | `@Valid @RequestBody HrmSalarySlipSendReqVO reqVO` |
| `GET` | `/hrm/salary/slip-send-record/employee-page` | 获得工资条待发员工分页 | `CommonResult<PageResult<HrmSalarySlipSendEmployeeRespVO>>` | `@Valid HrmSalarySlipSendEmployeeReqVO reqVO` |
| `DELETE` | `/hrm/salary/slip-send-record/delete` | 删除工资条发放记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/slip-send-record/page` | 获得工资条发放记录分页 | `CommonResult<PageResult<HrmSalarySlipSendRecordRespVO>>` | `@Validated HrmSalarySlipSendRecordPageReqVO reqVO` |
| `GET` | `/hrm/salary/slip-send-record/get` | 获得工资条发放记录 | `CommonResult<HrmSalarySlipSendRecordRespVO>` | `@RequestParam("id") Long id` |

### 📦 `HrmSalarySlipTemplateController` (管理后台 - HRM 工资条模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/salary/slip-template/create` | 创建工资条模板 | `CommonResult<Long>` | `@Valid @RequestBody HrmSalarySlipTemplateSaveReqVO createReqVO` |
| `PUT` | `/hrm/salary/slip-template/update` | 更新工资条模板 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmSalarySlipTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/hrm/salary/slip-template/delete` | 删除工资条模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/slip-template/get` | 获得工资条模板 | `CommonResult<HrmSalarySlipTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/slip-template/list` | 获得工资条模板列表 | `CommonResult<List<HrmSalarySlipTemplateRespVO>>` | `-` |

### 📦 `HrmSalaryTaxRuleController` (管理后台 - HRM 计税规则)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/hrm/salary/tax-rule/create` | 创建计税规则 | `CommonResult<Long>` | `@Valid @RequestBody HrmSalaryTaxRuleSaveReqVO reqVO` |
| `PUT` | `/hrm/salary/tax-rule/update` | 修改计税规则 | `CommonResult<Boolean>` | `@Valid @RequestBody HrmSalaryTaxRuleSaveReqVO reqVO` |
| `DELETE` | `/hrm/salary/tax-rule/delete` | 删除计税规则 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/tax-rule/get` | 获得计税规则 | `CommonResult<HrmSalaryTaxRuleRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/hrm/salary/tax-rule/list` | 获得计税规则列表 | `CommonResult<List<HrmSalaryTaxRuleRespVO>>` | `-` |

### 📦 `ImChannelMaterialController` (用户 APP - IM 频道素材)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/channel/material/get` | 获取素材详情；用于客户端点击图文卡片渲染详情页 | `CommonResult<ImChannelMaterialRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ImConversationReadController` (管理后台 - IM 会话读位置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/conversation-read/pull` | 增量拉取当前用户的会话读位置（重连 / 离线补偿） | `CommonResult<List<ImConversationReadRespVO>>` | `@RequestParam(value = "lastUpdateTime", required = false) Long lastUpdateTime, @RequestParam(value = "lastId", required = false) Long lastId, @RequestParam("limit") @Min(1) @Max(200) Integer limit` |

### 📦 `ImFacePackController` (管理后台 - IM 表情包)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/face-pack/list` | 获得启用的表情包列表（含表情） | `CommonResult<List<ImFacePackUserRespVO>>` | `-` |

### 📦 `ImFaceUserItemController` (管理后台 - IM 个人表情)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/face-user-item/list` | 获得我的个人表情列表 | `CommonResult<List<ImFaceUserItemRespVO>>` | `-` |
| `POST` | `/im/face-user-item/create` | 添加个人表情 | `CommonResult<Long>` | `@Valid @RequestBody ImFaceUserItemSaveReqVO reqVO` |
| `DELETE` | `/im/face-user-item/delete` | 删除个人表情 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `ImFriendController` (管理后台 - IM 好友)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/friend/list` | 获得当前登录用户的好友列表 | `CommonResult<List<ImFriendRespVO>>` | `-` |
| `GET` | `/im/friend/pull` | 增量拉取当前用户的好友关系（重连 / 离线补偿） | `CommonResult<List<ImFriendRespVO>>` | `@RequestParam(value = "lastUpdateTime", required = false) Long lastUpdateTime, @RequestParam(value = "lastId", required = false) Long lastId, @RequestParam("limit") @Min(1) @Max(200) Integer limit` |
| `GET` | `/im/friend/get` | 获得好友详情 | `CommonResult<ImFriendRespVO>` | `@RequestParam("friendUserId") Long friendUserId` |
| `DELETE` | `/im/friend/delete` | 删除好友（单向软删除） | `CommonResult<Boolean>` | `@RequestParam("friendUserId") @NotNull(message = "好友用户编号不能为空") Long friendUserId, @RequestParam(value = "clear", required = false) Boolean clear` |
| `PUT` | `/im/friend/update` | 更新好友单边属性（备注 / 免打扰 / 联系人置顶） | `CommonResult<Boolean>` | `@Valid @RequestBody ImFriendUpdateReqVO reqVO` |
| `PUT` | `/im/friend/block` | 拉黑好友（必须先是好友；单边屏蔽对方私聊消息） | `CommonResult<Boolean>` | `@RequestParam("friendUserId") @NotNull(message = "好友用户编号不能为空") Long friendUserId` |
| `PUT` | `/im/friend/unblock` | 移出黑名单 | `CommonResult<Boolean>` | `@RequestParam("friendUserId") @NotNull(message = "好友用户编号不能为空") Long friendUserId` |

### 📦 `ImFriendRequestController` (管理后台 - IM 好友申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/friend-request/apply` | 发起好友申请 | `CommonResult<Long>` | `@Valid @RequestBody ImFriendRequestApplyReqVO reqVO` |
| `PUT` | `/im/friend-request/agree` | 同意好友申请 | `CommonResult<Boolean>` | `@RequestParam("id") @NotNull(message = "申请编号不能为空") Long id` |
| `PUT` | `/im/friend-request/refuse` | 拒绝好友申请 | `CommonResult<Boolean>` | `@RequestParam("id") @NotNull(message = "申请编号不能为空") Long id, @RequestParam(value = "handleContent", required = false) @Size(max = 255, message = "处理理由最多 255 个字符") String handleContent` |
| `GET` | `/im/friend-request/list` | 查询「我相关」的好友申请列表（游标分页：传 maxId 加载更多） | `CommonResult<List<ImFriendRequestRespVO>>` | `@RequestParam(value = "maxId", required = false) Long maxId, @RequestParam("limit") @Min(1) @Max(200) Integer limit` |
| `GET` | `/im/friend-request/pull` | 增量拉取「我相关」的好友申请（重连 / 离线补偿） | `CommonResult<List<ImFriendRequestRespVO>>` | `@RequestParam(value = "lastUpdateTime", required = false) Long lastUpdateTime, @RequestParam(value = "lastId", required = false) Long lastId, @RequestParam("limit") @Min(1) @Max(200) Integer limit` |
| `GET` | `/im/friend-request/get` | 按 id 单查「我相关」的申请记录（带越权过滤；WebSocket 通知到达后用） | `CommonResult<ImFriendRequestRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ImGroupController` (管理后台 - 群)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/group/create` | 创建群 | `CommonResult<ImGroupRespVO>` | `@Valid @RequestBody ImGroupCreateReqVO createReqVO` |
| `PUT` | `/im/group/update` | 更新群 | `CommonResult<ImGroupRespVO>` | `@Valid @RequestBody ImGroupUpdateReqVO updateReqVO` |
| `DELETE` | `/im/group/dissolve` | 解散群 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/im/group/get` | 获得群 | `CommonResult<ImGroupRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/im/group/list` | 获得当前登录用户的群列表 | `CommonResult<List<ImGroupRespVO>>` | `-` |
| `POST` | `/im/group/invite` | 邀请用户加入群 | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupMemberInviteReqVO inviteReqVO` |
| `DELETE` | `/im/group/quit` | 退出群 | `CommonResult<Boolean>` | `@RequestParam("groupId") Long groupId` |
| `DELETE` | `/im/group/kicking` | 移除群成员 | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupMemberRemoveReqVO removeReqVO` |
| `PUT` | `/im/group/add-admin` | 添加群管理员 | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupAdminAddReqVO reqVO` |
| `PUT` | `/im/group/remove-admin` | 撤销群管理员 | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupAdminRemoveReqVO reqVO` |
| `PUT` | `/im/group/transfer-owner` | 转让群主 | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupTransferOwnerReqVO transferReqVO` |
| `PUT` | `/im/group/pin-message` | 置顶群消息（群主 / 管理员） | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupMessagePinReqVO reqVO` |
| `PUT` | `/im/group/unpin-message` | 取消置顶群消息（群主 / 管理员） | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupMessagePinReqVO reqVO` |
| `PUT` | `/im/group/mute-all` | 全群禁言 / 取消（群主 / 管理员） | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupMuteAllReqVO reqVO` |
| `PUT` | `/im/group/mute-member` | 禁言成员 | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupMuteMemberReqVO reqVO` |
| `PUT` | `/im/group/cancel-mute-member` | 取消成员禁言 | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupCancelMuteMemberReqVO reqVO` |

### 📦 `ImGroupMemberController` (管理后台 - 群成员)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `PUT` | `/im/group-member/update` | 更新群成员 | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupMemberUpdateReqVO updateReqVO` |
| `GET` | `/im/group-member/get` | 获得群成员 | `CommonResult<ImGroupMemberRespVO>` | `@RequestParam(value = "id", required = false) Long id, @RequestParam(value = "groupId", required = false) Long groupId, @RequestParam(value = "userId", required = false) Long userId` |
| `GET` | `/im/group-member/list` | 获得指定群的成员列表（按群全量拉取，作为前端本地成员 cache 的完整基线） | `CommonResult<List<ImGroupMemberRespVO>>` | `@RequestParam("groupId") Long groupId` |

### 📦 `ImGroupRequestController` (管理后台 - IM 加群申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/group-request/apply` | 申请加群 | `CommonResult<Long>` | `@Valid @RequestBody ImGroupRequestApplyReqVO reqVO` |
| `PUT` | `/im/group-request/agree` | 同意加群申请（群主或管理员） | `CommonResult<Boolean>` | `@RequestParam("id") @NotNull(message = "申请编号不能为空") Long id` |
| `PUT` | `/im/group-request/refuse` | 拒绝加群申请（群主或管理员） | `CommonResult<Boolean>` | `@RequestParam("id") @NotNull(message = "申请编号不能为空") Long id, @RequestParam(value = "handleContent", required = false) @Size(max = 255, message = "处理理由最多 255 个字符") String handleContent` |
| `GET` | `/im/group-request/unhandled-list` | 查询「我管理的所有群」下的未处理加群申请列表（不分页）；前端 store 据此派生横幅红点 + Drawer 列表 | `CommonResult<List<ImGroupRequestRespVO>>` | `-` |
| `GET` | `/im/group-request/pull` | 增量拉取「我管理的群」下的加群申请（重连 / 离线补偿） | `CommonResult<List<ImGroupRequestRespVO>>` | `@RequestParam(value = "lastUpdateTime", required = false) Long lastUpdateTime, @RequestParam(value = "lastId", required = false) Long lastId, @RequestParam("limit") @Min(1) @Max(200) Integer limit` |
| `GET` | `/im/group-request/list-by-group` | 查询指定群下的全部加群申请（含已处理）；仅群主 / 管理员可查 | `CommonResult<List<ImGroupRequestRespVO>>` | `@RequestParam("groupId") @NotNull(message = "群编号不能为空") Long groupId` |
| `GET` | `/im/group-request/get` | 按 id 单查申请记录（带越权过滤；WebSocket 通知到达后用） | `CommonResult<ImGroupRequestRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ImChannelManagerController` (管理后台 - IM 频道)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/manager/channel/create` | 新增频道 | `CommonResult<Long>` | `@Valid @RequestBody ImChannelSaveReqVO reqVO` |
| `PUT` | `/im/manager/channel/update` | 修改频道 | `CommonResult<Boolean>` | `@Valid @RequestBody ImChannelSaveReqVO reqVO` |
| `DELETE` | `/im/manager/channel/delete` | 删除频道 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/im/manager/channel/page` | 获得频道分页 | `CommonResult<PageResult<ImChannelRespVO>>` | `@Valid ImChannelPageReqVO pageReqVO` |
| `GET` | `/im/manager/channel/get` | 获得频道详情 | `CommonResult<ImChannelRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/im/manager/channel/simple-list` | 获得启用的频道精简列表；前端表单选择频道时调用 | `CommonResult<List<ImChannelRespVO>>` | `-` |

### 📦 `ImChannelMaterialManagerController` (管理后台 - IM 频道素材)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/manager/channel-material/create` | 新增素材 | `CommonResult<Long>` | `@Valid @RequestBody ImChannelMaterialSaveReqVO reqVO` |
| `PUT` | `/im/manager/channel-material/update` | 修改素材 | `CommonResult<Boolean>` | `@Valid @RequestBody ImChannelMaterialSaveReqVO reqVO` |
| `DELETE` | `/im/manager/channel-material/delete` | 删除素材 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/im/manager/channel-material/page` | 获得素材分页；含频道名回填 | `CommonResult<PageResult<ImChannelMaterialRespVO>>` | `@Valid ImChannelMaterialPageReqVO pageReqVO` |
| `GET` | `/im/manager/channel-material/get` | 获得素材详情（含富文本正文） | `CommonResult<ImChannelMaterialRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/im/manager/channel-material/simple-list` | 获得指定频道下的素材精简列表；用于推送弹窗的素材下拉 | `CommonResult<List<ImChannelMaterialRespVO>>` | `@RequestParam("channelId") Long channelId` |

### 📦 `ImFacePackItemManagerController` (管理后台 - IM 表情包项)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/manager/face-pack-item/create` | 新增表情 | `CommonResult<Long>` | `@Valid @RequestBody ImFacePackItemSaveReqVO reqVO` |
| `PUT` | `/im/manager/face-pack-item/update` | 修改表情 | `CommonResult<Boolean>` | `@Valid @RequestBody ImFacePackItemSaveReqVO reqVO` |
| `DELETE` | `/im/manager/face-pack-item/delete` | 删除表情 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/im/manager/face-pack-item/delete-list` | 批量删除表情 | `CommonResult<Boolean>` | `@RequestParam("ids") @Size(max = 100, message = "批量删除最多 100 条") List<Long> ids` |
| `GET` | `/im/manager/face-pack-item/page` | 获得表情分页 | `CommonResult<PageResult<ImFacePackItemRespVO>>` | `@Valid ImFacePackItemPageReqVO pageReqVO` |
| `GET` | `/im/manager/face-pack-item/get` | 获得表情详情 | `CommonResult<ImFacePackItemRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ImFacePackManagerController` (管理后台 - IM 表情包)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/manager/face-pack/create` | 新增表情包 | `CommonResult<Long>` | `@Valid @RequestBody ImFacePackSaveReqVO reqVO` |
| `PUT` | `/im/manager/face-pack/update` | 修改表情包 | `CommonResult<Boolean>` | `@Valid @RequestBody ImFacePackSaveReqVO reqVO` |
| `DELETE` | `/im/manager/face-pack/delete` | 删除表情包 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/im/manager/face-pack/delete-list` | 批量删除表情包 | `CommonResult<Boolean>` | `@RequestParam("ids") @Size(max = 100, message = "批量删除最多 100 条") List<Long> ids` |
| `GET` | `/im/manager/face-pack/page` | 获得表情包分页 | `CommonResult<PageResult<ImFacePackRespVO>>` | `@Valid ImFacePackPageReqVO pageReqVO` |
| `GET` | `/im/manager/face-pack/get` | 获得表情包详情 | `CommonResult<ImFacePackRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ImFaceUserItemManagerController` (管理后台 - IM 用户表情)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/face-user-item/page` | 获得用户表情分页 | `CommonResult<PageResult<ImFaceUserItemManagerRespVO>>` | `@Valid ImFaceUserItemManagerPageReqVO pageReqVO` |
| `DELETE` | `/im/manager/face-user-item/delete` | 删除用户表情 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `ImFriendManagerController` (管理后台 - IM 好友管理)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/friend/page` | 获得好友关系分页 | `CommonResult<PageResult<ImFriendManagerRespVO>>` | `@Valid ImFriendManagerPageReqVO pageReqVO` |

### 📦 `ImFriendRequestManagerController` (管理后台 - IM 好友申请管理)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/friend-request/page` | 获得好友申请分页 | `CommonResult<PageResult<ImFriendRequestManagerRespVO>>` | `@Valid ImFriendRequestManagerPageReqVO pageReqVO` |

### 📦 `ImGroupManagerController` (管理后台 - IM 群聊管理)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/group/page` | 获得群分页 | `CommonResult<PageResult<ImGroupManagerRespVO>>` | `@Valid ImGroupManagerPageReqVO pageReqVO` |
| `GET` | `/im/manager/group/get` | 获得群详情 | `CommonResult<ImGroupManagerRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/im/manager/group/ban` | 封禁群 | `CommonResult<Boolean>` | `@Valid @RequestBody ImGroupManagerBanReqVO reqVO` |
| `PUT` | `/im/manager/group/unban` | 解封群 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/im/manager/group/dissolve` | 解散群 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `ImGroupMemberManagerController` (管理后台 - IM 群成员管理)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/group/member/list` | 获得群成员列表（含已退群成员，由前端按需过滤） | `CommonResult<List<ImGroupMemberManagerRespVO>>` | `@RequestParam("groupId") Long groupId` |

### 📦 `ImGroupRequestManagerController` (管理后台 - IM 加群申请管理)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/group-request/page` | 获得加群申请分页 | `CommonResult<PageResult<ImGroupRequestManagerRespVO>>` | `@Valid ImGroupRequestManagerPageReqVO pageReqVO` |

### 📦 `ImChannelMessageManagerController` (管理后台 - IM 频道消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/manager/channel-message/send` | 立即推送频道消息 | `CommonResult<Long>` | `@Valid @RequestBody ImChannelMessageSendReqVO reqVO` |
| `DELETE` | `/im/manager/channel-message/delete` | 删除频道消息 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/im/manager/channel-message/page` | 获得频道消息分页；回填频道名 / 素材标题 | `CommonResult<PageResult<ImChannelMessageRespVO>>` | `@Valid ImChannelMessagePageReqVO pageReqVO` |
| `GET` | `/im/manager/channel-message/get` | 获得频道消息详情 | `CommonResult<ImChannelMessageRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ImGroupMessageManagerController` (管理后台 - IM 群聊消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/message/group/page` | 获得群聊消息分页 | `CommonResult<PageResult<ImGroupMessageManagerRespVO>>` | `@Valid ImGroupMessageManagerPageReqVO pageReqVO` |
| `GET` | `/im/manager/message/group/get` | 获得群聊消息详情 | `CommonResult<ImGroupMessageManagerRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ImPrivateMessageManagerController` (管理后台 - IM 私聊消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/message/private/page` | 获得私聊消息分页 | `CommonResult<PageResult<ImPrivateMessageManagerRespVO>>` | `@Valid ImPrivateMessageManagerPageReqVO pageReqVO` |
| `GET` | `/im/manager/message/private/get` | 获得私聊消息详情 | `CommonResult<ImPrivateMessageManagerRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ImRtcCallManagerController` (管理后台 - IM 通话记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/rtc/page` | 获得通话记录分页 | `CommonResult<PageResult<ImRtcCallManagerRespVO>>` | `@Valid ImRtcCallManagerPageReqVO pageReqVO` |
| `GET` | `/im/manager/rtc/get` | 获得通话记录详情 | `CommonResult<ImRtcCallManagerRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/im/manager/rtc/participant-list` | 获得通话参与者列表 | `CommonResult<List<ImRtcParticipantManagerRespVO>>` | `@RequestParam("id") Long id` |

### 📦 `ImSensitiveWordManagerController` (管理后台 - IM 敏感词)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/manager/sensitive-word/create` | 新增敏感词 | `CommonResult<Long>` | `@Valid @RequestBody ImSensitiveWordSaveReqVO reqVO` |
| `PUT` | `/im/manager/sensitive-word/update` | 修改敏感词 | `CommonResult<Boolean>` | `@Valid @RequestBody ImSensitiveWordSaveReqVO reqVO` |
| `DELETE` | `/im/manager/sensitive-word/delete` | 删除敏感词 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/im/manager/sensitive-word/delete-list` | 批量删除敏感词 | `CommonResult<Boolean>` | `@RequestParam("ids") @Size(max = 100, message = "批量删除最多 100 条") List<Long> ids` |
| `GET` | `/im/manager/sensitive-word/page` | 获得敏感词分页 | `CommonResult<PageResult<ImSensitiveWordRespVO>>` | `@Valid ImSensitiveWordPageReqVO pageReqVO` |
| `GET` | `/im/manager/sensitive-word/get` | 获得敏感词详情 | `CommonResult<ImSensitiveWordRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ImStatisticsManagerController` (管理后台 - IM 数据看板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/manager/statistics/overview` | 获得数据概览 | `CommonResult<ImStatisticsManagerOverviewRespVO>` | `-` |
| `GET` | `/im/manager/statistics/message-trend` | 获得消息趋势（私聊 / 群聊双线） | `CommonResult<ImStatisticsManagerTrendRespVO>` | `@RequestParam(value = "days", defaultValue = "7") @Min(1) @Max(90) int days` |
| `GET` | `/im/manager/statistics/user-trend` | 获得用户趋势（新增注册 / 日活双线） | `CommonResult<ImStatisticsManagerTrendRespVO>` | `@RequestParam(value = "days", defaultValue = "7") @Min(1) @Max(90) int days` |
| `GET` | `/im/manager/statistics/message-type-distribution` | 获得内容类型分布（最近 30 天） | `CommonResult<List<ImStatisticsManagerMessageTypeRespVO>>` | `-` |
| `GET` | `/im/manager/statistics/group-size-distribution` | 获得群规模分布 | `CommonResult<List<ImStatisticsManagerGroupSizeRespVO>>` | `-` |
| `GET` | `/im/manager/statistics/top-senders` | 获得消息 TOP 发送者（最近 30 天） | `CommonResult<List<ImStatisticsManagerTopSenderRespVO>>` | `-` |

### 📦 `ImChannelMessageController` (用户 APP - IM 频道消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/im/channel/message/pull` | 拉取频道消息（离线增量）；按 minId 游标分页 | `CommonResult<List<ImChannelMessagePullRespVO>>` | `@RequestParam(value = "minId", defaultValue = "0") @PositiveOrZero(message = "minId 不能小于 0") Long minId, @RequestParam(value = "size", defaultValue = "100") @Min(value = 1, message = "size 必须大于 0") @Max(value = 200, message = "size 一次最多 200 条") Integer size` |
| `PUT` | `/im/channel/message/read` | 标记频道消息已读 | `CommonResult<Boolean>` | `@RequestParam("channelId") Long channelId, @RequestParam("messageId") Long messageId` |

### 📦 `ImGroupMessageController` (管理后台 - IM 群聊消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/message/group/send` | 发送群聊消息 | `CommonResult<ImGroupMessageRespVO>` | `@Valid @RequestBody ImGroupMessageSendReqVO reqVO` |
| `GET` | `/im/message/group/pull` | 拉取群聊消息（增量） | `CommonResult<List<ImGroupMessageRespVO>>` | `@RequestParam("minId") Long minId, @RequestParam("size") @Min(value = 1, message = "拉取数量最小值为 1") Integer size` |
| `PUT` | `/im/message/group/read` | 标记群聊消息已读 | `CommonResult<Boolean>` | `@RequestParam("groupId") Long groupId, @RequestParam("messageId") Long messageId` |
| `DELETE` | `/im/message/group/recall` | 撤回群聊消息 | `CommonResult<ImGroupMessageRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/im/message/group/get-read-user-ids` | 获取群消息已读用户列表 | `CommonResult<List<Long>>` | `@RequestParam("groupId") Long groupId, @RequestParam("messageId") Long messageId` |
| `GET` | `/im/message/group/list` | 查询群聊历史消息 | `CommonResult<List<ImGroupMessageRespVO>>` | `@Valid ImGroupMessageListReqVO reqVO` |

### 📦 `ImPrivateMessageController` (管理后台 - IM 私聊消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/message/private/send` | 发送私聊消息 | `CommonResult<ImPrivateMessageRespVO>` | `@Valid @RequestBody ImPrivateMessageSendReqVO reqVO` |
| `GET` | `/im/message/private/pull` | 拉取私聊消息（增量） | `CommonResult<List<ImPrivateMessageRespVO>>` | `@RequestParam("minId") Long minId, @RequestParam("size") @Min(value = 1, message = "拉取数量最小值为 1") Integer size` |
| `PUT` | `/im/message/private/read` | 标记私聊消息已读 | `CommonResult<Boolean>` | `@RequestParam("receiverId") Long receiverId, @RequestParam("messageId") Long messageId` |
| `GET` | `/im/message/private/max-read-message-id` | 查询对方已读到我发的最大消息 id | `CommonResult<Long>` | `@RequestParam("peerId") Long peerId` |
| `DELETE` | `/im/message/private/recall` | 撤回私聊消息 | `CommonResult<ImPrivateMessageRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/im/message/private/list` | 查询私聊历史消息 | `CommonResult<List<ImPrivateMessageRespVO>>` | `@Valid ImPrivateMessageListReqVO reqVO` |

### 📦 `ImRtcCallController` (管理后台 - IM 实时通话)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/rtc/create` | 创建新通话；按 conversationType 区分私聊 / 群聊 | `CommonResult<ImRtcCallRespVO>` | `@Valid @RequestBody ImRtcCallCreateReqVO reqVO` |
| `POST` | `/im/rtc/invite` | 通话中追加邀请；仅群通话可用 | `CommonResult<Boolean>` | `@Valid @RequestBody ImRtcCallInviteReqVO reqVO` |
| `POST` | `/im/rtc/join` | 加入已有群通话；用于胶囊条「加入」按钮 | `CommonResult<ImRtcCallRespVO>` | `@RequestParam("room") String room` |
| `POST` | `/im/rtc/accept` | 接听通话 | `CommonResult<ImRtcCallRespVO>` | `@RequestParam("room") String room` |
| `POST` | `/im/rtc/reject` | 拒绝通话 | `CommonResult<Boolean>` | `@RequestParam("room") String room` |
| `POST` | `/im/rtc/cancel` | 取消邀请；主叫接通前调用 | `CommonResult<Boolean>` | `@RequestParam("room") String room` |
| `POST` | `/im/rtc/leave` | 离开通话；接通后调用 | `CommonResult<Boolean>` | `@RequestParam("room") String room` |
| `POST` | `/im/rtc/no-answer-call-check` | 前端 RUNNING 端 timer 兜底；触发后端立即扫描该 room 的振铃超时（接口静默） | `CommonResult<Boolean>` | `@RequestParam("room") String room` |
| `GET` | `/im/rtc/get-active-call` | 查询当前进行中的通话；用于群聊顶部「N 人正在通话」胶囊条 | `CommonResult<ImRtcGroupCallRespVO>` | `@RequestParam("groupId") Long groupId` |

### 📦 `ImRtcLiveKitController` (LiveKit Webhook 回调)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/im/livekit/webhook` | LiveKit Webhook 回调；接收成员离开 / 房间结束等事件做业务态兜底清理 | `CommonResult<Boolean>` | `HttpServletRequest request, @RequestBody String rawBody` |

### 📦 `CodegenController` (管理后台 - 代码生成器)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/infra/codegen/db/table/list` | 获得数据库自带的表定义列表 | `CommonResult<List<DatabaseTableRespVO>>` | `@RequestParam(value = "dataSourceConfigId") Long dataSourceConfigId, @RequestParam(value = "name", required = false) String name, @RequestParam(value = "comment", required = false) String comment` |
| `GET` | `/infra/codegen/table/list` | 获得表定义列表 | `CommonResult<List<CodegenTableRespVO>>` | `@RequestParam(value = "dataSourceConfigId") Long dataSourceConfigId` |
| `GET` | `/infra/codegen/table/page` | 获得表定义分页 | `CommonResult<PageResult<CodegenTableRespVO>>` | `@Valid CodegenTablePageReqVO pageReqVO` |
| `GET` | `/infra/codegen/detail` | 获得表和字段的明细 | `CommonResult<CodegenDetailRespVO>` | `@RequestParam("tableId") Long tableId` |
| `POST` | `/infra/codegen/create-list` | - | `CommonResult<List<Long>>` | `@Valid @RequestBody CodegenCreateListReqVO reqVO` |
| `PUT` | `/infra/codegen/update` | - | `CommonResult<Boolean>` | `@Valid @RequestBody CodegenUpdateReqVO updateReqVO` |
| `PUT` | `/infra/codegen/sync-from-db` | - | `CommonResult<Boolean>` | `@RequestParam("tableId") Long tableId` |
| `DELETE` | `/infra/codegen/delete` | - | `CommonResult<Boolean>` | `@RequestParam("tableId") Long tableId` |
| `DELETE` | `/infra/codegen/delete-list` | - | `CommonResult<Boolean>` | `@RequestParam("tableIds") List<Long> tableIds` |
| `GET` | `/infra/codegen/preview` | - | `CommonResult<List<CodegenPreviewRespVO>>` | `@RequestParam("tableId") Long tableId` |

### 📦 `ConfigController` (管理后台 - 参数配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/config/create` | 创建参数配置 | `CommonResult<Long>` | `@Valid @RequestBody ConfigSaveReqVO createReqVO` |
| `PUT` | `/infra/config/update` | 修改参数配置 | `CommonResult<Boolean>` | `@Valid @RequestBody ConfigSaveReqVO updateReqVO` |
| `DELETE` | `/infra/config/delete` | 删除参数配置 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/config/delete-list` | 批量删除参数配置 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/infra/config` | 获得参数配置 | `CommonResult<ConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/config` | 根据参数键名查询参数值 | `CommonResult<String>` | `@RequestParam("key") String key` |
| `GET` | `/infra/config/page` | 获取参数配置分页 | `CommonResult<PageResult<ConfigRespVO>>` | `@Valid ConfigPageReqVO pageReqVO` |

### 📦 `DataSourceConfigController` (管理后台 - 数据源配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/data-source-config/create` | 创建数据源配置 | `CommonResult<Long>` | `@Valid @RequestBody DataSourceConfigSaveReqVO createReqVO` |
| `PUT` | `/infra/data-source-config/update` | 更新数据源配置 | `CommonResult<Boolean>` | `@Valid @RequestBody DataSourceConfigSaveReqVO updateReqVO` |
| `DELETE` | `/infra/data-source-config/delete` | 删除数据源配置 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/data-source-config/delete-list` | 批量删除数据源配置 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/infra/data-source-config/get` | 获得数据源配置 | `CommonResult<DataSourceConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/data-source-config/list` | 获得数据源配置列表 | `CommonResult<List<DataSourceConfigRespVO>>` | `-` |

### 📦 `Demo01ContactController` (管理后台 - 示例联系人)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/demo01-contact/create` | 创建示例联系人 | `CommonResult<Long>` | `@Valid @RequestBody Demo01ContactSaveReqVO createReqVO` |
| `PUT` | `/infra/demo01-contact/update` | 更新示例联系人 | `CommonResult<Boolean>` | `@Valid @RequestBody Demo01ContactSaveReqVO updateReqVO` |
| `DELETE` | `/infra/demo01-contact/delete` | 删除示例联系人 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/demo01-contact/delete-list` | 批量删除示例联系人 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/infra/demo01-contact/get` | 获得示例联系人 | `CommonResult<Demo01ContactRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/demo01-contact/page` | 获得示例联系人分页 | `CommonResult<PageResult<Demo01ContactRespVO>>` | `@Valid Demo01ContactPageReqVO pageReqVO` |

### 📦 `Demo02CategoryController` (管理后台 - 示例分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/demo02-category/create` | 创建示例分类 | `CommonResult<Long>` | `@Valid @RequestBody Demo02CategorySaveReqVO createReqVO` |
| `PUT` | `/infra/demo02-category/update` | 更新示例分类 | `CommonResult<Boolean>` | `@Valid @RequestBody Demo02CategorySaveReqVO updateReqVO` |
| `DELETE` | `/infra/demo02-category/delete` | 删除示例分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/demo02-category/get` | 获得示例分类 | `CommonResult<Demo02CategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/demo02-category/list` | 获得示例分类列表 | `CommonResult<List<Demo02CategoryRespVO>>` | `@Valid Demo02CategoryListReqVO listReqVO` |

### 📦 `Demo03StudentErpController` (管理后台 - 学生)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/demo03-student-erp/create` | 创建学生 | `CommonResult<Long>` | `@Valid @RequestBody Demo03StudentErpSaveReqVO createReqVO` |
| `PUT` | `/infra/demo03-student-erp/update` | 更新学生 | `CommonResult<Boolean>` | `@Valid @RequestBody Demo03StudentErpSaveReqVO updateReqVO` |
| `DELETE` | `/infra/demo03-student-erp/delete` | 删除学生 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/demo03-student-erp/delete-list` | 批量删除学生 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/infra/demo03-student-erp/get` | 获得学生 | `CommonResult<Demo03StudentErpRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/demo03-student-erp/page` | 获得学生分页 | `CommonResult<PageResult<Demo03StudentErpRespVO>>` | `@Valid Demo03StudentErpPageReqVO pageReqVO` |
| `GET` | `/infra/demo03-student-erp/export-excel` | 导出学生 Excel | `void` | `@Valid Demo03StudentErpPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<Demo03StudentDO> list = demo03StudentErpService.getDemo03StudentPage(pageReqVO).getList(); // 导出 Excel ExcelUtils.write(response, "学生.xls", "数据", Demo03StudentErpRespVO.class, BeanUtils.toBean(list, Demo03StudentErpRespVO.class)); } // ==================== 子表（学生课程） ==================== @GetMapping("/demo03-course/page") @Operation(summary = "获得学生课程分页") @Parameter(name = "studentId", description = "学生编号") @PreAuthorize("@ss.hasPermission('infra:demo03-student:query')") public CommonResult<PageResult<Demo03CourseDO>> getDemo03CoursePage(PageParam pageReqVO, @RequestParam("studentId") Long studentId` |
| `POST` | `/infra/demo03-student-erp/demo03-course/create` | 创建学生课程 | `CommonResult<Long>` | `@Valid @RequestBody Demo03CourseDO demo03Course` |
| `PUT` | `/infra/demo03-student-erp/demo03-course/update` | 更新学生课程 | `CommonResult<Boolean>` | `@Valid @RequestBody Demo03CourseDO demo03Course` |
| `DELETE` | `/infra/demo03-student-erp/demo03-course/delete` | 删除学生课程 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/demo03-student-erp/demo03-course/delete-list` | 批量删除学生课程 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/infra/demo03-student-erp/demo03-course/get` | 获得学生课程 | `CommonResult<Demo03CourseDO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/demo03-student-erp/demo03-grade/page` | 获得学生班级分页 | `CommonResult<PageResult<Demo03GradeDO>>` | `PageParam pageReqVO, @RequestParam("studentId") Long studentId` |
| `POST` | `/infra/demo03-student-erp/demo03-grade/create` | 创建学生班级 | `CommonResult<Long>` | `@Valid @RequestBody Demo03GradeDO demo03Grade` |
| `PUT` | `/infra/demo03-student-erp/demo03-grade/update` | 更新学生班级 | `CommonResult<Boolean>` | `@Valid @RequestBody Demo03GradeDO demo03Grade` |
| `DELETE` | `/infra/demo03-student-erp/demo03-grade/delete` | 删除学生班级 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/demo03-student-erp/demo03-grade/delete-list` | 批量删除学生班级 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/infra/demo03-student-erp/demo03-grade/get` | 获得学生班级 | `CommonResult<Demo03GradeDO>` | `@RequestParam("id") Long id` |

### 📦 `Demo03StudentInnerController` (管理后台 - 学生)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/demo03-student-inner/create` | 创建学生 | `CommonResult<Long>` | `@Valid @RequestBody Demo03StudentInnerSaveReqVO createReqVO` |
| `PUT` | `/infra/demo03-student-inner/update` | 更新学生 | `CommonResult<Boolean>` | `@Valid @RequestBody Demo03StudentInnerSaveReqVO updateReqVO` |
| `DELETE` | `/infra/demo03-student-inner/delete` | 删除学生 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/demo03-student-inner/delete-list` | 批量删除学生 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/infra/demo03-student-inner/get` | 获得学生 | `CommonResult<Demo03StudentInnerRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/demo03-student-inner/page` | 获得学生分页 | `CommonResult<PageResult<Demo03StudentInnerRespVO>>` | `@Valid Demo03StudentInnerPageReqVO pageReqVO` |
| `GET` | `/infra/demo03-student-inner/export-excel` | 导出学生 Excel | `void` | `@Valid Demo03StudentInnerPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<Demo03StudentDO> list = demo03StudentInnerService.getDemo03StudentPage(pageReqVO).getList(); // 导出 Excel ExcelUtils.write(response, "学生.xls", "数据", Demo03StudentInnerRespVO.class, BeanUtils.toBean(list, Demo03StudentInnerRespVO.class)); } // ==================== 子表（学生课程） ==================== @GetMapping("/demo03-course/list-by-student-id") @Operation(summary = "获得学生课程列表") @Parameter(name = "studentId", description = "学生编号") @PreAuthorize("@ss.hasPermission('infra:demo03-student:query')") public CommonResult<List<Demo03CourseDO>> getDemo03CourseListByStudentId(@RequestParam("studentId") Long studentId` |
| `GET` | `/infra/demo03-student-inner/demo03-grade/get-by-student-id` | 获得学生班级 | `CommonResult<Demo03GradeDO>` | `@RequestParam("studentId") Long studentId` |

### 📦 `Demo03StudentNormalController` (管理后台 - 学生)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/demo03-student-normal/create` | 创建学生 | `CommonResult<Long>` | `@Valid @RequestBody Demo03StudentNormalSaveReqVO createReqVO` |
| `PUT` | `/infra/demo03-student-normal/update` | 更新学生 | `CommonResult<Boolean>` | `@Valid @RequestBody Demo03StudentNormalSaveReqVO updateReqVO` |
| `DELETE` | `/infra/demo03-student-normal/delete` | 删除学生 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/demo03-student-normal/delete-list` | 批量删除学生 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/infra/demo03-student-normal/get` | 获得学生 | `CommonResult<Demo03StudentNormalRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/demo03-student-normal/page` | 获得学生分页 | `CommonResult<PageResult<Demo03StudentNormalRespVO>>` | `@Valid Demo03StudentNormalPageReqVO pageReqVO` |
| `GET` | `/infra/demo03-student-normal/export-excel` | 导出学生 Excel | `void` | `@Valid Demo03StudentNormalPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<Demo03StudentDO> list = demo03StudentNormalService.getDemo03StudentPage(pageReqVO).getList(); // 导出 Excel ExcelUtils.write(response, "学生.xls", "数据", Demo03StudentNormalRespVO.class, BeanUtils.toBean(list, Demo03StudentNormalRespVO.class)); } // ==================== 子表（学生课程） ==================== @GetMapping("/demo03-course/list-by-student-id") @Operation(summary = "获得学生课程列表") @Parameter(name = "studentId", description = "学生编号") @PreAuthorize("@ss.hasPermission('infra:demo03-student:query')") public CommonResult<List<Demo03CourseDO>> getDemo03CourseListByStudentId(@RequestParam("studentId") Long studentId` |
| `GET` | `/infra/demo03-student-normal/demo03-grade/get-by-student-id` | 获得学生班级 | `CommonResult<Demo03GradeDO>` | `@RequestParam("studentId") Long studentId` |

### 📦 `FileConfigController` (管理后台 - 文件配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/file-config/create` | 创建文件配置 | `CommonResult<Long>` | `@Valid @RequestBody FileConfigSaveReqVO createReqVO` |
| `PUT` | `/infra/file-config/update` | 更新文件配置 | `CommonResult<Boolean>` | `@Valid @RequestBody FileConfigSaveReqVO updateReqVO` |
| `PUT` | `/infra/file-config/update-master` | 更新文件配置为 Master | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/file-config/delete` | 删除文件配置 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/file-config/delete-list` | 批量删除文件配置 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/infra/file-config/get` | 获得文件配置 | `CommonResult<FileConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/file-config/page` | 获得文件配置分页 | `CommonResult<PageResult<FileConfigRespVO>>` | `@Valid FileConfigPageReqVO pageVO` |

### 📦 `FileController` (管理后台 - 文件存储)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/file/upload` | 上传文件 | `CommonResult<String>` | `@Valid FileUploadReqVO uploadReqVO) throws Exception { MultipartFile file = uploadReqVO.getFile(); byte[] content = IoUtil.readBytes(file.getInputStream()); return success(fileService.createFile(content, file.getOriginalFilename(), uploadReqVO.getDirectory(), file.getContentType())); } @GetMapping("/presigned-url") @Operation(summary = "获取文件预签名地址（上传）", description = "模式二：前端上传文件：用于前端直接上传七牛、阿里云 OSS 等文件存储器") @Parameters({ @Parameter(name = "name", description = "文件名称", required = true), @Parameter(name = "directory", description = "文件目录") }) public CommonResult<FilePresignedUrlRespVO> getFilePresignedUrl( @RequestParam("name") String name, @RequestParam(value = "directory", required = false) String directory` |
| `POST` | `/infra/file/create` | 创建文件 | `CommonResult<Long>` | `@Valid @RequestBody FileCreateReqVO createReqVO` |
| `GET` | `/infra/file/get` | 获得文件 | `CommonResult<FileRespVO>` | `@RequestParam("id") Long id` |
| `DELETE` | `/infra/file/delete` | 删除文件 | `CommonResult<Boolean>` | `@RequestParam("id") Long id) throws Exception { fileService.deleteFile(id); return success(true); } @DeleteMapping("/delete-list") @Operation(summary = "批量删除文件") @Parameter(name = "ids", description = "编号列表", required = true) @PreAuthorize("@ss.hasPermission('infra:file:delete')") public CommonResult<Boolean> deleteFileList(@RequestParam("ids") List<Long> ids) throws Exception { fileService.deleteFileList(ids); return success(true); } @GetMapping("/{configId}/get/**") @PermitAll @TenantIgnore @Operation(summary = "下载文件") @Parameter(name = "configId", description = "配置编号", required = true) public void getFileContent(HttpServletRequest request, HttpServletResponse response, @PathVariable("configId") Long configId) throws Exception { // 获取请求的路径 String path = StrUtil.subAfter(request.getRequestURI(), "/get/", false); if (StrUtil.isEmpty(path)` |
| `GET` | `/infra/file/page` | 获得文件分页 | `CommonResult<PageResult<FileRespVO>>` | `@Valid FilePageReqVO pageVO` |

### 📦 `ApiAccessLogController` (管理后台 - API 访问日志)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/infra/api-access-log/get` | 获得 API 访问日志 | `CommonResult<ApiAccessLogRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/api-access-log/page` | 获得API 访问日志分页 | `CommonResult<PageResult<ApiAccessLogRespVO>>` | `@Valid ApiAccessLogPageReqVO pageReqVO` |

### 📦 `ApiErrorLogController` (管理后台 - API 错误日志)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `PUT` | `/infra/api-error-log/update-status` | 更新 API 错误日志的状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("processStatus") Integer processStatus` |
| `GET` | `/infra/api-error-log/get` | 获得 API 错误日志 | `CommonResult<ApiErrorLogRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/infra/api-error-log/page` | 获得 API 错误日志分页 | `CommonResult<PageResult<ApiErrorLogRespVO>>` | `@Valid ApiErrorLogPageReqVO pageReqVO` |

### 📦 `RedisController` (管理后台 - Redis 监控)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/infra/redis/get-monitor-info` | 获得 Redis 监控信息 | `CommonResult<RedisMonitorRespVO>` | `-` |

### 📦 `AppFileController` (用户 App - 文件存储)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/infra/file/upload` | 上传文件 | `CommonResult<String>` | `@Valid AppFileUploadReqVO uploadReqVO) throws Exception { MultipartFile file = uploadReqVO.getFile(); byte[] content = IoUtil.readBytes(file.getInputStream()); return success(fileService.createFile(content, file.getOriginalFilename(), uploadReqVO.getDirectory(), file.getContentType())); } @GetMapping("/presigned-url") @Operation(summary = "获取文件预签名地址（上传）", description = "模式二：前端上传文件：用于前端直接上传七牛、阿里云 OSS 等文件存储器") @Parameters({ @Parameter(name = "name", description = "文件名称", required = true), @Parameter(name = "directory", description = "文件目录") }) public CommonResult<FilePresignedUrlRespVO> getFilePresignedUrl( @RequestParam("name") String name, @RequestParam(value = "directory", required = false) String directory` |
| `POST` | `/infra/file/create` | 创建文件 | `CommonResult<Long>` | `@Valid @RequestBody FileCreateReqVO createReqVO` |

### 📦 `IotAlertConfigController` (管理后台 - IoT 告警配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/alert-config/create` | 创建告警配置 | `CommonResult<Long>` | `@Valid @RequestBody IotAlertConfigSaveReqVO createReqVO` |
| `PUT` | `/iot/alert-config/update` | 更新告警配置 | `CommonResult<Boolean>` | `@Valid @RequestBody IotAlertConfigSaveReqVO updateReqVO` |
| `DELETE` | `/iot/alert-config/delete` | 删除告警配置 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/alert-config/get` | 获得告警配置 | `CommonResult<IotAlertConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/alert-config/page` | 获得告警配置分页 | `CommonResult<PageResult<IotAlertConfigRespVO>>` | `@Valid IotAlertConfigPageReqVO pageReqVO` |
| `GET` | `/iot/alert-config/simple-list` | 获得告警配置简单列表 | `CommonResult<List<IotAlertConfigRespVO>>` | `-` |

### 📦 `IotAlertRecordController` (管理后台 - IoT 告警记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/iot/alert-record/get` | 获得告警记录 | `CommonResult<IotAlertRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/alert-record/page` | 获得告警记录分页 | `CommonResult<PageResult<IotAlertRecordRespVO>>` | `@Valid IotAlertRecordPageReqVO pageReqVO` |
| `PUT` | `/iot/alert-record/process` | 处理告警记录 | `CommonResult<Boolean>` | `@Valid @RequestBody IotAlertRecordProcessReqVO processReqVO` |

### 📦 `IotDeviceController` (管理后台 - IoT 设备)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/device/create` | 创建设备 | `CommonResult<Long>` | `@Valid @RequestBody IotDeviceSaveReqVO createReqVO` |
| `PUT` | `/iot/device/update` | 更新设备 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDeviceSaveReqVO updateReqVO` |
| `PUT` | `/iot/device/bind-gateway` | 绑定子设备到网关 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDeviceBindGatewayReqVO reqVO` |
| `PUT` | `/iot/device/unbind-gateway` | 解绑子设备与网关 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDeviceUnbindGatewayReqVO reqVO` |
| `GET` | `/iot/device/sub-device-list` | 获取网关的子设备列表 | `CommonResult<List<IotDeviceRespVO>>` | `@RequestParam("gatewayId") Long gatewayId` |
| `GET` | `/iot/device/unbound-sub-device-page` | 获取未绑定网关的子设备分页 | `CommonResult<PageResult<IotDeviceRespVO>>` | `@Valid IotDevicePageReqVO pageReqVO` |
| `PUT` | `/iot/device/update-group` | 更新设备分组 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDeviceUpdateGroupReqVO updateReqVO` |
| `DELETE` | `/iot/device/delete` | 删除单个设备 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/iot/device/delete-list` | 删除多个设备 | `CommonResult<Boolean>` | `@RequestParam("ids") Collection<Long> ids` |
| `GET` | `/iot/device/get` | 获得设备 | `CommonResult<IotDeviceRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/device/page` | 获得设备分页 | `CommonResult<PageResult<IotDeviceRespVO>>` | `@Valid IotDevicePageReqVO pageReqVO` |
| `GET` | `/iot/device/export-excel` | 导出设备 Excel | `void` | `@Valid IotDevicePageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); CommonResult<PageResult<IotDeviceRespVO>> result = getDevicePage(exportReqVO); // 导出 Excel ExcelUtils.write(response, "设备.xls", "数据", IotDeviceRespVO.class, result.getData().getList()); } @GetMapping("/count") @Operation(summary = "获得设备数量") @Parameter(name = "productId", description = "产品编号", example = "1") @PreAuthorize("@ss.hasPermission('iot:device:query')") public CommonResult<Long> getDeviceCount(@RequestParam("productId") Long productId` |
| `GET` | `/iot/device/simple-list` | 获取设备的精简信息列表 | `CommonResult<List<IotDeviceRespVO>>` | `@RequestParam(value = "deviceType", required = false) Integer deviceType, @RequestParam(value = "productId", required = false) Long productId` |
| `GET` | `/iot/device/location-list` | 获取设备位置列表 | `CommonResult<List<IotDeviceRespVO>>` | `-` |
| `POST` | `/iot/device/import` | 导入设备 | `CommonResult<IotDeviceImportRespVO>` | `@RequestParam("file") MultipartFile file, @RequestParam(value = "updateSupport", required = false, defaultValue = "false") Boolean updateSupport) throws Exception { List<IotDeviceImportExcelVO> list = ExcelUtils.read(file, IotDeviceImportExcelVO.class); return success(deviceService.importDevice(list, updateSupport)); } @GetMapping("/get-import-template") @Operation(summary = "获得导入设备模板") public void importTemplate(HttpServletResponse response) throws IOException { // 手动创建导出 demo List<IotDeviceImportExcelVO> list = Arrays.asList( IotDeviceImportExcelVO.builder().deviceName("温度传感器001").parentDeviceName("gateway110") .productKey("1de24640dfe").groupNames("灰度分组,生产分组").build(), IotDeviceImportExcelVO.builder().deviceName("biubiu").productKey("YzvHxd4r67sT4s2B") .groupNames("").build()); // 输出 ExcelUtils.write(response, "设备导入模板.xls", "数据", IotDeviceImportExcelVO.class, list); } @GetMapping("/get-auth-info") @Operation(summary = "获得设备连接信息") @PreAuthorize("@ss.hasPermission('iot:device:auth-info')") public CommonResult<IotDeviceAuthInfoRespVO> getDeviceAuthInfo(@RequestParam("id") Long id` |
| `GET` | `/iot/device/list-by-product-key-and-names` | 通过产品标识和设备名称列表获取设备 | `CommonResult<List<IotDeviceRespVO>>` | `@Valid IotDeviceByProductKeyAndNamesReqVO reqVO` |

### 📦 `IotDeviceGroupController` (管理后台 - IoT 设备分组)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/device-group/create` | 创建设备分组 | `CommonResult<Long>` | `@Valid @RequestBody IotDeviceGroupSaveReqVO createReqVO` |
| `PUT` | `/iot/device-group/update` | 更新设备分组 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDeviceGroupSaveReqVO updateReqVO` |
| `DELETE` | `/iot/device-group/delete` | 删除设备分组 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/device-group/get` | 获得设备分组 | `CommonResult<IotDeviceGroupRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/device-group/page` | 获得设备分组分页 | `CommonResult<PageResult<IotDeviceGroupRespVO>>` | `@Valid IotDeviceGroupPageReqVO pageReqVO` |
| `GET` | `/iot/device-group/simple-list` | 获取设备分组的精简信息列表 | `CommonResult<List<IotDeviceGroupRespVO>>` | `-` |

### 📦 `IotDeviceMessageController` (管理后台 - IoT 设备消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/iot/device/message/page` | 获得设备消息分页 | `CommonResult<PageResult<IotDeviceMessageRespVO>>` | `@Valid IotDeviceMessagePageReqVO pageReqVO` |
| `GET` | `/iot/device/message/pair-page` | 获得设备消息对分页 | `CommonResult<PageResult<IotDeviceMessageRespPairVO>>` | `@Valid IotDeviceMessagePageReqVO pageReqVO` |
| `POST` | `/iot/device/message/send` | 发送消息 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDeviceMessageSendReqVO sendReqVO` |

### 📦 `IotDeviceModbusConfigController` (管理后台 - IoT 设备 Modbus 连接配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/device-modbus-config/save` | 保存设备 Modbus 连接配置 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDeviceModbusConfigSaveReqVO saveReqVO` |
| `GET` | `/iot/device-modbus-config/get` | 获得设备 Modbus 连接配置 | `CommonResult<IotDeviceModbusConfigRespVO>` | `@RequestParam(value = "id", required = false) Long id, @RequestParam(value = "deviceId", required = false) Long deviceId` |

### 📦 `IotDeviceModbusPointController` (管理后台 - IoT 设备 Modbus 点位配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/device-modbus-point/create` | 创建设备 Modbus 点位配置 | `CommonResult<Long>` | `@Valid @RequestBody IotDeviceModbusPointSaveReqVO createReqVO` |
| `PUT` | `/iot/device-modbus-point/update` | 更新设备 Modbus 点位配置 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDeviceModbusPointSaveReqVO updateReqVO` |
| `DELETE` | `/iot/device-modbus-point/delete` | 删除设备 Modbus 点位配置 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/device-modbus-point/get` | 获得设备 Modbus 点位配置 | `CommonResult<IotDeviceModbusPointRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/device-modbus-point/page` | 获得设备 Modbus 点位配置分页 | `CommonResult<PageResult<IotDeviceModbusPointRespVO>>` | `@Valid IotDeviceModbusPointPageReqVO pageReqVO` |

### 📦 `IotDevicePropertyController` (管理后台 - IoT 设备属性)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/iot/device/property/get-latest` | 获取设备属性最新属性 | `CommonResult<List<IotDevicePropertyDetailRespVO>>` | `@RequestParam("deviceId") Long deviceId` |
| `GET` | `/iot/device/property/history-list` | 获取设备属性历史数据列表 | `CommonResult<List<IotDevicePropertyRespVO>>` | `@Valid IotDevicePropertyHistoryListReqVO listReqVO` |

### 📦 `IotOtaFirmwareController` (管理后台 - IoT OTA 固件)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/ota/firmware/create` | 创建 OTA 固件 | `CommonResult<Long>` | `@Valid @RequestBody IotOtaFirmwareCreateReqVO createReqVO` |
| `PUT` | `/iot/ota/firmware/update` | 更新 OTA 固件 | `CommonResult<Boolean>` | `@Valid @RequestBody IotOtaFirmwareUpdateReqVO updateReqVO` |
| `DELETE` | `/iot/ota/firmware/delete` | 删除 OTA 固件 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/ota/firmware/get` | 获得 OTA 固件 | `CommonResult<IotOtaFirmwareRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/ota/firmware/page` | 获得 OTA 固件分页 | `CommonResult<PageResult<IotOtaFirmwareRespVO>>` | `@Valid IotOtaFirmwarePageReqVO pageReqVO` |

### 📦 `IotOtaTaskController` (管理后台 - IoT OTA 升级任务)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/ota/task/create` | 创建 OTA 升级任务 | `CommonResult<Long>` | `@Valid @RequestBody IotOtaTaskCreateReqVO createReqVO` |
| `POST` | `/iot/ota/task/cancel` | 取消 OTA 升级任务 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/ota/task/page` | 获得 OTA 升级任务分页 | `CommonResult<PageResult<IotOtaTaskRespVO>>` | `@Valid IotOtaTaskPageReqVO pageReqVO` |
| `GET` | `/iot/ota/task/get` | 获得 OTA 升级任务 | `CommonResult<IotOtaTaskRespVO>` | `@RequestParam("id") Long id` |

### 📦 `IotOtaTaskRecordController` (管理后台 - IoT OTA 升级任务记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/iot/ota/task/record/get-status-statistics` | 获得 OTA 升级记录状态统计 | `CommonResult<PageResult<IotOtaTaskRecordRespVO>>` | `@Valid IotOtaTaskRecordPageReqVO pageReqVO` |
| `GET` | `/iot/ota/task/record/get` | 获得 OTA 升级记录 | `CommonResult<IotOtaTaskRecordRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/iot/ota/task/record/cancel` | 取消 OTA 升级记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `IotProductCategoryController` (管理后台 - IoT 产品分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/product-category/create` | 创建产品分类 | `CommonResult<Long>` | `@Valid @RequestBody IotProductCategorySaveReqVO createReqVO` |
| `PUT` | `/iot/product-category/update` | 更新产品分类 | `CommonResult<Boolean>` | `@Valid @RequestBody IotProductCategorySaveReqVO updateReqVO` |
| `DELETE` | `/iot/product-category/delete` | 删除产品分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/product-category/get` | 获得产品分类 | `CommonResult<IotProductCategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/product-category/page` | 获得产品分类分页 | `CommonResult<PageResult<IotProductCategoryRespVO>>` | `@Valid IotProductCategoryPageReqVO pageReqVO` |
| `GET` | `/iot/product-category/simple-list` | 获得所有产品分类列表 | `CommonResult<List<IotProductCategoryRespVO>>` | `-` |

### 📦 `IotProductController` (管理后台 - IoT 产品)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/product/create` | 创建产品 | `CommonResult<Long>` | `@Valid @RequestBody IotProductSaveReqVO createReqVO` |
| `PUT` | `/iot/product/update` | 更新产品 | `CommonResult<Boolean>` | `@Valid @RequestBody IotProductSaveReqVO updateReqVO` |
| `PUT` | `/iot/product/update-status` | 更新产品状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/iot/product/delete` | 删除产品 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/product/get` | 获得产品 | `CommonResult<IotProductRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/product/get-by-key` | 通过 ProductKey 获得产品 | `CommonResult<IotProductRespVO>` | `@RequestParam("productKey") String productKey` |
| `GET` | `/iot/product/page` | 获得产品分页 | `CommonResult<PageResult<IotProductRespVO>>` | `@Valid IotProductPageReqVO pageReqVO` |
| `GET` | `/iot/product/export-excel` | 导出产品 Excel | `void` | `@Valid IotProductPageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); CommonResult<PageResult<IotProductRespVO>> result = getProductPage(exportReqVO); // 导出 Excel ExcelUtils.write(response, "产品.xls", "数据", IotProductRespVO.class, result.getData().getList()); } @PostMapping("/sync-property-table") @Operation(summary = "同步产品属性表结构到 TDengine") @PreAuthorize("@ss.hasPermission('iot:product:update')") public CommonResult<Boolean> syncProductPropertyTable(` |
| `GET` | `/iot/product/simple-list` | 获取产品的精简信息列表 | `CommonResult<List<IotProductRespVO>>` | `@RequestParam(value = "deviceType", required = false) Integer deviceType` |

### 📦 `IotDataRuleController` (管理后台 - IoT 数据流转规则)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/data-rule/create` | 创建数据流转规则 | `CommonResult<Long>` | `@Valid @RequestBody IotDataRuleSaveReqVO createReqVO` |
| `PUT` | `/iot/data-rule/update` | 更新数据流转规则 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDataRuleSaveReqVO updateReqVO` |
| `DELETE` | `/iot/data-rule/delete` | 删除数据流转规则 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/data-rule/get` | 获得数据流转规则 | `CommonResult<IotDataRuleRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/data-rule/page` | 获得数据流转规则分页 | `CommonResult<PageResult<IotDataRuleRespVO>>` | `@Valid IotDataRulePageReqVO pageReqVO` |

### 📦 `IotDataSinkController` (管理后台 - IoT 数据流转目的)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/data-sink/create` | 创建数据目的 | `CommonResult<Long>` | `@Valid @RequestBody IotDataSinkSaveReqVO createReqVO` |
| `PUT` | `/iot/data-sink/update` | 更新数据目的 | `CommonResult<Boolean>` | `@Valid @RequestBody IotDataSinkSaveReqVO updateReqVO` |
| `DELETE` | `/iot/data-sink/delete` | 删除数据目的 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/data-sink/get` | 获得数据目的 | `CommonResult<IotDataSinkRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/data-sink/page` | 获得数据目的分页 | `CommonResult<PageResult<IotDataSinkRespVO>>` | `@Valid IotDataSinkPageReqVO pageReqVO` |
| `GET` | `/iot/data-sink/simple-list` | 获取数据目的的精简信息列表 | `CommonResult<List<IotDataSinkRespVO>>` | `-` |

### 📦 `IotSceneRuleController` (管理后台 - IoT 场景联动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/scene-rule/create` | 创建场景联动 | `CommonResult<Long>` | `@Valid @RequestBody IotSceneRuleSaveReqVO createReqVO` |
| `PUT` | `/iot/scene-rule/update` | 更新场景联动 | `CommonResult<Boolean>` | `@Valid @RequestBody IotSceneRuleSaveReqVO updateReqVO` |
| `PUT` | `/iot/scene-rule/update-status` | 更新场景联动状态 | `CommonResult<Boolean>` | `@Valid @RequestBody IotSceneRuleUpdateStatusReqVO updateReqVO` |
| `DELETE` | `/iot/scene-rule/delete` | 删除场景联动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/scene-rule/get` | 获得场景联动 | `CommonResult<IotSceneRuleRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/scene-rule/page` | 获得场景联动分页 | `CommonResult<PageResult<IotSceneRuleRespVO>>` | `@Valid IotSceneRulePageReqVO pageReqVO` |
| `GET` | `/iot/scene-rule/simple-list` | 获取场景联动的精简信息列表 | `CommonResult<List<IotSceneRuleRespVO>>` | `-` |

### 📦 `IotStatisticsController` (管理后台 - IoT 数据统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/iot/statistics/get-summary` | 获取全局的数据统计 | `CommonResult<IotStatisticsSummaryRespVO>` | `-` |
| `GET` | `/iot/statistics/get-device-message-summary-by-date` | 获取设备消息的数据统计 | `CommonResult<List<IotStatisticsDeviceMessageSummaryByDateRespVO>>` | `@Valid IotStatisticsDeviceMessageReqVO reqVO` |

### 📦 `IotThingModelController` (管理后台 - IoT 产品物模型)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/iot/thing-model/create` | 创建产品物模型 | `CommonResult<Long>` | `@Valid @RequestBody IotThingModelSaveReqVO createReqVO` |
| `PUT` | `/iot/thing-model/update` | 更新产品物模型 | `CommonResult<Boolean>` | `@Valid @RequestBody IotThingModelSaveReqVO updateReqVO` |
| `DELETE` | `/iot/thing-model/delete` | 删除产品物模型 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/thing-model/get` | 获得产品物模型 | `CommonResult<IotThingModelRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/iot/thing-model/get-tsl` | 获得产品物模型 TSL | `CommonResult<IotThingModelTSLRespVO>` | `@RequestParam("productId") Long productId` |
| `GET` | `/iot/thing-model/list` | 获得产品物模型列表 | `CommonResult<List<IotThingModelRespVO>>` | `@Valid IotThingModelListReqVO reqVO` |
| `GET` | `/iot/thing-model/page` | 获得产品物模型分页 | `CommonResult<PageResult<IotThingModelRespVO>>` | `@Valid IotThingModelPageReqVO pageReqVO` |

### 📦 `ProductBrandController` (管理后台 - 商品品牌)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/product/brand/create` | 创建品牌 | `CommonResult<Long>` | `@Valid @RequestBody ProductBrandCreateReqVO createReqVO` |
| `PUT` | `/product/brand/update` | 更新品牌 | `CommonResult<Boolean>` | `@Valid @RequestBody ProductBrandUpdateReqVO updateReqVO` |
| `DELETE` | `/product/brand/delete` | 删除品牌 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/product/brand/get` | 获得品牌 | `CommonResult<ProductBrandRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/product/brand/list-all-simple` | 获取品牌精简信息列表 | `CommonResult<List<ProductBrandSimpleRespVO>>` | `-` |
| `GET` | `/product/brand/page` | 获得品牌分页 | `CommonResult<PageResult<ProductBrandRespVO>>` | `@Valid ProductBrandPageReqVO pageVO` |
| `GET` | `/product/brand/list` | 获得品牌列表 | `CommonResult<List<ProductBrandRespVO>>` | `@Valid ProductBrandListReqVO listVO` |

### 📦 `ProductCategoryController` (管理后台 - 商品分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/product/category/create` | 创建商品分类 | `CommonResult<Long>` | `@Valid @RequestBody ProductCategorySaveReqVO createReqVO` |
| `PUT` | `/product/category/update` | 更新商品分类 | `CommonResult<Boolean>` | `@Valid @RequestBody ProductCategorySaveReqVO updateReqVO` |
| `DELETE` | `/product/category/delete` | 删除商品分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/product/category/get` | 获得商品分类 | `CommonResult<ProductCategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/product/category/list` | 获得商品分类列表 | `CommonResult<List<ProductCategoryRespVO>>` | `@Valid ProductCategoryListReqVO listReqVO` |

### 📦 `ProductCommentController` (管理后台 - 商品评价)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/product/comment/page` | 获得商品评价分页 | `CommonResult<PageResult<ProductCommentRespVO>>` | `@Valid ProductCommentPageReqVO pageVO` |
| `GET` | `/product/comment/get` | 获得商品评价 | `CommonResult<ProductCommentRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/product/comment/update-visible` | 显示 / 隐藏评论 | `CommonResult<Boolean>` | `@Valid @RequestBody ProductCommentUpdateVisibleReqVO updateReqVO` |
| `PUT` | `/product/comment/reply` | 商家回复 | `CommonResult<Boolean>` | `@Valid @RequestBody ProductCommentReplyReqVO replyVO` |
| `POST` | `/product/comment/create` | 添加自评 | `CommonResult<Boolean>` | `@Valid @RequestBody ProductCommentCreateReqVO createReqVO` |

### 📦 `ProductFavoriteController` (管理后台 - 商品收藏)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/product/favorite/page` | 获得商品收藏分页 | `CommonResult<PageResult<ProductFavoriteRespVO>>` | `@Valid ProductFavoritePageReqVO pageVO` |

### 📦 `ProductBrowseHistoryController` (管理后台 - 商品浏览记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/product/browse-history/page` | 获得商品浏览记录分页 | `CommonResult<PageResult<ProductBrowseHistoryRespVO>>` | `@Valid ProductBrowseHistoryPageReqVO pageReqVO` |

### 📦 `ProductPropertyController` (管理后台 - 商品属性项)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/product/property/create` | 创建属性项 | `CommonResult<Long>` | `@Valid @RequestBody ProductPropertySaveReqVO createReqVO` |
| `PUT` | `/product/property/update` | 更新属性项 | `CommonResult<Boolean>` | `@Valid @RequestBody ProductPropertySaveReqVO updateReqVO` |
| `DELETE` | `/product/property/delete` | 删除属性项 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/product/property/get` | 获得属性项 | `CommonResult<ProductPropertyRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/product/property/page` | 获得属性项分页 | `CommonResult<PageResult<ProductPropertyRespVO>>` | `@Valid ProductPropertyPageReqVO pageVO` |
| `GET` | `/product/property/simple-list` | 获得属性项精简列表 | `CommonResult<List<ProductPropertyRespVO>>` | `-` |

### 📦 `ProductPropertyValueController` (管理后台 - 商品属性值)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/product/property/value/create` | 创建属性值 | `CommonResult<Long>` | `@Valid @RequestBody ProductPropertyValueSaveReqVO createReqVO` |
| `PUT` | `/product/property/value/update` | 更新属性值 | `CommonResult<Boolean>` | `@Valid @RequestBody ProductPropertyValueSaveReqVO updateReqVO` |
| `DELETE` | `/product/property/value/delete` | 删除属性值 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/product/property/value/get` | 获得属性值 | `CommonResult<ProductPropertyValueRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/product/property/value/page` | 获得属性值分页 | `CommonResult<PageResult<ProductPropertyValueRespVO>>` | `@Valid ProductPropertyValuePageReqVO pageVO` |
| `GET` | `/product/property/value/simple-list` | 获得属性值精简列表 | `CommonResult<List<ProductPropertyValueRespVO>>` | `@RequestParam("propertyId") Long propertyId` |

### 📦 `ProductSpuController` (管理后台 - 商品 SPU)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/product/spu/create` | 创建商品 SPU | `CommonResult<Long>` | `@Valid @RequestBody ProductSpuSaveReqVO createReqVO` |
| `PUT` | `/product/spu/update` | 更新商品 SPU | `CommonResult<Boolean>` | `@Valid @RequestBody ProductSpuSaveReqVO updateReqVO` |
| `PUT` | `/product/spu/update-status` | 更新商品 SPU Status | `CommonResult<Boolean>` | `@Valid @RequestBody ProductSpuUpdateStatusReqVO updateReqVO` |
| `DELETE` | `/product/spu/delete` | 删除商品 SPU | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/product/spu/get-detail` | 获得商品 SPU 明细 | `CommonResult<ProductSpuRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/product/spu/list-all-simple` | 获得商品 SPU 精简列表 | `CommonResult<List<ProductSpuSimpleRespVO>>` | `-` |
| `GET` | `/product/spu/list` | 获得商品 SPU 详情列表 | `CommonResult<List<ProductSpuRespVO>>` | `@RequestParam("spuIds") Collection<Long> spuIds` |
| `GET` | `/product/spu/page` | 获得商品 SPU 分页 | `CommonResult<PageResult<ProductSpuRespVO>>` | `@Valid ProductSpuPageReqVO pageVO` |

### 📦 `AppCategoryController` (用户 APP - 商品分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/product/category/list` | 获得商品分类列表 | `CommonResult<List<AppCategoryRespVO>>` | `-` |
| `GET` | `/product/category/list-by-ids` | 获得商品分类列表，指定编号 | `CommonResult<List<AppCategoryRespVO>>` | `@RequestParam("ids") List<Long> ids` |

### 📦 `AppProductCommentController` (用户 APP - 商品评价)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/product/comment/page` | 获得商品评价分页 | `CommonResult<PageResult<AppProductCommentRespVO>>` | `@Valid AppCommentPageReqVO pageVO` |

### 📦 `AppFavoriteController` (用户 APP - 商品收藏)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/product/favorite` | 添加商品收藏 | `CommonResult<Long>` | `@RequestBody @Valid AppFavoriteReqVO reqVO` |
| `DELETE` | `/product/favorite` | 取消单个商品收藏 | `CommonResult<Boolean>` | `@RequestBody @Valid AppFavoriteReqVO reqVO` |
| `GET` | `/product/favorite` | 获得商品收藏分页 | `CommonResult<PageResult<AppFavoriteRespVO>>` | `AppFavoritePageReqVO reqVO` |
| `GET` | `/product/favorite` | 检查是否收藏过商品 | `CommonResult<Boolean>` | `AppFavoriteReqVO reqVO` |
| `GET` | `/product/favorite` | 获得商品收藏数量 | `CommonResult<Long>` | `-` |

### 📦 `AppProductBrowseHistoryController` (用户 APP - 商品浏览记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `DELETE` | `/product/browse-history` | 删除商品浏览记录 | `CommonResult<Boolean>` | `@RequestBody @Valid AppProductBrowseHistoryDeleteReqVO reqVO` |
| `DELETE` | `/product/browse-history` | 清空商品浏览记录 | `CommonResult<Boolean>` | `-` |
| `GET` | `/product/browse-history` | 获得商品浏览记录分页 | `CommonResult<PageResult<AppProductBrowseHistoryRespVO>>` | `AppProductBrowseHistoryPageReqVO reqVO` |

### 📦 `AppProductSpuController` (用户 APP - 商品 SPU)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/product/spu/list-by-ids` | 获得商品 SPU 列表 | `CommonResult<List<AppProductSpuRespVO>>` | `@RequestParam("ids") Set<Long> ids` |
| `GET` | `/product/spu/page` | 获得商品 SPU 分页 | `CommonResult<PageResult<AppProductSpuRespVO>>` | `@Valid AppProductSpuPageReqVO pageVO` |
| `GET` | `/product/spu/get-detail` | 获得商品 SPU 明细 | `CommonResult<AppProductSpuDetailRespVO>` | `@RequestParam("id") Long id` |

### 📦 `ArticleCategoryController` (管理后台 - 文章分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/article-category/create` | 创建文章分类 | `CommonResult<Long>` | `@Valid @RequestBody ArticleCategoryCreateReqVO createReqVO` |
| `PUT` | `/promotion/article-category/update` | 更新文章分类 | `CommonResult<Boolean>` | `@Valid @RequestBody ArticleCategoryUpdateReqVO updateReqVO` |
| `DELETE` | `/promotion/article-category/delete` | 删除文章分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/article-category/get` | 获得文章分类 | `CommonResult<ArticleCategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/article-category/list-all-simple` | 获取文章分类精简信息列表 | `CommonResult<List<ArticleCategorySimpleRespVO>>` | `-` |
| `GET` | `/promotion/article-category/page` | 获得文章分类分页 | `CommonResult<PageResult<ArticleCategoryRespVO>>` | `@Valid ArticleCategoryPageReqVO pageVO` |

### 📦 `ArticleController` (管理后台 - 文章管理)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/article/create` | 创建文章管理 | `CommonResult<Long>` | `@Valid @RequestBody ArticleCreateReqVO createReqVO` |
| `PUT` | `/promotion/article/update` | 更新文章管理 | `CommonResult<Boolean>` | `@Valid @RequestBody ArticleUpdateReqVO updateReqVO` |
| `DELETE` | `/promotion/article/delete` | 删除文章管理 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/article/get` | 获得文章管理 | `CommonResult<ArticleRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/article/page` | 获得文章管理分页 | `CommonResult<PageResult<ArticleRespVO>>` | `@Valid ArticlePageReqVO pageVO` |

### 📦 `BannerController` (管理后台 - Banner 管理)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/banner/create` | 创建 Banner | `CommonResult<Long>` | `@Valid @RequestBody BannerCreateReqVO createReqVO` |
| `PUT` | `/promotion/banner/update` | 更新 Banner | `CommonResult<Boolean>` | `@Valid @RequestBody BannerUpdateReqVO updateReqVO` |
| `DELETE` | `/promotion/banner/delete` | 删除 Banner | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/banner/get` | 获得 Banner | `CommonResult<BannerRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/banner/page` | 获得 Banner 分页 | `CommonResult<PageResult<BannerRespVO>>` | `@Valid BannerPageReqVO pageVO` |

### 📦 `BargainActivityController` (管理后台 - 砍价活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/bargain-activity/create` | 创建砍价活动 | `CommonResult<Long>` | `@Valid @RequestBody BargainActivityCreateReqVO createReqVO` |
| `PUT` | `/promotion/bargain-activity/update` | 更新砍价活动 | `CommonResult<Boolean>` | `@Valid @RequestBody BargainActivityUpdateReqVO updateReqVO` |
| `PUT` | `/promotion/bargain-activity/close` | 关闭砍价活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/promotion/bargain-activity/delete` | 删除砍价活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/bargain-activity/get` | 获得砍价活动 | `CommonResult<BargainActivityRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/bargain-activity/page` | 获得砍价活动分页 | `CommonResult<PageResult<BargainActivityPageItemRespVO>>` | `@Valid BargainActivityPageReqVO pageVO` |

### 📦 `BargainHelpController` (管理后台 - 砍价助力)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/bargain-help/page` | 获得砍价助力分页 | `CommonResult<PageResult<BargainHelpRespVO>>` | `@Valid BargainHelpPageReqVO pageVO` |

### 📦 `BargainRecordController` (管理后台 - 砍价记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/bargain-record/page` | 获得砍价记录分页 | `CommonResult<PageResult<BargainRecordPageItemRespVO>>` | `@Valid BargainRecordPageReqVO pageVO` |

### 📦 `CombinationActivityController` (管理后台 - 拼团活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/combination-activity/create` | 创建拼团活动 | `CommonResult<Long>` | `@Valid @RequestBody CombinationActivityCreateReqVO createReqVO` |
| `PUT` | `/promotion/combination-activity/update` | 更新拼团活动 | `CommonResult<Boolean>` | `@Valid @RequestBody CombinationActivityUpdateReqVO updateReqVO` |
| `PUT` | `/promotion/combination-activity/close` | 关闭拼团活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/promotion/combination-activity/delete` | 删除拼团活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/combination-activity/get` | 获得拼团活动 | `CommonResult<CombinationActivityRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/combination-activity/list-by-ids` | 获得拼团活动列表，基于活动编号数组 | `CommonResult<List<CombinationActivityRespVO>>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/promotion/combination-activity/page` | 获得拼团活动分页 | `CommonResult<PageResult<CombinationActivityPageItemRespVO>>` | `@Valid CombinationActivityPageReqVO pageVO` |

### 📦 `CombinationRecordController` (管理后台 - 拼团记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/combination-record/page` | 获得拼团记录分页 | `CommonResult<PageResult<CombinationRecordPageItemRespVO>>` | `@Valid CombinationRecordReqPageVO pageVO` |
| `GET` | `/promotion/combination-record/get-summary` | 获得拼团记录的概要信息 | `CommonResult<CombinationRecordSummaryVO>` | `-` |

### 📦 `CouponController` (管理后台 - 优惠劵)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `DELETE` | `/promotion/coupon/delete` | 回收优惠劵 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/coupon/page` | 获得优惠劵分页 | `CommonResult<PageResult<CouponPageItemRespVO>>` | `@Valid CouponPageReqVO pageVO` |
| `GET` | `/promotion/coupon/get` | 获得优惠劵 | `CommonResult<CouponRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/promotion/coupon/send` | 发送优惠劵 | `CommonResult<Boolean>` | `@Valid @RequestBody CouponSendReqVO reqVO` |

### 📦 `CouponTemplateController` (管理后台 - 优惠劵模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/coupon-template/create` | 创建优惠劵模板 | `CommonResult<Long>` | `@Valid @RequestBody CouponTemplateCreateReqVO createReqVO` |
| `PUT` | `/promotion/coupon-template/update` | 更新优惠劵模板 | `CommonResult<Boolean>` | `@Valid @RequestBody CouponTemplateUpdateReqVO updateReqVO` |
| `PUT` | `/promotion/coupon-template/update-status` | 更新优惠劵模板状态 | `CommonResult<Boolean>` | `@Valid @RequestBody CouponTemplateUpdateStatusReqVO reqVO` |
| `DELETE` | `/promotion/coupon-template/delete` | 删除优惠劵模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/coupon-template/get` | 获得优惠劵模板 | `CommonResult<CouponTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/coupon-template/page` | 获得优惠劵模板分页 | `CommonResult<PageResult<CouponTemplateRespVO>>` | `@Valid CouponTemplatePageReqVO pageVO` |
| `GET` | `/promotion/coupon-template/list` | 获得优惠劵模板列表 | `CommonResult<List<CouponTemplateRespVO>>` | `@RequestParam("ids") Collection<Long> ids` |

### 📦 `DiscountActivityController` (管理后台 - 限时折扣活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/discount-activity/create` | 创建限时折扣活动 | `CommonResult<Long>` | `@Valid @RequestBody DiscountActivityCreateReqVO createReqVO` |
| `PUT` | `/promotion/discount-activity/update` | 更新限时折扣活动 | `CommonResult<Boolean>` | `@Valid @RequestBody DiscountActivityUpdateReqVO updateReqVO` |
| `PUT` | `/promotion/discount-activity/close` | 关闭限时折扣活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/promotion/discount-activity/delete` | 删除限时折扣活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/discount-activity/get` | 获得限时折扣活动 | `CommonResult<DiscountActivityRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/discount-activity/page` | 获得限时折扣活动分页 | `CommonResult<PageResult<DiscountActivityRespVO>>` | `@Valid DiscountActivityPageReqVO pageVO` |

### 📦 `DiyPageController` (管理后台 - 装修页面)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/diy-page/create` | 创建装修页面 | `CommonResult<Long>` | `@Valid @RequestBody DiyPageCreateReqVO createReqVO` |
| `PUT` | `/promotion/diy-page/update` | 更新装修页面 | `CommonResult<Boolean>` | `@Valid @RequestBody DiyPageUpdateReqVO updateReqVO` |
| `DELETE` | `/promotion/diy-page/delete` | 删除装修页面 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/diy-page/get` | 获得装修页面 | `CommonResult<DiyPageRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/diy-page/list` | 获得装修页面列表 | `CommonResult<List<DiyPageRespVO>>` | `@RequestParam("ids") Collection<Long> ids` |
| `GET` | `/promotion/diy-page/page` | 获得装修页面分页 | `CommonResult<PageResult<DiyPageRespVO>>` | `@Valid DiyPagePageReqVO pageVO` |
| `GET` | `/promotion/diy-page/get-property` | 获得装修页面属性 | `CommonResult<DiyPagePropertyRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/promotion/diy-page/update-property` | 更新装修页面属性 | `CommonResult<Boolean>` | `@Valid @RequestBody DiyPagePropertyUpdateRequestVO updateReqVO` |

### 📦 `DiyTemplateController` (管理后台 - 装修模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/diy-template/create` | 创建装修模板 | `CommonResult<Long>` | `@Valid @RequestBody DiyTemplateCreateReqVO createReqVO` |
| `PUT` | `/promotion/diy-template/update` | 更新装修模板 | `CommonResult<Boolean>` | `@Valid @RequestBody DiyTemplateUpdateReqVO updateReqVO` |
| `PUT` | `/promotion/diy-template/use` | 使用装修模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/promotion/diy-template/delete` | 删除装修模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/diy-template/get` | 获得装修模板 | `CommonResult<DiyTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/diy-template/page` | 获得装修模板分页 | `CommonResult<PageResult<DiyTemplateRespVO>>` | `@Valid DiyTemplatePageReqVO pageVO` |
| `GET` | `/promotion/diy-template/get-property` | 获得装修模板属性 | `CommonResult<DiyTemplatePropertyRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/promotion/diy-template/update-property` | 更新装修模板属性 | `CommonResult<Boolean>` | `@Valid @RequestBody DiyTemplatePropertyUpdateRequestVO updateReqVO` |

### 📦 `KeFuConversationController` (管理后台 - 客服会话)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/kefu-conversation/get` | 获得客服会话 | `CommonResult<KeFuConversationRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/promotion/kefu-conversation/update-conversation-pinned` | 置顶/取消置顶客服会话 | `CommonResult<Boolean>` | `@Valid @RequestBody KeFuConversationUpdatePinnedReqVO updateReqVO` |
| `DELETE` | `/promotion/kefu-conversation/delete` | 删除客服会话 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/kefu-conversation/list` | 获得客服会话列表 | `CommonResult<List<KeFuConversationRespVO>>` | `-` |

### 📦 `KeFuMessageController` (管理后台 - 客服消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/kefu-message/send` | 发送客服消息 | `CommonResult<Long>` | `@Valid @RequestBody KeFuMessageSendReqVO sendReqVO` |
| `PUT` | `/promotion/kefu-message/update-read-status` | 更新客服消息已读状态 | `CommonResult<Boolean>` | `@RequestParam("conversationId") Long conversationId` |
| `GET` | `/promotion/kefu-message/list` | 获得客服消息列表 | `CommonResult<List<KeFuMessageRespVO>>` | `@Valid KeFuMessageListReqVO pageReqVO` |

### 📦 `PointActivityController` (管理后台 - 积分商城活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/point-activity/create` | 创建积分商城活动 | `CommonResult<Long>` | `@Valid @RequestBody PointActivitySaveReqVO createReqVO` |
| `PUT` | `/promotion/point-activity/update` | 更新积分商城活动 | `CommonResult<Boolean>` | `@Valid @RequestBody PointActivitySaveReqVO updateReqVO` |
| `PUT` | `/promotion/point-activity/close` | 关闭积分商城活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/promotion/point-activity/delete` | 删除积分商城活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/point-activity/get` | 获得积分商城活动 | `CommonResult<PointActivityRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/point-activity/page` | 获得积分商城活动分页 | `CommonResult<PageResult<PointActivityRespVO>>` | `@Valid PointActivityPageReqVO pageReqVO` |
| `GET` | `/promotion/point-activity/list-by-ids` | 获得积分商城活动列表，基于活动编号数组 | `CommonResult<List<PointActivityRespVO>>` | `@RequestParam("ids") List<Long> ids` |

### 📦 `RewardActivityController` (管理后台 - 满减送活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/reward-activity/create` | 创建满减送活动 | `CommonResult<Long>` | `@Valid @RequestBody RewardActivityCreateReqVO createReqVO` |
| `PUT` | `/promotion/reward-activity/update` | 更新满减送活动 | `CommonResult<Boolean>` | `@Valid @RequestBody RewardActivityUpdateReqVO updateReqVO` |
| `PUT` | `/promotion/reward-activity/close` | 关闭满减送活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/promotion/reward-activity/delete` | 删除满减送活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/reward-activity/get` | 获得满减送活动 | `CommonResult<RewardActivityRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/reward-activity/page` | 获得满减送活动分页 | `CommonResult<PageResult<RewardActivityRespVO>>` | `@Valid RewardActivityPageReqVO pageVO` |

### 📦 `SeckillActivityController` (管理后台 - 秒杀活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/seckill-activity/create` | 创建秒杀活动 | `CommonResult<Long>` | `@Valid @RequestBody SeckillActivityCreateReqVO createReqVO` |
| `PUT` | `/promotion/seckill-activity/update` | 更新秒杀活动 | `CommonResult<Boolean>` | `@Valid @RequestBody SeckillActivityUpdateReqVO updateReqVO` |
| `PUT` | `/promotion/seckill-activity/close` | 关闭秒杀活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/promotion/seckill-activity/delete` | 删除秒杀活动 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/seckill-activity/get` | 获得秒杀活动 | `CommonResult<SeckillActivityDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/seckill-activity/page` | 获得秒杀活动分页 | `CommonResult<PageResult<SeckillActivityRespVO>>` | `@Valid SeckillActivityPageReqVO pageVO` |
| `GET` | `/promotion/seckill-activity/list-by-ids` | 获得秒杀活动列表，基于活动编号数组 | `CommonResult<List<SeckillActivityRespVO>>` | `@RequestParam("ids") List<Long> ids` |

### 📦 `SeckillConfigController` (管理后台 - 秒杀时段)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/seckill-config/create` | 创建秒杀时段 | `CommonResult<Long>` | `@Valid @RequestBody SeckillConfigCreateReqVO createReqVO` |
| `PUT` | `/promotion/seckill-config/update` | 更新秒杀时段 | `CommonResult<Boolean>` | `@Valid @RequestBody SeckillConfigUpdateReqVO updateReqVO` |
| `PUT` | `/promotion/seckill-config/update-status` | 修改时段配置状态 | `CommonResult<Boolean>` | `@Valid @RequestBody SeckillConfigUpdateStatusReqVo reqVO` |
| `DELETE` | `/promotion/seckill-config/delete` | 删除秒杀时段 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/seckill-config/get` | 获得秒杀时段 | `CommonResult<SeckillConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/seckill-config/list` | 获得所有秒杀时段列表 | `CommonResult<List<SeckillConfigRespVO>>` | `-` |
| `GET` | `/promotion/seckill-config/simple-list` | 获得所有开启状态的秒杀时段精简列表 | `CommonResult<List<SeckillConfigSimpleRespVO>>` | `-` |
| `GET` | `/promotion/seckill-config/page` | 获得秒杀时间段分页 | `CommonResult<PageResult<SeckillConfigRespVO>>` | `@Valid SeckillConfigPageReqVO pageVO` |

### 📦 `AppActivityController` (用户 APP - 营销活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/activity/list-by-spu-id` | 获得单个商品，进行中的拼团、秒杀、砍价活动信息 | `CommonResult<List<AppActivityRespVO>>` | `@RequestParam("spuId") Long spuId` |

### 📦 `AppArticleCategoryController` (用户 APP - 文章分类)

*暂无解析出的 REST 路由*

### 📦 `AppArticleController` (用户 APP - 文章)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `PUT` | `/promotion/article/add-browse-count` | 增加文章浏览量 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `AppBannerController` (用户 APP - 首页 Banner)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/banner/list` | 获得 banner 列表 | `CommonResult<List<AppBannerRespVO>>` | `@RequestParam("position") Integer position` |
| `PUT` | `/promotion/banner/add-browse-count` | 增加 Banner 点击量 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `AppBargainActivityController` (用户 App - 砍价活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/bargain-activity/list` | 获得砍价活动列表 | `CommonResult<List<AppBargainActivityRespVO>>` | `@RequestParam(name = "count", defaultValue = "6") Integer count` |
| `GET` | `/promotion/bargain-activity/page` | 获得砍价活动分页 | `CommonResult<PageResult<AppBargainActivityRespVO>>` | `PageParam pageReqVO` |
| `GET` | `/promotion/bargain-activity/get-detail` | 获得砍价活动详情 | `CommonResult<AppBargainActivityDetailRespVO>` | `@RequestParam("id") Long id` |

### 📦 `AppBargainHelpController` (用户 App - 砍价助力)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/bargain-help/create` | 创建砍价助力 | `CommonResult<Integer>` | `@RequestBody AppBargainHelpCreateReqVO reqVO` |
| `GET` | `/promotion/bargain-help/list` | 获得砍价助力列表 | `CommonResult<List<AppBargainHelpRespVO>>` | `@RequestParam("recordId") Long recordId` |

### 📦 `AppBargainRecordController` (用户 App - 砍价记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/bargain-record/get-summary` | 获得砍价记录的概要信息 | `CommonResult<AppBargainRecordSummaryRespVO>` | `-` |
| `GET` | `/promotion/bargain-record/get-detail` | 获得砍价记录的明细 | `CommonResult<AppBargainRecordDetailRespVO>` | `@RequestParam(value = "id", required = false) Long id, @RequestParam(value = "activityId", required = false) Long activityId` |
| `GET` | `/promotion/bargain-record/page` | 获得砍价记录的分页 | `CommonResult<PageResult<AppBargainRecordRespVO>>` | `PageParam pageParam` |
| `POST` | `/promotion/bargain-record/create` | 创建砍价记录 | `CommonResult<Long>` | `@RequestBody AppBargainRecordCreateReqVO reqVO` |

### 📦 `AppCombinationActivityController` (用户 APP - 拼团活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/combination-activity/page` | 获得拼团活动分页 | `CommonResult<PageResult<AppCombinationActivityRespVO>>` | `PageParam pageParam` |
| `GET` | `/promotion/combination-activity/list-by-ids` | 获得拼团活动列表，基于活动编号数组 | `CommonResult<List<AppCombinationActivityRespVO>>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/promotion/combination-activity/get-detail` | 获得拼团活动明细 | `CommonResult<AppCombinationActivityDetailRespVO>` | `@RequestParam("id") Long id` |

### 📦 `AppCombinationRecordController` (用户 APP - 拼团活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/combination-record/get-summary` | 获得拼团记录的概要信息 | `CommonResult<AppCombinationRecordSummaryRespVO>` | `-` |
| `GET` | `/promotion/combination-record/get-head-list` | 获得最近 n 条拼团记录（团长发起的） | `CommonResult<List<AppCombinationRecordRespVO>>` | `@RequestParam(value = "activityId", required = false) Long activityId, @RequestParam("status") Integer status, @RequestParam(value = "count", defaultValue = "20") @Max(20) Integer count` |
| `GET` | `/promotion/combination-record/page` | 获得我的拼团记录分页 | `CommonResult<PageResult<AppCombinationRecordRespVO>>` | `@Valid AppCombinationRecordPageReqVO pageReqVO` |
| `GET` | `/promotion/combination-record/get-detail` | 获得拼团记录明细 | `CommonResult<AppCombinationRecordDetailRespVO>` | `@RequestParam("id") Long id` |

### 📦 `AppCouponController` (用户 App - 优惠劵)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/coupon/take` | 领取优惠劵 | `CommonResult<Boolean>` | `@Valid @RequestBody AppCouponTakeReqVO reqVO` |
| `GET` | `/promotion/coupon/page` | 我的优惠劵列表 | `CommonResult<PageResult<AppCouponRespVO>>` | `AppCouponPageReqVO pageReqVO` |
| `GET` | `/promotion/coupon/get` | 获得优惠劵 | `CommonResult<AppCouponRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/coupon` | 获得未使用的优惠劵数量 | `CommonResult<Long>` | `-` |

### 📦 `AppCouponTemplateController` (用户 App - 优惠劵模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/coupon-template/get` | 获得优惠劵模版 | `CommonResult<AppCouponTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/coupon-template/list` | 获得优惠劵模版列表 | `CommonResult<List<AppCouponTemplateRespVO>>` | `@RequestParam(value = "spuId", required = false) Long spuId, @RequestParam(value = "productScope", required = false) Integer productScope, @RequestParam(value = "count", required = false, defaultValue = "10") Integer count` |
| `GET` | `/promotion/coupon-template/list-by-ids` | 获得优惠劵模版列表 | `CommonResult<List<AppCouponTemplateRespVO>>` | `@RequestParam(value = "ids", required = false) Set<Long> ids` |
| `GET` | `/promotion/coupon-template/page` | 获得优惠劵模版分页 | `CommonResult<PageResult<AppCouponTemplateRespVO>>` | `AppCouponTemplatePageReqVO pageReqVO` |

### 📦 `AppDiyPageController` (用户 APP - 装修页面)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/diy-page/get` | 获得装修页面 | `CommonResult<AppDiyPagePropertyRespVO>` | `@RequestParam("id") Long id` |

### 📦 `AppDiyTemplateController` (用户 APP - 装修模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/diy-template/used` | 使用中的装修模板 | `CommonResult<AppDiyTemplatePropertyRespVO>` | `-` |
| `GET` | `/promotion/diy-template/get` | 获得装修模板 | `CommonResult<AppDiyTemplatePropertyRespVO>` | `@RequestParam("id") Long id` |

### 📦 `AppKeFuMessageController` (用户 APP - 客服消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/promotion/kefu-message/send` | 发送客服消息 | `CommonResult<Long>` | `@Valid @RequestBody AppKeFuMessageSendReqVO sendReqVO` |
| `PUT` | `/promotion/kefu-message/update-read-status` | 更新客服消息已读状态 | `CommonResult<Boolean>` | `@RequestParam("conversationId") Long conversationId` |
| `GET` | `/promotion/kefu-message/list` | 获得客服消息列表 | `CommonResult<List<KeFuMessageRespVO>>` | `@Valid AppKeFuMessagePageReqVO pageReqVO` |

### 📦 `AppPointActivityController` (用户 App - 积分商城活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/point-activity/page` | 获得积分商城活动分页 | `CommonResult<PageResult<AppPointActivityRespVO>>` | `AppPointActivityPageReqVO pageReqVO` |
| `GET` | `/promotion/point-activity/get-detail` | 获得积分商城活动明细 | `CommonResult<AppPointActivityDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/point-activity/list-by-ids` | 获得积分商城活动列表，基于活动编号数组 | `CommonResult<List<AppPointActivityRespVO>>` | `@RequestParam("ids") List<Long> ids` |

### 📦 `AppRewardActivityController` (用户 App - 满减送活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/reward-activity/get` | 获得满减送活动 | `CommonResult<AppRewardActivityRespVO>` | `@RequestParam("id") Long id` |

### 📦 `AppSeckillActivityController` (用户 App - 秒杀活动)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/seckill-activity/get-now` | 获得当前秒杀活动 | `CommonResult<AppSeckillActivityNowRespVO>` | `-` |
| `GET` | `/promotion/seckill-activity/page` | 获得秒杀活动分页 | `CommonResult<PageResult<AppSeckillActivityRespVO>>` | `AppSeckillActivityPageReqVO pageReqVO` |
| `GET` | `/promotion/seckill-activity/get-detail` | 获得秒杀活动明细 | `CommonResult<AppSeckillActivityDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/promotion/seckill-activity/list-by-ids` | 获得秒杀活动列表，基于活动编号数组 | `CommonResult<List<AppSeckillActivityRespVO>>` | `@RequestParam("ids") List<Long> ids` |

### 📦 `AppSeckillConfigController` (用户 App - 秒杀时间段)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/promotion/seckill-config/list` | 获得秒杀时间段列表 | `CommonResult<List<AppSeckillConfigRespVO>>` | `-` |

### 📦 `MemberStatisticsController` (管理后台 - 会员统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/statistics/member/summary` | 获得会员统计（实时统计） | `CommonResult<MemberSummaryRespVO>` | `-` |
| `GET` | `/statistics/member/analyse` | 获得会员分析数据 | `CommonResult<MemberAnalyseRespVO>` | `MemberAnalyseReqVO reqVO` |
| `GET` | `/statistics/member/area-statistics-list` | 按照省份，获得会员统计列表 | `CommonResult<List<MemberAreaStatisticsRespVO>>` | `-` |
| `GET` | `/statistics/member/sex-statistics-list` | 按照性别，获得会员统计列表 | `CommonResult<List<MemberSexStatisticsRespVO>>` | `-` |
| `GET` | `/statistics/member/terminal-statistics-list` | 按照终端，获得会员统计列表 | `CommonResult<List<MemberTerminalStatisticsRespVO>>` | `-` |
| `GET` | `/statistics/member/user-count-comparison` | 获得用户数量对照 | `CommonResult<DataComparisonRespVO<MemberCountRespVO>>` | `-` |
| `GET` | `/statistics/member/register-count-list` | 获得会员注册数量列表 | `CommonResult<List<MemberRegisterCountRespVO>>` | `MemberAnalyseReqVO reqVO` |

### 📦 `PayStatisticsController` (管理后台 - 支付统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/statistics/pay/summary` | 获取充值金额 | `CommonResult<PaySummaryRespVO>` | `-` |

### 📦 `ProductStatisticsController` (管理后台 - 商品统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/statistics/product/analyse` | 获得商品统计分析 | `CommonResult<DataComparisonRespVO<ProductStatisticsRespVO>>` | `ProductStatisticsReqVO reqVO` |
| `GET` | `/statistics/product/list` | 获得商品统计明细（日期维度） | `CommonResult<List<ProductStatisticsRespVO>>` | `ProductStatisticsReqVO reqVO` |
| `GET` | `/statistics/product/export-excel` | 导出获得商品统计明细 Excel（日期维度） | `void` | `ProductStatisticsReqVO reqVO, HttpServletResponse response) throws IOException { List<ProductStatisticsDO> list = productStatisticsService.getProductStatisticsList(reqVO); // 导出 Excel List<ProductStatisticsRespVO> voList = BeanUtils.toBean(list, ProductStatisticsRespVO.class); ExcelUtils.write(response, "商品状况.xls", "数据", ProductStatisticsRespVO.class, voList); } @GetMapping("/rank-page") @Operation(summary = "获得商品统计排行榜分页（商品维度）") @PreAuthorize("@ss.hasPermission('statistics:product:query')") public CommonResult<PageResult<ProductStatisticsRespVO>> getProductStatisticsRankPage(@Valid ProductStatisticsReqVO reqVO, @Valid SortablePageParam pageParam` |

### 📦 `TradeStatisticsController` (管理后台 - 交易统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/statistics/trade/summary` | 获得交易统计 | `CommonResult<DataComparisonRespVO<TradeSummaryRespVO>>` | `-` |
| `GET` | `/statistics/trade/analyse` | 获得交易状况统计 | `CommonResult<DataComparisonRespVO<TradeTrendSummaryRespVO>>` | `TradeTrendReqVO reqVO` |
| `GET` | `/statistics/trade/list` | 获得交易状况明细 | `CommonResult<List<TradeTrendSummaryRespVO>>` | `TradeTrendReqVO reqVO` |
| `GET` | `/statistics/trade/export-excel` | 导出获得交易状况明细 Excel | `void` | `TradeTrendReqVO reqVO, HttpServletResponse response) throws IOException { List<TradeStatisticsDO> list = tradeStatisticsService.getTradeStatisticsList(ArrayUtil.get(reqVO.getTimes(), 0), ArrayUtil.get(reqVO.getTimes(), 1)); // 导出 Excel List<TradeTrendSummaryRespVO> voList = TradeStatisticsConvert.INSTANCE.convertList(list); List<TradeTrendSummaryExcelVO> data = TradeStatisticsConvert.INSTANCE.convertList02(voList); ExcelUtils.write(response, "交易状况.xls", "数据", TradeTrendSummaryExcelVO.class, data); } @GetMapping("/order-count") @Operation(summary = "获得交易订单数量") @PreAuthorize("@ss.hasPermission('statistics:trade:query')") public CommonResult<TradeOrderCountRespVO> getOrderCount(` |
| `GET` | `/statistics/trade/order-comparison` | 获得交易订单数量 | `CommonResult<DataComparisonRespVO<TradeOrderSummaryRespVO>>` | `-` |
| `GET` | `/statistics/trade/order-count-trend` | 获得订单量趋势统计 | `CommonResult<List<DataComparisonRespVO<TradeOrderTrendRespVO>>>` | `@Valid TradeOrderTrendReqVO reqVO` |

### 📦 `AfterSaleController` (管理后台 - 售后订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/after-sale/page` | 获得售后订单分页 | `CommonResult<PageResult<AfterSaleRespPageItemVO>>` | `@Valid AfterSalePageReqVO pageVO` |
| `GET` | `/trade/after-sale/get-detail` | 获得售后订单详情 | `CommonResult<AfterSaleDetailRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/trade/after-sale/agree` | 同意售后 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/trade/after-sale/disagree` | 拒绝售后 | `CommonResult<Boolean>` | `@RequestBody AfterSaleDisagreeReqVO confirmReqVO` |
| `PUT` | `/trade/after-sale/receive` | 确认收货 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/trade/after-sale/refuse` | 拒绝收货 | `CommonResult<Boolean>` | `AfterSaleRefuseReqVO refuseReqVO` |
| `PUT` | `/trade/after-sale/refund` | 确认退款 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/trade/after-sale/update-refunded` | 更新售后订单为已退款 | `CommonResult<Boolean>` | `@RequestBody PayRefundNotifyReqDTO notifyReqDTO` |

### 📦 `BrokerageRecordController` (管理后台 - 佣金记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/brokerage-record/get` | 获得佣金记录 | `CommonResult<BrokerageRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/brokerage-record/page` | 获得佣金记录分页 | `CommonResult<PageResult<BrokerageRecordRespVO>>` | `@Valid BrokerageRecordPageReqVO pageVO` |

### 📦 `BrokerageUserController` (管理后台 - 分销用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/trade/brokerage-user/create` | 创建分销用户 | `CommonResult<Long>` | `@Valid @RequestBody BrokerageUserCreateReqVO createReqVO` |
| `PUT` | `/trade/brokerage-user/update-bind-user` | 修改推广员 | `CommonResult<Boolean>` | `@Valid @RequestBody BrokerageUserUpdateBrokerageUserReqVO updateReqVO` |
| `PUT` | `/trade/brokerage-user/clear-bind-user` | 清除推广员 | `CommonResult<Boolean>` | `@Valid @RequestBody BrokerageUserClearBrokerageUserReqVO updateReqVO` |
| `PUT` | `/trade/brokerage-user/update-brokerage-enable` | 修改推广资格 | `CommonResult<Boolean>` | `@Valid @RequestBody BrokerageUserUpdateBrokerageEnabledReqVO updateReqVO` |
| `GET` | `/trade/brokerage-user/get` | 获得分销用户 | `CommonResult<BrokerageUserRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/brokerage-user/page` | 获得分销用户分页 | `CommonResult<PageResult<BrokerageUserRespVO>>` | `@Valid BrokerageUserPageReqVO pageVO` |

### 📦 `BrokerageWithdrawController` (管理后台 - 佣金提现)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `PUT` | `/trade/brokerage-withdraw/approve` | 通过申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/trade/brokerage-withdraw/reject` | 驳回申请 | `CommonResult<Boolean>` | `@Valid @RequestBody BrokerageWithdrawRejectReqVO reqVO` |
| `GET` | `/trade/brokerage-withdraw/get` | 获得佣金提现 | `CommonResult<BrokerageWithdrawRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/brokerage-withdraw/page` | 获得佣金提现分页 | `CommonResult<PageResult<BrokerageWithdrawRespVO>>` | `@Valid BrokerageWithdrawPageReqVO pageVO` |
| `POST` | `/trade/brokerage-withdraw/update-transferred` | 更新佣金提现的转账结果 | `CommonResult<Boolean>` | `@RequestBody PayTransferNotifyReqDTO notifyReqDTO` |

### 📦 `TradeConfigController` (管理后台 - 交易中心配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `PUT` | `/trade/config/save` | 更新交易中心配置 | `CommonResult<Boolean>` | `@Valid @RequestBody TradeConfigSaveReqVO updateReqVO` |
| `GET` | `/trade/config/get` | 获得交易中心配置 | `CommonResult<TradeConfigRespVO>` | `-` |

### 📦 `DeliveryExpressController` (管理后台 - 快递公司)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/trade/delivery/express/create` | 创建快递公司 | `CommonResult<Long>` | `@Valid @RequestBody DeliveryExpressCreateReqVO createReqVO` |
| `PUT` | `/trade/delivery/express/update` | 更新快递公司 | `CommonResult<Boolean>` | `@Valid @RequestBody DeliveryExpressUpdateReqVO updateReqVO` |
| `DELETE` | `/trade/delivery/express/delete` | 删除快递公司 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/delivery/express/get` | 获得快递公司 | `CommonResult<DeliveryExpressRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/delivery/express/list-all-simple` | 获取快递公司精简信息列表 | `CommonResult<List<DeliveryExpressSimpleRespVO>>` | `-` |
| `GET` | `/trade/delivery/express/page` | 获得快递公司分页 | `CommonResult<PageResult<DeliveryExpressRespVO>>` | `@Valid DeliveryExpressPageReqVO pageVO` |

### 📦 `DeliveryExpressTemplateController` (管理后台 - 快递运费模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/trade/delivery/express-template/create` | 创建快递运费模板 | `CommonResult<Long>` | `@Valid @RequestBody DeliveryExpressTemplateCreateReqVO createReqVO` |
| `PUT` | `/trade/delivery/express-template/update` | 更新快递运费模板 | `CommonResult<Boolean>` | `@Valid @RequestBody DeliveryExpressTemplateUpdateReqVO updateReqVO` |
| `DELETE` | `/trade/delivery/express-template/delete` | 删除快递运费模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/delivery/express-template/get` | 获得快递运费模板 | `CommonResult<DeliveryExpressTemplateDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/delivery/express-template/list` | 获得快递运费模板列表 | `CommonResult<List<DeliveryExpressTemplateRespVO>>` | `@RequestParam("ids") Collection<Long> ids` |
| `GET` | `/trade/delivery/express-template/list-all-simple` | 获取快递模版精简信息列表 | `CommonResult<List<DeliveryExpressTemplateSimpleRespVO>>` | `-` |
| `GET` | `/trade/delivery/express-template/page` | 获得快递运费模板分页 | `CommonResult<PageResult<DeliveryExpressTemplateRespVO>>` | `@Valid DeliveryExpressTemplatePageReqVO pageVO` |

### 📦 `DeliveryPickUpStoreController` (管理后台 - 自提门店)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/trade/delivery/pick-up-store/create` | 创建自提门店 | `CommonResult<Long>` | `@Valid @RequestBody DeliveryPickUpStoreCreateReqVO createReqVO` |
| `PUT` | `/trade/delivery/pick-up-store/update` | 更新自提门店 | `CommonResult<Boolean>` | `@Valid @RequestBody DeliveryPickUpStoreUpdateReqVO updateReqVO` |
| `DELETE` | `/trade/delivery/pick-up-store/delete` | 删除自提门店 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/delivery/pick-up-store/get` | 获得自提门店 | `CommonResult<DeliveryPickUpStoreRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/delivery/pick-up-store/simple-list` | 获得自提门店精简信息列表 | `CommonResult<List<DeliveryPickUpStoreSimpleRespVO>>` | `-` |
| `GET` | `/trade/delivery/pick-up-store/list` | 获得自提门店列表 | `CommonResult<List<DeliveryPickUpStoreRespVO>>` | `@RequestParam("ids") Collection<Long> ids` |
| `GET` | `/trade/delivery/pick-up-store/page` | 获得自提门店分页 | `CommonResult<PageResult<DeliveryPickUpStoreRespVO>>` | `@Valid DeliveryPickUpStorePageReqVO pageVO` |
| `POST` | `/trade/delivery/pick-up-store/bind` | 绑定自提店员 | `CommonResult<Boolean>` | `@Valid @RequestBody DeliveryPickUpBindReqVO bindReqVO` |

### 📦 `TradeOrderController` (管理后台 - 交易订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/order/page` | 获得交易订单分页 | `CommonResult<PageResult<TradeOrderPageItemRespVO>>` | `TradeOrderPageReqVO reqVO` |
| `GET` | `/trade/order/summary` | 获得交易订单统计 | `CommonResult<TradeOrderSummaryRespVO>` | `TradeOrderPageReqVO reqVO` |
| `GET` | `/trade/order/get-detail` | 获得交易订单详情 | `CommonResult<TradeOrderDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/order/get-express-track-list` | 获得交易订单的物流轨迹 | `CommonResult<List<?>>` | `@RequestParam("id") Long id` |
| `PUT` | `/trade/order/delivery` | 订单发货 | `CommonResult<Boolean>` | `@RequestBody TradeOrderDeliveryReqVO deliveryReqVO` |
| `PUT` | `/trade/order/update-remark` | 订单备注 | `CommonResult<Boolean>` | `@RequestBody TradeOrderRemarkReqVO reqVO` |
| `PUT` | `/trade/order/update-price` | 订单调价 | `CommonResult<Boolean>` | `@RequestBody TradeOrderUpdatePriceReqVO reqVO` |
| `PUT` | `/trade/order/update-address` | 修改订单收货地址 | `CommonResult<Boolean>` | `@RequestBody TradeOrderUpdateAddressReqVO reqVO` |
| `PUT` | `/trade/order/pick-up-by-id` | 订单核销 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/trade/order/pick-up-by-verify-code` | 订单核销 | `CommonResult<Boolean>` | `@RequestParam("pickUpVerifyCode") String pickUpVerifyCode` |
| `GET` | `/trade/order/get-by-pick-up-verify-code` | 查询核销码对应的订单 | `CommonResult<TradeOrderDetailRespVO>` | `@RequestParam("pickUpVerifyCode") String pickUpVerifyCode` |

### 📦 `AppAfterSaleController` (用户 App - 交易售后)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/after-sale` | 获得售后分页 | `CommonResult<PageResult<AppAfterSaleRespVO>>` | `AppAfterSalePageReqVO pageReqVO` |
| `GET` | `/trade/after-sale` | 获得售后订单 | `CommonResult<AppAfterSaleRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/trade/after-sale` | 申请售后 | `CommonResult<Long>` | `@Valid @RequestBody AppAfterSaleCreateReqVO createReqVO` |
| `PUT` | `/trade/after-sale` | 退回货物 | `CommonResult<Boolean>` | `@Valid @RequestBody AppAfterSaleDeliveryReqVO deliveryReqVO` |
| `DELETE` | `/trade/after-sale` | 取消售后 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `AppAfterSaleLogController` (用户 App - 售后日志)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/after-sale-log/list` | 获得售后日志列表 | `CommonResult<List<AppAfterSaleLogRespVO>>` | `@RequestParam("afterSaleId") Long afterSaleId` |

### 📦 `AppBrokerageRecordController` (用户 APP - 分销用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/brokerage-record/page` | 获得分销记录分页 | `CommonResult<PageResult<AppBrokerageRecordRespVO>>` | `@Valid AppBrokerageRecordPageReqVO pageReqVO` |
| `GET` | `/trade/brokerage-record/get-product-brokerage-price` | 获得商品的分销金额 | `CommonResult<AppBrokerageProductPriceRespVO>` | `@RequestParam("spuId") Long spuId` |

### 📦 `AppBrokerageUserController` (用户 APP - 分销用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/brokerage-user/get` | 获得个人分销信息 | `CommonResult<AppBrokerageUserRespVO>` | `-` |
| `PUT` | `/trade/brokerage-user/bind` | 绑定推广员 | `CommonResult<Boolean>` | `@Valid @RequestBody AppBrokerageUserBindReqVO reqVO` |
| `GET` | `/trade/brokerage-user/get-summary` | 获得个人分销统计 | `CommonResult<AppBrokerageUserMySummaryRespVO>` | `-` |
| `GET` | `/trade/brokerage-user/rank-page-by-user-count` | 获得分销用户排行分页（基于用户量） | `CommonResult<PageResult<AppBrokerageUserRankByUserCountRespVO>>` | `AppBrokerageUserRankPageReqVO pageReqVO` |
| `GET` | `/trade/brokerage-user/rank-page-by-price` | 获得分销用户排行分页（基于佣金） | `CommonResult<PageResult<AppBrokerageUserRankByPriceRespVO>>` | `AppBrokerageUserRankPageReqVO pageReqVO` |
| `GET` | `/trade/brokerage-user/child-summary-page` | 获得下级分销统计分页 | `CommonResult<PageResult<AppBrokerageUserChildSummaryRespVO>>` | `AppBrokerageUserChildSummaryPageReqVO pageReqVO` |
| `GET` | `/trade/brokerage-user/get-rank-by-price` | 获得分销用户排行（基于佣金） | `CommonResult<Integer>` | `@RequestParam("times") @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND) LocalDateTime[] times` |

### 📦 `AppBrokerageWithdrawController` (用户 APP - 分销提现)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/brokerage-withdraw/page` | 获得分销提现分页 | `CommonResult<PageResult<AppBrokerageWithdrawRespVO>>` | `AppBrokerageWithdrawPageReqVO pageReqVO` |
| `GET` | `/trade/brokerage-withdraw/get` | 获得佣金提现 | `CommonResult<AppBrokerageWithdrawRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/trade/brokerage-withdraw/create` | 创建分销提现 | `CommonResult<Long>` | `@RequestBody @Valid AppBrokerageWithdrawCreateReqVO createReqVO` |

### 📦 `AppCartController` (用户 App - 购物车)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/trade/cart/add` | 添加购物车商品 | `CommonResult<Long>` | `@Valid @RequestBody AppCartAddReqVO addCountReqVO` |
| `PUT` | `/trade/cart/update-count` | 更新购物车商品数量 | `CommonResult<Boolean>` | `@Valid @RequestBody AppCartUpdateCountReqVO updateReqVO` |
| `PUT` | `/trade/cart/update-selected` | 更新购物车商品选中 | `CommonResult<Boolean>` | `@Valid @RequestBody AppCartUpdateSelectedReqVO updateReqVO` |
| `PUT` | `/trade/cart/reset` | 重置购物车商品 | `CommonResult<Boolean>` | `@Valid @RequestBody AppCartResetReqVO updateReqVO` |
| `DELETE` | `/trade/cart/delete` | 删除购物车商品 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/trade/cartget-count` | 查询用户在购物车中的商品数量 | `CommonResult<Integer>` | `-` |
| `GET` | `/trade/cart/list` | 查询用户的购物车列表 | `CommonResult<AppCartListRespVO>` | `-` |

### 📦 `AppTradeConfigController` (用户 App - 交易配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/config/get` | 获得交易配置 | `CommonResult<AppTradeConfigRespVO>` | `-` |

### 📦 `AppDeliverExpressController` (用户 App - 快递公司)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/delivery/express/list` | 获得快递公司列表 | `CommonResult<List<AppDeliveryExpressRespVO>>` | `-` |

### 📦 `AppDeliverPickUpStoreController` (用户 App - 自提门店)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/delivery/pick-up-store/list` | 获得自提门店列表 | `CommonResult<List<AppDeliveryPickUpStoreRespVO>>` | `@RequestParam(value = "latitude", required = false) Double latitude, @RequestParam(value = "longitude", required = false) Double longitude` |
| `GET` | `/trade/delivery/pick-up-store/get` | 获得自提门店 | `CommonResult<AppDeliveryPickUpStoreRespVO>` | `@RequestParam("id") Long id` |

### 📦 `AppTradeOrderController` (用户 App - 交易订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/trade/order/settlement` | 获得订单结算信息 | `CommonResult<AppTradeOrderSettlementRespVO>` | `@Valid AppTradeOrderSettlementReqVO settlementReqVO` |
| `GET` | `/trade/order/settlement-product` | 获得商品结算信息 | `CommonResult<List<AppTradeProductSettlementRespVO>>` | `@RequestParam("spuIds") List<Long> spuIds` |
| `POST` | `/trade/order/create` | 创建订单 | `CommonResult<AppTradeOrderCreateRespVO>` | `@Valid @RequestBody AppTradeOrderCreateReqVO createReqVO` |
| `POST` | `/trade/order/update-paid` | 更新订单为已支付 | `CommonResult<Boolean>` | `@RequestBody PayOrderNotifyReqDTO notifyReqDTO` |
| `GET` | `/trade/order/get-detail` | 获得交易订单 | `CommonResult<AppTradeOrderDetailRespVO>` | `@RequestParam("id") Long id, @RequestParam(value = "sync", required = false) Boolean sync` |
| `GET` | `/trade/order/get-express-track-list` | 获得交易订单的物流轨迹 | `CommonResult<List<AppOrderExpressTrackRespDTO>>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/order/page` | 获得交易订单分页 | `CommonResult<PageResult<AppTradeOrderPageItemRespVO>>` | `AppTradeOrderPageReqVO reqVO` |
| `GET` | `/trade/order/get-count` | 获得交易订单数量 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/trade/order/cancel` | 取消交易订单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/trade/order/delete` | 删除交易订单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/trade/order/item/get` | 获得交易订单项 | `CommonResult<AppTradeOrderItemRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/trade/order/item/create-comment` | 创建交易订单项的评价 | `CommonResult<Long>` | `@RequestBody AppTradeOrderItemCommentCreateReqVO createReqVO` |

### 📦 `AddressController` (管理后台 - 用户收件地址)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/address/list` | 获得用户收件地址列表 | `CommonResult<List<AddressRespVO>>` | `@RequestParam("userId") Long userId` |

### 📦 `MemberConfigController` (管理后台 - 会员设置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `PUT` | `/member/config/save` | 保存会员配置 | `CommonResult<Boolean>` | `@Valid @RequestBody MemberConfigSaveReqVO saveReqVO` |
| `GET` | `/member/config/get` | 获得会员配置 | `CommonResult<MemberConfigRespVO>` | `-` |

### 📦 `MemberGroupController` (管理后台 - 用户分组)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/member/group/create` | 创建用户分组 | `CommonResult<Long>` | `@Valid @RequestBody MemberGroupCreateReqVO createReqVO` |
| `PUT` | `/member/group/update` | 更新用户分组 | `CommonResult<Boolean>` | `@Valid @RequestBody MemberGroupUpdateReqVO updateReqVO` |
| `DELETE` | `/member/group/delete` | 删除用户分组 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/member/group/get` | 获得用户分组 | `CommonResult<MemberGroupRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/member/group/list-all-simple` | 获取会员分组精简信息列表 | `CommonResult<List<MemberGroupSimpleRespVO>>` | `-` |
| `GET` | `/member/group/page` | 获得用户分组分页 | `CommonResult<PageResult<MemberGroupRespVO>>` | `@Valid MemberGroupPageReqVO pageVO` |

### 📦 `MemberExperienceRecordController` (管理后台 - 会员经验记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/experience-record/get` | 获得会员经验记录 | `CommonResult<MemberExperienceRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/member/experience-record/page` | 获得会员经验记录分页 | `CommonResult<PageResult<MemberExperienceRecordRespVO>>` | `@Valid MemberExperienceRecordPageReqVO pageVO` |

### 📦 `MemberLevelController` (管理后台 - 会员等级)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/member/level/create` | 创建会员等级 | `CommonResult<Long>` | `@Valid @RequestBody MemberLevelCreateReqVO createReqVO` |
| `PUT` | `/member/level/update` | 更新会员等级 | `CommonResult<Boolean>` | `@Valid @RequestBody MemberLevelUpdateReqVO updateReqVO` |
| `DELETE` | `/member/level/delete` | 删除会员等级 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/member/level/get` | 获得会员等级 | `CommonResult<MemberLevelRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/member/level/list-all-simple` | 获取会员等级精简信息列表 | `CommonResult<List<MemberLevelSimpleRespVO>>` | `-` |
| `GET` | `/member/level/list` | 获得会员等级列表 | `CommonResult<List<MemberLevelRespVO>>` | `@Valid MemberLevelListReqVO listReqVO` |

### 📦 `MemberLevelRecordController` (管理后台 - 会员等级记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/level-record/get` | 获得会员等级记录 | `CommonResult<MemberLevelRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/member/level-record/page` | 获得会员等级记录分页 | `CommonResult<PageResult<MemberLevelRecordRespVO>>` | `@Valid MemberLevelRecordPageReqVO pageVO` |

### 📦 `MemberPointRecordController` (管理后台 - 签到记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/point/record/page` | 获得用户积分记录分页 | `CommonResult<PageResult<MemberPointRecordRespVO>>` | `@Valid MemberPointRecordPageReqVO pageVO` |

### 📦 `MemberSignInConfigController` (管理后台 - 签到规则)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/member/sign-in/config/create` | 创建签到规则 | `CommonResult<Long>` | `@Valid @RequestBody MemberSignInConfigCreateReqVO createReqVO` |
| `PUT` | `/member/sign-in/config/update` | 更新签到规则 | `CommonResult<Boolean>` | `@Valid @RequestBody MemberSignInConfigUpdateReqVO updateReqVO` |
| `DELETE` | `/member/sign-in/config/delete` | 删除签到规则 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/member/sign-in/config/get` | 获得签到规则 | `CommonResult<MemberSignInConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/member/sign-in/config/list` | 获得签到规则列表 | `CommonResult<List<MemberSignInConfigRespVO>>` | `-` |

### 📦 `MemberSignInRecordController` (管理后台 - 签到记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/sign-in/record/page` | 获得签到记录分页 | `CommonResult<PageResult<MemberSignInRecordRespVO>>` | `@Valid MemberSignInRecordPageReqVO pageVO` |

### 📦 `MemberTagController` (管理后台 - 会员标签)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/member/tag/create` | 创建会员标签 | `CommonResult<Long>` | `@Valid @RequestBody MemberTagCreateReqVO createReqVO` |
| `PUT` | `/member/tag/update` | 更新会员标签 | `CommonResult<Boolean>` | `@Valid @RequestBody MemberTagUpdateReqVO updateReqVO` |
| `DELETE` | `/member/tag/delete` | 删除会员标签 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/member/tag/get` | 获得会员标签 | `CommonResult<MemberTagRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/member/tag/list-all-simple` | 获取会员标签精简信息列表 | `CommonResult<List<MemberTagRespVO>>` | `-` |
| `GET` | `/member/tag/list` | 获得会员标签列表 | `CommonResult<List<MemberTagRespVO>>` | `@RequestParam("ids") Collection<Long> ids` |
| `GET` | `/member/tag/page` | 获得会员标签分页 | `CommonResult<PageResult<MemberTagRespVO>>` | `@Valid MemberTagPageReqVO pageVO` |

### 📦 `MemberUserController` (管理后台 - 会员用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `PUT` | `/member/user/update` | 更新会员用户 | `CommonResult<Boolean>` | `@Valid @RequestBody MemberUserUpdateReqVO updateReqVO` |
| `PUT` | `/member/user/update-level` | 更新会员用户等级 | `CommonResult<Boolean>` | `@Valid @RequestBody MemberUserUpdateLevelReqVO updateReqVO` |
| `PUT` | `/member/user/update-point` | 更新会员用户积分 | `CommonResult<Boolean>` | `@Valid @RequestBody MemberUserUpdatePointReqVO updateReqVO` |
| `GET` | `/member/user/get` | 获得会员用户 | `CommonResult<MemberUserRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/member/user/page` | 获得会员用户分页 | `CommonResult<PageResult<MemberUserRespVO>>` | `@Valid MemberUserPageReqVO pageVO` |

### 📦 `AppAddressController` (用户 APP - 用户收件地址)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/member/address/create` | 创建用户收件地址 | `CommonResult<Long>` | `@Valid @RequestBody AppAddressCreateReqVO createReqVO` |
| `PUT` | `/member/address/update` | 更新用户收件地址 | `CommonResult<Boolean>` | `@Valid @RequestBody AppAddressUpdateReqVO updateReqVO` |
| `DELETE` | `/member/address/delete` | 删除用户收件地址 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/member/address/get` | 获得用户收件地址 | `CommonResult<AppAddressRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/member/address/get-default` | 获得默认的用户收件地址 | `CommonResult<AppAddressRespVO>` | `-` |
| `GET` | `/member/address/list` | 获得用户收件地址列表 | `CommonResult<List<AppAddressRespVO>>` | `-` |

### 📦 `AppAuthController` (用户 APP - 认证)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/member/auth/login` | 使用手机 + 密码登录 | `CommonResult<AppAuthLoginRespVO>` | `@RequestBody @Valid AppAuthLoginReqVO reqVO` |
| `POST` | `/member/auth/logout` | 登出系统 | `CommonResult<Boolean>` | `HttpServletRequest request` |
| `POST` | `/member/auth/refresh-token` | 刷新令牌 | `CommonResult<AppAuthLoginRespVO>` | `@RequestParam("refreshToken") String refreshToken` |
| `POST` | `/member/auth/sms-login` | 使用手机 + 验证码登录 | `CommonResult<AppAuthLoginRespVO>` | `@RequestBody @Valid AppAuthSmsLoginReqVO reqVO` |
| `POST` | `/member/auth/send-sms-code` | 发送手机验证码 | `CommonResult<Boolean>` | `@RequestBody @Valid AppAuthSmsSendReqVO reqVO` |
| `POST` | `/member/auth/validate-sms-code` | 校验手机验证码 | `CommonResult<Boolean>` | `@RequestBody @Valid AppAuthSmsValidateReqVO reqVO` |
| `GET` | `/member/auth/social-auth-redirect` | 社交授权的跳转 | `CommonResult<String>` | `@RequestParam("type") Integer type, @RequestParam("redirectUri") String redirectUri` |
| `POST` | `/member/auth/social-login` | 社交快捷登录，使用 code 授权码 | `CommonResult<AppAuthLoginRespVO>` | `@RequestBody @Valid AppAuthSocialLoginReqVO reqVO` |
| `POST` | `/member/auth/weixin-mini-app-login` | 微信小程序的一键登录 | `CommonResult<AppAuthLoginRespVO>` | `@RequestBody @Valid AppAuthWeixinMiniAppLoginReqVO reqVO` |
| `POST` | `/member/auth/create-weixin-jsapi-signature` | 创建微信 JS SDK 初始化所需的签名 | `CommonResult<SocialWxJsapiSignatureRespDTO>` | `@RequestParam("url") String url` |

### 📦 `AppMemberExperienceRecordController` (用户 App - 会员经验记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/experience-record/page` | 获得会员经验记录分页 | `CommonResult<PageResult<AppMemberExperienceRecordRespVO>>` | `@Valid PageParam pageParam` |

### 📦 `AppMemberLevelController` (用户 App - 会员等级)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/level/list` | 获得会员等级列表 | `CommonResult<List<AppMemberLevelRespVO>>` | `-` |

### 📦 `AppMemberPointRecordController` (用户 App - 签到记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/point/record/page` | 获得用户积分记录分页 | `CommonResult<PageResult<AppMemberPointRecordRespVO>>` | `@Valid AppMemberPointRecordPageReqVO pageReqVO` |

### 📦 `AppMemberSignInConfigController` (用户 App - 签到规则)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/sign-in/config/list` | 获得签到规则列表 | `CommonResult<List<AppMemberSignInConfigRespVO>>` | `-` |

### 📦 `AppMemberSignInRecordController` (用户 App - 签到记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/sign-in/record/get-summary` | 获得个人签到统计 | `CommonResult<AppMemberSignInRecordSummaryRespVO>` | `-` |
| `POST` | `/member/sign-in/record/create` | 签到 | `CommonResult<AppMemberSignInRecordRespVO>` | `-` |
| `GET` | `/member/sign-in/record/page` | 获得签到记录分页 | `CommonResult<PageResult<AppMemberSignInRecordRespVO>>` | `PageParam pageParam` |

### 📦 `AppSocialUserController` (用户 App - 社交用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/member/social-user/bind` | 社交绑定，使用 code 授权码 | `CommonResult<String>` | `@RequestBody @Valid AppSocialUserBindReqVO reqVO` |
| `DELETE` | `/member/social-user/unbind` | 取消社交绑定 | `CommonResult<Boolean>` | `@RequestBody AppSocialUserUnbindReqVO reqVO` |
| `GET` | `/member/social-user/get` | 获得社交用户 | `CommonResult<AppSocialUserRespVO>` | `@RequestParam("type") Integer type` |
| `POST` | `/member/social-user/wxa-qrcode` | 获得微信小程序码(base64 image) | `CommonResult<String>` | `@RequestBody @Valid AppSocialWxaQrcodeReqVO reqVO` |
| `GET` | `/member/social-user/get-subscribe-template-list` | 获得微信小程订阅模板列表 | `CommonResult<List<AppSocialWxaSubscribeTemplateRespVO>>` | `-` |

### 📦 `AppMemberUserController` (用户 APP - 用户个人中心)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/member/user/get` | 获得基本信息 | `CommonResult<AppMemberUserInfoRespVO>` | `-` |
| `PUT` | `/member/user/update` | 修改基本信息 | `CommonResult<Boolean>` | `@RequestBody @Valid AppMemberUserUpdateReqVO reqVO` |
| `PUT` | `/member/user/update-mobile` | 修改用户手机 | `CommonResult<Boolean>` | `@RequestBody @Valid AppMemberUserUpdateMobileReqVO reqVO` |
| `PUT` | `/member/user/update-mobile-by-weixin` | 基于微信小程序的授权码，修改用户手机 | `CommonResult<Boolean>` | `@RequestBody @Valid AppMemberUserUpdateMobileByWeixinReqVO reqVO` |
| `PUT` | `/member/user/update-password` | 修改用户密码 | `CommonResult<Boolean>` | `@RequestBody @Valid AppMemberUserUpdatePasswordReqVO reqVO` |
| `PUT` | `/member/user/reset-password` | 重置密码 | `CommonResult<Boolean>` | `@RequestBody @Valid AppMemberUserResetPasswordReqVO reqVO` |

### 📦 `MesCalCalendarController` (管理后台 - MES 排班日历)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/cal/calendar/list` | 查询排班日历 | `CommonResult<List<MesCalCalendarRespVO>>` | `@Valid MesCalCalendarListReqVO reqVO` |

### 📦 `MesCalHolidayController` (管理后台 - MES 假期设置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/cal/holiday/save` | 保存假期设置 | `CommonResult<Long>` | `@Valid @RequestBody MesCalHolidaySaveReqVO saveReqVO` |
| `GET` | `/mes/cal/holiday/get-by-day` | 根据日期获得假期设置 | `CommonResult<MesCalHolidayRespVO>` | `@RequestParam("day") @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND) LocalDateTime day` |
| `GET` | `/mes/cal/holiday/list` | 获得假期设置列表 | `CommonResult<List<MesCalHolidayRespVO>>` | `@RequestParam(value = "startDay", required = false) @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND) LocalDateTime startDay, @RequestParam(value = "endDay", required = false) @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND) LocalDateTime endDay` |

### 📦 `MesCalPlanController` (管理后台 - MES 排班计划)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/cal/plan/create` | 创建排班计划 | `CommonResult<Long>` | `@Valid @RequestBody MesCalPlanSaveReqVO createReqVO` |
| `PUT` | `/mes/cal/plan/update` | 更新排班计划 | `CommonResult<Boolean>` | `@Valid @RequestBody MesCalPlanSaveReqVO updateReqVO` |
| `PUT` | `/mes/cal/plan/confirm` | 确认排班计划 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/mes/cal/plan/delete` | 删除排班计划 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/cal/plan/get` | 获得排班计划 | `CommonResult<MesCalPlanRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/cal/plan/page` | 获得排班计划分页 | `CommonResult<PageResult<MesCalPlanRespVO>>` | `@Valid MesCalPlanPageReqVO pageReqVO` |

### 📦 `MesCalPlanShiftController` (管理后台 - MES 计划班次)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/cal/plan-shift/create` | 创建计划班次 | `CommonResult<Long>` | `@Valid @RequestBody MesCalPlanShiftSaveReqVO createReqVO` |
| `PUT` | `/mes/cal/plan-shift/update` | 更新计划班次 | `CommonResult<Boolean>` | `@Valid @RequestBody MesCalPlanShiftSaveReqVO updateReqVO` |
| `DELETE` | `/mes/cal/plan-shift/delete` | 删除计划班次 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/cal/plan-shift/get` | 获得计划班次 | `CommonResult<MesCalPlanShiftRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/cal/plan-shift/page` | 获得计划班次分页 | `CommonResult<PageResult<MesCalPlanShiftRespVO>>` | `@Valid MesCalPlanShiftPageReqVO pageReqVO` |
| `GET` | `/mes/cal/plan-shift/list-by-plan` | 获得指定排班计划的班次列表 | `CommonResult<List<MesCalPlanShiftRespVO>>` | `@RequestParam("planId") Long planId` |

### 📦 `MesCalPlanTeamController` (管理后台 - MES 计划班组关联)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/cal/plan-team/create` | 创建计划班组关联 | `CommonResult<Long>` | `@Valid @RequestBody MesCalPlanTeamSaveReqVO createReqVO` |
| `DELETE` | `/mes/cal/plan-team/delete` | 删除计划班组关联 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/cal/plan-team/list-by-plan` | 获得指定排班计划的班组列表 | `CommonResult<List<MesCalPlanTeamRespVO>>` | `@RequestParam("planId") Long planId` |

### 📦 `MesCalTeamController` (管理后台 - MES 班组)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/cal/team/create` | 创建班组 | `CommonResult<Long>` | `@Valid @RequestBody MesCalTeamSaveReqVO createReqVO` |
| `PUT` | `/mes/cal/team/update` | 更新班组 | `CommonResult<Boolean>` | `@Valid @RequestBody MesCalTeamSaveReqVO updateReqVO` |
| `DELETE` | `/mes/cal/team/delete` | 删除班组 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/cal/team/get` | 获得班组 | `CommonResult<MesCalTeamRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/cal/team/page` | 获得班组分页 | `CommonResult<PageResult<MesCalTeamRespVO>>` | `@Valid MesCalTeamPageReqVO pageReqVO` |
| `GET` | `/mes/cal/team/list` | 获得班组列表 | `CommonResult<List<MesCalTeamRespVO>>` | `-` |

### 📦 `MesCalTeamMemberController` (管理后台 - MES 班组成员)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/cal/team-member/create` | 创建班组成员 | `CommonResult<Long>` | `@Valid @RequestBody MesCalTeamMemberSaveReqVO createReqVO` |
| `DELETE` | `/mes/cal/team-member/delete` | 删除班组成员 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/cal/team-member/get` | 获得班组成员 | `CommonResult<MesCalTeamMemberRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/cal/team-member/page` | 获得班组成员分页 | `CommonResult<PageResult<MesCalTeamMemberRespVO>>` | `@Valid MesCalTeamMemberPageReqVO pageReqVO` |
| `GET` | `/mes/cal/team-member/list-by-team` | 获得班组成员列表 | `CommonResult<List<MesCalTeamMemberRespVO>>` | `@RequestParam(value = "teamId", required = false) Long teamId, @RequestParam(value = "teamIds", required = false) Collection<Long> teamIds` |

### 📦 `MesCalTeamShiftController` (管理后台 - MES 班组排班)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/cal/team-shift/list` | 获得班组排班列表 | `CommonResult<List<MesCalTeamShiftRespVO>>` | `@Valid MesCalTeamShiftListReqVO reqVO` |

### 📦 `MesDvCheckPlanController` (管理后台 - MES 点检保养方案)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/check-plan/create` | 创建点检保养方案 | `CommonResult<Long>` | `@Valid @RequestBody MesDvCheckPlanSaveReqVO createReqVO` |
| `PUT` | `/mes/dv/check-plan/update` | 更新点检保养方案 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvCheckPlanSaveReqVO updateReqVO` |
| `PUT` | `/mes/dv/check-plan/enable` | 启用点检保养方案 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/dv/check-plan/disable` | 停用点检保养方案 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/mes/dv/check-plan/delete` | 删除点检保养方案 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/check-plan/get` | 获得点检保养方案 | `CommonResult<MesDvCheckPlanRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/check-plan/page` | 获得点检保养方案分页 | `CommonResult<PageResult<MesDvCheckPlanRespVO>>` | `@Valid MesDvCheckPlanPageReqVO pageReqVO` |

### 📦 `MesDvCheckPlanMachineryController` (管理后台 - MES 点检保养方案设备)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/check-plan-machinery/create` | 创建方案设备关联 | `CommonResult<Long>` | `@Valid @RequestBody MesDvCheckPlanMachinerySaveReqVO createReqVO` |
| `DELETE` | `/mes/dv/check-plan-machinery/delete` | 删除方案设备关联 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/check-plan-machinery/list-by-plan` | 获得指定方案的设备列表 | `CommonResult<List<MesDvCheckPlanMachineryRespVO>>` | `@RequestParam("planId") Long planId` |

### 📦 `MesDvCheckPlanSubjectController` (管理后台 - MES 点检保养方案项目)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/check-plan-subject/create` | 创建方案项目关联 | `CommonResult<Long>` | `@Valid @RequestBody MesDvCheckPlanSubjectSaveReqVO createReqVO` |
| `DELETE` | `/mes/dv/check-plan-subject/delete` | 删除方案项目关联 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/check-plan-subject/list-by-plan` | 获得指定方案的项目列表 | `CommonResult<List<MesDvCheckPlanSubjectRespVO>>` | `@RequestParam("planId") Long planId` |

### 📦 `MesDvCheckRecordController` (管理后台 - MES 设备点检记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/check-record/create` | 创建设备点检记录 | `CommonResult<Long>` | `@Valid @RequestBody MesDvCheckRecordSaveReqVO createReqVO` |
| `PUT` | `/mes/dv/check-record/update` | 更新设备点检记录 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvCheckRecordSaveReqVO updateReqVO` |
| `PUT` | `/mes/dv/check-record/submit` | 提交设备点检记录（草稿→已完成） | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/mes/dv/check-record/delete` | 删除设备点检记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/check-record/get` | 获得设备点检记录 | `CommonResult<MesDvCheckRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/check-record/page` | 获得设备点检记录分页 | `CommonResult<PageResult<MesDvCheckRecordRespVO>>` | `@Valid MesDvCheckRecordPageReqVO pageReqVO` |
| `GET` | `/mes/dv/check-record/export-excel` | 导出设备点检记录 Excel | `void` | `@Valid MesDvCheckRecordPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesDvCheckRecordDO> list = checkRecordService.getCheckRecordPage(pageReqVO).getList(); ExcelUtils.write(response, "设备点检记录.xls", "数据", MesDvCheckRecordRespVO.class, buildCheckRecordRespVOList(list)); } // ==================== 拼接 VO ==================== @SuppressWarnings("DuplicatedCode") private List<MesDvCheckRecordRespVO> buildCheckRecordRespVOList(List<MesDvCheckRecordDO> list` |

### 📦 `MesDvCheckRecordLineController` (管理后台 - MES 设备点检记录明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/check-record-line/create` | 创建设备点检记录明细 | `CommonResult<Long>` | `@Valid @RequestBody MesDvCheckRecordLineSaveReqVO createReqVO` |
| `PUT` | `/mes/dv/check-record-line/update` | 更新设备点检记录明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvCheckRecordLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/dv/check-record-line/delete` | 删除设备点检记录明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/check-record-line/get` | 获得设备点检记录明细 | `CommonResult<MesDvCheckRecordLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/check-record-line/page` | 获得设备点检记录明细分页 | `CommonResult<PageResult<MesDvCheckRecordLineRespVO>>` | `@Valid MesDvCheckRecordLinePageReqVO pageReqVO` |
| `GET` | `/mes/dv/check-record-line/list-by-record-id` | 获得指定点检记录的明细列表 | `CommonResult<List<MesDvCheckRecordLineRespVO>>` | `@RequestParam("recordId") Long recordId` |

### 📦 `MesDvMachineryController` (管理后台 - MES 设备台账)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/machinery/create` | 创建设备 | `CommonResult<Long>` | `@Valid @RequestBody MesDvMachinerySaveReqVO createReqVO` |
| `PUT` | `/mes/dv/machinery/update` | 更新设备 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvMachinerySaveReqVO updateReqVO` |
| `DELETE` | `/mes/dv/machinery/delete` | 删除设备 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/machinery/get` | 获得设备 | `CommonResult<MesDvMachineryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/machinery/page` | 获得设备分页 | `CommonResult<PageResult<MesDvMachineryRespVO>>` | `@Valid MesDvMachineryPageReqVO pageReqVO` |
| `GET` | `/mes/dv/machinery/export-excel` | 导出设备 Excel | `void` | `@Valid MesDvMachineryPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesDvMachineryDO> list = machineryService.getMachineryPage(pageReqVO).getList(); // 导出 Excel ExcelUtils.write(response, "设备台账.xls", "数据", MesDvMachineryRespVO.class, buildMachineryRespVOList(list)); } @GetMapping("/simple-list") @Operation(summary = "获得设备精简列表", description = "主要用于前端的下拉选项") @PreAuthorize("@ss.hasPermission('mes:dv-machinery:query')") public CommonResult<List<MesDvMachineryRespVO>> getMachinerySimpleList(` |
| `GET` | `/mes/dv/machinery/get-import-template` | 获得设备导入模板 | `void` | `HttpServletResponse response) throws IOException { // 手动创建导出 demo List<MesDvMachineryImportExcelVO> list = Collections.singletonList( MesDvMachineryImportExcelVO.builder().code("EQ-001").name("示例设备") .brand("示例品牌").specification("型号A").machineryTypeCode("MT-001") .workshopCode("WS-001").status(0).build() ); // 输出 ExcelUtils.write(response, "设备导入模板.xls", "设备列表", MesDvMachineryImportExcelVO.class, list); } @PostMapping("/import") @Operation(summary = "导入设备") @Parameters({ @Parameter(name = "file", description = "Excel 文件", required = true), @Parameter(name = "updateSupport", description = "是否支持更新，默认为 false", example = "true") }) @PreAuthorize("@ss.hasPermission('mes:dv-machinery:import')") public CommonResult<MesDvMachineryImportRespVO> importExcel(@RequestParam("file") MultipartFile file, @RequestParam(value = "updateSupport", required = false, defaultValue = "false") Boolean updateSupport) throws Exception { List<MesDvMachineryImportExcelVO> list = ExcelUtils.read(file, MesDvMachineryImportExcelVO.class); return success(machineryService.importMachineryList(list, updateSupport)); } // ==================== 拼接 VO ==================== private List<MesDvMachineryRespVO> buildMachineryRespVOList(List<MesDvMachineryDO> list` |

### 📦 `MesDvMachineryTypeController` (管理后台 - MES 设备类型)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/machinery-type/create` | 创建设备类型 | `CommonResult<Long>` | `@Valid @RequestBody MesDvMachineryTypeSaveReqVO createReqVO` |
| `PUT` | `/mes/dv/machinery-type/update` | 更新设备类型 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvMachineryTypeSaveReqVO updateReqVO` |
| `DELETE` | `/mes/dv/machinery-type/delete` | 删除设备类型 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/machinery-type/get` | 获得设备类型 | `CommonResult<MesDvMachineryTypeRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/machinery-type/list` | 获得设备类型列表 | `CommonResult<List<MesDvMachineryTypeRespVO>>` | `@Valid MesDvMachineryTypeListReqVO listReqVO` |
| `GET` | `/mes/dv/machinery-type/simple-list` | 获得设备类型精简列表 | `CommonResult<List<MesDvMachineryTypeRespVO>>` | `-` |

### 📦 `MesDvMaintenRecordController` (管理后台 - MES 设备保养记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/mainten-record/create` | 创建设备保养记录 | `CommonResult<Long>` | `@Valid @RequestBody MesDvMaintenRecordSaveReqVO createReqVO` |
| `PUT` | `/mes/dv/mainten-record/update` | 更新设备保养记录 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvMaintenRecordSaveReqVO updateReqVO` |
| `DELETE` | `/mes/dv/mainten-record/delete` | 删除设备保养记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/mainten-record/get` | 获得设备保养记录 | `CommonResult<MesDvMaintenRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/mainten-record/page` | 获得设备保养记录分页 | `CommonResult<PageResult<MesDvMaintenRecordRespVO>>` | `@Valid MesDvMaintenRecordPageReqVO pageReqVO` |
| `GET` | `/mes/dv/mainten-record/export-excel` | 导出设备保养记录 Excel | `void` | `@Valid MesDvMaintenRecordPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesDvMaintenRecordDO> list = maintenRecordService.getMaintenRecordPage(pageReqVO).getList(); // 导出 Excel ExcelUtils.write(response, "设备保养记录.xls", "数据", MesDvMaintenRecordRespVO.class, buildMaintenRecordRespVOList(list)); } @PutMapping("/submit") @Operation(summary = "提交设备保养记录（草稿→已提交）") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:dv-mainten-record:update')") public CommonResult<Boolean> submitMaintenRecord(@RequestParam("id") Long id` |

### 📦 `MesDvMaintenRecordLineController` (管理后台 - MES 设备保养记录明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/mainten-record-line/create` | 创建设备保养记录明细 | `CommonResult<Long>` | `@Valid @RequestBody MesDvMaintenRecordLineSaveReqVO createReqVO` |
| `PUT` | `/mes/dv/mainten-record-line/update` | 更新设备保养记录明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvMaintenRecordLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/dv/mainten-record-line/delete` | 删除设备保养记录明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/mainten-record-line/get` | 获得设备保养记录明细 | `CommonResult<MesDvMaintenRecordLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/mainten-record-line/page` | 获得设备保养记录明细分页 | `CommonResult<PageResult<MesDvMaintenRecordLineRespVO>>` | `@Valid MesDvMaintenRecordLinePageReqVO pageReqVO` |
| `GET` | `/mes/dv/mainten-record-line/list-by-record-id` | 获得指定保养记录的明细列表 | `CommonResult<List<MesDvMaintenRecordLineRespVO>>` | `@RequestParam("recordId") Long recordId` |
| `GET` | `/mes/dv/mainten-record-line/export-excel` | 导出设备保养记录明细 Excel | `void` | `@Valid MesDvMaintenRecordLinePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesDvMaintenRecordLineDO> list = maintenRecordLineService.getMaintenRecordLinePage(pageReqVO).getList(); // 导出 Excel ExcelUtils.write(response, "设备保养记录明细.xls", "数据", MesDvMaintenRecordLineRespVO.class, buildMaintenRecordLineRespVOList(list)); } // ==================== 拼接 VO ==================== private List<MesDvMaintenRecordLineRespVO> buildMaintenRecordLineRespVOList(List<MesDvMaintenRecordLineDO> list` |

### 📦 `MesDvRepairController` (管理后台 - MES 维修工单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/repair/create` | 创建维修工单 | `CommonResult<Long>` | `@Valid @RequestBody MesDvRepairSaveReqVO createReqVO` |
| `PUT` | `/mes/dv/repair/update` | 更新维修工单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvRepairSaveReqVO updateReqVO` |
| `DELETE` | `/mes/dv/repair/delete` | 删除维修工单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/repair/get` | 获得维修工单 | `CommonResult<MesDvRepairRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/repair/page` | 获得维修工单分页 | `CommonResult<PageResult<MesDvRepairRespVO>>` | `@Valid MesDvRepairPageReqVO pageReqVO` |
| `GET` | `/mes/dv/repair/export-excel` | 导出维修工单 Excel | `void` | `@Valid MesDvRepairPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesDvRepairDO> list = repairService.getRepairPage(pageReqVO).getList(); // 导出 Excel ExcelUtils.write(response, "维修工单.xls", "数据", MesDvRepairRespVO.class, buildRepairRespVOList(list)); } // DONE @AI：submit=>confirm=>finish（然后里面有是 resultstatus 这样的字段【对齐实体？】） @PutMapping("/submit") @Operation(summary = "提交维修工单（草稿→维修中）") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:dv-repair:update')") public CommonResult<Boolean> submitRepair(@RequestParam("id") Long id` |
| `PUT` | `/mes/dv/repair/confirm` | 确认维修完成（维修中→待验收） | `CommonResult<Boolean>` | `@Valid @RequestBody cn.iocoder.yudao.module.mes.controller.admin.dv.repair.vo.MesDvRepairConfirmReqVO confirmReqVO` |
| `PUT` | `/mes/dv/repair/finish` | 完成验收（待验收→已确认） | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("result") Integer result` |

### 📦 `MesDvRepairLineController` (管理后台 - MES 维修工单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/repair-line/create` | 创建维修工单行 | `CommonResult<Long>` | `@Valid @RequestBody MesDvRepairLineSaveReqVO createReqVO` |
| `PUT` | `/mes/dv/repair-line/update` | 更新维修工单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvRepairLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/dv/repair-line/delete` | 删除维修工单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/repair-line/get` | 获得维修工单行 | `CommonResult<MesDvRepairLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/repair-line/page` | 获得维修工单行分页 | `CommonResult<PageResult<MesDvRepairLineRespVO>>` | `@Valid MesDvRepairLinePageReqVO pageReqVO` |
| `GET` | `/mes/dv/repair-line/list-by-repair-id` | 获得指定维修工单的明细列表 | `CommonResult<List<MesDvRepairLineRespVO>>` | `@RequestParam("repairId") Long repairId` |
| `GET` | `/mes/dv/repair-line/export-excel` | 导出维修工单行 Excel | `void` | `@Valid MesDvRepairLinePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesDvRepairLineDO> list = repairLineService.getRepairLinePage(pageReqVO).getList(); // 导出 Excel ExcelUtils.write(response, "维修工单行.xls", "数据", MesDvRepairLineRespVO.class, buildRepairLineRespVOList(list)); } // ==================== 拼接 VO ==================== private List<MesDvRepairLineRespVO> buildRepairLineRespVOList(List<MesDvRepairLineDO> list` |

### 📦 `MesDvSubjectController` (管理后台 - MES 点检保养项目)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/dv/subject/create` | 创建点检保养项目 | `CommonResult<Long>` | `@Valid @RequestBody MesDvSubjectSaveReqVO createReqVO` |
| `PUT` | `/mes/dv/subject/update` | 更新点检保养项目 | `CommonResult<Boolean>` | `@Valid @RequestBody MesDvSubjectSaveReqVO updateReqVO` |
| `DELETE` | `/mes/dv/subject/delete` | 删除点检保养项目 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/subject/get` | 获得点检保养项目 | `CommonResult<MesDvSubjectRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/dv/subject/page` | 获得点检保养项目分页 | `CommonResult<PageResult<MesDvSubjectRespVO>>` | `@Valid MesDvSubjectPageReqVO pageReqVO` |
| `GET` | `/mes/dv/subject/simple-list` | 获得点检保养项目精简列表 | `CommonResult<List<MesDvSubjectRespVO>>` | `-` |

### 📦 `MesHomeStatisticsController` (管理后台 - MES 首页统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/home-statistics/summary` | 获得首页汇总统计 | `CommonResult<MesHomeSummaryRespVO>` | `-` |
| `GET` | `/mes/home-statistics/work-order-status` | 获得工单状态分布 | `CommonResult<List<MesHomeWorkOrderStatusRespVO>>` | `-` |
| `GET` | `/mes/home-statistics/production-trend` | 获得生产趋势 | `CommonResult<List<MesHomeProductionTrendRespVO>>` | `@RequestParam(value = "days", defaultValue = "7") @Min(1) @Max(90) Integer days` |

### 📦 `MesMdAutoCodePartController` (管理后台 - MES 编码规则组成)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md/auto-code-part/create` | 创建规则组成 | `CommonResult<Long>` | `@Valid @RequestBody MesMdAutoCodePartSaveReqVO createReqVO` |
| `PUT` | `/mes/md/auto-code-part/update` | 更新规则组成 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdAutoCodePartSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md/auto-code-part/delete` | 删除规则组成 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/auto-code-part/get` | 获得规则组成 | `CommonResult<MesMdAutoCodePartRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/auto-code-part/list-by-rule-id` | 根据规则 ID 获得规则组成列表 | `CommonResult<List<MesMdAutoCodePartRespVO>>` | `@RequestParam("ruleId") Long ruleId` |

### 📦 `MesMdAutoCodeRecordController` (管理后台 - MES 编码生成记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md/auto-code-record/generate` | 生成编码 | `CommonResult<String>` | `@Valid @RequestBody MesMdAutoCodeGenerateReqVO generateReqVO` |

### 📦 `MesMdAutoCodeRuleController` (管理后台 - MES 编码规则)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md/auto-code-rule/create` | 创建编码规则 | `CommonResult<Long>` | `@Valid @RequestBody MesMdAutoCodeRuleSaveReqVO createReqVO` |
| `PUT` | `/mes/md/auto-code-rule/update` | 更新编码规则 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdAutoCodeRuleSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md/auto-code-rule/delete` | 删除编码规则 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/auto-code-rule/get` | 获得编码规则 | `CommonResult<MesMdAutoCodeRuleRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/auto-code-rule/page` | 获得编码规则分页 | `CommonResult<PageResult<MesMdAutoCodeRuleRespVO>>` | `@Valid MesMdAutoCodeRulePageReqVO pageReqVO` |
| `GET` | `/mes/md/auto-code-rule/simple-list` | 获得编码规则精简列表 | `CommonResult<List<MesMdAutoCodeRuleRespVO>>` | `-` |

### 📦 `MesMdClientController` (管理后台 - MES 客户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md-client/create` | 创建客户 | `CommonResult<Long>` | `@Valid @RequestBody MesMdClientSaveReqVO createReqVO` |
| `PUT` | `/mes/md-client/update` | 更新客户 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdClientSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md-client/delete` | 删除客户 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-client/get` | 获得客户 | `CommonResult<MesMdClientRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-client/page` | 获得客户分页 | `CommonResult<PageResult<MesMdClientRespVO>>` | `@Valid MesMdClientPageReqVO pageReqVO` |

### 📦 `MesMdItemBatchConfigController` (管理后台 - MES 物料批次属性配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/md/item-batch-config/get-by-item-id` | 根据物料编号获取批次属性配置 | `CommonResult<MesMdItemBatchConfigRespVO>` | `@RequestParam("itemId") Long itemId` |
| `POST` | `/mes/md/item-batch-config/save` | 保存批次属性配置（新增或更新） | `CommonResult<Long>` | `@Valid @RequestBody MesMdItemBatchConfigSaveReqVO saveReqVO` |

### 📦 `MesMdItemController` (管理后台 - MES 物料产品)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md/item/create` | 创建物料产品 | `CommonResult<Long>` | `@Valid @RequestBody MesMdItemSaveReqVO createReqVO` |
| `PUT` | `/mes/md/item/update` | 更新物料产品 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdItemSaveReqVO updateReqVO` |
| `PUT` | `/mes/md/item/update-status` | 更新物料产品状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/mes/md/item/delete` | 删除物料产品 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/item/get` | 获得物料产品 | `CommonResult<MesMdItemRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/item/page` | 获得物料产品分页 | `CommonResult<PageResult<MesMdItemRespVO>>` | `@Valid MesMdItemPageReqVO pageReqVO` |
| `GET` | `/mes/md/item/export-excel` | 导出物料产品 Excel | `void` | `@Valid MesMdItemPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesMdItemDO> pageResult = itemService.getItemPage(pageReqVO); // 导出 Excel ExcelUtils.write(response, "物料产品.xls", "数据", MesMdItemRespVO.class, buildItemVOList(pageResult.getList())); } @GetMapping("/get-import-template") @Operation(summary = "获得物料导入模板") public void importTemplate(HttpServletResponse response) throws IOException { // 手动创建导出 demo List<MesMdItemImportExcelVO> list = Collections.singletonList( MesMdItemImportExcelVO.builder().code("ITEM001").name("螺丝").specification("M6*20") .unitMeasureCode("PCS").itemTypeId(1L).status(0).build() ); // 输出 ExcelUtils.write(response, "物料导入模板.xls", "物料列表", MesMdItemImportExcelVO.class, list); } @PostMapping("/import") @Operation(summary = "导入物料") @Parameters({ @Parameter(name = "file", description = "Excel 文件", required = true), @Parameter(name = "updateSupport", description = "是否支持更新，默认为 false", example = "true") }) @PreAuthorize("@ss.hasPermission('mes:md-item:import')") public CommonResult<MesMdItemImportRespVO> importExcel(@RequestParam("file") MultipartFile file, @RequestParam(value = "updateSupport", required = false, defaultValue = "false") Boolean updateSupport) throws Exception { List<MesMdItemImportExcelVO> list = ExcelUtils.read(file, MesMdItemImportExcelVO.class); return success(itemService.importItemList(list, updateSupport)); } // ==================== 拼接 VO ==================== private List<MesMdItemRespVO> buildItemVOList(List<MesMdItemDO> list` |

### 📦 `MesMdItemTypeController` (管理后台 - MES 物料产品分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md/item-type/create` | 创建物料产品分类 | `CommonResult<Long>` | `@Valid @RequestBody MesMdItemTypeSaveReqVO createReqVO` |
| `PUT` | `/mes/md/item-type/update` | 更新物料产品分类 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdItemTypeSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md/item-type/delete` | 删除物料产品分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/item-type/get` | 获得物料产品分类 | `CommonResult<MesMdItemTypeRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/item-type/list` | 获得物料产品分类列表 | `CommonResult<List<MesMdItemTypeRespVO>>` | `@Valid MesMdItemTypeListReqVO listReqVO` |
| `GET` | `/mes/md/item-type/simple-list` | 获得物料产品分类精简列表 | `CommonResult<List<MesMdItemTypeRespVO>>` | `-` |

### 📦 `MesMdProductBomController` (管理后台 - MES 产品BOM)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md/product-bom/create` | 创建产品BOM | `CommonResult<Long>` | `@Valid @RequestBody MesMdProductBomSaveReqVO createReqVO` |
| `PUT` | `/mes/md/product-bom/update` | 更新产品BOM | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdProductBomSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md/product-bom/delete` | 删除产品BOM | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/product-bom/get` | 获得产品BOM | `CommonResult<MesMdProductBomRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/product-bom/page` | 获得产品BOM分页 | `CommonResult<PageResult<MesMdProductBomRespVO>>` | `@Valid MesMdProductBomPageReqVO pageReqVO` |
| `GET` | `/mes/md/product-bom/list-by-item-id` | 根据物料产品编号获得产品BOM列表 | `CommonResult<List<MesMdProductBomRespVO>>` | `@RequestParam("itemId") Long itemId` |

### 📦 `MesMdProductSipController` (管理后台 - MES 产品SIP)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md/product-sip/create` | 创建产品SIP | `CommonResult<Long>` | `@Valid @RequestBody MesMdProductSipSaveReqVO createReqVO` |
| `PUT` | `/mes/md/product-sip/update` | 更新产品SIP | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdProductSipSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md/product-sip/delete` | 删除产品SIP | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/product-sip/get` | 获得产品SIP | `CommonResult<MesMdProductSipRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/product-sip/page` | 获得产品SIP分页 | `CommonResult<PageResult<MesMdProductSipRespVO>>` | `@Valid MesMdProductSipPageReqVO pageReqVO` |
| `GET` | `/mes/md/product-sip/list-by-item-id` | 根据物料产品编号，获得产品SIP列表 | `CommonResult<List<MesMdProductSipRespVO>>` | `@RequestParam("itemId") Long itemId` |

### 📦 `MesMdProductSopController` (管理后台 - MES 产品SOP)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md/product-sop/create` | 创建产品SOP | `CommonResult<Long>` | `@Valid @RequestBody MesMdProductSopSaveReqVO createReqVO` |
| `PUT` | `/mes/md/product-sop/update` | 更新产品SOP | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdProductSopSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md/product-sop/delete` | 删除产品SOP | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/product-sop/get` | 获得产品SOP | `CommonResult<MesMdProductSopRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/product-sop/page` | 获得产品SOP分页 | `CommonResult<PageResult<MesMdProductSopRespVO>>` | `@Valid MesMdProductSopPageReqVO pageReqVO` |
| `GET` | `/mes/md/product-sop/list-by-item-id` | 根据物料产品编号，获得产品SOP列表 | `CommonResult<List<MesMdProductSopRespVO>>` | `@RequestParam("itemId") Long itemId` |

### 📦 `MesMdUnitMeasureController` (管理后台 - MES 计量单位)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md/unit-measure/create` | 创建计量单位 | `CommonResult<Long>` | `@Valid @RequestBody MesMdUnitMeasureSaveReqVO createReqVO` |
| `PUT` | `/mes/md/unit-measure/update` | 更新计量单位 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdUnitMeasureSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md/unit-measure/delete` | 删除计量单位 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/unit-measure/get` | 获得计量单位 | `CommonResult<MesMdUnitMeasureRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md/unit-measure/page` | 获得计量单位分页 | `CommonResult<PageResult<MesMdUnitMeasureRespVO>>` | `@Valid MesMdUnitMeasurePageReqVO pageReqVO` |
| `GET` | `/mes/md/unit-measure/simple-list` | 获得计量单位精简列表 | `CommonResult<List<MesMdUnitMeasureRespVO>>` | `-` |

### 📦 `MesMdVendorController` (管理后台 - MES 供应商)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md-vendor/create` | 创建供应商 | `CommonResult<Long>` | `@Valid @RequestBody MesMdVendorSaveReqVO createReqVO` |
| `PUT` | `/mes/md-vendor/update` | 更新供应商 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdVendorSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md-vendor/delete` | 删除供应商 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-vendor/get` | 获得供应商 | `CommonResult<MesMdVendorRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-vendor/page` | 获得供应商分页 | `CommonResult<PageResult<MesMdVendorRespVO>>` | `@Valid MesMdVendorPageReqVO pageReqVO` |

### 📦 `MesMdWorkshopController` (管理后台 - MES 车间)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md-workshop/create` | 创建车间 | `CommonResult<Long>` | `@Valid @RequestBody MesMdWorkshopSaveReqVO createReqVO` |
| `PUT` | `/mes/md-workshop/update` | 更新车间 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdWorkshopSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md-workshop/delete` | 删除车间 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-workshop/get` | 获得车间 | `CommonResult<MesMdWorkshopRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-workshop/page` | 获得车间分页 | `CommonResult<PageResult<MesMdWorkshopRespVO>>` | `@Valid MesMdWorkshopPageReqVO pageReqVO` |
| `GET` | `/mes/md-workshop/simple-list` | 获得车间精简列表 | `CommonResult<List<MesMdWorkshopRespVO>>` | `-` |
| `GET` | `/mes/md-workshop/export-excel` | 导出车间 Excel | `void` | `@Valid MesMdWorkshopPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesMdWorkshopDO> list = workshopService.getWorkshopPage(pageReqVO).getList(); List<MesMdWorkshopRespVO> voList = buildWorkshopRespVOList(list); ExcelUtils.write(response, "车间.xls", "数据", MesMdWorkshopRespVO.class, voList); } // ==================== 拼接 VO ==================== private List<MesMdWorkshopRespVO> buildWorkshopRespVOList(List<MesMdWorkshopDO> list` |

### 📦 `MesMdWorkstationController` (管理后台 - MES 工作站)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md-workstation/create` | 创建工作站 | `CommonResult<Long>` | `@Valid @RequestBody MesMdWorkstationSaveReqVO createReqVO` |
| `PUT` | `/mes/md-workstation/update` | 更新工作站 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdWorkstationSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md-workstation/delete` | 删除工作站 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-workstation/get` | 获得工作站 | `CommonResult<MesMdWorkstationRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-workstation/page` | 获得工作站分页 | `CommonResult<PageResult<MesMdWorkstationRespVO>>` | `@Valid MesMdWorkstationPageReqVO pageReqVO` |
| `GET` | `/mes/md-workstation/export-excel` | 导出工作站 Excel | `void` | `@Valid MesMdWorkstationPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesMdWorkstationDO> list = workstationService.getWorkstationPage(pageReqVO).getList(); List<MesMdWorkstationRespVO> voList = buildWorkstationRespVOList(list); ExcelUtils.write(response, "工作站.xls", "数据", MesMdWorkstationRespVO.class, voList); } // ==================== 拼接 VO ==================== @SuppressWarnings("CodeBlock2Expr") private List<MesMdWorkstationRespVO> buildWorkstationRespVOList(List<MesMdWorkstationDO> list` |

### 📦 `MesMdWorkstationMachineController` (管理后台 - MES 设备资源)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md-workstation-machine/create` | 创建设备资源 | `CommonResult<Long>` | `@Valid @RequestBody MesMdWorkstationMachineSaveReqVO createReqVO` |
| `DELETE` | `/mes/md-workstation-machine/delete` | 删除设备资源 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-workstation-machine/list-by-workstation` | 获得设备资源列表 | `CommonResult<List<MesMdWorkstationMachineRespVO>>` | `@RequestParam("workstationId") Long workstationId` |

### 📦 `MesMdWorkstationToolController` (管理后台 - MES 工装夹具资源)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md-workstation-tool/create` | 创建工装夹具资源 | `CommonResult<Long>` | `@Valid @RequestBody MesMdWorkstationToolSaveReqVO createReqVO` |
| `PUT` | `/mes/md-workstation-tool/update` | 更新工装夹具资源 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdWorkstationToolSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md-workstation-tool/delete` | 删除工装夹具资源 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-workstation-tool/list-by-workstation` | 获得工装夹具资源列表 | `CommonResult<List<MesMdWorkstationToolRespVO>>` | `@RequestParam("workstationId") Long workstationId` |

### 📦 `MesMdWorkstationWorkerController` (管理后台 - MES 人力资源)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/md-workstation-worker/create` | 创建人力资源 | `CommonResult<Long>` | `@Valid @RequestBody MesMdWorkstationWorkerSaveReqVO createReqVO` |
| `PUT` | `/mes/md-workstation-worker/update` | 更新人力资源 | `CommonResult<Boolean>` | `@Valid @RequestBody MesMdWorkstationWorkerSaveReqVO updateReqVO` |
| `DELETE` | `/mes/md-workstation-worker/delete` | 删除人力资源 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/md-workstation-worker/list-by-workstation` | 获得人力资源列表 | `CommonResult<List<MesMdWorkstationWorkerRespVO>>` | `@RequestParam("workstationId") Long workstationId` |

### 📦 `MesProAndonConfigController` (管理后台 - MES 安灯呼叫配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/andon-config/create` | 创建安灯呼叫配置 | `CommonResult<Long>` | `@Valid @RequestBody MesProAndonConfigSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/andon-config/update` | 更新安灯呼叫配置 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProAndonConfigSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/andon-config/delete` | 删除安灯呼叫配置 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/andon-config/get` | 获得安灯呼叫配置 | `CommonResult<MesProAndonConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/andon-config/page` | 获得安灯呼叫配置分页 | `CommonResult<PageResult<MesProAndonConfigRespVO>>` | `@Valid MesProAndonConfigPageReqVO pageReqVO` |
| `GET` | `/mes/pro/andon-config/list` | 获得安灯呼叫配置列表 | `CommonResult<List<MesProAndonConfigRespVO>>` | `-` |

### 📦 `MesProAndonRecordController` (管理后台 - MES 安灯呼叫记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/andon-record/create` | 创建安灯呼叫记录 | `CommonResult<Long>` | `@Valid @RequestBody MesProAndonRecordCreateReqVO createReqVO` |
| `DELETE` | `/mes/pro/andon-record/delete` | 删除安灯呼叫记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/pro/andon-record/update` | 更新安灯呼叫记录 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProAndonRecordUpdateReqVO updateReqVO` |
| `GET` | `/mes/pro/andon-record/get` | 获得安灯呼叫记录 | `CommonResult<MesProAndonRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/andon-record/page` | 获得安灯呼叫记录分页 | `CommonResult<PageResult<MesProAndonRecordRespVO>>` | `@Valid MesProAndonRecordPageReqVO pageReqVO` |
| `GET` | `/mes/pro/andon-record/export-excel` | 导出安灯呼叫记录 Excel | `void` | `@Valid MesProAndonRecordPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesProAndonRecordDO> list = andonRecordService.getAndonRecordPage(pageReqVO).getList(); List<MesProAndonRecordRespVO> voList = buildRecordRespVOList(list); ExcelUtils.write(response, "安灯呼叫记录.xls", "数据", MesProAndonRecordRespVO.class, voList); } // ==================== 拼接 VO ==================== private List<MesProAndonRecordRespVO> buildRecordRespVOList(List<MesProAndonRecordDO> list` |

### 📦 `MesProCardController` (管理后台 - MES 生产流转卡)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/card/create` | 创建生产流转卡 | `CommonResult<Long>` | `@Valid @RequestBody MesProCardSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/card/update` | 更新生产流转卡 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProCardSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/card/delete` | 删除生产流转卡 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/pro/card/submit` | 提交生产流转卡 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/pro/card/finish` | 完成生产流转卡 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/pro/card/cancel` | 取消生产流转卡 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/card/get` | 获得生产流转卡 | `CommonResult<MesProCardRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/card/page` | 获得生产流转卡分页 | `CommonResult<PageResult<MesProCardRespVO>>` | `@Valid MesProCardPageReqVO pageReqVO` |
| `GET` | `/mes/pro/card/export-excel` | 导出生产流转卡 Excel | `void` | `@Valid MesProCardPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesProCardDO> list = cardService.getCardPage(pageReqVO).getList(); List<MesProCardRespVO> voList = buildCardRespVOList(list); ExcelUtils.write(response, "生产流转卡.xls", "数据", MesProCardRespVO.class, voList); } // ==================== 拼接 VO ==================== private List<MesProCardRespVO> buildCardRespVOList(List<MesProCardDO> list` |

### 📦 `MesProCardProcessController` (管理后台 - MES 流转卡工序记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/card-process/create` | 创建流转卡工序记录 | `CommonResult<Long>` | `@Valid @RequestBody MesProCardProcessSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/card-process/update` | 更新流转卡工序记录 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProCardProcessSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/card-process/delete` | 删除流转卡工序记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/card-process/get` | 获得流转卡工序记录 | `CommonResult<MesProCardProcessRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/card-process/page` | 获得流转卡工序记录分页 | `CommonResult<PageResult<MesProCardProcessRespVO>>` | `@Valid MesProCardProcessPageReqVO pageReqVO` |

### 📦 `MesProFeedbackController` (管理后台 - MES 生产报工)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/feedback/create` | 创建生产报工 | `CommonResult<Long>` | `@Valid @RequestBody MesProFeedbackSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/feedback/update` | 更新生产报工 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProFeedbackSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/feedback/delete` | 删除生产报工 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/feedback/get` | 获得生产报工 | `CommonResult<MesProFeedbackRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/feedback/page` | 获得生产报工分页 | `CommonResult<PageResult<MesProFeedbackRespVO>>` | `@Valid MesProFeedbackPageReqVO pageReqVO` |
| `GET` | `/mes/pro/feedback/export-excel` | 导出生产报工 Excel | `void` | `@Valid MesProFeedbackPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesProFeedbackDO> list = feedbackService.getFeedbackPage(pageReqVO).getList(); List<MesProFeedbackRespVO> voList = buildFeedbackRespVOList(list); ExcelUtils.write(response, "生产报工.xls", "数据", MesProFeedbackRespVO.class, voList); } @PutMapping("/submit") @Operation(summary = "提交报工") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:pro-feedback:update')") public CommonResult<Boolean> submitFeedback(@RequestParam("id") Long id` |
| `PUT` | `/mes/pro/feedback/reject` | 驳回报工 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/pro/feedback/approve` | 审批报工 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesProProcessContentController` (管理后台 - MES 生产工序内容)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/process-content/create` | 创建生产工序内容 | `CommonResult<Long>` | `@Valid @RequestBody MesProProcessContentSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/process-content/update` | 更新生产工序内容 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProProcessContentSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/process-content/delete` | 删除生产工序内容 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/process-content/get` | 获得生产工序内容 | `CommonResult<MesProProcessContentRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/process-content/list-by-process` | 获得生产工序内容列表（按工序编号） | `CommonResult<List<MesProProcessContentRespVO>>` | `@RequestParam("processId") Long processId` |

### 📦 `MesProProcessController` (管理后台 - MES 生产工序)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/process/create` | 创建生产工序 | `CommonResult<Long>` | `@Valid @RequestBody MesProProcessSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/process/update` | 更新生产工序 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProProcessSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/process/delete` | 删除生产工序 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/process/get` | 获得生产工序 | `CommonResult<MesProProcessRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/process/page` | 获得生产工序分页 | `CommonResult<PageResult<MesProProcessRespVO>>` | `@Valid MesProProcessPageReqVO pageReqVO` |
| `GET` | `/mes/pro/process/simple-list` | 获得生产工序精简列表 | `CommonResult<List<MesProProcessRespVO>>` | `-` |

### 📦 `MesProRouteController` (管理后台 - MES 工艺路线)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/route/create` | 创建工艺路线 | `CommonResult<Long>` | `@Valid @RequestBody MesProRouteSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/route/update` | 更新工艺路线 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProRouteSaveReqVO updateReqVO` |
| `PUT` | `/mes/pro/route/update-status` | 更新工艺路线状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/mes/pro/route/delete` | 删除工艺路线 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/route/get` | 获得工艺路线 | `CommonResult<MesProRouteRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/route/page` | 获得工艺路线分页 | `CommonResult<PageResult<MesProRouteRespVO>>` | `@Valid MesProRoutePageReqVO pageReqVO` |
| `GET` | `/mes/pro/route/simple-list` | 获得工艺路线精简列表 | `CommonResult<List<MesProRouteRespVO>>` | `-` |

### 📦 `MesProRouteProcessController` (管理后台 - MES 工艺路线工序)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/route-process/create` | 创建工艺路线工序 | `CommonResult<Long>` | `@Valid @RequestBody MesProRouteProcessSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/route-process/update` | 更新工艺路线工序 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProRouteProcessSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/route-process/delete` | 删除工艺路线工序 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/route-process/get` | 获得工艺路线工序 | `CommonResult<MesProRouteProcessRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/route-process/list-by-product` | 按产品获得工序列表 | `CommonResult<List<MesProRouteProcessRespVO>>` | `@RequestParam("productId") Long productId` |
| `GET` | `/mes/pro/route-process/list-by-route` | 按工艺路线获得工序列表 | `CommonResult<List<MesProRouteProcessRespVO>>` | `@RequestParam("routeId") Long routeId` |
| `GET` | `/mes/pro/route-process/get-by-route-and-process` | 按工艺路线+工序获得工序配置 | `CommonResult<MesProRouteProcessRespVO>` | `@RequestParam("routeId") Long routeId, @RequestParam("processId") Long processId` |

### 📦 `MesProRouteProductBomController` (管理后台 - MES 工艺路线产品 BOM)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/route-product-bom/create` | 创建工艺路线产品 BOM | `CommonResult<Long>` | `@Valid @RequestBody MesProRouteProductBomSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/route-product-bom/update` | 更新工艺路线产品 BOM | `CommonResult<Boolean>` | `@Valid @RequestBody MesProRouteProductBomSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/route-product-bom/delete` | 删除工艺路线产品 BOM | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/route-product-bom/get` | 获得工艺路线产品 BOM | `CommonResult<MesProRouteProductBomRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/route-product-bom/list` | 查询工艺路线产品 BOM 列表 | `CommonResult<List<MesProRouteProductBomRespVO>>` | `@RequestParam("routeId") Long routeId, @RequestParam(value = "processId", required = false) Long processId, @RequestParam(value = "productId", required = false) Long productId` |

### 📦 `MesProRouteProductController` (管理后台 - MES 工艺路线产品)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/route-product/create` | 创建工艺路线产品 | `CommonResult<Long>` | `@Valid @RequestBody MesProRouteProductSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/route-product/update` | 更新工艺路线产品 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProRouteProductSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/route-product/delete` | 删除工艺路线产品 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/route-product/get` | 获得工艺路线产品 | `CommonResult<MesProRouteProductRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/route-product/list-by-route` | 按工艺路线获得产品列表 | `CommonResult<List<MesProRouteProductRespVO>>` | `@RequestParam("routeId") Long routeId` |

### 📦 `MesProTaskController` (管理后台 - MES 生产任务)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/task/create` | 创建生产任务 | `CommonResult<Long>` | `@Valid @RequestBody MesProTaskSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/task/update` | 更新生产任务 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProTaskSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/task/delete` | 删除生产任务 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/task/get` | 获得生产任务 | `CommonResult<MesProTaskRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/task/page` | 获得生产任务分页 | `CommonResult<PageResult<MesProTaskRespVO>>` | `@Valid MesProTaskPageReqVO pageReqVO` |
| `GET` | `/mes/pro/task/gantt-list` | 获得甘特图任务列表 | `CommonResult<List<GanttDataRespVO>>` | `@Valid MesProWorkOrderPageReqVO reqVO` |
| `GET` | `/mes/pro/task/export-excel` | 导出生产任务 Excel | `void` | `@Valid MesProTaskPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesProTaskDO> list = taskService.getTaskPage(pageReqVO).getList(); List<MesProTaskRespVO> voList = buildTaskRespVOList(list); ExcelUtils.write(response, "生产任务.xls", "数据", MesProTaskRespVO.class, voList); } // ==================== 拼接 VO ==================== private List<MesProTaskRespVO> buildTaskRespVOList(List<MesProTaskDO> list` |

### 📦 `MesProTaskIssueController` (管理后台 - MES 生产任务投料)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/task-issue/create` | 创建生产任务投料 | `CommonResult<Long>` | `@Valid @RequestBody MesProTaskIssueSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/task-issue/update` | 更新生产任务投料 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProTaskIssueSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/task-issue/delete` | 删除生产任务投料 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/task-issue/get` | 获得生产任务投料 | `CommonResult<MesProTaskIssueRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/task-issue/page` | 获得生产任务投料分页 | `CommonResult<PageResult<MesProTaskIssueRespVO>>` | `@Valid MesProTaskIssuePageReqVO pageReqVO` |
| `GET` | `/mes/pro/task-issue/list-by-task` | 根据任务获得投料列表 | `CommonResult<List<MesProTaskIssueRespVO>>` | `@RequestParam("taskId") Long taskId` |

### 📦 `MesProWorkOrderBomController` (管理后台 - MES 生产工单 BOM)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/work-order-bom/create` | 创建工单 BOM | `CommonResult<Long>` | `@Valid @RequestBody MesProWorkOrderBomSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/work-order-bom/update` | 更新工单 BOM | `CommonResult<Boolean>` | `@Valid @RequestBody MesProWorkOrderBomSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/work-order-bom/delete` | 删除工单 BOM | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/work-order-bom/get` | 获得工单 BOM | `CommonResult<MesProWorkOrderBomRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/work-order-bom/page` | 获得工单 BOM 分页 | `CommonResult<PageResult<MesProWorkOrderBomRespVO>>` | `@Valid MesProWorkOrderBomPageReqVO pageReqVO` |
| `GET` | `/mes/pro/work-order-bom/list-by-work-order-id` | 获得工单 BOM 列表 | `CommonResult<List<MesProWorkOrderBomRespVO>>` | `@RequestParam("workOrderId") Long workOrderId` |
| `GET` | `/mes/pro/work-order-bom/item-list-by-work-order-id` | 获得工单物料需求列表 | `CommonResult<List<MesProWorkOrderItemRespVO>>` | `@RequestParam("workOrderId") Long workOrderId` |

### 📦 `MesProWorkOrderController` (管理后台 - MES 生产工单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/pro/work-order/create` | 创建生产工单 | `CommonResult<Long>` | `@Valid @RequestBody MesProWorkOrderSaveReqVO createReqVO` |
| `PUT` | `/mes/pro/work-order/update` | 更新生产工单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesProWorkOrderSaveReqVO updateReqVO` |
| `DELETE` | `/mes/pro/work-order/delete` | 删除生产工单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/work-order/get` | 获得生产工单 | `CommonResult<MesProWorkOrderRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/work-order/page` | 获得生产工单分页 | `CommonResult<PageResult<MesProWorkOrderRespVO>>` | `@Valid MesProWorkOrderPageReqVO pageReqVO` |
| `GET` | `/mes/pro/work-order/export-excel` | 导出生产工单 Excel | `void` | `@Valid MesProWorkOrderPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesProWorkOrderDO> list = workOrderService.getWorkOrderPage(pageReqVO).getList(); List<MesProWorkOrderRespVO> voList = buildWorkOrderRespVOList(list); ExcelUtils.write(response, "生产工单.xls", "数据", MesProWorkOrderRespVO.class, voList); } @PutMapping("/confirm") @Operation(summary = "确认工单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:pro-work-order:update')") public CommonResult<Boolean> confirmWorkOrder(@RequestParam("id") Long id` |
| `PUT` | `/mes/pro/work-order/finish` | 完成工单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/pro/work-order/cancel` | 取消工单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesProWorkRecordController` (管理后台 - MES 工作记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/pro/workrecord/log/page` | 获得工作记录流水分页 | `CommonResult<PageResult<MesProWorkRecordLogRespVO>>` | `@Valid MesProWorkRecordLogPageReqVO pageReqVO` |
| `GET` | `/mes/pro/workrecord/log/get` | 获得工作记录流水 | `CommonResult<MesProWorkRecordLogRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/pro/workrecord/log/export-excel` | 导出工作记录 Excel | `void` | `@Valid MesProWorkRecordLogPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesProWorkRecordLogDO> list = workRecordService.getWorkRecordLogPage(pageReqVO).getList(); List<MesProWorkRecordLogRespVO> voList = buildWorkRecordLogRespVOList(list); ExcelUtils.write(response, "工作记录.xls", "数据", MesProWorkRecordLogRespVO.class, voList); } @PutMapping("/clock-in") @Operation(summary = "上线（绑定工作站）") @Parameter(name = "workstationId", description = "工作站编号", required = true) @PreAuthorize("@ss.hasPermission('mes:pro-workrecord:clock')") public CommonResult<Long> clockInWorkRecord(@RequestParam("workstationId") Long workstationId` |
| `PUT` | `/mes/pro/workrecord/clock-out` | 下线（解绑工作站） | `CommonResult<Long>` | `-` |
| `GET` | `/mes/pro/workrecord/get-my` | 获取当前用户绑定的工作站状态 | `CommonResult<MesProWorkRecordRespVO>` | `-` |

### 📦 `MesQcDefectController` (管理后台 - MES 缺陷类型)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/defect/create` | 创建缺陷类型 | `CommonResult<Long>` | `@Valid @RequestBody MesQcDefectSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/defect/update` | 更新缺陷类型 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcDefectSaveReqVO updateReqVO` |
| `DELETE` | `/mes/qc/defect/delete` | 删除缺陷类型 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/defect/get` | 获得缺陷类型 | `CommonResult<MesQcDefectRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/defect/page` | 获得缺陷类型分页 | `CommonResult<PageResult<MesQcDefectRespVO>>` | `@Valid MesQcDefectPageReqVO pageReqVO` |
| `GET` | `/mes/qc/defect/simple-list` | 获得缺陷类型精简列表 | `CommonResult<List<MesQcDefectRespVO>>` | `-` |

### 📦 `MesQcDefectRecordController` (管理后台 - MES 质检缺陷记录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/defect-record/create` | 创建质检缺陷记录 | `CommonResult<Long>` | `@Valid @RequestBody MesQcDefectRecordSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/defect-record/update` | 更新质检缺陷记录 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcDefectRecordSaveReqVO updateReqVO` |
| `DELETE` | `/mes/qc/defect-record/delete` | 删除质检缺陷记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/defect-record/get` | 获得质检缺陷记录 | `CommonResult<MesQcDefectRecordRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/defect-record/page` | 获得质检缺陷记录分页 | `CommonResult<PageResult<MesQcDefectRecordRespVO>>` | `@Valid MesQcDefectRecordPageReqVO pageReqVO` |

### 📦 `MesQcIndicatorController` (管理后台 - MES 质检指标)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/indicator/create` | 创建质检指标 | `CommonResult<Long>` | `@Valid @RequestBody MesQcIndicatorSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/indicator/update` | 更新质检指标 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcIndicatorSaveReqVO updateReqVO` |
| `DELETE` | `/mes/qc/indicator/delete` | 删除质检指标 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/indicator/get` | 获得质检指标 | `CommonResult<MesQcIndicatorRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/indicator/page` | 获得质检指标分页 | `CommonResult<PageResult<MesQcIndicatorRespVO>>` | `@Valid MesQcIndicatorPageReqVO pageReqVO` |

### 📦 `MesQcIndicatorResultController` (管理后台 - MES 检验结果)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/indicator-result/create` | 创建检验结果 | `CommonResult<Long>` | `@Valid @RequestBody MesQcIndicatorResultSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/indicator-result/update` | 更新检验结果 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcIndicatorResultSaveReqVO updateReqVO` |
| `DELETE` | `/mes/qc/indicator-result/delete` | 删除检验结果 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/indicator-result/get-detail` | 获得检验结果明细（含检测项模板） | `CommonResult<MesQcIndicatorResultRespVO>` | `@RequestParam(value = "id", required = false) Long id, @RequestParam("qcId") Long qcId, @RequestParam("qcType") Integer qcType` |
| `GET` | `/mes/qc/indicator-result/page` | 获得检验结果分页 | `CommonResult<PageResult<MesQcIndicatorResultRespVO>>` | `@Valid MesQcIndicatorResultPageReqVO pageReqVO` |

### 📦 `MesQcIpqcController` (管理后台 - MES 过程检验单（IPQC）)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/ipqc/create` | 创建过程检验单 | `CommonResult<Long>` | `@Valid @RequestBody MesQcIpqcSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/ipqc/update` | 更新过程检验单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcIpqcSaveReqVO updateReqVO` |
| `PUT` | `/mes/qc/ipqc/finish` | 完成过程检验单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/mes/qc/ipqc/delete` | 删除过程检验单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/ipqc/get` | 获得过程检验单 | `CommonResult<MesQcIpqcRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/ipqc/page` | 获得过程检验单分页 | `CommonResult<PageResult<MesQcIpqcRespVO>>` | `@Valid MesQcIpqcPageReqVO pageReqVO` |
| `GET` | `/mes/qc/ipqc/export-excel` | 导出过程检验单 Excel | `void` | `@Valid MesQcIpqcPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesQcIpqcDO> list = ipqcService.getIpqcPage(pageReqVO).getList(); List<MesQcIpqcRespVO> voList = buildIpqcRespVOList(list); ExcelUtils.write(response, "过程检验单.xls", "数据", MesQcIpqcRespVO.class, voList); } // ==================== 拼接 VO ==================== private List<MesQcIpqcRespVO> buildIpqcRespVOList(List<MesQcIpqcDO> list` |

### 📦 `MesQcIpqcLineController` (管理后台 - MES 过程检验单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/qc/ipqc/line/get` | 获得过程检验单行 | `CommonResult<MesQcIpqcLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/ipqc/line/page` | 获得过程检验单行分页 | `CommonResult<PageResult<MesQcIpqcLineRespVO>>` | `@Valid MesQcIpqcLinePageReqVO pageReqVO` |

### 📦 `MesQcIqcController` (管理后台 - MES 来料检验单（IQC）)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/iqc/create` | 创建来料检验单 | `CommonResult<Long>` | `@Valid @RequestBody MesQcIqcSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/iqc/update` | 更新来料检验单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcIqcSaveReqVO updateReqVO` |
| `PUT` | `/mes/qc/iqc/finish` | 完成来料检验单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/mes/qc/iqc/delete` | 删除来料检验单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/iqc/get` | 获得来料检验单 | `CommonResult<MesQcIqcRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/iqc/page` | 获得来料检验单分页 | `CommonResult<PageResult<MesQcIqcRespVO>>` | `@Valid MesQcIqcPageReqVO pageReqVO` |
| `GET` | `/mes/qc/iqc/export-excel` | 导出来料检验单 Excel | `void` | `@Valid MesQcIqcPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesQcIqcDO> list = iqcService.getIqcPage(pageReqVO).getList(); List<MesQcIqcRespVO> voList = buildIqcRespVOList(list); ExcelUtils.write(response, "来料检验单.xls", "数据", MesQcIqcRespVO.class, voList); } // ==================== 拼接 VO ==================== private List<MesQcIqcRespVO> buildIqcRespVOList(List<MesQcIqcDO> list` |

### 📦 `MesQcIqcLineController` (管理后台 - MES 来料检验单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/qc/iqc/line/get` | 获得来料检验单行 | `CommonResult<MesQcIqcLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/iqc/line/page` | 获得来料检验单行分页 | `CommonResult<PageResult<MesQcIqcLineRespVO>>` | `@Valid MesQcIqcLinePageReqVO pageReqVO` |

### 📦 `MesQcOqcController` (管理后台 - MES 出货检验单（OQC）)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/oqc/create` | 创建出货检验单 | `CommonResult<Long>` | `@Valid @RequestBody MesQcOqcSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/oqc/update` | 更新出货检验单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcOqcSaveReqVO updateReqVO` |
| `PUT` | `/mes/qc/oqc/finish` | 完成出货检验单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/mes/qc/oqc/delete` | 删除出货检验单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/oqc/get` | 获得出货检验单 | `CommonResult<MesQcOqcRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/oqc/page` | 获得出货检验单分页 | `CommonResult<PageResult<MesQcOqcRespVO>>` | `@Valid MesQcOqcPageReqVO pageReqVO` |
| `GET` | `/mes/qc/oqc/export-excel` | 导出出货检验单 Excel | `void` | `@Valid MesQcOqcPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesQcOqcDO> list = oqcService.getOqcPage(pageReqVO).getList(); List<MesQcOqcRespVO> voList = buildOqcRespVOList(list); ExcelUtils.write(response, "出货检验单.xls", "数据", MesQcOqcRespVO.class, voList); } // ==================== 拼接 VO ==================== private List<MesQcOqcRespVO> buildOqcRespVOList(List<MesQcOqcDO> list` |

### 📦 `MesQcOqcLineController` (管理后台 - MES 出货检验单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/qc/oqc/line/get` | 获得出货检验单行 | `CommonResult<MesQcOqcLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/oqc/line/page` | 获得出货检验单行分页 | `CommonResult<PageResult<MesQcOqcLineRespVO>>` | `@Valid MesQcOqcLinePageReqVO pageReqVO` |

### 📦 `MesQcPendingInspectController` (管理后台 - MES 待检任务)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/qc/pending-inspect/page` | 获得待检任务分页 | `CommonResult<PageResult<MesQcPendingInspectRespVO>>` | `@Valid MesQcPendingInspectPageReqVO pageReqVO` |

### 📦 `MesQcRqcController` (管理后台 - MES 退货检验单（RQC）)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/rqc/create` | 创建退货检验单 | `CommonResult<Long>` | `@Valid @RequestBody MesQcRqcSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/rqc/update` | 更新退货检验单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcRqcSaveReqVO updateReqVO` |
| `PUT` | `/mes/qc/rqc/finish` | 完成退货检验单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/mes/qc/rqc/delete` | 删除退货检验单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/rqc/get` | 获得退货检验单 | `CommonResult<MesQcRqcRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/rqc/page` | 获得退货检验单分页 | `CommonResult<PageResult<MesQcRqcRespVO>>` | `@Valid MesQcRqcPageReqVO pageReqVO` |
| `GET` | `/mes/qc/rqc/export-excel` | 导出退货检验单 Excel | `void` | `@Valid MesQcRqcPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesQcRqcDO> list = rqcService.getRqcPage(pageReqVO).getList(); List<MesQcRqcRespVO> voList = buildRqcRespVOList(list); ExcelUtils.write(response, "退货检验单.xls", "数据", MesQcRqcRespVO.class, voList); } // ==================== 拼接 VO ==================== private List<MesQcRqcRespVO> buildRqcRespVOList(List<MesQcRqcDO> list` |

### 📦 `MesQcRqcLineController` (管理后台 - MES 退货检验单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/qc/rqc/line/get` | 获得退货检验单行 | `CommonResult<MesQcRqcLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/rqc/line/page` | 获得退货检验单行分页 | `CommonResult<PageResult<MesQcRqcLineRespVO>>` | `@Valid MesQcRqcLinePageReqVO pageReqVO` |

### 📦 `MesQcTemplateController` (管理后台 - MES 质检方案)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/template/create` | 创建质检方案 | `CommonResult<Long>` | `@Valid @RequestBody MesQcTemplateSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/template/update` | 更新质检方案 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/mes/qc/template/delete` | 删除质检方案 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/template/get` | 获得质检方案 | `CommonResult<MesQcTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/template/page` | 获得质检方案分页 | `CommonResult<PageResult<MesQcTemplateRespVO>>` | `@Valid MesQcTemplatePageReqVO pageReqVO` |

### 📦 `MesQcTemplateIndicatorController` (管理后台 - MES 质检方案-检测指标项)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/template/indicator/create` | 创建质检方案-检测指标项 | `CommonResult<Long>` | `@Valid @RequestBody MesQcTemplateIndicatorSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/template/indicator/update` | 更新质检方案-检测指标项 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcTemplateIndicatorSaveReqVO updateReqVO` |
| `DELETE` | `/mes/qc/template/indicator/delete` | 删除质检方案-检测指标项 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/template/indicator/get` | 获得质检方案-检测指标项 | `CommonResult<MesQcTemplateIndicatorRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/template/indicator/page` | 获得质检方案-检测指标项分页 | `CommonResult<PageResult<MesQcTemplateIndicatorRespVO>>` | `@Valid MesQcTemplateIndicatorPageReqVO pageReqVO` |

### 📦 `MesQcTemplateItemController` (管理后台 - MES 质检方案-产品关联)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/qc/template/item/create` | 创建质检方案-产品关联 | `CommonResult<Long>` | `@Valid @RequestBody MesQcTemplateItemSaveReqVO createReqVO` |
| `PUT` | `/mes/qc/template/item/update` | 更新质检方案-产品关联 | `CommonResult<Boolean>` | `@Valid @RequestBody MesQcTemplateItemSaveReqVO updateReqVO` |
| `DELETE` | `/mes/qc/template/item/delete` | 删除质检方案-产品关联 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/template/item/get` | 获得质检方案-产品关联 | `CommonResult<MesQcTemplateItemRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/qc/template/item/page` | 获得质检方案-产品关联分页 | `CommonResult<PageResult<MesQcTemplateItemRespVO>>` | `@Valid MesQcTemplateItemPageReqVO pageReqVO` |

### 📦 `MesTmToolController` (管理后台 - MES 工具台账)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/tm/tool/create` | 创建工具 | `CommonResult<Long>` | `@Valid @RequestBody MesTmToolSaveReqVO createReqVO` |
| `PUT` | `/mes/tm/tool/update` | 更新工具 | `CommonResult<Boolean>` | `@Valid @RequestBody MesTmToolSaveReqVO updateReqVO` |
| `DELETE` | `/mes/tm/tool/delete` | 删除工具 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/tm/tool/get` | 获得工具 | `CommonResult<MesTmToolRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/tm/tool/page` | 获得工具分页 | `CommonResult<PageResult<MesTmToolRespVO>>` | `@Valid MesTmToolPageReqVO pageReqVO` |
| `GET` | `/mes/tm/tool/export-excel` | 导出工具 Excel | `void` | `@Valid MesTmToolPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesTmToolDO> list = toolService.getToolPage(pageReqVO).getList(); List<MesTmToolRespVO> voList = buildToolRespVOList(list); // 导出 Excel ExcelUtils.write(response, "工具台账.xls", "数据", MesTmToolRespVO.class, voList); } @GetMapping("/simple-list") @Operation(summary = "获得工具精简列表") @PreAuthorize("@ss.hasPermission('mes:tm-tool:query')") public CommonResult<List<MesTmToolRespVO>> getToolSimpleList(` |

### 📦 `MesTmToolTypeController` (管理后台 - MES 工具类型)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/tm/tool-type/create` | 创建工具类型 | `CommonResult<Long>` | `@Valid @RequestBody MesTmToolTypeSaveReqVO createReqVO` |
| `PUT` | `/mes/tm/tool-type/update` | 更新工具类型 | `CommonResult<Boolean>` | `@Valid @RequestBody MesTmToolTypeSaveReqVO updateReqVO` |
| `DELETE` | `/mes/tm/tool-type/delete` | 删除工具类型 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/tm/tool-type/get` | 获得工具类型 | `CommonResult<MesTmToolTypeRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/tm/tool-type/page` | 获得工具类型分页 | `CommonResult<PageResult<MesTmToolTypeRespVO>>` | `@Valid MesTmToolTypePageReqVO pageReqVO` |
| `GET` | `/mes/tm/tool-type/simple-list` | 获得工具类型精简列表 | `CommonResult<List<MesTmToolTypeRespVO>>` | `-` |

### 📦 `MesWmArrivalNoticeController` (管理后台 - MES 到货通知单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/arrival-notice/create` | 创建到货通知单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmArrivalNoticeSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/arrival-notice/update` | 修改到货通知单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmArrivalNoticeSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/arrival-notice/delete` | 删除到货通知单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/arrival-notice/get` | 获得到货通知单 | `CommonResult<MesWmArrivalNoticeRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/arrival-notice/page` | 获得到货通知单分页 | `CommonResult<PageResult<MesWmArrivalNoticeRespVO>>` | `@Valid MesWmArrivalNoticePageReqVO pageReqVO` |
| `GET` | `/mes/wm/arrival-notice/export-excel` | 导出到货通知单 Excel | `void` | `@Valid MesWmArrivalNoticePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmArrivalNoticeDO> pageResult = arrivalNoticeService.getArrivalNoticePage(pageReqVO); ExcelUtils.write(response, "到货通知单.xls", "数据", MesWmArrivalNoticeRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交到货通知单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-arrival-notice:update')") public CommonResult<Boolean> submitArrivalNotice(@RequestParam("id") Long id` |

### 📦 `MesWmArrivalNoticeLineController` (管理后台 - MES 到货通知单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/arrival-notice-line/create` | 创建到货通知单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmArrivalNoticeLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/arrival-notice-line/update` | 修改到货通知单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmArrivalNoticeLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/arrival-notice-line/delete` | 删除到货通知单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/arrival-notice-line/get` | 获得到货通知单行 | `CommonResult<MesWmArrivalNoticeLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/arrival-notice-line/page` | 获得到货通知单行分页 | `CommonResult<PageResult<MesWmArrivalNoticeLineRespVO>>` | `@Valid MesWmArrivalNoticeLinePageReqVO pageReqVO` |

### 📦 `MesWmBarcodeConfigController` (管理后台 - MES 条码配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/barcode-config/create` | 创建条码配置 | `CommonResult<Long>` | `@Valid @RequestBody MesWmBarcodeConfigSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/barcode-config/update` | 更新条码配置 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmBarcodeConfigSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/barcode-config/delete` | 删除条码配置 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/barcode-config/get` | 获得条码配置 | `CommonResult<MesWmBarcodeConfigRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/barcode-config/page` | 获得条码配置分页 | `CommonResult<PageResult<MesWmBarcodeConfigRespVO>>` | `@Valid MesWmBarcodeConfigPageReqVO pageReqVO` |

### 📦 `MesWmBarcodeController` (管理后台 - MES 条码清单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/barcode/create` | 创建条码 | `CommonResult<Long>` | `@Valid @RequestBody MesWmBarcodeSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/barcode/update` | 更新条码 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmBarcodeSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/barcode/delete` | 删除条码 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/barcode/get` | 获得条码 | `CommonResult<MesWmBarcodeRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/barcode/page` | 获得条码分页 | `CommonResult<PageResult<MesWmBarcodeRespVO>>` | `@Valid MesWmBarcodePageReqVO pageReqVO` |
| `GET` | `/mes/wm/barcode/get-by-business` | 根据业务对象获取条码信息 | `CommonResult<MesWmBarcodeRespVO>` | `@RequestParam("bizType") Integer bizType, @RequestParam("bizId") Long bizId` |
| `GET` | `/mes/wm/barcode/generate-content` | 生成条码内容 | `CommonResult<String>` | `@RequestParam("bizType") @NotNull(message = "业务类型不能为空") Integer bizType, @RequestParam("bizCode") @NotBlank(message = "业务编码不能为空") String bizCode` |

### 📦 `MesWmBatchController` (管理后台 - MES 批次管理)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/wm/batch/get` | 获得批次详情 | `CommonResult<MesWmBatchRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/batch/page` | 获得批次分页 | `CommonResult<PageResult<MesWmBatchRespVO>>` | `@Valid MesWmBatchPageReqVO pageReqVO` |
| `GET` | `/mes/wm/batch/forward-list` | 批次向前追溯 | `CommonResult<List<MesWmBatchRespVO>>` | `@RequestParam("code") @Valid String code` |
| `GET` | `/mes/wm/batch/backward-list` | 批次向后追溯 | `CommonResult<List<MesWmBatchRespVO>>` | `@RequestParam("code") @Valid String code` |

### 📦 `MesWmItemConsumeLineController` (管理后台 - MES 物料消耗记录行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/wm/item-consume-line/page` | 根据报工编号分页获取消耗行列表 | `CommonResult<PageResult<MesWmItemConsumeLineRespVO>>` | `@Valid MesWmItemConsumeLinePageReqVO pageReqVO` |

### 📦 `MesWmItemReceiptController` (管理后台 - MES 采购入库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/item-receipt/create` | 创建采购入库单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmItemReceiptSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/item-receipt/update` | 修改采购入库单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmItemReceiptSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/item-receipt/delete` | 删除采购入库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/item-receipt/get` | 获得采购入库单 | `CommonResult<MesWmItemReceiptRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/item-receipt/page` | 获得采购入库单分页 | `CommonResult<PageResult<MesWmItemReceiptRespVO>>` | `@Valid MesWmItemReceiptPageReqVO pageReqVO` |
| `GET` | `/mes/wm/item-receipt/export-excel` | 导出采购入库单 Excel | `void` | `@Valid MesWmItemReceiptPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmItemReceiptDO> pageResult = itemReceiptService.getItemReceiptPage(pageReqVO); ExcelUtils.write(response, "采购入库单.xls", "数据", MesWmItemReceiptRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交采购入库单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-item-receipt:update')") public CommonResult<Boolean> submitItemReceipt(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/item-receipt/stock` | 执行上架 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/item-receipt/finish` | 执行入库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/item-receipt/cancel` | 取消采购入库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmItemReceiptDetailController` (管理后台 - MES 采购入库明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/item-receipt-detail/create` | 创建采购入库明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmItemReceiptDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/item-receipt-detail/update` | 修改采购入库明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmItemReceiptDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/item-receipt-detail/delete` | 删除采购入库明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/item-receipt-detail/get` | 获得采购入库明细 | `CommonResult<MesWmItemReceiptDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/item-receipt-detail/list-by-line` | 获得采购入库明细列表（按行编号） | `CommonResult<List<MesWmItemReceiptDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmItemReceiptLineController` (管理后台 - MES 采购入库单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/item-receipt-line/create` | 创建采购入库单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmItemReceiptLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/item-receipt-line/update` | 修改采购入库单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmItemReceiptLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/item-receipt-line/delete` | 删除采购入库单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/item-receipt-line/get` | 获得采购入库单行 | `CommonResult<MesWmItemReceiptLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/item-receipt-line/page` | 获得采购入库单行分页 | `CommonResult<PageResult<MesWmItemReceiptLineRespVO>>` | `@Valid MesWmItemReceiptLinePageReqVO pageReqVO` |

### 📦 `MesWmMaterialStockController` (管理后台 - MES 库存台账)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/wm/material-stock/get` | 获得库存记录 | `CommonResult<MesWmMaterialStockRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/material-stock/page` | 获得库存台账分页 | `CommonResult<PageResult<MesWmMaterialStockRespVO>>` | `@Valid MesWmMaterialStockPageReqVO pageReqVO` |
| `PUT` | `/mes/wm/material-stock/update-frozen` | 更新库存冻结状态 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmMaterialStockFreezeReqVO updateReqVO` |
| `GET` | `/mes/wm/material-stock/export-excel` | 导出库存台账 Excel | `void` | `@Valid MesWmMaterialStockPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmMaterialStockDO> pageResult = materialStockService.getMaterialStockPage(pageReqVO); ExcelUtils.write(response, "库存台账.xls", "数据", MesWmMaterialStockRespVO.class, buildRespVOList(pageResult.getList())); } // ==================== 拼接 VO ==================== private List<MesWmMaterialStockRespVO> buildRespVOList(List<MesWmMaterialStockDO> list` |

### 📦 `MesWmMiscIssueController` (管理后台 - MES 杂项出库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/misc-issue/create` | 创建杂项出库单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmMiscIssueSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/misc-issue/update` | 修改杂项出库单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmMiscIssueSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/misc-issue/delete` | 删除杂项出库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/misc-issue/get` | 获得杂项出库单 | `CommonResult<MesWmMiscIssueRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/misc-issue/page` | 获得杂项出库单分页 | `CommonResult<PageResult<MesWmMiscIssueRespVO>>` | `@Valid MesWmMiscIssuePageReqVO pageReqVO` |
| `GET` | `/mes/wm/misc-issue/export-excel` | 导出杂项出库单 Excel | `void` | `@Valid MesWmMiscIssuePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmMiscIssueDO> pageResult = miscIssueService.getMiscIssuePage(pageReqVO); ExcelUtils.write(response, "杂项出库单.xls", "数据", MesWmMiscIssueRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交杂项出库单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-misc-issue:update')") public CommonResult<Boolean> submitMiscIssue(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/misc-issue/finish` | 执行出库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/misc-issue/cancel` | 取消杂项出库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmMiscIssueLineController` (管理后台 - MES 杂项出库单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/misc-issue-line/create` | 创建杂项出库单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmMiscIssueLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/misc-issue-line/update` | 修改杂项出库单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmMiscIssueLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/misc-issue-line/delete` | 删除杂项出库单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/misc-issue-line/get` | 获得杂项出库单行 | `CommonResult<MesWmMiscIssueLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/misc-issue-line/page` | 获得杂项出库单行分页 | `CommonResult<PageResult<MesWmMiscIssueLineRespVO>>` | `@Valid MesWmMiscIssueLinePageReqVO pageReqVO` |

### 📦 `MesWmMiscReceiptController` (管理后台 - MES 杂项入库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/misc-receipt/create` | 创建杂项入库单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmMiscReceiptSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/misc-receipt/update` | 修改杂项入库单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmMiscReceiptSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/misc-receipt/delete` | 删除杂项入库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/misc-receipt/get` | 获得杂项入库单 | `CommonResult<MesWmMiscReceiptRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/misc-receipt/page` | 获得杂项入库单分页 | `CommonResult<PageResult<MesWmMiscReceiptRespVO>>` | `@Valid MesWmMiscReceiptPageReqVO pageReqVO` |
| `PUT` | `/mes/wm/misc-receipt/submit` | 提交审批 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/misc-receipt/finish` | 执行入库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/misc-receipt/cancel` | 取消杂项入库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmMiscReceiptLineController` (管理后台 - MES 杂项入库单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/misc-receipt-line/create` | 创建杂项入库单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmMiscReceiptLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/misc-receipt-line/update` | 修改杂项入库单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmMiscReceiptLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/misc-receipt-line/delete` | 删除杂项入库单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/misc-receipt-line/get` | 获得杂项入库单行 | `CommonResult<MesWmMiscReceiptLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/misc-receipt-line/list-by-receipt-id` | 获得杂项入库单行列表 | `CommonResult<List<MesWmMiscReceiptLineRespVO>>` | `@RequestParam("receiptId") Long receiptId` |
| `GET` | `/mes/wm/misc-receipt-line/page` | 获得杂项入库单行分页 | `CommonResult<PageResult<MesWmMiscReceiptLineRespVO>>` | `@Valid MesWmMiscReceiptLinePageReqVO pageReqVO` |

### 📦 `MesWmOutsourceIssueController` (管理后台 - MES 外协发料单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/outsource-issue/create` | 创建外协发料单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmOutsourceIssueSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/outsource-issue/update` | 修改外协发料单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmOutsourceIssueSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/outsource-issue/delete` | 删除外协发料单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-issue/get` | 获得外协发料单 | `CommonResult<MesWmOutsourceIssueRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-issue/page` | 获得外协发料单分页 | `CommonResult<PageResult<MesWmOutsourceIssueRespVO>>` | `@Valid MesWmOutsourceIssuePageReqVO pageReqVO` |
| `GET` | `/mes/wm/outsource-issue/export-excel` | 导出外协发料单 Excel | `void` | `@Valid MesWmOutsourceIssuePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmOutsourceIssueDO> pageResult = outsourceIssueService.getOutsourceIssuePage(pageReqVO); ExcelUtils.write(response, "外协发料单.xls", "数据", MesWmOutsourceIssueRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交到待拣货") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-outsource-issue:update')") public CommonResult<Boolean> submitOutsourceIssue(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/outsource-issue/stock` | 执行拣货 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/outsource-issue/finish` | 完成外协发料出库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/outsource-issue/cancel` | 取消外协发料单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-issue/check-quantity` | 校验外协发料单数量 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmOutsourceIssueDetailController` (管理后台 - MES 外协发料单明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/outsource-issue-detail/create` | 创建外协发料单明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmOutsourceIssueDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/outsource-issue-detail/update` | 修改外协发料单明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmOutsourceIssueDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/outsource-issue-detail/delete` | 删除外协发料单明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-issue-detail/get` | 获得外协发料单明细 | `CommonResult<MesWmOutsourceIssueDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-issue-detail/list-by-line` | 获得外协发料单明细列表（按行ID） | `CommonResult<List<MesWmOutsourceIssueDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmOutsourceIssueLineController` (管理后台 - MES 外协发料单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/outsource-issue-line/create` | 创建外协发料单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmOutsourceIssueLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/outsource-issue-line/update` | 修改外协发料单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmOutsourceIssueLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/outsource-issue-line/delete` | 删除外协发料单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-issue-line/get` | 获得外协发料单行 | `CommonResult<MesWmOutsourceIssueLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-issue-line/page` | 获得外协发料单行分页 | `CommonResult<PageResult<MesWmOutsourceIssueLineRespVO>>` | `@Valid MesWmOutsourceIssueLinePageReqVO pageReqVO` |
| `GET` | `/mes/wm/outsource-issue-line/list-by-issue-id` | 获得外协发料单行列表 | `CommonResult<List<MesWmOutsourceIssueLineRespVO>>` | `@RequestParam("issueId") Long issueId` |

### 📦 `MesWmOutsourceReceiptController` (管理后台 - MES 外协入库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/outsource-receipt/create` | 创建外协入库单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmOutsourceReceiptSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/outsource-receipt/update` | 修改外协入库单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmOutsourceReceiptSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/outsource-receipt/delete` | 删除外协入库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-receipt/get` | 获得外协入库单 | `CommonResult<MesWmOutsourceReceiptRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-receipt/page` | 获得外协入库单分页 | `CommonResult<PageResult<MesWmOutsourceReceiptRespVO>>` | `@Valid MesWmOutsourceReceiptPageReqVO pageReqVO` |
| `GET` | `/mes/wm/outsource-receipt/export-excel` | 导出外协入库单 Excel | `void` | `@Valid MesWmOutsourceReceiptPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmOutsourceReceiptDO> pageResult = outsourceReceiptService.getOutsourceReceiptPage(pageReqVO); ExcelUtils.write(response, "外协入库单.xls", "数据", MesWmOutsourceReceiptRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交外协入库单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-outsource-receipt:update')") public CommonResult<Boolean> submitOutsourceReceipt(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/outsource-receipt/stock` | 执行上架 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/outsource-receipt/finish` | 完成入库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/outsource-receipt/cancel` | 取消外协入库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmOutsourceReceiptDetailController` (管理后台 - MES 外协入库明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/outsource-receipt-detail/create` | 创建外协入库明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmOutsourceReceiptDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/outsource-receipt-detail/update` | 修改外协入库明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmOutsourceReceiptDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/outsource-receipt-detail/delete` | 删除外协入库明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-receipt-detail/get` | 获得外协入库明细 | `CommonResult<MesWmOutsourceReceiptDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-receipt-detail/list-by-line` | 获得外协入库明细列表（按行编号） | `CommonResult<List<MesWmOutsourceReceiptDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmOutsourceReceiptLineController` (管理后台 - MES 外协入库单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/outsource-receipt-line/create` | 创建外协入库单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmOutsourceReceiptLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/outsource-receipt-line/update` | 修改外协入库单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmOutsourceReceiptLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/outsource-receipt-line/delete` | 删除外协入库单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-receipt-line/get` | 获得外协入库单行 | `CommonResult<MesWmOutsourceReceiptLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/outsource-receipt-line/page` | 获得外协入库单行分页 | `CommonResult<PageResult<MesWmOutsourceReceiptLineRespVO>>` | `@Valid MesWmOutsourceReceiptLinePageReqVO pageReqVO` |

### 📦 `MesWmPackageController` (管理后台 - MES 装箱单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/package/create` | 创建装箱单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmPackageSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/package/update` | 修改装箱单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmPackageSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/package/delete` | 删除装箱单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/package/get` | 获得装箱单 | `CommonResult<MesWmPackageRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/package/page` | 获得装箱单分页 | `CommonResult<PageResult<MesWmPackageRespVO>>` | `@Valid MesWmPackagePageReqVO pageReqVO` |
| `PUT` | `/mes/wm/package/finish` | 完成装箱单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/package/add-child-package` | 添加子箱 | `CommonResult<Boolean>` | `@RequestParam("parentId") Long parentId, @RequestParam("childId") Long childId` |
| `PUT` | `/mes/wm/package/remove-child-package` | 移除子箱 | `CommonResult<Boolean>` | `@RequestParam("childId") Long childId` |

### 📦 `MesWmPackageLineController` (管理后台 - MES 装箱明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/package-line/create` | 创建装箱明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmPackageLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/package-line/update` | 修改装箱明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmPackageLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/package-line/delete` | 删除装箱明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/package-line/get` | 获得装箱明细 | `CommonResult<MesWmPackageLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/package-line/page` | 获得装箱明细分页 | `CommonResult<PageResult<MesWmPackageLineRespVO>>` | `@Valid MesWmPackageLinePageReqVO pageReqVO` |

### 📦 `MesWmProductIssueController` (管理后台 - MES 领料出库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/product-issue/create` | 创建领料出库单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmProductIssueSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/product-issue/update` | 修改领料出库单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductIssueSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/product-issue/delete` | 删除领料出库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-issue/get` | 获得领料出库单 | `CommonResult<MesWmProductIssueRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-issue/page` | 获得领料出库单分页 | `CommonResult<PageResult<MesWmProductIssueRespVO>>` | `@Valid MesWmProductIssuePageReqVO pageReqVO` |
| `GET` | `/mes/wm/product-issue/export-excel` | 导出领料出库单 Excel | `void` | `@Valid MesWmProductIssuePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmProductIssueDO> pageResult = issueService.getProductIssuePage(pageReqVO); ExcelUtils.write(response, "领料出库单.xls", "数据", MesWmProductIssueRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/finish") @Operation(summary = "完成领料出库单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-product-issue:finish')") public CommonResult<Boolean> finishProductIssue(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/product-issue/submit` | 提交领料出库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/product-issue/stock` | 执行拣货 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/product-issue/cancel` | 取消领料出库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-issue/check-quantity` | 校验领料出库单数量 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmProductIssueDetailController` (管理后台 - MES 领料出库明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/product-issue-detail/create` | 创建领料出库明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmProductIssueDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/product-issue-detail/update` | 修改领料出库明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductIssueDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/product-issue-detail/delete` | 删除领料出库明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-issue-detail/get` | 获得领料出库明细 | `CommonResult<MesWmProductIssueDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-issue-detail/list-by-line` | 获得领料出库明细列表（按行编号） | `CommonResult<List<MesWmProductIssueDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmProductIssueLineController` (管理后台 - MES 领料出库单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/product-issue-line/create` | 创建领料出库单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmProductIssueLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/product-issue-line/update` | 修改领料出库单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductIssueLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/product-issue-line/delete` | 删除领料出库单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-issue-line/get` | 获得领料出库单行 | `CommonResult<MesWmProductIssueLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-issue-line/page` | 获得领料出库单行分页 | `CommonResult<PageResult<MesWmProductIssueLineRespVO>>` | `@Valid MesWmProductIssueLinePageReqVO pageReqVO` |
| `GET` | `/mes/wm/product-issue-line/list-by-issue` | 获得领料出库单行列表（按领料单编号） | `CommonResult<List<MesWmProductIssueLineRespVO>>` | `@RequestParam("issueId") Long issueId` |

### 📦 `MesWmProductProduceLineController` (管理后台 - MES 生产入库单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/wm/product-produce-line/page` | 获得生产入库单行分页 | `CommonResult<PageResult<MesWmProductProduceLineRespVO>>` | `@Valid MesWmProductProduceLinePageReqVO pageReqVO` |

### 📦 `MesWmProductReceiptController` (管理后台 - MES 产品收货单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/product-receipt/create` | 创建产品收货单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmProductReceiptSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/product-receipt/update` | 修改产品收货单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductReceiptSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/product-receipt/delete` | 删除产品收货单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-receipt/get` | 获得产品收货单 | `CommonResult<MesWmProductReceiptRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-receipt/page` | 获得产品收货单分页 | `CommonResult<PageResult<MesWmProductReceiptRespVO>>` | `@Valid MesWmProductReceiptPageReqVO pageReqVO` |
| `GET` | `/mes/wm/product-receipt/export-excel` | 导出产品收货单 Excel | `void` | `@Valid MesWmProductReceiptPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmProductReceiptDO> pageResult = productReceiptService.getProductReceiptPage(pageReqVO); ExcelUtils.write(response, "产品收货单.xls", "数据", MesWmProductReceiptRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交产品收货单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-product-receipt:update')") public CommonResult<Boolean> submitProductReceipt(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/product-receipt/stock` | 执行上架 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/product-receipt/finish` | 执行入库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/product-receipt/cancel` | 取消产品收货单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-receipt/check-quantity` | 校验产品收货单明细数量 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmProductReceiptDetailController` (管理后台 - MES 产品收货单明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/product-receipt-detail/create` | 创建产品收货单明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmProductReceiptDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/product-receipt-detail/update` | 修改产品收货单明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductReceiptDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/product-receipt-detail/delete` | 删除产品收货单明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-receipt-detail/get` | 获得产品收货单明细 | `CommonResult<MesWmProductReceiptDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-receipt-detail/list-by-line` | 获得产品收货单明细列表（按行编号） | `CommonResult<List<MesWmProductReceiptDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmProductReceiptLineController` (管理后台 - MES 产品收货单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/product-receipt-line/create` | 创建产品收货单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmProductReceiptLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/product-receipt-line/update` | 修改产品收货单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductReceiptLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/product-receipt-line/delete` | 删除产品收货单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-receipt-line/get` | 获得产品收货单行 | `CommonResult<MesWmProductReceiptLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-receipt-line/page` | 获得产品收货单行分页 | `CommonResult<PageResult<MesWmProductReceiptLineRespVO>>` | `@Valid MesWmProductReceiptLinePageReqVO pageReqVO` |

### 📦 `MesWmProductSalesController` (管理后台 - MES 销售出库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/product-sales/create` | 创建销售出库单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmProductSalesSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/product-sales/update` | 修改销售出库单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductSalesSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/product-sales/delete` | 删除销售出库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-sales/get` | 获得销售出库单 | `CommonResult<MesWmProductSalesRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-sales/page` | 获得销售出库单分页 | `CommonResult<PageResult<MesWmProductSalesRespVO>>` | `@Valid MesWmProductSalesPageReqVO pageReqVO` |
| `GET` | `/mes/wm/product-sales/export-excel` | 导出销售出库单 Excel | `void` | `@Valid MesWmProductSalesPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmProductSalesDO> pageResult = productSalesService.getProductSalesPage(pageReqVO); ExcelUtils.write(response, "销售出库单.xls", "数据", MesWmProductSalesRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交销售出库单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-product-sales:submit')") public CommonResult<Boolean> submitProductSales(@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-sales/check-quantity` | 校验销售出库单数量 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/product-sales/stock` | 执行拣货 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/product-sales/shipping` | 填写运单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductSalesShippingReqVO reqVO` |
| `PUT` | `/mes/wm/product-sales/finish` | 执行出库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/product-sales/cancel` | 取消销售出库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmProductSalesDetailController` (管理后台 - MES 销售出库明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/product-sales-detail/create` | 创建销售出库明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmProductSalesDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/product-sales-detail/update` | 修改销售出库明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductSalesDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/product-sales-detail/delete` | 删除销售出库明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-sales-detail/get` | 获得销售出库明细 | `CommonResult<MesWmProductSalesDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-sales-detail/list-by-line` | 获得销售出库明细列表（按行编号） | `CommonResult<List<MesWmProductSalesDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmProductSalesLineController` (管理后台 - MES 销售出库单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/product-sales-line/create` | 创建销售出库单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmProductSalesLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/product-sales-line/update` | 修改销售出库单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmProductSalesLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/product-sales-line/delete` | 删除销售出库单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-sales-line/get` | 获得销售出库单行 | `CommonResult<MesWmProductSalesLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/product-sales-line/page` | 获得销售出库单行分页 | `CommonResult<PageResult<MesWmProductSalesLineRespVO>>` | `@Valid MesWmProductSalesLinePageReqVO pageReqVO` |

### 📦 `MesWmReturnIssueController` (管理后台 - MES 生产退料单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/return-issue/create` | 创建生产退料单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmReturnIssueSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/return-issue/update` | 修改生产退料单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmReturnIssueSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/return-issue/delete` | 删除生产退料单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-issue/get` | 获得生产退料单 | `CommonResult<MesWmReturnIssueRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-issue/page` | 获得生产退料单分页 | `CommonResult<PageResult<MesWmReturnIssueRespVO>>` | `@Valid MesWmReturnIssuePageReqVO pageReqVO` |
| `GET` | `/mes/wm/return-issue/export-excel` | 导出生产退料单 Excel | `void` | `@Valid MesWmReturnIssuePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmReturnIssueDO> pageResult = issueService.getReturnIssuePage(pageReqVO); ExcelUtils.write(response, "生产退料单.xls", "数据", MesWmReturnIssueRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/finish") @Operation(summary = "完成生产退料单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-return-issue:finish')") public CommonResult<Boolean> finishReturnIssue(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/return-issue/submit` | 提交生产退料单（草稿 → 待检验/待上架） | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/return-issue/stock` | 入库上架 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/return-issue/cancel` | 取消生产退料单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmReturnIssueDetailController` (管理后台 - MES 生产退料明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/return-issue-detail/create` | 创建生产退料明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmReturnIssueDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/return-issue-detail/update` | 修改生产退料明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmReturnIssueDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/return-issue-detail/delete` | 删除生产退料明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-issue-detail/get` | 获得生产退料明细 | `CommonResult<MesWmReturnIssueDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-issue-detail/list-by-line` | 获得生产退料明细列表（按行编号） | `CommonResult<List<MesWmReturnIssueDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmReturnIssueLineController` (管理后台 - MES 生产退料单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/return-issue-line/create` | 创建生产退料单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmReturnIssueLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/return-issue-line/update` | 修改生产退料单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmReturnIssueLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/return-issue-line/delete` | 删除生产退料单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-issue-line/get` | 获得生产退料单行 | `CommonResult<MesWmReturnIssueLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-issue-line/page` | 获得生产退料单行分页 | `CommonResult<PageResult<MesWmReturnIssueLineRespVO>>` | `@Valid MesWmReturnIssueLinePageReqVO pageReqVO` |
| `GET` | `/mes/wm/return-issue-line/list-by-issue` | 获得生产退料单行列表（按退料单编号） | `CommonResult<List<MesWmReturnIssueLineRespVO>>` | `@RequestParam("issueId") Long issueId` |

### 📦 `MesWmReturnSalesController` (管理后台 - MES 销售退货单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/return-sales/create` | 创建销售退货单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmReturnSalesSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/return-sales/update` | 修改销售退货单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmReturnSalesSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/return-sales/delete` | 删除销售退货单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-sales/get` | 获得销售退货单 | `CommonResult<MesWmReturnSalesRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-sales/page` | 获得销售退货单分页 | `CommonResult<PageResult<MesWmReturnSalesRespVO>>` | `@Valid MesWmReturnSalesPageReqVO pageReqVO` |
| `GET` | `/mes/wm/return-sales/export-excel` | 导出销售退货单 Excel | `void` | `@Valid MesWmReturnSalesPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmReturnSalesDO> pageResult = returnSalesService.getReturnSalesPage(pageReqVO); ExcelUtils.write(response, "销售退货单.xls", "数据", MesWmReturnSalesRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交销售退货单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-return-sales:submit')") public CommonResult<Boolean> submitReturnSales(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/return-sales/finish` | 执行退货 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/return-sales/stock` | 执行上架 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/return-sales/cancel` | 取消销售退货单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-sales/check-quantity` | 校验销售退货单数量 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmReturnSalesDetailController` (管理后台 - MES 销售退货明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/return-sales-detail/create` | 创建销售退货明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmReturnSalesDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/return-sales-detail/update` | 修改销售退货明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmReturnSalesDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/return-sales-detail/delete` | 删除销售退货明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-sales-detail/get` | 获得销售退货明细 | `CommonResult<MesWmReturnSalesDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-sales-detail/list-by-line` | 获得销售退货明细列表（按行编号） | `CommonResult<List<MesWmReturnSalesDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmReturnSalesLineController` (管理后台 - MES 销售退货单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/return-sales-line/create` | 创建销售退货单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmReturnSalesLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/return-sales-line/update` | 修改销售退货单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmReturnSalesLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/return-sales-line/delete` | 删除销售退货单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-sales-line/get` | 获得销售退货单行 | `CommonResult<MesWmReturnSalesLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-sales-line/page` | 获得销售退货单行分页 | `CommonResult<PageResult<MesWmReturnSalesLineRespVO>>` | `@Valid MesWmReturnSalesLinePageReqVO pageReqVO` |
| `GET` | `/mes/wm/return-sales-line/list-by-return-sales` | 获得销售退货单行列表（按退货单编号） | `CommonResult<List<MesWmReturnSalesLineRespVO>>` | `@RequestParam("returnId") Long returnId` |

### 📦 `MesWmReturnVendorController` (管理后台 - MES 供应商退货单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/return-vendor/create` | 创建供应商退货单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmReturnVendorSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/return-vendor/update` | 修改供应商退货单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmReturnVendorSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/return-vendor/delete` | 删除供应商退货单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-vendor/get` | 获得供应商退货单 | `CommonResult<MesWmReturnVendorRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-vendor/page` | 获得供应商退货单分页 | `CommonResult<PageResult<MesWmReturnVendorRespVO>>` | `@Valid MesWmReturnVendorPageReqVO pageReqVO` |
| `GET` | `/mes/wm/return-vendor/export-excel` | 导出供应商退货单 Excel | `void` | `@Valid MesWmReturnVendorPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmReturnVendorDO> pageResult = returnVendorService.getReturnVendorPage(pageReqVO); ExcelUtils.write(response, "供应商退货单.xls", "数据", MesWmReturnVendorRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交供应商退货单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-return-vendor:update')") public CommonResult<Boolean> submitReturnVendor(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/return-vendor/stock` | 执行拣货 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/return-vendor/finish` | 完成供应商退货单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/return-vendor/cancel` | 取消供应商退货单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-vendor/check-quantity` | 校验供应商退货单数量 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmReturnVendorDetailController` (管理后台 - MES 供应商退货明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/return-vendor-detail/create` | 创建供应商退货明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmReturnVendorDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/return-vendor-detail/update` | 修改供应商退货明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmReturnVendorDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/return-vendor-detail/delete` | 删除供应商退货明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-vendor-detail/get` | 获得供应商退货明细 | `CommonResult<MesWmReturnVendorDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-vendor-detail/list-by-line` | 获得供应商退货明细列表（按行编号） | `CommonResult<List<MesWmReturnVendorDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmReturnVendorLineController` (管理后台 - MES 供应商退货单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/return-vendor-line/create` | 创建供应商退货单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmReturnVendorLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/return-vendor-line/update` | 修改供应商退货单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmReturnVendorLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/return-vendor-line/delete` | 删除供应商退货单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-vendor-line/get` | 获得供应商退货单行 | `CommonResult<MesWmReturnVendorLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/return-vendor-line/page` | 获得供应商退货单行分页 | `CommonResult<PageResult<MesWmReturnVendorLineRespVO>>` | `@Valid MesWmReturnVendorLinePageReqVO pageReqVO` |
| `GET` | `/mes/wm/return-vendor-line/list-by-return-vendor` | 获得供应商退货单行列表（按退货单编号） | `CommonResult<List<MesWmReturnVendorLineRespVO>>` | `@RequestParam("returnId") Long returnId` |

### 📦 `MesWmSalesNoticeController` (管理后台 - MES 发货通知单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/sales-notice/create` | 创建发货通知单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmSalesNoticeSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/sales-notice/update` | 修改发货通知单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmSalesNoticeSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/sales-notice/delete` | 删除发货通知单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/sales-notice/get` | 获得发货通知单 | `CommonResult<MesWmSalesNoticeRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/sales-notice/page` | 获得发货通知单分页 | `CommonResult<PageResult<MesWmSalesNoticeRespVO>>` | `@Valid MesWmSalesNoticePageReqVO pageReqVO` |
| `GET` | `/mes/wm/sales-notice/export-excel` | 导出发货通知单 Excel | `void` | `@Valid MesWmSalesNoticePageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmSalesNoticeDO> pageResult = salesNoticeService.getSalesNoticePage(pageReqVO); ExcelUtils.write(response, "发货通知单.xls", "数据", MesWmSalesNoticeRespVO.class, buildRespVOList(pageResult.getList())); } @PutMapping("/submit") @Operation(summary = "提交发货通知单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-sales-notice:update')") public CommonResult<Boolean> submitSalesNotice(@RequestParam("id") Long id` |

### 📦 `MesWmSalesNoticeLineController` (管理后台 - MES 发货通知单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/sales-notice-line/create` | 创建发货通知单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmSalesNoticeLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/sales-notice-line/update` | 修改发货通知单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmSalesNoticeLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/sales-notice-line/delete` | 删除发货通知单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/sales-notice-line/get` | 获得发货通知单行 | `CommonResult<MesWmSalesNoticeLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/sales-notice-line/page` | 获得发货通知单行分页 | `CommonResult<PageResult<MesWmSalesNoticeLineRespVO>>` | `@Valid MesWmSalesNoticeLinePageReqVO pageReqVO` |

### 📦 `MesWmSnController` (管理后台 - MES SN 码)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/sn/generate` | 生成 SN 码 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmSnGenerateReqVO reqVO` |
| `GET` | `/mes/wm/sn/group-page` | 获得 SN 码分组分页 | `CommonResult<PageResult<MesWmSnGroupRespVO>>` | `@Valid MesWmSnPageReqVO reqVO` |
| `GET` | `/mes/wm/sn/list-by-uuid` | 获得批次 SN 码明细列表 | `CommonResult<List<MesWmSnRespVO>>` | `@RequestParam("uuid") @NotBlank(message = "批次 UUID 不能为空") String uuid` |
| `DELETE` | `/mes/wm/sn/delete-batch` | 批量删除 SN 码（按批次 UUID） | `CommonResult<Boolean>` | `@RequestParam("uuid") @NotBlank(message = "批次 UUID 不能为空") String uuid` |
| `GET` | `/mes/wm/sn/group-export-excel` | 导出 SN 码分组 Excel | `void` | `@Valid MesWmSnPageReqVO reqVO, HttpServletResponse response) throws IOException { reqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<MesWmSnGroupRespVO> list = snService.getSnGroupPage(reqVO).getList(); buildSnGroupItemVO(list); ExcelUtils.write(response, "SN码分组.xls", "数据", MesWmSnGroupRespVO.class, list); } @GetMapping("/export-excel") @Operation(summary = "导出批次 SN 码明细 Excel") @Parameter(name = "uuid", description = "批次 UUID", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-sn:export')") @ApiAccessLog(operateType = EXPORT) public void exportSnExcel(@RequestParam("uuid") String uuid, HttpServletResponse response) throws IOException { List<MesWmSnRespVO> list = BeanUtils.toBean(snService.getSnListByUuid(uuid), MesWmSnRespVO.class); buildSnItemVO(list); ExcelUtils.write(response, "SN码明细.xls", "数据", MesWmSnRespVO.class, list); } // ==================== 拼接 VO ==================== private void buildSnGroupItemVO(List<MesWmSnGroupRespVO> list` |

### 📦 `MesWmStockTakingPlanController` (管理后台 - MES 盘点方案)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/stocktaking-plan/create` | 创建盘点方案 | `CommonResult<Long>` | `@Valid @RequestBody MesWmStockTakingPlanSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/stocktaking-plan/update` | 修改盘点方案 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmStockTakingPlanSaveReqVO updateReqVO` |
| `PUT` | `/mes/wm/stocktaking-plan/update-status` | 更新盘点方案状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id, @RequestParam("status") Integer status` |
| `DELETE` | `/mes/wm/stocktaking-plan/delete` | 删除盘点方案 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/stocktaking-plan/get` | 获得盘点方案 | `CommonResult<MesWmStockTakingPlanRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/stocktaking-plan/page` | 获得盘点方案分页 | `CommonResult<PageResult<MesWmStockTakingPlanRespVO>>` | `@Valid MesWmStockTakingPlanPageReqVO pageReqVO` |

### 📦 `MesWmStockTakingPlanParamController` (管理后台 - MES 盘点方案参数)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/stocktaking-plan-param/create` | 创建盘点方案参数 | `CommonResult<Long>` | `@Valid @RequestBody MesWmStockTakingPlanParamSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/stocktaking-plan-param/update` | 修改盘点方案参数 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmStockTakingPlanParamSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/stocktaking-plan-param/delete` | 删除盘点方案参数 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/stocktaking-plan-param/get` | 获得盘点方案参数 | `CommonResult<MesWmStockTakingPlanParamRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/stocktaking-plan-param/page` | 获得盘点方案参数分页 | `CommonResult<PageResult<MesWmStockTakingPlanParamRespVO>>` | `@Valid MesWmStockTakingPlanParamPageReqVO pageReqVO` |

### 📦 `MesWmStockTakingTaskController` (管理后台 - MES 盘点任务)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/stocktaking-task/create` | 创建盘点任务 | `CommonResult<Long>` | `@Valid @RequestBody MesWmStockTakingTaskSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/stocktaking-task/update` | 修改盘点任务 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmStockTakingTaskSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/stocktaking-task/delete` | 删除盘点任务 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/stocktaking-task/submit` | 提交盘点任务 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/stocktaking-task/get` | 获得盘点任务 | `CommonResult<MesWmStockTakingTaskRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/stocktaking-task/page` | 获得盘点任务分页 | `CommonResult<PageResult<MesWmStockTakingTaskRespVO>>` | `@Valid MesWmStockTakingTaskPageReqVO pageReqVO` |
| `GET` | `/mes/wm/stocktaking-task/export-excel` | 导出盘点任务 Excel | `void` | `@Valid MesWmStockTakingTaskPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmStockTakingTaskDO> pageResult = stockTakingTaskService.getStockTakingTaskPage(pageReqVO); ExcelUtils.write(response, "盘点任务.xls", "数据", MesWmStockTakingTaskRespVO.class, buildTaskRespVOList(pageResult.getList())); } @PutMapping("/finish") @Operation(summary = "完成盘点任务") @PreAuthorize("@ss.hasPermission('mes:wm-stock-taking-task:finish')") public CommonResult<Boolean> finishStockTakingTask(@Valid @RequestBody MesWmStockTakingTaskFinishReqVO reqVO` |
| `PUT` | `/mes/wm/stocktaking-task/cancel` | 取消盘点任务 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmStockTakingTaskLineController` (管理后台 - MES 盘点任务行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/wm/stocktaking-task-line/get` | 获得盘点任务行 | `CommonResult<MesWmStockTakingTaskLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/stocktaking-task-line/page` | 获得盘点任务行分页 | `CommonResult<PageResult<MesWmStockTakingTaskLineRespVO>>` | `@Valid MesWmStockTakingTaskLinePageReqVO pageReqVO` |
| `POST` | `/mes/wm/stocktaking-task-line/create` | 创建盘点任务行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmStockTakingTaskLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/stocktaking-task-line/update` | 更新盘点任务行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmStockTakingTaskLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/stocktaking-task-line/delete` | 删除盘点任务行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/stocktaking-task-line/simple-list` | 获得盘点任务行精简列表 | `CommonResult<List<MesWmStockTakingTaskLineRespVO>>` | `@RequestParam("taskId") Long taskId` |

### 📦 `MesWmStockTakingTaskResultController` (管理后台 - MES 盘点结果)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mes/wm/stocktaking-task-result/get` | 获得盘点结果 | `CommonResult<MesWmStockTakingTaskResultRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/stocktaking-task-result/page` | 获得盘点结果分页 | `CommonResult<PageResult<MesWmStockTakingTaskResultRespVO>>` | `@Valid MesWmStockTakingTaskResultPageReqVO pageReqVO` |
| `POST` | `/mes/wm/stocktaking-task-result/create` | 创建盘点结果 | `CommonResult<Long>` | `@Valid @RequestBody MesWmStockTakingTaskResultSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/stocktaking-task-result/update` | 更新盘点结果 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmStockTakingTaskResultSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/stocktaking-task-result/delete` | 删除盘点结果 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmTransferController` (管理后台 - MES 转移单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/transfer/create` | 创建转移单 | `CommonResult<Long>` | `@Valid @RequestBody MesWmTransferSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/transfer/update` | 修改转移单 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmTransferSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/transfer/delete` | 删除转移单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/transfer/get` | 获得转移单 | `CommonResult<MesWmTransferRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/transfer/page` | 获得转移单分页 | `CommonResult<PageResult<MesWmTransferRespVO>>` | `@Valid MesWmTransferPageReqVO pageReqVO` |
| `GET` | `/mes/wm/transfer/export-excel` | 导出转移单 Excel | `void` | `@Valid MesWmTransferPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); PageResult<MesWmTransferDO> pageResult = transferService.getTransferPage(pageReqVO); ExcelUtils.write(response, "转移单.xls", "数据", MesWmTransferRespVO.class, BeanUtils.toBean(pageResult.getList(), MesWmTransferRespVO.class)); } @PutMapping("/submit") @Operation(summary = "提交转移单") @Parameter(name = "id", description = "编号", required = true) @PreAuthorize("@ss.hasPermission('mes:wm-transfer:update')") public CommonResult<Boolean> submitTransfer(@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/transfer/confirm` | 确认转移单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/transfer/stock` | 执行上架 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/transfer/finish` | 完成转移单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mes/wm/transfer/cancel` | 取消转移单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MesWmTransferDetailController` (管理后台 - MES 调拨明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/transfer-detail/create` | 创建调拨明细 | `CommonResult<Long>` | `@Valid @RequestBody MesWmTransferDetailSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/transfer-detail/update` | 修改调拨明细 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmTransferDetailSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/transfer-detail/delete` | 删除调拨明细 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/transfer-detail/get` | 获得调拨明细 | `CommonResult<MesWmTransferDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/transfer-detail/list-by-line` | 获得调拨明细列表（按行编号） | `CommonResult<List<MesWmTransferDetailRespVO>>` | `@RequestParam("lineId") Long lineId` |

### 📦 `MesWmTransferLineController` (管理后台 - MES 转移单行)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/transfer-line/create` | 创建转移单行 | `CommonResult<Long>` | `@Valid @RequestBody MesWmTransferLineSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/transfer-line/update` | 修改转移单行 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmTransferLineSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/transfer-line/delete` | 删除转移单行 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/transfer-line/get` | 获得转移单行 | `CommonResult<MesWmTransferLineRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/transfer-line/list` | 获得转移单行列表 | `CommonResult<List<MesWmTransferLineRespVO>>` | `@RequestParam("transferId") Long transferId` |

### 📦 `MesWmWarehouseAreaController` (管理后台 - MES 库位)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/warehouse-area/create` | 创建库位 | `CommonResult<Long>` | `@Valid @RequestBody MesWmWarehouseAreaSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/warehouse-area/update` | 更新库位 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmWarehouseAreaSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/warehouse-area/delete` | 删除库位 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/warehouse-area/get` | 获得库位 | `CommonResult<MesWmWarehouseAreaRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/warehouse-area/page` | 获得库位分页 | `CommonResult<PageResult<MesWmWarehouseAreaRespVO>>` | `@Valid MesWmWarehouseAreaPageReqVO pageReqVO` |
| `GET` | `/mes/wm/warehouse-area/simple-list` | 获得库位精简列表 | `CommonResult<List<MesWmWarehouseAreaRespVO>>` | `@Parameter(name = "locationId", description = "库区编号") @RequestParam(value = "locationId", required = false) Long locationId` |

### 📦 `MesWmWarehouseController` (管理后台 - MES 仓库)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/warehouse/create` | 创建仓库 | `CommonResult<Long>` | `@Valid @RequestBody MesWmWarehouseSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/warehouse/update` | 更新仓库 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmWarehouseSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/warehouse/delete` | 删除仓库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/warehouse/get` | 获得仓库 | `CommonResult<MesWmWarehouseRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/warehouse/page` | 获得仓库分页 | `CommonResult<PageResult<MesWmWarehouseRespVO>>` | `@Valid MesWmWarehousePageReqVO pageReqVO` |
| `GET` | `/mes/wm/warehouse/simple-list` | 获得仓库精简列表 | `CommonResult<List<MesWmWarehouseRespVO>>` | `-` |

### 📦 `MesWmWarehouseLocationController` (管理后台 - MES 库区)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mes/wm/warehouse-location/create` | 创建库区 | `CommonResult<Long>` | `@Valid @RequestBody MesWmWarehouseLocationSaveReqVO createReqVO` |
| `PUT` | `/mes/wm/warehouse-location/update` | 更新库区 | `CommonResult<Boolean>` | `@Valid @RequestBody MesWmWarehouseLocationSaveReqVO updateReqVO` |
| `DELETE` | `/mes/wm/warehouse-location/delete` | 删除库区 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/warehouse-location/get` | 获得库区 | `CommonResult<MesWmWarehouseLocationRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mes/wm/warehouse-location/page` | 获得库区分页 | `CommonResult<PageResult<MesWmWarehouseLocationRespVO>>` | `@Valid MesWmWarehouseLocationPageReqVO pageReqVO` |
| `GET` | `/mes/wm/warehouse-location/simple-list` | 获得库区精简列表 | `CommonResult<List<MesWmWarehouseLocationRespVO>>` | `@Parameter(name = "warehouseId", description = "仓库编号") @RequestParam(value = "warehouseId", required = false) Long warehouseId` |
| `PUT` | `/mes/wm/warehouse-location/update-by-location-id` | 批量设置库区下所有库位的混放规则 | `CommonResult<Boolean>` | `@RequestParam("locationId") Long locationId, @RequestParam(value = "allowItemMixing", required = false) Boolean allowItemMixing, @RequestParam(value = "allowBatchMixing", required = false) Boolean allowBatchMixing` |

### 📦 `MpAccountController` (管理后台 - 公众号账号)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mp/account/create` | 创建公众号账号 | `CommonResult<Long>` | `@Valid @RequestBody MpAccountCreateReqVO createReqVO` |
| `PUT` | `/mp/account/update` | 更新公众号账号 | `CommonResult<Boolean>` | `@Valid @RequestBody MpAccountUpdateReqVO updateReqVO` |
| `DELETE` | `/mp/account/delete` | 删除公众号账号 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mp/account/get` | 获得公众号账号 | `CommonResult<MpAccountRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mp/account/page` | 获得公众号账号分页 | `CommonResult<PageResult<MpAccountRespVO>>` | `@Valid MpAccountPageReqVO pageVO` |
| `GET` | `/mp/account/list-all-simple` | 获取公众号账号精简信息列表 | `CommonResult<List<MpAccountSimpleRespVO>>` | `-` |
| `PUT` | `/mp/account/generate-qr-code` | 生成公众号二维码 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/mp/account/clear-quota` | 清空公众号 API 配额 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MpMaterialController` (管理后台 - 公众号素材)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mp/material/upload-temporary` | 上传永久素材 | `CommonResult<MpMaterialUploadRespVO>` | `@Valid MpMaterialUploadTemporaryReqVO reqVO) throws IOException { MpMaterialDO material = mpMaterialService.uploadTemporaryMaterial(reqVO); return success(MpMaterialConvert.INSTANCE.convert(material)); } @Operation(summary = "上传永久素材") @PostMapping("/upload-permanent") @PreAuthorize("@ss.hasPermission('mp:material:upload-permanent')") public CommonResult<MpMaterialUploadRespVO> uploadPermanentMaterial( @Valid MpMaterialUploadPermanentReqVO reqVO) throws IOException { MpMaterialDO material = mpMaterialService.uploadPermanentMaterial(reqVO); return success(MpMaterialConvert.INSTANCE.convert(material)); } @Operation(summary = "删除素材") @DeleteMapping("/delete-permanent") @Parameter(name = "id", description = "编号", required = true, example = "1024") @PreAuthorize("@ss.hasPermission('mp:material:delete')") public CommonResult<Boolean> deleteMaterial(@RequestParam("id") Long id` |
| `POST` | `/mp/material/upload-news-image` | 获得素材分页 | `CommonResult<String>` | `@Valid MpMaterialUploadNewsImageReqVO reqVO) throws IOException { return success(mpMaterialService.uploadNewsImage(reqVO)); } @Operation(summary = "获得素材分页") @GetMapping("/page") @PreAuthorize("@ss.hasPermission('mp:material:query')") public CommonResult<PageResult<MpMaterialRespVO>> getMaterialPage(@Valid MpMaterialPageReqVO pageReqVO` |

### 📦 `MpMenuController` (管理后台 - 公众号菜单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mp/menu/save` | 保存公众号菜单 | `CommonResult<Boolean>` | `@Valid @RequestBody MpMenuSaveReqVO createReqVO` |
| `DELETE` | `/mp/menu/delete` | 删除公众号菜单 | `CommonResult<Boolean>` | `@RequestParam("accountId") Long accountId` |
| `GET` | `/mp/menu/list` | 获得公众号菜单列表 | `CommonResult<List<MpMenuRespVO>>` | `@RequestParam("accountId") Long accountId` |

### 📦 `MpAutoReplyController` (管理后台 - 公众号自动回复)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mp/auto-reply/page` | 获得公众号自动回复分页 | `CommonResult<PageResult<MpAutoReplyRespVO>>` | `@Valid MpMessagePageReqVO pageVO` |
| `GET` | `/mp/auto-reply/get` | 获得公众号自动回复 | `CommonResult<MpAutoReplyRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/mp/auto-reply/create` | 创建公众号自动回复 | `CommonResult<Long>` | `@Valid @RequestBody MpAutoReplyCreateReqVO createReqVO` |
| `PUT` | `/mp/auto-reply/update` | 更新公众号自动回复 | `CommonResult<Boolean>` | `@Valid @RequestBody MpAutoReplyUpdateReqVO updateReqVO` |
| `DELETE` | `/mp/auto-reply/delete` | 删除公众号自动回复 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `MpMessageController` (管理后台 - 公众号消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mp/message/page` | 获得公众号消息分页 | `CommonResult<PageResult<MpMessageRespVO>>` | `@Valid MpMessagePageReqVO pageVO` |
| `POST` | `/mp/message/send` | 给粉丝发送消息 | `CommonResult<MpMessageRespVO>` | `@Valid @RequestBody MpMessageSendReqVO reqVO` |

### 📦 `MpMessageTemplateController` (管理后台 - 公众号模版消息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `DELETE` | `/mp/message-template/delete` | 删除模版消息 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mp/message-template/get` | 获得模版消息 | `CommonResult<MpMessageTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mp/message-template/list` | 获得模版消息列表 | `CommonResult<List<MpMessageTemplateRespVO>>` | `MpMessageTemplateListReqVO listReqVO` |
| `POST` | `/mp/message-template/sync` | 同步公众号模板 | `CommonResult<Boolean>` | `@RequestParam("accountId") Long accountId` |
| `POST` | `/mp/message-template/send` | 给粉丝发送模版消息 | `CommonResult<Boolean>` | `@Valid @RequestBody MpMessageTemplateSendReqVO sendReqVO` |

### 📦 `MpDraftController` (管理后台 - 公众号草稿)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mp/draft/page` | 获得草稿分页 | `CommonResult<PageResult<WxMpDraftItem>>` | `MpDraftPageReqVO reqVO` |
| `POST` | `/mp/draft/create` | 创建草稿 | `CommonResult<String>` | `@RequestParam("accountId") Long accountId, @RequestBody WxMpAddDraft draft` |
| `PUT` | `/mp/draft/update` | 更新草稿 | `CommonResult<Boolean>` | `@RequestParam("accountId") Long accountId, @RequestParam("mediaId") String mediaId, @RequestBody List<WxMpDraftArticles> articles` |
| `DELETE` | `/mp/draft/delete` | 删除草稿 | `CommonResult<Boolean>` | `@RequestParam("accountId") Long accountId, @RequestParam("mediaId") String mediaId` |

### 📦 `MpFreePublishController` (管理后台 - 公众号发布能力)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mp/free-publish/page` | 获得已发布的图文分页 | `CommonResult<PageResult<WxMpFreePublishItem>>` | `MpFreePublishPageReqVO reqVO` |
| `POST` | `/mp/free-publish/submit` | 发布草稿 | `CommonResult<String>` | `@RequestParam("accountId") Long accountId, @RequestParam("mediaId") String mediaId` |
| `DELETE` | `/mp/free-publish/delete` | 删除草稿 | `CommonResult<Boolean>` | `@RequestParam("accountId") Long accountId, @RequestParam("articleId") String articleId` |

### 📦 `MpOpenController` (管理后台 - 公众号回调)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mp/open` | - | `String` | `@PathVariable("appId") String appId, @RequestBody String content, MpOpenHandleMessageReqVO reqVO` |
| `GET` | `/mp/open` | - | `String` | `@PathVariable("appId") String appId, MpOpenCheckSignatureReqVO reqVO` |

### 📦 `MpStatisticsController` (管理后台 - 公众号统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mp/statistics/user-summary` | 获得粉丝增减数据 | `CommonResult<List<MpStatisticsUserSummaryRespVO>>` | `MpStatisticsGetReqVO getReqVO` |
| `GET` | `/mp/statistics/user-cumulate` | 获得粉丝累计数据 | `CommonResult<List<MpStatisticsUserCumulateRespVO>>` | `MpStatisticsGetReqVO getReqVO` |
| `GET` | `/mp/statistics/upstream-message` | 获取消息发送概况数据 | `CommonResult<List<MpStatisticsUpstreamMessageRespVO>>` | `MpStatisticsGetReqVO getReqVO` |
| `GET` | `/mp/statistics/interface-summary` | 获取消息发送概况数据 | `CommonResult<List<MpStatisticsInterfaceSummaryRespVO>>` | `MpStatisticsGetReqVO getReqVO` |

### 📦 `MpTagController` (管理后台 - 公众号标签)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/mp/tag/create` | 创建公众号标签 | `CommonResult<Long>` | `@Valid @RequestBody MpTagCreateReqVO createReqVO` |
| `PUT` | `/mp/tag/update` | 更新公众号标签 | `CommonResult<Boolean>` | `@Valid @RequestBody MpTagUpdateReqVO updateReqVO` |
| `DELETE` | `/mp/tag/delete` | 删除公众号标签 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/mp/tag/get` | 获取公众号标签详情 | `CommonResult<MpTagRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/mp/tag/page` | 获取公众号标签分页 | `CommonResult<PageResult<MpTagRespVO>>` | `MpTagPageReqVO pageReqVO` |
| `GET` | `/mp/tag/list-all-simple` | 获取公众号账号精简信息列表 | `CommonResult<List<MpTagSimpleRespVO>>` | `-` |
| `POST` | `/mp/tag/sync` | 同步公众号标签 | `CommonResult<Boolean>` | `@RequestParam("accountId") Long accountId` |

### 📦 `MpUserController` (管理后台 - 公众号粉丝)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/mp/user/page` | 获得公众号粉丝分页 | `CommonResult<PageResult<MpUserRespVO>>` | `@Valid MpUserPageReqVO pageVO` |
| `GET` | `/mp/user/get` | 获得公众号粉丝 | `CommonResult<MpUserRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/mp/user/update` | 更新公众号粉丝 | `CommonResult<Boolean>` | `@Valid @RequestBody MpUserUpdateReqVO updateReqVO` |
| `POST` | `/mp/user/sync` | 同步公众号粉丝 | `CommonResult<Boolean>` | `@RequestParam("accountId") Long accountId` |

### 📦 `OaAnnouncementController` (管理后台 - OA 公告)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/announcement/create` | 创建公告 | `CommonResult<Long>` | `@Valid @RequestBody OaAnnouncementSaveReqVO createReqVO` |
| `PUT` | `/oa/announcement/update` | 更新公告 | `CommonResult<Boolean>` | `@Valid @RequestBody OaAnnouncementSaveReqVO updateReqVO` |
| `DELETE` | `/oa/announcement/delete` | 删除发布的公告 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/announcement/published-page` | 获得我发布的公告分页 | `CommonResult<PageResult<OaAnnouncementRespVO>>` | `@Valid OaAnnouncementPageReqVO pageReqVO` |
| `DELETE` | `/oa/announcement/delete-received` | 删除接收的公告 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/announcement/received-page` | 获得接收的公告分页 | `CommonResult<PageResult<OaAnnouncementRespVO>>` | `@Valid OaAnnouncementPageReqVO pageReqVO` |
| `PUT` | `/oa/announcement/update-read-status` | 标记公告为已读 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/oa/announcement/forward` | 转发公告给下属 | `CommonResult<Integer>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/announcement/get` | 获得公告详情 | `CommonResult<OaAnnouncementRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaAttendanceController` (管理后台 - OA 考勤)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/attendance/clock` | 执行当前用户打卡 | `CommonResult<Long>` | `-` |
| `GET` | `/oa/attendance/my-page` | 获得我的考勤分页列表 | `CommonResult<PageResult<OaAttendanceRespVO>>` | `@Valid OaAttendancePageReqVO pageReqVO` |
| `GET` | `/oa/attendance/my-today-list` | 获得我的今日考勤列表 | `CommonResult<List<OaAttendanceRespVO>>` | `-` |
| `PUT` | `/oa/attendance/update` | 更新考勤记录 | `CommonResult<Boolean>` | `@Valid @RequestBody OaAttendanceUpdateReqVO updateReqVO` |
| `DELETE` | `/oa/attendance/delete` | 删除考勤记录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/attendance/get` | 获得考勤详情 | `CommonResult<OaAttendanceRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/attendance/page` | 获得考勤分页列表 | `CommonResult<PageResult<OaAttendanceRespVO>>` | `@Valid OaAttendancePageReqVO pageReqVO` |
| `GET` | `/oa/attendance/week-report` | 获得考勤周报 | `CommonResult<List<OaAttendanceWeekReportRespVO>>` | `@Valid OaAttendanceWeekReportReqVO reqVO` |
| `GET` | `/oa/attendance/month-report` | 获得考勤月报 | `CommonResult<List<OaAttendanceMonthReportRespVO>>` | `@Valid OaAttendanceMonthReportReqVO reqVO` |

### 📦 `OaContactCategoryController` (管理后台 - OA 联系人分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/contact-category/create` | 创建联系人分类 | `CommonResult<Long>` | `@Valid @RequestBody OaContactCategorySaveReqVO createReqVO` |
| `PUT` | `/oa/contact-category/update` | 更新联系人分类 | `CommonResult<Boolean>` | `@Valid @RequestBody OaContactCategorySaveReqVO updateReqVO` |
| `DELETE` | `/oa/contact-category/delete` | 删除联系人分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/contact-category/get` | 获得联系人分类 | `CommonResult<OaContactCategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/contact-category/simple-list` | 获得分类精简列表 | `CommonResult<List<OaContactCategoryRespVO>>` | `-` |
| `GET` | `/oa/contact-category/list` | 获得联系人分类列表 | `CommonResult<List<OaContactCategoryRespVO>>` | `-` |

### 📦 `OaContactController` (管理后台 - OA 通讯录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/contact/create` | 创建外部联系人 | `CommonResult<Long>` | `@Valid @RequestBody OaContactSaveReqVO createReqVO` |
| `PUT` | `/oa/contact/update` | 更新外部联系人 | `CommonResult<Boolean>` | `@Valid @RequestBody OaContactSaveReqVO updateReqVO` |
| `DELETE` | `/oa/contact/delete` | 删除外部联系人 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/oa/contact/share` | 共享外部联系人 | `CommonResult<Boolean>` | `@Valid @RequestBody OaContactShareReqVO shareReqVO` |
| `DELETE` | `/oa/contact/delete-received` | 删除接收到的共享联系人 | `CommonResult<Boolean>` | `@RequestParam("contactId") Long contactId` |
| `PUT` | `/oa/contact/handle-share` | 处理外部联系人共享 | `CommonResult<Boolean>` | `@Valid @RequestBody OaContactHandleReqVO handleReqVO` |
| `GET` | `/oa/contact/get` | 获得外部联系人详情 | `CommonResult<OaContactRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/contact/my-page` | 获得我的联系人分页 | `CommonResult<PageResult<OaContactRespVO>>` | `@Valid OaContactPageReqVO pageReqVO` |
| `GET` | `/oa/contact/received-page` | 获得共享给我的联系人分页 | `CommonResult<PageResult<OaContactRespVO>>` | `@Valid OaContactPageReqVO pageReqVO` |
| `GET` | `/oa/contact/shared-page` | 获得我共享的联系人分页 | `CommonResult<PageResult<OaContactRespVO>>` | `@Valid OaContactPageReqVO pageReqVO` |

### 📦 `OaDiscussionController` (管理后台 - OA 讨论)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/discussion/create` | 创建讨论 | `CommonResult<Long>` | `@Valid @RequestBody OaDiscussionSaveReqVO createReqVO` |
| `PUT` | `/oa/discussion/update` | 更新讨论 | `CommonResult<Boolean>` | `@Valid @RequestBody OaDiscussionSaveReqVO updateReqVO` |
| `DELETE` | `/oa/discussion/delete` | 删除讨论 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/discussion/get` | 获得讨论详情 | `CommonResult<OaDiscussionRespVO>` | `@RequestParam("id") Long id, @RequestParam(value = "visit", defaultValue = "false") Boolean visit` |
| `GET` | `/oa/discussion/page` | 获得讨论分页 | `CommonResult<PageResult<OaDiscussionRespVO>>` | `@Valid OaDiscussionPageReqVO pageReqVO` |
| `GET` | `/oa/discussion/manage-page` | 获得管理范围内的讨论分页 | `CommonResult<PageResult<OaDiscussionRespVO>>` | `@Valid OaDiscussionPageReqVO pageReqVO` |

### 📦 `OaDiscussionLikeController` (管理后台 - OA 讨论点赞)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/discussion-like/create` | 点赞讨论或主回复 | `CommonResult<Boolean>` | `@Valid @RequestBody OaDiscussionLikeReqVO reqVO` |
| `DELETE` | `/oa/discussion-like/delete` | 取消点赞讨论或主回复 | `CommonResult<Boolean>` | `@Valid OaDiscussionLikeReqVO reqVO` |

### 📦 `OaDiscussionReplyController` (管理后台 - OA 讨论回复)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/discussion-reply/create` | 创建讨论回复 | `CommonResult<Long>` | `@Valid @RequestBody OaDiscussionReplyCreateReqVO createReqVO` |
| `DELETE` | `/oa/discussion-reply/delete` | 删除讨论回复 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/discussion-reply/page` | 获得讨论回复分页 | `CommonResult<PageResult<OaDiscussionReplyRespVO>>` | `@Valid OaDiscussionReplyPageReqVO pageReqVO` |

### 📦 `OaDiscussionVoteController` (管理后台 - OA 讨论投票)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/discussion-vote/create` | 参与讨论投票 | `CommonResult<Boolean>` | `@Valid @RequestBody OaDiscussionVoteReqVO voteReqVO` |

### 📦 `OaFileFavoriteController` (管理后台 - 云盘收藏)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/file-favorite/create` | 收藏文件 | `CommonResult<Boolean>` | `@RequestParam("nodeId") Long nodeId` |
| `DELETE` | `/oa/file-favorite/delete` | 取消收藏文件 | `CommonResult<Boolean>` | `@RequestParam("nodeId") Long nodeId` |

### 📦 `OaFileNodeController` (管理后台 - 云盘文件)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/oa/file-node/get-storage` | 获得本人云盘空间 | `CommonResult<OaFileStorageRespVO>` | `-` |
| `GET` | `/oa/file-node/page` | 获得云盘文件分页 | `CommonResult<PageResult<OaFileNodeRespVO>>` | `@Valid OaFileNodePageReqVO pageReqVO` |
| `GET` | `/oa/file-node/directory-list` | 获得本人可用目录列表 | `CommonResult<List<OaFileNodeRespVO>>` | `-` |
| `POST` | `/oa/file-node/create` | 创建云盘文件或目录 | `CommonResult<Long>` | `@Valid @RequestBody OaFileNodeSaveReqVO reqVO` |
| `PUT` | `/oa/file-node/update-name` | 重命名云盘文件 | `CommonResult<Boolean>` | `@Valid @RequestBody OaFileNodeRenameReqVO reqVO` |
| `PUT` | `/oa/file-node/update-parent` | 移动云盘文件 | `CommonResult<Boolean>` | `@Valid @RequestBody OaFileNodeMoveReqVO reqVO` |
| `POST` | `/oa/file-node/copy` | 复制云盘文件或目录 | `CommonResult<Long>` | `@Valid @RequestBody OaFileNodeCopyReqVO reqVO` |
| `PUT` | `/oa/file-node/recycle` | 移入回收站 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/file-node/restore` | 恢复回收站文件 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/oa/file-node/delete` | 彻底删除回收站文件 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/file-node/get` | 获得文件详情 | `CommonResult<OaFileNodeRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaFilePermissionController` (管理后台 - 云盘共享权限)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/oa/file-permission/list` | 获得文件共享权限 | `CommonResult<List<OaFilePermissionRespVO>>` | `@RequestParam("nodeId") Long nodeId` |
| `POST` | `/oa/file-permission/save` | 保存文件共享权限 | `CommonResult<Long>` | `@Valid @RequestBody OaFilePermissionSaveReqVO reqVO` |
| `DELETE` | `/oa/file-permission/delete` | 取消文件共享权限 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `OaLeaveApplyController` (管理后台 - 请假申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/leave-apply/create` | 创建请假申请草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaLeaveApplySaveReqVO createReqVO` |
| `PUT` | `/oa/leave-apply/update` | 更新请假申请草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaLeaveApplySaveReqVO saveReqVO` |
| `POST` | `/oa/leave-apply/submit` | 提交请假申请 | `CommonResult<Boolean>` | `@Valid @RequestBody OaLeaveApplySubmitReqVO submitReqVO` |
| `GET` | `/oa/leave-apply/page` | 获得本人请假申请分页 | `CommonResult<PageResult<OaLeaveApplyRespVO>>` | `@Valid OaLeaveApplyPageReqVO pageReqVO` |
| `GET` | `/oa/leave-apply/get` | 获得请假申请详情 | `CommonResult<OaLeaveApplyRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaMailAccountController` (管理后台 - 企业邮箱账号)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/oa/mail-account/list` | 获得本人邮箱账号列表 | `CommonResult<List<OaMailAccountRespVO>>` | `@RequestParam(value = "status", required = false) Integer status` |
| `GET` | `/oa/mail-account/simple-list` | 获得当前租户邮箱地址精简列表 | `CommonResult<List<OaMailAccountRespVO>>` | `-` |
| `GET` | `/oa/mail-account/get` | 获得本人邮箱账号 | `CommonResult<OaMailAccountRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/oa/mail-account/create` | 绑定本人邮箱账号 | `CommonResult<Long>` | `@Valid @RequestBody OaMailAccountSaveReqVO reqVO` |
| `PUT` | `/oa/mail-account/update` | 更新本人邮箱账号 | `CommonResult<Boolean>` | `@Valid @RequestBody OaMailAccountSaveReqVO reqVO` |
| `PUT` | `/oa/mail-account/update-default` | 设置本人默认发件账号 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/oa/mail-account/delete` | 移除本人邮箱绑定 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `OaMailFolderController` (管理后台 - 企业邮箱文件夹)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/oa/mail-folder/list` | 获得邮箱文件夹列表 | `CommonResult<List<OaMailFolderRespVO>>` | `@RequestParam Long accountId` |

### 📦 `OaMailMessageController` (管理后台 - 企业邮箱邮件)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/oa/mail-message/compose` | 获得写信预填数据 | `CommonResult<OaMailMessageSaveReqVO>` | `@RequestParam Long id, @RequestParam @InEnum(value = OaMailComposeModeEnum.class, message = "写信方式必须是 {value}") String mode` |
| `POST` | `/oa/mail-message/sync` | 同步本人邮箱索引 | `CommonResult<Integer>` | `@RequestParam Long accountId` |
| `GET` | `/oa/mail-message/page` | 获得邮件索引分页 | `CommonResult<PageResult<OaMailMessageRespVO>>` | `@Valid OaMailMessagePageReqVO reqVO` |
| `GET` | `/oa/mail-message/get` | 获得邮件详情 | `CommonResult<OaMailMessageRespVO>` | `@RequestParam Long id` |
| `PUT` | `/oa/mail-message/update-read` | 更新邮件已读状态 | `CommonResult<Boolean>` | `@RequestParam Long id, @RequestParam Boolean readStatus` |
| `DELETE` | `/oa/mail-message/delete` | 删除邮件 | `CommonResult<Boolean>` | `@RequestParam Long id` |
| `PUT` | `/oa/mail-message/restore` | 恢复邮件到收件箱 | `CommonResult<Boolean>` | `@RequestParam Long id` |
| `POST` | `/oa/mail-message` | 保存草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaMailMessageSaveReqVO reqVO` |
| `POST` | `/oa/mail-message` | 发送邮件 | `CommonResult<String>` | `@Valid @RequestBody OaMailMessageSaveReqVO reqVO` |
| `POST` | `/oa/mail-message` | 保存带附件的草稿 | `CommonResult<Long>` | `@Valid @RequestPart("data") OaMailMessageSaveReqVO reqVO, @RequestPart(value = "files", required = false) List<MultipartFile> files` |
| `POST` | `/oa/mail-message` | 发送带附件的邮件 | `CommonResult<String>` | `@Valid @RequestPart("data") OaMailMessageSaveReqVO reqVO, @RequestPart(value = "files", required = false) List<MultipartFile> files` |

### 📦 `OaMailProviderController` (管理后台 - 企业邮箱服务配置)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/oa/mail-provider/list` | 获得邮箱服务配置列表 | `CommonResult<List<OaMailProviderRespVO>>` | `@RequestParam(value = "status", required = false) Integer status` |
| `GET` | `/oa/mail-provider/simple-list` | 获得邮箱服务配置精简列表 | `CommonResult<List<OaMailProviderRespVO>>` | `-` |
| `GET` | `/oa/mail-provider/get` | 获得邮箱服务配置 | `CommonResult<OaMailProviderRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/oa/mail-provider/create` | 创建邮箱服务配置 | `CommonResult<Long>` | `@Valid @RequestBody OaMailProviderSaveReqVO reqVO` |
| `PUT` | `/oa/mail-provider/update` | 更新邮箱服务配置 | `CommonResult<Boolean>` | `@Valid @RequestBody OaMailProviderSaveReqVO reqVO` |
| `DELETE` | `/oa/mail-provider/delete` | 删除邮箱服务配置 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `OaMeetingRoomBookingController` (管理后台 - 会议室预定)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/meeting-room-booking/create` | 创建会议室预定草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaMeetingRoomBookingSaveReqVO reqVO` |
| `PUT` | `/oa/meeting-room-booking/update` | 更新会议室预定草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaMeetingRoomBookingSaveReqVO reqVO` |
| `DELETE` | `/oa/meeting-room-booking/delete` | 删除会议室预定草稿 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/meeting-room-booking/get` | 获得会议室预定详情 | `CommonResult<OaMeetingRoomBookingRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/meeting-room-booking/page` | 获得本人的会议室预定分页 | `CommonResult<PageResult<OaMeetingRoomBookingRespVO>>` | `@Valid OaMeetingRoomBookingPageReqVO reqVO` |
| `PUT` | `/oa/meeting-room-booking/submit` | 提交会议室预定 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/meeting-room-booking/cancel` | 取消会议室预定 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/meeting-room-booking/start` | 开始使用会议室预定 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/meeting-room-booking/finish` | 完成使用会议室预定 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/meeting-room-booking/schedule` | 获得会议室日程 | `CommonResult<List<OaMeetingRoomBookingRespVO>>` | `@Valid OaMeetingRoomBookingScheduleReqVO reqVO` |

### 📦 `OaMeetingRoomController` (管理后台 - 会议室)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/meeting-room/create` | 创建会议室 | `CommonResult<Long>` | `@Valid @RequestBody OaMeetingRoomSaveReqVO reqVO` |
| `PUT` | `/oa/meeting-room/update` | 更新会议室 | `CommonResult<Boolean>` | `@Valid @RequestBody OaMeetingRoomSaveReqVO reqVO` |
| `DELETE` | `/oa/meeting-room/delete` | 删除会议室 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/meeting-room/get` | 获得会议室详情 | `CommonResult<OaMeetingRoomRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/meeting-room/page` | 获得会议室分页 | `CommonResult<PageResult<OaMeetingRoomRespVO>>` | `@Valid OaMeetingRoomPageReqVO reqVO` |
| `GET` | `/oa/meeting-room/bookable-page` | 获得可预定会议室分页 | `CommonResult<PageResult<OaMeetingRoomRespVO>>` | `@Valid OaMeetingRoomPageReqVO reqVO` |

### 📦 `OaNoteCategoryController` (管理后台 - OA 笔记目录)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/note-category/create` | 创建笔记目录 | `CommonResult<Long>` | `@Valid @RequestBody OaNoteCategorySaveReqVO createReqVO` |
| `PUT` | `/oa/note-category/update` | 更新笔记目录 | `CommonResult<Boolean>` | `@Valid @RequestBody OaNoteCategorySaveReqVO updateReqVO` |
| `DELETE` | `/oa/note-category/delete` | 删除笔记目录 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/note-category/get` | 获得笔记目录 | `CommonResult<OaNoteCategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/note-category/simple-list` | 获得笔记目录精简列表 | `CommonResult<List<OaNoteCategoryRespVO>>` | `-` |
| `GET` | `/oa/note-category/list` | 获得笔记目录列表 | `CommonResult<List<OaNoteCategoryRespVO>>` | `-` |

### 📦 `OaNoteController` (管理后台 - OA 笔记)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/note/create` | 创建笔记 | `CommonResult<Long>` | `@Valid @RequestBody OaNoteSaveReqVO createReqVO` |
| `PUT` | `/oa/note/update` | 更新笔记 | `CommonResult<Boolean>` | `@Valid @RequestBody OaNoteSaveReqVO updateReqVO` |
| `DELETE` | `/oa/note/delete` | 删除笔记 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/oa/note/delete-received` | 移除收到的共享笔记 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/note/update-favorite` | 更新笔记收藏状态 | `CommonResult<Boolean>` | `@Valid @RequestBody OaNoteFavoriteUpdateReqVO updateReqVO` |
| `PUT` | `/oa/note/update-share` | 更新笔记共享接收人 | `CommonResult<Boolean>` | `@Valid @RequestBody OaNoteShareUpdateReqVO updateReqVO` |
| `GET` | `/oa/note/get` | 获得笔记详情 | `CommonResult<OaNoteRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/note/my-page` | 获得我的笔记分页 | `CommonResult<PageResult<OaNoteRespVO>>` | `@Valid OaNotePageReqVO pageReqVO` |
| `GET` | `/oa/note/received-page` | 获得共享给我的笔记分页 | `CommonResult<PageResult<OaNoteRespVO>>` | `@Valid OaNotePageReqVO pageReqVO` |

### 📦 `OaOfficialDocReceiveController` (管理后台 - 公文收文)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/officialdoc-receive/create` | 创建公文收文 | `CommonResult<Long>` | `@Valid @RequestBody OaOfficialDocReceiveSaveReqVO reqVO` |
| `PUT` | `/oa/officialdoc-receive/update` | 更新公文收文 | `CommonResult<Boolean>` | `@Valid @RequestBody OaOfficialDocReceiveSaveReqVO reqVO` |
| `DELETE` | `/oa/officialdoc-receive/delete` | 删除公文收文 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/oa/officialdoc-receive/submit` | 提交公文收文审批 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/officialdoc-receive/cancel` | 撤销公文收文审批 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/officialdoc-receive/claim` | 签收公文收文 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/officialdoc-receive/page` | 获得公文收文分页列表 | `CommonResult<PageResult<OaOfficialDocReceiveRespVO>>` | `@Valid OaOfficialDocReceivePageReqVO pageReqVO` |
| `GET` | `/oa/officialdoc-receive/get` | 获得公文收文详情 | `CommonResult<OaOfficialDocReceiveRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaOfficialDocSendController` (管理后台 - 公文发文)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/officialdoc-send/create` | 创建公文发文 | `CommonResult<Long>` | `@Valid @RequestBody OaOfficialDocSendSaveReqVO reqVO` |
| `PUT` | `/oa/officialdoc-send/update` | 更新公文发文 | `CommonResult<Boolean>` | `@Valid @RequestBody OaOfficialDocSendSaveReqVO reqVO` |
| `DELETE` | `/oa/officialdoc-send/delete` | 删除公文发文 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/oa/officialdoc-send/submit` | 提交公文发文审批 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/officialdoc-send/cancel` | 撤销公文发文审批 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/officialdoc-send/page` | 获得公文发文分页列表 | `CommonResult<PageResult<OaOfficialDocSendRespVO>>` | `@Valid OaOfficialDocSendPageReqVO pageReqVO` |
| `GET` | `/oa/officialdoc-send/get` | 获得公文发文详情 | `CommonResult<OaOfficialDocSendRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaOfficialDocTemplateController` (管理后台 - 套红模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/officialdoc-template/create` | 创建套红模板 | `CommonResult<Long>` | `@Valid @RequestBody OaOfficialDocTemplateSaveReqVO reqVO` |
| `PUT` | `/oa/officialdoc-template/update` | 更新套红模板 | `CommonResult<Boolean>` | `@Valid @RequestBody OaOfficialDocTemplateSaveReqVO reqVO` |
| `DELETE` | `/oa/officialdoc-template/delete` | 删除套红模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/officialdoc-template/page` | 获得套红模板分页列表 | `CommonResult<PageResult<OaOfficialDocTemplateRespVO>>` | `@Valid OaOfficialDocTemplatePageReqVO pageReqVO` |
| `GET` | `/oa/officialdoc-template/simple-list` | 获得套红模板精简列表 | `CommonResult<List<OaOfficialDocTemplateRespVO>>` | `-` |
| `GET` | `/oa/officialdoc-template/get` | 获得套红模板详情 | `CommonResult<OaOfficialDocTemplateRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaOvertimeApplyController` (管理后台 - 加班申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/overtime-apply/create` | 创建加班申请草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaOvertimeApplySaveReqVO createReqVO` |
| `PUT` | `/oa/overtime-apply/update` | 更新加班申请草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaOvertimeApplySaveReqVO saveReqVO` |
| `POST` | `/oa/overtime-apply/submit` | 提交加班申请 | `CommonResult<Boolean>` | `@Valid @RequestBody OaOvertimeApplySubmitReqVO submitReqVO` |
| `GET` | `/oa/overtime-apply/page` | 获得本人加班申请分页 | `CommonResult<PageResult<OaOvertimeApplyRespVO>>` | `@Valid OaOvertimeApplyPageReqVO pageReqVO` |
| `GET` | `/oa/overtime-apply/get` | 获得加班申请详情 | `CommonResult<OaOvertimeApplyRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaPlanController` (管理后台 - OA 工作计划)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/plan/create` | 创建工作计划 | `CommonResult<Long>` | `@Valid @RequestBody OaPlanSaveReqVO createReqVO` |
| `PUT` | `/oa/plan/update` | 更新工作计划 | `CommonResult<Boolean>` | `@Valid @RequestBody OaPlanSaveReqVO updateReqVO` |
| `DELETE` | `/oa/plan/delete` | 删除工作计划 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/plan/get` | 获得工作计划详情 | `CommonResult<OaPlanRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/plan/page` | 获得工作计划分页 | `CommonResult<PageResult<OaPlanRespVO>>` | `@Valid OaPlanPageReqVO pageReqVO` |
| `GET` | `/oa/plan/report-page` | 获得工作计划报表分页 | `CommonResult<PageResult<OaPlanReportRespVO>>` | `@Valid OaPlanReportPageReqVO pageReqVO` |
| `PUT` | `/oa/plan/add-comment` | 点评工作计划 | `CommonResult<Boolean>` | `@Valid @RequestBody OaPlanCommentReqVO updateReqVO` |

### 📦 `OaRegularApplyController` (管理后台 - 转正申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/regular-apply/create` | 创建转正申请草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaRegularApplySaveReqVO createReqVO` |
| `PUT` | `/oa/regular-apply/update` | 更新转正申请草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaRegularApplySaveReqVO saveReqVO` |
| `POST` | `/oa/regular-apply/submit` | 提交转正申请 | `CommonResult<Boolean>` | `@Valid @RequestBody OaRegularApplySubmitReqVO submitReqVO` |
| `GET` | `/oa/regular-apply/page` | 获得本人转正申请分页 | `CommonResult<PageResult<OaRegularApplyRespVO>>` | `@Valid OaRegularApplyPageReqVO pageReqVO` |
| `GET` | `/oa/regular-apply/get` | 获得转正申请详情 | `CommonResult<OaRegularApplyRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaReimbursementController` (管理后台 - 费用报销)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/reimbursement/create` | 创建费用报销草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaReimbursementSaveReqVO createReqVO` |
| `PUT` | `/oa/reimbursement/update` | 更新费用报销草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaReimbursementSaveReqVO saveReqVO` |
| `POST` | `/oa/reimbursement/submit` | 提交费用报销 | `CommonResult<Boolean>` | `@Valid @RequestBody OaReimbursementSubmitReqVO submitReqVO` |
| `GET` | `/oa/reimbursement/page` | 获得本人费用报销分页 | `CommonResult<PageResult<OaReimbursementRespVO>>` | `@Valid OaReimbursementPageReqVO pageReqVO` |
| `GET` | `/oa/reimbursement/get` | 获得费用报销详情 | `CommonResult<OaReimbursementRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaResignApplyController` (管理后台 - 离职申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/resign-apply/create` | 创建离职申请草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaResignApplySaveReqVO createReqVO` |
| `PUT` | `/oa/resign-apply/update` | 更新离职申请草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaResignApplySaveReqVO saveReqVO` |
| `POST` | `/oa/resign-apply/submit` | 提交离职申请 | `CommonResult<Boolean>` | `@Valid @RequestBody OaResignApplySubmitReqVO submitReqVO` |
| `GET` | `/oa/resign-apply/page` | 获得本人离职申请分页 | `CommonResult<PageResult<OaResignApplyRespVO>>` | `@Valid OaResignApplyPageReqVO pageReqVO` |
| `GET` | `/oa/resign-apply/get` | 获得离职申请详情 | `CommonResult<OaResignApplyRespVO>` | `@RequestParam("id") Long id` |

### 📦 `OaScheduleController` (管理后台 - OA 日程)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/schedule/create` | 创建日程 | `CommonResult<Long>` | `@Valid @RequestBody OaScheduleSaveReqVO createReqVO` |
| `PUT` | `/oa/schedule/update` | 更新日程 | `CommonResult<Boolean>` | `@Valid @RequestBody OaScheduleSaveReqVO updateReqVO` |
| `DELETE` | `/oa/schedule/delete` | 删除日程 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/schedule/get` | 获得日程详情 | `CommonResult<OaScheduleRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/schedule/update-read-status` | 标记本人已阅读日程 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/schedule/page` | 获得日程分页 | `CommonResult<PageResult<OaScheduleRespVO>>` | `@Valid OaSchedulePageReqVO pageReqVO` |
| `GET` | `/oa/schedule/my-page` | 获得我的日程分页 | `CommonResult<PageResult<OaScheduleRespVO>>` | `@Valid OaSchedulePageReqVO pageReqVO` |
| `GET` | `/oa/schedule/received-page` | 获得共享给我的日程分页 | `CommonResult<PageResult<OaScheduleRespVO>>` | `@Valid OaSchedulePageReqVO pageReqVO` |

### 📦 `OaSealApplyController` (管理后台 - 用印申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/oa/seal-apply/seal-page` | 获得可申请的印章分页 | `CommonResult<PageResult<OaSealRespVO>>` | `@Valid OaSealPageReqVO pageReqVO` |
| `POST` | `/oa/seal-apply/create` | 创建用印申请草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaSealApplySaveReqVO reqVO` |
| `PUT` | `/oa/seal-apply/update` | 更新用印申请草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaSealApplySaveReqVO reqVO` |
| `DELETE` | `/oa/seal-apply/delete` | 删除用印申请草稿 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/seal-apply/submit` | 提交用印申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/seal-apply/cancel` | 撤销用印申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/seal-apply/get` | 获得用印申请 | `CommonResult<OaSealApplyRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/seal-apply/page` | 获得本人的用印申请分页 | `CommonResult<PageResult<OaSealApplyRespVO>>` | `@Valid OaSealApplyPageReqVO pageReqVO` |

### 📦 `OaSealController` (管理后台 - 印章)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/seal/create` | 创建印章 | `CommonResult<Long>` | `@Valid @RequestBody OaSealSaveReqVO createReqVO` |
| `PUT` | `/oa/seal/update` | 更新印章 | `CommonResult<Boolean>` | `@Valid @RequestBody OaSealSaveReqVO updateReqVO` |
| `DELETE` | `/oa/seal/delete` | 删除印章 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/seal/get` | 获得印章 | `CommonResult<OaSealRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/seal/page` | 获得印章分页 | `CommonResult<PageResult<OaSealRespVO>>` | `@Valid OaSealPageReqVO pageReqVO` |

### 📦 `OaSupplyApplyController` (管理后台 - 用品领用申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/supply-apply/create` | 创建用品领用申请 | `CommonResult<Long>` | `@Valid @RequestBody OaSupplyApplySaveReqVO reqVO` |
| `PUT` | `/oa/supply-apply/update` | 更新用品领用申请 | `CommonResult<Boolean>` | `@Valid @RequestBody OaSupplyApplySaveReqVO reqVO` |
| `DELETE` | `/oa/supply-apply/delete` | 删除用品领用申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/supply-apply/submit` | 提交用品领用申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/supply-apply/cancel` | 取消用品领用申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/supply-apply/get` | 获得用品领用申请 | `CommonResult<OaSupplyApplyRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/supply-apply/page` | 获得本人的用品领用申请分页 | `CommonResult<PageResult<OaSupplyApplyRespVO>>` | `@Valid OaSupplyApplyPageReqVO reqVO` |

### 📦 `OaSupplyIssueController` (管理后台 - 领用发放)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/oa/supply-issue/page` | 获得领用发放分页 | `CommonResult<PageResult<OaSupplyIssueRespVO>>` | `@Valid OaSupplyIssuePageReqVO reqVO` |
| `PUT` | `/oa/supply-issue/issue` | 发放用品 | `CommonResult<Boolean>` | `@Valid @RequestBody OaSupplyIssueReqVO reqVO` |
| `PUT` | `/oa/supply-issue/return` | 确认归还用品 | `CommonResult<Boolean>` | `@Valid @RequestBody OaSupplyReturnReqVO reqVO` |

### 📦 `OaSupplyItemController` (管理后台 - 办公用品)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/supply-item/create` | 创建办公用品 | `CommonResult<Long>` | `@Valid @RequestBody OaSupplyItemSaveReqVO reqVO` |
| `PUT` | `/oa/supply-item/update` | 更新办公用品 | `CommonResult<Boolean>` | `@Valid @RequestBody OaSupplyItemSaveReqVO reqVO` |
| `DELETE` | `/oa/supply-item/delete` | 删除办公用品 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/supply-item/get` | 获得办公用品 | `CommonResult<OaSupplyItemRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/supply-item/page` | 获得办公用品分页 | `CommonResult<PageResult<OaSupplyItemRespVO>>` | `@Valid OaSupplyItemPageReqVO reqVO` |
| `GET` | `/oa/supply-item/select-page` | 获得可领用的办公用品分页 | `CommonResult<PageResult<OaSupplyItemRespVO>>` | `@Valid OaSupplyItemPageReqVO reqVO` |
| `PUT` | `/oa/supply-item/stock-in` | 办公用品入库 | `CommonResult<Boolean>` | `@Valid @RequestBody OaSupplyItemStockInReqVO reqVO` |

### 📦 `OaTaskController` (管理后台 - OA 任务)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/task/create` | 创建任务 | `CommonResult<Long>` | `@Valid @RequestBody OaTaskSaveReqVO createReqVO` |
| `PUT` | `/oa/task/update` | 更新任务 | `CommonResult<Boolean>` | `@Valid @RequestBody OaTaskSaveReqVO updateReqVO` |
| `DELETE` | `/oa/task/delete` | 删除发布的任务 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/task/published-page` | 获得我发布的任务分页 | `CommonResult<PageResult<OaTaskRespVO>>` | `@Valid OaTaskPageReqVO pageReqVO` |
| `DELETE` | `/oa/task/delete-received` | 删除接收的任务 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/task/received-page` | 获得我的任务分页 | `CommonResult<PageResult<OaTaskRespVO>>` | `@Valid OaTaskPageReqVO pageReqVO` |
| `POST` | `/oa/task/feedback` | 创建任务反馈 | `CommonResult<Boolean>` | `@Valid @RequestBody OaTaskFeedbackReqVO createReqVO` |
| `GET` | `/oa/task/get` | 获得任务详情 | `CommonResult<OaTaskRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/task/get-status-count` | 获得我的任务状态统计 | `CommonResult<List<OaTaskRankingRespVO>>` | `-` |

### 📦 `OaTravelApplyController` (管理后台 - 出差申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/travel-apply/create` | 创建出差申请草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaTravelApplySaveReqVO reqVO` |
| `PUT` | `/oa/travel-apply/update` | 更新出差申请草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaTravelApplySaveReqVO reqVO` |
| `POST` | `/oa/travel-apply/submit` | 提交出差申请 | `CommonResult<Boolean>` | `@Valid @RequestBody OaTravelApplySubmitReqVO submitReqVO` |
| `PUT` | `/oa/travel-apply/cancel` | 撤回出差申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/oa/travel-apply/delete` | 删除出差申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/travel-apply/get` | 获得出差申请详情 | `CommonResult<OaTravelApplyRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/travel-apply/page` | 获得本人出差申请分页 | `CommonResult<PageResult<OaTravelApplyRespVO>>` | `@Valid OaTravelApplyPageReqVO reqVO` |
| `GET` | `/oa/travel-apply/approved-list` | 获得本人可关联的已通过出差申请 | `CommonResult<List<OaTravelApplyRespVO>>` | `-` |

### 📦 `OaTravelReimbursementController` (管理后台 - 出差报销)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/travel-reimbursement/create` | 创建出差报销草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaTravelReimbursementSaveReqVO reqVO` |
| `PUT` | `/oa/travel-reimbursement/update` | 更新出差报销草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaTravelReimbursementSaveReqVO reqVO` |
| `POST` | `/oa/travel-reimbursement/submit` | 提交出差报销 | `CommonResult<Boolean>` | `@Valid @RequestBody OaTravelReimbursementSubmitReqVO submitReqVO` |
| `PUT` | `/oa/travel-reimbursement/cancel` | 撤回出差报销 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/oa/travel-reimbursement/delete` | 删除出差报销 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/travel-reimbursement/get` | 获得出差报销详情 | `CommonResult<OaTravelReimbursementRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/travel-reimbursement/page` | 获得本人出差报销分页 | `CommonResult<PageResult<OaTravelReimbursementRespVO>>` | `@Valid OaTravelReimbursementPageReqVO reqVO` |

### 📦 `OaVehicleApplyController` (管理后台 - 用车申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/oa/vehicle-apply/vehicle-page` | 获得用车申请可选的车辆分页 | `CommonResult<PageResult<OaVehicleRespVO>>` | `@Valid OaVehiclePageReqVO pageReqVO` |
| `POST` | `/oa/vehicle-apply/create` | 创建用车申请草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaVehicleApplySaveReqVO reqVO` |
| `PUT` | `/oa/vehicle-apply/update` | 更新用车申请草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaVehicleApplySaveReqVO reqVO` |
| `DELETE` | `/oa/vehicle-apply/delete` | 删除用车申请草稿 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/vehicle-apply/submit` | 提交用车申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/vehicle-apply/cancel` | 撤销用车申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/vehicle-apply/get` | 获得用车申请详情 | `CommonResult<OaVehicleApplyRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/vehicle-apply/page` | 获得本人的用车申请分页 | `CommonResult<PageResult<OaVehicleApplyRespVO>>` | `@Valid OaVehicleApplyPageReqVO pageReqVO` |

### 📦 `OaVehicleController` (管理后台 - 车辆)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/vehicle/create` | 创建车辆 | `CommonResult<Long>` | `@Valid @RequestBody OaVehicleSaveReqVO createReqVO` |
| `PUT` | `/oa/vehicle/update` | 更新车辆 | `CommonResult<Boolean>` | `@Valid @RequestBody OaVehicleSaveReqVO updateReqVO` |
| `DELETE` | `/oa/vehicle/delete` | 删除车辆 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/vehicle/get` | 获得车辆 | `CommonResult<OaVehicleRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/vehicle/page` | 获得车辆分页 | `CommonResult<PageResult<OaVehicleRespVO>>` | `@Valid OaVehiclePageReqVO pageReqVO` |

### 📦 `OaVehicleReturnController` (管理后台 - 还车申请)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/vehicle-return/create` | 创建还车申请草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaVehicleReturnSaveReqVO reqVO` |
| `PUT` | `/oa/vehicle-return/update` | 更新还车申请草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaVehicleReturnSaveReqVO reqVO` |
| `DELETE` | `/oa/vehicle-return/delete` | 删除还车申请草稿 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/vehicle-return/submit` | 提交还车申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/vehicle-return/cancel` | 取消还车申请 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/vehicle-return/get` | 获得还车申请详情 | `CommonResult<OaVehicleReturnRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/vehicle-return/page` | 获得本人还车申请分页 | `CommonResult<PageResult<OaVehicleReturnRespVO>>` | `@Valid OaVehicleReturnPageReqVO pageReqVO` |

### 📦 `OaWorkReportController` (管理后台 - OA 工作汇报)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/oa/work-report/create` | 创建工作汇报草稿 | `CommonResult<Long>` | `@Valid @RequestBody OaWorkReportSaveReqVO createReqVO` |
| `PUT` | `/oa/work-report/update` | 更新工作汇报草稿 | `CommonResult<Boolean>` | `@Valid @RequestBody OaWorkReportSaveReqVO updateReqVO` |
| `DELETE` | `/oa/work-report/delete` | 删除工作汇报草稿 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/work-report/submit` | 提交工作汇报 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/oa/work-report/cancel` | 取消提交工作汇报 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/work-report/get` | 获得工作汇报详情 | `CommonResult<OaWorkReportRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/oa/work-report/page` | 获得我的工作汇报分页 | `CommonResult<PageResult<OaWorkReportRespVO>>` | `@Valid OaWorkReportPageReqVO pageReqVO` |
| `GET` | `/oa/work-report/statistics` | 获得工作汇报统计 | `CommonResult<OaWorkReportStatisticsRespVO>` | `@Valid OaWorkReportStatisticsReqVO reqVO` |

### 📦 `PayAppController` (管理后台 - 支付应用信息)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pay/app/create` | 创建支付应用信息 | `CommonResult<Long>` | `@Valid @RequestBody PayAppCreateReqVO createReqVO` |
| `PUT` | `/pay/app/update` | 更新支付应用信息 | `CommonResult<Boolean>` | `@Valid @RequestBody PayAppUpdateReqVO updateReqVO` |
| `PUT` | `/pay/app/update-status` | 更新支付应用状态 | `CommonResult<Boolean>` | `@Valid @RequestBody PayAppUpdateStatusReqVO updateReqVO` |
| `DELETE` | `/pay/app/delete` | 删除支付应用信息 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pay/app/get` | 获得支付应用信息 | `CommonResult<PayAppRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pay/app/page` | 获得支付应用信息分页 | `CommonResult<PageResult<PayAppPageItemRespVO>>` | `@Valid PayAppPageReqVO pageVO` |
| `GET` | `/pay/app/list` | 获得应用列表 | `CommonResult<List<PayAppRespVO>>` | `-` |

### 📦 `PayChannelController` (管理后台 - 支付渠道)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pay/channel/create` | 创建支付渠道  | `CommonResult<Long>` | `@Valid @RequestBody PayChannelCreateReqVO createReqVO` |
| `PUT` | `/pay/channel/update` | 更新支付渠道  | `CommonResult<Boolean>` | `@Valid @RequestBody PayChannelUpdateReqVO updateReqVO` |
| `DELETE` | `/pay/channel/delete` | 删除支付渠道  | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pay/channel/get` | 获得支付渠道 | `CommonResult<PayChannelRespVO>` | `@RequestParam(value = "id", required = false) Long id, @RequestParam(value = "appId", required = false) Long appId, @RequestParam(value = "code", required = false) String code` |
| `GET` | `/pay/channel/list` | 获得指定应用的支付渠道列表 | `CommonResult<List<PayChannelRespVO>>` | `@RequestParam("appId") Long appId` |
| `GET` | `/pay/channel/get-enable-code-list` | 获得指定应用的开启的支付渠道编码列表 | `CommonResult<Set<String>>` | `@RequestParam("appId") Long appId` |

### 📦 `PayDemoOrderController` (管理后台 - 示例订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pay/demo-order/create` | 创建示例订单 | `CommonResult<Long>` | `@Valid @RequestBody PayDemoOrderCreateReqVO createReqVO` |
| `GET` | `/pay/demo-order/page` | 获得示例订单分页 | `CommonResult<PageResult<PayDemoOrderRespVO>>` | `@Valid PageParam pageVO` |
| `POST` | `/pay/demo-order/update-paid` | 更新示例订单为已支付 | `CommonResult<Boolean>` | `@RequestBody PayOrderNotifyReqDTO notifyReqDTO` |
| `PUT` | `/pay/demo-order/refund` | 发起示例订单的退款 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/pay/demo-order/update-refunded` | 更新示例订单为已退款 | `CommonResult<Boolean>` | `@RequestBody PayRefundNotifyReqDTO notifyReqDTO` |

### 📦 `PayDemoWithdrawController` (管理后台 - 示例提现订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pay/demo-withdraw/create` | 创建示例提现单 | `CommonResult<Long>` | `@Valid @RequestBody PayDemoWithdrawCreateReqVO createReqVO` |
| `POST` | `/pay/demo-withdraw/transfer` | 提现单转账 | `CommonResult<Long>` | `@RequestParam("id") Long id` |
| `GET` | `/pay/demo-withdraw/page` | 获得示例提现单分页 | `CommonResult<PageResult<PayDemoWithdrawRespVO>>` | `@Valid PageParam pageVO` |
| `POST` | `/pay/demo-withdraw/update-transferred` | 更新示例提现单的转账状态 | `CommonResult<Boolean>` | `@RequestBody PayTransferNotifyReqDTO notifyReqDTO` |

### 📦 `PayNotifyController` (管理后台 - 回调通知)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pay/notify` | 支付渠道的统一【支付】回调 | `String` | `@PathVariable("channelId") Long channelId, @RequestParam(required = false) Map<String, String> params, @RequestBody(required = false) String body, @RequestHeader Map<String, String> headers` |
| `POST` | `/pay/notify` | 支付渠道的统一【退款】回调 | `String` | `@PathVariable("channelId") Long channelId, @RequestParam(required = false) Map<String, String> params, @RequestBody(required = false) String body, @RequestHeader Map<String, String> headers` |
| `POST` | `/pay/notify` | 支付渠道的统一【转账】回调 | `String` | `@PathVariable("channelId") Long channelId, @RequestParam(required = false) Map<String, String> params, @RequestBody(required = false) String body, @RequestHeader Map<String, String> headers` |
| `GET` | `/pay/notify/get-detail` | 获得回调通知的明细 | `CommonResult<PayNotifyTaskDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pay/notify/page` | 获得回调通知分页 | `CommonResult<PageResult<PayNotifyTaskRespVO>>` | `@Valid PayNotifyTaskPageReqVO pageVO` |

### 📦 `PayOrderController` (管理后台 - 支付订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/order/get` | 获得支付订单 | `CommonResult<PayOrderRespVO>` | `@RequestParam("id") Long id, @RequestParam(value = "sync", required = false) Boolean sync` |
| `GET` | `/pay/order/get-detail` | 获得支付订单详情 | `CommonResult<PayOrderDetailsRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/pay/order/submit` | 提交支付订单 | `CommonResult<PayOrderSubmitRespVO>` | `@RequestBody PayOrderSubmitReqVO reqVO` |
| `GET` | `/pay/order/page` | 获得支付订单分页 | `CommonResult<PageResult<PayOrderPageItemRespVO>>` | `@Valid PayOrderPageReqVO pageVO` |
| `GET` | `/pay/order/export-excel` | 导出支付订单 Excel | `void` | `@Valid PayOrderExportReqVO exportReqVO, HttpServletResponse response) throws IOException { List<PayOrderDO> list = orderService.getOrderList(exportReqVO); if (CollectionUtil.isEmpty(list)` |

### 📦 `PayRefundController` (管理后台 - 退款订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/refund/get` | 获得退款订单 | `CommonResult<PayRefundDetailsRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pay/refund/page` | 获得退款订单分页 | `CommonResult<PageResult<PayRefundPageItemRespVO>>` | `@Valid PayRefundPageReqVO pageVO` |

### 📦 `PayTransferController` (管理后台 - 转账单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/transfer/get` | 获得转账订单 | `CommonResult<PayTransferRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pay/transfer/page` | 获得转账订单分页 | `CommonResult<PageResult<PayTransferRespVO>>` | `@Valid PayTransferPageReqVO pageVO` |

### 📦 `PayWalletController` (管理后台 - 用户钱包)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/wallet/get` | 获得用户钱包明细 | `CommonResult<PayWalletRespVO>` | `PayWalletUserReqVO reqVO` |
| `GET` | `/pay/wallet/page` | 获得会员钱包分页 | `CommonResult<PageResult<PayWalletRespVO>>` | `@Valid PayWalletPageReqVO pageVO` |
| `PUT` | `/pay/wallet/update-balance` | 更新会员用户余额 | `CommonResult<Boolean>` | `@Valid @RequestBody PayWalletUpdateBalanceReqVO updateReqVO` |

### 📦 `PayWalletRechargeController` (管理后台 - 钱包充值)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pay/wallet-recharge/update-paid` | 更新钱包充值为已充值 | `CommonResult<Boolean>` | `@Valid @RequestBody PayOrderNotifyReqDTO notifyReqDTO` |
| `POST` | `/pay/wallet-recharge/refund` | 发起钱包充值退款 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `POST` | `/pay/wallet-recharge/update-refunded` | 更新钱包充值为已退款 | `CommonResult<Boolean>` | `@RequestBody PayRefundNotifyReqDTO notifyReqDTO` |

### 📦 `PayWalletRechargePackageController` (管理后台 - 钱包充值套餐)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pay/wallet-recharge-package/create` | 创建钱包充值套餐 | `CommonResult<Long>` | `@Valid @RequestBody WalletRechargePackageCreateReqVO createReqVO` |
| `PUT` | `/pay/wallet-recharge-package/update` | 更新钱包充值套餐 | `CommonResult<Boolean>` | `@Valid @RequestBody WalletRechargePackageUpdateReqVO updateReqVO` |
| `DELETE` | `/pay/wallet-recharge-package/delete` | 删除钱包充值套餐 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pay/wallet-recharge-package/get` | 获得钱包充值套餐 | `CommonResult<WalletRechargePackageRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pay/wallet-recharge-package/page` | 获得钱包充值套餐分页 | `CommonResult<PageResult<WalletRechargePackageRespVO>>` | `@Valid WalletRechargePackagePageReqVO pageVO` |

### 📦 `PayWalletTransactionController` (管理后台 - 钱包余额明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/wallet-transaction/page` | 获得钱包流水分页 | `CommonResult<PageResult<PayWalletTransactionRespVO>>` | `@Valid PayWalletTransactionPageReqVO pageReqVO` |

### 📦 `AppPayChannelController` (用户 App - 支付渠道)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/channel/get-enable-code-list` | 获得指定应用的开启的支付渠道编码列表 | `CommonResult<Set<String>>` | `@RequestParam("appId") Long appId` |

### 📦 `AppPayOrderController` (用户 APP - 支付订单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/order/get` | 获得支付订单 | `CommonResult<PayOrderRespVO>` | `@RequestParam(value = "id", required = false) Long id, @RequestParam(value = "no", required = false) String no, @RequestParam(value = "sync", required = false) Boolean sync` |
| `POST` | `/pay/order/submit` | 提交支付订单 | `CommonResult<AppPayOrderSubmitRespVO>` | `@RequestBody AppPayOrderSubmitReqVO reqVO` |

### 📦 `AppPayTransferController` (用户 APP - 转账单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/transfer/sync` | 同步转账单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `AppPayWalletController` (用户 APP - 钱包)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/wallet/get` | 获取钱包 | `CommonResult<AppPayWalletRespVO>` | `-` |

### 📦 `AppPayWalletRechargeController` (用户 APP - 钱包充值)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pay/wallet-recharge/create` | 创建钱包充值记录（发起充值） | `CommonResult<AppPayWalletRechargeCreateRespVO>` | `@Valid @RequestBody AppPayWalletRechargeCreateReqVO reqVO` |
| `GET` | `/pay/wallet-recharge/page` | 获得钱包充值记录分页 | `CommonResult<PageResult<AppPayWalletRechargeRespVO>>` | `@Valid PageParam pageReqVO` |

### 📦 `AppPayWalletRechargePackageController` (用户 APP - 钱包充值套餐)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/wallet-recharge-package/list` | 获得钱包充值套餐列表 | `CommonResult<List<AppPayWalletPackageRespVO>>` | `-` |

### 📦 `AppPayWalletTransactionController` (用户 APP - 钱包余额明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pay/wallet-transaction/page` | 获得钱包流水分页 | `CommonResult<PageResult<AppPayWalletTransactionRespVO>>` | `@Valid AppPayWalletTransactionPageReqVO pageReqVO` |
| `GET` | `/pay/wallet-transaction/get-summary` | 获得钱包流水统计 | `CommonResult<AppPayWalletTransactionSummaryRespVO>` | `@RequestParam("createTime") @DateTimeFormat(pattern = FORMAT_YEAR_MONTH_DAY_HOUR_MINUTE_SECOND) LocalDateTime[] createTime` |

### 📦 `PmsKnowledgeContentPermissionController` (管理后台 - PMS 知识内容协作权限)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pms/kb/content-permission/get` | 获得知识内容协作权限 | `CommonResult<PmsKnowledgeContentPermissionRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/pms/kb/content-permission/update` | 更新知识内容协作权限 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeContentPermissionUpdateReqVO updateReqVO` |

### 📦 `PmsKnowledgeDocumentController` (管理后台 - PMS 知识库文档)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/document/create` | 创建文档 | `CommonResult<Long>` | `@Valid @RequestBody PmsKnowledgeDocumentCreateReqVO createReqVO` |
| `PUT` | `/pms/kb/document/update` | 更新文档内容 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeDocumentUpdateReqVO updateReqVO` |
| `DELETE` | `/pms/kb/document/delete` | 将文档移入回收站 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/pms/kb/document/move` | 移动文档 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeDocumentMoveReqVO moveReqVO` |
| `GET` | `/pms/kb/document/get` | 获得文档详情 | `CommonResult<PmsKnowledgeDocumentRespVO>` | `@RequestParam("id") Long id, @RequestParam(value = "view", defaultValue = "false") Boolean view` |
| `GET` | `/pms/kb/document/search-page` | 使用 MySQL 全局搜索文档 | `CommonResult<PageResult<PmsKnowledgeDocumentRespVO>>` | `@Valid PmsKnowledgeDocumentSearchPageReqVO pageReqVO` |

### 📦 `PmsKnowledgeDocumentLabelController` (管理后台 - PMS 知识库文档标签)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/document-label/create` | 创建文档标签 | `CommonResult<Long>` | `@Valid @RequestBody PmsKnowledgeDocumentLabelSaveReqVO saveReqVO` |
| `PUT` | `/pms/kb/document-label/update` | 修改文档标签 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeDocumentLabelSaveReqVO saveReqVO` |
| `DELETE` | `/pms/kb/document-label/delete` | 删除文档标签 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/kb/document-label/get` | 获得文档标签详情 | `CommonResult<PmsKnowledgeDocumentLabelRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/kb/document-label/list` | 获得文档标签列表 | `CommonResult<List<PmsKnowledgeDocumentLabelRespVO>>` | `-` |
| `GET` | `/pms/kb/document-label/document-page` | 获得指定标签的文档分页 | `CommonResult<PageResult<PmsKnowledgeDocumentRespVO>>` | `@Valid PmsKnowledgeDocumentLabelPageReqVO pageReqVO` |

### 📦 `PmsKnowledgeFolderController` (管理后台 - PMS 知识库文件夹)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/folder/create` | 创建文件夹 | `CommonResult<Long>` | `@Valid @RequestBody PmsKnowledgeFolderSaveReqVO saveReqVO` |
| `PUT` | `/pms/kb/folder/update` | 更新文件夹 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeFolderSaveReqVO saveReqVO` |
| `DELETE` | `/pms/kb/folder/delete` | 将文件夹移入回收站 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/pms/kb/folder/move` | 移动文件夹 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeFolderMoveReqVO moveReqVO` |
| `GET` | `/pms/kb/folder/get` | 获得文件夹详情 | `CommonResult<PmsKnowledgeFolderRespVO>` | `@RequestParam("id") Long id, @RequestParam(value = "view", defaultValue = "false") Boolean view` |
| `GET` | `/pms/kb/folder/tree` | 获得知识库目录树 | `CommonResult<PmsKnowledgeTreeRespVO>` | `@RequestParam("libraryId") Long libraryId` |

### 📦 `PmsKnowledgeDocumentCommentController` (管理后台 - PMS 知识库文档评论)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/document-comment/create` | 创建知识库文档评论 | `CommonResult<Long>` | `@Valid @RequestBody PmsKnowledgeDocumentCommentSaveReqVO saveReqVO` |
| `DELETE` | `/pms/kb/document-comment/delete` | 删除知识库文档评论 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/kb/document-comment/list` | 获得知识库文档评论列表 | `CommonResult<List<PmsKnowledgeDocumentCommentRespVO>>` | `@RequestParam("documentId") Long documentId` |

### 📦 `PmsKnowledgeDocumentLikeController` (管理后台 - PMS 知识库文档点赞)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/document-like/create` | 点赞文档 | `CommonResult<Boolean>` | `@RequestParam("documentId") Long documentId` |
| `DELETE` | `/pms/kb/document-like/delete` | 取消点赞文档 | `CommonResult<Boolean>` | `@RequestParam("documentId") Long documentId` |

### 📦 `PmsKnowledgeDocumentShareController` (管理后台 - PMS 知识库文档分享)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/document-share/open` | 开启文档分享 | `CommonResult<PmsKnowledgeDocumentShareRespVO>` | `@Valid @RequestBody PmsKnowledgeDocumentShareSaveReqVO reqVO` |
| `PUT` | `/pms/kb/document-share/update-member-list` | 更新文档内部分享成员 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeDocumentShareUpdateMemberListReqVO reqVO` |
| `PUT` | `/pms/kb/document-share/close` | 关闭文档分享 | `CommonResult<Boolean>` | `@RequestParam("documentId") Long documentId` |
| `GET` | `/pms/kb/document-share/get` | 获得文档分享配置 | `CommonResult<PmsKnowledgeDocumentShareRespVO>` | `@RequestParam("documentId") Long documentId` |
| `GET` | `/pms/kb/document-share/get-by-token` | 通过分享令牌获得文档 | `CommonResult<PmsKnowledgeDocumentSharePublicRespVO>` | `@RequestParam("token") @NotBlank(message = "分享令牌不能为空") String token` |

### 📦 `PmsKnowledgeFavoriteController` (管理后台 - PMS 知识关注)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/favorite/create` | 关注知识对象 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeFavoriteSaveReqVO saveReqVO` |
| `DELETE` | `/pms/kb/favorite/delete` | 取消关注知识对象 | `CommonResult<Boolean>` | `@RequestParam("type") @InEnum(PmsKnowledgeObjectTypeEnum.class) Integer type, @RequestParam("entityId") Long entityId` |
| `GET` | `/pms/kb/favorite/page` | 获得我的关注分页 | `CommonResult<PageResult<PmsKnowledgeInteractionItemRespVO>>` | `@Valid PmsKnowledgeFavoritePageReqVO pageReqVO` |
| `GET` | `/pms/kb/favorite/list` | 获得知识库内我的关注列表 | `CommonResult<List<PmsKnowledgeInteractionItemRespVO>>` | `@RequestParam("libraryId") Long libraryId` |

### 📦 `PmsKnowledgeViewRecordController` (管理后台 - PMS 知识最近浏览)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pms/kb/view-record/recent-list` | 获得最近浏览列表 | `CommonResult<PmsKnowledgeRecentListRespVO>` | `@RequestParam(value = "libraryId", required = false) Long libraryId` |

### 📦 `PmsKnowledgeGroupController` (管理后台 - PMS 知识库分组)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/group/create` | 创建知识库分组 | `CommonResult<Long>` | `@Valid @RequestBody PmsKnowledgeGroupSaveReqVO saveReqVO` |
| `PUT` | `/pms/kb/group/update` | 修改知识库分组 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeGroupSaveReqVO saveReqVO` |
| `PUT` | `/pms/kb/group/update-sort` | 修改知识库分组排序 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeGroupSortReqVO sortReqVO` |
| `DELETE` | `/pms/kb/group/delete` | 删除知识库分组 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/kb/group/list` | 获得知识库分组列表 | `CommonResult<List<PmsKnowledgeGroupRespVO>>` | `-` |
| `GET` | `/pms/kb/group/get` | 获得知识库分组 | `CommonResult<PmsKnowledgeGroupRespVO>` | `@RequestParam("id") Long id` |
| `PUT` | `/pms/kb/group/move` | 移动知识库到个人分组 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeLibraryMoveGroupReqVO moveReqVO` |

### 📦 `PmsKnowledgeLibraryController` (管理后台 - PMS 知识库)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/library/create` | 创建知识库 | `CommonResult<Long>` | `@Valid @RequestBody PmsKnowledgeLibrarySaveReqVO saveReqVO` |
| `PUT` | `/pms/kb/library/update` | 更新知识库 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeLibrarySaveReqVO saveReqVO` |
| `DELETE` | `/pms/kb/library/delete` | 删除知识库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/kb/library/get` | 获得知识库详情 | `CommonResult<PmsKnowledgeLibraryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/kb/library/page` | 获得知识库分页 | `CommonResult<PageResult<PmsKnowledgeLibraryRespVO>>` | `@Valid PmsKnowledgeLibraryPageReqVO pageReqVO` |

### 📦 `PmsKnowledgeLibraryMemberController` (管理后台 - PMS 知识库成员)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pms/kb/library-member/list` | 获得知识库成员列表 | `CommonResult<List<PmsKnowledgeLibraryMemberRespVO>>` | `@RequestParam("libraryId") Long libraryId` |
| `PUT` | `/pms/kb/library-member/update-list` | 更新知识库成员 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeLibraryUpdateMemberListReqVO updateReqVO` |
| `DELETE` | `/pms/kb/library-member/exit` | 主动退出知识库 | `CommonResult<Boolean>` | `@RequestParam("libraryId") Long libraryId` |

### 📦 `PmsKnowledgeLibraryTemplateController` (管理后台 - PMS 知识库模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/kb/library-template/create` | 创建知识库模板 | `CommonResult<Long>` | `@Valid @RequestBody PmsKnowledgeLibraryTemplateSaveReqVO createReqVO` |
| `PUT` | `/pms/kb/library-template/update` | 更新知识库模板 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsKnowledgeLibraryTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/pms/kb/library-template/delete` | 删除知识库模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/kb/library-template/get` | 获得知识库模板 | `CommonResult<PmsKnowledgeLibraryTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/kb/library-template/simple-list` | 获取知识库模板全列表 | `CommonResult<List<PmsKnowledgeLibraryTemplateRespVO>>` | `-` |
| `GET` | `/pms/kb/library-template/page` | 获得知识库模板分页 | `CommonResult<PageResult<PmsKnowledgeLibraryTemplateRespVO>>` | `@Valid PmsKnowledgeLibraryTemplatePageReqVO pageReqVO` |

### 📦 `PmsKnowledgeRecycleController` (管理后台 - PMS 知识库回收站)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pms/kb/recycle/library-list` | 获得已删除知识库列表 | `CommonResult<List<PmsKnowledgeRecycleRespVO>>` | `-` |
| `GET` | `/pms/kb/recycle/content-list` | 获得知识库最近删除内容 | `CommonResult<List<PmsKnowledgeRecycleRespVO>>` | `@RequestParam("libraryId") Long libraryId` |
| `GET` | `/pms/kb/recycle/content-detail` | 获得知识库最近删除详情 | `CommonResult<PmsKnowledgeRecycleDetailRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/kb/recycle/content-preview` | 预览知识库最近删除内容 | `CommonResult<PmsKnowledgeRecyclePreviewRespVO>` | `@RequestParam("id") Long id, @RequestParam(value = "entityId", required = false) Long entityId` |
| `PUT` | `/pms/kb/recycle/restore` | 恢复回收站对象 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/pms/kb/recycle/permanent-delete` | 彻底删除回收站对象 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `PmsIterationController` (管理后台 - PMS 项目迭代)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/iteration/create` | 创建项目迭代 | `CommonResult<Long>` | `@Valid @RequestBody PmsIterationSaveReqVO saveReqVO` |
| `PUT` | `/pms/pm/iteration/update` | 更新项目迭代 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsIterationSaveReqVO saveReqVO` |
| `PUT` | `/pms/pm/iteration/start` | 开始项目迭代 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsIterationStartReqVO startReqVO` |
| `PUT` | `/pms/pm/iteration/complete` | 完成项目迭代 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/pms/pm/iteration/delete` | 删除项目迭代 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/iteration/get` | 获得项目迭代详情 | `CommonResult<PmsIterationRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/iteration/page` | 获得项目迭代分页 | `CommonResult<PageResult<PmsIterationRespVO>>` | `@Valid PmsIterationPageReqVO pageReqVO` |
| `GET` | `/pms/pm/iteration/overview` | 获得迭代概览统计 | `CommonResult<PmsIterationOverviewRespVO>` | `@RequestParam("id") Long id` |

### 📦 `PmsProjectAnnouncementController` (管理后台 - PMS 项目公告)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/project-announcement/create` | 创建项目公告 | `CommonResult<Long>` | `@Valid @RequestBody PmsProjectAnnouncementSaveReqVO saveReqVO` |
| `PUT` | `/pms/pm/project-announcement/update` | 更新项目公告 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsProjectAnnouncementSaveReqVO saveReqVO` |
| `DELETE` | `/pms/pm/project-announcement/delete` | 删除项目公告 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/project-announcement/get` | 获得项目公告详情 | `CommonResult<PmsProjectAnnouncementRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/project-announcement/list` | 获得项目公告列表 | `CommonResult<List<PmsProjectAnnouncementRespVO>>` | `@RequestParam("projectId") Long projectId` |

### 📦 `PmsProjectController` (管理后台 - PMS 项目)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/project/create` | 创建项目 | `CommonResult<Long>` | `@Valid @RequestBody PmsProjectSaveReqVO saveReqVO` |
| `PUT` | `/pms/pm/project/update` | 更新项目 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsProjectSaveReqVO saveReqVO` |
| `GET` | `/pms/pm/project/get` | 获得项目详情 | `CommonResult<PmsProjectRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/project/page` | 获得项目分页 | `CommonResult<PageResult<PmsProjectRespVO>>` | `@Valid PmsProjectPageReqVO pageReqVO` |
| `GET` | `/pms/pm/project/favorite-list` | 获得星标项目列表 | `CommonResult<List<PmsProjectRespVO>>` | `-` |
| `GET` | `/pms/pm/project/overview` | 获得项目概况 | `CommonResult<PmsProjectOverviewRespVO>` | `@RequestParam("projectId") Long projectId` |
| `PUT` | `/pms/pm/project/archive` | 归档项目 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/pms/pm/project/recycle` | 将项目移入回收站 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/pms/pm/project/restore` | 恢复项目 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/pms/pm/project/delete` | 彻底删除回收站项目 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `PmsProjectFavoriteController` (管理后台 - PMS 项目收藏)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/project-favorite/create` | 收藏项目 | `CommonResult<Boolean>` | `@RequestParam("projectId") Long projectId` |
| `DELETE` | `/pms/pm/project-favorite/delete` | 取消收藏项目 | `CommonResult<Boolean>` | `@RequestParam("projectId") Long projectId` |

### 📦 `PmsProjectGroupController` (管理后台 - PMS 项目分组)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/project-group/create` | 创建项目分组 | `CommonResult<Long>` | `@Valid @RequestBody PmsProjectGroupSaveReqVO createReqVO` |
| `PUT` | `/pms/pm/project-group/update` | 修改项目分组 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsProjectGroupSaveReqVO updateReqVO` |
| `PUT` | `/pms/pm/project-group/update-sort` | 修改项目分组排序 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsProjectGroupSortReqVO sortReqVO` |
| `DELETE` | `/pms/pm/project-group/delete` | 删除项目分组 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/project-group/list` | 获得项目分组列表 | `CommonResult<List<PmsProjectGroupRespVO>>` | `-` |
| `PUT` | `/pms/pm/project-group/move-project` | 移动项目到个人分组 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsProjectGroupMoveReqVO moveReqVO` |

### 📦 `PmsProjectMemberController` (管理后台 - PMS 项目成员)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pms/pm/project-member/list` | 获得项目成员列表 | `CommonResult<List<PmsProjectMemberRespVO>>` | `@RequestParam("projectId") Long projectId` |
| `PUT` | `/pms/pm/project-member/update-list` | 保存项目成员及其权限级别 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsProjectMemberSaveReqVO saveReqVO` |
| `DELETE` | `/pms/pm/project-member/delete` | 移除项目成员 | `CommonResult<Boolean>` | `@RequestParam("projectId") Long projectId, @RequestParam("userId") Long userId` |
| `DELETE` | `/pms/pm/project-member/exit` | 主动退出项目 | `CommonResult<Boolean>` | `@RequestParam("projectId") Long projectId` |

### 📦 `PmsProjectTemplateController` (管理后台 - PMS 项目模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/project-template/create` | 创建项目模板 | `CommonResult<Long>` | `@Valid @RequestBody PmsProjectTemplateSaveReqVO createReqVO` |
| `PUT` | `/pms/pm/project-template/update` | 更新项目模板 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsProjectTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/pms/pm/project-template/delete` | 删除项目模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/project-template/get` | 获得项目模板 | `CommonResult<PmsProjectTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/project-template/page` | 获得项目模板分页 | `CommonResult<PageResult<PmsProjectTemplateRespVO>>` | `@Valid PmsProjectTemplatePageReqVO pageReqVO` |

### 📦 `PmsWorkbenchController` (管理后台 - PMS 工作台)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pms/pm/workbench/work-item-page` | 获得我负责的工作项分页 | `CommonResult<PageResult<PmsWorkbenchWorkItemRespVO>>` | `@Valid PmsWorkbenchPageReqVO pageReqVO` |
| `GET` | `/pms/pm/workbench/iteration-page` | 获得我负责的迭代分页 | `CommonResult<PageResult<PmsWorkbenchIterationRespVO>>` | `@Valid PmsWorkbenchPageReqVO pageReqVO` |
| `GET` | `/pms/pm/workbench/count` | 获得我的未完成事项数量 | `CommonResult<PmsWorkbenchCountRespVO>` | `PmsWorkbenchPageReqVO pageReqVO` |

### 📦 `PmsWorkItemActivityController` (管理后台 - PMS 工作项动态)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/pms/pm/work-item-activity/list` | 获得工作项动态列表 | `CommonResult<List<PmsWorkItemActivityRespVO>>` | `@RequestParam("workItemId") Long workItemId` |

### 📦 `PmsWorkItemCommentController` (管理后台 - PMS 工作项评论)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/work-item-comment/create` | 创建工作项评论 | `CommonResult<Long>` | `@Valid @RequestBody PmsWorkItemCommentSaveReqVO saveReqVO` |
| `PUT` | `/pms/pm/work-item-comment/update` | 修改工作项评论 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemCommentSaveReqVO saveReqVO` |
| `DELETE` | `/pms/pm/work-item-comment/delete` | 删除工作项评论 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/work-item-comment/list` | 获得工作项评论列表 | `CommonResult<List<PmsWorkItemCommentRespVO>>` | `@RequestParam("workItemId") Long workItemId` |

### 📦 `PmsWorkItemController` (管理后台 - PMS 工作项)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/work-item/create` | 创建工作项 | `CommonResult<Long>` | `@Valid @RequestBody PmsWorkItemSaveReqVO saveReqVO` |
| `PUT` | `/pms/pm/work-item/update` | 更新工作项 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemSaveReqVO saveReqVO` |
| `PUT` | `/pms/pm/work-item/update-name` | 更新工作项名称 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemNameUpdateReqVO updateReqVO` |
| `PUT` | `/pms/pm/work-item/update-status` | 更新工作项状态 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemStatusUpdateReqVO updateReqVO` |
| `PUT` | `/pms/pm/work-item/update-iteration` | 更新工作项所属迭代 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemIterationUpdateReqVO updateReqVO` |
| `PUT` | `/pms/pm/work-item/update-sort` | 更新看板列内工作项顺序 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemSortReqVO sortReqVO` |
| `PUT` | `/pms/pm/work-item/update-planning-sort` | 更新待规划或迭代内工作项顺序 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemPlanningSortReqVO sortReqVO` |
| `PUT` | `/pms/pm/work-item/archive` | 归档工作项 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/pms/pm/work-item/recycle` | 将工作项移入回收站 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/pms/pm/work-item/restore` | 恢复工作项 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/pms/pm/work-item/delete` | 彻底删除回收站中的工作项 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/work-item/get` | 获得工作项详情 | `CommonResult<PmsWorkItemRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/work-item/page` | 获得工作项分页 | `CommonResult<PageResult<PmsWorkItemRespVO>>` | `@Valid PmsWorkItemPageReqVO pageReqVO` |
| `GET` | `/pms/pm/work-item/export-excel` | 导出工作项 | `void` | `@Valid PmsWorkItemPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<PmsWorkItemDO> list = workItemService.getWorkItemList(pageReqVO, getLoginUserId()); List<PmsWorkItemRespVO> workItemVOList = buildWorkItemRespVOList(list); ExcelUtils.write(response, "工作项.xlsx", "工作项", PmsWorkItemRespVO.class, workItemVOList); } @GetMapping("/get-import-template") @Operation(summary = "下载工作项导入模板") @PreAuthorize("@ss.hasPermission('pms:pm:work-item:import')") public void getWorkItemImportTemplate(HttpServletResponse response) throws IOException { LocalDateTime now = LocalDateTime.now(); LocalDateTime deadline = now.plusDays(3); PmsWorkItemImportExcelVO example = PmsWorkItemImportExcelVO.builder() .name("登录页面开发").description("实现账号密码登录").statusName("") .priority(PmsWorkItemPriorityEnum.MEDIUM.getPriority()) .startTime(now).endTime(deadline) .labels(Collections.emptyList()).progress(0).estimatedHours(16) .build(); ExcelUtils.write(response, "工作项导入模板.xlsx", "工作项", PmsWorkItemImportExcelVO.class, Collections.singletonList(example)); } @PostMapping("/import") @Operation(summary = "导入工作项") @Parameters({ @Parameter(name = "projectId", description = "项目编号", required = true, example = "1024"), @Parameter(name = "type", description = "工作项类型（需求、任务、缺陷）", required = true, example = "1"), @Parameter(name = "file", description = "Excel 文件", required = true) }) @PreAuthorize("@ss.hasPermission('pms:pm:work-item:import')") public CommonResult<PmsWorkItemImportRespVO> importWorkItemList( @RequestParam("projectId") Long projectId, @RequestParam("type") Integer workItemType, @RequestParam("file") MultipartFile file) throws Exception { return success(workItemService.importWorkItemList(projectId, workItemType, ExcelUtils.read(file, PmsWorkItemImportExcelVO.class), getLoginUserId())); } @GetMapping("/board") @Operation(summary = "获得工作项看板") @PreAuthorize("@ss.hasPermission('pms:pm:work-item:query')") public CommonResult<List<PmsWorkItemBoardRespVO>> getWorkItemBoard(@Valid PmsWorkItemBoardReqVO queryReqVO` |

### 📦 `PmsWorkItemLabelController` (管理后台 - PMS 工作项标签)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/work-item-label/create` | 创建工作项标签 | `CommonResult<Long>` | `@Valid @RequestBody PmsWorkItemLabelSaveReqVO saveReqVO` |
| `PUT` | `/pms/pm/work-item-label/update` | 修改工作项标签 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemLabelSaveReqVO saveReqVO` |
| `DELETE` | `/pms/pm/work-item-label/delete` | 删除工作项标签 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/work-item-label/list` | 获得工作项标签列表 | `CommonResult<List<PmsWorkItemLabelRespVO>>` | `@RequestParam(value = "name", required = false) String name` |

### 📦 `PmsWorkItemStatusController` (管理后台 - PMS 工作项状态)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/work-item-status/create` | 创建工作项状态 | `CommonResult<Long>` | `@Valid @RequestBody PmsWorkItemStatusCreateReqVO createReqVO` |
| `PUT` | `/pms/pm/work-item-status/update` | 更新工作项状态 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemStatusConfigUpdateReqVO updateReqVO` |
| `PUT` | `/pms/pm/work-item-status/update-default` | 更新工作项初始状态 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/pms/pm/work-item-status/update-sort` | 更新工作项状态顺序 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemStatusSortReqVO sortReqVO` |
| `PUT` | `/pms/pm/work-item-status/update-board-config` | 更新工作项看板列和状态映射 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemBoardConfigSaveReqVO saveReqVO` |
| `DELETE` | `/pms/pm/work-item-status/delete` | 删除工作项状态并迁移工作项 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemStatusDeleteReqVO deleteReqVO` |
| `GET` | `/pms/pm/work-item-status/get` | 获得工作项状态详情 | `CommonResult<PmsWorkItemStatusRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/work-item-status/list` | 获得工作项看板状态列表 | `CommonResult<List<PmsWorkItemStatusRespVO>>` | `@RequestParam("projectId") Long projectId, @RequestParam("type") Integer workItemType` |
| `GET` | `/pms/pm/work-item-status/get-board-config` | 获得工作项看板列和状态映射 | `CommonResult<PmsWorkItemBoardConfigRespVO>` | `@RequestParam("projectId") Long projectId, @RequestParam("type") Integer workItemType` |

### 📦 `PmsWorkItemWorkLogController` (管理后台 - PMS 工作项工时)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/pms/pm/work-item-work-log/create` | 创建工作项工时记录 | `CommonResult<Long>` | `@Valid @RequestBody PmsWorkItemWorkLogSaveReqVO saveReqVO` |
| `PUT` | `/pms/pm/work-item-work-log/update` | 更新工作项工时记录 | `CommonResult<Boolean>` | `@Valid @RequestBody PmsWorkItemWorkLogSaveReqVO saveReqVO` |
| `GET` | `/pms/pm/work-item-work-log/get` | 获得工作项工时记录 | `CommonResult<PmsWorkItemWorkLogRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/pms/pm/work-item-work-log/summary` | 获得工作项工时汇总 | `CommonResult<PmsWorkItemWorkLogSummaryRespVO>` | `@RequestParam("workItemId") Long workItemId` |
| `GET` | `/pms/pm/work-item-work-log/project-report` | 获得项目工时报表 | `CommonResult<PmsProjectWorkLogReportRespVO>` | `@Valid PmsProjectWorkLogReportReqVO reqVO` |

### 📦 `GoViewDataController` (管理后台 - GoView 数据)

*暂无解析出的 REST 路由*

### 📦 `GoViewProjectController` (管理后台 - GoView 项目)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/report/go-view/project/create` | 创建项目 | `CommonResult<Long>` | `@Valid @RequestBody GoViewProjectCreateReqVO createReqVO` |
| `PUT` | `/report/go-view/project/update` | 更新项目 | `CommonResult<Boolean>` | `@Valid @RequestBody GoViewProjectUpdateReqVO updateReqVO` |
| `DELETE` | `/report/go-view/project/delete` | 删除 GoView 项目 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/report/go-view/project/get` | 获得项目 | `CommonResult<GoViewProjectRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/report/go-view/project/my-page` | 获得我的项目分页 | `CommonResult<PageResult<GoViewProjectRespVO>>` | `@Valid PageParam pageVO` |

### 📦 `AuthController` (管理后台 - 认证)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/auth/login` | 使用账号密码登录 | `CommonResult<AuthLoginRespVO>` | `@RequestBody @Valid AuthLoginReqVO reqVO` |
| `POST` | `/system/auth/logout` | 登出系统 | `CommonResult<Boolean>` | `HttpServletRequest request` |
| `POST` | `/system/auth/refresh-token` | 刷新令牌 | `CommonResult<AuthLoginRespVO>` | `@RequestParam("refreshToken") String refreshToken` |
| `GET` | `/system/auth/get-permission-info` | 获取登录用户的权限信息 | `CommonResult<AuthPermissionInfoRespVO>` | `-` |
| `POST` | `/system/auth/register` | 注册用户 | `CommonResult<AuthLoginRespVO>` | `@RequestBody @Valid AuthRegisterReqVO registerReqVO` |
| `POST` | `/system/auth/sms-login` | 使用短信验证码登录 | `CommonResult<AuthLoginRespVO>` | `@RequestBody @Valid AuthSmsLoginReqVO reqVO` |
| `POST` | `/system/auth/send-sms-code` | 发送手机验证码 | `CommonResult<Boolean>` | `@RequestBody @Valid AuthSmsSendReqVO reqVO` |
| `POST` | `/system/auth/reset-password` | 重置密码 | `CommonResult<Boolean>` | `@RequestBody @Valid AuthResetPasswordReqVO reqVO` |
| `GET` | `/system/auth/social-auth-redirect` | 社交授权的跳转 | `CommonResult<String>` | `@RequestParam("type") Integer type, @RequestParam("redirectUri") String redirectUri` |
| `POST` | `/system/auth/social-login` | 社交快捷登录，使用 code 授权码 | `CommonResult<AuthLoginRespVO>` | `@RequestBody @Valid AuthSocialLoginReqVO reqVO` |

### 📦 `CaptchaController` (管理后台 - 验证码)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/captcha` | 获得验证码 | `ResponseModel` | `@RequestBody CaptchaVO data, HttpServletRequest request` |
| `POST` | `/system/captcha/check` | 校验验证码 | `ResponseModel` | `@RequestBody CaptchaVO data, HttpServletRequest request` |

### 📦 `DeptController` (管理后台 - 部门)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/deptcreate` | 创建部门 | `CommonResult<Long>` | `@Valid @RequestBody DeptSaveReqVO createReqVO` |
| `PUT` | `/system/deptupdate` | 更新部门 | `CommonResult<Boolean>` | `@Valid @RequestBody DeptSaveReqVO updateReqVO` |
| `DELETE` | `/system/deptdelete` | 删除部门 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/dept/delete-list` | 批量删除部门 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/dept/list` | 获取部门列表 | `CommonResult<List<DeptRespVO>>` | `DeptListReqVO reqVO` |
| `GET` | `/system/dept` | 获取部门精简信息列表 | `CommonResult<List<DeptSimpleRespVO>>` | `-` |
| `GET` | `/system/dept/get` | 获得部门信息 | `CommonResult<DeptRespVO>` | `@RequestParam("id") Long id` |

### 📦 `PostController` (管理后台 - 岗位)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/post/create` | 创建岗位 | `CommonResult<Long>` | `@Valid @RequestBody PostSaveReqVO createReqVO` |
| `PUT` | `/system/post/update` | 修改岗位 | `CommonResult<Boolean>` | `@Valid @RequestBody PostSaveReqVO updateReqVO` |
| `DELETE` | `/system/post/delete` | 删除岗位 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/postdelete-list` | 批量删除岗位 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/post` | 获得岗位信息 | `CommonResult<PostRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/post` | 获取岗位全列表 | `CommonResult<List<PostSimpleRespVO>>` | `-` |
| `GET` | `/system/post/page` | 获得岗位分页列表 | `CommonResult<PageResult<PostRespVO>>` | `@Validated PostPageReqVO pageReqVO` |

### 📦 `DictDataController` (管理后台 - 字典数据)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/dict-data/create` | 新增字典数据 | `CommonResult<Long>` | `@Valid @RequestBody DictDataSaveReqVO createReqVO` |
| `PUT` | `/system/dict-data/update` | 修改字典数据 | `CommonResult<Boolean>` | `@Valid @RequestBody DictDataSaveReqVO updateReqVO` |
| `DELETE` | `/system/dict-data/delete` | 删除字典数据 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/dict-data/delete-list` | 批量删除字典数据 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/dict-data` | 获得全部字典数据列表 | `CommonResult<List<DictDataSimpleRespVO>>` | `-` |
| `GET` | `/system/dict-data/page` | 获得字典类型的分页 | `CommonResult<PageResult<DictDataRespVO>>` | `@Valid DictDataPageReqVO pageReqVO` |
| `GET` | `/system/dict-data` | /查询字典数据详细 | `CommonResult<DictDataRespVO>` | `@RequestParam("id") Long id` |

### 📦 `DictTypeController` (管理后台 - 字典类型)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/dict-type/create` | 创建字典类型 | `CommonResult<Long>` | `@Valid @RequestBody DictTypeSaveReqVO createReqVO` |
| `PUT` | `/system/dict-type/update` | 修改字典类型 | `CommonResult<Boolean>` | `@Valid @RequestBody DictTypeSaveReqVO updateReqVO` |
| `DELETE` | `/system/dict-type/delete` | 删除字典类型 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/dict-type/delete-list` | 批量删除字典类型 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/dict-type/page` | 获得字典类型的分页列表 | `CommonResult<PageResult<DictTypeRespVO>>` | `@Valid DictTypePageReqVO pageReqVO` |
| `GET` | `/system/dict-type` | - | `CommonResult<DictTypeRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/dict-type` | 获得全部字典类型列表 | `CommonResult<List<DictTypeSimpleRespVO>>` | `-` |

### 📦 `AreaController` (管理后台 - 地区)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/area/tree` | 获得地区树 | `CommonResult<List<AreaNodeRespVO>>` | `-` |
| `GET` | `/system/area/get-by-ip` | 获得 IP 对应的地区名 | `CommonResult<String>` | `@RequestParam("ip") String ip` |

### 📦 `LoginLogController` (管理后台 - 登录日志)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/login-log/get` | 获得登录日志 | `CommonResult<LoginLogRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/login-log/page` | 获得登录日志分页列表 | `CommonResult<PageResult<LoginLogRespVO>>` | `@Valid LoginLogPageReqVO pageReqVO` |

### 📦 `OperateLogController` (管理后台 - 操作日志)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/operate-log/get` | 查看操作日志 | `CommonResult<OperateLogRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/operate-log/page` | 查看操作日志分页列表 | `CommonResult<PageResult<OperateLogRespVO>>` | `@Valid OperateLogPageReqVO pageReqVO` |

### 📦 `MailAccountController` (管理后台 - 邮箱账号)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/mail-account/create` | 创建邮箱账号 | `CommonResult<Long>` | `@Valid @RequestBody MailAccountSaveReqVO createReqVO` |
| `PUT` | `/system/mail-account/update` | 修改邮箱账号 | `CommonResult<Boolean>` | `@Valid @RequestBody MailAccountSaveReqVO updateReqVO` |
| `DELETE` | `/system/mail-account/delete` | 删除邮箱账号 | `CommonResult<Boolean>` | `@RequestParam Long id` |
| `DELETE` | `/system/mail-account/delete-list` | 批量删除邮箱账号 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/mail-account/get` | 获得邮箱账号 | `CommonResult<MailAccountRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/mail-account/page` | 获得邮箱账号分页 | `CommonResult<PageResult<MailAccountRespVO>>` | `@Valid MailAccountPageReqVO pageReqVO` |
| `GET` | `/system/mail-account` | 获得邮箱账号精简列表 | `CommonResult<List<MailAccountSimpleRespVO>>` | `-` |

### 📦 `MailLogController` (管理后台 - 邮件日志)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/mail-log/page` | 获得邮箱日志分页 | `CommonResult<PageResult<MailLogRespVO>>` | `@Valid MailLogPageReqVO pageVO` |
| `GET` | `/system/mail-log/get` | 获得邮箱日志 | `CommonResult<MailLogRespVO>` | `@RequestParam("id") Long id` |

### 📦 `MailTemplateController` (管理后台 - 邮件模版)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/mail-template/create` | 创建邮件模版 | `CommonResult<Long>` | `@Valid @RequestBody MailTemplateSaveReqVO createReqVO` |
| `PUT` | `/system/mail-template/update` | 修改邮件模版 | `CommonResult<Boolean>` | `@Valid @RequestBody MailTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/system/mail-template/delete` | 删除邮件模版 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/mail-template/delete-list` | 批量删除邮件模版 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/mail-template/get` | 获得邮件模版 | `CommonResult<MailTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/mail-template/page` | 获得邮件模版分页 | `CommonResult<PageResult<MailTemplateRespVO>>` | `@Valid MailTemplatePageReqVO pageReqVO` |
| `GET` | `/system/mail-template` | 获得邮件模版精简列表 | `CommonResult<List<MailTemplateSimpleRespVO>>` | `-` |
| `POST` | `/system/mail-template/send-mail` | 发送短信 | `CommonResult<Long>` | `@Valid @RequestBody MailTemplateSendReqVO sendReqVO` |

### 📦 `NoticeController` (管理后台 - 通知公告)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/notice/create` | 创建通知公告 | `CommonResult<Long>` | `@Valid @RequestBody NoticeSaveReqVO createReqVO` |
| `PUT` | `/system/notice/update` | 修改通知公告 | `CommonResult<Boolean>` | `@Valid @RequestBody NoticeSaveReqVO updateReqVO` |
| `DELETE` | `/system/notice/delete` | 删除通知公告 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/notice/delete-list` | 批量删除通知公告 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/notice/page` | 获取通知公告列表 | `CommonResult<PageResult<NoticeRespVO>>` | `@Validated NoticePageReqVO pageReqVO` |
| `GET` | `/system/notice/get` | 获得通知公告 | `CommonResult<NoticeRespVO>` | `@RequestParam("id") Long id` |
| `POST` | `/system/notice/push` | 推送通知公告 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |

### 📦 `NotifyMessageController` (管理后台 - 我的站内信)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/notify-message/get` | 获得站内信 | `CommonResult<NotifyMessageRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/notify-message/page` | 获得站内信分页 | `CommonResult<PageResult<NotifyMessageRespVO>>` | `@Valid NotifyMessagePageReqVO pageVO` |
| `GET` | `/system/notify-message/my-page` | 获得我的站内信分页 | `CommonResult<PageResult<NotifyMessageRespVO>>` | `@Valid NotifyMessageMyPageReqVO pageVO` |
| `PUT` | `/system/notify-message/update-read` | 标记站内信为已读 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `PUT` | `/system/notify-message/update-all-read` | 标记所有站内信为已读 | `CommonResult<Boolean>` | `-` |
| `GET` | `/system/notify-message/get-unread-list` | 获取当前用户的最新站内信列表，默认 10 条 | `CommonResult<List<NotifyMessageRespVO>>` | `@RequestParam(name = "size", defaultValue = "10") Integer size` |
| `GET` | `/system/notify-message/get-unread-count` | 获得当前用户的未读站内信数量 | `CommonResult<Long>` | `-` |

### 📦 `NotifyTemplateController` (管理后台 - 站内信模版)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/notify-template/create` | 创建站内信模版 | `CommonResult<Long>` | `@Valid @RequestBody NotifyTemplateSaveReqVO createReqVO` |
| `PUT` | `/system/notify-template/update` | 更新站内信模版 | `CommonResult<Boolean>` | `@Valid @RequestBody NotifyTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/system/notify-template/delete` | 删除站内信模版 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/notify-template/delete-list` | 批量删除站内信模版 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/notify-template/get` | 获得站内信模版 | `CommonResult<NotifyTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/notify-template/page` | 获得站内信模版分页 | `CommonResult<PageResult<NotifyTemplateRespVO>>` | `@Valid NotifyTemplatePageReqVO pageVO` |
| `GET` | `/system/notify-template` | 获得站内信模版精简列表 | `CommonResult<List<NotifyTemplateSimpleRespVO>>` | `-` |
| `POST` | `/system/notify-template/send-notify` | 发送站内信 | `CommonResult<Long>` | `@Valid @RequestBody NotifyTemplateSendReqVO sendReqVO` |

### 📦 `OAuth2ClientController` (管理后台 - OAuth2 客户端)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/oauth2-client/create` | 创建 OAuth2 客户端 | `CommonResult<Long>` | `@Valid @RequestBody OAuth2ClientSaveReqVO createReqVO` |
| `PUT` | `/system/oauth2-client/update` | 更新 OAuth2 客户端 | `CommonResult<Boolean>` | `@Valid @RequestBody OAuth2ClientSaveReqVO updateReqVO` |
| `DELETE` | `/system/oauth2-client/delete` | 删除 OAuth2 客户端 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/oauth2-client/delete-list` | 批量删除 OAuth2 客户端 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/oauth2-client/get` | 获得 OAuth2 客户端 | `CommonResult<OAuth2ClientRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/oauth2-client/page` | 获得 OAuth2 客户端分页 | `CommonResult<PageResult<OAuth2ClientRespVO>>` | `@Valid OAuth2ClientPageReqVO pageVO` |

### 📦 `OAuth2OpenController` (管理后台 - OAuth2.0 授权)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/oauth2/token` | 获得访问令牌 | `CommonResult<OAuth2OpenAccessTokenRespVO>` | `HttpServletRequest request, @RequestParam("grant_type") String grantType, @RequestParam(value = "code", required = false) String code, // 授权码模式 @RequestParam(value = "redirect_uri", required = false) String redirectUri, // 授权码模式 @RequestParam(value = "state", required = false) String state, // 授权码模式 @RequestParam(value = "username", required = false) String username, // 密码模式 @RequestParam(value = "password", required = false) String password, // 密码模式 @RequestParam(value = "scope", required = false) String scope, // 密码模式 @RequestParam(value = "refresh_token", required = false) String refreshToken` |
| `DELETE` | `/system/oauth2/token` | 删除访问令牌 | `CommonResult<Boolean>` | `HttpServletRequest request, @RequestParam("token") String token` |
| `POST` | `/system/oauth2/check-token` | 校验访问令牌 | `CommonResult<OAuth2OpenCheckTokenRespVO>` | `HttpServletRequest request, @RequestParam("token") String token` |
| `GET` | `/system/oauth2/authorize` | 获得授权信息 | `CommonResult<OAuth2OpenAuthorizeInfoRespVO>` | `@RequestParam("clientId") String clientId` |
| `POST` | `/system/oauth2/authorize` | 申请授权 | `CommonResult<String>` | `@RequestParam("response_type") String responseType, @RequestParam("client_id") String clientId, @RequestParam(value = "scope", required = false) String scope, @RequestParam("redirect_uri") String redirectUri, @RequestParam(value = "auto_approve") Boolean autoApprove, @RequestParam(value = "state", required = false) String state` |

### 📦 `OAuth2TokenController` (管理后台 - OAuth2.0 令牌)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/oauth2-token/page` | 获得访问令牌分页 | `CommonResult<PageResult<OAuth2AccessTokenRespVO>>` | `@Valid OAuth2AccessTokenPageReqVO reqVO` |
| `DELETE` | `/system/oauth2-token/delete` | 删除访问令牌 | `CommonResult<Boolean>` | `@RequestParam("accessToken") String accessToken` |
| `DELETE` | `/system/oauth2-token/delete-list` | 批量删除访问令牌 | `CommonResult<Boolean>` | `@RequestParam("accessTokens") List<String> accessTokens` |

### 📦 `OAuth2UserController` (管理后台 - OAuth2.0 用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/oauth2/user/get` | 获得用户基本信息 | `CommonResult<OAuth2UserInfoRespVO>` | `-` |
| `PUT` | `/system/oauth2/user/update` | 更新用户基本信息 | `CommonResult<Boolean>` | `@Valid @RequestBody OAuth2UserUpdateReqVO reqVO` |

### 📦 `MenuController` (管理后台 - 菜单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/menu/create` | 创建菜单 | `CommonResult<Long>` | `@Valid @RequestBody MenuSaveVO createReqVO` |
| `PUT` | `/system/menu/update` | 修改菜单 | `CommonResult<Boolean>` | `@Valid @RequestBody MenuSaveVO updateReqVO` |
| `DELETE` | `/system/menu/delete` | 删除菜单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/menu/delete-list` | 批量删除菜单 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/menu/list` | 获取菜单列表 | `CommonResult<List<MenuRespVO>>` | `MenuListReqVO reqVO` |
| `GET` | `/system/menu` | 获取菜单精简信息列表 | `CommonResult<List<MenuSimpleRespVO>>` | `-` |
| `GET` | `/system/menu/get` | 获取菜单信息 | `CommonResult<MenuRespVO>` | `@RequestParam("id") Long id` |

### 📦 `PermissionController` (管理后台 - 权限)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/permission/list-role-menus` | - | `CommonResult<Set<Long>>` | `@RequestParam("roleId") Long roleId` |
| `POST` | `/system/permission/assign-role-menu` | 赋予角色菜单 | `CommonResult<Boolean>` | `@Validated @RequestBody PermissionAssignRoleMenuReqVO reqVO` |
| `POST` | `/system/permission/assign-role-data-scope` | 赋予角色数据权限 | `CommonResult<Boolean>` | `@Valid @RequestBody PermissionAssignRoleDataScopeReqVO reqVO` |
| `GET` | `/system/permission/list-user-roles` | - | `CommonResult<Set<Long>>` | `@RequestParam("userId") Long userId` |
| `POST` | `/system/permission/assign-user-role` | - | `CommonResult<Boolean>` | `@Validated @RequestBody PermissionAssignUserRoleReqVO reqVO` |

### 📦 `RoleController` (管理后台 - 角色)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/role/create` | 创建角色 | `CommonResult<Long>` | `@Valid @RequestBody RoleSaveReqVO createReqVO` |
| `PUT` | `/system/role/update` | 修改角色 | `CommonResult<Boolean>` | `@Valid @RequestBody RoleSaveReqVO updateReqVO` |
| `DELETE` | `/system/role/delete` | 删除角色 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/role/delete-list` | 批量删除角色 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/role/get` | 获得角色信息 | `CommonResult<RoleRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/role/page` | 获得角色分页 | `CommonResult<PageResult<RoleRespVO>>` | `RolePageReqVO pageReqVO` |
| `GET` | `/system/role` | 获取角色精简信息列表 | `CommonResult<List<RoleRespVO>>` | `-` |

### 📦 `SmsCallbackController` (管理后台 - 短信回调)

*暂无解析出的 REST 路由*

### 📦 `SmsChannelController` (管理后台 - 短信渠道)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `system/sms-channel/create` | 创建短信渠道 | `CommonResult<Long>` | `@Valid @RequestBody SmsChannelSaveReqVO createReqVO` |
| `PUT` | `system/sms-channel/update` | 更新短信渠道 | `CommonResult<Boolean>` | `@Valid @RequestBody SmsChannelSaveReqVO updateReqVO` |
| `DELETE` | `system/sms-channel/delete` | 删除短信渠道 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `system/sms-channel/delete-list` | 批量删除短信渠道 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `system/sms-channel/get` | 获得短信渠道 | `CommonResult<SmsChannelRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `system/sms-channel/page` | 获得短信渠道分页 | `CommonResult<PageResult<SmsChannelRespVO>>` | `@Valid SmsChannelPageReqVO pageVO` |
| `GET` | `system/sms-channel` | 获得短信渠道精简列表 | `CommonResult<List<SmsChannelSimpleRespVO>>` | `-` |

### 📦 `SmsLogController` (管理后台 - 短信日志)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/sms-log/page` | 获得短信日志分页 | `CommonResult<PageResult<SmsLogRespVO>>` | `@Valid SmsLogPageReqVO pageReqVO` |
| `GET` | `/system/sms-log/get` | 获得短信日志 | `CommonResult<SmsLogRespVO>` | `@RequestParam("id") Long id` |

### 📦 `SmsTemplateController` (管理后台 - 短信模板)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/sms-template/create` | 创建短信模板 | `CommonResult<Long>` | `@Valid @RequestBody SmsTemplateSaveReqVO createReqVO` |
| `PUT` | `/system/sms-template/update` | 更新短信模板 | `CommonResult<Boolean>` | `@Valid @RequestBody SmsTemplateSaveReqVO updateReqVO` |
| `DELETE` | `/system/sms-template/delete` | 删除短信模板 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/sms-template/delete-list` | 批量删除短信模板 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/sms-template/get` | 获得短信模板 | `CommonResult<SmsTemplateRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/sms-template/page` | 获得短信模板分页 | `CommonResult<PageResult<SmsTemplateRespVO>>` | `@Valid SmsTemplatePageReqVO pageVO` |
| `GET` | `/system/sms-template` | 获得短信模板精简列表 | `CommonResult<List<SmsTemplateSimpleRespVO>>` | `-` |
| `GET` | `/system/sms-template/export-excel` | 导出短信模板 Excel | `void` | `@Valid SmsTemplatePageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<SmsTemplateDO> list = smsTemplateService.getSmsTemplatePage(exportReqVO).getList(); // 导出 Excel ExcelUtils.write(response, "短信模板.xls", "数据", SmsTemplateRespVO.class, BeanUtils.toBean(list, SmsTemplateRespVO.class)); } @PostMapping("/send-sms") @Operation(summary = "发送短信") @PreAuthorize("@ss.hasPermission('system:sms-template:send-sms')") public CommonResult<Long> sendSms(@Valid @RequestBody SmsTemplateSendReqVO sendReqVO` |

### 📦 `SocialClientController` (管理后台 - 社交客户端)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/social-client/create` | 创建社交客户端 | `CommonResult<Long>` | `@Valid @RequestBody SocialClientSaveReqVO createReqVO` |
| `PUT` | `/system/social-client/update` | 更新社交客户端 | `CommonResult<Boolean>` | `@Valid @RequestBody SocialClientSaveReqVO updateReqVO` |
| `DELETE` | `/system/social-client/delete` | 删除社交客户端 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/social-client/delete-list` | 批量删除社交客户端 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/social-client/get` | 获得社交客户端 | `CommonResult<SocialClientRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/social-client/page` | 获得社交客户端分页 | `CommonResult<PageResult<SocialClientRespVO>>` | `@Valid SocialClientPageReqVO pageVO` |
| `POST` | `/system/social-client/send-subscribe-message` | 发送订阅消息 | `void` | `@RequestBody SocialWxaSubscribeMessageSendReqDTO reqDTO` |

### 📦 `SocialUserController` (管理后台 - 社交用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/social-user/bind` | 社交绑定，使用 code 授权码 | `CommonResult<Boolean>` | `@RequestBody @Valid SocialUserBindReqVO reqVO` |
| `DELETE` | `/system/social-user/unbind` | 取消社交绑定 | `CommonResult<Boolean>` | `@RequestBody SocialUserUnbindReqVO reqVO` |
| `GET` | `/system/social-user/get-bind-list` | 获得绑定社交用户列表 | `CommonResult<List<SocialUserRespVO>>` | `-` |
| `GET` | `/system/social-user/get` | 获得社交用户 | `CommonResult<SocialUserRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/social-user/page` | 获得社交用户分页 | `CommonResult<PageResult<SocialUserRespVO>>` | `@Valid SocialUserPageReqVO pageVO` |

### 📦 `TenantController` (管理后台 - 租户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/tenant/get-id-by-name` | 使用租户名，获得租户编号 | `CommonResult<Long>` | `@RequestParam("name") String name` |
| `GET` | `/system/tenant` | 获取租户精简信息列表 | `CommonResult<List<TenantRespVO>>` | `-` |
| `GET` | `/system/tenant/get-by-website` | 使用域名，获得租户信息 | `CommonResult<TenantRespVO>` | `@RequestParam("website") @Pattern(regexp = "^[a-zA-Z0-9.-]+(:\\d{1,5})?$", message = "网站域名格式不正确") String website` |
| `POST` | `/system/tenant/create` | 创建租户 | `CommonResult<Long>` | `@Valid @RequestBody TenantSaveReqVO createReqVO` |
| `PUT` | `/system/tenant/update` | 更新租户 | `CommonResult<Boolean>` | `@Valid @RequestBody TenantSaveReqVO updateReqVO` |
| `DELETE` | `/system/tenant/delete` | 删除租户 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/tenant/delete-list` | 批量删除租户 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/tenant/get` | 获得租户 | `CommonResult<TenantRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/tenant/page` | 获得租户分页 | `CommonResult<PageResult<TenantRespVO>>` | `@Valid TenantPageReqVO pageVO` |

### 📦 `TenantPackageController` (管理后台 - 租户套餐)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/tenant-package/create` | 创建租户套餐 | `CommonResult<Long>` | `@Valid @RequestBody TenantPackageSaveReqVO createReqVO` |
| `PUT` | `/system/tenant-package/update` | 更新租户套餐 | `CommonResult<Boolean>` | `@Valid @RequestBody TenantPackageSaveReqVO updateReqVO` |
| `DELETE` | `/system/tenant-package/delete` | 删除租户套餐 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/tenant-package/delete-list` | 批量删除租户套餐 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/tenant-package/get` | 获得租户套餐 | `CommonResult<TenantPackageRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/tenant-package/page` | 获得租户套餐分页 | `CommonResult<PageResult<TenantPackageRespVO>>` | `@Valid TenantPackagePageReqVO pageVO` |
| `GET` | `/system/tenant-package` | 获取租户套餐精简信息列表 | `CommonResult<List<TenantPackageSimpleRespVO>>` | `-` |

### 📦 `UserController` (管理后台 - 用户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/system/user/create` | 新增用户 | `CommonResult<Long>` | `@Valid @RequestBody UserSaveReqVO reqVO` |
| `PUT` | `/system/userupdate` | 修改用户 | `CommonResult<Boolean>` | `@Valid @RequestBody UserSaveReqVO reqVO` |
| `DELETE` | `/system/user/delete` | 删除用户 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `DELETE` | `/system/user/delete-list` | 批量删除用户 | `CommonResult<Boolean>` | `@RequestParam("ids") List<Long> ids` |
| `PUT` | `/system/user/update-password` | 重置用户密码 | `CommonResult<Boolean>` | `@Valid @RequestBody UserUpdatePasswordReqVO reqVO` |
| `PUT` | `/system/user/update-status` | 修改用户状态 | `CommonResult<Boolean>` | `@Valid @RequestBody UserUpdateStatusReqVO reqVO` |
| `GET` | `/system/user/page` | 获得用户分页列表 | `CommonResult<PageResult<UserRespVO>>` | `@Valid UserPageReqVO pageReqVO` |
| `GET` | `/system/user/list` | 获得用户详情列表 | `CommonResult<List<UserRespVO>>` | `@RequestParam("ids") List<Long> ids` |
| `GET` | `/system/user` | 获取用户精简信息列表 | `CommonResult<List<UserSimpleRespVO>>` | `@RequestParam(value = "deptId", required = false) Long deptId` |
| `GET` | `/system/user/get` | 获得用户详情 | `CommonResult<UserRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/system/user/export-excel` | 导出用户 | `void` | `@Validated UserPageReqVO exportReqVO, HttpServletResponse response) throws IOException { exportReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<AdminUserDO> list = userService.getUserPage(exportReqVO).getList(); // 输出 Excel Map<Long, DeptDO> deptMap = deptService.getDeptMap( convertList(list, AdminUserDO::getDeptId)); ExcelUtils.write(response, "用户数据.xls", "数据", UserRespVO.class, UserConvert.INSTANCE.convertList(list, deptMap)); } @GetMapping("/get-import-template") @Operation(summary = "获得导入用户模板") public void importTemplate(HttpServletResponse response) throws IOException { // 手动创建导出 demo List<UserImportExcelVO> list = Arrays.asList( UserImportExcelVO.builder().username("yunai").deptId(1L).email("yunai@iocoder.cn").mobile("15601691300") .nickname("芋道").status(CommonStatusEnum.ENABLE.getStatus()).sex(SexEnum.MALE.getSex()).build(), UserImportExcelVO.builder().username("yuanma").deptId(2L).email("yuanma@iocoder.cn").mobile("15601701300") .nickname("源码").status(CommonStatusEnum.DISABLE.getStatus()).sex(SexEnum.FEMALE.getSex()).build() ); // 输出 ExcelUtils.write(response, "用户导入模板.xls", "用户列表", UserImportExcelVO.class, list); } @PostMapping("/import") @Operation(summary = "导入用户") @Parameters({ @Parameter(name = "file", description = "Excel 文件", required = true), @Parameter(name = "updateSupport", description = "是否支持更新，默认为 false", example = "true") }) @PreAuthorize("@ss.hasPermission('system:user:import')") public CommonResult<UserImportRespVO> importExcel(@RequestParam("file") MultipartFile file, @RequestParam(value = "updateSupport", required = false, defaultValue = "false") Boolean updateSupport) throws Exception { List<UserImportExcelVO> list = ExcelUtils.read(file, UserImportExcelVO.class); return success(userService.importUserList(list, updateSupport)); } // ==================== 免鉴权接口（用于 IM 点头像弹名片、加好友搜索等场景） ==================== @GetMapping("/get-simple") @Operation(summary = "获得用户精简信息", description = "用于点头像弹名片等场景；免鉴权") @Parameter(name = "id", description = "用户编号", required = true, example = "1024") public CommonResult<UserSimpleRespVO> getSimpleUser(@RequestParam("id") Long id` |
| `GET` | `/system/user/list-by-nickname` | 按昵称模糊搜索用户精简信息 | `CommonResult<List<UserSimpleRespVO>>` | `@RequestParam("nickname") String nickname` |

### 📦 `UserProfileController` (管理后台 - 用户个人中心)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/user/profile/get` | 获得登录用户信息 | `CommonResult<UserProfileRespVO>` | `-` |
| `PUT` | `/system/user/profile/update` | 修改用户个人信息 | `CommonResult<Boolean>` | `@Valid @RequestBody UserProfileUpdateReqVO reqVO` |
| `PUT` | `/system/user/profile/update-password` | 修改用户个人密码 | `CommonResult<Boolean>` | `@Valid @RequestBody UserProfileUpdatePasswordReqVO reqVO` |

### 📦 `AppDictDataController` (用户 App - 字典数据)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/dict-data/type` | 根据字典类型查询字典数据信息 | `CommonResult<List<AppDictDataRespVO>>` | `@RequestParam("type") String type` |

### 📦 `AppAreaController` (用户 App - 地区)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/area/tree` | 获得地区树 | `CommonResult<List<AppAreaNodeRespVO>>` | `-` |

### 📦 `AppTenantController` (用户 App - 租户)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/system/tenant/get-by-website` | 使用域名，获得租户信息 | `CommonResult<AppTenantRespVO>` | `@RequestParam("website") @Pattern(regexp = "^[a-zA-Z0-9.-]+(:\\d{1,5})?$", message = "网站域名格式不正确") String website` |

### 📦 `WmsHomeStatisticsController` (管理后台 - WMS 首页统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/wms/home-statistics/order-summary` | 获得首页单据汇总统计 | `CommonResult<List<WmsHomeOrderSummaryRespVO>>` | `@RequestParam(value = "warehouseId", required = false) Long warehouseId` |
| `GET` | `/wms/home-statistics/order-trend` | 获得首页单据趋势 | `CommonResult<List<WmsHomeOrderTrendRespVO>>` | `@RequestParam(value = "days", defaultValue = "7") @Min(1) @Max(90) Integer days, @RequestParam(value = "warehouseId", required = false) Long warehouseId` |
| `GET` | `/wms/home-statistics/inventory-summary` | 获得首页库存汇总统计 | `CommonResult<WmsHomeInventorySummaryRespVO>` | `@RequestParam(value = "warehouseId", required = false) Long warehouseId, @RequestParam(value = "goodsLimit", defaultValue = "5") @Min(1) @Max(20) Integer goodsLimit, @RequestParam(value = "warehouseLimit", defaultValue = "8") @Min(1) @Max(20) Integer warehouseLimit` |

### 📦 `WmsInventoryController` (管理后台 - WMS 库存统计)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/wms/inventory/page` | 获得库存统计分页 | `CommonResult<PageResult<WmsInventoryRespVO>>` | `@Valid WmsInventoryPageReqVO pageReqVO` |
| `GET` | `/wms/inventory/list` | 获得库存统计列表 | `CommonResult<List<WmsInventoryRespVO>>` | `@Valid WmsInventoryListReqVO listReqVO` |

### 📦 `WmsInventoryHistoryController` (管理后台 - WMS 库存流水)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/wms/inventory-history/page` | 获得库存流水分页 | `CommonResult<PageResult<WmsInventoryHistoryRespVO>>` | `@Valid WmsInventoryHistoryPageReqVO pageReqVO` |

### 📦 `WmsItemBrandController` (管理后台 - WMS 商品品牌)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/wms/item-brand/create` | 创建商品品牌 | `CommonResult<Long>` | `@Valid @RequestBody WmsItemBrandSaveReqVO createReqVO` |
| `PUT` | `/wms/item-brand/update` | 更新商品品牌 | `CommonResult<Boolean>` | `@Valid @RequestBody WmsItemBrandSaveReqVO updateReqVO` |
| `DELETE` | `/wms/item-brand/delete` | 删除商品品牌 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/item-brand/get` | 获得商品品牌 | `CommonResult<WmsItemBrandRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/item-brand/page` | 获得商品品牌分页 | `CommonResult<PageResult<WmsItemBrandRespVO>>` | `@Valid WmsItemBrandPageReqVO pageReqVO` |
| `GET` | `/wms/item-brand/simple-list` | 获得商品品牌精简列表 | `CommonResult<List<WmsItemBrandRespVO>>` | `-` |

### 📦 `WmsItemCategoryController` (管理后台 - WMS 商品分类)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/wms/item-category/create` | 创建商品分类 | `CommonResult<Long>` | `@Valid @RequestBody WmsItemCategorySaveReqVO createReqVO` |
| `PUT` | `/wms/item-category/update` | 更新商品分类 | `CommonResult<Boolean>` | `@Valid @RequestBody WmsItemCategorySaveReqVO updateReqVO` |
| `DELETE` | `/wms/item-category/delete` | 删除商品分类 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/item-category/get` | 获得商品分类 | `CommonResult<WmsItemCategoryRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/item-category/list` | 获得商品分类列表 | `CommonResult<List<WmsItemCategoryRespVO>>` | `@Valid WmsItemCategoryListReqVO listReqVO` |
| `GET` | `/wms/item-category/simple-list` | 获得商品分类精简列表 | `CommonResult<List<WmsItemCategoryRespVO>>` | `-` |

### 📦 `WmsItemController` (管理后台 - WMS 商品)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/wms/item/create` | 创建商品 | `CommonResult<Long>` | `@Valid @RequestBody WmsItemSaveReqVO createReqVO` |
| `PUT` | `/wms/item/update` | 更新商品 | `CommonResult<Boolean>` | `@Valid @RequestBody WmsItemSaveReqVO updateReqVO` |
| `DELETE` | `/wms/item/delete` | 删除商品 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/item/get` | 获得商品 | `CommonResult<WmsItemRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/item/page` | 获得商品分页 | `CommonResult<PageResult<WmsItemRespVO>>` | `@Valid WmsItemPageReqVO pageReqVO` |
| `GET` | `/wms/item/simple-list` | 获得商品精简列表 | `CommonResult<List<WmsItemRespVO>>` | `@Valid WmsItemListReqVO listReqVO` |
| `GET` | `/wms/item/export-excel` | 导出商品 Excel | `void` | `@Valid WmsItemPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<WmsItemDO> list = itemService.getItemPage(pageReqVO).getList(); ExcelUtils.write(response, "商品.xls", "数据", WmsItemRespVO.class, buildItemRespVOList(list)); } // ==================== 拼接 VO ==================== private WmsItemRespVO buildItemRespVO(WmsItemDO item` |

### 📦 `WmsItemSkuController` (管理后台 - WMS 商品 SKU)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/wms/item-sku/page` | 获得商品 SKU 分页 | `CommonResult<PageResult<WmsItemSkuRespVO>>` | `@Valid WmsItemSkuPageReqVO pageReqVO` |

### 📦 `WmsMerchantController` (管理后台 - WMS 往来企业)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/wms/merchant/create` | 创建往来企业 | `CommonResult<Long>` | `@Valid @RequestBody WmsMerchantSaveReqVO createReqVO` |
| `PUT` | `/wms/merchant/update` | 更新往来企业 | `CommonResult<Boolean>` | `@Valid @RequestBody WmsMerchantSaveReqVO updateReqVO` |
| `DELETE` | `/wms/merchant/delete` | 删除往来企业 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/merchant/get` | 获得往来企业 | `CommonResult<WmsMerchantRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/merchant/page` | 获得往来企业分页 | `CommonResult<PageResult<WmsMerchantRespVO>>` | `@Valid WmsMerchantPageReqVO pageReqVO` |
| `GET` | `/wms/merchant/simple-list` | 获得往来企业精简列表 | `CommonResult<List<WmsMerchantRespVO>>` | `@Valid WmsMerchantListReqVO listReqVO` |

### 📦 `WmsWarehouseController` (管理后台 - WMS 仓库)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/wms/warehouse/create` | 创建仓库 | `CommonResult<Long>` | `@Valid @RequestBody WmsWarehouseSaveReqVO createReqVO` |
| `PUT` | `/wms/warehouse/update` | 更新仓库 | `CommonResult<Boolean>` | `@Valid @RequestBody WmsWarehouseSaveReqVO updateReqVO` |
| `DELETE` | `/wms/warehouse/delete` | 删除仓库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/warehouse/get` | 获得仓库 | `CommonResult<WmsWarehouseRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/warehouse/page` | 获得仓库分页 | `CommonResult<PageResult<WmsWarehouseRespVO>>` | `@Valid WmsWarehousePageReqVO pageReqVO` |
| `GET` | `/wms/warehouse/simple-list` | 获得仓库精简列表 | `CommonResult<List<WmsWarehouseRespVO>>` | `-` |

### 📦 `WmsCheckOrderController` (管理后台 - WMS 盘库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/wms/check-order/create` | 创建盘库单 | `CommonResult<Long>` | `@Valid @RequestBody WmsCheckOrderSaveReqVO createReqVO` |
| `PUT` | `/wms/check-order/update` | 更新盘库单 | `CommonResult<Boolean>` | `@Valid @RequestBody WmsCheckOrderSaveReqVO updateReqVO` |
| `DELETE` | `/wms/check-order/delete` | 删除盘库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/wms/check-order/complete` | 完成盘库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/wms/check-order/cancel` | 作废盘库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/check-order/get` | 获得盘库单 | `CommonResult<WmsCheckOrderRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/check-order/page` | 获得盘库单分页 | `CommonResult<PageResult<WmsCheckOrderRespVO>>` | `@Valid WmsCheckOrderPageReqVO pageReqVO` |
| `GET` | `/wms/check-order/export-excel` | 导出盘库单 Excel | `void` | `@Valid WmsCheckOrderPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<WmsCheckOrderDO> list = checkOrderService.getCheckOrderPage(pageReqVO).getList(); ExcelUtils.write(response, "盘库单.xls", "数据", WmsCheckOrderRespVO.class, buildCheckOrderRespVOList(list)); } // ==================== 拼接 VO ==================== private WmsCheckOrderRespVO buildCheckOrderRespVO(WmsCheckOrderDO order` |

### 📦 `WmsCheckOrderDetailController` (管理后台 - WMS 盘库单明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/wms/check-order-detail/list-by-order-id` | 获得盘库单明细列表 | `CommonResult<List<WmsCheckOrderDetailRespVO>>` | `@RequestParam("orderId") Long orderId` |

### 📦 `WmsMovementOrderController` (管理后台 - WMS 移库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/wms/movement-order/create` | 创建移库单 | `CommonResult<Long>` | `@Valid @RequestBody WmsMovementOrderSaveReqVO createReqVO` |
| `PUT` | `/wms/movement-order/update` | 更新移库单 | `CommonResult<Boolean>` | `@Valid @RequestBody WmsMovementOrderSaveReqVO updateReqVO` |
| `DELETE` | `/wms/movement-order/delete` | 删除移库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/wms/movement-order/complete` | 完成移库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/wms/movement-order/cancel` | 作废移库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/movement-order/get` | 获得移库单 | `CommonResult<WmsMovementOrderRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/movement-order/page` | 获得移库单分页 | `CommonResult<PageResult<WmsMovementOrderRespVO>>` | `@Valid WmsMovementOrderPageReqVO pageReqVO` |
| `GET` | `/wms/movement-order/export-excel` | 导出移库单 Excel | `void` | `@Valid WmsMovementOrderPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<WmsMovementOrderDO> list = movementOrderService.getMovementOrderPage(pageReqVO).getList(); ExcelUtils.write(response, "移库单.xls", "数据", WmsMovementOrderRespVO.class, buildMovementOrderRespVOList(list)); } // ==================== 拼接 VO ==================== private WmsMovementOrderRespVO buildMovementOrderRespVO(WmsMovementOrderDO order` |

### 📦 `WmsMovementOrderDetailController` (管理后台 - WMS 移库单明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/wms/movement-order-detail/list-by-order-id` | 获得移库单明细列表 | `CommonResult<List<WmsMovementOrderDetailRespVO>>` | `@RequestParam("orderId") Long orderId` |

### 📦 `WmsReceiptOrderController` (管理后台 - WMS 入库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/wms/receipt-order/create` | 创建入库单 | `CommonResult<Long>` | `@Valid @RequestBody WmsReceiptOrderSaveReqVO createReqVO` |
| `PUT` | `/wms/receipt-order/update` | 更新入库单 | `CommonResult<Boolean>` | `@Valid @RequestBody WmsReceiptOrderSaveReqVO updateReqVO` |
| `DELETE` | `/wms/receipt-order/delete` | 删除入库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/wms/receipt-order/complete` | 完成入库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/wms/receipt-order/cancel` | 作废入库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/receipt-order/get` | 获得入库单 | `CommonResult<WmsReceiptOrderRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/receipt-order/page` | 获得入库单分页 | `CommonResult<PageResult<WmsReceiptOrderRespVO>>` | `@Valid WmsReceiptOrderPageReqVO pageReqVO` |
| `GET` | `/wms/receipt-order/export-excel` | 导出入库单 Excel | `void` | `@Valid WmsReceiptOrderPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<WmsReceiptOrderDO> list = receiptOrderService.getReceiptOrderPage(pageReqVO).getList(); ExcelUtils.write(response, "入库单.xls", "数据", WmsReceiptOrderRespVO.class, buildReceiptOrderRespVOList(list)); } // ==================== 拼接 VO ==================== private WmsReceiptOrderRespVO buildReceiptOrderRespVO(WmsReceiptOrderDO order` |

### 📦 `WmsReceiptOrderDetailController` (管理后台 - WMS 入库单明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/wms/receipt-order-detail/list-by-order-id` | 获得入库单明细列表 | `CommonResult<List<WmsReceiptOrderDetailRespVO>>` | `@RequestParam("orderId") Long orderId` |

### 📦 `WmsShipmentOrderController` (管理后台 - WMS 出库单)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `POST` | `/wms/shipment-order/create` | 创建出库单 | `CommonResult<Long>` | `@Valid @RequestBody WmsShipmentOrderSaveReqVO createReqVO` |
| `PUT` | `/wms/shipment-order/update` | 更新出库单 | `CommonResult<Boolean>` | `@Valid @RequestBody WmsShipmentOrderSaveReqVO updateReqVO` |
| `DELETE` | `/wms/shipment-order/delete` | 删除出库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/wms/shipment-order/complete` | 完成出库 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `PUT` | `/wms/shipment-order/cancel` | 作废出库单 | `CommonResult<Boolean>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/shipment-order/get` | 获得出库单 | `CommonResult<WmsShipmentOrderRespVO>` | `@RequestParam("id") Long id` |
| `GET` | `/wms/shipment-order/page` | 获得出库单分页 | `CommonResult<PageResult<WmsShipmentOrderRespVO>>` | `@Valid WmsShipmentOrderPageReqVO pageReqVO` |
| `GET` | `/wms/shipment-order/export-excel` | 导出出库单 Excel | `void` | `@Valid WmsShipmentOrderPageReqVO pageReqVO, HttpServletResponse response) throws IOException { pageReqVO.setPageSize(PageParam.PAGE_SIZE_NONE); List<WmsShipmentOrderDO> list = shipmentOrderService.getShipmentOrderPage(pageReqVO).getList(); ExcelUtils.write(response, "出库单.xls", "数据", WmsShipmentOrderRespVO.class, buildShipmentOrderRespVOList(list)); } // ==================== 拼接 VO ==================== private WmsShipmentOrderRespVO buildShipmentOrderRespVO(WmsShipmentOrderDO order` |

### 📦 `WmsShipmentOrderDetailController` (管理后台 - WMS 出库单明细)

| 方法 | 完整路径 | 说明 | 返回类型 | 参数 |
|---|---|---|---|---|
| `GET` | `/wms/shipment-order-detail/list-by-order-id` | 获得出库单明细列表 | `CommonResult<List<WmsShipmentOrderDetailRespVO>>` | `@RequestParam("orderId") Long orderId` |

### 📦 `DefaultController` (/admin-api/bpm/**)

*暂无解析出的 REST 路由*

## 4. 数据库物理表清单

