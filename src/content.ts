/**
 * All of the site's copy lives here so it's easy to update
 * without touching layout code.
 *
 * Sources:
 *  - Public service projects: public pages on dcyf.mn.gov (linked from each project)
 *  - School projects: jessklutch.com/work
 */

const img = (file: string) => `${import.meta.env.BASE_URL}img/projects/${file}`

export const profile = {
  name: 'Jess Klutch',
  shortName: 'Jess',
  role: 'Public Sector UX Designer',
  /** Tagline in pieces; `highlight: true` pieces get the marker-style highlight. */
  tagline: [
    { text: 'I design experiences that are ' },
    { text: 'clear', highlight: true },
    { text: ', ' },
    { text: 'accessible', highlight: true },
    { text: ', and ' },
    { text: 'built with the people who use them', highlight: true },
    { text: '.' },
  ],
  skills: ['Design thinking', 'Iterative prototyping', 'Usability testing', 'Business & developer diplomat', 'HTML & CSS', 'Accessibility'],
  employment: {
    title: 'Digital Experience Product Designer',
    org: 'State of Minnesota',
    detail: 'MNIT, partnering with DHS and DCYF',
  },
  education: 'M.S. in Human-Computer Interaction, DePaul University',
  certifications: [
    {
      short: 'IAAP CPACC',
      name: 'Certified Professional in Accessibility Core Competencies',
      href: 'https://www.accessibilityassociation.org/cpacc',
    },
  ],
  photo: {
    src: `${import.meta.env.BASE_URL}img/jess.webp`,
    alt: 'Jess smiling and holding a waffle cone of ice cream at a seaside railing, with the sun setting over the ocean behind.',
    width: 720,
    height: 960,
  },
  email: 'jklutch@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jklutch/' },
    { label: 'Ravelry (knitting)', href: 'https://www.ravelry.com/people/jklutch' },
  ],
}

export type Image = { src: string; alt: string; width: number; height: number; caption?: string }

export type Section = {
  heading: string
  body?: string[]
  list?: string[]
  quote?: { text: string; cite: string }
  quotes?: { text: string; cite: string }[]
  images?: Image[]
}

export type Project = {
  slug: string
  group: 'public' | 'school'
  title: string
  kicker: string
  org: string
  timeframe: string
  summary: string
  role?: string
  team?: string
  tools?: string[]
  status?: string
  tags: string[]
  color: 'sunny' | 'mint' | 'bubblegum' | 'grape'
  icon: 'tracker' | 'clock' | 'link' | 'mind' | 'ear' | 'bus' | 'film' | 'leaf' | 'mountain' | 'code'
  thumb?: Image
  hero?: Image
  stats?: { value: string; label: string }[]
  sections: Section[]
  links: { label: string; href: string }[]
}

export const groups = {
  public: {
    heading: 'Public service work',
    description:
      'Recent projects with the Minnesota Department of Children, Youth, and Families (DCYF) and Minnesota IT Services (MNIT), making benefits and social services easier for residents and the workers who serve them.',
  },
  school: {
    heading: 'School projects',
    description:
      'Research and design projects from my M.S. in Human-Computer Interaction at DePaul University.',
  },
} as const

export const projects: Project[] = [
  // ───────────────────────────── Public service ─────────────────────────────
  {
    slug: 'case-status-tracker',
    group: 'public',
    title: 'Case Status Tracker',
    kicker: 'Benefits access',
    org: 'Minnesota DCYF & MNIT',
    timeframe: '2023 – present',
    status: 'Live in 24 counties, with five more joining',
    summary:
      'An online tool that lets people check the status of their food, housing, cash, or childcare assistance application from a phone, tablet, or computer, instead of waiting on hold.',
    role: 'Solo UX designer',
    tags: ['Agile', 'Usability testing', 'Lo-fi prototypes', 'WCAG 2.1 AA', 'User research', 'Service design', 'Bilingual'],
    color: 'sunny',
    icon: 'tracker',
    thumb: { src: img('case-status-thumb.webp'), alt: '', width: 640, height: 379 },
    hero: {
      src: img('case-status-hero.webp'),
      alt: 'The Case Status Tracker on MNbenefits.mn.gov, shown on a laptop. A card reads “Log in to see your status. You can see more when you continue with LoginMN,” with a “Continue with LoginMN” button, an “Or” divider, a “Continue as guest” button, and a note that guest access shows limited info.',
      width: 1400,
      height: 828,
    },
    stats: [
      { value: '9,662', label: 'successful logins in the first year' },
      { value: '58,854', label: 'verification request forms made available' },
      { value: '24', label: 'counties live, with five more joining' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'For someone waiting to learn whether food, housing, cash, or childcare assistance is moving forward, a missing document or missed deadline can delay benefits. Finding out what was happening often required a phone call, a mailed notice, or a visit to a county or Tribal Nation office.',
          'Interviews and county call-volume data showed that status-related calls added to caseworker workloads, while applicants still struggled to find timely information.',
        ],
      },
      {
        heading: 'Research with the people involved',
        body: [
          'The tracker grew from research that began in 2023 with applicants, caseworkers, program teams, county partners, and Tribal partners. Those partners helped the DCYF and MNIT teams design and test a tool focused on the questions applicants ask most:',
        ],
        list: ['What is happening with my case?', 'What comes next?', 'Who needs to take action?'],
      },
      {
        heading: 'Iterating with lo-fi prototypes',
        body: [
          'We took an iterative design approach within an agile framework. As the designer on the project, I created low-fidelity prototypes so we could start testing right away with applicants, our end users, and with program partners: state employees with expertise in the critical policy guidelines we needed to follow.',
          'At the same time, developers on the product team needed to start building. Lo-fi prototypes let us get designs into users’ hands and iterate on their feedback quickly. Developers worked from the same prototypes at first, since the code base already had existing styles.',
        ],
        images: [
          {
            src: img('cst-lofi-1.webp'),
            alt: 'Lo-fi wireframes for the case number lookup page. A basic layout lists the title, description, case number field, help, and Check status button. Option 1 asks “What is your case number?” with a “Where do I find my case number?” accordion, shown both collapsed and expanded. Option 2 adds the heading “View the status of your application” and a labeled Case number field, with a note to include the heading for added context.',
            width: 1206,
            height: 761,
            caption: 'Lo-fi options for the case number lookup page (select to enlarge)',
          },
          {
            src: img('cst-lofi-2.webp'),
            alt: 'Two lo-fi options for the status results. Option 1 is a program dashboard listing SNAP and Cash with their statuses and info accordions. Option 2 lists many programs, including SNAP, Diversionary Work Program, General Assistance, Minnesota Supplemental Aid, Refugee Cash Assistance, and MFIP, then groups them into Food and Cash program pages. Notes from a design office hour and a list of potential user stories sit alongside.',
            width: 1206,
            height: 761,
            caption: 'Lo-fi options for the program dashboard and results (select to enlarge)',
          },
          {
            src: img('cst-handoff.webp'),
            alt: 'Hand-off and revisions board dated January 9, 2024. Section 1a is the mobile landing page and 1b its error state for the case number lookup. Section 2 shows application status result pages flowing from a program dashboard to Food (SNAP) and Cash program details. Miscellaneous notes include green, yellow, and red status icon examples.',
            width: 1206,
            height: 761,
            caption: 'Hand-off to developers and revisions, January 2024 (select to enlarge)',
          },
          {
            src: img('cst-id-proofing.webp'),
            alt: 'ID-proofing flow. A Tennessen warning screen explains why basic information is needed to look up the status of an MNbenefits application. A “Confirm your identity” form asks for case number, last name, and birthdate, with a “Where do I find my case number?” accordion shown collapsed and expanded. After submitting, a notional program dashboard greets “Hi, Jess!” and lists Food (SNAP), Cash programs, Housing Support, and Child Care Assistance.',
            width: 1206,
            height: 761,
            caption: 'ID-proofing flow leading to the program dashboard (select to enlarge)',
          },
        ],
      },
      {
        heading: 'What launched',
        body: [
          'The tracker began as a pilot in July 2025. People can access it “as guest” using three case identifiers, or with their statewide LoginMN account. Both options are available in English and Spanish and meet web accessibility standards.',
          'Promotional materials told residents where to go and what each option gives them, in plain language.',
        ],
        images: [
          {
            src: img('case-status-promo.webp'),
            alt: 'Minnesota promotional graphic titled “Case Status Tracker & LoginMN: Log In to See Your Status. SNAP, Cash, Child Care Assistance, Emergency Assistance, and Housing Support.” It says: Visit mnbenefits.mn.gov/status/pages/trackerLogin. Sign in through LoginMN to see more information. Can’t create an account? Continue as guest to view a basic status for everyone on your application. A phone shows the tracker’s login screen.',
            width: 554,
            height: 554,
            caption: 'Promotional graphic for the LoginMN launch',
          },
        ],
      },
      {
        heading: 'What the first year showed',
        body: [
          'During its first year, people attempted to access case information 23,622 times, resulting in 9,662 successful logins. From July 2025 through July 2026, 58,854 verification request forms were made available through the tracker.',
          'The gap between attempts and logins told its own story. Attempts were unsuccessful when someone lived outside a participating area, entered an invalid case number, provided information that didn’t match the case, or hit a technical error. Each result helps the product team see where access and the user experience still need to improve.',
        ],
        quote: { text: 'Quick response and information given pointing me in the right direction.', cite: 'Case Status Tracker user' },
      },
      {
        heading: 'Feedback becomes a new feature',
        body: [
          'People valued getting information without waiting on the phone, and they were clear about what would make the tool more useful. One person appreciated “being able to see the current status of application” but wanted to know “what specifically is missing.”',
          'That feedback pointed the way to the next phase. In July 2026, an integration with LoginMN added a secure sign-in option, giving signed-in users more detail about the verification requests from their caseworker.',
        ],
        quote: { text: 'Would be extremely helpful if this was in every county.', cite: 'Anonymous feedback' },
      },
      {
        heading: 'Continuing to improve',
        body: [
          'County, Tribal Nation, and program partners keep guiding the work through a monthly advisory group, caseworker surveys, and an online engagement page. The approach: start with people’s experiences, build across organizational boundaries, and keep improving as needs become clearer.',
        ],
      },
    ],
    links: [
      { label: 'DCYF news: A clearer path to benefits', href: 'https://dcyf.mn.gov/news/clearer-path-benefits-information-directly-minnesotans-hands' },
      { label: 'Use the Case Status Tracker', href: 'https://mnbenefits.mn.gov/status/pages/trackerLogin' },
      { label: 'Case Status Tracker engagement page', href: 'https://minnesotadcyf.us.engagementhq.com/case-status-tracker-pilot-engagement' },
    ],
  },
  {
    slug: 'time-entry-transformation',
    group: 'public',
    title: 'Time Entry Transformation',
    kicker: 'Workforce tools',
    org: 'Minnesota DCYF, DHS & MNIT',
    timeframe: 'Completed 2026',
    status: 'Available statewide. Finalist for the 2026 Optimal Experience Award for Research for Social Good.',
    summary:
      'A mobile-first web app that replaced the slow, crash-prone case notes and time tracking in SSIS for Minnesota’s child welfare workers. Workers save about three hours a week, time they can spend with children and families.',
    role: 'Solo UX designer',
    tags: ['Agile', 'Usability testing', 'WCAG 2.1 AA', 'Field work', 'Lo-fi prototypes', 'Co-design', 'Mobile'],
    color: 'mint',
    icon: 'clock',
    thumb: { src: img('time-entry-thumb.webp'), alt: '', width: 640, height: 360 },
    hero: {
      src: img('time-entry-feature.webp'),
      alt: 'A social worker wearing a name badge smiles while talking with a young girl and her mother on a couch. In the foreground, a phone shows the SSIS Time entry screen with Date, Time, and Active efforts fields. The Minnesota state logo is in the corner.',
      width: 1400,
      height: 788,
    },
    stats: [
      { value: '75+', label: 'child welfare workers in interviews, usability tests, and on-site observations' },
      { value: '~3 hrs', label: 'saved per worker each week' },
      { value: '180,000', label: 'hours a year back for supporting children and families' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Child welfare workers in Minnesota’s counties and Tribal Nations rely on the Social Service Information System (SSIS) to document their work with children and families. But the aging, Windows-based application had become slow, prone to crashes, and limited to Windows devices.',
          'Workers improvised: drafting case notes in Word, re-entering work after system failures, and doing manual math to track their time. Every hour lost to failing technology was an hour not spent serving children and families in crisis.',
        ],
      },
      {
        heading: 'Start where change is most urgent',
        body: [
          'Rather than wait years for a full replacement, the state focused on the part of SSIS workers said needed to change most. The project replaced the case notes and time tracking portion of the desktop system with a fast, accessible, responsive web app that securely connects to SSIS. Workers can now document from anywhere, on any device, in real time, without waiting to get back to the office.',
        ],
      },
      {
        heading: 'Research with workers, in the field',
        body: [
          'The work was grounded in human-centered design and ethical research. More than 75 child welfare workers took part in interviews, usability tests, and on-site observations, and we tested prototypes to learn which time-tracking changes would actually help. Using Optimal Workshop, we captured nearly 1,000 individual insights, a clear evidence base for every design decision.',
          'Because child welfare work involves sensitive information, we protected participants throughout:',
        ],
        list: [
          'Participation was voluntary, with research scheduled around workers’ caseloads',
          'No personally identifiable information (PII) or protected health information (PHI) went into any research tool',
          'Insights were stored without linking them to individual workers or families',
        ],
      },
      {
        heading: 'Design process',
        body: [
          'The team followed an iterative, agile process to build the application, shipping in sprints and adjusting as we learned.',
          'In between iterations, I helped co-facilitate usability testing sessions, first with Figma prototypes and later in the project with the actual test site. We ran tests with county social workers, our end users, and with internal state staff partners.',
          'Wireframes like these for the Activity Log mapped out each state of the screen, from empty to filled in, on desktop and mobile, along with the specific components the developers would build.',
        ],
        images: [
          {
            src: img('tet-activity-log-wireframes.webp'),
            alt: 'Activity Log wireframes on a dark canvas. An empty-state desktop screen has an arrow labeled “Select Workgroup and Activity; Click Refresh” leading to desktop and narrower layouts of the filled-in log, with hour totals above a table of time records. A tall mobile layout shows the records as stacked cards. A column of specific components includes table filters, a sign-off toggle, buttons, toggle columns, pagination, and a workgroup dropdown.',
            width: 1460,
            height: 828,
            caption: 'Activity Log wireframes: screen states, layouts, and components (select to enlarge)',
          },
        ],
      },
      {
        heading: 'Built with the people who use it',
        body: [
          'DCYF partnered closely with DHS, MNIT, counties, and frontline staff from the start. Workers tested early versions, shared feedback every two weeks, and saw that feedback shape each iteration. A public project site posted a review after every sprint and gave workers a suggestion box, surveys, a place for questions, and training videos.',
          'In one round of user acceptance testing, 17 county workers from 13 agencies tested the new Activity Log. Their feedback led to changes before the statewide release, including:',
        ],
        list: [
          'Adding the Purpose field to Quick Entry for time that isn’t tied to a program',
          'Adding date ranges to the Activity Log to match SSIS',
          'Letting people go back to the Activity Log, not only start a new entry',
          'Adding info icons to explain the Total and Current View calculations',
          'A card view of the Activity Log for phones, alongside the desktop grid',
        ],
        quote: {
          text: 'This work succeeded because we built it together—with counties, with partners, and with the people who use the system every day.',
          cite: 'Minnesota county worker who took part in early testing',
        },
      },
      {
        heading: 'What shipped',
        body: [
          'Workers didn’t want to reinvent their workflows. They wanted reliable technology that supported the way they already worked. So we kept familiar fields and processes and modernized everything behind them.',
        ],
        list: [
          'Login simplified from three screens to one',
          'No more typing delays or crashes',
          'Autosave and drafts, so work is never lost',
          'A responsive, mobile-first design for use anywhere, including in the field',
          'Improved accessibility for all workers',
          'An Activity Log to view, sort, and search time records from the web app or SSIS, with running totals so gaps are easy to spot',
          'Editing of submitted entries, plus a Case Load button to add time to another worker’s caseload',
        ],
        images: [
          {
            src: img('time-entry-hero.webp'),
            alt: 'The Time Entry web app’s Activity Log on a laptop. Totals at the top read 176 hours overall and 3 hours 15 minutes in the current view, above a searchable, filterable grid of time records with columns for service, hours, activity, regarding, and purpose.',
            width: 860,
            height: 590,
            caption: 'The Activity Log on desktop',
          },
        ],
      },
      {
        heading: 'Results',
        list: [
          'More than 1,150 agency workers have access to the tool',
          'More than 650 workers across 80 agencies have submitted over 11,575 records',
          'Strong mobile use shows workers are using it in the office and in the field',
          'Workers report saving about three hours a week (two to five, depending on the worker). Across 1,150 workers, that’s almost 180,000 hours a year back for children and families',
        ],
        quote: {
          text: 'I’ve loved having a web-based version, and it has already started to save time in my day.',
          cite: 'County worker',
        },
      },
      {
        heading: 'National recognition',
        body: [
          'The project’s research earned Minnesota a spot as a finalist for the Optimal Experience Award for Research for Social Good, an international award for projects that protect research participants and deliver better outcomes. Judges praised the team for protecting participants’ sensitive information and putting its findings to work for child welfare workers.',
        ],
      },
      {
        heading: 'A new way of working',
        body: [
          'Time Entry Transformation gives workers relief today while Minnesota builds its new Comprehensive Child Welfare Information System. The research methods, designs, and worker feedback behind it will shape that larger effort, so the future of child welfare technology is built with workers, not just for them. It wasn’t always polished, but it delivered value faster and built trust along the way.',
        ],
        quotes: [
          {
            text: 'When technology improvements reduce administrative burden, we help create more space for meaningful, human-centered work with children and families.',
            cite: 'Tikki Brown, Commissioner, Minnesota Department of Children, Youth, and Families',
          },
          {
            text: 'Time Entry Transformation shows what’s possible when we’re aligned, focused on the right problem, and willing to work differently.',
            cite: 'Tikki Brown, Commissioner, Minnesota Department of Children, Youth, and Families',
          },
        ],
      },
    ],
    links: [
      { label: 'MNIT: Modernizing case notes and time-tracking for Minnesota’s child welfare workforce', href: 'https://mn.gov/mnit/media/blog/?id=38-768242' },
      { label: 'Watch a training video: Using the Activity Log', href: 'https://minnesotadcyf.us.engagementhq.com/time-entry-transformation/widgets/106977/videos/7115' },
      { label: 'Project site with sprint reviews and worker feedback', href: 'https://minnesotadcyf.us.engagementhq.com/time-entry-transformation' },
      { label: 'DCYF news: How DCYF modernized a key tool to support child welfare workers', href: 'https://dcyf.mn.gov/news/how-dcyf-modernized-key-tool-support-child-welfare-workers' },
      { label: 'Optimal Experience Awards 2026 winners and finalists', href: 'https://www.optimalworkshop.com/blog/announcing-the-winners-of-the-2026-optimal-experience-awards' },
    ],
  },
  {
    slug: 'mnbenefits-maxis-integration',
    group: 'public',
    title: 'MNbenefits to MAXIS integration (M2M)',
    kicker: 'Systems integration',
    org: 'Minnesota DCYF, DHS, MNIT & Governor’s Office',
    timeframe: 'In progress, pilot in 2027',
    status: 'Testing complete. Pilot implementation planned for 2027.',
    summary:
      'Connecting MNbenefits, the online application Minnesotans use, to MAXIS, the system workers use to determine eligibility and issue benefits, so there’s less re-keying of data and people get benefits faster.',
    role: 'Solo UX designer',
    tags: ['Agile', 'Lo-fi prototypes', 'WCAG 2.1 AA', 'Service design', 'Systems thinking', 'County partnership'],
    color: 'bubblegum',
    icon: 'link',
    stats: [
      { value: '3', label: 'phases: Design/Build, Launch/Iterate, Evaluate/Iterate' },
      { value: '2027', label: 'pilot implementation begins' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: [
          'Counties and Tribal Nations administering public programs face high workloads, manual processes, and systems that aren’t well connected. Information people submit online often has to be entered again by hand before eligibility can be determined.',
          'The work is part of the One Minnesota Plan, led collaboratively by DCYF, the Department of Human Services, Minnesota IT Services, and the Governor’s Office.',
        ],
      },
      {
        heading: 'The approach',
        body: [
          'With testing complete, the state is implementing a secure integration layer that lets systems share data accurately and reliably. Its first use is a pilot connecting MNbenefits to MAXIS.',
          'The state is partnering with counties and Tribal Nations to define the pilot and identify the improvements that will make a difference in day-to-day operations.',
        ],
      },
      {
        heading: 'What the connection will improve',
        list: ['Less data entry', 'Improved accuracy', 'Faster processing and time to benefits', 'Better experience for workers and applicants'],
      },
      {
        heading: 'Rolling out carefully',
        body: [
          'Work moves forward in three phases to minimize disruption: Design/Build, Launch/Iterate, and Evaluate/Iterate. Pilot implementation is set to begin in 2027, with testing and feedback continuing through the year.',
        ],
      },
      {
        heading: 'The bigger picture',
        body: ['The integration layer is the first step in a long-term effort to modernize Minnesota’s human services system. It will:'],
        list: [
          'Improve how quickly people receive benefits',
          'Increase payment accuracy',
          'Reduce manual work and errors',
          'Strengthen data sharing and coordination',
          'Help identify risks earlier and support program integrity',
        ],
      },
    ],
    links: [
      { label: 'DCYF: MNbenefits to MAXIS integration project', href: 'https://dcyf.mn.gov/mnbenefits-maxis-integration-project' },
      { label: 'MNbenefits to MAXIS pilot engagement page', href: 'https://minnesotadcyf.us.engagementhq.com/reducing-time-to-benefits-mnbenefits-to-maxis-integration-pilot' },
    ],
  },

  // ───────────────────────────── School (DePaul HCI M.S.) ─────────────────────────────
  {
    slug: 'wellmind',
    group: 'school',
    title: 'WellMind',
    kicker: 'Research & design',
    org: 'DePaul University',
    timeframe: '2022',
    role: 'One of four UX researchers; sole designer of the prototype',
    tools: ['Miro', 'ATLAS.ti', 'R', 'Qualtrics', 'Adobe XD'],
    summary:
      'How do people look for mental health help online? Observations, interviews, and a survey shaped the design of WellMind, a fictional site for finding a therapist who’s the right fit.',
    tags: ['Contextual inquiry', 'Interviews', 'Survey & stats', 'Prototyping'],
    color: 'grape',
    icon: 'mind',
    thumb: { src: img('wellmind-thumb.webp'), alt: '', width: 640, height: 382 },
    hero: {
      src: img('wellmind-hero.webp'),
      alt: 'WellMind landing page mockup: a calm lake photo with the heading “Find mental health help near you” and a location search box, above a row of featured mental health articles.',
      width: 1400,
      height: 835,
    },
    stats: [
      { value: '8', label: 'observation sessions' },
      { value: '8', label: 'interviews' },
      { value: '90%', label: 'of survey respondents use online sources for mental health info' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'This project was inspired by the increased demand for quality mental healthcare during the COVID-19 pandemic. The research came together as recommendations for WellMind, a website and app that helps people find therapists who meet their needs. WellMind is a fictional product created as a student project.',
        ],
      },
      {
        heading: 'Research questions',
        list: [
          'How do users leverage online resources to research mental health conditions and seek professional help?',
          'How can a technology-based solution improve the process of searching for resources and seeking professional help?',
        ],
      },
      {
        heading: 'Observations',
        body: [
          'We observed eight participants, ages 23 to 34, using a contextual inquiry format. Each completed a scenario-based task: find professional help for stress at work. We coded the notes in ATLAS.ti with an AEIOU framework and built an affinity diagram in Miro.',
          'Key themes: people leaned on filters, maps, bios, and ratings; knowledge of licensing credentials (LICSW, LMFT) varied widely; some researched coping skills before choosing a provider; and insurance, cost, and location were real barriers.',
        ],
        images: [
          {
            src: img('wellmind-observation-affinity.webp'),
            alt: 'Affinity diagram of color-coded sticky notes from the observations, grouped under Feature Focus, Licensing/Credentials, BetterHelp, Privacy & Trust, Research First, Barriers, Other Sources of Help, and Understanding Treatment.',
            width: 1164,
            height: 810,
            caption: 'Affinity diagram of observation findings',
          },
        ],
      },
      {
        heading: 'Interviews',
        body: [
          'Eight interviews with people who had used online mental health resources in the past year explored how they researched, set criteria, evaluated, and made a final choice, recalling a real search for themselves or a loved one.',
          'Everyone used online reviews and ratings, though some doubted them. Biographies helped people choose. Preferences for in-person therapy and for therapists inclusive of gender, race, and sexuality shaped decisions. Insurance, mental health literacy, and distrust of online information were barriers.',
        ],
      },
      {
        heading: 'Survey',
        body: [
          'A Qualtrics survey, shared through DePaul’s participant pool and social media, tested the hypothesis that people who do less self-help research find it harder to pick a therapist online (Mann-Whitney U test). The hypothesis was rejected, as there was no significant difference, but the survey surfaced clear trends in valued features and barriers.',
        ],
        images: [
          {
            src: img('wellmind-survey-barriers.webp'),
            alt: 'Bar chart: “What would stop you from scheduling an appointment with a mental health provider that you found online?” Therapist fit 12 respondents, scheduling issues 11, money and insurance concerns 9, emotional hesitation 6, info skepticism 1, mental health literacy 0.',
            width: 1400,
            height: 907,
            caption: 'Therapist fit and scheduling were the top barriers',
          },
          {
            src: img('wellmind-survey-features.webp'),
            alt: 'Stacked bar chart: “How helpful do you find the following features?” Biographies were rated extremely helpful by 14 and somewhat helpful by 7. Ratings and reviews were rated extremely helpful by 7, somewhat helpful by 16, and neutral by 4.',
            width: 720,
            height: 392,
            caption: 'Biographies were rated the most helpful feature',
          },
        ],
      },
      {
        heading: 'Design implications',
        list: [
          'An optional compatibility questionnaire to match people with therapists who share or respect their identity and values',
          'Standardized profiles with certifications and specialties, with built-in explanations of licensing terms to support mental health literacy',
          'Detailed biographies, optional video introductions, and free consultations to help gauge fit',
          'Moderated, anonymous ratings and reviews',
          'Online scheduling with visible availability and a waitlist option',
          'An anonymous community message board',
        ],
      },
      {
        heading: 'Prototype',
        body: [
          'As the sole designer, I turned these implications into mid-fidelity screens in Adobe XD: a landing page, therapist search, the compatibility questionnaire and its results, therapist profiles, and a community page.',
        ],
        images: [
          {
            src: img('wellmind-match-results.webp'),
            alt: 'Compatibility results screen listing best-match therapists with photos, licensure, a short biography, and a match percentage, next to a summary of the user’s questionnaire answers.',
            width: 1400,
            height: 1505,
            caption: 'Compatibility questionnaire results ranked by match percentage',
          },
          {
            src: img('wellmind-profile.webp'),
            alt: 'Therapist profile screen with a biography, credentials and trainings, affiliations, a scheduling calendar, anonymous reviews, and professional endorsements.',
            width: 1400,
            height: 1919,
            caption: 'Therapist profile',
          },
        ],
      },
      {
        heading: 'Next steps',
        list: [
          'Add screens for logging in, posting to the community, and scheduling with a provider',
          'Create mobile wireframes',
          'Add interactions and run usability tests with the target audience, then iterate',
        ],
      },
    ],
    links: [{ label: 'Original case study on jessklutch.com', href: 'https://jessklutch.com/work/wellmind.html' }],
  },
  {
    slug: 'screen-reader-comparison-shopping',
    group: 'school',
    title: 'Comparison shopping online for people who are blind',
    kicker: 'Accessibility research',
    org: 'DePaul University',
    timeframe: '2022',
    role: 'Researcher on a team of four',
    team: 'Elena Damm, Jessica Klutch, Jessica Osei, and Natalie Roman',
    tools: ['Zoom', 'Miro'],
    summary:
      'An observational study of how people who use screen readers compare products online, and what ecommerce sites can do to make it easier.',
    tags: ['Accessibility', 'Observation', 'Screen readers'],
    color: 'sunny',
    icon: 'ear',
    thumb: { src: img('screen-readers-thumb.webp'), alt: '', width: 640, height: 438 },
    hero: {
      src: img('screen-readers-hero.webp'),
      alt: 'An Amazon “Compare with similar items” table showing three coffee makers side by side with rows for rating, price, shipping, seller, color, dimensions, weight, and material.',
      width: 1400,
      height: 958,
    },
    stats: [
      { value: '4', label: 'participants who are blind' },
      { value: '3.5 / 10', label: 'median task difficulty rating' },
    ],
    sections: [
      {
        heading: 'Why it matters',
        body: [
          'People who are blind often prefer the autonomy of shopping online, but access depends on how well sites follow accessibility guidelines. Comparison shopping adds more work: browsing across pages and synthesizing product descriptions, images, and reviews that are often poorly structured.',
        ],
      },
      {
        heading: 'How we studied it',
        body: [
          'We observed four experienced online shoppers, ages 51 to 68, who use screen readers. Over Zoom, each was asked to find a coffee maker with a built-in grinder and a large capacity for under $150 on Amazon, using their own device and assistive technology. Sessions included pre- and post-task interviews, and we synthesized findings through affinity mapping in Miro.',
        ],
      },
      {
        heading: 'What we found',
        list: [
          'Inconsistent and noisy layouts: features like “View in Your Room” and “360 view” were “visual noise” that participants had to skip past',
          'Inaccessible content: a comparison table confused a participant about how many products it held, and secondary product images had no alt text',
          'Search: descriptive product titles and feature-specific keyword search helped people find suitable products faster',
          'Product information: the “About this item” section, “What’s in the box,” warranties, and manuals were key to deciding',
        ],
        quote: { text: '…it takes [me] so long to shop for things… especially when [I’m] doing comparison shopping.', cite: 'Participant 4' },
      },
      {
        heading: 'Implications for design',
        list: [
          'Reduce visual noise and let screen reader users skip features that don’t serve them',
          'Use consistent, well-structured layouts and headings across product pages',
          'Make comparison tables accessible with captions and properly associated headers',
          'Give every image alt text, or mark it decorative',
          'Require descriptive, feature-specific product titles and support detailed keyword search',
          'Format “About this item” consistently, and include box contents, warranty, and accessible manuals',
        ],
      },
    ],
    links: [{ label: 'Read the full paper (PDF)', href: 'https://jessklutch.com/work/onlineComparisonShopping.pdf' }],
  },
  {
    slug: 'san-diego-mts-accessibility',
    group: 'school',
    title: 'San Diego MTS accessibility evaluation',
    kicker: 'Accessibility evaluation',
    org: 'DePaul University',
    timeframe: 'Oct 2022',
    role: 'Solo evaluator',
    tools: ['W3C Easy Checks', 'W3C validators', 'Siteimprove', 'WAVE', 'VoiceOver'],
    summary:
      'An accessibility audit of the San Diego Metropolitan Transit System’s homepage and Bus Routes page against WCAG, because many people with disabilities rely on transit.',
    tags: ['WCAG', 'Audit', 'Public transit'],
    color: 'mint',
    icon: 'bus',
    thumb: { src: img('mts-thumb.webp'), alt: '', width: 640, height: 438 },
    hero: {
      src: img('mts-hero.webp'),
      alt: 'The San Diego MTS homepage, with a Trip Planner form beside a photo of a trolley, and below it a schedules menu and an image carousel.',
      width: 1400,
      height: 958,
    },
    stats: [
      { value: '104', label: 'link contrast violations on the Bus Routes page' },
      { value: '36', label: 'duplicate ID errors' },
    ],
    sections: [
      {
        heading: 'Methods',
        body: [
          'I evaluated the MTS homepage and Bus Routes page with the W3C Easy Checks, the W3C HTML and CSS validators, a readability score, and the Siteimprove and WAVE browser extensions. I then tested both pages with VoiceOver on Mac. Findings were organized with the POUR framework using WebAIM’s WCAG checklist.',
        ],
      },
      {
        heading: 'Key findings',
        list: [
          'Images missing alt text, decorative images not marked as decorative, and buttons with no text',
          'Low-contrast blue links on white, with 104 contrast violations on the Bus Routes page',
          'An auto-playing image carousel that users can’t pause',
          'A “Skip to main content” link that skipped past the main content to the footer',
          'Every schedule link labeled just “PDF,” with nothing to tell routes apart',
          'Barely visible keyboard focus and no meaningful heading hierarchy',
          'Spanish text without a language attribute, plus many HTML parsing errors and duplicate IDs',
        ],
      },
      {
        heading: 'The screen reader experience',
        body: [
          'With VoiceOver, unlabeled icon buttons were announced only as “button.” The carousel read entire cards even after moving on, so it was easy to lose your place. Route numbers styled as “1|” were read aloud as “1 vertical line.”',
        ],
      },
      {
        heading: 'Recommendations',
        list: [
          'Add alt text to all images and avoid images of text',
          'Make keyboard focus clearly visible',
          'Give every input field and button a descriptive label',
          'Point “Skip to main content” at the main content',
          'Give each PDF link a unique, descriptive name',
          'Mark up other languages with the lang attribute',
        ],
      },
    ],
    links: [{ label: 'Read the full report (PDF)', href: 'https://jessklutch.com/work/web_accessibility_report.pdf' }],
  },
  {
    slug: 'music-box-theatre',
    group: 'school',
    title: 'Music Box Theatre redesign',
    kicker: 'Information architecture',
    org: 'DePaul University',
    timeframe: 'Graduate coursework',
    summary:
      'A site structure redesign and content inventory for a well-known Chicago theater, using information architecture methods like card sorting and task-based IA testing.',
    tags: ['Card sorting', 'Content inventory', 'IA testing'],
    color: 'bubblegum',
    icon: 'film',
    thumb: { src: img('music-box-thumb.webp'), alt: '', width: 640, height: 438 },
    hero: {
      src: img('music-box-hero.webp'),
      alt: 'Four grayscale mobile wireframes for the Music Box Theatre: a featured film, a “Now Showing” list of movies, a showtimes screen, and a ticket confirmation.',
      width: 1400,
      height: 958,
    },
    sections: [
      {
        heading: 'Overview',
        body: [
          'A site structure redesign and content inventory for Chicago’s Music Box Theatre, using information architecture methods including card sorting and task-based IA testing.',
          'The full write-up, with the content inventory, testing, and wireframes, is linked below.',
        ],
      },
    ],
    links: [{ label: 'View the full project (Google Drive)', href: 'https://drive.google.com/file/d/1ehQte0ryTIhwQWbeXebnVPq3YsUj1Kjf/view?usp=sharing' }],
  },
  {
    slug: 'urban-summit',
    group: 'school',
    title: 'Urban Summit',
    kicker: 'Prototype design',
    org: 'DePaul University',
    timeframe: 'Sep – Nov 2021',
    role: 'One of three UX designers; designed the map screens, ran usability tests, and analyzed results',
    tools: ['Figma', 'Axure', 'Photoshop'],
    summary:
      'A phone and smartwatch app concept that helps solo adventurers feel safe outdoors, with or without cell signal, and get help fast when they need it.',
    tags: ['Mobile', 'Smartwatch', 'Usability testing'],
    color: 'mint',
    icon: 'mountain',
    thumb: { src: img('urban-summit-thumb.webp'), alt: '', width: 640, height: 328 },
    hero: {
      src: img('urban-summit-hero.webp'),
      alt: 'Four high-fidelity phone screens for Urban Summit: choosing a trail, sharing live location with an emergency contact, a map route, and an alert about a fallen tree blocking the path.',
      width: 1400,
      height: 718,
    },
    stats: [
      { value: '4', label: 'usability test participants' },
      { value: '2', label: 'devices designed for: phone and watch' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'As a team of three woman-identifying designers, we were inspired by the rise in violence against women. The overarching goal: help all people feel safe exercising alone outside, with or without cell signal, and guide them when they need help.',
        ],
        list: [
          'Log your activity and destination, with details in case rescue is needed',
          'Share your location with others',
          'Read and post about specific locations and activities',
          'A wearable communicator',
        ],
      },
      {
        heading: 'From sketches to mid-fi',
        body: [
          'We each sketched the main features, built a shared mood board from smartwatches and satellite GPS locators, and designed a logo. Then we built mid-fidelity phone and watch prototypes in Figma to test our ideas.',
        ],
        images: [
          {
            src: img('urban-summit-moodboard.webp'),
            alt: 'Mood board collage of sunset color swatches, hikers on trails, a tent in a forest, fitness tracker data screens, and a smartwatch with an orange band.',
            width: 692,
            height: 874,
            caption: 'Mood board',
          },
          {
            src: img('urban-summit-midfi.webp'),
            alt: 'Four grayscale mid-fidelity phone screens: choosing a trail or custom route, searching for a trail, a prompt to share live location, and a map route with a hazard marker.',
            width: 1400,
            height: 711,
            caption: 'Mid-fidelity phone screens',
          },
        ],
      },
      {
        heading: 'Usability testing',
        body: [
          'After a pilot test among ourselves, we tested with four users, mostly over video. Moderators followed a shared script, timed each task, and noted attitudes, followed by questions about perceived challenges.',
        ],
        list: [
          'Every participant was confused by the “start new activity” button and by how to add an emergency contact',
          'Three participants struggled to find the ambulance’s location, and two gave up',
          'In satellite mode, three participants struggled to contact family',
          'On the watch, the rectangular “help” button read as tech support, and “Nice work!” felt wrong after an emergency ended a session',
        ],
      },
      {
        heading: 'Hi-fi changes',
        list: [
          'Renamed “start new activity” to “enter activity info” and separated emergency contacts from activity tracking',
          'Merged custom routes into the search box',
          'Changed “Help is on the way” to “check ambulance location” and made calling 911 clear with a green phone icon',
          'Added a top bar to switch conversations in satellite mode',
          'Made the watch help button consistent and ended tracking automatically in an emergency',
        ],
        images: [
          {
            src: img('urban-summit-watch.webp'),
            alt: 'High-fidelity smartwatch screens: jogging pace and distance tracking, an “End this tracking?” prompt, an alert about an abnormal heart rate with a Help button, a call to 911, and an exercise report.',
            width: 1400,
            height: 738,
            caption: 'High-fidelity watch screens',
          },
        ],
      },
      {
        heading: 'Reflections',
        body: [
          'This project was as much about teambuilding as prototyping. We learned to lean on each other’s strengths. My biggest takeaway was to sweat the details of icon use: the ambulance icon that didn’t lead to the ambulance’s location caused real confusion. Next time, we’d gather insights earlier with lo-fi models, before committing to design elements.',
        ],
      },
    ],
    links: [
      { label: 'Hi-fi phone prototype (Figma)', href: 'https://www.figma.com/proto/JFVXUe5VvtleOgNIBYy2hi/hi-fi-prototype-for-phone---Portfolio?node-id=6%3A1442&scaling=scale-down&page-id=0%3A1&starting-point-node-id=6%3A1442&show-proto-sidebar=1' },
      { label: 'Hi-fi watch prototype (Figma)', href: 'https://www.figma.com/proto/HYYniohB1p5fxAQG1znA4V/hi-fi-for-watch---Portfolio?node-id=3%3A51&scaling=scale-down&page-id=0%3A1&starting-point-node-id=3%3A51&show-proto-sidebar=1' },
      { label: 'Original case study on jessklutch.com', href: 'https://jessklutch.com/work/urban_summit.html' },
    ],
  },
  {
    slug: 'organza',
    group: 'school',
    title: 'Organza',
    kicker: 'Prototype design',
    org: 'DePaul University',
    timeframe: 'Mar – May 2021',
    role: 'One of four UX designers; created personas and the user flow, moderated usability tests, and recommended design changes',
    tools: ['Figma', 'Adobe XD'],
    summary:
      'A concept app that helps households plan meals, shop, and track what’s about to expire, so less food ends up in the trash.',
    tags: ['Interviews', 'Personas', 'Usability testing'],
    color: 'sunny',
    icon: 'leaf',
    thumb: { src: img('organza-thumb.webp'), alt: '', width: 640, height: 421 },
    hero: {
      src: img('organza-hero.webp'),
      alt: 'Four Organza wireframes: a shopping list, a household inventory with expiration dates, an item scanner, and a calendar showing when foods expire.',
      width: 806,
      height: 530,
    },
    stats: [
      { value: '11', label: 'interviews' },
      { value: '64%', label: 'cook based on what’s already in the fridge' },
      { value: '$20–30', label: 'estimated food wasted per person each month' },
    ],
    sections: [
      {
        heading: 'Research',
        body: [
          'We interviewed 11 people of different ages and lifestyles, mostly over Zoom or phone, about how they shop, cook, track perishables, and feel about waste. People wasted less than we, and they, expected, but almost everyone felt awful, annoyed, or disappointed when food went bad.',
        ],
        list: [
          '64% cook meals based on what they have in the fridge',
          '18% use meal planning services',
          '64% will eat food past its expiration date if it looks, smells, and tastes fine',
        ],
      },
      {
        heading: 'Personas and flow',
        body: ['We turned the interviews into three personas and mapped a user flow organized around planning, shopping, and managing food.'],
        images: [
          {
            src: img('organza-persona.webp'),
            alt: 'Persona for Kelly, a 36-year-old busy mother of two in Peoria, Illinois, with her goals, pain points, and environment. Quote: “I don’t have a good system; we try to plan and organize dinner meals for the whole week, and it seems to be helpful, but we are not very consistent with planning.”',
            width: 1216,
            height: 1080,
            caption: 'One of three personas',
          },
        ],
      },
      {
        heading: 'Testing and iteration',
        body: [
          'We each ran usability tests of the Figma prototype with three tasks: find a recipe, create a shopping list, and check expiration dates. People finished the first and third tasks in about 15 to 30 seconds. The shopping list took longest, as people struggled with navigation and adding items. Some also found a profile page as the landing screen confusing.',
          'We simplified navigation to three main categories (plan, shop, and manage) and gave the shopping list more structure, with a clearly labeled add button and plus and minus quantity controls.',
        ],
        images: [
          {
            src: img('organza-list-before.webp'),
            alt: 'Before: the original shopping list screen, with mostly empty Dairy, Veggies, and Meat sections and a row of unlabeled icons.',
            width: 414,
            height: 736,
            caption: 'Shopping list before',
          },
          {
            src: img('organza-list-after.webp'),
            alt: 'After: the revised shopping list, with each ingredient’s amount, minus and plus quantity buttons, and a labeled “Add ingredient” button.',
            width: 414,
            height: 736,
            caption: 'Shopping list after',
          },
        ],
      },
    ],
    links: [{ label: 'Original case study on jessklutch.com', href: 'https://jessklutch.com/work/organza.html' }],
  },
  {
    slug: 'original-portfolio-site',
    group: 'school',
    title: 'My first portfolio site',
    kicker: 'Front-end development',
    org: 'Personal project during my M.S.',
    timeframe: '2022 – 2023',
    role: 'Designer and front-end developer',
    tools: ['HTML', 'CSS', 'Bootstrap 5', 'Adobe Fonts'],
    summary:
      'I designed and hand-coded my original portfolio at jessklutch.com in HTML and CSS: a responsive, three-page site with its own documented design system.',
    tags: ['HTML & CSS', 'Responsive design', 'Design systems', 'Bootstrap 5'],
    color: 'bubblegum',
    icon: 'code',
    thumb: { src: img('jk-site-thumb.webp'), alt: '', width: 640, height: 375 },
    hero: {
      src: img('jk-site-hero.webp'),
      alt: 'The jessklutch.com homepage on desktop: a red JK logo and teal Home, Work, and Contact navigation, the heading “Hi, I’m Jess.” in brick red, a short bio, a “View Work” link, and a hand-drawn watercolor self-portrait of Jess wearing glasses.',
      width: 1400,
      height: 820,
    },
    stats: [
      { value: '3', label: 'responsive pages: Home, Work, and Contact' },
      { value: '~6 KB', label: 'of custom CSS on top of Bootstrap' },
    ],
    sections: [
      {
        heading: 'Overview',
        body: [
          'I wanted a portfolio that I built myself, not a template. I designed the site, drew the self-portrait illustration and JK logo, and wrote the HTML and CSS by hand. The footer says it best: “Site built by yours truly.”',
        ],
      },
      {
        heading: 'Built with HTML and CSS',
        list: [
          'HTML pages for Home, Work, and Contact, with alt text on images',
          'Bootstrap 5’s grid for responsive layouts, with a custom stylesheet for type, color, cards, buttons, and navigation',
          'A navigation bar that collapses into a menu button on small screens, with ARIA attributes for the toggle',
          'Adobe Fonts (Campaign for headings and navigation, Rubik for body text) and a palette of teal and brick red',
          'Feature and project cards that rearrange from three columns on desktop to a single column on phones',
        ],
        images: [
          {
            src: img('jk-site-work.webp'),
            alt: 'The Work page on desktop: a large “Work” heading, an intro about loving iterative projects and web development, and a rounded feature card for WellMind with a screenshot, a “Research & Design” label, a description, and a red View button, above a row of smaller project cards.',
            width: 1400,
            height: 900,
            caption: 'The Work page on desktop',
          },
        ],
      },
      {
        heading: 'Responsive on every screen',
        body: ['On phones, the layout stacks into a single column and the navigation tucks behind a menu button.'],
        images: [
          {
            src: img('jk-site-home-phone.webp'),
            alt: 'The homepage on a phone: the JK logo with a menu button, the self-portrait illustration stacked above a large “Hi, I’m Jess.” heading.',
            width: 600,
            height: 1298,
            caption: 'Homepage on a phone',
          },
          {
            src: img('jk-site-work-phone.webp'),
            alt: 'The Work page on a phone: the menu button, a large “Work” heading, the intro text, and the WellMind card stacked in one column.',
            width: 600,
            height: 1298,
            caption: 'Work page on a phone',
          },
        ],
      },
      {
        heading: 'A design system to keep it consistent',
        body: [
          'I documented the site in a small design system guided by three words: clean, legible, and inquisitive. It covers typography, color, and logo usage; buttons, cards, and the navigation menu, each with accessibility notes and HTML snippets; and page patterns with Bootstrap grids for different screen sizes.',
        ],
        images: [
          {
            src: img('jk-site-design-system.webp'),
            alt: 'A layout spec from the design system: the desktop homepage with pixel spacing measurements, the logo, navigation, and illustration, plus tabs for web, tablet, and phone layouts and grids.',
            width: 1400,
            height: 978,
            caption: 'Homepage layout spec from the design system',
          },
        ],
      },
    ],
    links: [
      { label: 'Visit jessklutch.com', href: 'https://jessklutch.com/' },
      { label: 'View the design system', href: 'https://jessklutch.com/work/mini_design_system/index.html' },
    ],
  },
]

export type Artwork = {
  title: string
  /** A short line under the title, e.g. technique or pattern name */
  note?: string
  href?: string
  image: Image
}

const knit = (file: string) => `${import.meta.env.BASE_URL}img/knitting/${file}`

/**
 * Knitting projects. Add an entry per finished object with a photo
 * (put the image in public/img/knitting/ and write alt text that describes it).
 */
export const artworks: Artwork[] = [
  {
    title: 'Orange colorwork socks',
    note: 'Stranded colorwork',
    image: {
      src: knit('orange-socks.webp'),
      alt: 'A pair of hand-knit socks in cream with a coral orange pattern: whole and sliced oranges at the cuff, rows of tiny oranges with green leaves down the leg and foot, and solid coral ribbing, heels, and toes. They lie on a woven wicker seat.',
      width: 760,
      height: 1013,
    },
  },
  {
    title: 'Collared cardigan',
    note: 'Textured stripes and lace panels',
    image: {
      src: knit('cardigan.webp'),
      alt: 'A rust-brown hand-knit cardigan laid flat on weathered gray deck boards. It has a pointed collar, five white buttons, horizontal ridged stripes, and triangular open lace panels at each side.',
      width: 760,
      height: 538,
    },
  },
  {
    title: 'Leaf colorwork socks',
    note: 'Stranded colorwork',
    image: {
      src: knit('leaf-socks.webp'),
      alt: 'A pair of hand-knit lavender-gray socks with a teal pattern of large leaves climbing up a center vine and small teal dots, on a dark green floral print fabric.',
      width: 760,
      height: 1013,
    },
  },
  {
    title: 'Knit camisole',
    note: 'Summer top',
    image: {
      src: knit('camisole.webp'),
      alt: 'A hand-knit olive-brown camisole with a V neckline and thin straps, hanging on a wooden hanger in a sunny window with a snowy yard outside.',
      width: 760,
      height: 954,
    },
  },
  {
    title: 'Sweater for my pup',
    note: 'Dog sweater',
    image: {
      src: knit('dog-sweater.webp'),
      alt: 'A black and tan cocker spaniel sitting on an ottoman by a window, wearing a hand-knit sweater in gradient stripes of blue, purple, gray, and green, next to a small pumpkin.',
      width: 760,
      height: 1013,
    },
  },
]
