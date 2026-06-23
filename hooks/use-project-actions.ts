"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

import { toSlug } from "@/lib/utils"

export interface ProjectItem {
  id: string
  name: string
  isOwn: boolean
}

export type DialogType = "create" | "rename" | "delete" | null

function shortId(): string {
  return Math.random().toString(36).slice(2, 8)
}

export interface ProjectActionsState {
  dialogType: DialogType
  selectedProject: ProjectItem | null
  projectName: string
  roomSuffix: string
  isLoading: boolean
}

export interface ProjectActionsHandlers {
  openCreate: () => void
  openRename: (project: ProjectItem) => void
  openDelete: (project: ProjectItem) => void
  close: () => void
  setProjectName: (name: string) => void
  handleCreate: () => Promise<void>
  handleRename: () => Promise<void>
  handleDelete: () => Promise<void>
}

export function useProjectActions(): ProjectActionsState & ProjectActionsHandlers {
  const router = useRouter()
  const pathname = usePathname()

  const [dialogType, setDialogType] = useState<DialogType>(null)
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null)
  const [projectName, setProjectName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [roomSuffix, setRoomSuffix] = useState("")

  function openCreate() {
    setProjectName("")
    setSelectedProject(null)
    setRoomSuffix(shortId())
    setDialogType("create")
  }

  function openRename(project: ProjectItem) {
    setProjectName(project.name)
    setSelectedProject(project)
    setDialogType("rename")
  }

  function openDelete(project: ProjectItem) {
    setSelectedProject(project)
    setDialogType("delete")
  }

  function close() {
    setDialogType(null)
    setSelectedProject(null)
    setProjectName("")
    setRoomSuffix("")
  }

  async function handleCreate() {
    if (!projectName.trim()) return
    setIsLoading(true)
    try {
      const slug = toSlug(projectName)
      const roomId = slug ? `${slug}-${roomSuffix}` : roomSuffix
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName.trim(), id: roomId }),
      })
      if (!res.ok) throw new Error("Failed to create project")
      const { project } = (await res.json()) as { project: { id: string } }
      close()
      router.push(`/editor/${project.id}`)
    } catch {
      // dialog stays open for retry
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRename() {
    if (!selectedProject || !projectName.trim()) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName.trim() }),
      })
      if (!res.ok) throw new Error("Failed to rename project")
      close()
      router.refresh()
    } catch {
      // dialog stays open for retry
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete() {
    if (!selectedProject) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete project")
      const targetId = selectedProject.id
      close()
      if (pathname.includes(targetId)) {
        router.push("/editor")
      } else {
        router.refresh()
      }
    } catch {
      // dialog stays open for retry
    } finally {
      setIsLoading(false)
    }
  }

  return {
    dialogType,
    selectedProject,
    projectName,
    roomSuffix,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    close,
    setProjectName,
    handleCreate,
    handleRename,
    handleDelete,
  }
}
