import Button from "@/components/Button";
import EditorialHeading from "@/components/EditorialHeading";
import Eyebrow from "@/components/Eyebrow";
import ImageFrame from "@/components/ImageFrame";
import ProjectCard from "@/components/ProjectCard";
import SectionShell from "@/components/SectionShell";
import ServiceCard from "@/components/ServiceCard";
import Testimonial from "@/components/Testimonial";

export default function HomePage() {
  return (
    <>
      {/* 1 · Hero — reserves top space for the fixed overlay header */}
      <section className="pb-section pt-32 md:pt-40">
        <div className="container grid items-center gap-x-gutter gap-y-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Eyebrow tone="terracotta">Custom-coded editorial web design</Eyebrow>
            <EditorialHeading
              as="h1"
              size="xl"
              accent="felt"
              accentColor="terracotta"
              className="mt-6 max-w-[19ch] text-balance"
            >
              Websites that are felt before they&rsquo;re read.
            </EditorialHeading>
            <p className="mt-6 max-w-[42ch] font-sans text-lg leading-relaxed text-greige">
              For founder-led beauty, wellness, med-spa, and luxury brands that have
              outgrown a template — and know it.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/begin" variant="primary">
                Begin your project
              </Button>
              <Button href="/work" variant="ghost">
                See the work
              </Button>
            </div>
          </div>
          <ImageFrame
            ratio="4/5"
            offset="down"
            priority
            index="01"
            alt="Krystal Brook Coterie — brand imagery"
            caption="Brand imagery — forthcoming"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </section>

      {/* 2 · Positioning band — petrol alt-section */}
      <SectionShell
        tone="petrol"
        marker
        heading="Your competitors’ sites are rented. Yours will be owned."
        accent="owned"
        accentColor="terracotta"
        intro="Every KBC site is hand-built in code — no page builders, no Squarespace — through an AI-augmented studio that delivers agency-grade engineering at boutique scale."
      />

      {/* 3 · Selected Work — asymmetric, Glowtoure featured largest */}
      <SectionShell eyebrow="Selected work">
        <div className="grid items-end gap-x-gutter gap-y-12 lg:grid-cols-[1.4fr_1fr]">
          <ProjectCard
            size="feature"
            client="Glowtoure"
            tag="Next.js · Tailwind · Vercel"
            descriptor="A luxury tan, given a luxury home"
            href="/work/glowtoure"
          />
          <ProjectCard
            size="side"
            client="In progress"
            tag="Case study"
            descriptor="More, soon"
          />
        </div>
      </SectionShell>

      {/* 3b · Full-bleed band — breaks the contained grid for editorial rhythm */}
      <section aria-label="Studio imagery" className="relative">
        <ImageFrame
          fullBleed
          ratio="16/7"
          index="KBC"
          alt="Krystal Brook Coterie — studio imagery"
          caption="Full-bleed brand film — forthcoming"
          sizes="100vw"
        />
      </section>

      {/* 4 · Services teaser — four tiers, Signature emphasized */}
      <SectionShell
        eyebrow="The studio"
        heading="Four ways to work together, every one custom-coded."
        headingSize="md"
      >
        <div className="grid gap-x-gutter gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          <ServiceCard name="Launch" price="$4,500" description="Go to market looking established." />
          <ServiceCard
            name="Signature"
            price="$9,800"
            featured
            description="The flagship. Most brands start here."
          />
          <ServiceCard name="Atelier" price="$22,000+" description="When the site is the flagship location." />
          <ServiceCard
            name="Atelier Custom"
            price="$32,000+"
            description="A bespoke digital flagship."
          />
        </div>
        <div className="mt-12">
          <Button href="/services" variant="ghost">
            View all services
          </Button>
        </div>
      </SectionShell>

      {/* 5 · The difference — petrol alt-section */}
      <SectionShell tone="petrol" eyebrow="The difference">
        <div className="grid gap-x-gutter gap-y-8 lg:grid-cols-2 lg:items-start">
          <EditorialHeading
            as="h2"
            size="lg"
            accent="everything"
            accentColor="terracotta"
            className="max-w-[16ch]"
          >
            Senior judgment on everything. Nothing handed to juniors.
          </EditorialHeading>
          <div className="max-w-measure space-y-4 font-sans leading-relaxed text-greige">
            <p>
              I direct an AI-augmented build process — so every design decision, every line
              of the system, and every word of strategy is mine, delivered at a speed a solo
              studio otherwise couldn&rsquo;t reach.
            </p>
            <p>
              You get pixel-perfect implementation of the approved design, revision cycles
              measured in hours, and genuinely custom code at a price no traditional agency
              can match.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* 6 · Testimonial (placeholder until real ones arrive) */}
      <SectionShell eyebrow="Proof">
        <Testimonial
          quote="She built us something that finally feels as considered as the work we do."
          name="Founder"
          role="Glowtoure"
        />
      </SectionShell>

      {/* 7 · Closing CTA — cream showstopper */}
      <SectionShell
        tone="cream"
        marker
        heading="Let’s build something worth owning."
        accent="worth"
        accentColor="terracotta"
        headingSize="xl"
      >
        <Button href="/begin" variant="onCream">
          Begin your project
        </Button>
      </SectionShell>
    </>
  );
}
