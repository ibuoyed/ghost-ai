We need the base chrome components that frame every editor screen - the top nav bar and the left sidebar shell. These will be reused and extended in every chapter that follows.

### Editor Navbar
Create `components/editor/editor-navbar.tsx`.

Requirements:

- Fixed height top navbar
- Left, center, and right sections
- Left section contains sidebar toggle button
- Use `PanelLeftOpen` / `PanelLeftClose` icons based on sidebar state
- Right section stays empty for now
- Dark background, subtle bottom border

### Project Sidebar 

Create `components/editor/project-sidebar.tsx`

Requirements:

- Sidebar should float above the editor canvas
- It should push page content and slides in from the left
- Accepts `isOpen` prop
- Header with` Projects` title + close button
- Shadcn `Tabs`:
    - My Projects
    - Shared
- both tabs show empty placeholder state
- full width `New Project` button at bottom with `Plus` icon


### Dialogue pattern

Use the existing color tokens from `globals.css` for dialogue styling.

Supports:

- title
- description
- footer actions

Do not build actual dialogues yet.

###  Check when done

- new components compile without TypeScript errors
- no lint errors
- dialog pattern is ready for future use 
