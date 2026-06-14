"use client"

import { createContext, useContext, type ReactNode } from "react"

import {
  useProjectDialogs,
  type ProjectDialogsState,
  type ProjectDialogsActions,
} from "@/hooks/use-project-dialogs"

type ProjectDialogsContextValue = ProjectDialogsState & ProjectDialogsActions

const ProjectDialogsContext = createContext<ProjectDialogsContextValue | null>(null)

export function ProjectDialogsProvider({ children }: { children: ReactNode }) {
  const dialogs = useProjectDialogs()

  return (
    <ProjectDialogsContext.Provider value={dialogs}>
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
