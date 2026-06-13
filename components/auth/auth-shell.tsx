import type { ReactNode } from "react"
import { Cpu, Share2, FileText } from "lucide-react"

const features = [
  {
    icon: Cpu,
    title: "AI Architecture Generation",
    description: "Describe your system, AI maps it to nodes and edges on a live canvas.",
  },
  {
    icon: Share2,
    title: "Real-time Collaboration",
    description:
      "Live cursors, presence indicators, and shared node editing across your team.",
  },
  {
    icon: FileText,
    title: "Instant Spec Generation",
    description:
      "Export a complete Markdown technical spec directly from the canvas graph.",
  },
]

interface AuthShellProps {
  children: ReactNode
}

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen bg-base">
      {/* Left panel — hidden on small screens */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between px-16 py-12 bg-surface border-r border-surface-border relative overflow-hidden">
        {/* Subtle brand glow at bottom-left */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand opacity-[0.06] blur-3xl"
        />

        <div className="relative flex flex-col gap-12">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-md bg-brand" />
            <span className="text-lg font-semibold tracking-tight text-copy-primary">
              Ghost AI
            </span>
          </div>

          {/* Hero */}
          <div>
            <h1 className="text-4xl font-bold leading-tight text-copy-primary mb-4">
              Design systems at the
              <br />
              speed of thought.
            </h1>
            <p className="text-sm text-copy-muted leading-relaxed max-w-sm">
              Describe your architecture in plain English. Ghost AI maps it to a shared
              canvas your whole team can refine in real time.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-6">
            {features.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-dim mt-0.5">
                  <Icon className="h-4 w-4 text-brand" />
                </div>
                <div>
                  <p className="text-sm font-medium text-copy-primary">{title}</p>
                  <p className="text-xs text-copy-muted mt-0.5 leading-relaxed">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <p className="relative text-xs text-copy-faint">
          © 2026 Ghost AI. All rights reserved.
        </p>
      </div>

      {/* Right panel — Clerk form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  )
}
