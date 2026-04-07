'use client';

import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const iconMap: Record<string, string> = {
  'ai-brain':   '🧠',
  'automation': '⚙️',
  'cloud':      '☁️',
  'web':        '🌐',
  'mobile':     '📱',
  'chat':       '💬',
};

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const emoji = iconMap[icon] ?? '🚀';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-5 sm:p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
    >
      <div className="flex flex-col items-start space-y-3 sm:space-y-4">
        <div className="text-3xl sm:text-4xl">{emoji}</div>
        <h3 className="text-lg sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
