# Requirements Document

## Introduction

AL FURSAN Technologies is a software company website that showcases services, manages content, and provides consultation opportunities. The system consists of a public-facing website with dark theme and animations, plus an admin panel for content management. The name "Al-Fursan" represents resilience and bravery, originating from the team's MIT Hackathon victory.

## Glossary

- **Public_Website**: The user-facing website accessible to all visitors
- **Admin_Panel**: The authenticated content management system for administrators
- **Service_Card**: An animated component displaying a company service offering
- **Blog_Post**: An article published on the website with title, content, and metadata
- **Job_Opening**: A position listing with description and requirements
- **Project_Entry**: A showcase item displaying completed client work
- **Consultation_Form**: A contact form for requesting free consultation services
- **WhatsApp_Button**: A floating button that opens WhatsApp chat with the company
- **Authentication_System**: The secure login mechanism for admin access
- **Database**: PostgreSQL database storing all dynamic content
- **Animation_System**: Framer Motion or similar library for page transitions and element animations

## Requirements

### Requirement 1: Public Website Pages

**User Story:** As a visitor, I want to navigate through different pages of the website, so that I can learn about AL FURSAN Technologies and their services.

#### Acceptance Criteria

1. THE Public_Website SHALL display a Home page with animated service showcase 
2. THE Public_Website SHALL display a Services page listing all company offerings
3. THE Public_Website SHALL display a Blogs page showing published articles
4. THE Public_Website SHALL display an About page with company story and mission
5. THE Public_Website SHALL display a Free Consultation page with contact form
6. THE Public_Website SHALL apply dark theme styling to all pages
7. THE Public_Website SHALL render responsive layouts for mobile, tablet, and desktop devices

### Requirement 2: Service Showcase with Animations

**User Story:** As a visitor, I want to see animated service cards on the Home page, so that I can quickly understand what AL FURSAN Technologies offers.

#### Acceptance Criteria

1. THE Public_Website SHALL display six Service_Cards for AI Solutions, AI Automations, SAAS Products, Website Solutions, Mobile Applications, and Chatbots
2. WHEN a visitor scrolls to the services section, THE Service_Cards SHALL animate into view
3. WHEN a visitor hovers over a Service_Card, THE Service_Card SHALL display an interactive animation
4. THE Service_Cards SHALL maintain consistent styling and spacing across all viewport sizes

### Requirement 3: WhatsApp Integration

**User Story:** As a visitor, I want to quickly contact AL FURSAN Technologies via WhatsApp, so that I can get immediate assistance.

#### Acceptance Criteria

1. THE Public_Website SHALL display a WhatsApp_Button in a fixed position on all pages
2. WHEN a visitor clicks the WhatsApp_Button, THE Public_Website SHALL open WhatsApp chat with phone number +923338705805
3. THE WhatsApp_Button SHALL remain visible during page scrolling
4. THE WhatsApp_Button SHALL display a recognizable WhatsApp icon

### Requirement 4: About Page Content

**User Story:** As a visitor, I want to read about AL FURSAN Technologies' story and mission, so that I can understand their values and background.

#### Acceptance Criteria

1. THE Public_Website SHALL display the company origin story including MIT Hackathon victory
2. THE Public_Website SHALL display the meaning of "Al-Fursan" (resilience, bravery, fighting for aims)
3. THE Public_Website SHALL display the company mission to provide end-to-end technology solutions
4. THE Public_Website SHALL display information about free consultation services
5. THE Public_Website SHALL display CEO name retrieved from Database
6. THE Public_Website SHALL display Founder name retrieved from Database

### Requirement 5: Blog System

**User Story:** As a visitor, I want to read blog posts, so that I can learn about technology insights from AL FURSAN Technologies.

#### Acceptance Criteria

1. THE Public_Website SHALL display a list of published Blog_Posts on the Blogs page
2. WHEN a visitor clicks a Blog_Post, THE Public_Website SHALL display the full article content
3. THE Public_Website SHALL display Blog_Post metadata including title, publication date, and author
4. THE Public_Website SHALL animate Blog_Post cards on page load and scroll

### Requirement 6: Free Consultation Form

**User Story:** As a potential client, I want to submit a consultation request, so that I can discuss my project needs with AL FURSAN Technologies.

#### Acceptance Criteria

1. THE Consultation_Form SHALL collect visitor name, email, phone number, and message
2. WHEN a visitor submits the Consultation_Form, THE Public_Website SHALL validate all required fields
3. WHEN the Consultation_Form is valid, THE Public_Website SHALL store the submission in Database
4. WHEN the Consultation_Form is submitted successfully, THE Public_Website SHALL display a confirmation message
5. IF the Consultation_Form validation fails, THEN THE Public_Website SHALL display specific error messages for each invalid field

### Requirement 7: Job Openings Display

**User Story:** As a job seeker, I want to view current job openings, so that I can apply for positions at AL FURSAN Technologies.

#### Acceptance Criteria

1. THE Public_Website SHALL display a job openings section with active Job_Opening entries
2. THE Public_Website SHALL display Job_Opening details including title, description, and requirements
3. WHEN no Job_Opening entries exist, THE Public_Website SHALL display a message indicating no current openings
4. THE Public_Website SHALL animate Job_Opening cards on page load

### Requirement 8: Projects Showcase

**User Story:** As a visitor, I want to see AL FURSAN Technologies' completed projects, so that I can evaluate their expertise and portfolio.

#### Acceptance Criteria

1. THE Public_Website SHALL display Project_Entry items retrieved from Database
2. THE Public_Website SHALL display Project_Entry details including title, description, and images
3. THE Public_Website SHALL animate Project_Entry cards on scroll
4. WHEN a visitor clicks a Project_Entry, THE Public_Website SHALL display expanded project details

### Requirement 9: Admin Authentication

**User Story:** As an administrator, I want to securely log into the Admin_Panel, so that I can manage website content.

#### Acceptance Criteria

1. THE Authentication_System SHALL display a login page with email and password fields
2. WHEN an administrator submits valid credentials, THE Authentication_System SHALL create an authenticated session
3. WHEN an administrator submits invalid credentials, THE Authentication_System SHALL display an error message and prevent access
4. THE Authentication_System SHALL hash passwords using bcrypt or similar secure algorithm
5. THE Authentication_System SHALL protect Admin_Panel routes from unauthenticated access
6. WHEN an authenticated session expires, THE Authentication_System SHALL redirect to login page

### Requirement 10: Admin Content Management - Projects

**User Story:** As an administrator, I want to manage project entries, so that I can showcase our latest work to visitors.

#### Acceptance Criteria

1. THE Admin_Panel SHALL display a list of all Project_Entry items
2. THE Admin_Panel SHALL provide a form to create new Project_Entry items with title, description, and image upload
3. THE Admin_Panel SHALL provide a form to edit existing Project_Entry items
4. THE Admin_Panel SHALL provide a button to delete Project_Entry items
5. WHEN an administrator uploads a project image, THE Admin_Panel SHALL store the image and associate it with the Project_Entry
6. WHEN an administrator saves a Project_Entry, THE Admin_Panel SHALL validate required fields before storing in Database

### Requirement 11: Admin Content Management - Team Information

**User Story:** As an administrator, I want to update CEO and Founder names, so that the About page displays current leadership information.

#### Acceptance Criteria

1. THE Admin_Panel SHALL display a form to edit CEO name
2. THE Admin_Panel SHALL display a form to edit Founder name
3. The Admin_Panel SHALL display to upload the pics  of the both the CEO and the Founder
3. WHEN an administrator updates team information, THE Admin_Panel SHALL store changes in Database
4. WHEN an administrator saves team information, THE Admin_Panel SHALL display a success confirmation

### Requirement 12: Admin Content Management - Job Openings

**User Story:** As an administrator, I want to post and manage job openings, so that potential candidates can see available positions.

#### Acceptance Criteria

1. THE Admin_Panel SHALL display a list of all Job_Opening entries
2. THE Admin_Panel SHALL provide a form to create new Job_Opening entries with title, description, and requirements
3. THE Admin_Panel SHALL provide a form to edit existing Job_Opening entries
4. THE Admin_Panel SHALL provide a button to delete Job_Opening entries
5. THE Admin_Panel SHALL provide a toggle to mark Job_Opening entries as active or inactive
6. WHEN an administrator saves a Job_Opening, THE Admin_Panel SHALL validate required fields before storing in Database

### Requirement 13: Admin Content Management - Blog Posts

**User Story:** As an administrator, I want to create and manage blog posts, so that I can share insights with website visitors.

#### Acceptance Criteria

1. THE Admin_Panel SHALL display a list of all Blog_Post entries
2. THE Admin_Panel SHALL provide a rich text editor to create new Blog_Post entries with title, content, and author
3. THE Admin_Panel SHALL provide a rich text editor to edit existing Blog_Post entries
4. THE Admin_Panel SHALL provide a button to delete Blog_Post entries
5. THE Admin_Panel SHALL provide a toggle to publish or unpublish Blog_Post entries
6. WHEN an administrator saves a Blog_Post, THE Admin_Panel SHALL store publication date in Database
7. THE Admin_Panel SHALL support image uploads within Blog_Post content

### Requirement 14: Admin Content Management - Services

**User Story:** As an administrator, I want to update service offerings, so that the website reflects our current capabilities.

#### Acceptance Criteria

1. THE Admin_Panel SHALL display a list of all service offerings
2. THE Admin_Panel SHALL provide a form to edit service title and description
3. THE Admin_Panel SHALL provide a form to add new service offerings
4. THE Admin_Panel SHALL provide a button to delete service offerings
5. WHEN an administrator updates services, THE Admin_Panel SHALL store changes in Database

### Requirement 15: Admin Dashboard Overview

**User Story:** As an administrator, I want to see an overview dashboard, so that I can quickly assess website activity and content status.

#### Acceptance Criteria

1. THE Admin_Panel SHALL display total count of published Blog_Post entries
2. THE Admin_Panel SHALL display total count of active Job_Opening entries
3. THE Admin_Panel SHALL display total count of Project_Entry items
4. THE Admin_Panel SHALL display total count of consultation form submissions
5. THE Admin_Panel SHALL display recent consultation requests with timestamp

### Requirement 16: Animation System

**User Story:** As a visitor, I want to experience smooth animations throughout the website, so that the browsing experience feels modern and professional.

#### Acceptance Criteria

1. THE Public_Website SHALL animate page transitions when navigating between routes
2. THE Public_Website SHALL animate elements on scroll using intersection observer
3. THE Public_Website SHALL animate hover states on interactive elements
4. THE Public_Website SHALL apply fade-in animations to content sections on initial page load
5. THE Animation_System SHALL maintain 60fps performance during animations
6. THE Animation_System SHALL respect user's prefers-reduced-motion accessibility setting

### Requirement 17: Database Schema

**User Story:** As a system, I need a structured database schema, so that all content is stored reliably and can be queried efficiently.

#### Acceptance Criteria

1. THE Database SHALL store Blog_Post entries with id, title, content, author, published status, and timestamps
2. THE Database SHALL store Job_Opening entries with id, title, description, requirements, active status, and timestamps
3. THE Database SHALL store Project_Entry items with id, title, description, image URLs, and timestamps
4. THE Database SHALL store service offerings with id, title, description, icon reference, and display order
5. THE Database SHALL store team information with id, role (CEO/Founder), and name
6. THE Database SHALL store consultation form submissions with id, name, email, phone, message, and timestamp
7. THE Database SHALL store admin user credentials with id, email, hashed password, and timestamps
8. THE Database SHALL enforce foreign key constraints and data integrity rules

### Requirement 18: Image Upload and Storage

**User Story:** As an administrator, I want to upload images for projects and blog posts, so that visual content enhances the website.

#### Acceptance Criteria

1. THE Admin_Panel SHALL accept image uploads in JPEG, PNG, and WebP formats
2. WHEN an administrator uploads an image, THE Admin_Panel SHALL validate file size is under 5MB
3. WHEN an administrator uploads an image, THE Admin_Panel SHALL store the image in a public storage directory
4. THE Admin_Panel SHALL generate optimized versions of uploaded images for different screen sizes
5. IF an image upload fails, THEN THE Admin_Panel SHALL display an error message with failure reason

### Requirement 19: SEO and Metadata

**User Story:** As a business owner, I want the website to be search engine optimized, so that potential clients can find AL FURSAN Technologies online.

#### Acceptance Criteria

1. THE Public_Website SHALL include meta tags for title, description, and keywords on all pages
2. THE Public_Website SHALL include Open Graph tags for social media sharing
3. THE Public_Website SHALL generate a sitemap.xml file listing all public pages
4. THE Public_Website SHALL include structured data markup for organization information
5. THE Public_Website SHALL use semantic HTML elements for proper content hierarchy

### Requirement 20: Company Logo Display

**User Story:** As a visitor, I want to see the AL FURSAN Technologies logo, so that I can recognize the brand throughout the website.

#### Acceptance Criteria

1. THE Public_Website SHALL display the company logo in the navigation header on all pages
2. WHEN a visitor clicks the logo, THE Public_Website SHALL navigate to the Home page
3. THE Public_Website SHALL display the logo with appropriate sizing for mobile and desktop viewports
4. THE Admin_Panel SHALL display the company logo in the admin navigation header
