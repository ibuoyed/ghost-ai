import { auth, currentUser } from "@clerk/nextjs/server"

import { prisma } from "@/lib/prisma"

export async function getEditorProjects(): Promise<{
  ownedProjects: { id: string; name: string; isOwn: true }[]
  sharedProjects: { id: string; name: string; isOwn: false }[]
}> {
  const { userId } = await auth()
  if (!userId) return { ownedProjects: [], sharedProjects: [] }

  const owned = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  })

  const user = await currentUser()
  const email = user?.emailAddresses?.[0]?.emailAddress

  let sharedProjects: { id: string; name: string; isOwn: false }[] = []
  if (email) {
    const collaborations = await prisma.projectCollaborator.findMany({
      where: { email },
      select: { project: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    })
    sharedProjects = collaborations.map((c) => ({ ...c.project, isOwn: false as const }))
  }

  return {
    ownedProjects: owned.map((p) => ({ ...p, isOwn: true as const })),
    sharedProjects,
  }
}
