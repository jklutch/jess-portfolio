/**
 * All of the site's copy lives here so it's easy to update
 * without touching layout code. Replace the sample content with your own!
 */

export const profile = {
  name: 'Jess',
  role: 'Public Sector UX Designer',
  tagline:
    'I design government services that are simple, inclusive, and maybe even a little bit joyful.',
  intro:
    'I partner with agencies, frontline staff, and residents to turn complicated policy into services people can actually use. I care about plain language, accessibility, and testing early with real people.',
  skills: ['Accessibility', 'Service design', 'Plain language', 'User research', 'Design systems'],
  // TODO: replace with your real contact details.
  email: 'hello@example.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'GitHub', href: 'https://github.com/' },
  ],
}

export type Project = {
  title: string
  org: string
  role: string
  year: string
  summary: string
  highlights: string[]
  outcome: { value: string; label: string }
  tags: string[]
  color: 'sunny' | 'mint' | 'bubblegum' | 'grape'
  icon: 'form' | 'map' | 'phone' | 'shield'
}

export const projects: Project[] = [
  {
    title: 'Making benefits applications less scary',
    org: 'State Department of Human Services',
    role: 'Lead UX designer',
    year: '2025',
    summary:
      'Redesigned a 40-page food and cash assistance application into a guided, mobile-first flow written in plain language.',
    highlights: [
      'Ran 30+ usability sessions with residents, including screen reader and low-literacy users',
      'Rewrote every question at a 6th grade reading level with policy and legal partners',
      'Added save-and-return so people could finish on their own schedule',
    ],
    outcome: { value: '38%', label: 'fewer abandoned applications' },
    tags: ['Service design', 'Plain language', 'Mobile'],
    color: 'sunny',
    icon: 'form',
  },
  {
    title: 'A permit portal people actually finish',
    org: 'City Planning & Development',
    role: 'UX designer & researcher',
    year: '2024',
    summary:
      'Mapped the end-to-end permitting journey and launched an online portal with clear status tracking for homeowners and contractors.',
    highlights: [
      'Facilitated journey-mapping workshops with permit techs and inspectors',
      'Designed a “where is my permit?” tracker that cut status calls',
      'Prototyped and tested in English and Spanish',
    ],
    outcome: { value: '2×', label: 'more permits submitted online' },
    tags: ['Journey mapping', 'Research', 'Bilingual'],
    color: 'mint',
    icon: 'map',
  },
  {
    title: '311 that answers on the first try',
    org: 'Metro Resident Services',
    role: 'Content & interaction designer',
    year: '2023',
    summary:
      'Restructured 600+ service request topics into a task-based information architecture with smart search.',
    highlights: [
      'Card sorted and tree tested with 400 residents',
      'Built a shared content style guide for 12 departments',
      'Partnered with engineers on accessible autocomplete',
    ],
    outcome: { value: '52%', label: 'faster to find the right request' },
    tags: ['Information architecture', 'Content design'],
    color: 'bubblegum',
    icon: 'phone',
  },
  {
    title: 'An accessible design system for the state',
    org: 'Office of Digital Services',
    role: 'Design systems contributor',
    year: '2022 – present',
    summary:
      'Co-created an open source component library with WCAG 2.1 AA baked in, now used by 20+ agency teams.',
    highlights: [
      'Documented accessibility guidance for every component',
      'Ran monthly office hours and accessibility trainings',
      'Set up automated and manual a11y testing in the release process',
    ],
    outcome: { value: '20+', label: 'agency teams using it' },
    tags: ['Design systems', 'Accessibility', 'Open source'],
    color: 'grape',
    icon: 'shield',
  },
]

export type Artwork = {
  title: string
  medium: string
  year: string
  description: string
  palette: [string, string, string, string]
  pattern: 'blobs' | 'stripes' | 'dots' | 'sun' | 'waves' | 'grid'
}

/**
 * The art pieces are drawn with lightweight SVG placeholders.
 * Swap them for real images (with descriptive alt text) whenever you're ready.
 */
export const artworks: Artwork[] = [
  {
    title: 'Sunday Market',
    medium: 'Gouache on paper',
    year: '2025',
    description: 'Overlapping round shapes in tangerine, pink, and plum on a cream background.',
    palette: ['#fff1d6', '#ff7f5c', '#ffc2d4', '#5a2dc2'],
    pattern: 'blobs',
  },
  {
    title: 'Bus Route 12',
    medium: 'Risograph print',
    year: '2024',
    description: 'Bold diagonal stripes of sunshine yellow, grape purple, and deep plum.',
    palette: ['#ffd447', '#5a2dc2', '#fff9f0', '#24163a'],
    pattern: 'stripes',
  },
  {
    title: 'Confetti Study',
    medium: 'Digital illustration',
    year: '2024',
    description: 'A scattered field of small mint, pink, and yellow dots on deep plum.',
    palette: ['#24163a', '#8fe3cf', '#ffc2d4', '#ffd447'],
    pattern: 'dots',
  },
  {
    title: 'Morning Commute',
    medium: 'Acrylic on canvas',
    year: '2023',
    description: 'A large yellow sun rising over layered pink and coral hills.',
    palette: ['#f4ecff', '#ffd447', '#ff7f5c', '#ffc2d4'],
    pattern: 'sun',
  },
  {
    title: 'Lake Days',
    medium: 'Watercolor',
    year: '2023',
    description: 'Gentle mint and lavender waves stacked from top to bottom.',
    palette: ['#e6fbf5', '#8fe3cf', '#c9b5ff', '#5a2dc2'],
    pattern: 'waves',
  },
  {
    title: 'Form Field Quilt',
    medium: 'Collage',
    year: '2022',
    description: 'A patchwork grid of squares in yellow, mint, pink, and purple.',
    palette: ['#ffd447', '#8fe3cf', '#ffc2d4', '#5a2dc2'],
    pattern: 'grid',
  },
]
