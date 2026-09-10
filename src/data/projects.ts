export interface ProjectSpec {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  category?: 'AI / ML' | 'SYSTEMS & CLOUD' | 'GRAPHICS & WEBGL' | 'FULLSTACK & APP';
  details: string;
  specs: ProjectSpec[];
  challenges: string;
  architecture: string[];
}

export const projects: Project[] = [
  {
    id: "skin-analysis",
    title: "皮肤图像辅助分析系统",
    description: "基于深度学习的皮肤病变图像辅助诊断工具，提供高精度的分类与特征提取功能。",
    image: "https://picsum.photos/seed/skin-analysis/800/600?blur=2",
    tags: ["Python", "PyTorch", "React", "AI"],
    category: "AI / ML",
    link: "#",
    details: "采用 ResNet-50 / ConvNeXt 基础骨干网，融合空间与通道注意力机制（CBAM），在 12 万张受标准临床标注病损样本上进行多任务联合训练，可实现 32 种常见及罕见皮肤表征的主动精确检出与多标签病灶勾画定位。",
    specs: [
      { label: "平均推断延迟", value: "< 120ms" },
      { label: "Top-1 检出准确率", value: "96.4%" },
      { label: "模型本地体积", value: "84MB" }
    ],
    challenges: "由于罕见表征极度稀缺造成整体分类高度不平衡，系统深度集成了 conditional Generative Adversarial Networks (cGAN) 对小样本做特征级伪数据采样合成，再通过解离自适应增强解决多源照度偏移的适配难点。",
    architecture: ["前端图像流捕捉", "云端边缘推断节点", "ConvNeXt 骨干推演内核", "临床辅助可视化面板"]
  },
  {
    id: "api-gateway",
    title: "大模型 API 统一网关",
    description: "高性能的 LLM API 聚合与分发网关，支持多模型负载均衡、鉴权与流式响应。",
    image: "https://picsum.photos/seed/api-gateway/800/600?blur=2",
    tags: ["Go", "Redis", "Docker", "SSE"],
    category: "SYSTEMS & CLOUD",
    link: "#",
    details: "使用生产级高性能 Go 并发系统独立设计、自主编码。网关架构将代理、路由、审计、负载均衡全面微服务下放。核心支持 SSE 无阻断高吞吐转发。内建基于滑动窗口的漏桶与令牌桶并发限制及动态故障迁移模块。",
    specs: [
      { label: "整网并发吞吐", value: "48K QPS" },
      { label: "网关自身转发延迟", value: "< 1.5ms" },
      { label: "自愈熔断反应时长", value: "100ms" }
    ],
    challenges: "各大基础模型服务接口的参数协议极其互斥且动态。面临高并发场景下长生命周期 SSE 数据管道导致的系统高频瞬发重分配瓶颈及轻量级流连接清理。",
    architecture: ["Go 核心网关内核", "Redis 存储与限制核心", "多路安全认证层 (OAuth)", "自动化模型可用分发算法"]
  },
  {
    id: "hologram-ui",
    title: "全息投影交互界面",
    description: "为裸眼3D显示设备设计的非接触式手势交互系统，彻底打破物理屏幕的边界限制。",
    image: "https://picsum.photos/seed/hologram/800/600?blur=2",
    tags: ["WebGL", "Three.js", "C++", "Shaders"],
    category: "GRAPHICS & WEBGL",
    link: "#",
    details: "深度整合双红外广角景深相机及可见光多特征捕捉管线。在 Web 端基于优化后的 WebGL 着色器（Shader）对多阶骨骼控制点实时计算，并在 3D 三轴世界空间内根据瞬时加速度、旋转矢量完成物理弹性阻尼碰撞推演。",
    specs: [
      { label: "手势点感知偏差", value: "< 1.2mm" },
      { label: "捕获高采样速率", value: "90 FPS" },
      { label: "GPU 着色器计算载荷", value: "12%" }
    ],
    challenges: "手势捕获中由于手指叠合导致的视觉阴影盲区深度混淆，以及由于降噪算法引起的传输对空迟滞现象。",
    architecture: ["硬件多视角深度感应层", "手部关节点坐标平滑算法", "Three.js 网格物理控制器", "WebGL 高层自渲染矩阵"]
  },
  {
    id: "finance-tracker",
    title: "基金收益追踪 App",
    description: "一款个人资产管理与基金收益可视化应用，支持多账户同步与实时净值更新。",
    image: "https://picsum.photos/seed/finance-app/800/600?blur=2",
    tags: ["Flutter", "Dart", "Node.js", "Offline-First"],
    category: "FULLSTACK & APP",
    link: "#",
    details: "本端基于离线优先设计（Offline-First），采用端/源分布式多层架构。融合了全链路高强度双因子对称加密（AES-GCM-256）存储方案。无缝聚合各家基金公开实时披露接口，渲染高画质、多维度的复合财务报表数据体系。",
    specs: [
      { label: "更新拉取开销", value: "< 150ms" },
      { label: "图形渲染帧率", value: "120 FPS" },
      { label: "主存储安全系数", value: "AES-256" }
    ],
    challenges: "多节点分布式基金变动对流的瞬时拥堵解决、非阻塞高频更新资产曲线的极致图形加速优化。",
    architecture: ["Flutter 自渲染底层", "SQLite 缓存路由中间件", "Node.js 汇率转换核心", "多端联动云存储同步"]
  },
  {
    id: "smarthome-hub",
    title: "智能家居中枢控制台",
    description: "基于物联网的家庭设备联动中心，支持语音唤醒与情境模式自适应无缝切换。",
    image: "https://picsum.photos/seed/smarthome/800/600?blur=2",
    tags: ["Vue", "Node.js", "IoT", "MQTT"],
    category: "SYSTEMS & CLOUD",
    link: "#",
    details: "集成了极低算力占用的轻量离线语音关键词捕捉引擎，在边缘网关进行声控波谱检测。协议层原生支持 Zigbee、Z-Wave 物理无线与工业级 MQTT 网络数据通信。通过规则引擎自组织本地子网内设备协作状态矩阵。",
    specs: [
      { label: "语音响应时间", value: "350ms" },
      { label: "协议并发解析", value: "1,200 pkt/s" },
      { label: "无网自建子网率", value: "100%" }
    ],
    challenges: "面临复杂的家庭物理干扰，建立容错且高密集的自组网，并在无外界网宽通信的条件下依然保证 100% 规则链触发、完美自愈。",
    architecture: ["边缘轻型指令监听模块", "MQTT 报文广播代理", "Vue 情景渲染交互卡", "本地事件安全循环链"]
  },
  {
    id: "decentralized-network",
    title: "去中心化创作者网络",
    description: "基于区块链技术的创作者激励平台，确保内容所有权与收益的透明、自动化分配。",
    image: "https://picsum.photos/seed/web3/800/600?blur=2",
    tags: ["Solidity", "React", "Web3", "IPFS"],
    category: "FULLSTACK & APP",
    link: "#",
    details: "核心智能合约（Smart Contract）由 Solidity 完全编写并经形式化验证（Formal Verification），布设于低开销以太坊等效 Layer-2。通过多重签名保护以及自动化资金流分级拆分机制，保障去特权化发布体系下数字知识产权免遭审查与不合理盘剥。",
    specs: [
      { label: "端侧运行 Gas 开销", value: "极低" },
      { label: "单日网络最大交易量", value: "450K txn" },
      { label: "产权确认同步时效", value: "< 14s" }
    ],
    challenges: "去中心化元数据高度繁重与链上高昂存储空间的极限博弈。系统深度依赖去中心化分布式持久层 (IPFS/Arweave) 进行内容落盘，再返写精简 Hash 回链确权。",
    architecture: ["Solidity 核心链控制池", "IPFS 去中心分布式持久层", "以太坊多重鉴权连接层", "React + viem 用户客户端界面"]
  },
  {
    id: "webgpu-fluid",
    title: "WebGPU 神经流体粒子仿真",
    description: "基于 WGSL 计算着色器的十万级流体粒子实时物理模拟，支持屏幕空间流体表面重构。",
    image: "https://picsum.photos/seed/webgpu-fluid/800/600?blur=2",
    tags: ["WebGPU", "WGSL", "TypeScript", "Math"],
    category: "GRAPHICS & WEBGL",
    link: "#",
    details: "利用现代 WebGPU 计算管线（Compute Shader）完全解耦 CPU 计算瓶颈。在 GPU 显存内并行求解 Navier-Stokes 纳维-斯托克斯流体力学偏微分方程，实现 150,000+ SPH 粒子的粘性碰撞与表面张力模拟，画面丝滑稳定在 120 FPS。",
    specs: [
      { label: "活跃物理粒子数", value: "150,000+" },
      { label: "渲染帧率", value: "120 FPS" },
      { label: "GPU 调度开销", value: "< 3.2ms" }
    ],
    challenges: "在有限显存带宽下实现平滑粒子流体动力学（SPH）邻域网格哈希并行搜索与内存重排。",
    architecture: ["WebGPU 设备初始化上下文", "WGSL 空间哈希排序内核", "SPH 压力加速度推演 Shader", "Screen-Space 流体高斯模糊后处理"]
  },
  {
    id: "rust-vector-engine",
    title: "Rust 混合向量检索与知识库内核",
    description: "专为高精度 RAG 设计的轻量嵌入向量检索核心，融合密集向量与稀疏 BM25 混合排序。",
    image: "https://picsum.photos/seed/vector-rag/800/600?blur=2",
    tags: ["Rust", "HNSW", "VectorDB", "RAG"],
    category: "SYSTEMS & CLOUD",
    link: "#",
    details: "使用纯 Rust 编写的嵌入式向量检索库，内建优化的分层可导航小世界图（HNSW）索引结构。支持 AVX-512 与 ARM Neon SIMD 指令集硬件级点积加速，内存占用比同类 C++ 库降低 38%，专为本地私有化知识库部署打造。",
    specs: [
      { label: "千万向量检索延迟", value: "< 2.8ms" },
      { label: "召回率 (Recall@10)", value: "98.7%" },
      { label: "二进制体积", value: "14MB" }
    ],
    challenges: "在无锁并发读写场景下保持 HNSW 图拓扑的连通性与高召回率动态图修复。",
    architecture: ["SIMD 硬件距离计算层", "HNSW 分层图存储内核", "BM25 倒排索引混合归并", "gRPC / C-ABI 跨语言绑定接口"]
  },
  {
    id: "vision-agent",
    title: "轻量端侧视觉 Agent 协同工作台",
    description: "在浏览器端直接执行 ONNX 视觉轻量推理的桌面自动化与多任务代理控制台。",
    image: "https://picsum.photos/seed/vision-agent/800/600?blur=2",
    tags: ["WebAssembly", "ONNX", "React", "AI Agent"],
    category: "AI / ML",
    link: "#",
    details: "结合 WebAssembly 与 WebNN 技术，将经过量化蒸馏的视觉定位模型完整打包进浏览器环境。无需向任何服务器上传屏幕截图，即可在用户本地完成 UI 元素自动识别、操作意图推理与自动化表单编排。",
    specs: [
      { label: "本地模型内存占用", value: "142MB" },
      { label: "端侧单帧识别耗时", value: "85ms" },
      { label: "隐私数据外发率", value: "0%" }
    ],
    challenges: "WebAssembly 线程池在跨浏览器环境下的内存共享与量化权重张量重分配瓶颈消除。",
    architecture: ["Canvas 屏幕捕获管线", "WASM ONNX 推理运行核", "UI 树层级拓扑重构器", "无状态动作编排状态机"]
  }
];
