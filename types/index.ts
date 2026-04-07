// Core data types for AL FURSAN Technologies website

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobOpening {
  id: string;
  title: string;
  description: string;
  requirements: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  role: 'CEO' | 'FOUNDER';
  name: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalBlogPosts: number;
  totalActiveJobs: number;
  totalProjects: number;
  totalConsultationRequests: number;
  recentConsultations: ConsultationRequest[];
}
