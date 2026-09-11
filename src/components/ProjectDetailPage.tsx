import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Share2, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Activity, 
  ExternalLink, 
  Layers, 
  Terminal, 
  Cpu, 
  Github, 
  CheckCircle2,
  Globe,
  Sparkles
} from 'lucide-react';
import { projects, Project } from '../data/projects';

interface ProjectDetailPageProps {
  projectId: string;
  onBack: () => void;
  onSelectProject: (id: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  projectId,
  onBack,
  onSelectProject,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const projectIndex = projects.findIndex(
    (p) => p.id === projectId || (projectId === 'skin-analysis' && p.id === 'dermascan-ai') || p.title === projectId
  );
  const project = projects[projectIndex] || projects[0];

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  // Track scroll progress for the top laser progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isDermaScan = project.id === 'dermascan-ai' || project.id === 'skin-analysis';

  return (
    <div className="min-h-screen pt-20 pb-20 px-5 sm:px-6 max-w-4xl mx-auto relative z-10 selection:bg-cyan-500/30">
      {/* Top Laser Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-900 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Controls: Back & Share */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span>BACK TO PROJECTS</span>
        </button>

        <button
          onClick={handleShareLink}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-pointer"
          title="复制页面链接"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">COPIED</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>SHARE</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Hero Header: Title, Tags & Direct Actions First */}
      <motion.header
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.category && (
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 font-semibold tracking-wider uppercase">
              {project.category}
            </span>
          )}
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 border border-zinc-800/80 bg-zinc-900/40 text-[11px] font-mono text-zinc-400 tracking-wider uppercase rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3 leading-snug">
          {project.title}
        </h1>

        <p className="text-zinc-300 font-light text-sm sm:text-base leading-relaxed mb-5 max-w-3xl">
          {project.description}
        </p>

        {/* Prominent Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-zinc-900/80">
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 font-mono text-xs tracking-wider transition-all shadow-[0_0_16px_rgba(16,185,129,0.15)] active:scale-98 group/btn"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-bold">体验在线演示 (LIVE DEMO)</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 font-mono text-xs tracking-wider transition-all active:scale-98 group/btn"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="font-medium">查看开源代码 (GITHUB)</span>
            </a>
          )}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400/90 bg-emerald-950/30 border border-emerald-800/40 px-3 py-2 rounded-xl ml-auto">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% ONLINE · VERCEL GLOBAL CDN</span>
          </div>
        </div>
      </motion.header>

      {/* Compact Interactive HUD Station Card (Replaces giant unrelated stock photo) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative bg-zinc-950/80 border border-zinc-800/90 rounded-2xl overflow-hidden shadow-xl mb-10 group"
      >
        {/* Corner Accents */}
        <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-cyan-400/80 z-20" />
        <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-cyan-400/80 z-20" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-cyan-400/80 z-20" />
        <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-cyan-400/80 z-20" />

        {/* Top Mini Telemetry Header */}
        <div className="px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-cyan-400/90 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-zinc-200">
              {isDermaScan ? 'DERMASCAN_AI.NODE // 智能病损初筛工作站' : `SYS.NODE_${project.id.toUpperCase()}`}
            </span>
          </div>
          <span className="text-zinc-500 hidden sm:inline">TARGET: {project.link.replace(/^https?:\/\//, '')}</span>
        </div>

        {/* Content Body: Compact Split Layout */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5">
          {/* Left: Compact Clinical Scan Viewport */}
          <div className="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 flex-shrink-0 group/img">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale-[0.3] group-hover/img:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Target Reticle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-10 h-10 border border-cyan-400/50 rounded-full" />
              <div className="absolute w-14 h-[1px] bg-cyan-400/30" />
              <div className="absolute h-14 w-[1px] bg-cyan-400/30" />
            </div>
            <div className="absolute bottom-1.5 left-2 text-[9px] font-mono text-cyan-300 font-bold tracking-wider">
              {isDermaScan ? 'ROI: ABCDE_AUTO' : 'FEED: ACTIVE'}
            </div>
          </div>

          {/* Right: Live Telemetry & Metrics Highlight */}
          <div className="flex-1 min-w-0 space-y-2.5 w-full">
            {isDermaScan ? (
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-400">检测算法模型:</span>
                  <span className="font-mono font-bold text-cyan-300">ConvNeXt-CBAM + Grad-CAM</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-400">ABCDE 评估模式:</span>
                  <span className="font-mono font-bold text-emerald-400">5维形态学自动量化 (Asymmetry, Border...)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-400">系统预设内容:</span>
                  <span className="font-mono text-zinc-300">5 份真实随访病案 · 6 篇专科审校图文百科</span>
                </div>
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">部署状态: 全球加速 CDN</span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    <span>打开在线体验站</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-400">系统运行架构:</span>
                  <span className="font-mono font-bold text-cyan-300">{project.category || 'SYSTEMS'}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-zinc-400">性能基准指标:</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {project.specs[0]?.label}: {project.specs[0]?.value}
                  </span>
                </div>
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-zinc-500">项目可用状态: 正常运行</span>
                  {project.link && project.link !== '#' && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      <span>打开线上系统</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Project Dossier (Compact & Content-Rich) */}
      <motion.article
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-8"
      >
        {/* Section 01: Overview */}
        <section className="space-y-3">
          <h3 className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // PROJECT OVERVIEW</span>
          </h3>
          <p className="text-zinc-200 font-light text-base leading-relaxed bg-zinc-950/40 p-5 rounded-2xl border border-zinc-900/90">
            {project.details || project.description}
          </p>
        </section>

        {/* Section 02: Performance Specs Readout */}
        {project.specs && project.specs.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>02 // BENCHMARK & SPECS</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
              {project.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex flex-col gap-1 p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-900"
                >
                  <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase truncate">
                    {spec.label}
                  </span>
                  <span className="text-lg sm:text-xl font-bold font-mono text-cyan-300 tracking-tight">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 03: Key Capabilities & Functional Modules */}
        {project.features && project.features.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>03 // KEY CAPABILITIES & MODULES</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-900/80 text-zinc-300 text-xs sm:text-sm leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 04: Architecture Pipeline */}
        {project.architecture && project.architecture.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>04 // ARCHITECTURE PIPELINE</span>
            </h3>

            <div className="flex flex-wrap gap-2.5 font-mono text-xs">
              {project.architecture.map((node, i) => (
                <div
                  key={node}
                  className="flex items-center gap-2.5 bg-zinc-950/80 px-3.5 py-2 border border-zinc-800/80 rounded-lg text-zinc-300 shadow-sm"
                >
                  {i > 0 && <span className="text-cyan-400 font-bold">→</span>}
                  <span>{node}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 05: Core Challenges */}
        {project.challenges && (
          <section className="space-y-3">
            <h3 className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>05 // CORE CHALLENGES OVERCOME</span>
            </h3>
            <p className="text-zinc-300 font-light text-sm leading-relaxed bg-zinc-950/40 p-5 rounded-2xl border border-zinc-900">
              {project.challenges}
            </p>
          </section>
        )}

        {/* Bottom Dual Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-3 border-t border-zinc-900">
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 font-mono text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(16,185,129,0.15)] group/btn"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="font-bold">体验在线演示 (LIVE DEMO)</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 font-mono text-xs tracking-wider transition-all group/btn"
            >
              <Github className="w-3.5 h-3.5" />
              <span className="font-medium">开源代码仓库 (GITHUB)</span>
            </a>
          )}
        </div>
      </motion.article>

      {/* Prev / Next Project Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-12 pt-8 border-t border-zinc-900">
        {prevProject ? (
          <button
            onClick={() => onSelectProject(prevProject.id)}
            className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:border-cyan-500/40 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 mb-1">
              <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS PROJECT</span>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
              {prevProject.title}
            </div>
          </button>
        ) : <div />}

        {nextProject && (
          <button
            onClick={() => onSelectProject(nextProject.id)}
            className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:border-cyan-500/40 transition-all text-right group cursor-pointer"
          >
            <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-zinc-500 mb-1">
              <span>NEXT PROJECT</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
              {nextProject.title}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
