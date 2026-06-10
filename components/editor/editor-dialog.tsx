"use client"

import type { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface EditorDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  description?: string
  children?: ReactNode
  footer?: ReactNode
}

export function EditorDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: EditorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl border border-surface-border bg-elevated">
        <DialogHeader>
          <DialogTitle className="text-copy-primary">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-copy-muted">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
