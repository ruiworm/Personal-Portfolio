import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { Github, Twitter, Mail, ArrowRight, ExternalLink, Sparkles, ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { BlogListPage } from './components/BlogListPage';
import { BlogDetailPage } from './components/BlogDetailPage';
import { ProjectsPage } from './components/ProjectsPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { projects, Project, getProjectLocalized } from './data/projects';
import { useLanguage } from './context/LanguageContext';

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WeChatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.5,3C4.36,3,1,5.82,1,9.3c0,1.96,1.06,3.71,2.71,4.86l-0.72,2.22l2.58-1.3c0.94,0.28,1.94,0.43,2.98,0.43c0.23,0,0.45-0.01,0.68-0.03C8.84,14.56,8.5,13.56,8.5,12.5c0-3.59,3.58-6.5,8-6.5c0.66,0,1.3,0.07,1.92,0.19C17.34,4.28,13.31,3,8.5,3z M16.5,7C12.91,7,10,9.46,10,12.5c0,3.04,2.91,5.5,6.5,5.5c0.85,0,1.66-0.12,2.41-0.34l2.09,1.05l-0.58-1.8c1.34-0.93,2.18-2.38,2.18-3.91C22.6,9.46,19.69,7,16.5,7z M6.5,7C6.22,7,6,7.22,6,7.5S6.22,8,6.5,8S7,7.78,7,7.5S6.78,7,6.5,7z M10.5,7C10.22,7,10,7.22,10,7.5S10.22,8,10.5,8S11,7.78,11,7.5S10.78,7,10.5,7z M14.5,10c-0.28,0-0.5,0.22-0.5,0.5s0.22,0.5,0.5,0.5s0.5-0.22,0.5-0.5S14.78,10,14.5,10z M18.5,10c-0.28,0-0.5,0.22-0.5,0.5s0.22,0.5,0.5,0.5s0.5-0.22,0.5-0.5S18.78,10,18.5,10z"/>
  </svg>
);


const ProjectCard = ({ 
  project, 
  index, 
  onExplore 
}: { 
  project: Project; 
  index: number; 
  onExplore: (id: string) => void; 
}) => {
  const { lang, t } = useLanguage();
  const loc = getProjectLocalized(project, lang);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8 }}
      className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 sm:gap-10 md:gap-14 group`}
    >
      {/* Fluid Image Container */}
      <div className="relative w-full md:w-5/12 h-48 sm:h-56 md:h-60 flex items-center justify-center">
        {/* Background Glow */}
        <motion.div
          className="absolute inset-0 bg-cyan-500/10 mix-blend-screen blur-2xl -z-10 rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4 + index, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Image with fluid border radius */}
        <motion.div
          className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-56 md:h-56 overflow-hidden"
          style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "40% 60% 70% 30% / 40% 50% 60% 50%"
            ]
          }}
          transition={{ duration: 8 + index * 2, repeat: Infinity, ease: "linear" }}
        >
          <img 
            src={project.image} 
            alt={loc.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent pointer-events-none" />
        </motion.div>
      </div>
      
      {/* Text Content - Floating */}
      <div className={`relative w-full md:w-7/12 flex flex-col ${index % 2 === 0 ? 'items-start text-left' : 'items-end text-right'} z-10`}>
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter mb-2 md:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
          {loc.title}
        </h3>
        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed mb-3 md:mb-4 max-w-lg line-clamp-2">
          {loc.description}
        </p>
        <div className={`flex flex-wrap gap-2.5 text-xs font-mono text-cyan-400/80 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
          {project.tags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-1.5">
              {i > 0 && <span className="w-1 h-1 rounded-full bg-emerald-500/50" />}
              {tag}
            </span>
          ))}
        </div>
        
        {/* Abstract Link (Button acting as link) */}
        <motion.button 
          onClick={() => onExplore(project.id)}
          className="mt-4 md:mt-5 flex items-center gap-3 text-white group/link cursor-pointer focus:outline-none"
          whileHover={{ x: index % 2 === 0 ? 8 : -8 }}
        >
          {index % 2 !== 0 && (
            <div className="w-6 h-[1px] bg-white/30 group-hover/link:w-12 group-hover/link:bg-white transition-all duration-500 relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
          )}
          <span className="font-bold tracking-widest uppercase text-xs">{t('home.explore')}</span>
          {index % 2 === 0 && (
            <div className="w-6 h-[1px] bg-white/30 group-hover/link:w-12 group-hover/link:bg-white transition-all duration-500 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            </div>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

function HeroSection() {
  const { t } = useLanguage();
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // 高刚度、低阻尼，营造机械感与干脆的物理反馈
  const springConfig = { damping: 15, stiffness: 400, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    // 鼠标移出时，将光晕移出视野
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  // 使用 clip-path 实现锐利的遮罩边缘，而非渐变的柔和光晕
  const clipPath = useMotionTemplate`circle(250px at ${cursorX}px ${cursorY}px)`;

  return (
    <section 
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black cursor-crosshair border-b border-zinc-900 px-4"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 底层：极简、深邃的未探测区域 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-zinc-800"
        >
          Hi, I'm vere
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-2xl text-zinc-700 tracking-widest max-w-2xl"
        >
          {t('hero.tagline')}
        </motion.p>
      </div>

      {/* 顶层：高反差遮罩层（透视光晕内的区域） */}
      <motion.div 
        className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-cyan-400 pointer-events-none px-4 text-center"
        style={{ clipPath }}
      >
        {/* 顶层背景：高对比度几何网格 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-black">
          Hi, I'm vere
        </h1>
        <p className="text-lg md:text-2xl text-zinc-900 font-bold tracking-widest max-w-2xl">
          {t('hero.tagline')}
        </p>

        {/* 顶层硬核意象元素 */}
        <span className="absolute top-1/4 left-1/4 text-black font-mono text-xs opacity-50 tracking-[0.3em]">SYS.INIT.01</span>
        <span className="absolute bottom-1/4 right-1/4 text-black font-mono text-xs opacity-50 tracking-[0.3em]">COORD_SYNC</span>
        <span className="absolute top-1/2 left-8 -translate-y-1/2 -rotate-90 text-black font-mono text-xs opacity-50 tracking-widest">OVERRIDE //</span>
      </motion.div>

      {/* 交互按钮 - 无框、定位到底部 */}
      <motion.a 
        href="#projects"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-12 md:bottom-20 z-20 flex flex-col items-center gap-4 group cursor-pointer"
      >
        <span className="text-xs font-mono tracking-[0.5em] text-zinc-600 group-hover:text-cyan-400 transition-colors duration-500 uppercase">
          {t('hero.start')}
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-800 to-transparent group-hover:from-cyan-400 transition-colors duration-500" />
      </motion.a>
    </section>
  );
}

export default function App() {
  const { lang, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(0);

  // Hash router state
  const [currentRoute, setCurrentRoute] = useState<{ path: string; slug?: string; id?: string }>(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash || '#/' : '#/';
    if (hash.startsWith('#/projects/')) {
      return { path: '/projects/:id', id: hash.replace('#/projects/', '') };
    }
    if (hash.startsWith('#/projects')) {
      return { path: '/projects' };
    }
    if (hash.startsWith('#/blog/')) {
      return { path: '/blog/:slug', slug: hash.replace('#/blog/', '') };
    }
    if (hash.startsWith('#/blog')) {
      return { path: '/blog' };
    }
    return { path: '/' };
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#/';
      if (hash.startsWith('#/projects/')) {
        setCurrentRoute({ path: '/projects/:id', id: hash.replace('#/projects/', '') });
      } else if (hash.startsWith('#/projects')) {
        setCurrentRoute({ path: '/projects' });
      } else if (hash.startsWith('#/blog/')) {
        setCurrentRoute({ path: '/blog/:slug', slug: hash.replace('#/blog/', '') });
      } else if (hash.startsWith('#/blog')) {
        setCurrentRoute({ path: '/blog' });
      } else {
        setCurrentRoute({ path: '/' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (newHash: string) => {
    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const itemsPerPage = 2;
  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const currentProjects = projects.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 via-zinc-950 to-black text-zinc-50 font-sans selection:bg-cyan-500/30">
      {/* Global Floating HUD Navigation */}
      <Navbar currentPath={currentRoute.path} onNavigate={navigate} />

      {/* Dynamic View Container */}
      <AnimatePresence mode="wait">
        {currentRoute.path === '/' && (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection />

      {/* Projects Section - Fluid Layout */}
      <section id="projects" className="py-12 sm:py-16 px-6 max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 md:mb-10 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800">
            {t('home.projectsTitle')}
          </h2>
          
          <div className="w-full relative">
            {/* Side Pagination - Fluid Synaptic Nodes */}
            {totalPages > 1 && (
              <>
                <button 
                  onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="absolute -left-4 md:-left-12 lg:-left-20 top-1/2 -translate-y-1/2 z-20 flex items-center gap-3 group disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-500"
                >
                  <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
                    <motion.div 
                      className="absolute inset-0 bg-cyan-500/10 rounded-full blur-lg group-hover:bg-cyan-400/30 transition-colors duration-500"
                    />
                    <motion.div
                      className="absolute w-3.5 h-3.5 md:w-5 md:h-5 bg-gradient-to-br from-cyan-400 to-blue-600 opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
                      animate={{
                        borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
                        rotate: [0, -90, -180]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-cyan-400/0 group-hover:text-cyan-400/80 transition-colors duration-500 -ml-1">
                    PREV
                  </span>
                </button>

                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="absolute -right-4 md:-right-12 lg:-right-20 top-1/2 -translate-y-1/2 z-20 flex items-center gap-3 group disabled:opacity-0 disabled:pointer-events-none transition-opacity duration-500 flex-row-reverse"
                >
                  <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
                    <motion.div 
                      className="absolute inset-0 bg-emerald-500/10 rounded-full blur-lg group-hover:bg-emerald-400/30 transition-colors duration-500"
                    />
                    <motion.div
                      className="absolute w-3.5 h-3.5 md:w-5 md:h-5 bg-gradient-to-br from-emerald-400 to-teal-600 opacity-40 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500"
                      animate={{
                        borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"],
                        rotate: [0, 90, 180]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-[9px] md:text-[10px] font-mono tracking-[0.25em] text-emerald-400/0 group-hover:text-emerald-400/80 transition-colors duration-500 -mr-1">
                    NEXT
                  </span>
                </button>
              </>
            )}

            <div className="flex flex-col w-full">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`top-${currentPage}`}
                  initial={{ opacity: 0, filter: "blur(10px)", x: 30 }}
                  animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                  exit={{ opacity: 0, filter: "blur(10px)", x: -30 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full"
                >
                  {currentProjects[0] && <ProjectCard project={currentProjects[0]} index={0} onExplore={(id) => navigate('#/projects/' + id)} />}
                </motion.div>
              </AnimatePresence>

              {/* Fluid Timeline Pagination (Between Projects) - Compact Connector */}
              {totalPages > 1 && (
                <div className="flex flex-col items-center justify-center w-full py-4 md:py-6 gap-2.5 z-30">
                  <div className="text-zinc-500 font-mono text-[9px] tracking-[0.4em] uppercase">
                    {t('home.phase')} <span className="text-cyan-400">0{currentPage + 1}</span> <span className="mx-1.5 opacity-50">/</span> 0{totalPages}
                  </div>
                  
                  <div className="relative w-36 md:w-48 h-[1px] bg-zinc-800 flex items-center">
                    {/* Active sliding indicator */}
                    <motion.div 
                      className="absolute left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_10px_rgba(34,211,238,0.6)] rounded-full"
                      initial={false}
                      animate={{ 
                        width: `${100 / totalPages}%`,
                        x: `${currentPage * 100}%` 
                      }}
                      transition={{ type: "spring", stiffness: 60, damping: 20 }}
                    >
                      {/* Core bright spot */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-[1px] bg-white shadow-[0_0_8px_white]" />
                    </motion.div>

                    {/* Clickable zones */}
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className="flex-1 h-8 z-10 cursor-pointer group relative flex items-center justify-center"
                        aria-label={`Go to page ${i + 1}`}
                      >
                        <div className="w-1 h-1 rounded-full bg-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence mode="wait">
                <motion.div 
                  key={`bottom-${currentPage}`}
                  initial={{ opacity: 0, filter: "blur(10px)", x: 30 }}
                  animate={{ opacity: 1, filter: "blur(0px)", x: 0 }}
                  exit={{ opacity: 0, filter: "blur(10px)", x: -30 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="w-full"
                >
                  {currentProjects[1] && <ProjectCard project={currentProjects[1]} index={1} onExplore={(id) => navigate('#/projects/' + id)} />}
                </motion.div>
              </AnimatePresence>

              {/* Quick entrance to full project gallery */}
              <div className="flex justify-center mt-8 md:mt-10">
                <button
                  onClick={() => navigate('#/projects')}
                  className="group flex items-center gap-2.5 px-5 py-2 rounded-full bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/40 text-xs font-mono text-zinc-300 hover:text-cyan-300 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                >
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{t('home.viewAll')} ({projects.length})</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Writings Teaser Section */}
      <section className="py-12 px-6 max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => navigate('#/blog')}
          className="group relative p-8 rounded-2xl bg-zinc-950/40 border border-zinc-900 hover:border-cyan-500/40 transition-all duration-500 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden backdrop-blur-sm"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="flex items-center gap-5 z-10">
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {t('home.writingsTag')}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {t('home.writingsTitle')}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-400 shrink-0 z-10">
            <span>{t('home.enterArchive')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section className="py-32 px-6 relative z-10 bg-zinc-900/10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm font-mono tracking-[0.3em] text-zinc-500 uppercase mb-16 text-center"
          >
            {t('about.tag')}
          </motion.h2>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-full overflow-hidden border border-zinc-800/50 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent z-10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0"></div>
              <img
                src="https://picsum.photos/seed/vere/400/400?grayscale"
                alt="vere"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-zinc-400 text-base md:text-lg leading-relaxed space-y-6 font-light"
            >
              <p>
                {t('about.p1')}
              </p>
              <p>
                {t('about.p2')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Links Section - Organic Orbs */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-sm font-mono tracking-[0.3em] text-zinc-500 uppercase mb-16">{t('connect.tag')}</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <SocialLink href="https://github.com/ruiworm?tab=overview&from=2026-04-01&to=2026-04-11" icon={<Github className="w-6 h-6" />} label="GitHub" index={0} />
            <SocialLink href="https://x.com/mier528hui" icon={<XIcon className="w-6 h-6" />} label="X" index={1} />
            <SocialLink href="#" icon={<WeChatIcon className="w-6 h-6" />} label={t('connect.wechat')} index={2} />
            <SocialLink href="mailto:hello@example.com" icon={<Mail className="w-6 h-6" />} label={t('connect.email')} index={3} />
          </div>
        </div>
      </section>
    </motion.div>
  )}

  {currentRoute.path === '/projects' && (
    <motion.div
      key="projects-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
    >
      <ProjectsPage onSelectProject={(id) => navigate('#/projects/' + id)} />
    </motion.div>
  )}

  {currentRoute.path === '/projects/:id' && (
    <motion.div
      key={`project-detail-${currentRoute.id}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
    >
      <ProjectDetailPage
        projectId={currentRoute.id || ''}
        onBack={() => navigate('#/projects')}
        onSelectProject={(id) => navigate('#/projects/' + id)}
      />
    </motion.div>
  )}

  {currentRoute.path === '/blog' && (
    <motion.div
      key="blog-list-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
    >
      <BlogListPage onSelectPost={(slug) => navigate('#/blog/' + slug)} />
    </motion.div>
  )}

  {currentRoute.path === '/blog/:slug' && (
    <motion.div
      key={`blog-detail-${currentRoute.slug}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
    >
      <BlogDetailPage
        slug={currentRoute.slug || ''}
        onBack={() => navigate('#/blog')}
        onSelectPost={(slug) => navigate('#/blog/' + slug)}
      />
    </motion.div>
  )}
</AnimatePresence>

      {/* Footer - Minimal */}
      <footer className="py-12 text-center text-zinc-600 text-xs font-mono tracking-widest relative z-10">
        <p>{t('footer.evolving')}</p>
      </footer>
    </div>
  );
}

function SocialLink({ href, icon, label, index }: { href: string, icon: React.ReactNode, label: string, index: number }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group flex items-center justify-center w-20 h-20 text-zinc-500 hover:text-white transition-colors duration-500"
      aria-label={label}
    >
      <motion.div
        className="absolute inset-0 bg-zinc-900/30 group-hover:bg-cyan-500/20 -z-10 blur-md transition-all duration-500"
        style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
        animate={{
          borderRadius: [
            "40% 60% 70% 30% / 40% 50% 60% 50%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "40% 60% 70% 30% / 40% 50% 60% 50%"
          ],
          rotate: [0, 360]
        }}
        transition={{ duration: 6 + index, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 group-hover:scale-125 transition-transform duration-500">
        {icon}
      </div>
    </motion.a>
  );
}
