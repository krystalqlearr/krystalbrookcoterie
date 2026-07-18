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
        accent="owned"
        headingSize="lg"
        intro="The difference is presence. Strategy, art direction, and custom design that make a founder-led brand look as established as it has become — and turn attention into trust, and trust into demand."
      />

      {/* 3 · Selected work — the transition lives at /work; here it's the invitation */}
      <SectionShell eyebrow="Selected work">
        <Reveal>
          <ProjectCard
            size="feature"
            client="Glowtoure"
            tag="Brand Strategy · Art Direction · Web Design · Development"
            descriptor="A luxury service, given the digital experience its pricing demanded."
            browserUrl="glowtoure.com"
            href="/work"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12">
            <Button href="/work" variant="ghost">
              View selected work
            </Button>
          </div>
        </Reveal>
      </SectionShell>

      {/* 4 · The difference — strategy-led, alt-section */}
      <SectionShell tone="stone" eyebrow="The difference">
        <Reveal stagger={0.12}>
          <div className="grid gap-x-gutter gap-y-8 lg:grid-cols-2 lg:items-start">
            <RevealItem>
              <EditorialHeading as="h2" size="lg" accent="follows" className="max-w-[16ch]">
                Strategy leads. Everything else follows.
              </EditorialHeading>
            </RevealItem>
            <RevealItem>
              <div className="max-w-measure space-y-4 font-sans text-fluid-base leading-relaxed text-ink/70">
                <p>
                  Every brand I take on is shaped from its positioning up — who it must
                  move, what it must be trusted for, and where it intends to go. The
                  design serves that strategy; it never chases a trend.
                </p>
                <p>
                  The result is a digital identity that reads established, distinctive,
                  and impossible to confuse with anyone else — one senior mind on every
                  decision, from strategy to the last interaction on screen.
                </p>
              </div>
            </RevealItem>
          </div>
        </Reveal>
      </SectionShell>

      {/* 5 · Services teaser — four tiers, Signature emphasized */}
      <SectionShell
        eyebrow="The studio"
        heading="Four ways to enter the studio."
        headingSize="md"
      >
        <Reveal stagger={0.08}>
          <div className="grid gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <RevealItem>
              <ServiceCard name="The Edit" price="$4,500" description="A refined debut that stops a brand looking new." />
            </RevealItem>
            <RevealItem>
              <ServiceCard
                name="Signature"
                price="$9,800"
                featured
                description="The complete brand website. Most commissioned."
              />
            </RevealItem>
            <RevealItem>
              <ServiceCard name="Atelier" price="$22,000+" description="For brands whose site must carry real authority." />
            </RevealItem>
            <RevealItem>
              <ServiceCard
                name="Private Commission"
                price="$32,000+"
                description="A digital experience built from the ground up."
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
        accent="worth"
        headingSize="xl"
      >
        <Button href="/begin" variant="onCharcoal">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
