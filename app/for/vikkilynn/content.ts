/**
 * /for/vikkilynn — the Love Vee Beauty proposal. One entry per slide of the
 * walkthrough: the slide image lives at /for/vikkilynn/slide-NN.webp, `start` is
 * the second the narration for that slide begins in /for/vikkilynn/walkthrough.mp4,
 * and `note` is what Krystal says over it (the recording script, verbatim).
 *
 * VIDEO.src is empty until the recording exists. Drop walkthrough.mp4 and
 * poster.jpg into public/for/vikkilynn, fill in src/poster/minutes and the per-slide
 * `start` seconds, and the video section and "Hear this part" links appear.
 *
 * PRICES: every figure in STANDARD, PACKAGES and SUBSCRIPTIONS is a draft for
 * Krystal to confirm before this page is shared. STANDARD mirrors /for/lisa (the
 * live published rates); PACKAGES are the founding-client options for Vikki.
 */
export type Slide = {
  n: number;
  id: string;
  eyebrow: string;
  title: string;
  start: number;
  note: string;
};

export const SLIDES: Slide[] = [
  { n: 1, id: "cover", eyebrow: "", title: "The site, page by page", start: 0, note:
    "Hi Vikki, it's Krystal. Thank you for watching this. I put together a walkthrough of a Love Vee Beauty website and the brand that comes with it, page by page. For each one I'll show you what a client sees and why I built it that way, then the brand rules, then what it costs. About twelve minutes. Let's start." },
  { n: 2, id: "letter", eyebrow: "Before you start", title: "Why I built this without asking", start: 0, note:
    "You built a seven-year business with no website at all, on DMs and word of mouth, and your first-year clients are still on your books. That is rarer than you think. It also means every person who searches for lashes in Orangevale and doesn't already know you can't find you. So instead of talking about it again, I built the first page so you could see it. None of this is final. The services and times are my best guesses, the photos are labelled slots until we shoot the real ones, and the words are written the way you talk to one person on the bed. Correct anything you'd never say." },
  { n: 3, id: "jobs", eyebrow: "What it has to do", title: "Four jobs. Nothing else.", start: 0, note:
    "The site has four jobs. Be found: a page Google can read with your address, your services and your name on it, because today a search for lashes in Orangevale finds nothing. Be booked: one button on every page that ends with a time on your calendar and a deposit paid, instead of a DM thread and a Venmo request. Sell memberships: a monthly rate your consistent clients sign up for, that nobody local is offering yet. And sell your lash line: a shop where anyone who follows you can order your lashes at any hour, without messaging you. None of those last three work cleanly in an Instagram reply. They all work on a page." },
  { n: 4, id: "part-site", eyebrow: "Part one", title: "The site, page by page", start: 0, note:
    "Part one, the site. Eight screens, the way I'd explain them if you were sitting next to me. Or skip all this, open the mockup and scroll it yourself on your phone." },
  { n: 5, id: "home", eyebrow: "Page 1 of 9 · Home", title: "The name, one set, and nothing else", start: 0, note:
    "This is the top of the site. One lash set hanging in the middle of a pink room, casting a shadow on the floor, and your name running edge to edge underneath in that soft butter colour. That's it. No stock photo, no slogan, no ten buttons. When someone lands here on their phone they know within a second that this is a lash studio and that it's a good one. The set tips back in 3D as you scroll, and the light follows your cursor. Try it." },
  { n: 6, id: "services", eyebrow: "Page 2 of 9 · Services", title: "Every service, no prices on the page", start: 0, note:
    "Your menu, as a list: Classic, Hybrid, Volume, fills, lash lift and tint, face waxing, and body waxing with Brazilian, legs, arms and underarms. Each one gets a line in your voice and a time. Prices live in the booking flow, not on the page, so you can change them without touching the site and nobody price-shops you from a screenshot. The names and times are my best guesses; correct anything that isn't how you run it. The photo slot on the left is your hands at the bed." },
  { n: 7, id: "memberships", eyebrow: "Page 3 of 9 · Memberships", title: "Selling memberships before they exist", start: 0, note:
    "This is the part I'm most excited about for your business. Memberships: one monthly rate, priority booking, a reserved spot every two to three weeks. Almost nobody local offers this, and it's exactly what your consistent girls would sign up for. The section doesn't need prices yet. It takes an email or a phone number and puts people on a waitlist, so you're collecting names before you've decided the tiers. Founding members lock their rate. That line alone will fill the list." },
  { n: 8, id: "shop", eyebrow: "Page 4 of 9 · Shop · Option B", title: "Your lash line, for artists and for self-wear", start: 0, note:
    "This is the shop for your lash line, which comes with Option B. It opens on two tabs, because you're selling to two different people. For artists, the trays you work from, with the curl, diameter and lengths listed, because that's the first thing another lash artist checks. For everyone else, the sets made to wear yourself, with the how-to included. Under both, a line inviting studios to message you for bulk artist pricing, so wholesale stays a conversation you control instead of a public price. Checkout runs through Stripe, so the money goes straight to your bank and the order lands in your inbox, at any hour, with no marketplace taking a cut. Product names, specs, prices and photos are placeholders until you give me yours." },
  { n: 9, id: "work", eyebrow: "Page 5 of 9 · The work", title: "Six photographs doing the selling", start: 0, note:
    "The gallery. Six slots, two rows, every slot labelled with the exact shot it needs. I tried this with your Instagram photos and it didn't hold up, not because the work isn't good but because six phones in six lights never look like one studio. So I wrote you a shoot guide instead: one backdrop, one light, one afternoon, ten shots. When those come back, this is the strongest section on the page." },
  { n: 10, id: "studio", eyebrow: "Page 6 of 9 · The studio", title: "You, in your own words", start: 0, note:
    "The studio section, the one dark room on the page. Your portrait on the left, and on the right the thing that actually sells you: seven years in, first-year clients still on the books, the same two hands every visit. The copy is written the way you talk to someone on the bed, one person at a time, but without the babes and the girls, because the page has to read as a high-end studio to someone who hasn't met you yet. Read it out loud and tell me what you'd never say." },
  { n: 11, id: "policies", eyebrow: "Page 7 of 9 · Before you book", title: "The policies, said once, kindly", start: 0, note:
    "Policies, in the same list style as the menu so they don't feel like fine print. Deposit, cancellations, arrive ready, first time here. Each one is stated plainly and then softened with one human line, like life happens, so just let me know early. These are standard lash-studio terms; swap in your real ones and I'll keep the tone." },
  { n: 12, id: "book", eyebrow: "Page 8 of 9 · Book", title: "One ask at the end: get on the books", start: 0, note:
    "Every page ends the same way: let's get you on the books. In this version the form sends you a request. With the booking option, it opens your calendar, the client picks a time, pays her deposit, and gets the intake form, all without you touching your phone. Below it, the footer: your name, the studio address, the Instagram button, and Love Vee Beauty, LLC." },
  { n: 13, id: "phone", eyebrow: "Page 9 of 9 · On a phone", title: "Where almost everyone will see it", start: 0, note:
    "And on a phone, which is where nearly everyone finds you, from your Instagram link. The name stacks on two lines, the menu reads top to bottom, the booking form fits in one thumb. Nothing is cut off, nothing needs pinching, and it loads fast, which matters, because a slow page on a phone is a lost booking." },
  { n: 14, id: "part-brand", eyebrow: "Part two", title: "The brand it comes with", start: 0, note:
    "Part two, the brand. Every rebrand before this landed in the same place because nothing was locked. This is the lock: six colours, one typeface, and the rules that decide where each one goes. It's yours to keep, and it's what makes everything you make after this match." },
  { n: 15, id: "palette", eyebrow: "Brand system · colour and type", title: "Six colours. One typeface.", start: 0, note:
    "Six colours. Three pinks, from the deeper hero top to the pale base. Milk, the page ground. Butter, the signature, the one that makes it yours. And a warm charcoal for ink and the one dark room. One typeface, PP Neue Montreal: light for headlines and reading, medium uppercase for the wordmark, and its mono cut for the small labels. The wordmark is always all three words, on one line. The typeface is licensed and passed through at cost; if you'd rather not, there's a free pairing ready that looks nearly the same." },
  { n: 16, id: "rules", eyebrow: "Brand system · the rules", title: "Five rules, so it stays this way", start: 0, note:
    "Five rules. Pink is a field, not a paint: it's a room, never a button. Butter is the display voice: large type only, on pink or charcoal, never small and never on milk, where it turns green. Charcoal is the ink: all reading text, buttons, hairlines, and the lashes. Every section opens the same way: label, note, hairline, headline, then content. And the voice is one person talking to one person: first person, specific, remembers things, no nicknames in writing. Give this sheet to anyone who makes anything for Love Vee Beauty and it'll match." },
  { n: 17, id: "part-offer", eyebrow: "Part three", title: "What it costs, and what I'm offering you", start: 0, note:
    "Part three. What it costs, and what I'm offering you." },
  { n: 18, id: "custom", eyebrow: "Why I build it this way", title: "No plugins to break into", start: 0, note:
    "Before the numbers, why I build it this way. Most small-business sites run on WordPress, about 40% of every website on the internet. WordPress gets its features from third-party plugins, and that layer is where the risk lives: in 2025 the security firm Patchstack counted over eleven thousand new vulnerabilities in the WordPress ecosystem, 91% of them in plugins. Yours won't have any of that. It's custom code on Vercel, no admin login to guess, no plugins to go stale. The only upkeep is the framework underneath, which is what the care plan is for. The sources are on the last page." },
  { n: 19, id: "offer", eyebrow: "The offer · founding rate", title: "Two options", start: 0, note:
    "Here's the honest math. A site like this, with the shop, the brand and everything working, is a site I'd quote around five thousand dollars to build and two-fifty a month to maintain and refresh each season. For comparison, I offered Lisa her site without an online shop for thirty-five hundred. For you, two options. Option A, two thousand: the site. A landing page, a services page, an about page with your FAQs and policies, a gallery of your work, and linked forms for enquiries, intake and the memberships waitlist, plus the full brand system, your Google profile matched to the site, and the build, search setup, analytics, testing and training. Option B, twenty-eight hundred: everything in A, plus a shop for your lash line, booking on the platform you choose, Vagaro, Square, GlossGenius, Booksy, Acuity, or a calendar right on the site, payments and deposits through Stripe, and the basic automations: reminders, aftercare, a review request and a rebooking nudge. Memberships switch on as subscriptions when you're ready. One request in return: the number stays between us. If anyone asks what it cost, send them to me." },
  { n: 20, id: "running", eyebrow: "What it costs to run", title: "Some of it costs money. You'd have me for the rest", start: 0, note:
    "Some of this costs money to run, and I'd rather you hear it from me now. Every site needs a domain, about fifteen dollars a year, and hosting, twenty a month. On Option B, Stripe takes its standard fee on each card payment, two point nine percent plus thirty cents, and your booking platform, Vagaro or whichever you pick, has its own monthly plan. All of that is in your name and I add nothing on top. Then there's keeping it running. The care plan is one seventy-five a month instead of my usual two-fifty. That's the security updates, and it's me on call for any change you need, a seasonal refresh, a seasonal promo or marketing push built right on the site, new lash styles in the shop, and building your online presence with you as the business grows. You'd never be stuck with a site you can't change." },
  { n: 21, id: "needs", eyebrow: "Next step", title: "What I'd need from you, and how it runs", start: 0, note:
    "What I'd need from you: your lash line, each style's name, price and photos, and how you want to ship; your okay on every service name and time and your real prices for the booking flow; what a membership includes and costs, or your okay to open the waitlist first; one shoot day for the studio, you, a few of your clients and your lash line, where I send the shot list and you book the clients; a written okay from each client whose lashes appear on the site; your deposit, cancellation and patch-test policies in your words; and your domain, booking app login and Google Business Profile. How it runs: fifty percent up front, fifty percent before launch. Launch in four to six weeks. Two rounds of revisions. Every page on a preview link before it goes public. And you own everything at final payment." },
  { n: 22, id: "close", eyebrow: "If you're in", title: "Just tell me yes, and A or B", start: 0, note:
    "If you're in, just tell me yes, and A or B. I'll send the agreement and we start the day the deposit and your corrections land. Or text me. You know where I am. Thank you for watching, Vikki. I'd love to build this for you." },
];

export const VIDEO = {
  src: "",
  poster: "",
  minutes: "",
};

/** The mockup itself, as a page Vikki can scroll on desktop or phone. */
export const SITE_URL = "/for/vikkilynn/lovevee-site.html";

export const FILES = [
  { label: "The website mockup", href: SITE_URL, meta: "Opens the live concept in a new tab" },
  { label: "The walkthrough deck", href: "/for/vikkilynn/lovevee-walkthrough.pdf", meta: "PDF · these twenty-two pages, to read or forward" },
  // { label: "Shoot direction", href: "/for/vikkilynn/lovevee-shoot-direction.pdf", meta: "PDF · the ten shots, the setup, and the day" },
];

export const STANDARD = [
  ["Custom build with an online shop", "about $5,000", "Every page, the brand system, the shop, integrations, launch and handover"],
  ["Care plan", "$250 per month", "Security and framework updates, plus a seasonal refresh of the site. Optional, month to month"],
] as const;

/** The best-friend care plan, shown under the two options. */
export const CARE = {
  price: "$175 per month",
  standard: "$250",
  items: [
    "Framework and security updates every month, with every form, and booking and checkout on Option B, tested",
    "Me on call for changes and updates: new services, prices, photos, policies, whatever the studio needs",
    "A seasonal refresh, plus a seasonal promo or marketing change built and live on the site, on your call",
    "New lash styles added to the shop as you release them (Option B)",
    "Building your online presence with you: your Google profile, your Instagram link and your site working together as the business grows",
  ],
} as const;

export const PACKAGES = [
  {
    id: "site",
    flag: "Option A",
    title: "The site",
    price: "$2,000",
    items: [
      "A landing page, built as shown, on your own domain",
      "A services page with the full menu",
      "An about page, with your story, FAQs and policies",
      "A gallery page of your work",
      "Linked forms: enquiries, intake, and the memberships waitlist, landing in your inbox",
      "The full brand system: wordmark, palette, type and the rules, in one sheet anyone can follow",
      "Responsive build, Google profile matched to the site, search setup, analytics, launch testing and a training handoff",
    ],
  },
  {
    id: "booking",
    flag: "Option B",
    title: "The site, plus your shop, booking and payments",
    price: "$2,800",
    items: [
      "Everything in Option A",
      "A shop for your lash line, split into For artists and Wear them yourself: product pages, a bag and checkout, with orders landing in your inbox",
      "Booking built in, on the platform you choose: Vagaro, Square Appointments, GlossGenius, Booksy or Acuity, or a calendar right on the site",
      "Payments and deposits through Stripe, straight to your bank",
      "Basic automations: appointment reminders, an aftercare sequence, a review request and a rebooking nudge",
      "Memberships switched on as subscriptions when you're ready to launch them",
    ],
  },
] as const;

export const EXCHANGE = [
  "The number stays between us. If someone asks what this cost, send them to me instead of quoting it; the published rate is what keeps the studio able to do this for people like you",
  "Case study rights: I can show the finished site and its numbers as my work",
  "A written testimonial and a short video one, within two weeks of launch",
  "Three introductions to other beauty businesses in the Sacramento area when someone asks who built it",
  "Analytics and booking numbers for ninety days after launch, so I can report real results",
  "A tagged post and a link in your bio at launch",
  "A small “Site by Krystal Brook Coterie” credit in the footer for the first year",
] as const;

export const SUBSCRIPTIONS = [
  ["Domain", "about $15 a year", "Registered in your name. If it lapses, the site goes dark"],
  ["Hosting", "$20 a month", "Vercel Pro, the plan for business sites. Your account, your login"],
  ["Typeface license", "pass-through", "PP Neue Montreal, licensed for your domain, at cost. Or a no-cost pairing (Archivo + IBM Plex Mono) if you'd rather not"],
  ["Booking platform (Option B)", "the platform’s monthly plan", "Vagaro, Square Appointments, GlossGenius, Booksy and Acuity each charge their own monthly subscription, in your name. I help you pick the one that fits, and a calendar built on the site has no platform fee"],
  ["Payments (Option B)", "2.9% + 30¢ per card payment", "Stripe’s published rate, on shop orders, deposits and memberships. No monthly fee; the money goes to your bank"],
  ["Shipping (Option B)", "postage per order", "Carrier rates (USPS or UPS) set at checkout. You pack and ship; I set up the rates and the order emails"],
  ["Sales tax (Option B)", "collected at checkout", "Selling products in California needs a seller’s permit from the CDTFA, which is free to apply for. Tax is calculated at checkout; I confirm any tool fee before launch"],
  ["Bookings database (Option B)", "$25 a month", "Supabase Pro, so bookings and member sign-ins never pause. Booking emails run on Resend’s free tier"],
] as const;

export const NEEDS = [
  "For the shop (Option B): each product's name, price, stock and whether it's for artists or self-wear; curl, diameter and lengths on the artist trays; how you handle bulk orders from studios; how you want to ship; and your California seller's permit",
  "Your okay on every service name and time on the menu, and your real prices",
  "What a membership includes and what it costs, or your okay to launch the waitlist first and decide later",
  "One shoot day: a small photoshoot of the studio, you, a few of your clients and your lash line products. I send the shot list; you book the clients",
  "A quick written okay from each client whose lashes appear on the site",
  "Your deposit, cancellation and patch-test policies, in your words",
  "Your domain, or your okay for me to register one in your name",
  "Your FAQs, and access to your Google Business Profile, plus your booking app on Option B",
] as const;
