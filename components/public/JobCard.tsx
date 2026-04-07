'use client';

import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

interface JobCardProps {
  title: string;
  description: string;
  requirements: string;
  index: number;
}

export default function JobCard({ title, description, requirements, index }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl p-5 sm:p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
    >
      <div className="flex items-start gap-3 sm:gap-4 mb-4">
        <div className="p-2 sm:p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
          <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-foreground/70 mb-1 sm:mb-2">Description</h4>
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">{description}</p>
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-semibold text-foreground/70 mb-1 sm:mb-2">Requirements</h4>
          <p className="text-sm sm:text-base text-foreground/80 leading-relaxed whitespace-pre-line">{requirements}</p>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 pt-4 border-t border-border">
        <a
          href="/consultation"
          className="inline-flex items-center text-sm sm:text-base text-primary hover:text-secondary transition-colors font-medium"
        >
          Apply Now
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}
