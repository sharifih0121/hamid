'use client'

import { useState } from 'react'

const services = [
  {
    title: "Branding",
    desc: "Building memorable visual identities that resonate with your target audience and stand the test of time.",
    icon: "✦",
  },
  {
    title: "UI/UX Design",
    desc: "Crafting intuitive user experiences that delight users and drive meaningful conversions.",
    icon: "◈",
  },
  {
    title: "Web Design",
    desc: "Creating stunning websites that make a powerful first impression and communicate your brand clearly.",
    icon: "◉",
  },
  {
    title: "Web Development",
    desc: "Developing cutting-edge web solutions with modern technologies that perform and scale.",
    icon: "⬡",
  },
]

const projects = [
  { title: "Simple Website", rating: "4.9/5.0", bg: "#1e2724", category: "Web Design" },
  { title: "Simple Brand", rating: "4.9/5.0", bg: "#111f1b", category: "Branding" },
  { title: "Archeology Museum", rating: "4.9/5.0", bg: "#613d34", category: "UI/UX Design" },
]

const faqs = [
  { q: "What services do you offer?", a: "I offer branding, UI/UX design, web design, and web development services tailored to your business needs." },
  { q: "What industries do you work with?", a: "I work with businesses across all industries — from startups and small businesses to established enterprises." },
  { q: "How long does a project take?", a: "Timelines vary by scope. A typical website project takes 4–8 weeks from kickoff to launch." },
  { q: "Are websites mobile-responsive?", a: "Yes, every website I build is fully responsive and optimized for all screen sizes and devices." },
  { q: "Do you provide post-project support?", a: "Absolutely. I offer ongoing support and maintenance packages to keep your site running smoothly after launch." },
  { q: "How do we get started?", a: "Simply fill out the contact form or call me directly. I'll reach out within 24 hours to discuss your project." },
  { q: "What is your design process?", a: "I follow a proven process: discovery → strategy → design → development → testing → launch." },
  { q: "Can you redesign an existing website?", a: "Yes. Redesigns are one of my specialties — improving both aesthetics and performance for better results." },
  { q: "What tools do you use?", a: "I use Figma, Adobe Creative Suite, React, Next.js, and a range of modern web technologies." },
  { q: "How much does a project cost?", a: "Pricing depends on scope and complexity. Contact me for a custom quote tailored to your specific project." },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="font-sans bg-[#0c0c0c] text-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/10">
        <span className="text-base font-semibold tracking-wide">Hamid Sharifi</span>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="#contact" className="hidden md:inline-flex bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors">
            Get Started
          </a>
          {/* Mobile hamburger */}
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <path d="M18 6L6 18M6 6l12 12" />
                : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0c0c0c] flex flex-col items-center justify-center gap-8 text-xl md:hidden">
          {["services", "about", "projects", "faq", "contact"].map((s) => (
            <a key={s} href={`#${s}`} className="capitalize text-white/70 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
              {s}
            </a>
          ))}
          <a href="#contact" className="mt-4 bg-white text-black font-semibold px-8 py-3 rounded-full" onClick={() => setMenuOpen(false)}>
            Get Started
          </a>
        </div>
      )}

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 bg-gradient-to-b from-[#0c0c0c] via-[#0c0c0c] to-[#111f1b]">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-8">Designer & Developer</p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl mb-6 tracking-tight">
          Make Your Business{" "}
          <span className="italic font-light text-white/60">Bolder</span>{" "}
          with Design Excellence
        </h1>
        <p className="text-white/50 text-lg max-w-lg mb-10 leading-relaxed">
          10+ years of experience in graphic design, UI/UX, and web development — transforming concepts into powerful digital experiences.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#projects" className="bg-white text-black font-semibold px-8 py-3.5 rounded-full hover:bg-white/90 transition-colors">
            View Work
          </a>
          <a href="#contact" className="border border-white/20 text-white font-medium px-8 py-3.5 rounded-full hover:border-white/50 transition-colors">
            Get in Touch
          </a>
        </div>

        <div className="flex gap-12 mt-24 text-center">
          <div>
            <p className="text-4xl font-bold">10+</p>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-2">Years Experience</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-4xl font-bold">4.9</p>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-2">Client Rating</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-4xl font-bold">100+</p>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-2">Projects Done</p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">What I Do</p>
          <h2 className="text-4xl font-bold mb-16">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="border border-white/10 rounded-2xl p-8 hover:border-white/25 hover:bg-white/[0.02] transition-all group">
                <span className="text-2xl mb-6 block text-white/50 group-hover:text-white transition-colors">{s.icon}</span>
                <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 px-6 bg-[#111f1b]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">About Me</p>
            <h2 className="text-4xl font-bold mb-6 leading-tight">Merging Creativity<br />with Technology</h2>
            <p className="text-white/50 leading-relaxed mb-5">
              With over a decade of experience, I specialize in graphic design, web UI/UX design, and web development. I transform concepts into finished products that not only look stunning but deliver real, measurable results.
            </p>
            <p className="text-white/50 leading-relaxed mb-10">
              Based in Winston-Salem, NC, I work with businesses of all sizes — crafting custom digital solutions that make a lasting impact.
            </p>
            <a href="#contact" className="bg-white text-black font-semibold px-7 py-3.5 rounded-full hover:bg-white/90 transition-colors inline-block">
              Work With Me
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "10+", label: "Years of Experience" },
              { value: "100+", label: "Projects Completed" },
              { value: "4.9", label: "Average Rating" },
              { value: "4", label: "Core Services" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">New Releases</p>
          <h2 className="text-4xl font-bold mb-16">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl overflow-hidden cursor-pointer group"
                style={{ backgroundColor: p.bg }}
              >
                <div className="h-72 flex items-end p-8 transition-all group-hover:opacity-90">
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{p.category}</p>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="text-white/50 text-sm mt-2">★ {p.rating}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28 px-6 bg-[#111f1b]">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">Questions</p>
          <h2 className="text-4xl font-bold mb-16">Frequently Asked</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-white/5 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-sm">{faq.q}</span>
                  <span className="text-white/40 ml-4 text-lg leading-none">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-white/50 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40 mb-3">Let's Talk</p>
          <h2 className="text-4xl font-bold mb-4">Start a Project</h2>
          <p className="text-white/50 mb-12">Tell me about your project and I'll get back to you within 24 hours.</p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 w-full transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 w-full transition-colors"
              />
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white/50 text-sm focus:outline-none focus:border-white/30 w-full transition-colors appearance-none">
              <option value="">Select a Service</option>
              <option value="branding">Branding</option>
              <option value="uiux">UI/UX Design</option>
              <option value="webdesign">Web Design</option>
              <option value="webdev">Web Development</option>
            </select>
            <textarea
              rows={5}
              placeholder="Tell me about your project..."
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 w-full transition-colors resize-none"
            />
            <button
              type="submit"
              className="bg-white text-black font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-colors w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-base font-semibold">Hamid Sharifi</p>
            <p className="text-white/40 text-sm mt-1">Winston-Salem, NC &middot; (336) 926-3255</p>
          </div>
          <div className="flex gap-8 text-sm text-white/40">
            {["services", "about", "projects", "faq", "contact"].map((s) => (
              <a key={s} href={`#${s}`} className="capitalize hover:text-white transition-colors">{s}</a>
            ))}
          </div>
          <p className="text-white/20 text-sm">&copy; {new Date().getFullYear()} Hamid Sharifi</p>
        </div>
      </footer>

    </div>
  )
}
