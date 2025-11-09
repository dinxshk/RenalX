# Urinalysis Dipstick Test App - Design Guidelines

## Design Approach
**System**: Material Design with medical UI adaptations
**Rationale**: Medical applications require trust, clarity, and established interaction patterns. Material Design provides structured hierarchy and professional appearance essential for healthcare interfaces.

## Typography
- **Primary Font**: Inter or Roboto via Google Fonts CDN
- **Headings**: Semi-bold 600, sizes 24px (h1), 20px (h2), 16px (h3)
- **Body Text**: Regular 400, 14px for general content, 16px for test results
- **Data/Numbers**: Tabular numbers, medium 500 weight for test values
- **Labels**: 12px uppercase, letter-spacing 0.5px for parameter names

## Layout System
**Spacing Units**: Tailwind units of 2, 3, 4, 6, 8, 12
- Section padding: p-6 or p-8
- Card spacing: space-y-4
- Component gaps: gap-3 or gap-4
- Button padding: px-6 py-3

**Container Strategy**:
- Max width: max-w-4xl centered for main content
- Full-width header/navigation
- Cards with rounded-lg borders

## Component Library

### Core Navigation
- **Top Bar**: Fixed header with app title "Urinalysis Test", bordered bottom edge, icons for menu/settings

### Image Upload Section
- **Camera Capture Card**: Large, prominent card with camera icon, "Capture Dipstick Image" primary action
- **File Upload**: Secondary button below capture option
- **Image Preview**: Full-width rounded container displaying uploaded dipstick image with subtle shadow

### Test Results Display
- **Results Grid**: Single column layout with clear sections
- **Parameter Cards**: Each test parameter in bordered card with:
  - Parameter code (L, N, U, etc.) as badge
  - Full parameter name
  - Result value in larger, bold text
  - Status indicator (color-coded icon for normal/abnormal - handled by color later)
- **Card Layout**: p-4 spacing, rounded borders, divide-y for separation

### Action Components
- **Primary Button**: Rounded, px-6 py-3, semi-bold text
- **Secondary Button**: Outlined style, same padding
- **Icon Buttons**: 40px square, rounded

### Data Visualization
- **Test History List**: Card-based timeline showing previous tests with date, thumbnail, and quick results summary
- **Parameter Reference Guide**: Expandable accordion sections explaining each test parameter

### Status Elements
- **Loading States**: Spinner with "Analyzing image..." text
- **Empty States**: Icon + message for no tests conducted yet
- **Error Messages**: Alert cards with icon and clear messaging

## Icons
**Library**: Heroicons via CDN
- Use outline style for navigation and secondary actions
- Use solid style for status indicators and primary actions
- Key icons: camera, upload, check-circle, x-circle, information-circle

## Animations
**Minimal approach**:
- Smooth transitions only on card hover (subtle elevation change)
- Fade-in for results display
- No decorative animations - maintain medical professionalism

## Images
**No hero image** - This is a utility-focused medical application

**Required Images**:
1. **Sample Dipstick Image**: Place provided test strip image (IMG_20251109_102721) in image preview section as default/demo
2. **Icon Placeholders**: Use Heroicons exclusively, no custom imagery needed

## Key UX Patterns
- **Progressive Disclosure**: Show test guide on demand, not cluttering main view
- **Clear CTAs**: Primary action always visible ("Start New Test")
- **Trust Indicators**: Professional medical terminology, clear result labeling
- **Accessibility**: High contrast text, clear labels, keyboard navigation support
- **Mobile-First**: Single column layout, large touch targets (min 44px)

## Critical Layout Priorities
1. Image upload/capture must be immediately accessible
2. Results display in scannable vertical format
3. Pre-configured sample readily available for demo
4. Test history accessible but not competing with primary flow
5. Reference guide present but non-intrusive