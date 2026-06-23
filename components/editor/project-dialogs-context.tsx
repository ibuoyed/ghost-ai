"use client"

import { createContext, useContext, type ReactNode } from "react"

import {
  useProjectActions,
  type ProjectActionsState,
  type ProjectActionsHandlers,
} from "@/hooks/use-project-actions"

type ProjectDialogsContextValue = ProjectActionsState & ProjectActionsHandlers

const ProjectDialogsContext = createContext<ProjectDialogsContextValue | null>(null)

export function ProjectDialogsProvider({ children }: { children: ReactNode }) {
  const actions = useProjectActions()

  return (
    <ProjectDialogsContext.Provider value={actions}>
      {children}
    </ProjectDialogsContext.Provider>
  )
}

export function useProjectDialogsContext(): ProjectDialogsContextValue {
  const ctx = useContext(ProjectDialogsContext)
  if (!ctx) {
    throw new Error("useProjectDialogsContext must be used within ProjectDialogsProvider")
  }
  return ctx
}
