"use client"

import type { KeyboardEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { EditorDialog } from "./editor-dialog"
import { useProjectDialogsContext } from "./project-dialogs-context"

export function RenameProjectDialog() {
  const {
    dialogType,
    selectedProject,
    projectName,
    isLoading,
    setProjectName,
    handleRename,
    close,
  } = useProjectDialogsContext()

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && projectName.trim()) {
      void handleRename()
    }
  }

  return (
    <EditorDialog
      open={dialogType === "rename"}
      onOpenChange={(open) => {
        if (!open) close()
      }}
      title="Rename project"
      description={
        selectedProject ? `Renaming "${selectedProject.name}"` : undefined
      }
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleRename}
            disabled={!projectName.trim() || isLoading}
          >
            Rename
          </Button>
        </>
      }
    >
      <Input
        placeholder="Project name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
    </EditorDialog>
  )
}
