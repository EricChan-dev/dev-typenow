import { Hero } from "@/components/Hero"
import { Timeline } from "@/components/Timeline"
import { Works } from "@/components/Works"
import { TechStack } from "@/components/TechStack"

export default function Home() {
  return (
    <main>
      <Hero />
      <Timeline />
      <Works />
      <TechStack />
    </main>
  )
}
