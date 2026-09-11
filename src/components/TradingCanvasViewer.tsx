import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Crosshair, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ChevronRight,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface CanvasNode {
  id: string;
  title: string;
  category: string;
  badge: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: 'emerald' | 'cyan' | 'amber' | 'purple' | 'rose';
  summary: string;
  bullets: string[];
  metrics?: { label: string; value: string }[];
  diagramType: 'po3' | 'orderflow' | 'cvd' | 'smt' | 'vacuum' | 'scalp';
  articleSectionId?: string;
}

export interface CanvasEdge {
  from: string;
  to: string;
  label?: string;
  direction?: 'forward' | 'bidirectional';
}

const NODES: CanvasNode[] = [
  {
    id: 'node-po3',
    title: 'PO3 做市商操盘模型 (AMD)',
    category: '机构算法层 // MACRO ALGO',
    badge: 'CORE_STRUCTURE',
    x: 420,
    y: 60,
    width: 320,
    height: 240,
    color: 'emerald',
    summary: 'Accumulation 筹码积累 → Manipulation 假突破诱导清算 → Distribution 单边真实派发。',
    bullets: [
      '亚洲盘 (Asia): 区间震荡积累流动性，形成日内高低点区间',
      '伦敦盘 (London): 诱多/诱空跌破关键位，触发止损盘 (Judas Swing)',
      '纽约盘 (NY): 机构真金白银顺大势单边派发，走完日内主升/跌浪'
    ],
    metrics: [
      { label: '胜率提升', value: '+34%' },
      { label: '假突破过滤', value: '88.5%' }
    ],
    diagramType: 'po3',
    articleSectionId: 'sec-po3'
  },
  {
    id: 'node-orderflow',
    title: '韩师兄订单流 // 吸收盘与失衡',
    category: '微观盘口层 // MICRO TAPE',
    badge: 'ORDER_FLOW',
    x: 820,
    y: 180,
    width: 320,
    height: 260,
    color: 'cyan',
    summary: '穿透 K 线表象，直接洞察主动市价单（Aggressive）与被动限价单（Passive）的生死博弈。',
    bullets: [
      '吸收盘 (Absorption): 市价巨量砸盘却无法推动价格下跌，机构大单被动接盘',
      '足迹图 (Footprint): Bid/Ask 对角线失衡买卖盘（300%+ 阶梯失衡触发预警）',
      'Delta 翻转: 极端位置出现主动买盘衰竭，空头瞬间接管流动性'
    ],
    metrics: [
      { label: '入场精度', value: 'Tick 级' },
      { label: '盈亏比', value: '1 : 3.5+' }
    ],
    diagramType: 'orderflow',
    articleSectionId: 'sec-orderflow'
  },
  {
    id: 'node-cvd',
    title: 'CVD 累积成交量差与背离判定',
    category: '动量指标层 // DELTA DIVERGENCE',
    badge: 'CVD_MOMENTUM',
    x: 820,
    y: 500,
    width: 310,
    height: 230,
    color: 'purple',
    summary: '累积主动买量减主动卖量的差值轨迹。是识别机构诱多诱空的最强量化滤镜。',
    bullets: [
      '看跌背离: 价格刷新日内新高，而 CVD 显著走平或走低 → 主动买盘严重枯竭',
      '看涨背离: 价格打出更低低点，而 CVD 形成抬高底部 → 现货/大单吸筹完毕',
      '零轴突破: 伴随突破关键结构位，确认趋势延续爆发力'
    ],
    metrics: [
      { label: '假破识别', value: '92.1%' },
      { label: '平仓预警', value: '极灵敏' }
    ],
    diagramType: 'cvd',
    articleSectionId: 'sec-cvd'
  },
  {
    id: 'node-smt',
    title: 'SMT 跨品种智能资金背离',
    category: '关联资产层 // SMART MONEY TOOL',
    badge: 'CORRELATION',
    x: 420,
    y: 380,
    width: 320,
    height: 230,
    color: 'amber',
    summary: '通过强关联交易标的（如 BTC vs ETH、纳指 NQ vs 标普 ES）的高低点破位背离抓反转。',
    bullets: [
      '经典空头 SMT: BTC 突破前高刷新纪录，而 ETH 止步于前高下方未能破位',
      '机理解析: 强势资金拒绝跟随买入弱势资产，揭露主力拉升龙头掩护全盘出逃',
      '共振确认: 与 PO3 伦敦盘假突破节点同时发生，构成极高确定性反转信号'
    ],
    metrics: [
      { label: '反转确定性', value: 'A+ 级' },
      { label: '先导反应', value: '提前 5-15m' }
    ],
    diagramType: 'smt',
    articleSectionId: 'sec-smt'
  },
  {
    id: 'node-vacuum',
    title: '真空 Model // 成交量分布 (Volume Profile)',
    category: '结构空间层 // LIQUIDITY VACUUM',
    badge: 'VP_DISTRIBUTION',
    x: 40,
    y: 120,
    width: 310,
    height: 240,
    color: 'rose',
    summary: '基于时间与价格的筹码密集区（HVN）与流动性真空区（LVN）空间立体映射。',
    bullets: [
      '价值中枢 (POC): 成交量最大密集区，对价格具有强力引力与缓冲吸附效应',
      '真空区穿透 (LVN): 历史筹码极薄的悬空区间，价格一旦进入将以单边光速滑移',
      '失衡缺口 (FVG / Fair Value Gap): 暴跌暴涨留下的不平衡烛身，必将发生磁吸回补'
    ],
    metrics: [
      { label: '突破目标位', value: '下一个 HVN' },
      { label: '穿透阻力', value: '极低' }
    ],
    diagramType: 'vacuum',
    articleSectionId: 'sec-vacuum'
  },
  {
    id: 'node-scalp',
    title: '5min 剥头皮与 3k 回调执行法',
    category: '实盘执行层 // EXECUTION DISCIPLINE',
    badge: 'ACTIONABLE_SETUP',
    x: 40,
    y: 440,
    width: 310,
    height: 250,
    color: 'emerald',
    summary: '精准到单根 5 分钟 K 线的狙击入场模型，严格遵循 3 根 K 线回调停顿的客观过滤律。',
    bullets: [
      '3K 回调律: 破位后不追高，耐心等待 3 根以内低动量 K 线缩量回踩测试支撑阻力',
      '入场触发器: 订单流出现主动买卖失衡信号 + 5m 收出 Pinbar/吞没收敛烛',
      '硬性风控: 止损设在扫荡点（Swing High/Low）外 1-2 个 Tick，绝不抗单'
    ],
    metrics: [
      { label: '单笔胜率', value: '71.2%' },
      { label: '最大回撤', value: '< 2.8%' }
    ],
    diagramType: 'scalp',
    articleSectionId: 'sec-scalp'
  }
];

const EDGES: CanvasEdge[] = [
  { from: 'node-vacuum', to: 'node-po3', label: '定义空间区间' },
  { from: 'node-po3', to: 'node-smt', label: '猎杀流动性确认' },
  { from: 'node-smt', to: 'node-orderflow', label: '跨品种衰竭共振' },
  { from: 'node-orderflow', to: 'node-cvd', label: '微观主动意图' },
  { from: 'node-vacuum', to: 'node-scalp', label: '回踩关键真空位' },
  { from: 'node-cvd', to: 'node-scalp', label: '背离触发执行' },
  { from: 'node-po3', to: 'node-orderflow', label: 'AMD 派发拐点' }
];

export const TradingCanvasViewer: React.FC<{
  onJumpToSection?: (sectionId: string) => void;
}> = ({ onJumpToSection }) => {
  const { lang, t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Pan and Zoom State
  const [scale, setScale] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 30, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-orderflow');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'canvas' | 'legend'>('canvas');

  const selectedNode = useMemo(
    () => NODES.find((n) => n.id === selectedNodeId) || NODES[0],
    [selectedNodeId]
  );

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag when clicking background or canvas element, not inside inputs or buttons
    if ((e.target as HTMLElement).closest('button, a, input, .no-canvas-drag')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = 1.08;
    const delta = e.deltaY < 0 ? zoomFactor : 1 / zoomFactor;
    setScale((prev) => Math.min(1.8, Math.max(0.45, prev * delta)));
  };

  const resetView = () => {
    setScale(0.85);
    setPan({ x: 30, y: 30 });
  };

  const focusNode = (node: CanvasNode) => {
    setSelectedNodeId(node.id);
    // Center the viewport on this node
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    const targetX = clientWidth / 2 - (node.x + node.width / 2) * scale;
    const targetY = clientHeight / 2 - (node.y + node.height / 2) * scale;
    setPan({ x: targetX, y: targetY });
  };

  const getColorClasses = (color: CanvasNode['color'], isSelected: boolean) => {
    switch (color) {
      case 'emerald':
        return {
          border: isSelected ? 'border-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.35)]' : 'border-emerald-500/30 hover:border-emerald-400/60',
          badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          line: '#10b981',
          glow: 'bg-emerald-500/5'
        };
      case 'cyan':
        return {
          border: isSelected ? 'border-cyan-400 shadow-[0_0_24px_rgba(34,211,238,0.35)]' : 'border-cyan-500/30 hover:border-cyan-400/60',
          badge: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
          line: '#06b6d4',
          glow: 'bg-cyan-500/5'
        };
      case 'purple':
        return {
          border: isSelected ? 'border-purple-400 shadow-[0_0_24px_rgba(192,132,252,0.35)]' : 'border-purple-500/30 hover:border-purple-400/60',
          badge: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
          line: '#a855f7',
          glow: 'bg-purple-500/5'
        };
      case 'amber':
        return {
          border: isSelected ? 'border-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.35)]' : 'border-amber-500/30 hover:border-amber-400/60',
          badge: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          line: '#f59e0b',
          glow: 'bg-amber-500/5'
        };
      case 'rose':
        return {
          border: isSelected ? 'border-rose-400 shadow-[0_0_24px_rgba(251,113,133,0.35)]' : 'border-rose-500/30 hover:border-rose-400/60',
          badge: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          line: '#f43f5e',
          glow: 'bg-rose-500/5'
        };
    }
  };

  return (
    <div 
      className={`relative w-full rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none border-none h-screen' : 'h-[620px] sm:h-[700px]'
      }`}
    >
      {/* Top Obsidian Window Bar */}
      <div className="h-11 bg-zinc-900/90 border-b border-zinc-800/80 px-4 flex items-center justify-between text-xs font-mono z-30 select-none backdrop-blur-md">
        {/* Left: Tab Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-950/80 border border-zinc-700/80 rounded-lg text-cyan-300 font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>trading / 韩师兄订单流.canvas</span>
          </div>
          <span className="text-zinc-500 text-[11px] hidden sm:inline">
            OBSIDIAN INFINITE CANVAS ENGINE · INTERACTIVE
          </span>
        </div>

        {/* Right: Zoom & Control Toolbar */}
        <div className="flex items-center gap-2">
          {/* Quick Nodes Selector */}
          <div className="hidden lg:flex items-center gap-1 mr-2">
            {NODES.slice(0, 4).map((node) => (
              <button
                key={node.id}
                onClick={() => focusNode(node)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                  selectedNodeId === node.id 
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                {node.title.split(' ')[0]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-zinc-950/70 border border-zinc-800 px-2 py-1 rounded-lg">
            <button
              onClick={() => setScale((s) => Math.max(0.45, s - 0.15))}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="缩小 (Zoom Out)"
            >
              <ZoomOut size={13} />
            </button>
            <span className="w-12 text-center text-[11px] text-zinc-300 font-mono">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(1.8, s + 0.15))}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="放大 (Zoom In)"
            >
              <ZoomIn size={13} />
            </button>
          </div>

          <button
            onClick={resetView}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer"
            title="重置视角 (Reset View)"
          >
            <RotateCcw size={13} />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-zinc-400 hover:text-cyan-300 hover:bg-zinc-800/80 rounded-lg transition-colors cursor-pointer"
            title={isFullscreen ? '退出全屏' : '全屏体验白板'}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Main Canvas Drag Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        className={`relative w-full h-[calc(100%-44px)] overflow-hidden cursor-grab active:cursor-grabbing select-none ${
          isDragging ? 'cursor-grabbing' : ''
        }`}
        style={{
          // Obsidian dot-grid background
          backgroundColor: '#07090e',
          backgroundImage: 'radial-gradient(circle, #27272a 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      >
        {/* World Transformed Layer */}
        <div
          className="absolute origin-top-left will-change-transform"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            width: '1200px',
            height: '800px'
          }}
        >
          {/* SVG Animated Edges Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <defs>
              <linearGradient id="edge-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="edge-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill="#06b6d4" opacity="0.8" />
              </marker>
            </defs>

            {EDGES.map((edge, idx) => {
              const fromNode = NODES.find((n) => n.id === edge.from);
              const toNode = NODES.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted =
                selectedNodeId === edge.from || selectedNodeId === edge.to;

              // Calculate center points
              const x1 = fromNode.x + fromNode.width / 2;
              const y1 = fromNode.y + fromNode.height / 2;
              const x2 = toNode.x + toNode.width / 2;
              const y2 = toNode.y + toNode.height / 2;

              // Control points for organic cubic bezier
              const dx = x2 - x1;
              const dy = y2 - y1;
              const cx1 = x1 + dx * 0.45;
              const cy1 = y1;
              const cx2 = x1 + dx * 0.55;
              const cy2 = y2;
              const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

              return (
                <g key={idx} className="transition-opacity duration-300">
                  <path
                    d={pathData}
                    fill="none"
                    stroke={isHighlighted ? '#22d3ee' : '#3f3f46'}
                    strokeWidth={isHighlighted ? 2.5 : 1.2}
                    strokeDasharray={isHighlighted ? '6 4' : '4 4'}
                    strokeOpacity={isHighlighted ? 0.9 : 0.4}
                    className={isHighlighted ? 'animate-[dash_15s_linear_infinite]' : ''}
                    markerEnd="url(#arrowhead)"
                  />
                  {edge.label && (
                    <text
                      x={(x1 + x2) / 2}
                      y={(y1 + y2) / 2 - 8}
                      fill={isHighlighted ? '#67e8f9' : '#71717a'}
                      fontSize="9"
                      fontFamily="monospace"
                      textAnchor="middle"
                      className="bg-black/80 px-1 py-0.5"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Nodes Layer */}
          {NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const styleColors = getColorClasses(node.color, isSelected);

            return (
              <motion.div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`absolute rounded-xl bg-zinc-950/95 backdrop-blur-md border p-4 shadow-xl cursor-pointer transition-all duration-300 z-20 group ${styleColors.border} ${styleColors.glow}`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${node.width}px`,
                  minHeight: `${node.height}px`
                }}
                whileHover={{ scale: 1.02 }}
                layout
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider ${styleColors.badge}`}
                  >
                    {node.badge}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 truncate">
                    {node.category}
                  </span>
                </div>

                {/* Node Title */}
                <h4 className="text-sm sm:text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>{node.title}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  )}
                </h4>

                {/* Mini K-Line / Vector Diagram Simulation */}
                <div className="w-full h-14 rounded-lg bg-zinc-900/80 border border-zinc-800/80 p-1.5 mb-2.5 flex items-center justify-center overflow-hidden">
                  <MiniDiagram type={node.diagramType} color={node.color} />
                </div>

                {/* Summary */}
                <p className="text-zinc-400 text-xs leading-relaxed font-light mb-3 line-clamp-2">
                  {node.summary}
                </p>

                {/* Metrics Badges */}
                {node.metrics && (
                  <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-zinc-800/70 text-[10px] font-mono">
                    {node.metrics.map((m, i) => (
                      <div key={i} className="flex items-center justify-between bg-zinc-900/50 px-2 py-1 rounded">
                        <span className="text-zinc-500">{m.label}</span>
                        <span className="text-cyan-300 font-bold">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Selected Node Inspector Drawer (Bottom Left Floating HUD) */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[420px] bg-zinc-950/95 border border-zinc-700/90 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl z-30 no-canvas-drag"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
                      NODE_INSPECTOR // {selectedNode.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {selectedNode.title}
                  </h3>
                </div>
                {onJumpToSection && selectedNode.articleSectionId && (
                  <button
                    onClick={() => onJumpToSection(selectedNode.articleSectionId!)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 text-xs font-mono transition-all cursor-pointer shrink-0"
                    title="跳转到下方文章详述"
                  >
                    <span>跳转详述</span>
                    <ChevronRight size={12} />
                  </button>
                )}
              </div>

              <p className="text-zinc-300 text-xs font-light leading-relaxed mb-3">
                {selectedNode.summary}
              </p>

              {/* Actionable Rules / Key Insights */}
              <div className="space-y-1.5 mb-3 bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  核心实盘检查规则 (Execution Checklist):
                </div>
                {selectedNode.bullets.map((b, i) => (
                  <div key={i} className="flex items-start gap-2 text-[11px] text-zinc-300 leading-snug">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-500">
                <span>坐标: ({selectedNode.x}, {selectedNode.y})</span>
                <span className="text-cyan-400">已对焦核心逻辑</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Right Minimap (小地图) */}
        <div className="hidden sm:block absolute bottom-4 right-4 w-40 h-28 bg-zinc-950/90 border border-zinc-800 rounded-xl overflow-hidden shadow-xl pointer-events-none z-30 backdrop-blur-md">
          <div className="px-2 py-1 bg-zinc-900/80 border-b border-zinc-800 text-[9px] font-mono text-zinc-500 flex items-center justify-between">
            <span>MINIMAP</span>
            <Layers size={10} className="text-cyan-400" />
          </div>
          <div className="relative w-full h-[calc(100%-20px)] p-1">
            {/* Miniature Nodes */}
            {NODES.map((n) => (
              <div
                key={n.id}
                className={`absolute rounded-[2px] transition-colors ${
                  selectedNodeId === n.id ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-zinc-700/80'
                }`}
                style={{
                  left: `${(n.x / 1200) * 100}%`,
                  top: `${(n.y / 800) * 100}%`,
                  width: `${(n.width / 1200) * 100}%`,
                  height: `${(n.height / 800) * 100}%`
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mini Vector Diagrams Rendered Inside Cards
function MiniDiagram({ type, color }: { type: CanvasNode['diagramType']; color: string }) {
  switch (type) {
    case 'po3':
      return (
        <svg viewBox="0 0 200 45" className="w-full h-full">
          {/* Accumulation Box */}
          <rect x="10" y="15" width="45" height="20" fill="none" stroke="#52525b" strokeDasharray="2 2" />
          <text x="32" y="28" fill="#a1a1aa" fontSize="8" fontFamily="monospace" textAnchor="middle">Asia</text>
          
          {/* Manipulation Drop (Judas Swing) */}
          <path d="M 55 25 L 75 25 L 85 40 L 95 10" fill="none" stroke="#f43f5e" strokeWidth="1.8" />
          <text x="85" y="44" fill="#f43f5e" fontSize="7" fontFamily="monospace" textAnchor="middle">Fake Drop</text>
          
          {/* Distribution Markup */}
          <path d="M 95 10 L 130 5 L 180 2" fill="none" stroke="#10b981" strokeWidth="2.2" />
          <text x="150" y="18" fill="#10b981" fontSize="8" fontFamily="monospace">NY Expansion →</text>
        </svg>
      );

    case 'orderflow':
      return (
        <div className="flex items-center justify-around w-full h-full font-mono text-[9px]">
          <div className="flex flex-col items-center">
            <span className="text-zinc-500">Ask Imb</span>
            <span className="text-emerald-400 font-bold">+418%</span>
          </div>
          <div className="w-[1px] h-8 bg-zinc-800" />
          <div className="flex flex-col items-center">
            <span className="text-zinc-500">Absorption</span>
            <span className="text-cyan-400 font-bold">1,820 L</span>
          </div>
          <div className="w-[1px] h-8 bg-zinc-800" />
          <div className="flex flex-col items-center">
            <span className="text-zinc-500">Delta</span>
            <span className="text-rose-400 font-bold">-62</span>
          </div>
        </div>
      );

    case 'cvd':
      return (
        <svg viewBox="0 0 200 45" className="w-full h-full">
          {/* Price Line (making higher high) */}
          <path d="M 10 30 L 70 20 L 110 25 L 180 10" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
          <circle cx="180" cy="10" r="2.5" fill="#38bdf8" />
          
          {/* CVD Line (making lower high - Divergence) */}
          <path d="M 10 38 L 70 28 L 110 32 L 180 40" fill="none" stroke="#c084fc" strokeWidth="1.8" strokeDasharray="3 2" />
          <circle cx="180" cy="40" r="2.5" fill="#c084fc" />
          
          <text x="140" y="24" fill="#c084fc" fontSize="8" fontFamily="monospace">CVD Divergence!</text>
        </svg>
      );

    case 'smt':
      return (
        <div className="flex items-center justify-between w-full h-full px-2 text-[9px] font-mono">
          <div className="text-left">
            <div className="text-zinc-400">BTC/USDT:</div>
            <div className="text-emerald-400 font-bold">↑ Higher High (破位)</div>
          </div>
          <span className="text-amber-400 text-base font-bold">≠</span>
          <div className="text-right">
            <div className="text-zinc-400">ETH/USDT:</div>
            <div className="text-rose-400 font-bold">↓ Lower High (衰竭)</div>
          </div>
        </div>
      );

    case 'vacuum':
      return (
        <div className="flex items-center gap-2 w-full h-full px-2">
          {/* Volume Profile Bars */}
          <div className="flex flex-col gap-1 w-1/3">
            <div className="w-full h-1.5 bg-cyan-500/70 rounded" />
            <div className="w-3/4 h-1.5 bg-cyan-500/50 rounded" />
            <div className="w-1/4 h-1 bg-zinc-700 rounded" title="LVN (真空)" />
            <div className="w-4/5 h-1.5 bg-cyan-500/60 rounded" />
          </div>
          <div className="flex-1 text-[9px] font-mono text-zinc-400 leading-tight">
            <div>HVN 密集吸附</div>
            <div className="text-rose-400 font-bold">LVN 真空光速穿透 →</div>
          </div>
        </div>
      );

    case 'scalp':
      return (
        <div className="flex items-center justify-around w-full h-full font-mono text-[9px]">
          <div className="text-center">
            <div className="text-zinc-500">1K 冲量</div>
            <div className="text-emerald-400">Expansion</div>
          </div>
          <span className="text-zinc-600">→</span>
          <div className="text-center">
            <div className="text-zinc-500">3K 缩量回踩</div>
            <div className="text-cyan-400">Pullback</div>
          </div>
          <span className="text-zinc-600">→</span>
          <div className="text-center">
            <div className="text-zinc-500">入场确认</div>
            <div className="text-emerald-400 font-bold">Entry</div>
          </div>
        </div>
      );

    default:
      return null;
  }
}
