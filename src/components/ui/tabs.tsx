import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

/*
 * Folder-style tabs: the tab row sits on top of its panel, and the selected tab
 * drops down to merge with a matching colored band at the top of the panel.
 * Pass the color per tab/panel via className (e.g. data-[state=active]:bg-secondary).
 */

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn('flex flex-col', className)} {...props} />
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('relative z-10 flex w-full items-end gap-1.5 sm:w-fit sm:gap-2', className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-t-2xl border-2 border-b-0 border-input bg-card px-2 py-2 text-sm min-[380px]:px-2.5 font-semibold whitespace-nowrap text-foreground transition-[color,background-color,transform] sm:flex-none sm:gap-2 sm:px-7 sm:text-base',
        'hover:bg-muted',
        // Selected: thicker border, bold, and it drops 4px to cover the panel's top band so they read as one piece.
        'data-[state=active]:translate-y-1 data-[state=active]:border-border data-[state=active]:pb-3 data-[state=active]:font-bold',
        'outline-none focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // On the narrowest phones, drop the decorative icons so the labels always fit.
        'max-[379px]:[&_svg]:hidden',
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        'flex-1 rounded-tr-3xl border-t-4 pt-12 outline-none sm:px-8 focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:pt-14',
        className,
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
