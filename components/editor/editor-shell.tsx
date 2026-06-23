"use client"

import { useState } from "react"

import type { ProjectItem } from "@/hooks/use-project-actions"

import { CreateProjectDialog } from "./create-project-dialog"
import { DeleteProjectDialog } from "./delete-project-dialog"
import { EditorNavbar } from "./editor-navbar"
import { ProjectDialogsProvider } from "./project-dialogs-context"
import { ProjectSidebar } from "./project-sidebar"
import { RenameProjectDialog } from "./rename-project-dialog"

interface EditorShellProps {
  children: React.ReactNode
  ownedProjects: ProjectItem[]
  sharedProjects: ProjectItem[]
}

export function EditorShell({
  children,
  ownedProjects,
  sharedProjects,
}: EditorShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ProjectDialogsProvider>
      <div className="flex h-screen flex-col bg-base">
        <EditorNavbar
          isSidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <ProjectSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ownedProjects={ownedProjects}
          sharedProjects={sharedProjects}
        />
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-base/60 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <main className="flex flex-1 overflow-hidden pt-12">{children}</main>
        <CreateProjectDialog />
        <RenameProjectDialog />
        <DeleteProjectDialog />
      </div>
    </ProjectDialogsProvider>
  )
}
