'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  slug: string;
}

export default function BlogCard({ title, excerpt, author, publishedAt, slug }: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group h-full"
    >
      <Link href={`/blogs/${slug}`}>
        <div className="h-full bg-card border border-border rounded-xl p-5 sm:p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]">
          <h3 className="text-lg sm:text-2xl font-semibold text-foreground mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-foreground/70 mb-4 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-foreground/60">
            <span className="font-medium">{author}</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
