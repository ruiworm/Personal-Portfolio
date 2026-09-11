import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Nav
    'nav.overview': '01 // 概览',
    'nav.projects': '02 // 项目库',
    'nav.writings': '03 // 技术专栏',
    'nav.brand': 'vere',
    'nav.expand': '展开菜单',
    'nav.collapse': '收起菜单',

    // Hero
    'hero.tagline': '探索技术边界，构建优雅且高效的数字产品。',
    'hero.start': '开始探索 // START',

    // Home projects
    'home.projectsTitle': 'PROJECTS // 精选项目库',
    'home.phase': '阶段',
    'home.explore': 'EXPLORE // 探索',
    'home.viewAll': '查看全部项目',

    // Home writings
    'home.writingsTag': '最新研究与深度思考',
    'home.writingsTitle': '探索高并发网关、医疗 AI 筛查与现代工程实践',
    'home.enterArchive': '进入技术专栏',

    // Home about
    'about.tag': '关于我 // ABOUT ME',
    'about.p1': "你好，我是 vere。一名专注于构建优雅、高性能数字产品与全栈交互体验的开发者。我崇尚极简设计与清晰的系统架构，致力于抹平复杂工程算法与直观人机界面之间的鸿沟。",
    'about.p2': "在技术探索中，我深入现代前端框架、高并发底层系统与前沿医疗 AI 落地实践。写代码之余，我持续沉淀自己的工程方法论，构建下一代数字体验。",

    // Home connect
    'connect.tag': '社交连接 // CONNECT',
    'connect.wechat': '微信公众号',
    'connect.email': '电子邮箱',
    'footer.evolving': '持续演进自 2026 // EVOLVING SINCE 2026',

    // Projects Page
    'projectsPage.tag': 'PORTFOLIO // 全景工程项目库',
    'projectsPage.title': 'ALL PROJECTS',
    'projectsPage.subtitle': '集中呈现我们在人工智能、底层高并发系统、Web3 与 WebGL 前沿交互中的工程实践。',
    'projectsPage.searchPlaceholder': '搜索项目名称、技术栈或核心特性...',
    'projectsPage.catAll': '全部 / ALL',
    'projectsPage.catAI': '人工智能 / AI / ML',
    'projectsPage.catSystems': '底层与云 / SYSTEMS',
    'projectsPage.catGraphics': '图形渲染 / GRAPHICS',
    'projectsPage.catFullstack': '全栈应用 / FULLSTACK',
    'projectsPage.noResults': '未找到匹配的项目',
    'projectsPage.resetFilter': '重置筛选',

    // Project Detail Page
    'projectDetail.back': 'BACK TO PROJECTS // 返回项目库',
    'projectDetail.share': 'SHARE // 分享',
    'projectDetail.copied': 'COPIED // 已复制',
    'projectDetail.liveDemo': '体验在线演示 (LIVE DEMO)',
    'projectDetail.github': '开源代码仓库 (GITHUB)',
    'projectDetail.onlineBadge': '100% 在线 · VERCEL 全球加速 CDN',
    'projectDetail.secOverview': '01 // PROJECT OVERVIEW // 项目全景概览',
    'projectDetail.secSpecs': '02 // BENCHMARK & SPECS // 性能基准与技术规格',
    'projectDetail.secFeatures': '03 // KEY CAPABILITIES & MODULES // 核心功能特性与模块',
    'projectDetail.secArchitecture': '04 // ARCHITECTURE PIPELINE // 系统架构演进管线',
    'projectDetail.secChallenges': '05 // CORE CHALLENGES OVERCOME // 核心技术难点与攻坚',
    'projectDetail.prev': 'PREVIOUS PROJECT // 上一个项目',
    'projectDetail.next': 'NEXT PROJECT // 下一个项目',
    'projectDetail.stationLabel': 'DERMASCAN_AI.NODE // 智能病损初筛工作站',
    'projectDetail.modelLabel': '检测算法模型:',
    'projectDetail.abcdeLabel': 'ABCDE 评估模式:',
    'projectDetail.presetLabel': '系统内置内容:',
    'projectDetail.openLive': '打开在线体验站',

    // Blog List Page
    'blogList.tag': 'ARCHIVE // 专栏索引日志',
    'blogList.title': 'WRITINGS & THOUGHTS',
    'blogList.subtitle': '深入系统架构核心、探索现代图形交互与 Web 前沿工程思考。',
    'blogList.searchPlaceholder': '搜索文章标题、摘要或技术标签...',
    'blogList.readArticle': '阅读全文 →',
    'blogList.catAll': '全部 / ALL',
    'blogList.noResults': '未找到相关技术文章',

    // Blog Detail Page
    'blogDetail.back': 'BACK TO WRITINGS // 返回专栏列表',
    'blogDetail.share': 'SHARE // 分享',
    'blogDetail.copied': 'COPIED // 链接已复制',
    'blogDetail.codeCopied': '代码已复制',
    'blogDetail.prev': 'PREVIOUS ARTICLE // 上一篇文章',
    'blogDetail.next': 'NEXT ARTICLE // 下一篇文章',
  },
  en: {
    // Nav
    'nav.overview': '01 // OVERVIEW',
    'nav.projects': '02 // PROJECTS',
    'nav.writings': '03 // WRITINGS',
    'nav.brand': 'vere',
    'nav.expand': 'Expand Menu',
    'nav.collapse': 'Collapse Menu',

    // Hero
    'hero.tagline': 'Exploring technological boundaries, crafting elegant and high-performance digital products.',
    'hero.start': 'START // EXPLORE',

    // Home projects
    'home.projectsTitle': 'PROJECTS',
    'home.phase': 'Phase',
    'home.explore': 'EXPLORE',
    'home.viewAll': 'VIEW ALL PROJECTS',

    // Home writings
    'home.writingsTag': 'LATEST RESEARCH & WRITINGS',
    'home.writingsTitle': 'Exploring High-Concurrency Gateways, Medical AI Screening, and Modern Engineering',
    'home.enterArchive': 'ENTER ARCHIVE',

    // Home about
    'about.tag': 'ABOUT ME',
    'about.p1': "Hello, I'm vere. I am a passionate developer focused on crafting elegant, high-performance web applications and digital experiences. With a deep appreciation for minimalist design and clean architecture, I strive to bridge the gap between complex engineering and intuitive user interfaces.",
    'about.p2': "My journey involves exploring cutting-edge technologies, from modern frontend frameworks to scalable backend systems and AI integrations. When I'm not writing code, I'm constantly learning and evolving my craft to build the next generation of digital products.",

    // Home connect
    'connect.tag': 'CONNECT',
    'connect.wechat': 'WeChat Official',
    'connect.email': 'Email',
    'footer.evolving': 'EVOLVING SINCE 2026',

    // Projects Page
    'projectsPage.tag': 'PORTFOLIO // FULL_ARCHIVE',
    'projectsPage.title': 'ALL PROJECTS',
    'projectsPage.subtitle': 'A curated archive of our engineering practices across AI, high-concurrency systems, Web3, and WebGL interactions.',
    'projectsPage.searchPlaceholder': 'Search projects by title, stack or keywords...',
    'projectsPage.catAll': 'ALL',
    'projectsPage.catAI': 'AI / ML',
    'projectsPage.catSystems': 'SYSTEMS & CLOUD',
    'projectsPage.catGraphics': 'GRAPHICS & WEBGL',
    'projectsPage.catFullstack': 'FULLSTACK & APP',
    'projectsPage.noResults': 'No matching projects found',
    'projectsPage.resetFilter': 'Reset Filters',

    // Project Detail Page
    'projectDetail.back': 'BACK TO PROJECTS',
    'projectDetail.share': 'SHARE',
    'projectDetail.copied': 'COPIED',
    'projectDetail.liveDemo': 'ACCESS LIVE DEMO',
    'projectDetail.github': 'VIEW SOURCE ON GITHUB',
    'projectDetail.onlineBadge': '100% ONLINE · VERCEL GLOBAL CDN',
    'projectDetail.secOverview': '01 // PROJECT OVERVIEW',
    'projectDetail.secSpecs': '02 // BENCHMARK & SPECS',
    'projectDetail.secFeatures': '03 // KEY CAPABILITIES & MODULES',
    'projectDetail.secArchitecture': '04 // ARCHITECTURE PIPELINE',
    'projectDetail.secChallenges': '05 // CORE CHALLENGES OVERCOME',
    'projectDetail.prev': 'PREVIOUS PROJECT',
    'projectDetail.next': 'NEXT PROJECT',
    'projectDetail.stationLabel': 'DERMASCAN_AI.NODE // CLINICAL AI WORKSTATION',
    'projectDetail.modelLabel': 'Inference Backbone:',
    'projectDetail.abcdeLabel': 'ABCDE Protocol:',
    'projectDetail.presetLabel': 'Built-in Clinical Data:',
    'projectDetail.openLive': 'Launch Live Interactive Demo',

    // Blog List Page
    'blogList.tag': 'ARCHIVE // SYS.INDEX_LOGS',
    'blogList.title': 'WRITINGS & THOUGHTS',
    'blogList.subtitle': 'Deep dives into system architectures, modern graphics interactions, and forward-looking web engineering.',
    'blogList.searchPlaceholder': 'Search articles by title, excerpt or tag...',
    'blogList.readArticle': 'Read Full Article →',
    'blogList.catAll': 'ALL',
    'blogList.noResults': 'No articles found matching criteria',

    // Blog Detail Page
    'blogDetail.back': 'BACK TO WRITINGS',
    'blogDetail.share': 'SHARE',
    'blogDetail.copied': 'COPIED',
    'blogDetail.codeCopied': 'Code Copied',
    'blogDetail.prev': 'PREVIOUS ARTICLE',
    'blogDetail.next': 'NEXT ARTICLE',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app_lang') as Language;
      if (saved === 'zh' || saved === 'en') return saved;
      // Default to Chinese (or check browser locale)
      return navigator.language.startsWith('zh') ? 'zh' : 'en';
    }
    return 'zh';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_lang', newLang);
      document.documentElement.lang = newLang;
    }
  };

  const toggleLang = () => {
    setLang(lang === 'zh' ? 'en' : 'zh');
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations['zh']?.[key] || key;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
