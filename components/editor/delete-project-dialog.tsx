"use client"

import { Button } from "@/components/ui/button"

import { EditorDialog } from "./editor-dialog"
import { useProjectDialogsContext } from "./project-dialogs-context"

export function DeleteProjectDialog() {
  const { dialogType, selectedProject, isLoading, handleDelete, close } =
    useProjectDialogsContext()

  return (
    <EditorDialog
      open={dialogType === "delete"}
      onOpenChange={(open) => {
        if (!open) close()
      }}
      title="Delete project"
      description={
        selectedProject
          ? `Are you sure you want to delete "${selectedProject.name}"? This action cannot be undone.`
          : undefined
      }
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete
          </Button>
        </>
      }
    />
  )
}
