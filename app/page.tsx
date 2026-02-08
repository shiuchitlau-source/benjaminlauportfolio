import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { ProjectGrid } from "@/components/project-grid";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <ProjectGrid />
      <About />
      <Footer />
    </main>
  );
}
