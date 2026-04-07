# Shared UI Components

Reusable UI components styled with Tailwind CSS and dark theme for AL FURSAN Technologies website.

## Components

### Button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' (default: 'primary')
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `isLoading`: boolean (default: false) - Shows loading spinner
- All standard HTML button attributes

**Usage:**
```tsx
import { Button } from '@/components/shared';

<Button variant="primary" size="md">
  Click Me
</Button>

<Button variant="outline" isLoading>
  Submitting...
</Button>
```

### Input

A form input component with label, error, and helper text support.

**Props:**
- `label`: string - Input label
- `error`: string - Error message to display
- `helperText`: string - Helper text below input
- All standard HTML input attributes

**Usage:**
```tsx
import { Input } from '@/components/shared';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  required
/>

<Input
  label="Name"
  error="Name is required"
/>

<Input
  label="Phone"
  helperText="Include country code"
/>
```

### Modal

A modal dialog component with focus trap and keyboard navigation.

**Props:**
- `isOpen`: boolean - Controls modal visibility
- `onClose`: () => void - Callback when modal closes
- `title`: string - Modal title
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `showCloseButton`: boolean (default: true)
- `children`: React.ReactNode - Modal content

**Features:**
- Escape key to close
- Click outside to close
- Focus trap (Tab navigation stays within modal)
- Prevents body scroll when open
- Accessible with ARIA attributes

**Usage:**
```tsx
import { Modal } from '@/components/shared';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Action"
  size="md"
>
  <p>Are you sure you want to proceed?</p>
  <div className="flex gap-2 mt-4">
    <Button onClick={() => setIsOpen(false)}>Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </div>
</Modal>
```

### LoadingSpinner

A loading spinner component with customizable size and color.

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `color`: 'primary' | 'secondary' | 'white' | 'accent' (default: 'primary')
- `text`: string - Optional loading text
- `fullScreen`: boolean (default: false) - Shows as full-screen overlay

**Usage:**
```tsx
import { LoadingSpinner } from '@/components/shared';

<LoadingSpinner size="md" color="primary" />

<LoadingSpinner
  size="lg"
  color="accent"
  text="Loading data..."
/>

<LoadingSpinner fullScreen text="Please wait..." />
```

## Dark Theme Colors

All components use the following CSS variables defined in `app/globals.css`:

- `--background`: #0a0a0a
- `--foreground`: #ededed
- `--primary`: #3b82f6
- `--primary-dark`: #2563eb
- `--secondary`: #8b5cf6
- `--accent`: #06b6d4
- `--muted`: #1f1f1f
- `--border`: #2a2a2a
- `--card`: #141414
- `--card-hover`: #1a1a1a

## Accessibility

All components follow accessibility best practices:

- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Focus indicators
- Screen reader friendly
- Color contrast compliance
