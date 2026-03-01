export type NavMatchMode = 'exact' | 'prefix'

export type NavLinkItem = {
  label: string
  href: string
  match?: NavMatchMode
  description?: string
}

export type NavGroup = {
  heading: string
  items: NavLinkItem[]
}

export type NavItem = {
  label: string
  href: string
  match?: NavMatchMode
  children?: NavLinkItem[]
  megaGroups?: NavGroup[]
}

export const utilityNavItems: NavLinkItem[] = [
  { label: 'Search', href: '/search', match: 'prefix' },
  { label: 'Help', href: '/support/help', match: 'prefix' },
  { label: 'Login', href: '/auth/login', match: 'exact' },
  { label: 'Register', href: '/auth/register', match: 'exact' },
]

export const primaryNavItems: NavItem[] = [
  { label: 'Home', href: '/', match: 'exact' },

  {
    label: 'About',
    href: '/about',
    match: 'prefix',
    children: [
      { label: 'Background', href: '/about/background', match: 'exact' },
      { label: 'Community', href: '/about/community', match: 'exact' },
      { label: 'FAQ', href: '/about/faq', match: 'exact' },
      { label: 'Founder', href: '/about/founder', match: 'exact' },
      { label: 'Gaelic', href: '/about/gaelic', match: 'exact' },
      { label: 'Philosophy', href: '/about/philosophy', match: 'exact' },
      { label: 'Project', href: '/about/project', match: 'exact' },
    ],
  },

  {
    label: 'Legislation',
    href: '/legislation',
    match: 'prefix',
    megaGroups: [
      {
        heading: 'Constitution',
        items: [
          {
            label: 'Constitution Overview',
            href: '/legislation/constitution',
            match: 'prefix',
            description: 'Constitutional materials and linked article records.',
          },
          {
            label: 'Articles',
            href: '/legislation/constitution/articles',
            match: 'exact',
            description: 'Browse the indexed list of constitutional articles.',
          },
        ],
      },
      {
        heading: 'Voting',
        items: [
          {
            label: 'Passes',
            href: '/legislation/passes',
            match: 'exact',
            description: 'Passed measures and enacted results.',
          },
          {
            label: 'Polls',
            href: '/legislation/polls',
            match: 'prefix',
            description: 'Poll registry and linked poll records.',
          },
          {
            label: 'Quick Vote',
            href: '/legislation/quick-vote',
            match: 'prefix',
            description: 'Rapid voting channels and vote records.',
          },
        ],
      },
      {
        heading: 'Proposals',
        items: [
          {
            label: 'Proposal Register',
            href: '/legislation/proposals',
            match: 'prefix',
            description: 'Proposal records, statuses, and detail pages.',
          },
        ],
      },
      {
        heading: 'Processes',
        items: [
          {
            label: 'Legislative Processes',
            href: '/legislation/processes',
            match: 'prefix',
            description: 'Formal procedures, workflows, and process records.',
          },
        ],
      },
    ],
  },

  { label: 'FMA', href: '/fma', match: 'exact' },

  {
    label: 'Support',
    href: '/support',
    match: 'prefix',
    children: [
      { label: 'Glossary', href: '/support/glossary', match: 'exact' },
      { label: 'Guide to Registering', href: '/support/guide-to-registering', match: 'exact' },
      { label: 'Help Center', href: '/support/help', match: 'prefix' },
      { label: 'Help FAQ', href: '/support/help/faq', match: 'exact' },
      { label: 'How to Use', href: '/support/help/how-to-use', match: 'exact' },
    ],
  },

  { label: 'Apply', href: '/apply', match: 'exact' },
  { label: 'Contact', href: '/contact', match: 'exact' },
]