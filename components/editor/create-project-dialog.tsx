"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toSlug } from "@/lib/utils"

import { EditorDialog } from "./editor-dialog"
import { useProjectDialogsContext } from "./project-dialogs-context"

export function CreateProjectDialog() {
  const {
    dialogType,
    projectName,
    roomSuffix,
    isLoading,
    setProjectName,
    handleCreate,
    close,
  } = useProjectDialogsContext()

  const slug = toSlug(projectName)
  const roomId = slug ? `${slug}-${roomSuffix}` : roomSuffix

  return (
    <EditorDialog
      open={dialogType === "create"}
      onOpenChange={(open) => {
        if (!open) close()
      }}
      title="Create project"
      description="Give your architecture workspace a name."
      footer={
        <>
          <Button variant="outline" onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={!projectName.trim() || isLoading}
          >
            Create
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          autoFocus
        />
        {projectName && (
          <p className="font-mono text-xs text-copy-muted">
            room:{" "}
            <span className="text-copy-secondary">{roomId || "—"}</span>
          </p>
        )}
      </div>
    </EditorDialog>
  )
}
