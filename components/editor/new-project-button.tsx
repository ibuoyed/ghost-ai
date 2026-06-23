"use client"

import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useProjectDialogsContext } from "./project-dialogs-context"

export function NewProjectButton() {
  const { openCreate } = useProjectDialogsContext()

  return (
    <Button onClick={openCreate} className="gap-2">
      <Plus className="h-4 w-4" />
      New project
    </Button>
  )
}
