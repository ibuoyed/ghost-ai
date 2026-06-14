"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { EditorDialog } from "./editor-dialog"
import { useProjectDialogsContext } from "./project-dialogs-context"

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function CreateProjectDialog() {
  const { dialogType, projectName, isLoading, setProjectName, close } =
    useProjectDialogsContext()

  const slug = toSlug(projectName)

  function handleCreate() {
    close()
  }

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
            slug:{" "}
            <span className="text-copy-secondary">{slug || "—"}</span>
          </p>
        )}
      </div>
    </EditorDialog>
  )
}
