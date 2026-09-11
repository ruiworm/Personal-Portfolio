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
  CheckCircle2
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

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-5xl mx-auto relative z-10 selection:bg-cyan-500/30">
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
        className="flex items-center justify-between mb-12"
      >
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform duration-300" />
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

      {/* Cinematic HUD Panoramic Viewport (Full page width, non-box) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-zinc-950 border border-zinc-800/90 rounded-2xl overflow-hidden shadow-2xl mb-14 group"
      >
        {/* Corners Bracket Accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-cyan-400/90 z-20" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-cyan-400/90 z-20" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-cyan-400/90 z-20" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-cyan-400/90 z-20" />

        {/* Faint HUD crosshair overlays */}
        <div className="absolute top-1/2 left-6 right-6 h-[1px] bg-cyan-500/15 pointer-events-none z-10" />
        <div className="absolute left-1/2 top-6 bottom-6 w-[1px] bg-cyan-500/15 pointer-events-none z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-cyan-500/20 rounded-full pointer-events-none z-10" />

        {/* Scanning laser line */}
        <motion.div
          initial={{ y: "-10%" }}
          animate={{ y: "110%" }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] z-20 pointer-events-none"
        />

        {/* Background Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Grid and Gradient Masks */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_95%,rgba(0,0,0,0.2)_95%)] bg-[size:100%_4px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent pointer-events-none" />

        {/* Top HUD Telemetry Bar */}
        <div className="absolute top-4 left-6 right-6 flex justify-between items-center text-[10px] font-mono text-cyan-400/80 z-20 tracking-widest uppercase">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            SYS.NODE_{project.id.toUpperCase()}
          </span>
          <span>DIAG.COORD_0XBB79</span>
        </div>

        {/* Bottom Status Tags */}
        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center text-[10px] font-mono text-zinc-400 z-20">
          <div className="px-2.5 py-1 bg-black/80 border border-zinc-800 text-cyan-400 tracking-wider">
            REC: ACTIVE // {project.category || 'SYSTEM'}
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-black/80 px-2.5 py-1 border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% ONLINE
          </div>
        </div>
      </motion.div>

      {/* Main Project Dossier (Flowing fluid layout, non-box) */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-14"
      >
        {/* Title & Tags Header */}
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.category && (
              <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 font-semibold tracking-wider uppercase">
                {project.category}
              </span>
            )}
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 border border-zinc-800 bg-zinc-900/60 text-xs font-mono text-zinc-400 tracking-wider uppercase rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-white mb-6 leading-tight">
            {project.title}
          </h1>

          <div className="w-20 h-[2px] bg-gradient-to-r from-cyan-400 to-emerald-400" />
        </div>

        {/* Section 01: Overview */}
        <section className="space-y-4">
          <h3 className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // PROJECT OVERVIEW</span>
          </h3>
          <p className="text-zinc-200 font-light text-lg sm:text-xl leading-relaxed">
            {project.details || project.description}
          </p>
        </section>

        {/* Section 02: Performance Specs Readout */}
        {project.specs && project.specs.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>02 // BENCHMARK & SPECS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-zinc-900">
              {project.specs.map((spec) => (
                <div key={spec.label} className="flex flex-col gap-1.5">
                  <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase">
                    {spec.label}
                  </span>
                  <span className="text-2xl sm:text-3xl font-bold font-mono text-cyan-300 tracking-tight">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 03: Architecture Pipeline */}
        {project.architecture && project.architecture.length > 0 && (
          <section className="space-y-6">
            <h3 className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>03 // ARCHITECTURE PIPELINE</span>
            </h3>

            <div className="flex flex-wrap gap-3 font-mono text-xs sm:text-sm">
              {project.architecture.map((node, i) => (
                <div
                  key={node}
                  className="flex items-center gap-3 bg-zinc-950/80 px-4 py-2.5 border border-zinc-800/80 rounded-xl text-zinc-300 shadow-lg"
                >
                  {i > 0 && <span className="text-cyan-400 font-bold">→</span>}
                  <span>{node}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Key Capabilities & Functional Modules */}
        {project.features && project.features.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>04 // KEY CAPABILITIES & FEATURES</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {project.features.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-xl bg-zinc-950/60 border border-zinc-900/90 text-zinc-300 text-sm leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 05: Core Challenges */}
        {project.challenges && (
          <section className="space-y-4">
            <h3 className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              <span>05 // CORE CHALLENGES OVERCOME</span>
            </h3>
            <p className="text-zinc-300 font-light text-base sm:text-lg leading-relaxed bg-zinc-950/40 p-6 rounded-2xl border border-zinc-900">
              {project.challenges}
            </p>
          </section>
        )}

        {/* Deployment & Repository Access Links */}
        <div className="pt-8 flex flex-wrap items-center gap-4">
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-500/15 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/25 hover:border-emerald-400 font-mono text-xs tracking-wider transition-all shadow-[0_0_20px_rgba(16,185,129,0.15)] group/btn"
            >
              <span className="font-bold">体验在线演示 (LIVE DEMO)</span>
              <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-600 font-mono text-xs tracking-wider transition-all group/btn"
            >
              <Github className="w-4 h-4" />
              <span className="font-bold">开源代码仓库 (GITHUB REPO)</span>
            </a>
          )}
        </div>
      </motion.article>

      {/* Prev / Next Project Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-20 pt-10 border-t border-zinc-900">
        {prevProject ? (
          <button
            onClick={() => onSelectProject(prevProject.id)}
            className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:border-cyan-500/40 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-2">
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS PROJECT</span>
            </div>
            <div className="text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
              {prevProject.title}
            </div>
          </button>
        ) : <div />}

        {nextProject && (
          <button
            onClick={() => onSelectProject(nextProject.id)}
            className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:border-cyan-500/40 transition-all text-right group cursor-pointer"
          >
            <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-zinc-500 mb-2">
              <span>NEXT PROJECT</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
              {nextProject.title}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
