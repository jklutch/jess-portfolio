import { AlertCircle, CheckCircle2, ExternalLink, Mail, Send } from 'lucide-react'
import { useId, useRef, useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { profile } from '@/content'

type Field = 'name' | 'email' | 'message'
type Errors = Partial<Record<Field, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(data: Record<Field, string>): Errors {
  const errors: Errors = {}
  if (!data.name.trim()) errors.name = 'Enter your name.'
  if (!data.email.trim()) errors.email = 'Enter your email address.'
  else if (!EMAIL_RE.test(data.email.trim()))
    errors.email = 'Enter an email address in the format name@example.com.'
  if (!data.message.trim()) errors.message = 'Enter a message.'
  return errors
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="flex items-center gap-1.5 text-sm font-semibold text-destructive">
      <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
      <span>
        <span className="sr-only">Error: </span>
        {message}
      </span>
    </p>
  )
}

export function ContactTab() {
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)

  const ids = {
    name: `${uid}-name`,
    email: `${uid}-email`,
    message: `${uid}-message`,
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const data = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      message: String(fd.get('message') ?? ''),
    }
    const next = validate(data)
    setErrors(next)
    const firstInvalid = (Object.keys(ids) as Field[]).find((k) => next[k])
    if (firstInvalid) {
      setSent(false)
      document.getElementById(ids[firstInvalid])?.focus()
      return
    }
    // No backend needed: hand the message off to the visitor's email app.
    const subject = encodeURIComponent(`Hello from ${data.name}`)
    const body = encodeURIComponent(`${data.message}\n\n— ${data.name} (${data.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    formRef.current?.reset()
  }

  const describedBy = (f: Field, hint?: string) =>
    [hint, errors[f] ? `${ids[f]}-error` : undefined].filter(Boolean).join(' ') || undefined

  return (
    <section aria-labelledby="contact-heading" className="space-y-10">
      <div className="max-w-2xl space-y-3">
        <h2 id="contact-heading" className="text-3xl font-bold sm:text-4xl">
          Let’s make something good together
        </h2>
        <p className="text-lg text-muted-foreground">
          Working on a public service that could be simpler? Want to talk accessibility, research, or risograph inks?
          I’d love to hear from you.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
            <CardDescription>All fields are required. Sending opens your email app.</CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={formRef} noValidate onSubmit={onSubmit} className="space-y-6" aria-label="Contact form">
              <div className="space-y-2">
                <Label htmlFor={ids.name}>Your name</Label>
                <FieldError id={`${ids.name}-error`} message={errors.name} />
                <Input
                  id={ids.name}
                  name="name"
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy('name')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={ids.email}>Email address</Label>
                <p id={`${ids.email}-hint`} className="text-sm text-muted-foreground">
                  So I can write back to you.
                </p>
                <FieldError id={`${ids.email}-error`} message={errors.email} />
                <Input
                  id={ids.email}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy('email', `${ids.email}-hint`)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={ids.message}>Message</Label>
                <FieldError id={`${ids.message}-error`} message={errors.message} />
                <Textarea
                  id={ids.message}
                  name="message"
                  required
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy('message')}
                />
              </div>
              <Button type="submit" size="lg">
                <Send aria-hidden="true" />
                Send message
              </Button>
              <div role="status" aria-live="polite" className="min-h-6">
                {sent && (
                  <p className="flex items-center gap-2 font-semibold text-success">
                    <CheckCircle2 aria-hidden="true" className="size-5 shrink-0" />
                    Thanks! Your email app should open with your message ready to send.
                  </p>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-secondary text-secondary-foreground lg:self-start">
          <CardHeader>
            <CardTitle>Other ways to say hi</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3" role="list">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold underline decoration-2 outline-none hover:decoration-4 focus-visible:ring-[3px] focus-visible:ring-secondary-foreground"
                >
                  <Mail aria-hidden="true" className="size-5" />
                  {profile.email}
                </a>
              </li>
              {profile.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg font-semibold underline decoration-2 outline-none hover:decoration-4 focus-visible:ring-[3px] focus-visible:ring-secondary-foreground"
                  >
                    <ExternalLink aria-hidden="true" className="size-5" />
                    {l.label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
