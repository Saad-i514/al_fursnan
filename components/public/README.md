# Public Components

This directory contains components used in the public-facing website.

## Components

### Header

The main navigation header component for the public website.

**Features:**
- Logo with gradient styling linking to home page
- Desktop navigation menu with active route highlighting
- Mobile hamburger menu with smooth animations
- Sticky positioning for persistent navigation
- Responsive design for all screen sizes

**Navigation Links:**
- Home (/)
- Services (/services)
- Blogs (/blogs)
- About (/about)
- Free Consultation (/consultation)

**Usage:**
```tsx
import { Header } from '@/components/public';

<Header />
```

The Header component automatically detects the current route and highlights the active navigation item.

### Footer

The footer component with company information and links.

**Features:**
- Company branding with gradient logo
- Quick links to main pages
- Contact information with WhatsApp link
- Copyright notice with dynamic year
- Responsive grid layout

**Usage:**
```tsx
import { Footer } from '@/components/public';

<Footer />
```

### PublicLayoutWrapper

A client component that conditionally renders the Header and Footer based on the current route.

**Features:**
- Automatically shows Header and Footer on public pages
- Hides Header and Footer on admin and login pages
- Uses Next.js `usePathname` hook for route detection

**Usage:**
```tsx
import PublicLayoutWrapper from '@/components/public/PublicLayoutWrapper';

<PublicLayoutWrapper>
  {children}
</PublicLayoutWrapper>
```

This component is used in the root layout (`app/layout.tsx`) to wrap all pages.

### AnimatedSection

A wrapper component that adds scroll-triggered animations to its children using Framer Motion.

**Features:**
- Animates elements when they enter the viewport
- Respects user's `prefers-reduced-motion` setting
- Supports multiple animation directions (up, down, left, right)
- Supports delay for staggered animations
- Uses Intersection Observer via Framer Motion's `useInView`

**Usage:**
```tsx
import { AnimatedSection } from '@/components/public';

// Basic usage - animates from bottom to top
<AnimatedSection>
  <h1>Welcome to AL FURSAN</h1>
</AnimatedSection>

// With custom direction
<AnimatedSection direction="left">
  <div>Slides in from the right</div>
</AnimatedSection>

// With delay for staggered effect
<AnimatedSection delay={0.2}>
  <div>Appears after 0.2s delay</div>
</AnimatedSection>

// Multiple sections with stagger
<AnimatedSection delay={0}>
  <ServiceCard title="AI Solutions" />
</AnimatedSection>
<AnimatedSection delay={0.1}>
  <ServiceCard title="Web Development" />
</AnimatedSection>
<AnimatedSection delay={0.2}>
  <ServiceCard title="Mobile Apps" />
</AnimatedSection>
```

**Props:**
- `children` (ReactNode, required): The content to animate
- `delay` (number, optional): Delay before animation starts in seconds (default: 0)
- `direction` ('up' | 'down' | 'left' | 'right', optional): Animation direction (default: 'up')
- `className` (string, optional): Additional CSS classes to apply

**Accessibility:**
The component automatically detects the user's motion preferences:
- If `prefers-reduced-motion: reduce` is set, animations are disabled
- Content remains visible and accessible regardless of animation state

## Layout Structure

The public layout is implemented using the following structure:

```
app/layout.tsx (Root Layout)
└── PublicLayoutWrapper
    ├── Header (shown on public pages only)
    ├── main (page content)
    └── Footer (shown on public pages only)
```

The layout automatically detects admin and login routes and excludes the Header and Footer from those pages.

## Styling

All components use Tailwind CSS with the dark theme defined in `app/globals.css`:

- Background: `#0a0a0a`
- Foreground: `#ededed`
- Primary: `#3b82f6` (blue)
- Secondary: `#8b5cf6` (purple)
- Accent: `#06b6d4` (cyan)

The logo uses a gradient from primary → secondary → accent colors for visual appeal.

## Responsive Design

All components are fully responsive:

- **Mobile**: Hamburger menu, stacked layout
- **Tablet**: Transitional layout
- **Desktop**: Full navigation menu, multi-column footer

Breakpoints follow Tailwind's default system:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Accessibility

All components follow accessibility best practices:

- Semantic HTML elements (`<header>`, `<nav>`, `<footer>`, `<main>`)
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Respects `prefers-reduced-motion`

## Future Enhancements

Planned improvements for the public layout:

1. Add search functionality to header
2. Implement breadcrumbs for nested pages
3. Add social media links to footer
4. Implement theme toggle (light/dark mode)
5. Add language switcher for i18n support

