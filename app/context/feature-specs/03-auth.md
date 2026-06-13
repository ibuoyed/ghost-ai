
Clerk is already installed and connected. Wire it into the Next.js app: provider, auth pages, redirects, root-protection, and user menu.

## Design 

Use Clerk's `dark `theme from `@clerk/ui/themes` as the base. 

Override Clerk appearance variables using app's CSS variables. Do not hard code colors. 


### Sign-in and Sign-up Pages:

- Large screens: simple two panel layout
- Left: compact logo, tagline, short text only feature list
- Right: centered clerk form
- Small screens: form only
- No gradients
- No oversized hero sections
- No feature cards
- No scroll-heavy layouts

Keep the layout minimal and professional.

## implementation
Wrap the root layout with `ClerkProvider` using `clerks` theme.

Create sign in and sign up pages using Clerk components.

Open `proxy.ts` at the project root, not `middleware.ts`.

Define public routes using existing sign in and sign up env vars.

Protect everything else by default.

Update `/`:

-Authenticated users redirect to `/editor`.
-Authenticated users redirect to `/sign in` 

Add Clerk's built-in `Userbutton` to the editor navbar right section for profile settings and log out.

Keep Clerk's default user menu and profile flows intact.Do not build or heavily customize Clerk's internals.

Use existing Clerk env vars. Do not rename or invent new ones. 


## dependencies

install: @clerk/ui.

## check when done

- `proxy.ts` exists at the root. 
- all routes are protected except public auth paths.
- auth pages use CSS variables with no hardcoded colors.
- `ClerkProvider` wraps the route layout.
- `npm run build` passes.