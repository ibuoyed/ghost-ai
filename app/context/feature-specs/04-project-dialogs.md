## Goal- Preview updates as the user types
Build the `/editor` home screen and add project dialog/sidebar actions. No API calls or persistence yet.
## Editor Home 

Reuse existing editor layout. Do not modify the nav bar or sidebar behavior.

In the center of the page, add:

- Heading: `create a project or open an existing one`
- Description: `start a new architecture workspace, or choose a project from the sidebar.`
- `New project` button with a `Plus` icon

Keep layout minimal. Do not wrap this content in cards. 

Clicking `New Project` should open the Create Project dialog. 

## Dialogs 

### Create project

- Project name input
- Live slug preview based on the name
- Preview updates of the user types


### Rename project
- Prefer project name input
- Current project name shown in the description
- Input autofocuses
- Enter submits


## Delete project

- Destructive confirmation only
- No input
- Confirm button uses destructive styling

## Sidebar

Add project items:

- rename 
- delete

Show actions only for own projects.

Hide actions for shared/collaborator projects.

On mobile:

- tapping outside the sidebar closes it
- add a backdrop scrim


## implementation

Create a dedicated hook to manage:

- dialog state- form state
- load state

Wire:
- editor home > `new project` create dialog
- sidebar create > create dialog
- sidebar rename > rename dialog
- sidebar delete > delete dialog


Use mock project data only. Do not add API calls or persistence.

## check when done:

- sidebar actions are wide
- slug preview works
- no TypeScript errors
- no lint errors