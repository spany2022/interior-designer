import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { Cursor } from "@/components/site/Cursor";
import { Loader } from "@/components/site/Loader";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Philosophy } from "@/components/site/Philosophy";
import { Transformation } from "@/components/site/Transformation";
import { Services } from "@/components/site/Services";
import { Materials } from "@/components/site/Materials";
import { Projects } from "@/components/site/Projects";
import { Process } from "@/components/site/Process";
import { Studio } from "@/components/site/Studio";
import { Testimonials } from "@/components/site/Testimonials";
import { Journal } from "@/components/site/Journal";
import { Consultation } from "@/components/site/Consultation";
import { Footer } from "@/components/site/Footer";

const TITLE = "Atelier Terra — Interior Architecture & Design Studio";
const DESC =
  "From empty space to timeless living. Atelier Terra designs residential, villa, hospitality and commercial interiors shaped by light, material and craft.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="no-cursor grain-overlay">
      <SmoothScroll />
      <Loader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Transformation />
        <Services />
        <Materials />
        <Projects />
        <Process />
        <Studio />
        <Testimonials />
        <Journal />
        <Consultation />
      </main>
      <Footer />
    </div>
  );
}
