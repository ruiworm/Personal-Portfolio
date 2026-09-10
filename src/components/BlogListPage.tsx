import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Calendar, Clock, Tag, ArrowRight, BookOpen, Terminal } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogs';

interface BlogListPageProps {
  onSelectPost: (slug: string) => void;
}

const CATEGORIES = ['ALL', 'AI & SYSTEMS', 'GRAPHICS & WEBGL', 'ENGINEERING'] as const;

export const BlogListPage: React.FC<BlogListPageProps> = ({ onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === 'ALL' || post.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-5xl mx-auto relative z-10 selection:bg-cyan-500/30">
      {/* Background Ambience Glow */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center text-center mb-16"
      >
        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/60 border border-zinc-800 rounded-full text-[10px] font-mono tracking-widest text-cyan-400 mb-6">
          <Terminal className="w-3 h-3" />
          <span>ARCHIVE // SYS.INDEX_LOGS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-600">
          WRITINGS & THOUGHTS
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-light leading-relaxed">
          深入系统架构核心、探索现代图形交互与 Web 前沿工程思考。
        </p>
      </motion.div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12"
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
                    layoutId="category-active-pill"
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
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索文章或标签..."
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

      {/* Post List */}
      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, idx) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => onSelectPost(post.slug)}
                className="group relative p-6 sm:p-8 rounded-2xl bg-zinc-950/50 border border-zinc-900/90 hover:border-cyan-500/40 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm"
              >
                {/* Subtle Fluid Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Left Accent Bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400/0 via-cyan-400 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  {/* Meta badges */}
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 mb-4">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] tracking-wider uppercase">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-zinc-600" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100 group-hover:text-cyan-300 transition-colors duration-300 mb-3">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed font-light mb-6">
                    {post.excerpt}
                  </p>

                  {/* Bottom: Tags & Action */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-900/60">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors flex items-center gap-1"
                        >
                          <span className="text-cyan-500/50">#</span>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-cyan-400 group-hover:text-cyan-300">
                      <span>READ ARTICLE</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center border border-dashed border-zinc-900 rounded-2xl bg-zinc-950/20"
            >
              <p className="font-mono text-sm text-zinc-500 mb-4">未找到匹配的文章关键词或分类</p>
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
        SYS.TOTAL_ENTRIES: {filteredPosts.length} / {BLOG_POSTS.length} RECORDS
      </div>
    </div>
  );
};
