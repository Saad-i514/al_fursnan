# Implementation Plan: AL FURSAN Technologies Website

## Overview

This implementation plan breaks down the AL FURSAN Technologies website into incremental coding tasks. The website is a full-stack Next.js application with TypeScript, featuring a public-facing website with dark theme and animations, plus an authenticated admin panel for content management. Each task builds on previous work, with testing sub-tasks marked as optional for faster MVP delivery.

## Tasks

- [x] 1. Project setup and configuration
  - Initialize Next.js 14+ project with TypeScript and App Router
  - Install and configure dependencies: Tailwind CSS, Prisma, NextAuth.js, Framer Motion, Zod, sharp
  - Set up project directory structure (app, components, lib, types)
  - Create environment variables template (.env.example)
  - Configure Tailwind with dark theme colors
  - _Requirements: 17_

- [ ] 2. Database schema and Prisma setup
  - [x] 2.1 Create Prisma schema with all models
    - Define User, BlogPost, JobOpening, Project, Service, TeamMember, ConsultationRequest models
    - Add indexes for performance optimization
    - Configure PostgreSQL connection
    - _Requirements: 17_
  
  - [x] 2.2 Generate Prisma client and run initial migration
    - Run `prisma generate` and `prisma migrate dev`
    - Create seed script for initial data (services, team members)
    - _Requirements: 17_

- [ ] 3. Authentication system implementation
  - [x] 3.1 Configure NextAuth.js with credentials provider
    - Create auth API route at `/api/auth/[...nextauth]/route.ts`
    - Implement bcrypt password hashing
    - Configure JWT session strategy
    - _Requirements: 9_
  
  - [x] 3.2 Create login page
    - Build login form with email and password fields
    - Implement client-side validation with Zod
    - Add error message display
    - Style with dark theme
    - _Requirements: 9_
  
  - [x] 3.3 Implement route protection middleware
    - Create middleware.ts to protect `/admin` and `/api/admin` routes
    - Add session check in admin layout
    - Implement redirect to login for unauthenticated users
    - _Requirements: 9_
  
  - [ ]* 3.4 Write unit tests for authentication logic
    - Test password hashing and comparison
    - Test session validation
    - Test redirect behavior
    - _Requirements: 9_

- [x] 4. Checkpoint - Verify authentication works
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Shared components and utilities
  - [x] 5.1 Create reusable UI components
    - Build Button, Input, Modal, LoadingSpinner components
    - Style with Tailwind CSS and dark theme
    - Add TypeScript interfaces for props
    - _Requirements: 1, 6_
  
  - [x] 5.2 Create animation utilities
    - Define animation variants in `lib/animations.ts` (fadeInUp, fadeIn, scaleIn, staggerContainer)
    - Implement `getAnimationProps` function with prefers-reduced-motion support
    - Create AnimatedSection wrapper component
    - _Requirements: 16_
  
  - [x] 5.3 Create validation schemas
    - Define Zod schemas for consultation form, blog posts, projects, job openings
    - Export schemas from `lib/validation.ts`
    - _Requirements: 6, 10, 11, 12, 13, 14, 18_

- [ ] 6. Public website layout and navigation
  - [x] 6.1 Create public layout with header and footer
    - Build Header component with logo and navigation links
    - Implement mobile hamburger menu
    - Build Footer component with company info
    - Add active route highlighting
    - _Requirements: 1, 20_
  
  - [x] 6.2 Implement WhatsApp floating button
    - Create WhatsAppButton component with fixed positioning
    - Add pulse animation
    - Configure to open WhatsApp with +923338705805
    - _Requirements: 3_
  
  - [ ]* 6.3 Write component tests for navigation
    - Test header navigation links
    - Test mobile menu toggle
    - Test WhatsApp button click behavior
    - _Requirements: 1, 3_

- [ ] 7. Home page implementation
  - [x] 7.1 Create home page with hero section
    - Build hero section with company tagline
    - Add animated entrance effects
    - Style with dark theme and gradients
    - _Requirements: 1, 16_
  
  - [x] 7.2 Implement service showcase section
    - Create ServiceCard component with title, description, icon
    - Fetch services from database with display order
    - Add scroll-triggered animations with stagger effect
    - Implement hover animations (scale and glow)
    - _Requirements: 2, 14_
  
  - [x] 7.3 Add projects showcase section
    - Create ProjectCard component
    - Fetch projects from database
    - Add scroll animations and hover effects
    - _Requirements: 8_

- [-] 8. Services page implementation
  - Create services listing page
  - Fetch all services from database
  - Display with ServiceCard components
  - Add page animations
  - _Requirements: 1, 2_

- [ ] 9. Blog system implementation
  - [x] 9.1 Create blog listing page
    - Build BlogCard component with title, excerpt, author, date
    - Fetch published blog posts from database
    - Add pagination or infinite scroll
    - Implement scroll animations
    - _Requirements: 5_
  
  - [x] 9.2 Create individual blog post page
    - Build dynamic route at `/blogs/[slug]/page.tsx`
    - Fetch blog post by slug
    - Render rich text content with proper formatting
    - Display metadata (author, date)
    - Generate dynamic metadata for SEO
    - _Requirements: 5, 19_
  
  - [ ]* 9.3 Write integration tests for blog routes
    - Test blog listing page data fetching
    - Test individual blog post rendering
    - Test 404 handling for invalid slugs
    - _Requirements: 5_

- [x] 10. About page implementation
  - Create about page with company story
  - Fetch CEO and Founder names from database
  - Display team member images if available
  - Add MIT Hackathon victory story
  - Display company mission and "Al-Fursan" meaning
  - Add animations for content sections
  - _Requirements: 4_

- [ ] 11. Consultation form implementation
  - [x] 11.1 Create consultation form page
    - Build ConsultationForm component with name, email, phone, message fields
    - Implement client-side validation with Zod
    - Add loading state during submission
    - Display success/error messages
    - _Requirements: 6_
  
  - [x] 11.2 Create consultation API endpoint
    - Build POST route at `/api/consultation/route.ts`
    - Validate request data with Zod schema
    - Store submission in database
    - Return success/error response
    - _Requirements: 6_
  
  - [ ]* 11.3 Write API tests for consultation endpoint
    - Test successful submission with valid data
    - Test validation errors with invalid data
    - Test database storage
    - _Requirements: 6_

- [ ] 12. Checkpoint - Verify public website functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Admin panel layout and navigation
  - [x] 13.1 Create admin layout with sidebar
    - Build Sidebar component with navigation items
    - Add logout button
    - Display user email
    - Implement active route highlighting
    - Make sidebar collapsible on mobile
    - _Requirements: 9_
  
  - [x] 13.2 Create admin dashboard page
    - Build DashboardCard components for statistics
    - Fetch and display counts: blog posts, active jobs, projects, consultation requests
    - Display recent consultation requests
    - Style with dark theme
    - _Requirements: 15_

- [ ] 14. File upload functionality
  - [x] 14.1 Create image upload API endpoint
    - Build POST route at `/api/upload/route.ts`
    - Validate file type (JPEG, PNG, WebP) and size (5MB max)
    - Save files to `public/uploads` directory
    - Generate optimized versions with sharp (original, optimized, thumbnail)
    - Return file URLs
    - _Requirements: 18_
  
  - [x] 14.2 Create ImageUpload component
    - Build drag-and-drop file upload UI
    - Add preview before upload
    - Show upload progress indicator
    - Display validation errors
    - _Requirements: 18_
  
  - [ ]* 14.3 Write tests for file upload
    - Test file type validation
    - Test file size validation
    - Test image optimization
    - _Requirements: 18_

- [ ] 15. Admin projects management
  - [x] 15.1 Create projects listing page
    - Build DataTable component for displaying projects
    - Fetch all projects from database
    - Add edit and delete action buttons
    - _Requirements: 10_
  
  - [x] 15.2 Create new project page
    - Build form with title, description, image upload fields
    - Implement validation with Zod
    - Handle image upload
    - Submit to API endpoint
    - _Requirements: 10_
  
  - [x] 15.3 Create edit project page
    - Build dynamic route at `/admin/projects/[id]/edit/page.tsx`
    - Pre-populate form with existing project data
    - Allow image replacement
    - Submit updates to API endpoint
    - _Requirements: 10_
  
  - [x] 15.4 Create projects CRUD API endpoints
    - Build GET, POST, PUT, DELETE routes at `/api/admin/projects`
    - Implement authentication checks
    - Validate request data
    - Handle database operations with error handling
    - _Requirements: 10_
  
  - [ ]* 15.5 Write integration tests for projects API
    - Test create, read, update, delete operations
    - Test authentication requirements
    - Test validation errors
    - _Requirements: 10_

- [ ] 16. Admin blog posts management
  - [x] 16.1 Create blog posts listing page
    - Display all blog posts in DataTable
    - Show published status
    - Add edit and delete actions
    - _Requirements: 13_
  
  - [x] 16.2 Create rich text editor component
    - Integrate Tiptap or similar editor
    - Support bold, italic, underline, headings, lists, links
    - Add image upload capability within editor
    - _Requirements: 13_
  
  - [x] 16.3 Create new blog post page
    - Build form with title, content (rich text), author, published toggle
    - Generate slug from title
    - Handle image uploads in content
    - Submit to API endpoint
    - _Requirements: 13_
  
  - [x] 16.4 Create edit blog post page
    - Build dynamic route at `/admin/blog-posts/[id]/edit/page.tsx`
    - Pre-populate form with existing data
    - Allow content editing with rich text editor
    - Submit updates to API endpoint
    - _Requirements: 13_
  
  - [x] 16.5 Create blog posts CRUD API endpoints
    - Build GET, POST, PUT, DELETE routes at `/api/admin/blog-posts`
    - Implement authentication checks
    - Validate request data
    - Auto-generate slug and excerpt
    - Set publishedAt timestamp when publishing
    - _Requirements: 13_
  
  - [ ]* 16.6 Write integration tests for blog posts API
    - Test CRUD operations
    - Test slug generation
    - Test publish/unpublish functionality
    - _Requirements: 13_

- [ ] 17. Admin job openings management
  - [x] 17.1 Create job openings listing page
    - Display all job openings in DataTable
    - Show active status
    - Add edit and delete actions
    - _Requirements: 12_
  
  - [x] 17.2 Create new job opening page
    - Build form with title, description, requirements, active toggle
    - Implement validation
    - Submit to API endpoint
    - _Requirements: 12_
  
  - [x] 17.3 Create edit job opening page
    - Build dynamic route at `/admin/job-openings/[id]/edit/page.tsx`
    - Pre-populate form with existing data
    - Submit updates to API endpoint
    - _Requirements: 12_
  
  - [x] 17.4 Create job openings CRUD API endpoints
    - Build GET, POST, PUT, DELETE routes at `/api/admin/job-openings`
    - Implement authentication checks
    - Validate request data
    - Handle database operations
    - _Requirements: 12_
  
  - [ ]* 17.5 Write integration tests for job openings API
    - Test CRUD operations
    - Test active/inactive toggle
    - _Requirements: 12_

- [ ] 18. Admin services management
  - [x] 18.1 Create services listing page
    - Display all services in DataTable
    - Show display order
    - Add edit and delete actions
    - _Requirements: 14_
  
  - [x] 18.2 Create edit service page
    - Build form to update title, description, display order
    - Submit updates to API endpoint
    - _Requirements: 14_
  
  - [x] 18.3 Create services API endpoints
    - Build GET, PUT routes at `/api/admin/services`
    - Implement authentication checks
    - Validate request data
    - _Requirements: 14_

- [ ] 19. Admin team management
  - [x] 19.1 Create team management page
    - Display CEO and Founder information
    - Show current names and images
    - Add edit buttons for each team member
    - _Requirements: 11_
  
  - [x] 19.2 Create edit team member functionality
    - Build form to update name and image
    - Handle image upload
    - Submit updates to API endpoint
    - _Requirements: 11_
  
  - [x] 19.3 Create team API endpoints
    - Build GET, PUT routes at `/api/admin/team`
    - Implement authentication checks
    - Validate request data
    - _Requirements: 11_

- [x] 20. Admin consultation requests view
  - Create consultation requests listing page
  - Display all submissions in DataTable with name, email, phone, message, timestamp
  - Add sorting by date
  - Implement read-only view (no editing)
  - _Requirements: 15_

- [x] 21. Checkpoint - Verify admin panel functionality
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 22. SEO and metadata implementation
  - [x] 22.1 Add static page metadata
    - Define metadata for home, services, blogs, about, consultation pages
    - Add Open Graph tags
    - Add Twitter card tags
    - _Requirements: 19_
  
  - [x] 22.2 Implement dynamic metadata for blog posts
    - Create generateMetadata function for blog post pages
    - Include post title, excerpt, author, published date
    - _Requirements: 19_
  
  - [x] 22.3 Create sitemap and robots.txt
    - Build sitemap.ts with static and dynamic routes
    - Create robots.txt to allow public pages, disallow admin
    - _Requirements: 19_
  
  - [x] 22.4 Add structured data
    - Create OrganizationStructuredData component
    - Add to public layout
    - _Requirements: 19_

- [x] 23. Job openings display on public website
  - Add job openings section to home page or create dedicated page
  - Fetch active job openings from database
  - Create JobCard component
  - Display title, description, requirements
  - Add animations
  - Show "no openings" message when empty
  - _Requirements: 7_

- [ ] 24. Performance optimization
  - [x] 24.1 Implement image optimization
    - Use Next.js Image component throughout
    - Add lazy loading and blur placeholders
    - Configure image domains in next.config.js
    - _Requirements: 16_
  
  - [x] 24.2 Add code splitting for heavy components
    - Dynamic import RichTextEditor with loading state
    - Dynamic import admin components
    - _Requirements: 16_
  
  - [x] 24.3 Configure caching and revalidation
    - Add revalidate to static pages
    - Implement on-demand revalidation after content updates
    - _Requirements: 16_

- [ ] 25. Accessibility improvements
  - [x] 25.1 Add ARIA labels and semantic HTML
    - Ensure all interactive elements have proper labels
    - Use semantic HTML elements (nav, main, article, etc.)
    - Add alt text to all images
    - _Requirements: 16_
  
  - [x] 25.2 Implement keyboard navigation
    - Test tab order throughout site
    - Add visible focus indicators
    - Ensure modals trap focus
    - _Requirements: 16_
  
  - [x] 25.3 Verify reduced motion support
    - Test prefers-reduced-motion in animation utilities
    - Ensure animations can be disabled
    - _Requirements: 16_
  
  - [ ]* 25.4 Run accessibility audit
    - Use axe DevTools to scan pages
    - Fix any WCAG AA violations
    - Test with screen reader
    - _Requirements: 16_

- [ ] 26. Error handling and validation
  - [x] 26.1 Implement global error boundary
    - Create error.tsx for global error handling
    - Add user-friendly error messages
    - _Requirements: 1_
  
  - [x] 26.2 Add API error handling
    - Create error handling utilities in `lib/api-response.ts`
    - Handle Zod validation errors
    - Handle Prisma database errors
    - Add logging for server errors
    - _Requirements: 6, 10, 11, 12, 13, 14_
  
  - [x] 26.3 Add client-side error display
    - Create ErrorMessage component
    - Create Toast notification component
    - Display validation errors in forms
    - _Requirements: 6_

- [ ] 27. Final integration and polish
  - [x] 27.1 Test all animations and transitions
    - Verify scroll animations trigger correctly
    - Test hover effects on all interactive elements
    - Ensure page transitions are smooth
    - Test on different devices and browsers
    - _Requirements: 16_
  
  - [x] 27.2 Verify responsive design
    - Test all pages on mobile, tablet, desktop
    - Fix any layout issues
    - Ensure images scale properly
    - _Requirements: 1_
  
  - [x] 27.3 Create database seed script
    - Add sample services data
    - Add CEO and Founder entries
    - Add sample blog posts and projects for testing
    - _Requirements: 17_
  
  - [ ]* 27.4 Run full test suite
    - Execute all unit tests
    - Execute all integration tests
    - Verify test coverage meets goals
    - _Requirements: All_

- [ ] 28. Deployment preparation
  - [x] 28.1 Configure production environment variables
    - Document all required environment variables
    - Set up production database connection
    - Configure NextAuth secret
    - _Requirements: 17_
  
  - [x] 28.2 Create deployment documentation
    - Document build process
    - Document database migration steps
    - Document environment setup
    - Add hosting recommendations
    - _Requirements: All_
  
  - [x] 28.3 Optimize production build
    - Run production build and check for errors
    - Analyze bundle size
    - Verify all images are optimized
    - Test production build locally
    - _Requirements: 16_

- [x] 29. Final checkpoint - Complete system verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and provide opportunities for user feedback
- The implementation uses TypeScript throughout for type safety
- All database operations use Prisma ORM for type-safe queries
- Authentication is handled by NextAuth.js with JWT sessions
- Images are initially stored locally with a clear migration path to cloud storage
- The design prioritizes performance, accessibility, and SEO best practices
