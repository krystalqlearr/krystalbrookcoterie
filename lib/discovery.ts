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
        question: "When you took everything down, what specifically wasn't feeling it?",
        hint: "Was it the look — or was it that it didn't feel like you?",
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
        hint: "Her age, her work, what she's getting lashes for.",
      },
      { id: "she_loves", question: "What does she say when she loves her set?" },
      { id: "not_this_client", question: "Who don't you want walking in?" },
      {
        id: "why_regulars",
        question: "Why do regulars pick you over the studio ten minutes away?",
        hint: "The real reason, not the polite one.",
      },
      { id: "clients_from", question: "Where do clients come from now?" },
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
        hint: "Biggest artist in the city · small studio with a waitlist · training academy · product line.",
      },
      { id: "raise_prices", question: "Are you raising prices — and by how much?" },
      { id: "keep_services", question: "Which two services would you keep?" },
      { id: "solo_or_second", question: "Solo, or a second chair?" },
    ],
  },
  {
    key: "feeling",
    eyebrow: "Feeling",
    title: "Feeling.",
    accent: "Feeling",
    questions: [
      { id: "three_words", question: "Three words you want someone to feel — and three you'd hate." },
      { id: "first_timer", question: "What should a first-timer be thinking on the table?" },
      { id: "brand_love", question: "A brand you love outside your industry — and why." },
      {
        id: "hate_branding",
        question: "What do you hate in competitors' branding?",
        hint: "Be specific, and be a little mean — it's the most useful answer here.",
      },
      {
        id: "business_person",
        question:
          "The business as a person: quiet and expensive, warm and fun, or cool and a little intimidating?",
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
        question: "Describe the actual room — wall colour, lighting, what's on the counter.",
      },
      { id: "maintain", question: "What are you willing to maintain yourself?" },
      { id: "keep_name", question: "Are you keeping the current name?" },
      { id: "sad_to_lose", question: "The one thing you'd be sad to lose?" },
      { id: "live_by", question: "Is there a date you want this live by?" },
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
          "If nothing about the design changed but you booked 30% more next month, would you still want the rebrand?",
      },
    ],
  },
];

export const DISCOVERY_TOTAL_STEPS = DISCOVERY_STEPS.length;

/** Flat list of all questions (for building the submission email in order). */
export const DISCOVERY_QUESTIONS: DiscoveryQuestion[] = DISCOVERY_STEPS.flatMap((s) => s.questions);
