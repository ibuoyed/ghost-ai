# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Feature 04 — Project Dialogs complete. Ready for next feature unit.

## Current Goal

- Define the next feature to implement.

## Completed

- 01 Design System — shadcn/ui configured (Tailwind v4), dark theme CSS variables in globals.css, Button/Card/Dialog/Input/Tabs/Textarea/ScrollArea installed, lib/utils.ts cn() helper, lucide-react installed, dark class on html element.
- 02 Editor Shell — EditorNavbar (fixed top bar, sidebar toggle with PanelLeftOpen/PanelLeftClose), ProjectSidebar (fixed floating overlay, slides in from left, My Projects / Shared tabs, New Project button), EditorDialog (base pattern component for title + description + footer actions, rounded-3xl, project color tokens).
- 03 Auth — ClerkProvider wraps root layout with dark theme and CSS variable overrides (no hardcoded colors). proxy.ts at root defines public routes via NEXT_PUBLIC_CLERK_SIGN_IN_URL / NEXT_PUBLIC_CLERK_SIGN_UP_URL env vars and protects everything else. Sign-in and sign-up pages use two-panel layout (left: logo + tagline + feature list; right: Clerk form; small screens: form only). Root / redirects authenticated users to /editor and unauthenticated users to /sign-in. UserButton added to EditorNavbar right section.
- 04 Project Dialogs — editor home screen (centered heading + description + New project button). useProjectDialogs hook (dialog/form/load state). ProjectDialogsProvider (React context, no circular imports). Three dialogs: CreateProjectDialog (name input + live slug preview), RenameProjectDialog (pre-filled name, description shows current name, autofocus, Enter submits), DeleteProjectDialog (destructive confirm, no input). ProjectSidebar updated with mock projects (2 own, 1 shared), hover-reveal Rename/Delete actions (flex-1 wide, own-only), New Project button wired. Mobile backdrop scrim (z-20, md:hidden) in EditorShell closes sidebar on tap. All wirings connected via context.

## In Progress

- None.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- All color tokens defined as CSS custom properties in globals.css and mapped to Tailwind utilities via @theme inline. shadcn/ui CSS variables aligned to project dark theme. No light mode — dark values set in :root directly, html element carries `dark` class for shadcn compatibility.
- Editor shell uses fixed positioning: Navbar at z-40, ProjectSidebar at z-30 (floating overlay above canvas content, below navbar). Sidebar slides in via translate-x transition.
- Next.js 16 uses proxy.ts (not middleware.ts) as the middleware entry point. Clerk route protection is configured there via clerkMiddleware + createRouteMatcher.
- ClerkProvider lives in app/layout.tsx (root). Appearance uses @clerk/ui/themes dark + CSS variable overrides — no hardcoded hex values in appearance config.
- Dialog state is managed in hooks/use-project-dialogs.ts (useProjectDialogs hook) and shared via ProjectDialogsProvider in components/editor/project-dialogs-context.tsx. Dialog components (create/rename/delete) import from the context file, not from each other — avoids circular imports. EditorShell renders all three dialog components inside the provider tree.

## Session Notes

- globals.css is the single source of truth for all color tokens. shadcn components in components/ui/ must not be modified. Project-level overrides go in app-level components. Tailwind utility names: bg-base, bg-surface, bg-elevated, bg-subtle, text-copy-primary, text-copy-secondary, text-copy-muted, text-copy-faint, border-surface-border, text-brand, bg-brand-dim, text-ai, text-ai-text.
- EditorDialog in components/editor/editor-dialog.tsx is the base dialog pattern. Actual dialog instances (e.g. New Project, Confirm Delete) extend it — do not modify the shadcn Dialog primitives.
- Clerk Variables API (from @clerk/ui): colorForeground, colorMutedForeground, colorInput, colorInputForeground — not colorText, colorTextSecondary, colorInputBackground, colorInputText.
- MockProject interface lives in hooks/use-project-dialogs.ts and is imported by the sidebar. Mock data (MOCK_PROJECTS array) lives in project-sidebar.tsx only — not in the hook. The hook holds no data, only state shape.
- The mobile backdrop scrim sits at z-20 in EditorShell (below sidebar z-30, below navbar z-40) and is hidden on md+ screens via md:hidden. It is rendered conditionally when sidebarOpen is true.
