# vere // Personal Portfolio & Research Archive

> 探索技术边界，构建优雅且高效的数字产品。一个融合深色高反差未来主义、流体交互美学与全屏沉浸式档案体验的现代化工程师作品集与技术随笔中心。

---

## 🌟 核心特性

- **首屏激光探照动效 (Laser Probe & Spring Dynamics)**：基于 `clip-path` 与物理弹簧追踪系统，营造具有机械探险质感的高反差首屏体验。
- **全景工程展厅 (Projects Archive)**：单页响应式网格瀑布流，支持多分类筛选与即时模糊检索。
- **全屏去窗口化深度项目档案 (Immersive Project Dossier)**：告别生硬的传统模态框弹窗，采用全景 HUD 视口、激光阅读进度条、性能指标微览与架构流水线。
- **独立博客系统 (Writings & Thoughts)**：支持按分类过滤、实时搜索、深度阅读模式、HUD 提示卡片以及带语法高亮和一键复制功能的交互式代码块。
- **全局 HUD 悬浮导航 (Floating HUD Pill)**：三合一滑动胶囊导航（`OVERVIEW` / `PROJECTS` / `WRITINGS`）。
- **零依赖强健 Hash 路由**：原生支持浏览器历史回退与深度直达链接，天然免疫静态平台刷新 404 问题。

---

## 🛠️ 技术栈

- **Core**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Animation**: Motion (Framer Motion)
- **Tooling**: Vite 6

---

## 🚀 本地开发与构建

### 1. 安装依赖
```bash
npm install
```

### 2. 启动开发服务器
```bash
npm run dev
```
打开浏览器访问 [http://localhost:3000](http://localhost:3000)。

### 3. 生产打包
```bash
npm run build
```
打包输出目录位于 `dist/`，可直接部署至任何静态托管服务。

---

## 🌐 一键部署指南 (Vercel / Cloudflare Pages)

### 推荐：Vercel 部署 (最简免维护)

1. 将代码推送到你的 GitHub 仓库。
2. 登录 [Vercel](https://vercel.com/)，点击 **Add New... -> Project**。
3. 导入本仓库，框架选择 **Vite**，点击 **Deploy**。
4. 部署完成后在项目设置中添加你的自定义域名（国内秒开访问）。

---

## 📝 内容维护与更新

- **添加或修改项目**：编辑 [`src/data/projects.ts`](src/data/projects.ts)，填入项目信息，页面与全屏详情全自动同步生成。
- **添加或修改博文**：编辑 [`src/data/blogs.ts`](src/data/blogs.ts)，支持结构化小节、代码块与提示框。

---

## 📄 开源许可

[MIT License](LICENSE) © 2026 vere
