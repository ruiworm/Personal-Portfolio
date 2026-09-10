export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: 'AI & SYSTEMS' | 'GRAPHICS & WEBGL' | 'ENGINEERING';
  tags: string[];
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
