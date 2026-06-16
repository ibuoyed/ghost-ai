Prisma is already installed. At the project data models, Prisma client singleton and first migration.

## Models

Create `Prisma/models/project.prisma`

Add `Project`:

- owner ID mapped to Clerk user
- name
- optional description
- status enum: `Draft`, `ARCHIVED`
- `CanvasJsonPath` for future canvas blob storage
- time stamps
- index on owner ID and creation date

 
 Add `ProjectCollaborator`: 

 - project relation with cascade delete
 - collaborator email
 - creation timestamp
 - unique constraint on project/email 
 - index on email and project/date 

 Do not add extra fields unless required by Prisma 

 ## Prisma CLient 

 Create `lib/prisma.ts` as a cached singleton.

 Branch by `DATABASE_URL`:

 - if it starts with `prisma+postgres://`, use Accelerate
 - otherwise use direct `@prisma/adapter-pg`

 cache the client on `global` in development for hot reloads.

 ## Migration 

 Run the migration and generate the client 

 ## Dependencies

 ALready installed:

 - `prisma`
 - `@prisma/client`
 - `@prisma/adapter-pg`
 - `pg`

 ## Check When Done

 - schema has both models with corect relations and indexes
 - `lib/prisma.ts` exports one cached Prisma instance
 - migration runs successfully 
 - `npm run build` passes

 