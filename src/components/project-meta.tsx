import {
  Accessibility,
  BusFront,
  Clapperboard,
  Clock,
  Leaf,
  ListChecks,
  Mountain,

  Brain,
  Unplug,
} from 'lucide-react'

import type { Project } from '@/content'

export const projectIcons = {
  tracker: ListChecks,
  clock: Clock,
  link: Unplug,
  mind: Brain,
  ear: Accessibility,
  bus: BusFront,
  film: Clapperboard,
  leaf: Leaf,
  mountain: Mountain,
} satisfies Record<Project['icon'], unknown>

export const bandClass: Record<Project['color'], string> = {
  sunny: 'bg-secondary text-secondary-foreground',
  mint: 'bg-accent text-accent-foreground',
  bubblegum: 'bg-pink text-pink-foreground',
  grape: 'bg-primary text-primary-foreground',
}

export const badgeVariant: Record<Project['color'], 'sunny' | 'mint' | 'bubblegum' | 'default'> = {
  sunny: 'sunny',
  mint: 'mint',
  bubblegum: 'bubblegum',
  grape: 'default',
}

export const projectHref = (slug: string) => `#work/${slug}`
