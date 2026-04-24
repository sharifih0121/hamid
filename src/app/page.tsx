'use client'

import { useState, useEffect } from 'react'

/* ─── Data ─────────────────────────────────────────────── */

const NAV_LINKS = ['Services', 'Work', 'About', 'FAQ', 'Contact']

const SERVICES = [
  {
    id: 'branding',
    label: 'Branding',
    color: '#6B3FA0',
    lightColor: '#F3EEFF',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
      </svg>
    ),
    headline: 'Build a brand people remember',
    body: 'From logo design to complete brand systems — I create identities that are distinctive, strategic, and built to last across every touchpoint.',
    bullets: ['Logo & visual identity', 'Brand guidelines & strategy', 'Typography & color systems', 'Marketing collateral'],
  },
  {
    id: 'uiux',
    label: 'UI/UX Design',
    color: '#00A878',
    lightColor: '#E6FAF4',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
    headline: 'Experiences users love',
    body: 'I design interfaces that feel effortless — blending research, best practices, and creativity to deliver products that users actually enjoy.',
    bullets: ['User research & wireframes', 'Interactive prototypes', 'Usability testing', 'Design systems'],
  },
  {
    id: 'webdesign',
    label: 'Web Design',
    color: '#0099B8',
    lightColor: '#E6F6FA',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    headline: 'Websites that make an impression',
    body: 'Every pixel is intentional. I design visually stunning, conversion-focused websites that communicate your value and guide visitors to act.',
    bullets: ['Landing pages & full sites', 'Responsive mobile design', 'Conversion optimisation', 'Style guides'],
  },
  {
    id: 'webdev',
    label: 'Web Development',
    color: '#F5A623',
    lightColor: '#FFF8E6',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    headline: 'Development that performs',
    body: 'Clean, fast, and scalable code built with modern technologies. I turn designs into pixel-perfect, high-performance websites and web apps.',
    bullets: ['React / Next.js', 'Webflow & CMS', 'Performance optimisation', 'SEO & accessibility'],
  },
]

const PROJECTS = [
  {
    title: 'Simple Website',
    category: 'Web Design',
    bg: '#1e2724',
    accent: '#00A878',
    rating: '4.9',
    quote: 'Hamid delivered exactly what we envisioned — clean, fast, and incredibly professional.',
    client: 'Sarah T.',
  },
  {
    title: 'Simple Brand',
    category: 'Branding',
    bg: '#2a1a3e',
    accent: '#6B3FA0',
    rating: '4.9',
    quote: 'Our new brand identity has completely transformed how customers perceive us.',
    client: 'James M.',
  },
  {
    title: 'Archeology Museum',
    category: 'UI/UX Design',
    bg: '#3d1f1a',
    accent: '#F5A623',
    rating: '4.9',
    quote: 'The UX Hamid designed dramatically improved our visitor engagement metrics.',
    client: 'Dr. Leila K.',
  },
]

const STEPS = [
  { n: '01', color: '#6B3FA0', title: 'We talk', body: 'Tell me about your business, your goals, and the challenges you face. I listen carefully before anything else.' },
  { n: '02', color: '#00A878', title: 'I design & build', body: 'I craft a tailored solution — from brand identity to a fully developed website — matched to your vision.' },
  { n: '03', color: '#F5A623', title: 'You grow', body: 'Launch with confidence. Your digital presence is set up to attract customers and deliver real results.' },
]

const STATS = [
  { value: '10+', label: 'Years experience' },
  { value: '100+', label: 'Projects delivered' },
  { value: '4.9/5', label: 'Client rating' },
  { value: '4', label: 'Core services' },
]

const FAQS = [
  { q: 'What services do you offer?', a: 'I offer branding, UI/UX design, web design, and web development — either individually or as a full end-to-end package.' },
  { q: 'What industries do you work with?', a: 'I work with clients across all industries, from startups and small businesses to established enterprises and nonprofits.' },
  { q: 'How long does a typical project take?', a: 'Timelines vary by scope. A branding project usually takes 2–4 weeks; a full website typically takes 4–8 weeks from kickoff to launch.' },
  { q: 'Are your websites mobile-responsive?', a: 'Always. Every website I build is fully responsive and rigorously tested across all screen sizes and modern browsers.' },
  { q: 'Do you provide support after launch?', a: 'Yes. I offer ongoing maintenance and support packages to keep your site secure, updated, and running smoothly.' },
  { q: 'How do we get started?', a: 'Simply fill out the contact form below or give me a call. I\'ll respond within 24 hours to schedule a free discovery call.' },
  { q: 'What is your design process?', a: 'Discovery → Strategy → Design → Development → Testing → Launch. Every phase involves your input and feedback.' },
  { q: 'Can you redesign my existing website?', a: 'Absolutely. Redesigns are a core part of my work — improving aesthetics, performance, and conversion at the same time.' },
]

/* ─── Icons ─────────────────────────────────────────────── */

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-7-7 7 7-7 7" />
    </svg>
  )
}

/* ─── Component ─────────────────────────────────────────── */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeService, setActiveService] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const s = SERVICES[activeService]

  return (
    <div className="bg-white text-gray-900 font-sans antialiased">

      {/* ── Navbar ── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'} border-b border-gray-100`}>
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-lg font-black tracking-tight text-gray-900 hover:opacity-80 transition-opacity">
            Hamid<span style={{ color: '#6B3FA0' }}>.</span>
          </a>
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-150"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:3369263255" className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
              (336) 926-3255
            </a>
            <a
              href="#contact"
              className="bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors duration-150"
            >
              Get started
            </a>
            <button
              className="md:hidden p-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="py-3 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 py-3 px-4 bg-gray-900 text-white text-sm font-semibold rounded-full text-center hover:bg-gray-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Get started
            </a>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-6" style={{ color: '#6B3FA0', borderColor: '#6B3FA0', background: '#F3EEFF' }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: '#6B3FA0' }} />
              Available for new projects
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight text-gray-900 mb-6">
              Make Your<br />
              Business <span className="italic font-light" style={{ color: '#6B3FA0' }}>Bolder</span><br />
              with Design
            </h1>

            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              With 10+ years in graphic design, UI/UX, and web development — I turn ideas into digital experiences that look great and drive real results.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-gray-900 text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-gray-700 transition-colors duration-150"
              >
                View my work <ArrowRight />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold px-6 py-3.5 rounded-full border border-gray-200 text-gray-700 hover:border-gray-400 hover:text-gray-900 transition-all duration-150"
              >
                Start a project
              </a>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F5A623" className="mr-0.5">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">4.9/5.0</span>
              <span className="text-sm text-gray-400">· 100+ projects delivered</span>
            </div>
          </div>

          {/* Right — colored service grid */}
          <div className="grid grid-cols-2 gap-4">
            {SERVICES.map((svc, i) => (
              <button
                key={svc.id}
                onClick={() => setActiveService(i)}
                className="rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                style={{ backgroundColor: svc.color }}
              >
                <div className="text-white/60 mb-4">{svc.icon}</div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">0{i + 1}</p>
                <p className="text-white font-bold text-base">{svc.label}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-1 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#6B3FA0' }}>What I do</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Services built for results</h2>
          <p className="mt-4 text-gray-500 text-lg max-w-lg mx-auto">Everything your business needs to look great and grow — under one roof.</p>
        </div>

        {/* Tab selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SERVICES.map((svc, i) => (
            <button
              key={svc.id}
              onClick={() => setActiveService(i)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                activeService === i
                  ? { backgroundColor: svc.color, color: '#fff' }
                  : { backgroundColor: '#F9FAFB', color: '#6B7280' }
              }
            >
              {svc.label}
            </button>
          ))}
        </div>

        {/* Active service panel */}
        <div className="grid md:grid-cols-2 gap-12 items-center rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Text side */}
          <div className="p-10 lg:p-14">
            <div className="inline-flex p-3 rounded-xl mb-6" style={{ backgroundColor: s.lightColor, color: s.color }}>
              {s.icon}
            </div>
            <h3 className="text-3xl font-black tracking-tight mb-4">{s.headline}</h3>
            <p className="text-gray-500 leading-relaxed mb-8">{s.body}</p>
            <ul className="space-y-3 mb-10">
              {s.bullets.map(b => (
                <li key={b} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: s.lightColor, color: s.color }}>
                    <CheckIcon />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm font-bold py-3 px-6 rounded-full transition-all duration-150 hover:opacity-90"
              style={{ backgroundColor: s.color, color: '#fff' }}
            >
              Start a {s.label} project <ArrowRight />
            </a>
          </div>

          {/* Visual side */}
          <div className="hidden md:flex items-center justify-center min-h-80 p-14" style={{ backgroundColor: s.color }}>
            <div className="text-center text-white">
              <div className="text-white/10 text-[120px] font-black leading-none select-none mb-6">
                0{activeService + 1}
              </div>
              <p className="text-white/60 text-sm font-medium tracking-widest uppercase">{s.label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="bg-gray-50 py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#00A878' }}>How it works</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Simple. Proven. Effective.</h2>
            <p className="mt-4 text-gray-500 text-lg max-w-lg mx-auto">Three steps is all it takes to go from idea to a live, polished product.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={step.n} className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 right-0 translate-x-1/2 z-10 text-gray-200">
                    <ArrowRight />
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-lg mb-6" style={{ backgroundColor: step.color }}>
                  {step.n}
                </div>
                <h3 className="text-xl font-black mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="work" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0099B8' }}>Featured work</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Projects that speak<br className="hidden md:block" /> for themselves</h2>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors shrink-0">
            Start your project <ArrowRight />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PROJECTS.map(p => (
            <div key={p.title} className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              {/* Card top */}
              <div className="relative p-8 h-52 flex flex-col justify-between" style={{ backgroundColor: p.bg }}>
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ backgroundColor: p.accent + '30', color: p.accent }}
                  >
                    {p.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#F5A623">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-white text-xs font-semibold">{p.rating}</span>
                  </div>
                </div>
                <h3 className="text-white text-xl font-black">{p.title}</h3>
              </div>

              {/* Card bottom */}
              <div className="bg-white border border-gray-100 border-t-0 p-6 rounded-b-2xl">
                <p className="text-gray-500 text-sm leading-relaxed mb-4 italic">&ldquo;{p.quote}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: p.accent }}>
                    {p.client[0]}
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{p.client}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About split banner ── */}
      <section id="about" className="grid md:grid-cols-2">
        <div className="p-14 lg:p-20 flex flex-col justify-between min-h-72" style={{ backgroundColor: '#6B3FA0' }}>
          <div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">About me</p>
            <h2 className="text-white text-3xl font-black leading-tight mb-5">
              10+ years turning<br />ideas into reality
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Based in Winston-Salem, NC — I&apos;ve spent over a decade helping businesses of all sizes look their best and grow through strategic, thoughtful design and development.
            </p>
          </div>
          <a href="#contact" className="mt-10 self-start inline-flex items-center gap-2 text-white text-sm font-bold group">
            Work with me
            <span className="group-hover:translate-x-1 transition-transform duration-150"><ArrowRight /></span>
          </a>
        </div>
        <div className="p-14 lg:p-20 flex flex-col justify-between min-h-72" style={{ backgroundColor: '#00A878' }}>
          <div>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">My promise</p>
            <h2 className="text-white text-3xl font-black leading-tight mb-5">
              Your success won&apos;t<br />be my first
            </h2>
            <p className="text-white/70 text-sm leading-relaxed">
              Every project gets the same care and attention. I don&apos;t just deliver a product — I build a partnership, offering support from concept all the way to launch and beyond.
            </p>
          </div>
          <a href="#work" className="mt-10 self-start inline-flex items-center gap-2 text-white text-sm font-bold group">
            See my work
            <span className="group-hover:translate-x-1 transition-transform duration-150"><ArrowRight /></span>
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-28 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#F5A623' }}>FAQ</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Got questions?</h2>
            <p className="mt-4 text-gray-500 text-lg">Everything you need to know before we get started.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <button
                  className="w-full text-left px-7 py-5 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm text-gray-900">{faq.q}</span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 text-sm font-bold"
                    style={
                      openFaq === i
                        ? { backgroundColor: '#6B3FA0', color: '#fff' }
                        : { backgroundColor: '#F3F4F6', color: '#6B7280' }
                    }
                  >
                    {openFaq === i ? '−' : '+'}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6 text-gray-500 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#6B3FA0' }}>Let&apos;s talk</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-5">
              Ready to build<br />something great?
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Fill in the form and I&apos;ll get back to you within 24 hours to discuss your project and how I can help.
            </p>

            <div className="space-y-5 mb-12">
              {[
                { n: '1', color: '#6B3FA0', label: 'Tell me about your project' },
                { n: '2', color: '#00A878', label: 'I\'ll respond within 24 hours' },
                { n: '3', color: '#F5A623', label: 'We kick off and start building' },
              ].map(step => (
                <div key={step.n} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: step.color }}>
                    {step.n}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{step.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-gray-100 space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Winston-Salem, NC
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.6 19.79 19.79 0 0 1 1.61 5a2 2 0 0 1 1.99-2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 10.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17v-.08z"/>
                </svg>
                (336) 926-3255
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            className="bg-gray-50 rounded-3xl p-8 lg:p-10 border border-gray-100 space-y-5"
            onSubmit={e => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Name</label>
                <input
                  type="text"
                  placeholder="John Smith"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-150"
                  style={{ '--tw-ring-color': '#6B3FA0' } as React.CSSProperties}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-150"
                  style={{ '--tw-ring-color': '#6B3FA0' } as React.CSSProperties}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Service needed</label>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 focus:outline-none focus:ring-2 transition-all duration-150">
                  <option value="">Select a service...</option>
                  <option value="branding">Branding</option>
                  <option value="uiux">UI/UX Design</option>
                  <option value="webdesign">Web Design</option>
                  <option value="webdev">Web Development</option>
                  <option value="fullpackage">Full package</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Project details</label>
              <textarea
                rows={5}
                placeholder="Tell me about your project, goals, and any relevant details..."
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-150 resize-none"
                style={{ '--tw-ring-color': '#6B3FA0' } as React.CSSProperties}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white text-sm font-bold tracking-wide transition-all duration-150 hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: '#6B3FA0' }}
            >
              Send message →
            </button>

            <p className="text-center text-xs text-gray-400">
              I&apos;ll reply within 24 hours. No spam, ever.
            </p>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <p className="text-lg font-black mb-3">
              Hamid<span style={{ color: '#6B3FA0' }}>.</span>
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Designer & developer based in Winston-Salem, NC. Helping businesses grow through design excellence.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Services</p>
            <ul className="space-y-3 text-sm text-gray-400">
              {SERVICES.map(svc => (
                <li key={svc.id}><a href="#services" className="hover:text-white transition-colors duration-150">{svc.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Company</p>
            <ul className="space-y-3 text-sm text-gray-400">
              {[['#about', 'About'], ['#work', 'Projects'], ['#faq', 'FAQ'], ['#contact', 'Contact']].map(([href, label]) => (
                <li key={label}><a href={href} className="hover:text-white transition-colors duration-150">{label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">Get in touch</p>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>Winston-Salem, NC</li>
              <li>
                <a href="tel:3369263255" className="hover:text-white transition-colors duration-150">(336) 926-3255</a>
              </li>
            </ul>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold py-3 px-6 rounded-full transition-all duration-150 hover:opacity-90"
              style={{ backgroundColor: '#6B3FA0' }}
            >
              Get started <ArrowRight />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Hamid Sharifi. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
