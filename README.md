# RAG-Ollama-JS

https://github.com/user-attachments/assets/e75e3571-098d-4654-b000-5fd23142f64f

## 简介
RAG-Ollama-JS 是一个基于 Next.js 的应用程序，它使用 LangChain.js、Ollama 和 Supabase 实现了检索增强生成（RAG）功能。该项目提供了一个用户友好的界面，支持基于文档的问答功能，并且可以处理 PDF 文件。它还支持安全的 RAG 功能，仅对已登录用户使用嵌入向量。

## 功能特性
- **PDF 文档支持**：上传和查看 PDF 文档，并带有内置导航功能
- **实时聊天界面**：交互式聊天界面，支持流式响应
- **RAG 实现**：
  - 使用 LangChain.js 进行结构化问题处理
  - 集成 Ollama 以提供语言模型能力
  - 利用 Supabase 进行向量存储和文档管理
- **响应式 UI**：分屏布局，包含 PDF 查看器和聊天界面
- **上下文感知响应**：基于文档内容生成答案

## 前置要求
- Node.js（最新 LTS 版本）
- 本地或远程运行的 Ollama
- Supabase 账户和项目

## 安装步骤

1. 克隆仓库：
```bash
git clone https://github.com/AbhisekMishra/rag-ollama-js.git
cd rag-ollama-js
```

2. 安装依赖：
```bash
npm install
```

3. 配置环境变量：
   - 将 `env.example` 复制为 `.env`
   - 更新以下变量：
```plaintext
SUPABASE_API_KEY=你的_supabase_api_key
SUPABASE_URL=你的_supabase_project_url
OLLAMA_LLM_BASE_URL=http://localhost:11434
OLLAMA_LLM_MODEL=你偏好的模型
OLLAMA_EMBEDDINGS_BASE_URL=http://localhost:11434
OLLAMA_EMBEDDINGS_MODEL=nomic-embed-text
```
4. 运行 **[`supabaseScripts.txt`](https://github.com/AbhisekMishra/rag-ollama-js/blob/main/supabaseScripts.txt)** 文件中提到的 supabase 命令

5. 启动开发服务器：
```bash
npm run dev
```

## 使用方法

1. **上传文档**：
   - 点击右侧面板中的 "Upload File"（上传文件）按钮
   - 选择要上传的 PDF 文档
   - 文档将被处理并存储在 Supabase 中

2. **查看文档**：
   - 使用箭头按钮或滚动来浏览页面
   - 页码指示器显示当前位置

3. **提问**：
   - 在聊天输入框中输入你的问题
   - 接收基于文档内容的上下文感知响应
   - 在聊天面板中查看对话历史

## 技术栈

- **前端**：Next.js 搭配 TypeScript
- **UI 框架**：Tailwind CSS
- **PDF 处理**：react-pdf
- **语言模型**：Ollama
- **向量存储**：Supabase
- **RAG 实现**：LangChain.js

## 项目结构

```plaintext
src/
├── app/
│   ├── api/         # chat 和文档处理的 API 路由
│   ├── home/        # 主应用页面
│   ├── lib/         # 核心库（Ollama、Supabase、提示词）
│   └── utils/       # 辅助函数和环境配置
```

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详情请参见 [LICENSE](LICENSE) 文件。
