import { notFound } from "next/navigation"
import { projects } from "@/content/projects"
import { ProjectDetail } from "@/components/ProjectDetail"

export const dynamicParams = false

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.name} · 陈应帅`,
    description: project.tagline,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  return (
    <main>
      <ProjectDetail
        project={projects[index]}
        index={index + 1}
        total={projects.length}
      />
    </main>
  )
}
