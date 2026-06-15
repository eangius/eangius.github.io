# Portfolio

Personal portfolio site built with [Astro](https://astro.build).

## Project Structure

```
.
├── public/                  # static as-is files served at the site
├── scripts/                 # one-off or build-time transformations
├── src/
│   ├── assets/              # images & resources imported into components, optimized by build process
│   ├── components/
│   │   ├── layout/          # page-wide structural pieces (Header, Footer)
│   │   ├── sections/        # page sections (Hero, Projects, Skills, ...)
│   │   └── ui/              # small reusable UI widgets (Icon, ThemeToggle, LanguageSwitcher, ...)
│   ├── content/
│   │   └── projects/        # one per project case study files
│   ├── content.config.ts    # content metadata schema definitions
│   ├── data/                # typed static data (skills, links, ...)
│   ├── i18n/                # translation strings & locale helpers
│   ├── layouts/             # shared page layouts (BaseLayout, ProjectLayout)
│   ├── pages/               # file-based routes (index, 404, projects/[slug])
│   └── styles/              # look & feel CSS
├── astro.config.mjs         # astro configuration
├── tsconfig.json            # typeScript configuration
└── package.json             # software dependencies
```

## Setup

Requires Node.js >= 22.12.0.

```bash
npm install
```

## Local development
Build & start local server (<http://localhost:4321>) with live reload.

```bash
npm run build && \
npm run check && \
npm run preview;
```

## Analytics

This site uses [PostHog](https://posthog.com) for cookieless, privacy-friendly
visitor analytics (no cookie consent banner required).

### Setup

Define [posthog](https://us.posthog.com/project/471452/settings/project-details) keys in the gitignore `.env` file.

```
PUBLIC_POSTHOG_PROJECT_TOKEN=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## Adding content

Projects are managed as Markdown files under `src/content/projects/`. To add a new
project, create a new `.md` file in that folder using `placeholder-project.md` as a
template, with the following frontmatter:

| Field      | Required | Description                                    |
| ---------- | -------- |------------------------------------------------|
| `title`    | yes      | Project title                                  |
| `summary`  | yes      | One or two sentence summary                    |
| `thumbnail`| no       | Path to an image under `public/`               |
| `tags`     | no       | List of tags (e.g. `["Python", "GIS"]`)        |
| `repoUrl`  | no       | Link to the source repository                  |
| `demoUrl`  | no       | Link to a live demo                            |
| `date`     | no       | Project date                                   |
| `order`    | no       | Sort order (lower shows first)                 |
| `draft`    | no       | Set to `true` to hide from the site            |

The body of the file (below the frontmatter) is rendered as the project's case-study
content.