# KBC copy deck
_Every line a visitor reads, in one place. Rewrite in the "New" column; leave "(keep)" to keep a line, "(cut)" to remove it. Register per slot is a note, not a rule._

## Register (from CLAUDE.md, current)
- Fewest true declarative words; no adjective that sells (never: elevated, bespoke, intentional, curated, timeless unless specific).
- Outcome before deliverable; frame work as the shift created.
- Nomenclature: commission / engagement, never "package". Nav CTA = Commission.
- Never name competitors. Never mention AI anywhere except the one /services FAQ.
- Headings: sentence case, end in a period, Light weight. Meta labels are the only uppercase.
- The homepage h1 must contain "websites" or "web design" (search).

How to read a row: `slot` is a short name; `file` is where the line lives (path:line); `current` is the exact text as rendered today (curly quotes and dashes are the real characters); `notes` gives the register and a rough length; `new` is yours. A `{…}` inside `current` is a value filled in from data (see `## Data`) — rewrite the words around it, not the braces. Where a heading has an `accent` word, that word renders in the flare; keep the new accent as a substring of the new heading.

---

## / (Home)
Page order: landing → work frame → two concepts → studio line (h1) → ways in → sectors marquee → closing line → footer. The work frame itself (its labels, "Close", "The work", "Scope", etc.) is shared with /work and listed once under `## Shared › Work frame`.

### Landing
| slot | file | current | notes | new |
|---|---|---|---|---|
| name | components/motion/LandingWordmark.tsx:161 | krystal brook coterie | lowercase; do not change. This is the reduced-motion band (the only version a screen reader can hit; the animated copy at :179 and :188 is aria-hidden and identical) | (keep) |

### Work
| slot | file | current | notes | new |
|---|---|---|---|---|
| section label | app/page.tsx:57 | Selected work | aria-label on the section, screen readers only, 1–3 words | (keep) |
| feature frame | app/page.tsx:59 | {Glowtoure frame — see Shared › Work frame and Data › Glowtoure} | renders index `01 / 03 — Glowtoure` then the descriptor beneath | (keep) |
| concept 2 index | app/page.tsx:67 | 02 / 03 — {client} | meta; auto-formatted from data (client = Maison Dermé) | (keep) |
| concept 2 status | app/page.tsx:68 | {status} | meta, 1–2 words; currently "In production" (Data) | (keep) |
| concept 2 descriptor | app/page.tsx:70 | {descriptor} | body, ≤ 12 words; see Data › Maison Dermé | (keep) |
| concept 3 index | app/page.tsx:67 | 03 / 03 — {client} | meta; client = Étoile Atelier | (keep) |
| concept 3 status | app/page.tsx:68 | {status} | meta; currently "Concept" | (keep) |
| concept 3 descriptor | app/page.tsx:70 | {descriptor} | body, ≤ 12 words; see Data › Étoile Atelier | (keep) |

### The studio line
| slot | file | current | notes | new |
|---|---|---|---|---|
| h1 | app/page.tsx:83 | Websites for brands that don’t need to explain themselves. | h1, ≤ 9 words, needs "websites" or "web design", ends in a period | (keep) |

### Ways in
| slot | file | current | notes | new |
|---|---|---|---|---|
| h2 | app/page.tsx:93 | Ways in | meta label, 1–3 words | (keep) |
| tier 1 name | app/page.tsx:41 | The Edit | tier name — must match /services (app/services/page.tsx:20) | (keep) |
| tier 1 price | app/page.tsx:41 | $4,500 | price — must match /services | (keep) |
| tier 1 duration | app/page.tsx:41 | 2–3 weeks | meta, 2–3 words — must match /services | (keep) |
| tier 2 name | app/page.tsx:42 | Signature | tier name — must match /services | (keep) |
| tier 2 price | app/page.tsx:42 | $9,800 | price | (keep) |
| tier 2 duration | app/page.tsx:42 | 6–8 weeks | meta | (keep) |
| tier 2 flag | app/page.tsx:42 | Most commissioned | meta flag, 1–2 words; also at app/services/page.tsx:139 | (keep) |
| tier 3 name | app/page.tsx:43 | Atelier | tier name | (keep) |
| tier 3 price | app/page.tsx:43 | $22,000+ | price | (keep) |
| tier 3 duration | app/page.tsx:43 | 8–12 weeks | meta | (keep) |
| tier 4 name | app/page.tsx:44 | Private Commission | tier name | (keep) |
| tier 4 price | app/page.tsx:44 | $32,000+ | price | (keep) |
| tier 4 duration | app/page.tsx:44 | Scoped to the work | meta, 2–4 words. NOTE: /services says "Custom timeline" for the same tier (app/services/page.tsx:49) — pick one | (keep) |
| CTA | app/page.tsx:109 | The engagements | ArrowLink label (→ to /services), meta, 1–3 words | (keep) |

### Sectors (marquee)
The whole band is aria-hidden (decorative) — screen readers never hear it. Items separated by a ✳ glyph (components/Marquee.tsx:50, decorative).
| slot | file | current | notes | new |
|---|---|---|---|---|
| sector 1 | app/page.tsx:29 | Beauty | marquee item, 1–2 words | (keep) |
| sector 2 | app/page.tsx:30 | Med-spa | marquee item | (keep) |
| sector 3 | app/page.tsx:31 | Wellness | marquee item | (keep) |
| sector 4 | app/page.tsx:32 | Bridal | marquee item | (keep) |
| sector 5 | app/page.tsx:33 | Luxury lifestyle | marquee item | (keep) |
| sector 6 | app/page.tsx:34 | Aesthetics | marquee item | (keep) |
| sector 7 | app/page.tsx:35 | Founder-led | marquee item | (keep) |

### The closing line
| slot | file | current | notes | new |
|---|---|---|---|---|
| closing line | app/page.tsx:124 | Ready when you are. | display-size body line, ≤ 6 words. Same words are the /process dark CTA heading (app/process/page.tsx:99) | (keep) |
| CTA | app/page.tsx:126 | Commission | ArrowLink label (↗ to /begin), meta, 1–2 words | (keep) |

---

## /work
### Metadata
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/work/page.tsx:8 | Work | page title; renders as "Work — Krystal Brook Coterie" | (keep) |
| description | app/work/page.tsx:10 | The work speaks first. Selected identities and digital experiences created for brands with a clear point of view — and the ambition to build something people remember. | meta description, ≤ 155 chars ideal (this is 168) | (keep) |

### Opener
| slot | file | current | notes | new |
|---|---|---|---|---|
| marker | app/work/page.tsx:17 | Work | giant vertical decorative word, aria-hidden, 1 word | (keep) |
| eyebrow | app/work/page.tsx:19 | Selected work | meta label, 1–3 words | (keep) |
| h1 | app/work/page.tsx:21 | The work speaks first. | h1, ≤ 6 words, ends in a period | (keep) |
| intro | app/work/page.tsx:24–25 | Selected identities and digital experiences created for brands with a clear point of view — and the ambition to build something people remember. | intro, ≤ 30 words | (keep) |

### The index
Renders all three projects as the editorial grid. Each card shows: client (meta), "View →" on hover, `{index} · {category}`, `{status}`, the descriptor (h3, accent word in flare) and the capabilities line. Chrome + labels are in Shared › Work frame; the words are in Data.
| slot | file | current | notes | new |
|---|---|---|---|---|
| card meta | components/WorkShowcase.tsx:377 | {index} · {category} | auto-formatted from data, e.g. "01 · Beauty · Self-tan" | (keep) |
| card status | components/WorkShowcase.tsx:379 | {status} | meta; only for non-live projects | (keep) |
| card title | components/WorkShowcase.tsx:382 | {descriptor} | h3; see Data | (keep) |
| card capabilities | components/WorkShowcase.tsx:384 | {capabilities} | meta line; see Data | (keep) |

### Closing
| slot | file | current | notes | new |
|---|---|---|---|---|
| CTA | app/work/page.tsx:36 | Commission a project | ArrowLink label (↗ to /begin), meta, 2–4 words | (keep) |

---

## /work/[slug] (case study — currently only /work/glowtoure)
### Metadata + structured data
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/work/[slug]/page.tsx:22 | {client} — {descriptor} | page title template; renders "Glowtoure — A luxury service, given the digital experience its pricing demanded. — Krystal Brook Coterie" | (keep) |
| description | app/work/[slug]/page.tsx:20 | {seoDescription, else intro} | meta description; see Data › Glowtoure › seoDescription | (keep) |
| OG title | app/work/[slug]/page.tsx:26 | {client} — Krystal Brook Coterie | share-card title template | (keep) |
| JSON-LD name | app/work/[slug]/page.tsx:57 | {client} — {descriptor} | structured data, invisible; mirrors title | (keep) |
| JSON-LD creator | app/work/[slug]/page.tsx:65 | Krystal Brook Coterie | structured data; brand name | (keep) |

### Header
| slot | file | current | notes | new |
|---|---|---|---|---|
| back link | app/work/[slug]/page.tsx:85 | ← All work | meta link, 1–3 words after the arrow | (keep) |
| category | app/work/[slug]/page.tsx:88 | {category} | meta; see Data | (keep) |
| h1 | app/work/[slug]/page.tsx:91 | {descriptor} | h1; the `accent` phrase renders in italic here; see Data | (keep) |

### Hero frame
| slot | file | current | notes | new |
|---|---|---|---|---|
| address pill | app/work/[slug]/page.tsx:109 | {url} | browser-chrome address; see Data (glowtoure.com) | (keep) |
| hero image alt | app/work/[slug]/page.tsx:116 | {client} — {descriptor} | alt text, auto-built; describe the image if rewriting (it is the Glowtoure homepage screenshot) | (keep) |

### Overview + meta
| slot | file | current | notes | new |
|---|---|---|---|---|
| intro | app/work/[slug]/page.tsx:136 | {intro} | display-size lead, ≤ 45 words; see Data | (keep) |
| body | app/work/[slug]/page.tsx:139–141 | {body[0..n]} | body paragraphs, first gets a drop cap; see Data | (keep) |
| dl label 1 | app/work/[slug]/page.tsx:150 | Client | meta label, 1 word | (keep) |
| dl label 2 | app/work/[slug]/page.tsx:151 | Role | meta label, 1 word | (keep) |
| dl label 3 | app/work/[slug]/page.tsx:152 | Year | meta label, 1 word | (keep) |
| dl label 4 | app/work/[slug]/page.tsx:153 | Stack | meta label, 1 word | (keep) |

### Results (only when the project has results)
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/work/[slug]/page.tsx:167 | Results | meta label, 1 word | (keep) |
| heading | app/work/[slug]/page.tsx:167 | Engineered to perform. | h2, ≤ 5 words, ends in a period | (keep) |
| result rows | app/work/[slug]/page.tsx:172–173 | {label} / {value} | meta label over display figure; see Data › Glowtoure › results | (keep) |

### Scope
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/work/[slug]/page.tsx:182 | Scope | meta label, 1 word | (keep) |
| heading | app/work/[slug]/page.tsx:182 | What the engagement covered. | h2, ≤ 6 words | (keep) |
| scope items | app/work/[slug]/page.tsx:188 | {scope[]} | list items, 1–4 words each; see Data | (keep) |

### Proof (only when a testimonial exists — none today)
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/work/[slug]/page.tsx:197 | Proof | meta label, 1 word; section hidden until a real approved quote exists | (keep) |
| quote / name / role | components/Testimonial.tsx:64–68 | {quote} — {name} — {role} | display quote + meta credit; data-driven, none set | (keep) |

### CTA (dark)
| slot | file | current | notes | new |
|---|---|---|---|---|
| heading | app/work/[slug]/page.tsx:211 | Let’s build something worth owning. | h2 xl, ≤ 7 words, accent word = "worth". Same line on /services:206 | (keep) |
| button | app/work/[slug]/page.tsx:218 | Begin your project | button label, 2–4 words | (keep) |
| next link (has next) | app/work/[slug]/page.tsx:224 | Next — {client} | meta link template; only when another case study is published | (keep) |
| next link (no next) | app/work/[slug]/page.tsx:224 | See all work | meta link, 2–3 words; what shows today | (keep) |

---

## /services
### Metadata
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/services/page.tsx:13 | Services | page title | (keep) |
| description | app/services/page.tsx:15 | Four custom-coded tiers — The Edit, Signature, Atelier, Private Commission — plus ongoing Care Plans. Agency-grade engineering at boutique scale. | meta description, ≤ 155 chars (this is 148) | (keep) |

### Opener
| slot | file | current | notes | new |
|---|---|---|---|---|
| marker | app/services/page.tsx:110 | Services | decorative vertical word, aria-hidden | (keep) |
| eyebrow | app/services/page.tsx:111 | Services | meta label | (keep) |
| h1 | app/services/page.tsx:112 | A different level of presence. | h1, ≤ 6 words, accent word = "presence" | (keep) |
| intro | app/services/page.tsx:114 | Four ways to enter the studio. Every engagement is strategically led, visually distinct, and built around where your brand is now — and where it intends to go next. | intro, ≤ 35 words | (keep) |

### The tiers
Each tier renders as: index (01 / 04), price, duration, [flag], name (h3), description, best-for line, and an ArrowLink "Commission {name}".
| slot | file | current | notes | new |
|---|---|---|---|---|
| tier 1 name | app/services/page.tsx:20 | The Edit | h3 tier name — must match Home :41 | (keep) |
| tier 1 price | app/services/page.tsx:21 | $4,500 | price — must match Home | (keep) |
| tier 1 duration | app/services/page.tsx:22 | 2–3 weeks | meta — must match Home | (keep) |
| tier 1 description | app/services/page.tsx:24 | A focused digital debut for brands ready to stop looking new. Strategic direction, custom design, and a polished online presence built to establish credibility from the first click. | body, ≤ 40 words | (keep) |
| tier 1 best for | app/services/page.tsx:26 | Best for emerging brands, focused offers, and founders who need a refined foundation without an expansive build. | small body, ≤ 25 words | (keep) |
| tier 1 CTA | app/services/page.tsx:150 | Commission The Edit | ArrowLink, auto-built as "Commission {name}" | (keep) |
| tier 2 name | app/services/page.tsx:29 | Signature | h3 tier name | (keep) |
| tier 2 price | app/services/page.tsx:30 | $9,800 | price | (keep) |
| tier 2 duration | app/services/page.tsx:31 | 6–8 weeks | meta | (keep) |
| tier 2 flag | app/services/page.tsx:139 | Most commissioned | meta flag over Signature only (also Home :42) | (keep) |
| tier 2 description | app/services/page.tsx:34 | The complete brand website. Strategy, creative direction, custom design, and an intuitive CMS come together in a digital identity that feels unmistakably yours — and guides visitors toward action. | body, ≤ 40 words | (keep) |
| tier 2 best for | app/services/page.tsx:36 | Designed for established founders ready for a website that carries the full weight of the brand. | small body, ≤ 25 words | (keep) |
| tier 2 CTA | app/services/page.tsx:150 | Commission Signature | ArrowLink, auto-built | (keep) |
| tier 3 name | app/services/page.tsx:39 | Atelier | h3 tier name | (keep) |
| tier 3 price | app/services/page.tsx:40 | $22,000+ | price | (keep) |
| tier 3 duration | app/services/page.tsx:41 | 8–12 weeks | meta | (keep) |
| tier 3 description | app/services/page.tsx:43 | For brands whose website must do more than look beautiful. A deeper strategic and creative engagement — immersive art direction, advanced interactions, custom user journeys, and a digital experience designed for authority and scale. | body, ≤ 45 words | (keep) |
| tier 3 best for | app/services/page.tsx:44 | Built for flagship brands, expanding businesses, and high-consideration offers. | small body, ≤ 20 words | (keep) |
| tier 3 CTA | app/services/page.tsx:150 | Commission Atelier | ArrowLink, auto-built | (keep) |
| tier 4 name | app/services/page.tsx:47 | Private Commission | h3 tier name | (keep) |
| tier 4 price | app/services/page.tsx:48 | $32,000+ | price | (keep) |
| tier 4 duration | app/services/page.tsx:49 | Custom timeline | meta. NOTE: Home says "Scoped to the work" (app/page.tsx:44) — pick one | (keep) |
| tier 4 description | app/services/page.tsx:51 | No standard scope. No predetermined ceiling. A fully commissioned digital experience shaped around the complexity, ambition, and operating model of the brand. | body, ≤ 35 words | (keep) |
| tier 4 best for | app/services/page.tsx:53 | Custom platforms, original interactions, integrated systems, and creative direction developed entirely from the ground up. | small body, ≤ 25 words | (keep) |
| tier 4 CTA | app/services/page.tsx:150 | Commission Private Commission | ArrowLink, auto-built — note the doubled word; consider a different verb or template | (keep) |

### Founding client program
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/services/page.tsx:165 | Founding client program | meta label, 2–4 words | (keep) |
| heading | app/services/page.tsx:166 | Signature scope at $2,800 — for the right first few. | h2 md, ≤ 12 words, ends in a period | (keep) |
| intro | app/services/page.tsx:168 | A limited program for a small number of founding clients: full Signature-tier scope in exchange for case-study rights. Real work, deeply discounted, while the studio builds its published proof. | intro, ≤ 40 words | (keep) |
| button | app/services/page.tsx:172 | Apply as a founding client | button label, 2–5 words | (keep) |

### Care plans
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/services/page.tsx:179 | Care plans | meta label | (keep) |
| heading | app/services/page.tsx:180 | Built to compound, kept in condition. | h2 md, ≤ 8 words | (keep) |
| intro | app/services/page.tsx:182 | A website is an asset — it performs best when it’s maintained. Care Plans keep yours fast, current, and evolving after launch. | intro, ≤ 30 words | (keep) |
| plan 1 name | app/services/page.tsx:59 | Essential | h3 plan name, 1 word | (keep) |
| plan 1 price | app/services/page.tsx:60 | $175 / mo | price | (keep) |
| plan 1 description | app/services/page.tsx:62 | The site stays fast, secure, and online — platform oversight, security updates, monthly performance checks, and the booking path tested every month. | small body, ≤ 30 words | (keep) |
| plan 2 name | app/services/page.tsx:65 | Growth | h3 plan name | (keep) |
| plan 2 price | app/services/page.tsx:66 | $450 / mo | price | (keep) |
| plan 2 description | app/services/page.tsx:68 | Everything in Essential, plus dedicated hours each month for content and design evolution — seasonal refreshes, new sections — with analytics reporting and SEO upkeep. | small body, ≤ 30 words | (keep) |
| plan 3 name | app/services/page.tsx:71 | Partner | h3 plan name | (keep) |
| plan 3 price | app/services/page.tsx:72 | $950 / mo | price | (keep) |
| plan 3 description | app/services/page.tsx:74 | The retained studio: monthly design and development hours, same-day priority, strategy calls, and a proactive roadmap for the brand’s next move. | small body, ≤ 30 words | (keep) |
| card CTA (unused) | components/ServiceCard.tsx:27 | Explore | default button label inside ServiceCard; only renders if a card is given an `href` — none is today | (keep) |
| card flag (unused) | components/ServiceCard.tsx:40 | Most commissioned | renders only if a card is `featured` — no care plan is | (keep) |

### Questions (FAQ)
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/services/page.tsx:196 | Questions | meta label | (keep) |
| heading | app/services/page.tsx:196 | The honest answers. | h2 md, ≤ 5 words | (keep) |
| Q1 | app/services/page.tsx:80 | Why custom code instead of a template or page builder? | FAQ question, ≤ 12 words | (keep) |
| A1 | app/services/page.tsx:82 | A template is rented — you build your brand on ground you don’t own, constrained by someone else’s system and paying to keep it. Custom code is owned: faster, distinctive in ways a builder structurally can’t match, and an asset that compounds in value instead of aging into a liability. | FAQ answer, ≤ 60 words | (keep) |
| Q2 | app/services/page.tsx:85 | Do you use AI? | FAQ question — the ONE place AI may be mentioned on the site | (keep) |
| A2 | app/services/page.tsx:87 | As a tool, the way I use a code editor — never as the designer. AI can’t decide what a brand should feel like; that judgment is the work, and the work is mine. What it removes is the layer where an agency hands your project down to a junior. Every design decision, every line of the system, and every word of strategy is mine — and revisions come back in hours instead of weeks. | FAQ answer, ≤ 80 words; KBC stays the grammatical subject; never frame as cheaper | (keep) |
| Q3 | app/services/page.tsx:90 | What do I actually own at the end? | FAQ question | (keep) |
| A3 | app/services/page.tsx:92 | Everything. The code, the design system, and the deployment are yours — no platform lock-in, no monthly ransom to keep your own website online. You can host it anywhere and extend it forever. | FAQ answer, ≤ 45 words | (keep) |
| Q4 | app/services/page.tsx:95 | How long does a project take? | FAQ question | (keep) |
| A4 | app/services/page.tsx:97 | The Edit runs two to three weeks, Signature six to eight, and Atelier eight to twelve — with revision cycles measured in hours, not weeks. A Private Commission is scoped to the work. Timelines are confirmed in your proposal and hold from the day content and assets are in hand. | FAQ answer, ≤ 60 words; must agree with tier durations above | (keep) |
| Q5 | app/services/page.tsx:100 | Do you offer ongoing support after launch? | FAQ question | (keep) |
| A5 | app/services/page.tsx:102 | Yes — Care Plans keep the site fast, current, and evolving, from light hosting oversight to a fully retained studio relationship. Most brands add one at handover. | FAQ answer, ≤ 40 words | (keep) |

### CTA (dark)
| slot | file | current | notes | new |
|---|---|---|---|---|
| heading | app/services/page.tsx:206 | Let’s build something worth owning. | h2 xl, accent word = "worth"; duplicated on /work/[slug]:211 | (keep) |
| button | app/services/page.tsx:212 | Begin your project | button label | (keep) |

---

## /process
### Metadata
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/process/page.tsx:10 | Process | page title | (keep) |
| description | app/process/page.tsx:12 | Beautiful is not the brief. How the studio works — a strategy-first process that builds brand experiences that are exact, commercially effective, and impossible to confuse with anyone else. | meta description, ≤ 155 chars (this is 190 — will be truncated in search) | (keep) |

### Opener
| slot | file | current | notes | new |
|---|---|---|---|---|
| marker | app/process/page.tsx:42 | Process | decorative vertical word, aria-hidden | (keep) |
| eyebrow | app/process/page.tsx:43 | Process | meta label | (keep) |
| h1 | app/process/page.tsx:44 | Beautiful is not the brief. | h1, ≤ 6 words, accent word = "brief" | (keep) |
| intro | app/process/page.tsx:46 | The goal is a brand experience that is beautiful, strategically exact, commercially effective, and impossible to confuse with anyone else. | intro, ≤ 30 words | (keep) |

### The argument
| slot | file | current | notes | new |
|---|---|---|---|---|
| para 1 | app/process/page.tsx:54–56 | Every project begins beneath the surface. We clarify what the brand stands for, who it must move, and what the website needs to accomplish before a visual direction is established. | body, ≤ 40 words; note "We" — About/Services say "I" | (keep) |
| para 2 | app/process/page.tsx:59–60 | The result is not decoration. It is a complete digital system built to sharpen perception and support the next stage of the business. | body, ≤ 30 words | (keep) |

### How it runs (five phases)
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/process/page.tsx:71 | How it runs | meta label, 2–3 words | (keep) |
| heading | app/process/page.tsx:71 | Five phases, in order. | h2, ≤ 5 words; count must match the list | (keep) |
| phase 1 title | app/process/page.tsx:17 | Position | h2 phase name, 1 word | (keep) |
| phase 1 body | app/process/page.tsx:18 | We define the brand’s position, audience, offer, competitive landscape, and desired perception. This becomes the strategic standard against which every decision is made. | body, ≤ 35 words | (keep) |
| phase 2 title | app/process/page.tsx:21 | Direct | phase name | (keep) |
| phase 2 body | app/process/page.tsx:22 | The visual world takes shape through typography, composition, imagery, motion, and art direction. The objective is not to follow the category — it is to create a presence the category recognizes. | body, ≤ 40 words | (keep) |
| phase 3 title | app/process/page.tsx:25 | Design | phase name | (keep) |
| phase 3 body | app/process/page.tsx:26 | Every page is designed around hierarchy, emotion, and movement. The experience is built to hold attention, communicate value, and make the next step feel inevitable. | body, ≤ 35 words | (keep) |
| phase 4 title | app/process/page.tsx:29 | Build | phase name | (keep) |
| phase 4 body | app/process/page.tsx:30 | The approved direction is translated into a precise, responsive website with refined interactions, considered performance, and a backend your team can actually use. | body, ≤ 35 words | (keep) |
| phase 5 title | app/process/page.tsx:33 | Release | phase name | (keep) |
| phase 5 body | app/process/page.tsx:34 | Before launch, every detail is reviewed across devices, content is finalized, and the site is prepared to enter the world exactly as intended. | body, ≤ 30 words | (keep) |
| CTA | app/process/page.tsx:90 | See what each phase covers | ArrowLink label (↗ to /services), meta, 2–5 words | (keep) |

### CTA (dark)
| slot | file | current | notes | new |
|---|---|---|---|---|
| heading | app/process/page.tsx:99 | Ready when you are. | h2 xl, accent word = "Ready"; same words as the Home closing line | (keep) |
| button | app/process/page.tsx:105 | Begin your project | button label | (keep) |

---

## /about
### Metadata
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/about/page.tsx:10 | About | page title | (keep) |
| description | app/about/page.tsx:12 | Strategy-led, highly art-directed websites for beauty, wellness, med-spa, and luxury lifestyle brands that have outgrown the expected. | meta description, ≤ 155 chars (this is 137) | (keep) |

### Opener
| slot | file | current | notes | new |
|---|---|---|---|---|
| marker | app/about/page.tsx:19 | About | decorative vertical word, aria-hidden | (keep) |
| eyebrow | app/about/page.tsx:20 | About | meta label | (keep) |
| h1 | app/about/page.tsx:21 | For founders who refuse to blend in. | h1, ≤ 8 words, accent phrase = "blend in" | (keep) |
| intro | app/about/page.tsx:23 | I create strategic, highly art-directed websites for beauty, wellness, med-spa, and luxury lifestyle brands that have outgrown the expected. | intro, ≤ 30 words | (keep) |

### Founder
| slot | file | current | notes | new |
|---|---|---|---|---|
| portrait index | app/about/page.tsx:32 | KB | meta mark top-right of the portrait frame, 1–2 chars | (keep) |
| portrait alt | app/about/page.tsx:33 | Krystal — founder, Krystal Brook Coterie | alt text — describe the image once a real portrait lands | (keep) |
| portrait caption | app/about/page.tsx:34 | Portrait — forthcoming | meta caption, 1–3 words; placeholder until photography exists | (keep) |
| h2 | app/about/page.tsx:42 | A studio, and a point of view of its own. | h2 md, ≤ 10 words, accent word = "own" | (keep) |
| para 1 | app/about/page.tsx:48–50 | I’m Krystal — the designer and creative partner behind Krystal Brook Coterie, working at the intersection of brand strategy, editorial design, and digital experience. | body, ≤ 35 words | (keep) |
| para 2 | app/about/page.tsx:53–55 | My work is for founders who understand that a website is not simply where information lives. It is where value is perceived, trust is formed, and the brand becomes real in the mind of the customer. | body, ≤ 45 words | (keep) |
| para 3 | app/about/page.tsx:58–61 | Each project is approached as its own visual world — considered from the positioning beneath it to the smallest interaction on screen. The result is a website that does not merely represent the business. It strengthens it. | body, ≤ 45 words | (keep) |

### Philosophy
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/about/page.tsx:72 | Philosophy | meta label | (keep) |
| heading | app/about/page.tsx:73 | The standard is distinction. | h2 md, ≤ 5 words, accent word = "distinction" | (keep) |
| para 1 | app/about/page.tsx:80–81 | Luxury is not created by adding more. It is created through restraint, precision, consistency, and a clear point of view. | body, ≤ 30 words | (keep) |
| para 2 | app/about/page.tsx:84–86 | That principle shapes every engagement. No interchangeable layouts. No visual excess without purpose. No trend applied without understanding what it communicates. | body, ≤ 30 words | (keep) |
| para 3 | app/about/page.tsx:89–90 | Only the elements that make the brand more recognizable, more credible, and more difficult to replace. | body, ≤ 20 words | (keep) |

### CTA (dark)
| slot | file | current | notes | new |
|---|---|---|---|---|
| heading | app/about/page.tsx:100 | If that sounds like your brand, let’s talk. | h2 xl, ≤ 9 words, accent word = "your" | (keep) |
| button | app/about/page.tsx:106 | Begin your project | button label | (keep) |

---

## /journal
### Metadata
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/journal/page.tsx:10 | Journal | page title | (keep) |
| description | app/journal/page.tsx:12 | Observations on positioning, perception, design, and the decisions that separate a beautiful business from a powerful brand. | meta description, ≤ 155 chars (this is 130); identical to the intro | (keep) |

### Opener
| slot | file | current | notes | new |
|---|---|---|---|---|
| marker | app/journal/page.tsx:27 | Journal | decorative vertical word, aria-hidden | (keep) |
| eyebrow | app/journal/page.tsx:28 | Journal | meta label | (keep) |
| h1 | app/journal/page.tsx:29 | On brand, beauty & digital presence. | h1, ≤ 7 words, accent word = "presence" | (keep) |
| intro | app/journal/page.tsx:31 | Observations on positioning, perception, design, and the decisions that separate a beautiful business from a powerful brand. | intro, ≤ 25 words | (keep) |

### The index
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/journal/page.tsx:41 | The index | meta label | (keep) |
| heading | app/journal/page.tsx:42 | Five pieces, forthcoming. | h2 md, ≤ 5 words; count must match the list | (keep) |
| intro | app/journal/page.tsx:44 | Written as the studio publishes them — no filler, no cadence for its own sake. | intro, ≤ 20 words | (keep) |
| entry 1 title | app/journal/page.tsx:16 | Why your luxury website still feels inexpensive | h2 entry title, ≤ 12 words | (keep) |
| entry 1 tag | app/journal/page.tsx:16 | Perception | meta tag, 1 word | (keep) |
| entry 2 title | app/journal/page.tsx:17 | The difference between looking polished and looking established | entry title | (keep) |
| entry 2 tag | app/journal/page.tsx:17 | Positioning | meta tag | (keep) |
| entry 3 title | app/journal/page.tsx:18 | Your brand doesn’t need more content. It needs a stronger point of view. | entry title | (keep) |
| entry 3 tag | app/journal/page.tsx:18 | Strategy | meta tag | (keep) |
| entry 4 title | app/journal/page.tsx:19 | What med-spas get wrong about premium positioning | entry title | (keep) |
| entry 4 tag | app/journal/page.tsx:19 | Med-spa | meta tag | (keep) |
| entry 5 title | app/journal/page.tsx:20 | Why better design can support higher pricing | entry title | (keep) |
| entry 5 tag | app/journal/page.tsx:20 | Commerce | meta tag | (keep) |
| CTA | app/journal/page.tsx:63 | Ask about a piece | ArrowLink label (↗ to /begin), meta, 2–4 words | (keep) |

### CTA (dark)
| slot | file | current | notes | new |
|---|---|---|---|---|
| heading | app/journal/page.tsx:71 | Rather see the work? | h2 xl, ≤ 5 words, accent word = "work" | (keep) |
| button | app/journal/page.tsx:77 | View the work | button label (→ /work), 2–3 words | (keep) |

---

## /begin
### Metadata
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/begin/page.tsx:8 | Commission | page title | (keep) |
| description | app/begin/page.tsx:10 | For founders ready to create a more distinctive, credible, and commercially powerful digital presence. Projects are accepted selectively. | meta description, ≤ 155 chars (this is 139) | (keep) |

### Opener
| slot | file | current | notes | new |
|---|---|---|---|---|
| marker | app/begin/page.tsx:17 | Commission | decorative vertical word, aria-hidden | (keep) |
| eyebrow | app/begin/page.tsx:18 | Commission | meta label | (keep) |
| h1 | app/begin/page.tsx:19 | Let’s build what comes next. | h1, ≤ 6 words, accent word = "next" | (keep) |
| intro | app/begin/page.tsx:21 | For founders ready to create a more distinctive, credible, and commercially powerful digital presence. Share where the brand stands today, what is changing, and what the next version must make possible. | intro, ≤ 40 words | (keep) |

### Form lead-in
| slot | file | current | notes | new |
|---|---|---|---|---|
| lead | app/begin/page.tsx:28–29 | Every engagement begins with alignment. The details below help determine the right scope, timing, and level of partnership for your project. | body, ≤ 30 words | (keep) |

### Enquiry form (components/EnquiryForm.tsx)
| slot | file | current | notes | new |
|---|---|---|---|---|
| label: name | components/EnquiryForm.tsx:107 | Your name | form label, 1–3 words (required) | (keep) |
| required mark | components/EnquiryForm.tsx:107 | * | asterisk after required labels (also :119, :176); stays ink | (keep) |
| label: brand | components/EnquiryForm.tsx:113 | Brand | form label | (keep) |
| label: email | components/EnquiryForm.tsx:119 | Email | form label (required) | (keep) |
| label: link | components/EnquiryForm.tsx:125 | Website or Instagram | form label, 2–4 words | (keep) |
| label: industry | components/EnquiryForm.tsx:131 | Industry | form label | (keep) |
| select prompt | components/EnquiryForm.tsx:135 | Select… | disabled first option, shared by all three selects (:135, :150, :165) | (keep) |
| industry option 1 | components/EnquiryForm.tsx:18 | Beauty | select option | (keep) |
| industry option 2 | components/EnquiryForm.tsx:18 | Med-spa | select option | (keep) |
| industry option 3 | components/EnquiryForm.tsx:18 | Wellness | select option | (keep) |
| industry option 4 | components/EnquiryForm.tsx:18 | Bridal | select option | (keep) |
| industry option 5 | components/EnquiryForm.tsx:18 | Luxury lifestyle | select option | (keep) |
| industry option 6 | components/EnquiryForm.tsx:18 | Other | select option | (keep) |
| label: investment | components/EnquiryForm.tsx:146 | Investment | form label; a qualifying range, never a payment | (keep) |
| investment option 1 | components/EnquiryForm.tsx:20 | Launch — $4,500 | select option. NOTE: tier is called "The Edit" everywhere else | (keep) |
| investment option 2 | components/EnquiryForm.tsx:21 | Signature — $9,800 | select option | (keep) |
| investment option 3 | components/EnquiryForm.tsx:22 | Atelier — $22,000+ | select option | (keep) |
| investment option 4 | components/EnquiryForm.tsx:23 | Atelier Custom — $32,000+ | select option. NOTE: tier is called "Private Commission" everywhere else | (keep) |
| investment option 5 | components/EnquiryForm.tsx:24 | Founding Client — $2,800 | select option; matches the /services program | (keep) |
| investment option 6 | components/EnquiryForm.tsx:25 | Not sure yet | select option | (keep) |
| label: timing | components/EnquiryForm.tsx:161 | Timing | form label | (keep) |
| timing option 1 | components/EnquiryForm.tsx:27 | As soon as possible | select option | (keep) |
| timing option 2 | components/EnquiryForm.tsx:27 | Within 1–3 months | select option | (keep) |
| timing option 3 | components/EnquiryForm.tsx:27 | In 3–6 months | select option | (keep) |
| timing option 4 | components/EnquiryForm.tsx:27 | Just exploring | select option | (keep) |
| label: vision | components/EnquiryForm.tsx:176 | The vision | form label (required) | (keep) |
| vision placeholder | components/EnquiryForm.tsx:183 | Tell me about the brand, what you’ve outgrown, and what you want the site to do. | placeholder, ≤ 20 words | (keep) |
| submit | components/EnquiryForm.tsx:193 | Submit your inquiry | button label, 2–4 words. NOTE: "inquiry" here vs "enquiry" everywhere else | (keep) |
| thank-you heading | components/EnquiryForm.tsx:89 | Thank you. | display line after submit, ≤ 4 words | (keep) |
| thank-you body | components/EnquiryForm.tsx:91–96 | Your email client should have opened with your enquiry ready to send. If it didn’t, write to hello@krystalbrookcoterie.com directly. Every enquiry is reviewed for fit within 48 hours. | body, ≤ 40 words. Shown after BOTH the API send and the mailto fallback, so "your email client should have opened" is wrong when the API succeeds. Also "48 hours" vs "two business days" below | (keep) |
| mailto subject | components/EnquiryForm.tsx:67 | New enquiry — {brand or name} | subject line pre-filled in the visitor's mail app (fallback path only) | (keep) |
| mailto body labels | components/EnquiryForm.tsx:69–77 | Name: / Brand: / Email: / Website / Instagram: / Industry: / Investment: / Timing: / Vision: | field labels in the pre-filled email body (fallback path). The API path uses identical labels at app/api/enquiry/route.ts:45–53 — change both together | (keep) |

### After the form
| slot | file | current | notes | new |
|---|---|---|---|---|
| response note | app/begin/page.tsx:33–34 | Projects are accepted selectively to preserve the depth and attention each engagement requires. You can expect a response within two business days. | body, ≤ 30 words; agree with the "48 hours" in the thank-you | (keep) |

### Aside
| slot | file | current | notes | new |
|---|---|---|---|---|
| aside label 1 | app/begin/page.tsx:41 | Prefer email? | meta label, 1–3 words | (keep) |
| email link | app/begin/page.tsx:46 | hello@krystalbrookcoterie.com | link text = the address | (keep) |
| instagram link | app/begin/page.tsx:54 | Instagram | link text, 1 word | (keep) |
| aside label 2 | app/begin/page.tsx:59 | A good fit is | meta label, 2–4 words | (keep) |
| fit item 1 | app/begin/page.tsx:61 | Founder-led beauty, med-spa, wellness, bridal, or luxury lifestyle. | list item, ≤ 12 words | (keep) |
| fit item 2 | app/begin/page.tsx:62 | A brand that has outgrown a template — and knows it. | list item, ≤ 12 words | (keep) |
| fit item 3 | app/begin/page.tsx:63 | Ready to invest in something owned, not rented. | list item, ≤ 10 words | (keep) |

---

## /for/[slug] (outreach page — unlinked, noindex; one per prospect)
`{business}` = the prospect's `businessName` from lib/prospects.ts.
### Metadata
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/for/[slug]/page.tsx:25 | Made for {business} | page title template | (keep) |
| description | app/for/[slug]/page.tsx:26 | A working page, built specifically for {business} — move your cursor across it. | meta description template | (keep) |

### Opener
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/for/[slug]/page.tsx:39–40 | Made for {business} | meta line; the business name takes the flare | (keep) |
| lead | app/for/[slug]/page.tsx:43–44 | Nobody sent you a deck. This is a live, working page — move your cursor across the sentence below, or just wait a moment and it moves on its own. | body, ≤ 35 words | (keep) |

### Dispersion (components/motion/Dispersion.tsx — the moving sentence)
The sentence is assembled from fixed "anchor" words and three-way "variant" slots. Reading 1 / 2 / 3 must stay parallel in length and grammar. Only the personalized (business-name) version renders today; the un-personalized defaults are listed after it in case the component returns to the homepage.
| slot | file | current | notes | new |
|---|---|---|---|---|
| section eyebrow | app/for/[slug]/page.tsx:49 | One page, three readings | meta label, 2–5 words | (keep) |
| no-JS sentence (personalized) | components/motion/Dispersion.tsx:126 | {business} should look like the day is already handled before anyone reads a review. | the complete middle reading, shown before hydration / without JS; must equal anchors + reading 2 | (keep) |
| readout label | components/motion/Dispersion.tsx:287 | Refracted for — | meta prefix before the live reading name | (keep) |
| readout initial | components/motion/Dispersion.tsx:287 | Bridal | initial value of the readout before the first frame; replaced immediately by a reading name below | (keep) |
| readout mid-state | components/motion/Dispersion.tsx:238 | in dispersion | meta; shown when the angle is between two readings, 1–3 words | (keep) |
| reading name 1 | components/motion/Dispersion.tsx:43 | Confidence | meta readout, 1 word; pairs with "the results are already proven" | (keep) |
| reading name 2 | components/motion/Dispersion.tsx:43 | Ease | meta readout; pairs with "the day is already handled" | (keep) |
| reading name 3 | components/motion/Dispersion.tsx:43 | Trust | meta readout; pairs with "the product is already trusted" | (keep) |
| incidence readout | components/motion/Dispersion.tsx:233, 293 | Incidence {n}° | meta; "Incidence 0.00°" at rest, live angle after; keep the word or cut the whole readout | (keep) |
| anchor 1 | components/motion/Dispersion.tsx:56, 69, 84 | should look like | fixed words after the subject (all breakpoints) | (keep) |
| variant A / reading 1 | components/motion/Dispersion.tsx:60, 74 | the results are already proven | middle slot, reading 1 (lg/md) | (keep) |
| variant A / reading 2 | components/motion/Dispersion.tsx:61, 75 | the day is already handled | middle slot, reading 2 | (keep) |
| variant A / reading 3 | components/motion/Dispersion.tsx:62, 76 | the product is already trusted | middle slot, reading 3 | (keep) |
| variant A (sm) part 1 | components/motion/Dispersion.tsx:85 | the results are / the day is / the product is | phone layout splits variant A in two — first halves, same order | (keep) |
| variant A (sm) part 2 | components/motion/Dispersion.tsx:86 | already proven / already handled / already trusted | phone layout — second halves | (keep) |
| anchor 2 | components/motion/Dispersion.tsx:66, 79, 87 | before anyone reads | fixed words before the last slot | (keep) |
| variant B / reading 1 | components/motion/Dispersion.tsx:66, 80, 88 | a price. | closing slot, reading 1 — ends the sentence | (keep) |
| variant B / reading 2 | components/motion/Dispersion.tsx:66, 80, 88 | a review. | closing slot, reading 2 | (keep) |
| variant B / reading 3 | components/motion/Dispersion.tsx:66, 80, 88 | an ingredient list. | closing slot, reading 3 | (keep) |
| footnote | components/motion/Dispersion.tsx:349 | A screenshot only ever captures one angle | meta, ≤ 10 words; desktop only | (keep) |
| (unused) default eyebrow | components/motion/Dispersion.tsx:117 | Positioning | component default; overridden by "One page, three readings" on /for | (keep) |
| (unused) default anchor 0 | components/motion/Dispersion.tsx:53 | The | article before the subject in the un-personalized version only | (keep) |
| (unused) default subject | components/motion/Dispersion.tsx:93 | clinic / studio / label | subject slot readings when no business name is pinned | (keep) |
| (unused) default reading names | components/motion/Dispersion.tsx:39 | Med-spa / Bridal / Beauty brand | readout names for the un-personalized version | (keep) |
| (unused) no-JS sentence (default) | components/motion/Dispersion.tsx:127 | The studio should look like the day is already handled before anyone reads a review. | un-personalized no-JS sentence | (keep) |

### Closing
| slot | file | current | notes | new |
|---|---|---|---|---|
| closing para | app/for/[slug]/page.tsx:55–58 | This page took about twenty minutes to make for {business} specifically. A full site is the same craft, aimed at the thing that actually needs to move: the moment someone lands on your homepage and decides, before reading a word, whether you’re the real thing. | body, ≤ 55 words | (keep) |
| button | app/for/[slug]/page.tsx:63 | Tell me about your project | button label (→ /begin), 3–5 words | (keep) |

---

## /privacy
### Metadata
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/privacy/page.tsx:6 | Privacy | page title | (keep) |
| description | app/privacy/page.tsx:7 | How Krystal Brook Coterie collects, uses, and protects your information. | meta description; legal — likely keep | (keep) |

### Opener
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/privacy/page.tsx:40 | Legal | meta label | (keep) |
| h1 | app/privacy/page.tsx:40 | Privacy policy. | h1, ≤ 3 words | (keep) |
| intro | app/privacy/page.tsx:44–45 | Krystal Brook Coterie (a DBA of Lion & Gazelle Holdings LLC) respects your privacy. This summary explains what we collect and how we use it. | body; legal — likely keep | (keep) |

### Sections
| slot | file | current | notes | new |
|---|---|---|---|---|
| s1 heading | app/privacy/page.tsx:12 | What we collect | h2, ≤ 4 words; legal — likely keep | (keep) |
| s1 body | app/privacy/page.tsx:13 | When you submit an enquiry, we collect the details you provide — your name, brand, email, links, and project information. We do not collect payment or financial details through this website. | body; legal — likely keep | (keep) |
| s2 heading | app/privacy/page.tsx:16 | How we use it | h2; legal — likely keep | (keep) |
| s2 body | app/privacy/page.tsx:17 | Your information is used solely to respond to your enquiry, assess project fit, and communicate about working together. We do not sell or rent your information to anyone. | body; legal — likely keep | (keep) |
| s3 heading | app/privacy/page.tsx:20 | Analytics & cookies | h2; legal — likely keep | (keep) |
| s3 body | app/privacy/page.tsx:21 | We may use privacy-respecting analytics to understand how the site is used. Any non-essential tracking is opt-in, and essential functionality never requires you to accept marketing cookies. | body; legal — likely keep | (keep) |
| s4 heading | app/privacy/page.tsx:24 | Data retention | h2; legal — likely keep | (keep) |
| s4 body | app/privacy/page.tsx:25 | Enquiry information is kept only as long as needed to evaluate and pursue a potential engagement, after which it is deleted on request or in the ordinary course. | body; legal — likely keep | (keep) |
| s5 heading | app/privacy/page.tsx:28 | Your rights | h2; legal — likely keep | (keep) |
| s5 body | app/privacy/page.tsx:29 | You may request access to, correction of, or deletion of the information you’ve shared at any time by writing to hello@krystalbrookcoterie.com. | body; legal — likely keep | (keep) |
| s6 heading | app/privacy/page.tsx:32 | Contact | h2; legal — likely keep | (keep) |
| s6 body | app/privacy/page.tsx:33 | Questions about this policy can be sent to hello@krystalbrookcoterie.com. | body; legal — likely keep | (keep) |
| counsel note | app/privacy/page.tsx:54 | This is a working summary pending final review by counsel before launch. | meta note; legal — remove at launch (same line on /terms:54) | (keep) |

---

## /terms
### Metadata
| slot | file | current | notes | new |
|---|---|---|---|---|
| title | app/terms/page.tsx:6 | Terms | page title | (keep) |
| description | app/terms/page.tsx:7 | The terms that govern use of the Krystal Brook Coterie website. | meta description; legal — likely keep | (keep) |

### Opener
| slot | file | current | notes | new |
|---|---|---|---|---|
| eyebrow | app/terms/page.tsx:40 | Legal | meta label | (keep) |
| h1 | app/terms/page.tsx:40 | Terms of use. | h1, ≤ 3 words | (keep) |
| intro | app/terms/page.tsx:44–45 | These terms govern your use of the Krystal Brook Coterie website, operated by Lion & Gazelle Holdings LLC. | body; legal — likely keep | (keep) |

### Sections
| slot | file | current | notes | new |
|---|---|---|---|---|
| s1 heading | app/terms/page.tsx:12 | Use of this site | h2; legal — likely keep | (keep) |
| s1 body | app/terms/page.tsx:13 | This website is provided for information about the studio and its services. By using it, you agree to use it lawfully and not to disrupt or misuse it. | body; legal — likely keep | (keep) |
| s2 heading | app/terms/page.tsx:16 | Enquiries & proposals | h2; legal — likely keep | (keep) |
| s2 body | app/terms/page.tsx:17 | Submitting an enquiry does not create a contract or guarantee availability. Any engagement is governed by a separate written proposal and agreement signed by both parties. | body; legal — likely keep | (keep) |
| s3 heading | app/terms/page.tsx:20 | Intellectual property | h2; legal — likely keep | (keep) |
| s3 body | app/terms/page.tsx:21 | The design, code, and content of this website are owned by Krystal Brook Coterie unless otherwise noted. Project deliverables are transferred to clients as set out in each engagement’s agreement. | body; legal — likely keep | (keep) |
| s4 heading | app/terms/page.tsx:24 | No warranty | h2; legal — likely keep | (keep) |
| s4 body | app/terms/page.tsx:25 | The site is provided “as is,” without warranties of any kind. We work to keep it accurate and available but do not guarantee it will always be error-free or uninterrupted. | body; legal — likely keep | (keep) |
| s5 heading | app/terms/page.tsx:28 | Limitation of liability | h2; legal — likely keep | (keep) |
| s5 body | app/terms/page.tsx:29 | To the extent permitted by law, Krystal Brook Coterie is not liable for indirect or consequential damages arising from use of this website. | body; legal — likely keep | (keep) |
| s6 heading | app/terms/page.tsx:32 | Contact | h2; legal — likely keep | (keep) |
| s6 body | app/terms/page.tsx:33 | Questions about these terms can be sent to hello@krystalbrookcoterie.com. | body; legal — likely keep | (keep) |
| counsel note | app/terms/page.tsx:54 | This is a working summary pending final review by counsel before launch. | meta note; legal — remove at launch | (keep) |

---

## Shared
### Header (components/SiteHeader.tsx + components/nav.ts + components/Logo.tsx)
| slot | file | current | notes | new |
|---|---|---|---|---|
| home link label | components/SiteHeader.tsx:128 | Krystal Brook Coterie — home | aria-label on the wordmark link, screen readers only | (keep) |
| wordmark (accessible name) | components/Logo.tsx:33 | Krystal Brook Coterie | aria-label for every logo lockup; natural case | (keep) |
| wordmark (visible) | components/Logo.tsx:77 | Krystal Brook Coterie | horizontal lockup, rendered lowercase via CSS; do not change | (keep) |
| nav label | components/SiteHeader.tsx:136, 194 | Primary | aria-label on both nav landmarks | (keep) |
| nav 1 | components/nav.ts:4 | Work | nav item, 1 word; also the footer list | (keep) |
| nav 2 | components/nav.ts:5 | Services | nav item | (keep) |
| nav 3 | components/nav.ts:6 | Process | nav item | (keep) |
| nav 4 | components/nav.ts:7 | About | nav item | (keep) |
| nav 5 | components/nav.ts:8 | Journal | nav item | (keep) |
| nav CTA (desktop) | components/SiteHeader.tsx:150 | Commission | outlined nav CTA, 1–2 words; nomenclature rule | (keep) |
| menu toggle (closed) | components/SiteHeader.tsx:161 | Open menu | aria-label on the hamburger | (keep) |
| menu toggle (open) | components/SiteHeader.tsx:161 | Close menu | aria-label on the hamburger when open | (keep) |
| menu dialog label | components/SiteHeader.tsx:191 | Site menu | aria-label on the mobile menu dialog | (keep) |
| nav CTA (mobile) | components/SiteHeader.tsx:211 | Commission a project | mobile menu CTA, 2–4 words | (keep) |
| skip link | app/layout.tsx:125 | Skip to content | keyboard-only link, 2–3 words | (keep) |

### Footer (components/SiteFooter.tsx)
| slot | file | current | notes | new |
|---|---|---|---|---|
| stacked wordmark line 1 | components/Logo.tsx:91 | Krystal Brook | visible (aria-hidden; the label above is what's announced); do not change | (keep) |
| stacked wordmark line 2 | components/Logo.tsx:94 | Coterie | visible; do not change | (keep) |
| wordmark descriptor | components/Logo.tsx:100 | Web Design Studio | meta line under the stacked wordmark, 2–3 words | (keep) |
| studio line | components/SiteFooter.tsx:22–23 | Distinctive digital identities for founder-led beauty, wellness, med-spa, and luxury lifestyle brands — built to lead their category. | small body, ≤ 25 words; a shortened form of the site description | (keep) |
| footer nav label | components/SiteFooter.tsx:28 | Footer | aria-label on the footer nav | (keep) |
| column 1 heading | components/SiteFooter.tsx:29 | Studio | meta label, 1 word (list = nav items above) | (keep) |
| column 2 heading | components/SiteFooter.tsx:46 | Connect | meta label, 1 word | (keep) |
| email link | components/SiteFooter.tsx:53 | hello@krystalbrookcoterie.com | link text = the address | (keep) |
| instagram link | components/SiteFooter.tsx:63 | Instagram | link text | (keep) |
| commission link | components/SiteFooter.tsx:71 | Commission a project | link text, 2–4 words | (keep) |
| copyright | components/SiteFooter.tsx:82 | © 2026 Krystal Brook Coterie | legal — likely keep | (keep) |
| entity line | components/SiteFooter.tsx:83 | a DBA of Lion & Gazelle Holdings LLC | legal — likely keep | (keep) |
| privacy link | components/SiteFooter.tsx:86 | Privacy | link text | (keep) |
| terms link | components/SiteFooter.tsx:89 | Terms | link text | (keep) |

### Site metadata (app/layout.tsx)
| slot | file | current | notes | new |
|---|---|---|---|---|
| site name | app/layout.tsx:38 | Krystal Brook Coterie | used in every title, OG, JSON-LD | (keep) |
| tagline | app/layout.tsx:39 | Digital identities for luxury brands | used in the home title + OG title, ≤ 6 words; also the share-card eyebrow | (keep) |
| home title | app/layout.tsx:46 | Krystal Brook Coterie — Digital identities for luxury brands | browser-tab / search title for /; ≤ 60 chars ideal (this is 60) | (keep) |
| title template | app/layout.tsx:47 | %s — Krystal Brook Coterie | every other page: "{Page} — Krystal Brook Coterie" | (keep) |
| site description | app/layout.tsx:41 | Distinctive digital identities for founder-led beauty, wellness, med-spa, and luxury lifestyle brands — strategy-led, custom-designed, and built to lead their category. | meta description for /, OG and Twitter, and both JSON-LD nodes; ≤ 155 chars (this is 170) | (keep) |
| keywords | app/layout.tsx:51–57 | luxury web design / brand strategy / beauty brand web design / med-spa web design / editorial web design / founder-led brands / digital identity studio | meta keywords (search ignores these; harmless) | (keep) |
| JSON-LD legal name | app/layout.tsx:91 | Lion & Gazelle Holdings LLC | structured data; legal — likely keep | (keep) |
| JSON-LD email | app/layout.tsx:94 | hello@krystalbrookcoterie.com | structured data | (keep) |
| JSON-LD slogan | app/layout.tsx:95 | Owned, not rented. | structured data slogan, ≤ 5 words; the positioning line | (keep) |

### Share card (app/opengraph-image.tsx, reused by app/twitter-image.tsx)
| slot | file | current | notes | new |
|---|---|---|---|---|
| card alt | app/opengraph-image.tsx:17; app/twitter-image.tsx:7 | Krystal Brook Coterie — editorial luxury web design, custom-coded | alt text for the share image; set in both files identically | (keep) |
| card eyebrow | app/opengraph-image.tsx:52 | Digital identities for luxury brands | meta line on the card; mirrors the tagline | (keep) |
| card headline | app/opengraph-image.tsx:68–69 | Websites with presence. | display line, ≤ 4 words; "presence." is the flare word | (keep) |
| card subline | app/opengraph-image.tsx:72 | For founder-led beauty, wellness & luxury brands. | ≤ 10 words | (keep) |
| card credit | app/opengraph-image.tsx:79 | Krystal Brook Coterie | uppercase credit at the foot | (keep) |

### Work frame (components/WorkShowcase.tsx + components/BrowserFrame.tsx) — used on / and /work
| slot | file | current | notes | new |
|---|---|---|---|---|
| open trigger | components/WorkShowcase.tsx:280 | Open {client} case study | aria-label on the invisible button over each frame | (keep) |
| cursor word (open) | components/WorkShowcase.tsx:279 | open | 11px word inside the cursor dot when hovering a frame | (keep) |
| cursor word (close) | components/WorkShowcase.tsx:332 | close | word inside the cursor dot over the Close button | (keep) |
| video label | components/WorkShowcase.tsx:217 | {client} — {descriptor} | aria-label on the looping recording | (keep) |
| still image alt | components/WorkShowcase.tsx:232 | {client} — {descriptor} | alt text for the poster/screenshot | (keep) |
| chrome pill | components/WorkShowcase.tsx:205; components/BrowserFrame.tsx:21 | {status, else url} | browser address pill: "glowtoure.com", "In production", "Concept" | (keep) |
| card client (index only) | components/WorkShowcase.tsx:299 | {client} | meta label bottom-left of a collapsed card on /work | (keep) |
| card hover | components/WorkShowcase.tsx:301 | View → | hover-only meta, 1 word + arrow (/work only) | (keep) |
| expanded category | components/WorkShowcase.tsx:310–311 | {category} · {status} | meta line at the top of the expanded study; status only when present | (keep) |
| expanded title | components/WorkShowcase.tsx:315 | {descriptor} | h2, accent phrase in flare-lift | (keep) |
| close button | components/WorkShowcase.tsx:337 | Close ✕ | fixed button top-right of the expanded study, 1 word + glyph | (keep) |
| expanded intro | components/WorkShowcase.tsx:398 | {intro} | display lead; see Data | (keep) |
| dl label 1 | components/WorkShowcase.tsx:402 | Client | meta label | (keep) |
| dl label 2 | components/WorkShowcase.tsx:403 | Role | meta label | (keep) |
| dl label 3 | components/WorkShowcase.tsx:404 | Year | meta label | (keep) |
| dl label 4 | components/WorkShowcase.tsx:405 | Stack | meta label | (keep) |
| body label | components/WorkShowcase.tsx:415 | The work | meta label beside the body paragraphs, 1–3 words | (keep) |
| scope label | components/WorkShowcase.tsx:429 | Scope | meta label beside the scope list | (keep) |
| case-study button | components/WorkShowcase.tsx:442 | Read the full case study | button label (only when a full /work/[slug] exists), 3–5 words | (keep) |
| expanded footer | components/WorkShowcase.tsx:448 | Krystal Brook Coterie — {index} | meta credit at the foot of the expanded study | (keep) |
| sequence caption index | components/WorkShowcase.tsx:358 | {index} / {total} — {client} | IndexMeta under the frame on / (e.g. "01 / 03 — Glowtoure") | (keep) |
| sequence caption | components/WorkShowcase.tsx:359 | {descriptor} | body line under the frame on / | (keep) |
| index separator | components/IndexMeta.tsx:49 | — | decorative dash between total and tag (aria-hidden) | (keep) |
| index format | components/IndexMeta.tsx:44–45 | 01 / 03 | zero-padded "current / total" format used on /, /services, /process, /journal | (keep) |

---

## Data
### lib/work.ts › Glowtoure (live; has a full case study at /work/glowtoure)
| slot | file | current | notes | new |
|---|---|---|---|---|
| client | lib/work.ts:44 | Glowtoure | client name; appears in titles, alt text, captions | (keep) |
| descriptor | lib/work.ts:45 | A luxury service, given the digital experience its pricing demanded. | the project's one-line "shift created", ≤ 12 words, ends in a period; is the case-study h1 and the card title | (keep) |
| accent | lib/work.ts:46 | luxury service | substring of descriptor that takes the flare / italic; must appear verbatim in the new descriptor | (keep) |
| category | lib/work.ts:47 | Beauty · Self-tan | meta category, 1–3 words with · separators | (keep) |
| capabilities | lib/work.ts:48 | Brand Strategy · Art Direction · Web Design · Development | meta capability line on the /work card; 3–5 items | (keep) |
| stack | lib/work.ts:49 | Next.js · Tailwind · Vercel | "Stack" dl value; tech is a proof point, keep it here | (keep) |
| url | lib/work.ts:50 | glowtoure.com | browser pill address | (keep) |
| year | lib/work.ts:51 | 2025 | "Year" dl value | (keep) |
| role | lib/work.ts:52 | Design & build | "Role" dl value, 2–4 words | (keep) |
| seoDescription | lib/work.ts:55 | How Krystal Brook Coterie designed and hand-built Glowtoure — a custom-coded, editorial digital flagship for a founder-led luxury spray-tan house across the Sacramento region. | meta description for /work/glowtoure, ≤ 155 chars (this is 178) | (keep) |
| intro | lib/work.ts:69 | A founder-led tanning house whose service was far more considered than its first website let on. The brief: a digital presence that felt as premium as the ritual — and priced it accordingly. | display lead, ≤ 45 words | (keep) |
| body 1 | lib/work.ts:71 | Glowtoure is a private, custom-colour spray-tan studio, mobile and in-studio across the greater Sacramento region. The service is intimate and exacting; the old site read like a booking utility, quietly undercutting the price and the positioning. | body, ≤ 45 words (gets the drop cap on the case-study page) | (keep) |
| body 2 | lib/work.ts:72 | We rebuilt the brand from its positioning up — a warm, editorial world where the photography leads and every screen signals authority. Custom colour, private appointments, bridal and event work, prep-to-aftercare: each given the room a luxury service deserves, paced like a magazine rather than a landing page. | body, ≤ 55 words; note "We" | (keep) |
| body 3 | lib/work.ts:73 | The result reads unmistakably high-end on the first scroll, makes the offer feel worth its price, and turns a browse into a booking. | body, ≤ 30 words | (keep) |
| scope 1 | lib/work.ts:76 | Art direction | scope item, 1–4 words | (keep) |
| scope 2 | lib/work.ts:77 | Design system | scope item | (keep) |
| scope 3 | lib/work.ts:78 | Custom front-end (Next.js · Tailwind) | scope item | (keep) |
| scope 4 | lib/work.ts:79 | Motion & interaction | scope item | (keep) |
| scope 5 | lib/work.ts:80 | Booking flow | scope item | (keep) |
| scope 6 | lib/work.ts:81 | Performance & SEO | scope item | (keep) |
| result 1 label | lib/work.ts:92 | Accessibility | meta label; measured 2026-08-18 (Lighthouse, mobile) — do not change the values without re-measuring | (keep) |
| result 1 value | lib/work.ts:92 | 97 / 100 | display figure | (keep) |
| result 2 label | lib/work.ts:93 | Best practices · SEO | meta label | (keep) |
| result 2 value | lib/work.ts:93 | 100 · 100 | display figure | (keep) |
| result 3 label | lib/work.ts:94 | Layout shift (CLS) | meta label | (keep) |
| result 3 value | lib/work.ts:94 | 0.001 | display figure | (keep) |
| result 4 label | lib/work.ts:95 | Stack | meta label | (keep) |
| result 4 value | lib/work.ts:95 | Next.js · Tailwind · Vercel | display value | (keep) |
| testimonial | lib/work.ts:97–108 | (none) | deliberately absent until a real, written-approved client quote exists; fields are quote / name / role | (keep) |

### lib/work.ts › Maison Dermé (concept — "In production"; no case-study route)
| slot | file | current | notes | new |
|---|---|---|---|---|
| client | lib/work.ts:113 | Maison Dermé | client name | (keep) |
| descriptor | lib/work.ts:114 | A clinical brand, repositioned as a modern authority. | ≤ 12 words, ends in a period; the card title and the Home concept line | (keep) |
| accent | lib/work.ts:115 | modern authority | substring of descriptor | (keep) |
| category | lib/work.ts:116 | Med-spa | meta category | (keep) |
| capabilities | lib/work.ts:117 | Brand Strategy · Web Design · Development · Copy Direction | meta capability line | (keep) |
| stack | lib/work.ts:118 | Next.js · Sanity | "Stack" dl value | (keep) |
| url | lib/work.ts:119 | maisonderme.com | never shown while `status` is set (the pill shows status instead) | (keep) |
| year | lib/work.ts:120 | 2025 | "Year" dl value | (keep) |
| role | lib/work.ts:121 | Design & build | "Role" dl value | (keep) |
| status | lib/work.ts:122 | In production | meta status, 1–2 words; shown in the pill, card, and Home concept row | (keep) |
| intro | lib/work.ts:127 | A concept for a med-spa that wanted to read like a maison, not a clinic — where credentials and calm hold the same page, and the brand feels like the authority in its market. | display lead, ≤ 45 words | (keep) |
| body 1 | lib/work.ts:129 | Cool, quiet, and exact. A restrained warm-neutral system with generous space, so the medical rigour reads as confidence rather than sterility — and the pricing feels earned. | body, ≤ 35 words | (keep) |
| body 2 | lib/work.ts:130 | Treatments, practitioner bios, and bookings flow from a CMS the team can run themselves, so the brand can move as fast as the business does. | body, ≤ 30 words | (keep) |
| scope 1 | lib/work.ts:132 | Brand-to-web translation | scope item | (keep) |
| scope 2 | lib/work.ts:132 | Design system | scope item | (keep) |
| scope 3 | lib/work.ts:132 | Headless CMS | scope item | (keep) |
| scope 4 | lib/work.ts:132 | Booking flow | scope item | (keep) |
| scope 5 | lib/work.ts:132 | Accessibility | scope item | (keep) |

### lib/work.ts › Étoile Atelier (concept — "Concept"; no case-study route)
| slot | file | current | notes | new |
|---|---|---|---|---|
| client | lib/work.ts:137 | Étoile Atelier | client name | (keep) |
| descriptor | lib/work.ts:138 | A founder-led business, transformed into a category-ready brand. | ≤ 12 words, ends in a period | (keep) |
| accent | lib/work.ts:139 | category-ready brand | substring of descriptor | (keep) |
| category | lib/work.ts:140 | Luxury lifestyle | meta category | (keep) |
| capabilities | lib/work.ts:141 | Brand Strategy · Art Direction · Web Design · Development | meta capability line | (keep) |
| stack | lib/work.ts:142 | Next.js · Tailwind | "Stack" dl value | (keep) |
| url | lib/work.ts:143 | etoileatelier.com | never shown while `status` is set | (keep) |
| year | lib/work.ts:144 | 2026 | "Year" dl value | (keep) |
| role | lib/work.ts:145 | Design & build | "Role" dl value | (keep) |
| status | lib/work.ts:146 | Concept | meta status | (keep) |
| intro | lib/work.ts:151 | A lifestyle house where the founder is the brand — and the site had to make it legible to a market that had never heard the name, and impossible to mistake for anyone else. | display lead, ≤ 45 words | (keep) |
| body 1 | lib/work.ts:153 | A warm-neutral world built around long-form storytelling and full-bleed imagery, paced like a magazine — positioning the brand a tier above the category it entered. | body, ≤ 35 words | (keep) |
| body 2 | lib/work.ts:154 | Type does the heavy lifting: monumental display against a serif italic voice, set with the air that signals a business worth taking seriously. | body, ≤ 30 words. NOTE: describes a serif-italic voice the system has retired | (keep) |
| scope 1 | lib/work.ts:156 | Editorial direction | scope item | (keep) |
| scope 2 | lib/work.ts:156 | Design system | scope item | (keep) |
| scope 3 | lib/work.ts:156 | Custom front-end | scope item | (keep) |
| scope 4 | lib/work.ts:156 | Motion & interaction | scope item | (keep) |

### lib/prospects.ts (outreach — templated)
The file holds no copy of its own: each entry is a `slug`, a `businessName`, and an optional `contactFirstName` (declared but not used anywhere yet). The business name is dropped into the `{business}` slots under `## /for/[slug]`; all the sentence words live in Dispersion.tsx and app/for/[slug]/page.tsx above.
| slot | file | current | notes | new |
|---|---|---|---|---|
| example › businessName | lib/prospects.ts:23 | Example Med Spa | the only entry; renders at /for/example. Replace per prospect; article-free proper noun (the sentence has no "The" before it) | (keep) |

---

## Coverage
Files extracted from (every user-facing string above comes from one of these):
- app/page.tsx
- app/layout.tsx
- app/work/page.tsx
- app/work/[slug]/page.tsx
- app/services/page.tsx
- app/process/page.tsx
- app/about/page.tsx
- app/journal/page.tsx
- app/begin/page.tsx
- app/for/[slug]/page.tsx
- app/privacy/page.tsx
- app/terms/page.tsx
- app/opengraph-image.tsx
- app/twitter-image.tsx
- components/nav.ts
- components/SiteHeader.tsx
- components/SiteFooter.tsx
- components/Logo.tsx
- components/EnquiryForm.tsx
- components/WorkShowcase.tsx
- components/BrowserFrame.tsx (the address-pill label only; the default `url = "glowtoure.com"` is never used — WorkShowcase always passes its own)
- components/ServiceCard.tsx ("Explore" default and "Most commissioned" flag — both currently unreachable)
- components/IndexMeta.tsx (the "01 / 03 —" format)
- components/Marquee.tsx (the ✳ separator, aria-hidden)
- components/motion/LandingWordmark.tsx
- components/motion/Dispersion.tsx
- lib/work.ts
- lib/prospects.ts

Files looked at with no user-facing copy of their own (they only render what a page passes in, or render nothing):
- components/PageHero.tsx, components/SectionShell.tsx, components/EditorialHeading.tsx, components/Eyebrow.tsx, components/Rule.tsx, components/SectionMarker.tsx — layout wrappers; every word comes from the page.
- components/ArrowLink.tsx, components/Button.tsx — the arrow glyphs (↗ → ↓) are aria-hidden; labels come from the page.
- components/FAQAccordion.tsx — the +/× glyph is decorative; questions and answers come from /services.
- components/Testimonial.tsx — renders quote/name/role from data; nothing is set today.
- components/ImageFrame.tsx — alt/caption/index come from the page (/about).
- components/motion/Reveal.tsx, components/motion/SmoothScroll.tsx, components/motion/CrystalMark.tsx, components/CustomCursor.tsx — motion/behaviour only (the cursor's words come from `data-cursor-label` on WorkShowcase).
- app/api/enquiry/route.ts — server only; its JSON `reason` codes are never shown to a visitor. Its email subject/body labels (lines 43–53) match EnquiryForm's mailto template and go to the studio inbox, not the visitor.
- app/robots.ts, app/sitemap.ts — no text.
- Not rendered by any in-scope route (parked): components/Hero.tsx, components/StatStrip.tsx, components/ProjectFeature.tsx, components/ProjectCard.tsx, components/motion/HeroCrystal.tsx, components/motion/CurrentScene.tsx, components/motion/CrystalShatterScene.tsx, app/prototype-shatter/**. Skipped by instruction: app/styleguide/**.
- There is no custom not-found page; a 404 shows Next.js's default text.

Cross-page consistency flags (worth settling while rewriting):
1. Private Commission duration: "Scoped to the work" (Home) vs "Custom timeline" (/services).
2. Enquiry form investment options say "Launch" and "Atelier Custom" where the site says "The Edit" and "Private Commission".
3. "Submit your inquiry" (form) vs "enquiry" everywhere else.
4. Response time: "within 48 hours" (form thank-you) vs "within two business days" (/begin).
5. The thank-you copy assumes the mailto path ("your email client should have opened") but also shows after a successful API send.
6. "We" (/process, Glowtoure body) vs "I" (/about, /services FAQ).
7. "Let’s build something worth owning." is the dark CTA on both /services and /work/[slug]; "Ready when you are." is both the Home closer and the /process CTA.
8. Meta descriptions over ~155 chars: site (170), /work (168), /process (190), Glowtoure seoDescription (178).
9. "Commission Private Commission" is the auto-built CTA for tier 4.
10. Étoile Atelier body 2 describes a "serif italic voice" the type system has retired.


---

## 16 · Services (added 2026-09-07) — `lib/services.ts`, `/services`, `/services/[slug]`

Seven services sold by discipline, each on its own page. One-word names in the site's register; the full name is the eyebrow (and the metadata title, so search sees "SEO" and "Website redesign"). No price list on the site — the only public figure is the floor. Every line below is a WORKING DEFAULT; write over `(keep)` to change it, `(cut)` to drop it. `{…}` is data.

| # | where | current | note | new |
|---|---|---|---|---|
| 16.1 | hub · hero | A different level of presence. | h1 · accent "presence" | (keep) |
| 16.2 | hub · intro | Seven services, sold by discipline. Every engagement is strategically led, visually distinct, and built around where your brand is now — and where it intends to go next. | intro | (keep) |
| 16.3 | hub · sizes eyebrow | Ways to commission | meta | (keep) |
| 16.4 | hub · sizes heading | Four sizes of engagement. | h2 | (keep) |
| 16.5 | hub · sizes intro | Engagements begin at $4,500. Every engagement is priced in the proposal, against its scope. | the ONE public figure | (keep) |
| 16.6 | hub · FAQ | What does it cost? — Engagements begin at $4,500. Every engagement is priced in the proposal, against its scope — never from a menu. The enquiry form asks for a range so the proposal lands in the right size the first time. | new question | (keep) |
| 16.7 | hub · FAQ (softened) | …That is the default here. When a business doesn't need that yet, a Squarespace commission is a real option — designed, not templated — and the design carries across the day you outgrow it. | sentence added to the template answer | (keep) |
| 16.8 | service · Identity | Brand & identity · **Everything a brand needs to be recognised.** · covers: Name · Logo and mark · Market positioning · Colour palette · Typography · Visual voice · Brand guidelines · for: Founders launching, renaming, or outgrowing a brand that was made in a hurry. The position is set first; the mark follows from it, so the identity holds up long after the launch. | eyebrow · h1 (accent "recognised") · list · paragraph | (keep) |
| 16.9 | service · Identity · Q | Do I need a full identity before a website? — Not always… / What do I receive? — The mark in every format… | 2 questions | (keep) |
| 16.10 | service · Collateral | Digital & print collateral · **Launch-ready, in every format the brand will meet.** · covers: Packaging · Presentations and decks · Stationery · Signage · Sales materials · Brand-ready assets — social, email, templates · for: Brands with an identity that now has to work in the world — on a box, a wall, a deck, a feed. Files arrive print-ready, set to the printer's specification. The printing itself isn't mine, but I'll point you to the right press. | accent "Launch-ready" | (keep) |
| 16.11 | service · Collateral · Q | Do you print? — No. You receive print-ready files… / Can collateral be commissioned on its own? — Yes, on an existing identity… | | (keep) |
| 16.12 | service · Websites | Custom website design · **An original website, designed and built to the brand.** · covers: Strategy and structure · Original design — nothing underneath it · Front end and back end · Responsive on every screen · Motion and interaction · Performance, accessibility and the search foundation · Launch · add-ons: Booking flow · E-commerce · Content management · Integrations · Copy direction · Photography direction · for: Founder-led brands whose website has to carry the full weight of the business — the first impression, the proof, and the next step. Built around the brand and its goals, and owned outright at the end. | accent "original"; frames Glowtoure | (keep) |
| 16.13 | service · Websites · Q | What makes it custom? — There is no theme underneath… / How long does it take? — Six to eight weeks for a Signature site; eight to twelve for Atelier… | | (keep) |
| 16.14 | service · Redesign | Website redesign · **For brands that have outgrown their website.** · covers: An audit of what the current site does, and doesn't · Repositioning where the brand has moved on · Original design on the new position · Rebuild — or migration, where the platform still serves · Redirects, search equity and analytics carried across · Launch without downtime · for: The business has changed and the site hasn't. A redesign is not a refresh of the old one — it starts from where the brand is now and keeps only what still earns its place. | accent "outgrown" — her "word this better" line; alternates: "The site you have was right for the business you were." / "A rebuild for the brand you've become." | (keep) |
| 16.15 | service · Redesign · Q | Redesign, or start again? — If the positioning has moved, start again… | | (keep) |
| 16.16 | service · Development | Website development · **Built to be run by the people who own it.** · covers: Content management · E-commerce · Booking and integrations · Testing across devices and browsers · Analytics · Deployment and execution · for: Brands with a design in hand — mine or another studio's — that needs building properly, and brands whose site needs to do more than it does. | accent "own" | (keep) |
| 16.17 | service · Development · Q | Can you build a design that isn't yours? — Yes, when it's good. I'll say so if it isn't. / What do I own? — Everything… | | (keep) |
| 16.18 | service · Search | SEO · **Visible to the people who are looking.** · covers: Strategy for the brand, the market and the location · Site structure and internal linking · On-page foundation · Analytics and reporting · Ongoing visibility, tied to business goals · for: Brands that want to be found for what they actually do, where they do it — not ranked for everything, chosen for the right thing. | accent "Visible" | (keep) |
| 16.19 | service · Search · Q | Is search included in a website? — The foundation is… | | (keep) |
| 16.20 | service · Squarespace | Squarespace websites · **When the business doesn't need custom code yet, it still deserves a designer.** · covers: Strategy and structure · Original design, built on the platform · Typography, palette and imagery set to the brand · Pages your team can edit · Search foundation · Launch · for: Brands that want a custom look and real creative thinking without complexity the business doesn't need yet. Intentional, not templated — and a step, not a ceiling: when the brand outgrows it, the design comes with you. | accent "designer"; framed as a stage, never "template" | (keep) |
| 16.21 | service · Squarespace · Q | Isn't Squarespace a template? — It's a platform… / When would you steer me to custom? — When the site needs to do something the platform can't… | | (keep) |
| 16.22 | service · shared | What it covers · Add-ons · Who it's for · Commissioned as · Investment · How it runs · The work · Questions · Alongside · Commission {Name}. · How the studio works | section labels + CTAs | (keep) |
| 16.23 | service · investment | Engagements begin at $4,500. Priced in the proposal. | on every service page | (keep) |
| 16.24 | process · the coterie | The coterie · **A small circle, on purpose.** · Coterie means a small, chosen circle. It is also how the studio runs. · One senior hand — Every decision — strategy, design, code, the words — is made by the person you commissioned. Nothing is handed down. · A fixed number at a time — The studio takes a limited number of commissions at once, so each one has the attention its price implies. · Direct access — You talk to the person doing the work. Questions are answered by the person who knows the answer. · Revisions in hours — Because the whole system is held in one head, a change is a conversation, not a ticket. | new section on /process | (keep) |
| 16.25 | begin · floor | Engagements begin at $4,500. | added to the intro paragraph | (keep) |
| 16.26 | begin · form | Investment: Under $5,000 · $5,000 – $10,000 · $10,000 – $25,000 · $25,000 and above · Not sure yet | ranges replace the mis-named tier prices (settles inconsistency #2) | (keep) |
| 16.27 | menu · panel | Services (eyebrow) · Identity · Collateral · Websites · Redesign · Development · Search · Squarespace | the second column | (keep) |
| 16.28 | service · built with | Websites: Next.js · TypeScript · Tailwind CSS · Framer Motion · Lenis · next/image · Pangram Pangram type, self-hosted · Three.js — where a project earns it · Vercel / Redesign: Next.js · TypeScript · Tailwind CSS · Framer Motion · Pangram Pangram type, self-hosted · Vercel / Identity: Pangram Pangram type / Development: Next.js · TypeScript · Sanity · Vercel / Search: Next.js · next/image · Vercel / Squarespace: Squarespace | a "Built with" row in the meta column beside "Commissioned as" (added 2026-09-07 at her ask); Collateral carries none | (keep) |
| 16.29 | case study · Glowtoure · stack | Next.js · Tailwind CSS · Lenis · next/image · Pangram Pangram type · Vercel | verified against the live site's bundles — four PP faces (Frama, Frama Text, Right Serif, Playground) self-hosted via next/font; Framer Motion / Sanity / Three.js left no signature and are not claimed — add TypeScript if Glowtoure was written in it | (keep) |
| 16.30 | case study · on the phone | On the phone · **Nothing lost on the small screen.** · labels: Home · Services · Booking | new dark section on /work/glowtoure (2026-09-09); accent "Nothing". The claim is one the clips themselves prove, so it needs no figure behind it | (keep) |
| 16.31 | case study · deliverable | The system was written down, not just built — nine locked colours, four faces with one job each, and the governance that keeps a tenth colour from quietly appearing eighteen months in. · **Open the Glowtoure brand system ↗** | under Scope on /work/glowtoure (2026-09-10), linking the brand book at /work/glowtoure/brand-system — OUR domain, never the host it was authored on. Every figure in the line is one the document itself states; it opens in a new tab | (keep) |

Retired from the site by this section: the tier prices ($4,500 / $9,800 / $22,000+ / $32,000+), the Care Plan prices ($175 / $450 / $950 a month), and the Founding Client figure ($2,800 — the program itself is gone from the hub; restore it as a row if you want it public).
