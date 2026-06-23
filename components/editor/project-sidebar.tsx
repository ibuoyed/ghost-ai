"use client"

import { Pencil, Plus, Trash2, X } from "lucide-react"

import type { ProjectItem } from "@/hooks/use-project-actions"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { useProjectDialogsContext } from "./project-dialogs-context"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  ownedProjects: ProjectItem[]
  sharedProjects: ProjectItem[]
}

function ProjectListItem({ project }: { project: ProjectItem }) {
  const { openRename, openDelete } = useProjectDialogsContext()

  return (
    <div className="group flex flex-col rounded-xl px-3 py-2 transition-colors hover:bg-subtle">
      <span className="text-sm font-medium text-copy-primary">
        {project.name}
      </span>
      {project.isOwn && (
        <div className="mt-2 flex gap-1.5 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 flex-1 gap-1 text-xs"
            onClick={() => openRename(project)}
          >
            <Pencil className="h-3 w-3" />
            Rename
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 flex-1 gap-1 text-xs text-destructive"
            onClick={() => openDelete(project)}
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
        </div>
      )}
    </div>
  )
}

export function ProjectSidebar({
  isOpen,
  onClose,
  ownedProjects,
  sharedProjects,
}: ProjectSidebarProps) {
  const { openCreate } = useProjectDialogsContext()

  return (
    <aside
      className={cn(
        "fixed bottom-0 left-0 top-12 z-30 flex w-72 flex-col border-r border-surface-border bg-surface transition-transform duration-200 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-11 shrink-0 items-center justify-between border-b border-surface-border px-4">
        <span className="text-sm font-medium text-copy-primary">Projects</span>
        <Button variant="ghost" size="icon-sm" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close sidebar</span>
        </Button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden p-3">
        <Tabs defaultValue="my-projects" className="flex flex-1 flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="my-projects" className="flex-1">
              My Projects
            </TabsTrigger>
            <TabsTrigger value="shared" className="flex-1">
              Shared
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="my-projects"
            className="mt-2 flex flex-1 flex-col gap-0.5 overflow-y-auto"
          >
            {ownedProjects.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-copy-muted">No projects yet</p>
              </div>
            ) : (
              ownedProjects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))
            )}
          </TabsContent>
          <TabsContent
            value="shared"
            className="mt-2 flex flex-1 flex-col gap-0.5 overflow-y-auto"
          >
            {sharedProjects.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-copy-muted">No shared projects</p>
              </div>
            ) : (
              sharedProjects.map((project) => (
                <ProjectListItem key={project.id} project={project} />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="shrink-0 border-t border-surface-border p-3">
        <Button variant="outline" className="w-full gap-2" onClick={openCreate}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
