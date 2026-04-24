'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const AERIAL_VIDEO = 'https://s3.amazonaws.com/webflow-prod-assets/63c9f9efbe845afa8223d34f/64d69729524ebdedb1d2c6c8_video%20(1080p).mp4'
const PORTRAIT_VIDEO = 'https://s3.amazonaws.com/webflow-prod-assets/63c9f9efbe845afa8223d34f/64d69729524ebdedb1d2c6ac_pexels-ivan-samkov-7252718-1080x1920-25fps.mp4'

export default function Home() {
  const [formOpen, setFormOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const firstInputRef = useRef<HTMLSelectElement>(null)

  /* Lock body scroll when form is open */
  useEffect(() => {
    document.body.style.overflow = formOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [formOpen])

  /* Auto-focus first field when form opens */
  useEffect(() => {
    if (formOpen) setTimeout(() => firstInputRef.current?.focus(), 350)
  }, [formOpen])

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setFormOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormOpen(false)
    }, 2500)
  }

  return (
    <main className="font-sans antialiased overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════
          HERO — full-screen aerial video background
      ═══════════════════════════════════════════════════ */}
      <section className="relative h-screen flex flex-col overflow-hidden">

        {/* Background aerial video */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src={AERIAL_VIDEO} type="video/mp4" />
        </video>

        {/* Gradient overlay — heavier at top for nav legibility */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/10 to-black/30 pointer-events-none" />

        {/* ── Navbar ── */}
        <nav className="relative z-20 flex items-center justify-between px-8 lg:px-14 pt-7 pb-4">
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
            className="bg-[#E8432D] hover:bg-[#d03a26] text-white text-sm font-bold px-6 py-2.5 rounded transition-colors duration-200 tracking-wide"
          >
            Get Started
          </button>
        </nav>

        {/* ── Hero bottom — intro text + portrait video ── */}
        <div className="relative z-10 flex-1 flex items-end">
          <div className="w-full grid md:grid-cols-2">

            {/* Left — intro copy on white panel */}
            <div className="bg-white px-10 lg:px-16 py-14">
              <h1 className="text-3xl lg:text-4xl font-black leading-snug text-gray-900 mb-5">
                Welcome to<br />Hamid&apos;s Atelier!
              </h1>
              <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                With more than a decade&apos;s experience in graphic design, UI/UX, and web development, I transform ideas into polished digital experiences. I merge creativity, technology, and a deep understanding of your brand to build custom solutions that captivate your audience and grow your business.
              </p>
            </div>

            {/* Right — portrait video */}
            <div className="relative h-80 md:h-auto overflow-hidden">
              <video
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover"
                aria-hidden="true"
              >
                <source src={PORTRAIT_VIDEO} type="video/mp4" />
              </video>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          FORM POPUP — slide in from left
      ═══════════════════════════════════════════════════ */}

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setFormOpen(false)}
        className={`
          fixed inset-0 z-40 transition-all duration-500
          ${formOpen ? 'visible bg-black/60 backdrop-blur-sm' : 'invisible bg-transparent pointer-events-none'}
        `}
      />

      {/* Slide-in panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Become a client"
        className={`
          fixed left-0 top-0 bottom-0 z-50 w-full max-w-120
          bg-white shadow-2xl overflow-y-auto
          transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${formOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="px-10 pt-10 pb-16">

          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
              Become<br />a client
            </h2>
            <button
              onClick={() => setFormOpen(false)}
              aria-label="Close form"
              className="mt-1 ml-6 shrink-0 w-10 h-10 bg-[#E8432D] hover:bg-[#d03a26] text-white rounded-full flex items-center justify-center transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {submitted ? (
            /* Success state */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Message sent!</h3>
              <p className="text-gray-500 text-sm">I&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8" noValidate>

              {/* Service select */}
              <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors pb-1">
                <select
                  ref={firstInputRef}
                  required
                  defaultValue=""
                  className="w-full bg-transparent text-sm text-gray-600 focus:outline-none py-1 appearance-none cursor-pointer"
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
                  required
                  placeholder="First Name*"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none py-1"
                />
              </div>

              {/* Last name */}
              <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors pb-1">
                <input
                  type="text"
                  required
                  placeholder="Last Name*"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none py-1"
                />
              </div>

              {/* Email */}
              <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors pb-1">
                <input
                  type="email"
                  required
                  placeholder="Email*"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none py-1"
                />
              </div>

              {/* How did you find me */}
              <div className="border-b border-gray-300 focus-within:border-gray-900 transition-colors pb-1">
                <textarea
                  rows={3}
                  placeholder="How did you find me?"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none resize-none py-1"
                />
              </div>

              {/* reCAPTCHA-style checkbox */}
              <div className="border border-gray-200 rounded-md p-4 flex items-center gap-4 bg-gray-50 select-none">
                <input
                  type="checkbox"
                  id="robot-check"
                  required
                  className="w-5 h-5 accent-gray-900 cursor-pointer rounded"
                />
                <label htmlFor="robot-check" className="text-sm text-gray-700 cursor-pointer">
                  I&apos;m not a robot
                </label>
                <div className="ml-auto flex flex-col items-center">
                  <div className="w-8 h-8 bg-brand-orange rounded opacity-60" />
                  <span className="text-[10px] text-gray-400 mt-1">reCAPTCHA</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-gray-900 hover:bg-gray-700 text-white font-black text-sm tracking-[0.15em] uppercase px-10 py-4 transition-colors duration-200 rounded"
              >
                Submit
              </button>

            </form>
          )}
        </div>
      </aside>

    </main>
  )
}
