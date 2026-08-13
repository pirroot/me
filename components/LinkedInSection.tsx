import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, UserRoundKey } from 'lucide-react';
import { Eyebrow } from '@/app/page';

interface LinkedInPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  likes: number;
  url?: string;
}


export function LinkedInSection() {
  const [posts, setPosts] = useState<LinkedInPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        // ============================================
        // 🔄 جایگزین کردن با API واقعی لینکدین
        // ============================================
        const response = await fetch('/api/linkedin-posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        setPosts(data);

        await new Promise((resolve) => setTimeout(resolve, 800));
        setPosts(MOCK_POSTS);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'خطا در دریافت نوشته‌ها');
        console.error('Error fetching LinkedIn posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post: LinkedInPost) => {
    if (post.url) {
      window.open(post.url, '_blank', 'noopener,noreferrer');
    }
  };

  // ============================================
  // حالت خطا
  // ============================================
  if (error) {
    return (
      <section className="mb-32">
        <Eyebrow index="۰۶">نوشته‌های لینکدین</Eyebrow>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
          >
            تلاش مجدد
          </button>
        </div>
      </section>
    );
  }

  // ============================================
  // رندر اصلی
  // ============================================
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="mb-32"
    >
      <Eyebrow index="۰۶">نوشته‌های لینکدین</Eyebrow>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* ============================== */}
        {/* حالت لودینگ */}
        {/* ============================== */}
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-40 animate-pulse rounded-xl border border-white/10 bg-white/[0.03]"
                role="status"
                aria-label="در حال بارگذاری"
              />
            ))
          : // ==============================
            // رندر پست‌ها
            // ==============================
            posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => handlePostClick(post)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePostClick(post);
                  }
                }}
                role="article"
                tabIndex={0}
                className="group relative cursor-pointer rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-cyan-300/30 hover:bg-white/[0.05] hover:shadow-lg hover:shadow-cyan-500/5"
                aria-label={`پست لینکدین: ${post.title}`}
              >
                {/* هدر کارت */}
                <div className="mb-3 flex items-center justify-between">
                  <UserRoundKey className="h-5 w-5 text-cyan-300/70" />
                  <span className="text-[10px] text-zinc-500">{post.date}</span>
                </div>

                {/* عنوان */}
                <h3 className="mb-2 font-display text-md font-medium leading-snug text-zinc-100 line-clamp-2">
                  {post.title}
                </h3>

                {/* توضیحات */}
                <p className="mb-4 text-xs leading-relaxed text-zinc-400 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* فوتر کارت */}
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-[10px] text-zinc-500">
                    <Star className="h-3 w-3 text-amber-400" />
                    {post.likes.toLocaleString('fa-IR')} لایک
                  </span>

                  <span className="flex items-center gap-1 text-[10px] text-cyan-300/70 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    مشاهده در لینکدین
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </div>

                {/* خط تزئینی در هاور */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 transition-transform duration-300 group-hover:scale-x-100" />
              </motion.div>
            ))}
      </div>

      {/* ============================== */}
      {/* حالت خالی */}
      {/* ============================== */}
      {!loading && posts.length === 0 && (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="text-sm text-zinc-400">هیچ نوشته‌ای یافت نشد</p>
        </div>
      )}

      {/* ============================== */}
      {/* فوتر با توضیح */}
      {/* ============================== */}
      <p className="mt-4 text-[10px] text-zinc-600">
        * برای اتصال به API واقعی لینکدین، endpoint مورد نظر را در کامپوننت LinkedInSection جایگزین
        کنید.
      </p>
    </motion.section>
  );
}

// ============================================
// export پیش‌فرض برای import ساده‌تر
// ============================================
export default LinkedInSection;
