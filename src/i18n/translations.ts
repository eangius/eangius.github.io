// ABOUT: internationalized multilingual text string mappings.
// Add language codes here (& to `astro.config.mjs` -> i18n.locales) once translated.
export const languages = {
  en: "English",
} as const;

export const defaultLang = "en";

export const ui = {
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    "hero.name": "Elian Angius",
    "hero.title": "Applied Data Science & Machine Learning Lead",
    "hero.cta.contact": "Get in Touch",
    "hero.cta.projects": "View Projects",

    "about.title": "About",
    "about.body":
        "I work on creative & challenging data problems without clear answers — " +
        "usually somewhere between maps, language & real-world behavior.\n" +
        "I’m especially interested in the exploratory side of the work: " +
        "shaping questions, experimenting quickly & engineering ideas into real solutions.",

    "skills.title": "Skills",
    "skills.subtitle": "Topics I specialize in & enjoy working on:",

    "projects.title": "Projects",
    "projects.subtitle": "A selection of my works, experiments & prototypes:",
    "projects.viewRepo": "Source",
    "projects.viewDemo": "Live Demo",

    "search.placeholder": "Search the site...",

    "theme.toggle": "Toggle color theme",

    "language.label": "Language",

    "footer.rights": "All rights reserved",

    "404.title": "Page not found",
    "404.message": "The page you're looking for doesn't exist or has moved.",
    "404.cta": "Back to home",
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
