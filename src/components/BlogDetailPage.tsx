import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  Copy, 
  Check, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle,
  Lightbulb,
  Info
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogs';

interface BlogDetailPageProps {
  slug: string;
  onBack: () => void;
  onSelectPost: (slug: string) => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ slug, onBack, onSelectPost }) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const postIndex = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = BLOG_POSTS[postIndex] || BLOG_POSTS[0];

  const prevPost = postIndex > 0 ? BLOG_POSTS[postIndex - 1] : null;
  const nextPost = postIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[postIndex + 1] : null;

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

  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-4xl mx-auto relative z-10 selection:bg-cyan-500/30">
      {/* Top Laser Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-zinc-900 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back to archive link */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="group flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors mb-12 cursor-pointer focus:outline-none"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>BACK TO WRITINGS</span>
      </motion.button>

      {/* Article Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-14 pb-8 border-b border-zinc-900"
      >
        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500 mb-6">
          <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 tracking-wider uppercase font-semibold">
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
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-8 leading-tight">
          {post.title}
        </h1>

        {/* Author & Share */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center">
              <span className="font-mono text-xs font-bold text-cyan-400">VR</span>
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-200">vere</div>
              <div className="text-xs font-mono text-zinc-500">ENGINEER & CREATIVE TECH</div>
            </div>
          </div>

          <button
            onClick={handleShareLink}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-pointer"
            title="复制链接"
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
        </div>
      </motion.header>

      {/* Article Body */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="space-y-12 text-zinc-300 font-light leading-relaxed text-base sm:text-lg"
      >
        {/* Lead paragraph */}
        <p className="text-lg sm:text-xl text-zinc-200 font-normal leading-relaxed border-l-2 border-cyan-400/80 pl-6 py-1 italic bg-gradient-to-r from-cyan-500/5 to-transparent">
          {post.content.lead}
        </p>

        {/* Sections */}
        {post.content.sections.map((section, sIdx) => (
          <section key={sIdx} className="space-y-6">
            {section.heading && (
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white pt-6 flex items-center gap-3">
                <span>{section.heading}</span>
              </h2>
            )}

            {section.subheading && (
              <h3 className="text-xl font-semibold text-zinc-200">
                {section.subheading}
              </h3>
            )}

            {section.paragraphs.map((para, pIdx) => (
              <p key={pIdx} className="text-zinc-300 leading-relaxed font-light">
                {para}
              </p>
            ))}

            {/* Callout Box */}
            {section.callout && (
              <div className={`my-6 p-5 rounded-xl border flex gap-4 ${
                section.callout.type === 'warning'
                  ? 'bg-amber-500/5 border-amber-500/30 text-amber-200'
                  : section.callout.type === 'tip'
                  ? 'bg-emerald-500/5 border-emerald-500/30 text-emerald-200'
                  : 'bg-cyan-500/5 border-cyan-500/30 text-cyan-200'
              }`}>
                <div className="shrink-0 mt-0.5">
                  {section.callout.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400" />}
                  {section.callout.type === 'tip' && <Lightbulb className="w-5 h-5 text-emerald-400" />}
                  {section.callout.type === 'note' && <Info className="w-5 h-5 text-cyan-400" />}
                </div>
                <div className="text-sm sm:text-base leading-relaxed">
                  {section.callout.text}
                </div>
              </div>
            )}

            {/* Structured List */}
            {section.list && (
              <ul className="space-y-2.5 my-4 pl-2">
                {section.list.map((item, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0 shadow-[0_0_6px_#22d3ee]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Code Block with Copy Feedback */}
            {section.code && (
              <div className="my-8 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl">
                {/* Code Window Header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    </div>
                    <span className="ml-2 uppercase tracking-widest text-[10px] text-cyan-400/90 font-bold">
                      {section.code.language}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopyCode(section.code!.code, `code-${sIdx}`)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 transition-colors cursor-pointer"
                  >
                    {copiedCodeId === `code-${sIdx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px]">COPY</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Code Body */}
                <pre className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-200 leading-relaxed">
                  <code>{section.code.code}</code>
                </pre>
              </div>
            )}
          </section>
        ))}
      </motion.main>

      {/* Bottom Tags */}
      <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-zinc-900/60 border border-zinc-800 rounded-full text-xs font-mono text-zinc-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Prev / Next Post Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
        {prevPost ? (
          <button
            onClick={() => onSelectPost(prevPost.slug)}
            className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:border-cyan-500/40 transition-all text-left group cursor-pointer"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mb-2">
              <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS ARTICLE</span>
            </div>
            <div className="text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
              {prevPost.title}
            </div>
          </button>
        ) : <div />}

        {nextPost && (
          <button
            onClick={() => onSelectPost(nextPost.slug)}
            className="p-5 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:border-cyan-500/40 transition-all text-right group cursor-pointer"
          >
            <div className="flex items-center justify-end gap-2 text-[10px] font-mono text-zinc-500 mb-2">
              <span>NEXT ARTICLE</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="text-sm font-semibold text-zinc-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
              {nextPost.title}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
