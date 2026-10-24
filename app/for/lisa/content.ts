/**
 * /for/lisa — the Badabling Artistry proposal. One entry per slide of the
 * walkthrough: the slide image lives at /for/lisa/slide-NN.webp, `start` is the
 * second the narration for that slide begins in /for/lisa/walkthrough.mp4, and
 * `note` is what Krystal says over it (the recording script, verbatim).
 *
 * VIDEO.src is empty until the recording exists. Drop walkthrough.mp4 and
 * poster.jpg into public/for/lisa, fill in src/poster/minutes and the per-slide
 * `start` seconds, and the video section and "Hear this part" links appear.
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
  { n: 1, id: "hero", eyebrow: "Home", title: "That photo is the whole first screen", start: 0, note:
    "Hi Lisa, it's Krystal. This is the top of the site, and it's your new photo doing exactly what it should: the whole first screen. The pink fades up from the bottom so your face stays clear and the name sits under your chin in black, so it reads on the pink. The one button says book a consult, because that's the only thing a first visit needs to do. It fits the screen on a laptop, a desktop, and a phone, and I checked all three." },
  { n: 2, id: "menu", eyebrow: "Services", title: "Your menu, with your real prices", start: 0, note:
    "This is your menu, grouped the way you work: lip filler, face filler, Botox, and the specialty Botox work. Every price is the regular rate from your current menu, shown as a starting rate, so it's honest without boxing you in before the consult. Permanent makeup is there as by consult until you give me those numbers. Hover a row and it lights up pink. Anything I got wrong, you tell me and it's a two-minute fix." },
  { n: 3, id: "lisa", eyebrow: "Meet Lisa", title: "You, in black and white", start: 0, note:
    "This is the Meet Lisa section. Same photo, in black and white, so it reads as a second image instead of a repeat, and it ties back to the backdrop. The words here are placeholders in your voice. On the real site, this is where your story and your training go. Your clients are booking you, not a treatment, so this section matters more than people think." },
  { n: 4, id: "work", eyebrow: "The work", title: "Real results, not stock photos", start: 0, note:
    "The work. These are four of your lip results from your Instagram, cropped to match. I cleaned the promo text off one of them. The captions are my guesses, so correct the treatment and the amount on each. On the full site this becomes its own services page with more of your results, sorted by treatment. And one thing we'll need before any of these go live: a quick okay from each client to use her photo on your website." },
  { n: 5, id: "consult", eyebrow: "Book a consult", title: "One ask, at the end of every page", start: 0, note:
    "Every page ends the same way: book a consult. On the site I just showed you, that button opens a request form. With the booking option, it opens your calendar instead, and the client picks a time and pays her deposit right there. Below it is the footer with your handle, your city, and by consult only, which is the right tone for what you do." },
  { n: 6, id: "phone", eyebrow: "On a phone", title: "Most of your clients will see it like this", start: 0, note:
    "Almost everyone who finds you will find you on a phone, from your Instagram link. So here's the same site on a phone: the hero, the menu, and the work. Nothing is cut off and nothing needs pinching. This is also what loads fast, which matters, because a slow page on a phone is a lost booking." },
  { n: 7, id: "menu-print", eyebrow: "Extra · Printed menu", title: "The same menu, printed", start: 0, note:
    "This is the printed version of the menu, letter size, same system. Print it for the studio, hand it to a client after a consult, or post the Instagram version, which I've also made. When your prices change, I change the site and the menu together, so there's never two versions floating around." },
  { n: 8, id: "card", eyebrow: "Extra · Business card", title: "The card, off the same photo", start: 0, note:
    "And the business card, off the same photo. Pink front with your name, cream back with your services and how to reach you. This is a mockup; your phone and email go on before it prints. The point of showing it is that once the brand system exists, everything you need comes out of it looking like it belongs together." },
  { n: 9, id: "brand", eyebrow: "Extra · Brand system", title: "The rules, so it stays this way", start: 0, note:
    "Last, the brand system itself, which is yours to keep. Four colors, two typefaces, and the rules for using them: cream and black are the backgrounds, cherry is for writing, pink is for fields and anything you touch. Give this sheet to anyone who makes something for Badabling and it'll match. That's the thing most businesses never get, and it's included." },
];

export const VIDEO = {
  src: "",
  poster: "",
  minutes: "",
};

/** The mockup itself, as a page Lisa can scroll on desktop or phone. */
export const SITE_URL = "/for/lisa/badabling-site.html";

export const FILES = [
  { label: "The walkthrough deck", href: "/for/lisa/badabling-walkthrough.pdf", meta: "PDF · these nine pages, to read or forward" },
  { label: "Scope of work", href: "/for/lisa/badabling-scope-of-work.pdf", meta: "PDF · what the build includes, the timeline, the rate and the terms" },
  { label: "The website mockup", href: "/for/lisa/badabling-website-mockup.pdf", meta: "PDF · the desktop version, top to bottom" },
  { label: "The printed menu", href: "/for/lisa/badabling-menu.pdf", meta: "PDF · letter size, ready to print" },
  { label: "The business card", href: "/for/lisa/badabling-business-card.pdf", meta: "PDF · front and back, print size" },
];

export const STANDARD = [
  ["Custom build", "$4,500", "A full custom site: every page, integrations, launch and handover"],
  ["Care plan", "from $175 per month", "Essential $175 · Growth $450 · Partner $950. Optional, month to month"],
] as const;

export const PACKAGES = [
  {
    id: "site",
    flag: "Option A",
    title: "The site you just saw",
    price: "$2,500",
    items: [
      "The landing page, built as shown, on your own domain",
      "A services page with more of your results, sorted by treatment",
      "An about page",
      "A terms and conditions page, with your consult and intake forms linked from every booking button",
      "The printed menu and the business card, print-ready",
      "The full brand system: colors, type and the rules, in one sheet anyone can follow",
      "Responsive build, basic search setup, analytics, launch testing, and a training handoff",
    ],
  },
  {
    id: "booking",
    flag: "Option B",
    title: "Plus booking and payments",
    price: "$3,500",
    items: [
      "Everything in Option A",
      "Clients pick an appointment time on the site instead of sending a request",
      "Deposits and payments taken online at booking, through Stripe",
      "A confirmation email to you and to the client",
    ],
  },
] as const;

export const EXCHANGE = [
  "Case study rights: I can show the finished site and its numbers as my work",
  "A written testimonial and a short video one, within two weeks of launch",
  "Referrals in the Los Angeles market when someone asks who built it",
  "Analytics access for ninety days after launch, so I can report real numbers",
  "A tagged post and a link in your bio at launch",
  "A small “Site by Krystal Brook Coterie” credit in the footer for the first year",
] as const;

export const SUBSCRIPTIONS = [
  ["Domain", "about $15 a year", "Registered in your name. If it lapses, the site goes dark"],
  ["Hosting", "$20 a month", "Vercel Pro, the plan for business sites. Your account, your login"],
  ["Typeface license", "pass-through", "PP Neue Montreal and PP Editorial New, licensed for your domain. I confirm the exact price before invoicing"],
  ["Payments (Option B)", "2.9% + 30¢ per card payment", "Stripe’s published rate. No monthly fee; the money goes to your bank"],
  ["Bookings database (Option B)", "$25 a month", "Supabase Pro. The free plan pauses after a week of inactivity, which would take bookings offline; Pro never pauses. Booking emails run on Resend’s free tier"],
] as const;

export const NEEDS = [
  "Your okay on every price and item name on the menu, and the permanent makeup prices",
  "The original photo file from your photographer, and their okay to use it on the web",
  "A quick written okay from each client whose results appear on the site",
  "Any consent, licensing or medical-director wording the injectables side needs. I build it in; I don’t write it",
  "Your domain, or your okay for me to register one in your name",
  "The phone number and email you want on the site and the card",
  "Your deposit and cancellation policy, for the terms page",
] as const;
