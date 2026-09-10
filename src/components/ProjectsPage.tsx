import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Layers, ArrowUpRight, Cpu, Activity } from 'lucide-react';
import { projects, Project } from '../data/projects';

interface ProjectsPageProps {
  onSelectProject: (id: string) => void;
}

const CATEGORIES = [
  'ALL',
  'AI / ML',
  'SYSTEMS & CLOUD',
  'GRAPHICS & WEBGL',
  'FULLSTACK & APP'
] as const;

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'ALL' || project.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-28 px-6 max-w-7xl mx-auto relative z-10 selection:bg-cyan-500/30">
      {/* Background Ambience Glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="flex items-center gap-2 px-3.5 py-1 bg-zinc-900/70 border border-zinc-800 rounded-full text-[10px] font-mono tracking-widest text-cyan-400 mb-6">
          <Layers className="w-3 h-3" />
          <span>PORTFOLIO // FULL_ARCHIVE</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600">
          ALL PROJECTS
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
          全景工程项目库。集中呈现我们在人工智能、底层高并发系统、Web3 与 WebGL 前沿交互中的实践成果。
        </p>
      </motion.div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-12"
      >
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 text-xs font-mono tracking-wider rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                  isActive
                    ? 'text-cyan-300 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-category-pill"
                    className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/40 rounded-full -z-10 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Field */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="检索项目名、技术栈..."
            className="w-full pl-10 pr-9 py-2 bg-zinc-950/80 border border-zinc-800 text-xs font-mono text-zinc-200 placeholder-zinc-500 rounded-full focus:outline-none focus:border-cyan-500/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Projects Grid: Show all projects on one page */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                onClick={() => onSelectProject(project.id)}
                className="group relative flex flex-col justify-between rounded-2xl bg-zinc-950/60 border border-zinc-900/90 hover:border-cyan-500/40 p-5 sm:p-6 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
              >
                {/* Hover Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Top Corner HUD accent */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 right-0 w-[1px] h-4 bg-cyan-400/0 group-hover:bg-cyan-400 transition-colors duration-500" />
                  <div className="absolute top-0 right-0 w-4 h-[1px] bg-cyan-400/0 group-hover:bg-cyan-400 transition-colors duration-500" />
                </div>

                <div>
                  {/* Fluid Image Viewport */}
                  <div className="relative w-full h-44 mb-6 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 group-hover:border-zinc-700 transition-colors">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />

                    {/* Category Overlay Tag */}
                    {project.category && (
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 border border-zinc-800 font-mono text-[9px] text-cyan-400 tracking-wider">
                        {project.category}
                      </div>
                    )}
                  </div>

                  {/* Project Title */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed line-clamp-3 mb-6">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Specs Mini HUD Preview */}
                  {project.specs && project.specs.length > 0 && (
                    <div className="flex items-center gap-3 py-2.5 px-3 bg-zinc-900/40 border border-zinc-900 rounded-lg mb-4 text-[10px] font-mono">
                      <Activity className="w-3 h-3 text-cyan-400/80 shrink-0" />
                      <span className="text-zinc-500 truncate">{project.specs[0].label}:</span>
                      <span className="text-cyan-400 font-bold ml-auto">{project.specs[0].value}</span>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-zinc-900/60">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-zinc-900/80 text-zinc-500 text-[10px] font-mono group-hover:text-zinc-400 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-24 text-center border border-dashed border-zinc-900 rounded-2xl bg-zinc-950/20"
            >
              <p className="font-mono text-sm text-zinc-500 mb-4">没有匹配到相关项目</p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-1.5 text-xs font-mono text-cyan-400 border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 transition-colors cursor-pointer"
              >
                RESET FILTERS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Stats Counter Footer */}
      <div className="mt-16 text-center text-[10px] font-mono tracking-[0.3em] text-zinc-600">
        SYS.ACTIVE_NODES: {filteredProjects.length} / {projects.length} PROJECTS ONLINE
      </div>
    </div>
  );
};
