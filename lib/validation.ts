import { z } from 'zod';

/**
 * Validation schema for consultation form submissions
 * Requirements: 6 - Free Consultation Form
 */
export const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;

/**
 * Validation schema for blog post creation and editing
 * Requirements: 13 - Admin Content Management - Blog Posts
 */
export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  excerpt: z.string().optional(),
  author: z.string().min(2, 'Author name required'),
  published: z.boolean().default(false),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

/**
 * Validation schema for project creation and editing
 * Requirements: 10 - Admin Content Management - Projects
 */
export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  imageUrl: z.string().url('Valid image URL required'),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

/**
 * Validation schema for job opening creation and editing
 * Requirements: 12 - Admin Content Management - Job Openings
 */
export const jobOpeningSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  requirements: z.string().min(20, 'Requirements must be at least 20 characters'),
  active: z.boolean().default(true),
});

export type JobOpeningFormData = z.infer<typeof jobOpeningSchema>;

/**
 * Validation schema for service updates
 * Requirements: 14 - Admin Content Management - Services
 */
export const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  icon: z.string().min(1, 'Icon reference required'),
  displayOrder: z.number().int().min(0, 'Display order must be a positive integer'),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

/**
 * Validation schema for team member updates
 * Requirements: 11 - Admin Content Management - Team Information
 */
export const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  imageUrl: z.string().url('Valid image URL required').optional(),
});

export type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

/**
 * Validation schema for file uploads
 * Requirements: 18 - Image Upload and Storage
 */
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'File size must be less than 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'File must be JPEG, PNG, or WebP format'
    ),
});

export type FileUploadData = z.infer<typeof fileUploadSchema>;
