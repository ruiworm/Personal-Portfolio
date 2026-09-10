import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen, Compass, Layers } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (hash: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const isHome = currentPath === '/' || currentPath === '';
  const isProjects = currentPath.startsWith('/projects');
  const isBlog = currentPath.startsWith('/blog');

  const navItems = [
    {
      id: 'overview',
      label: '01 // OVERVIEW',
      icon: <Compass className="w-3.5 h-3.5" />,
      hash: '#/',
      active: isHome,
    },
    {
      id: 'projects',
      label: '02 // PROJECTS',
      icon: <Layers className="w-3.5 h-3.5" />,
      hash: '#/projects',
      active: isProjects,
    },
    {
      id: 'writings',
      label: '03 // WRITINGS',
      icon: <BookOpen className="w-3.5 h-3.5" />,
      hash: '#/blog',
      active: isBlog,
    },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="pointer-events-auto flex items-center gap-3 md:gap-6 px-4 py-2 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] selection:bg-cyan-500/30"
      >
        {/* Brand Node */}
        <button
          onClick={() => onNavigate('#/')}
          className="flex items-center gap-2 px-2.5 py-1 text-zinc-300 hover:text-white transition-colors cursor-pointer group focus:outline-none"
          aria-label="Home"
        >
          <div className="relative flex items-center justify-center w-2 h-2">
            <span className="absolute w-2 h-2 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          </div>
          <span className="font-mono text-xs font-bold tracking-wider text-zinc-200 group-hover:text-cyan-300 transition-colors">
            vere
          </span>
        </button>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-zinc-800" />

        {/* Navigation Items */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.hash)}
              className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer focus:outline-none ${
                item.active
                  ? 'text-cyan-300 font-semibold shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              {item.active && (
                <motion.div
                  layoutId="navbar-active-pill"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-emerald-500/10 to-cyan-500/15 border border-cyan-500/30 rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="opacity-80">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </header>
  );
};
