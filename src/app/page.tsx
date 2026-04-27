'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Chatbot from '@/components/Chatbot'
import HeroRipple from '@/components/HeroRipple'

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (cb: () => void) => void
        execute: (siteKey: string, options: { action: string }) => Promise<string>
      }
    }
  }
}

const AERIAL_VIDEO = '/hamid-video-bg.mp4'
const RECAPTCHA_SITE_KEY = '6LdPbs0sAAAAAHd1MFgSGJn9uECTCyiXaetbrnyW'

export default function Home() {
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const firstFieldRef = useRef<HTMLSelectElement>(null)

  /* Lock scroll when form open */
  useEffect(() => {
    document.body.style.overflow = formOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [formOpen])

  /* Auto-focus first field */
  useEffect(() => {
    if (formOpen) setTimeout(() => firstFieldRef.current?.focus(), 350)
  }, [formOpen])

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setFormOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const closeForm = () => {
    setFormOpen(false)
    setError('')
    setSubmitted(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const form = e.currentTarget

    try {
      await new Promise<void>((resolve) => window.grecaptcha.enterprise.ready(resolve))
      const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, { action: 'CONTACT' })

      const data = {
        token,
        service: (form.elements.namedItem('service') as HTMLSelectElement).value,
        firstName: (form.elements.namedItem('firstName') as HTMLInputElement).value,
        lastName: (form.elements.namedItem('lastName') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        howFound: (form.elements.namedItem('howFound') as HTMLTextAreaElement).value,
      }

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!res.ok) {
        setError(json.error || 'Something went wrong. Please try again.')
      } else {
        setSubmitted(true)
        setTimeout(closeForm, 3000)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="font-sans antialiased overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section aria-labelledby="hero-heading" className="relative flex flex-col overflow-hidden md:h-screen" style={{ minHeight: '400px' }}>

        {/* Aerial background video */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={AERIAL_VIDEO} type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/10 to-black/40 pointer-events-none" />

        {/* Water ripple effect */}
        <HeroRipple />

        {/* Navbar */}
        <nav aria-label="Main navigation" className="relative z-20 flex items-center justify-between px-8 lg:px-14 pt-7">
          <Image
            src="/logo.svg"
            alt="HAMID"
            width={120}
            height={28}
            className="brightness-0 invert h-7 w-auto"
            priority
          />
          <button
            onClick={() => setFormOpen(true)}
            className="bg-white hover:bg-black active:scale-110 text-black hover:text-white text-sm font-bold px-6 py-2.5 rounded border-2 border-black transition-all duration-200 tracking-wide"
          >
            Get Started
          </button>
        </nav>

        {/* Video spacer — pushes intro below, ensures video is visible */}
        <div className="relative z-10 flex-1" style={{ minHeight: '400px' }} />

        {/* Intro — title left, body right */}
        <div className="relative z-10 w-full bg-white px-8 lg:px-16 py-14 grid md:grid-cols-2 gap-4 items-start">

          {/* Left — title + verse */}
          <div>
            <h1 id="hero-heading" className="text-3xl lg:text-4xl font-bold leading-snug text-gray-900">
              Welcome to <br /> Hamid&apos;s Atelier!
            </h1>
            <blockquote style={{ marginTop: '1.5rem', fontSize: '1rem', color: '#333333' }} className="leading-relaxed text-balance">
              &ldquo;Whatever you do, work at it with all your heart, as working for the Lord, not for human masters&rdquo; &mdash; Colossians 3:23
            </blockquote>
          </div>

          {/* Right — body copy */}
          <p className="text-gray-900 leading-relaxed text-balance" style={{ fontSize: '1.2rem' }}>
            Since 2007, I have shaped ideas into refined digital experiences across graphic design, UI, UX, and web development. I combine creative thinking with technical skill and a clear understanding of your brand to build custom solutions that engage your audience and support real business growth.
          </p>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FORM POPUP — slide in from left
      ══════════════════════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={closeForm}
        className={`fixed inset-0 z-40 transition-all duration-500 ${
          formOpen ? 'visible bg-black/60 backdrop-blur-sm' : 'invisible bg-transparent pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Become a client"
        className={`fixed left-0 top-0 bottom-0 z-50 w-full max-w-120 bg-white shadow-2xl overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          formOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-10 pt-10 pb-16">

          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Become <br />a client
            </h2>
            <button
              onClick={closeForm}
              aria-label="Close"
              className="mt-1 ml-6 shrink-0 w-10 h-10 bg-[#E8432D] hover:bg-[#d03a26] text-white rounded-full flex items-center justify-center transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Success state */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Message sent!</h3>
              <p className="text-gray-500 text-sm">I&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-label="Become a client form" className="space-y-8" noValidate>

              {/* Service */}
              <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors pb-1">
                <select
                  name="service"
                  ref={firstFieldRef}
                  required
                  defaultValue=""
                  aria-label="Select your preferred service"
                  className="w-full bg-transparent text-gray-600 focus:outline-none py-1 appearance-none cursor-pointer" style={{ fontSize: '1.1rem' }}
                >
                  <option value="" disabled>Select your preferred service:</option>
                  <option value="branding">Branding</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="webdesign">Web Design</option>
                  <option value="webdev">Web Development</option>
                  <option value="fullpackage">Full package</option>
                </select>
              </div>

              {/* First name */}
              <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors pb-1">
                <input
                  type="text"
                  name="firstName"
                  required
                  placeholder="First Name*"
                  aria-label="First name"
                  className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none py-1" style={{ fontSize: '1.1rem' }}
                />
              </div>

              {/* Last name */}
              <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors pb-1">
                <input
                  type="text"
                  name="lastName"
                  required
                  placeholder="Last Name*"
                  aria-label="Last name"
                  className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none py-1" style={{ fontSize: '1.1rem' }}
                />
              </div>

              {/* Email */}
              <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors pb-1">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email*"
                  aria-label="Email address"
                  className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none py-1" style={{ fontSize: '1.1rem' }}
                />
              </div>

              {/* How did you find me */}
              <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors pb-1">
                <textarea
                  name="howFound"
                  rows={3}
                  placeholder="How did you find me?"
                  aria-label="How did you find me"
                  className="w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none resize-none py-1" style={{ fontSize: '1.1rem' }}
                />
              </div>

              {/* Error message */}
              {error && (
                <p role="alert" className="text-sm text-red-600 font-medium">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-900 hover:bg-gray-700 disabled:bg-gray-400 text-white font-black text-sm tracking-[0.15em] uppercase px-10 py-4 transition-colors duration-200 rounded disabled:cursor-not-allowed"
              >
                {loading ? 'Sending…' : 'Submit'}
              </button>

              <p className="text-xs text-gray-400 leading-relaxed">
                This site is protected by reCAPTCHA Enterprise and the Google{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Privacy Policy</a>{' '}
                and{' '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Terms of Service</a>{' '}
                apply.
              </p>

            </form>
          )}
        </div>
      </aside>

      {/* ── Chatbot ── */}
      <Chatbot />

    </main>
  )
}
