'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Cloud, Globe, Smartphone, MessageSquare } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

const iconMap: Record<string, React.ReactNode> = {
  'ai-brain':   <Brain className="w-7 h-7" />,
  'automation': <Zap className="w-7 h-7" />,
  'cloud':      <Cloud className="w-7 h-7" />,
  'web':        <Globe className="w-7 h-7" />,
  'mobile':     <Smartphone className="w-7 h-7" />,
  'chat':       <MessageSquare className="w-7 h-7" />,
};

const colorMap: Record<string, string> = {
  'ai-brain':   'bg-blue-500/15 text-blue-400',
  'automation': 'bg-yellow-500/15 text-yellow-400',
  'cloud':      'bg-cyan-500/15 text-cyan-400',
  'web':        'bg-purple-500/15 text-purple-400',
  'mobile':     'bg-green-500/15 text-green-400',
  'chat':       'bg-pink-500/15 text-pink-400',
};

export default function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const svgIcon = iconMap[icon] ?? <Brain className="w-7 h-7" />;
  const colorClass = colorMap[icon] ?? 'bg-primary/15 text-primary';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-5 sm:p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
    >
      <div className="flex flex-col items-start space-y-3 sm:space-y-4">
        {/* Icon container */}
        <div className={`p-3 rounded-lg ${colorClass} transition-transform duration-300 group-hover:scale-110`}>
          {svgIcon}
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-foreground/75 leading-relaxed font-light">
          {description}
        </p>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 via-primary/3 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
