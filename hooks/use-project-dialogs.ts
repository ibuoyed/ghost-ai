import { useState } from "react"

export interface MockProject {
  id: string
  name: string
  slug: string
  isOwn: boolean
}

export type DialogType = "create" | "rename" | "delete" | null

export interface ProjectDialogsState {
  dialogType: DialogType
  selectedProject: MockProject | null
  projectName: string
  isLoading: boolean
}

export interface ProjectDialogsActions {
  openCreate: () => void
  openRename: (project: MockProject) => void
  openDelete: (project: MockProject) => void
  close: () => void
  setProjectName: (name: string) => void
  setIsLoading: (value: boolean) => void
}

export function useProjectDialogs(): ProjectDialogsState & ProjectDialogsActions {
  const [dialogType, setDialogType] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null)
  const [projectName, setProjectName] = useState("")
  // TODO: use setIsLoading for async ops
  const [isLoading, setIsLoading] = useState(false)

  function openCreate() {
    setProjectName("")
    setSelectedProject(null)
    setDialogType("create")
  }

  function openRename(project: MockProject) {
    setProjectName(project.name)
    setSelectedProject(project)
    setDialogType("rename")
  }

  function openDelete(project: MockProject) {
    setSelectedProject(project)
    setDialogType("delete")
  }

  function close() {
    setDialogType(null)
    setSelectedProject(null)
    setProjectName("")
    setIsLoading(false)
  }

  return {
    dialogType,
    selectedProject,
    projectName,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    close,
    setProjectName,
    setIsLoading,
  }
}
