'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}

export default function ProjectCard({ title, description, imageUrl, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
    >
      <div className="relative h-40 sm:h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="text-base sm:text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-foreground/70 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
