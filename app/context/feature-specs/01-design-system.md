Read `AGENTS.md` before starting. 

We're adding the design system and UI primitive components. 

Install and configure `shadcn/ui`.

Add these shadcn components:

- Button
- Card
- Dialogue
- Input
- Tabs
- Textarea
- ScrollArea

Do not modify the generated `components/ui/*` files after installation.

Also install `lucid-react`.

Create `libutils.ts` with a reusable `cn() `helper for merging tailwind classes.

Ensure all components match the existing dark theme in `global.css`. 

### check when done:

- All components import without errors
- `cn()` works properly
- No default light styling appears