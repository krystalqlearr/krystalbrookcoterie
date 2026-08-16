/**
 * Phase 01 discovery questionnaire content. Editing questions here never touches
 * the form component. Six named steps; one step per screen (the "02 / 06" progress
 * and current_step resume are step-based). Only the first question is required.
 */

export type DiscoveryQuestion = {
  id: string;
  question: string;
  hint?: string;
  required?: boolean;
};

export type DiscoveryStep = {
  key: string;
  eyebrow: string; // section label, e.g. "Your client"
  title: string; // display heading for the screen
  accent: string; // the one word lifted into the wine flare
  questions: DiscoveryQuestion[];
};

export const DISCOVERY_STEPS: DiscoveryStep[] = [
  {
    key: "position",
    eyebrow: "Start here",
    title: "Start here.",
    accent: "here",
    questions: [
      {
        id: "took_down",
        question: "When you look at your brand today, what specifically isn't feeling it?",
        hint: "Is it the look — or that it doesn't feel like you? The honest gut answer is the useful one.",
        required: true,
      },
    ],
  },
  {
    key: "client",
    eyebrow: "Your client",
    title: "Your client.",
    accent: "client",
    questions: [
      {
        id: "favorite_client",
        question: "Describe your favourite client as an actual person — not a type.",
        hint: "Their age, their life, what they're really coming to you for. The clearer this person is, the sharper every design decision gets.",
      },
      {
        id: "she_loves",
        question: "What do they say when they're thrilled with your work?",
        hint: "Their real words — they become the headlines and testimonials later.",
      },
      {
        id: "not_this_client",
        question: "Who don't you want as a client?",
        hint: "Knowing who to repel is as useful as knowing who to attract. Be honest.",
      },
      {
        id: "why_regulars",
        question: "Why do your regulars choose you over the cheaper option nearby?",
        hint: "The real reason, not the polite one — this is your actual differentiator.",
      },
      {
        id: "clients_from",
        question: "Where do clients come from now?",
        hint: "Referrals, Instagram, Google, walk-ins — roughly what share from each?",
      },
    ],
  },
  {
    key: "trajectory",
    eyebrow: "Where you're going",
    title: "Where you're going.",
    accent: "going",
    questions: [
      {
        id: "three_years",
        question: "What is this business in three years?",
        hint: "The category leader · a small studio with a waitlist · a training arm · a product line — or something else.",
      },
      {
        id: "raise_prices",
        question: "Are you raising prices — and by how much?",
        hint: "A rebrand is often what makes a price increase feel earned.",
      },
      {
        id: "keep_services",
        question: "Which two services would you keep?",
        hint: "The two you'd never drop show me where the core really is.",
      },
      {
        id: "solo_or_second",
        question: "Staying solo, or building a team?",
        hint: "A personal name and a studio scale differently — it changes the brand.",
      },
    ],
  },
  {
    key: "feeling",
    eyebrow: "Feeling",
    title: "Feeling.",
    accent: "Feeling",
    questions: [
      {
        id: "three_words",
        question: "Three words you want someone to feel — and three you'd hate.",
        hint: "The three to avoid are often more revealing than the three you want.",
      },
      {
        id: "first_timer",
        question: "What should a first-time client be thinking during their first experience with you?",
        hint: "The feeling you're designing for — nervous-excited, pampered, in expert hands?",
      },
      {
        id: "brand_love",
        question: "A brand you love outside your industry — and why.",
        hint: "Often better if it isn't in your field. Say what specifically you admire.",
      },
      {
        id: "hate_branding",
        question: "What do you hate in competitors' branding?",
        hint: "Be specific, and be a little mean — it's the most useful answer here.",
      },
      {
        id: "business_person",
        question:
          "The business as a person: quiet and expensive, warm and fun, or cool and a little intimidating?",
        hint: "There's no wrong answer — but there is a true one.",
      },
    ],
  },
  {
    key: "reality",
    eyebrow: "Reality",
    title: "Reality.",
    accent: "Reality",
    questions: [
      {
        id: "the_room",
        question: "Describe where your work actually happens — the space and the details a client notices.",
        hint: "In person or online — wherever the experience lives.",
      },
      {
        id: "maintain",
        question: "What are you willing to maintain yourself?",
        hint: "Be realistic — the best system is the one you'll actually keep up.",
      },
      {
        id: "keep_name",
        question: "Are you keeping the current name?",
        hint: "If there's any doubt, raise it now — before everything is built around it.",
      },
      {
        id: "sad_to_lose",
        question: "The one thing you'd be sad to lose?",
        hint: "A colour, a phrase, a mark — naming it means we protect it on purpose.",
      },
      {
        id: "live_by",
        question: "Is there a date you want this live by?",
        hint: "A launch, a season, an event? A real date shapes the scope.",
      },
    ],
  },
  {
    key: "last",
    eyebrow: "The last question",
    title: "The last question.",
    accent: "last",
    questions: [
      {
        id: "still_want",
        question:
          "If nothing about the design changed but you brought in 30% more next month, would you still want the rebrand?",
        hint: "No right answer — it just tells me whether this is about the work or how it feels.",
      },
    ],
  },
];

export const DISCOVERY_TOTAL_STEPS = DISCOVERY_STEPS.length;

/** Flat list of all questions (for building the submission email in order). */
export const DISCOVERY_QUESTIONS: DiscoveryQuestion[] = DISCOVERY_STEPS.flatMap((s) => s.questions);
