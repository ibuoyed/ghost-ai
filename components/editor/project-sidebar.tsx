"use client"

import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
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
            className="flex flex-1 items-center justify-center"
          >
            <p className="text-sm text-copy-muted">No projects yet</p>
          </TabsContent>
          <TabsContent
            value="shared"
            className="flex flex-1 items-center justify-center"
          >
            <p className="text-sm text-copy-muted">No shared projects</p>
          </TabsContent>
        </Tabs>
      </div>

      <div className="shrink-0 border-t border-surface-border p-3">
        <Button variant="outline" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  )
}
