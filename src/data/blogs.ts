export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'AI & SYSTEMS' | 'GRAPHICS & WEBGL' | 'ENGINEERING' | 'QUANT & TRADING';
  tags: string[];
  hasInteractiveCanvas?: boolean;
  content: {
    lead: string;
    sections: {
      heading?: string;
      subheading?: string;
      paragraphs: string[];
      code?: {
        language: string;
        code: string;
      };
      callout?: {
        type: 'note' | 'tip' | 'warning';
        text: string;
      };
      list?: string[];
    }[];
  };
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-trading-canvas',
    slug: 'trading-orderflow-po3-mindmap-canvas',
    title: '全景交易体系与订单流复盘思维画布：从 ICT/PO3 做市商模型、SMT 背离到盘口流动性吸收',
    excerpt: '独家内置交互式思维白板：解构真实金融交易中的机构算法逻辑。从 PO3（积累-诱导-派发）时空结构、韩师兄订单流足迹图微观失衡，到 CVD 背离与 5min 3k 极速入场系统的实盘全景复盘。',
    date: '2026-09-11',
    readTime: '15 MIN READ · 交互画布',
    category: 'QUANT & TRADING',
    hasInteractiveCanvas: true,
    tags: ['Order Flow', 'PO3 / AMD', 'Price Action', 'CVD Divergence', 'Volume Profile', 'Trading System', 'Obsidian Canvas'],
    content: {
      lead: '任何成熟交易体系的终局，都是在混乱无序的盘面噪波中建立确定性的概率边界。在金融衍生品日内波段与剥头皮实盘中，依靠传统单一指标滞后交叉往往沦为主力机构的流动性燃料。本文将我多年沉淀的交易架构通过「交互式思维白板」完整复盘：上方画板支持滚轮缩放与拖拽探查，涵盖 ICT/PO3 做市商算法、韩师兄订单流（Order Flow）盘口失衡、SMT 跨品种背离与真空 Model 成交量分布四大维度的精准共振。',
      sections: [
        {
          heading: '01 // 机构算法骨架：ICT / PO3 做市商操盘模型 (AMD)',
          subheading: '市场不是随机漫步，而是精准的流动性猎杀机制',
          paragraphs: [
            '散户眼中的突破往往是机构眼中的“陷阱”。在真实撮合市场中，大资金由于体量巨大，无法在任意价位完成进场，他们必须通过操纵价格制造假象，诱导散户在阻力位上方追多或在支撑位下方割肉，以此汲取充足的流动性对手盘。',
            'PO3 (Power of 3) 模型，即著名的 AMD 循环：'
          ],
          list: [
            'Accumulation（亚洲盘积累期）: 市场在狭窄区间内窄幅横盘，蓄积上下边界的止损挂单池（Buy-side / Sell-side Liquidity Pools）；',
            'Manipulation（伦敦盘诱导期 / Judas Swing）: 欧洲开盘前后，主力发起快速凶狠的虚假突破，跌破昨低或突破昨高，专门扫除散户止损；',
            'Distribution（纽约盘派发期）: 猎杀流动性完毕后，主力真金白银反手大单推动，走完全天最流畅、最单边的主升/主跌浪潮。'
          ],
          callout: {
            type: 'tip',
            text: '黄金实战铁律：永远不要在亚洲盘高低点未被扫荡（Sweep）前盲目建立单边重仓。等待虚假破位后的快速阳包阴收回，往往是全天确定性最高的入场点。'
          }
        },
        {
          heading: '02 // 微观透视：韩师兄订单流（Order Flow）与 CVD 量化背离',
          subheading: '穿透蜡烛图表象，直视主动买卖盘与大单吸收 (Absorption)',
          paragraphs: [
            '普通 K 线只记录了某时间窗口的开高低收，却将最重要的微观成交过程折叠为黑盒。订单流（Footprint 足迹图）则在每个 Price Level 上细分出 Bid（被动买限价单）与 Ask（主动市价买单）的精确撮合数量。',
            '当盘面在关键技术位（如 PO3 假突破低点）出现价格不再创新低，但足迹图上却爆出数千手主动市价卖单（Aggressive Sellers）时，说明存在体量恐怖的机构被动限价买单（Passive Buyers）在此死死吸纳全部抛盘。这就是经典的「吸收盘 (Absorption)」，随后的轧空行情势如破竹。'
          ],
          code: {
            language: 'typescript',
            code: `// 订单流主动买卖失衡与 CVD 实时累积差值计算模型
export interface OrderFlowTick {
  price: number;
  bidVol: number;
  askVol: number;
  delta: number; // askVol - bidVol
}

export function detectImbalance(current: OrderFlowTick, diagonalBelow: OrderFlowTick, threshold = 3.0): boolean {
  // 对角线失衡法则：当前价位的 Ask 买量相比下方价位的 Bid 卖量超过 300%
  if (diagonalBelow.bidVol === 0) return current.askVol > 100;
  const ratio = current.askVol / diagonalBelow.bidVol;
  return ratio >= threshold && current.askVol >= 50;
}`
          },
          callout: {
            type: 'warning',
            text: '警惕成交量陷阱：价格打出新高但 CVD 呈平缓走势甚至向下倾斜时，说明当前上涨完全由散户追高或空头止损推动，缺乏实质性大买单，通常预示着闪崩拐点即将来临。'
          }
        },
        {
          heading: '03 // 跨品种雷达：SMT 跨品种智能资金背离 (Smart Money Tool)',
          subheading: '利用资产相关性，捕捉主力资金暗度陈仓的蛛丝马迹',
          paragraphs: [
            '在数字资产（BTC vs ETH）或美股指期货（NQ 纳指 vs ES 标普）等具有极强宏观相关性的资产池中，主力机构往往无法同时同步买卖两只标的。',
            '当 BTC 强势创出日内新高，而 ETH 却软弱无力无法逾越前高时，SMT 空头背离正式成立！这种背离揭露了主力资金仅仅拉升领头羊掩护弱势标的抢先出货的真实意图。两者的背离时刻，往往对应全天最高点。'
          ],
          list: [
            '看涨 SMT: 标的 A 创出新低，但标的 B 拒绝创新低并形成更高低点（确认见底企稳）；',
            '看跌 SMT: 标的 A 创出新高，但标的 B 无法破位新高（确认顶部假突破，主力离场）。'
          ]
        },
        {
          heading: '04 // 空间维度：真空 Model 与成交量分布 (Volume Profile)',
          subheading: '像水流一样顺着阻力最小的方向流动',
          paragraphs: [
            '成交量分布（Volume Profile）揭示了价值中枢（POC - Point of Control）与筹码真空区（LVN - Low Volume Nodes）。',
            '市场价格行为具有极强的物理特性：在筹码密集区（HVN），各方利益博弈充分，价格倾向于震荡收敛；而在真空区（LVN），由于历史挂单极薄，一旦价格受到催化进入该区间，便会以极快速度单边“滑移穿透”，直达下一个价值中枢。'
          ]
        },
        {
          heading: '05 // 实战执行系统：5min 剥头皮与 3k 回调点位过滤律',
          subheading: '拒绝主观预测，以机械化规则执行高盈亏比入场',
          paragraphs: [
            '在建立完宏观 Bias、PO3 阶段与订单流确认后，具体的狙击入场落在 5 分钟级别图表上。我们遵循严格的「3K 回调过滤律」：'
          ],
          list: [
            '第一步：结构破坏（BOS / MSS），出现 1 根坚决大实体 K 线突破关键水平位；',
            '第二步：耐住追高冲动，等待价格回踩测试破位点或 FVG 失衡缺口，回踩 K 线严格限制在 3 根以内（时间过长代表动能丧失）；',
            '第三步：回踩触达关键点位且订单流出现被动吸收信号瞬间入场，止损直接锁定在假突破低点外 1-2 Tick，盈亏比保底 1:3 以上。'
          ]
        }
      ]
    }
  },
  {
    id: 'post-dermascan',
    slug: 'dermascan-ai-multimodal-skin-lesion-architecture',
    title: '构建医疗级 AI 辅助筛查工作站：肤理通 (DermaScan AI) 的临床多模态视觉、ABCDE 量化算法与高保真架构落地',
    excerpt: '深入复盘肤理通（DermaScan AI）从算法选型到工程落地的全过程：ISIC 数据集迁移微调、Grad-CAM 决策可解释性、ABCDE 临床形态学量化算法，以及如何打造零后端依赖的高保真云端交互演示架构。',
    date: '2026-09-11',
    readTime: '12 MIN READ',
    category: 'AI & SYSTEMS',
    tags: ['Medical AI', 'Computer Vision', 'React 19', 'PyTorch', 'ABCDE Rule', 'Local-First', 'TypeScript'],
    content: {
      lead: '早期恶性黑色素瘤与普通良性色素痣在肉眼与早期光学成像下的表型高度混淆，而基层医疗专科力量的分布不均，常导致恶性病变的漏诊或过度手术切除。为了探索 AI 在临床前期初筛中的普惠价值，我们打造了「肤理通 (DermaScan AI)」——一个将现代深度卷积神经网络、计算机视觉形态学测量与全生命周期健康追踪深度结合的辅助筛查工作站。本文将系统拆解其算法选型、ABCDE 临床指标量化模型以及基于 Local-First 的高保真无后端演示架构落地全过程。',
      sections: [
        {
          heading: '01 // 临床痛点与骨干视觉模型选型：ConvNeXt + CBAM 混合注意力',
          paragraphs: [
            '皮肤镜（Dermoscopy）图像具有极高分辨率、多中心拍摄照度差异大、病损边缘不规则以及色素分布不均等特点。传统 ResNet 骨干在应对细长浸润或微小角化损害时感受野受限。',
            '我们选用现代化大卷积核网络 ConvNeXt 作为特征提取核心，并在深层瓶颈层引入空间与通道双重卷积注意力模块（CBAM - Convolutional Block Attention Module）。通道注意力自动加权对黑色素敏感的光谱特征图，而空间注意力则抑制毛发遮挡与反光白斑等背景伪影。'
          ],
          callout: {
            type: 'tip',
            text: '在针对 ISIC 2024 数据集进行预处理时，采用色彩恒常性算法（Gray-World Color Constancy）配合双边滤波去毛发预处理，可使罕见类别病灶的 F1-score 显著提升 7.8%。'
          },
          code: {
            language: 'python',
            code: `# CBAM 混合注意力机制在皮肤病灶特征图上的前向推演
import torch
import torch.nn as nn

class ChannelAttention(nn.Module):
    def __init__(self, in_planes, ratio=16):
        super().__init__()
        self.avg_pool = nn.AdaptiveAvgPool2d(1)
        self.max_pool = nn.AdaptiveMaxPool2d(1)
        self.fc = nn.Sequential(
            nn.Conv2d(in_planes, in_planes // ratio, 1, bias=False),
            nn.ReLU(),
            nn.Conv2d(in_planes // ratio, in_planes, 1, bias=False)
        )
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        avg_out = self.fc(self.avg_pool(x))
        max_out = self.fc(self.max_pool(x))
        return self.sigmoid(avg_out + max_out) * x`
          }
        },
        {
          heading: '02 // 临床 ABCDE 黄金准则的计算机视觉数学量化',
          paragraphs: [
            '绝大多数通用分类模型直接输出黑盒概率，这在临床实践中往往无法取得医生与患者的信赖。皮肤科医生诊断黑色素瘤严格遵循 ABCDE 原则：Asymmetry（不对称性）、Border（边缘模糊度）、Color（颜色杂色度）、Diameter（直径超标）与 Evolving（动态演变）。',
            '我们在模型推演层之外，设计了一套基于图像处理的形态学量化算法管线：首先通过 Otsu 自适应二值化与形态学闭运算获取病灶 ROI 掩膜，随后提取特征并计算各维度量化得分。'
          ],
          list: [
            'A (Asymmetry): 求解掩膜的主惯性轴（Principal Inertia Axis），将病损沿主轴折叠并计算对称交并比（IoU），两轴不对称度得分越低代表越规则；',
            'B (Border): 提取病灶轮廓，计算轮廓周长与等面积圆周长之比（即分形紧致度 Compactness = P^2 / (4*pi*A)），分形维数越高代表边缘锯齿或浸润越严重；',
            'C (Color): 将病灶区域映射至 CIELAB 色彩空间，统计 L*a*b* 三维直方图的色谱离散方差与信息熵，多色混杂越严重得分越高；',
            'D (Diameter): 结合像素标定参考值换算实际长轴物理直径（毫米），超过 6mm 自动触发高危阈值；',
            'E (Evolving): 基于用户的历史随访记录，对比不同时期病损关键点的仿射变换偏移与面积增长率。'
          ],
          code: {
            language: 'typescript',
            code: `// ABCDE 临床边缘粗糙度（Border Compactness）量化评估核心逻辑
export function computeBorderScore(perimeter: number, area: number): { score: number; desc: string } {
  if (area <= 0) return { score: 0, desc: '无法识别有效病灶区域' };
  // 紧致度公式：圆形的评分为 1.0，锯齿/地图状浸润边界该值显著增加
  const compactness = (perimeter * perimeter) / (4 * Math.PI * area);
  const normalizedScore = Math.min(1.0, Math.max(0.0, (compactness - 1.0) / 3.0));
  
  let desc = '边缘平滑圆润，分界极为锐利清晰（良性体征）';
  if (normalizedScore > 0.6) {
    desc = '边缘参差不齐，呈锯齿状或地图状浸润扩散，分界不清（高危预警）';
  } else if (normalizedScore > 0.3) {
    desc = '边缘轻度凹凸，部分区域微模糊，建议短期随访观察';
  }
  return { score: Number(normalizedScore.toFixed(2)), desc };
}`
          }
        },
        {
          heading: '03 // 零后端依赖的高保真 Local-First 演示架构设计',
          paragraphs: [
            '在将个人作品部署至 Vercel 或 GitHub Pages 时，通常面临一个残酷现实：搭建配备 GPU 的后端微服务每年需要高昂的云服务器成本，且公共演示站极易遭受暴力请求刷爆算力配额。',
            '为解决这一难题，我们在「肤理通」中创新设计了 Local-First 双模透明降级中间层：前端核心 API 请求模块内建嗅探拦截器，当检测到后端不可达或运行在云端演示域名（*.vercel.app）时，即刻无缝激活高保真 Mock 响应状态机。'
          ],
          callout: {
            type: 'note',
            text: '高保真 Mock 绝非简单的硬编码假数据，而是通过统一封装的 { code: 200, message: "Success", data: ... } 结构化响应协议，包含 5 份完整的临床随访真实病历、6 篇权威医学审校百科以及支持增删改查的响应式 localStorage 存储引擎。'
          },
          code: {
            language: 'typescript',
            code: `// 全透明 Fetch 降级拦截器：保证在线演示站点 100% 零报错
export async function apiFetch(endpoint: string, options: RequestOptions = {}): Promise<Response> {
  if (isDemoMode() || window.location.hostname.includes('vercel.app')) {
    const mockResult = await handleMockApi(endpoint, options.method, options.body);
    return new Response(JSON.stringify(mockResult), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  try {
    return await fetch(\`\${BASE_URL}\${endpoint}\`, options);
  } catch (networkError) {
    // 真实后端连接超时或宕机时，自动无缝触发 Demo 降级兜底
    enableDemoMode(false);
    const fallbackResult = await handleMockApi(endpoint, options.method, options.body);
    return new Response(JSON.stringify(fallbackResult), { status: 200 });
  }
}`
          }
        },
        {
          heading: '04 // 体验在线系统与开源仓库',
          paragraphs: [
            '目前「肤理通 (DermaScan AI)」已全部开源，并已在 Vercel 完成全球 CDN 自动化部署。系统内置特应性皮炎、寻常型痤疮、良性色素痣、急性荨麻疹与面部脂溢性皮炎等 5 份真实全流程病历，以及包含肿瘤早筛、抗敏修护与痤疮应对在内的 6 篇图文并茂的专科健康百科。',
            '读者可以直接访问以下链接即刻体验无门槛在线演示，或查阅完整的 React 19 + TypeScript 前端开源工程源码：'
          ],
          list: [
            '在线交互演示体验站点：https://dermascan-ai-three.vercel.app/',
            'GitHub 开源代码仓库：https://github.com/ruiworm/dermascan-ai',
            '核心特性：实时摄像头抓取、ABCDE 综合评定、健康日历跟踪、百科分类检索、PWA 离线运行'
          ]
        }
      ]
    }
  },
  {
    id: 'post-1',
    slug: 'building-llm-gateway-go-sse',
    title: '构建高并发 LLM API 统一网关：Go 协程、滑动窗口限流与 SSE 流式管道调优',
    excerpt: '在多模型代理场景下，长连接 SSE 推流容易导致协程泄漏与内存抖动。本文拆解我们如何基于 Go 实现每秒 48K QPS 的高性能统一大模型网关。',
    date: '2026-08-28',
    readTime: '8 MIN READ',
    category: 'AI & SYSTEMS',
    tags: ['Go', 'Concurrency', 'LLM', 'SSE', 'Redis'],
    content: {
      lead: '随着各种开源模型与商业大模型的百花齐放，团队内各业务线对 LLM API 的调用需求激增。直接由各客户端对接不同厂商的协议，不仅面临鉴权分散、凭据泄露等安全隐患，还无法做全局配额管理与模型降级兜底。因此，打造一个毫秒级延迟、支持高吞吐长连接的统一网关势在必行。',
      sections: [
        {
          heading: '01 // 长连接流式输出（SSE）的协程生命周期困境',
          paragraphs: [
            '与传统一次性返回的 REST API 不同，LLM 对话通常依赖 Server-Sent Events (SSE) 持续输出 Token。一个典型的对话推流可能持续数秒至数十秒。',
            '在高并发场景下，如果客户端在模型生成未完成时提前切断连接（例如用户点击了“停止生成”或关闭了页面），网关层必须能够立即感知并向上游模型供应商发出连接取消信号，否则后方昂贵的推断算力将被白白浪费，网关内部的读写协程也会发生泄漏。'
          ],
          callout: {
            type: 'warning',
            text: '在 Go 的 http.Handler 中，必须严格绑定 http.Request.Context()。一旦客户端中断连接，ctx.Done() 通道将立即被关闭。任何后台透传协程都应监听此信号。'
          },
          code: {
            language: 'go',
            code: `// 安全的流式管道代理核心结构
func (p *StreamProxy) ForwardSSE(w http.ResponseWriter, r *http.Request, upstreamResp *http.Response) error {
    ctx := r.Context()
    flusher, ok := w.(http.Flusher)
    if !ok {
        return errors.New("streaming unsupported")
    }

    w.Header().Set("Content-Type", "text/event-stream")
    w.Header().Set("Cache-Control", "no-cache")
    w.Header().Set("Connection", "keep-alive")

    scanner := bufio.NewScanner(upstreamResp.Body)
    for scanner.Scan() {
        select {
        case <-ctx.Done():
            // 客户端主动断开，立即终止上游流
            upstreamResp.Body.Close()
            return ctx.Err()
        default:
            line := scanner.Bytes()
            w.Write(line)
            w.Write([]byte("\\n\\n"))
            flusher.Flush()
        }
    }
    return scanner.Err()
}`
          }
        },
        {
          heading: '02 // 分布式滑动窗口（Sliding Window）限流设计',
          paragraphs: [
            '大模型供应商对每分钟的 Token 总量 (TPM) 与每分钟请求数 (RPM) 都有严格阶梯限制。传统的漏桶算法在面对突发突刺请求时反应过慢，而固定窗口则存在窗口重叠处的两倍流量风险。',
            '我们采用了基于 Redis Sorted Set (ZSET) 的分布式平滑滑动窗口。将每次请求的毫秒级时间戳作为 score 写入，配合 Lua 脚本实现原子级别的过期清理、计数与准入裁决。'
          ],
          list: [
            '移除当前时间窗口之外的旧记录：ZREMRANGEBYSCORE key 0 (now - windowSize)',
            '统计当前滑动窗口内的活跃请求量：ZCARD key',
            '若未超限，则写入当前时间戳：ZADD key now requestId',
            '设置整体键的过期时间，防止内存冷数据残留'
          ]
        },
        {
          heading: '03 // 落地成效与基准测试数据',
          paragraphs: [
            '经过全链路优化后，网关自身的平均处理与转发损耗被压制在 1.5ms 以内，单机在 4 核 8G 虚拟机上轻松承载 48,000 QPS 稳定并发，流断开回收成功率提升至 99.98%。'
          ]
        }
      ]
    }
  },
  {
    id: 'post-2',
    slug: 'modern-webgl-fluid-non-box-ui',
    title: '解构现代 WebGL 交互：从 Shader 弹性碰撞到非盒子流体 UI',
    excerpt: '告别方方正正的卡片堆叠！如何运用数学曲线、着色器片段与弹簧物理模型，在 Web 端创造具有呼吸感、无边界的未来主义数字界面。',
    date: '2026-07-15',
    readTime: '6 MIN READ',
    category: 'GRAPHICS & WEBGL',
    tags: ['WebGL', 'GLSL', 'Three.js', 'UI/UX', 'Motion'],
    content: {
      lead: '多年来，现代 Web 界面一直被包裹在传统的盒模型（Box Model）中。各种各样的卡片、线框虽然秩序严谨，但也在潜意识中规训了人机交互的自然表达。在个人网站的重构中，我尝试打破“盒子”的桎梏，让光照、引力与形变成为界面指引的主要线索。',
      sections: [
        {
          heading: '01 // 流体有机形变：基于八阶三次贝塞尔的动态曲率',
          paragraphs: [
            '很多人实现不规则图形往往直接套用固定 SVG，但这会让图形失去与用户互动的弹性。',
            '在 CSS 与动画库的配合下，利用 8 个象限的百分比边框半径变化，结合有理物理弹簧（Spring Physics），可以模拟水滴与细胞核分裂的流体感。'
          ],
          code: {
            language: 'css',
            code: `/* 有机流体无规则形态过渡定义 */
.fluid-capsule {
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  animation: morphFluid 8s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 25px rgba(34, 211, 238, 0.25));
}

@keyframes morphFluid {
  0%   { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
  50%  { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
}`
          }
        },
        {
          heading: '02 // 激光探针探照：基于 Clip-Path 与 Spring 追踪',
          paragraphs: [
            '与其把所有内容一览无余地平铺给用户，不如创造一种“黑暗探险”的乐趣。在首屏中，我们隐藏了高反差视觉层，只留下低对比度的底层轮廓。',
            '当用户的光标在屏幕上划过时，高刚度、低阻尼的物理弹簧会将视口几何圆实时裁切投射出来。这不仅让用户产生掌控光线的愉悦感，更在潜意识中引导了视觉焦点。'
          ],
          callout: {
            type: 'tip',
            text: '在处理快速移动的光标时，普通的 lerp 插值会有延迟感，而合理的 Spring 阻尼系数（Damping: 15, Stiffness: 400）能够产生极具机械质感的干脆停顿。'
          }
        },
        {
          heading: '03 // 结语：设计的尽头是克制',
          paragraphs: [
            '前卫的视觉绝不等于无节制的光污染与堆叠粒子。真正的未来感来自于：用最少的多余元素，通过纯粹的比例、留白与精准的动效反馈，唤起使用者的好奇心。'
          ]
        }
      ]
    }
  },
  {
    id: 'post-3',
    slug: 'offline-first-architecture-aes256',
    title: '离线优先架构（Offline-First）与端侧 AES-256 加密同步实践',
    excerpt: '探讨在弱网与多端断连状态下，如何通过 Local-First 理念、分布式多层缓存与端到端加密，构建兼顾极致响应与隐私安全的现代化资产应用。',
    date: '2026-06-02',
    readTime: '7 MIN READ',
    category: 'ENGINEERING',
    tags: ['Offline-First', 'Security', 'Cryptography', 'Architecture', 'TypeScript'],
    content: {
      lead: '现代 Web 应用往往假定网络始终可用且畅通无阻，这导致很多应用在弱网或高铁飞机场景下频频卡死报错。Local-First（本地优先）倡导将本地存储作为绝对真相源（Single Source of Truth），云端仅作为同步管道，彻底颠覆了传统的 CS 交互逻辑。',
      sections: [
        {
          heading: '01 // 本地优先与 CRDT 冲突消解模型',
          paragraphs: [
            '当应用在离线状态下被多端并发修改时，传统的“后者覆盖前者（Last-Write-Wins）”策略极易导致数据无意丢失。',
            '我们采用轻量级无冲突复制数据类型（CRDT - Conflict-free Replicated Data Type）的状态向量模型。每次本地操作先原子落盘，并生成单调自增的时钟版本号，重连后仅需同步增量 Patch。'
          ]
        },
        {
          heading: '02 // 端到端 AES-GCM-256 零信任加密',
          paragraphs: [
            '对于敏感资产及金融追踪类数据，我们实行“零知识架构（Zero-Knowledge Architecture）”。所有数据在离开用户设备写入云端前，均在 Web Crypto API 下通过派生自主密码的主密钥完成加解密。',
            '哪怕云端数据库或同步服务器被完全攻破，攻击者也只能拿到由高熵向量加密的乱码密文，无法窥视任何真实数字资产细节。'
          ],
          code: {
            language: 'typescript',
            code: `// 端侧 Web Crypto 对称加密封装示例
async function encryptPayload(plainText: string, key: CryptoKey): Promise<{ cipher: ArrayBuffer, iv: Uint8Array }> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  // 每次加密必须生成全新的随机 12 字节初始化向量 (IV)
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    key,
    data
  );

  return { cipher, iv };
}`
          }
        },
        {
          heading: '03 // 架构启示',
          paragraphs: [
            '本地优先不仅带来了零网络延迟的秒开极致体验，更将数据的真正所有权归还给了用户。这是构建下一代抗审查、高可用数字产品的关键范式。'
          ]
        }
      ]
    }
  }
];
