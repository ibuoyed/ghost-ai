import { NewProjectButton } from "@/components/editor/new-project-button"

export default function EditorPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-semibold text-copy-primary">
          create a project or open an existing one
        </h1>
        <p className="text-sm text-copy-muted">
          start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
      </div>
      <NewProjectButton />
    </div>
  )
}
