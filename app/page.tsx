import Button from "@/components/Button";
import EditorialHeading from "@/components/EditorialHeading";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Reveal, { RevealItem } from "@/components/motion/Reveal";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";
import Testimonial from "@/components/Testimonial";

export default function HomePage() {
  return (
    <>
      {/* 1 · Hero — atmosphere + choreographed headline */}
      <Hero />

      {/* 2 · Positioning band — petrol alt-section */}
      <SectionShell
        tone="stone"
        marker
        heading="Your competitors’ sites are rented. Yours will be owned."
        accent="owned"        headingSize="lg"
        intro="Every KBC site is built by hand, in code — a bespoke system engineered to perform like the flagship it represents, and to appreciate as something you own outright."
      />

      {/* 3 · Selected work — the transition lives at /work; here it's the invitation */}
      <SectionShell eyebrow="Selected work">
        <Reveal>
          <ProjectCard
            size="feature"
            client="Glowtoure"
            tag="Next.js · Tailwind · Vercel"
            descriptor="A luxury tan, given a luxury home"
            browserUrl="glowtoure.com"
            href="/work"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <Button href="/work" variant="ghost">
              See all work
            </Button>
          </div>
        </Reveal>
      </SectionShell>

      {/* 4 · The difference — petrol alt-section */}
      <SectionShell tone="stone" eyebrow="The difference">
        <Reveal stagger={0.12}>
          <div className="grid gap-x-gutter gap-y-8 lg:grid-cols-2 lg:items-start">
            <RevealItem>
              <EditorialHeading
                as="h2"
                size="lg"
                accent="everything"                className="max-w-[16ch]"
              >
                Senior judgment on everything. Nothing handed to juniors.
              </EditorialHeading>
            </RevealItem>
            <RevealItem>
              <div className="max-w-measure space-y-4 font-sans text-fluid-base leading-relaxed text-ink/70">
                <p>
                  Every design decision, every line of the system, and every word of
                  strategy is mine — directed end to end, delivered at a speed a solo
                  studio otherwise couldn&rsquo;t reach.
                </p>
                <p>
                  You get pixel-perfect implementation of the approved design, revision
                  cycles measured in hours, and genuinely custom code at a price no
                  traditional agency can match.
                </p>
              </div>
            </RevealItem>
          </div>
        </Reveal>
      </SectionShell>

      {/* 5 · Services teaser — four tiers, Signature emphasized */}
      <SectionShell
        eyebrow="The studio"
        heading="Four ways to work together, every one custom-coded."
        headingSize="md"
      >
        <Reveal stagger={0.08}>
          <div className="grid gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <RevealItem>
              <ServiceCard name="Launch" price="$4,500" description="Go to market looking established." />
            </RevealItem>
            <RevealItem>
              <ServiceCard
                name="Signature"
                price="$9,800"
                featured
                description="The flagship. Most brands start here."
              />
            </RevealItem>
            <RevealItem>
              <ServiceCard name="Atelier" price="$22,000+" description="When the site is the flagship location." />
            </RevealItem>
            <RevealItem>
              <ServiceCard
                name="Atelier Custom"
                price="$32,000+"
                description="A bespoke digital flagship."
              />
            </RevealItem>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <Button href="/services" variant="ghost">
              View all services
            </Button>
          </div>
        </Reveal>
      </SectionShell>

      {/* 6 · Proof */}
      <SectionShell eyebrow="Proof">
        <Reveal>
          <Testimonial
            quote="She built us something that finally feels as considered as the work we do."
            name="Founder"
            role="Glowtoure"
          />
        </Reveal>
      </SectionShell>

      {/* 7 · Closing CTA — cream showstopper */}
      <SectionShell
        tone="charcoal"
        marker
        heading="Let’s build something worth owning."
        accent="worth"        headingSize="xl"
      >
        <Button href="/begin" variant="onCharcoal">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
