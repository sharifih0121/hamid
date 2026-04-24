'use client'

import { useState } from 'react'

const faqs = [
  { q: "What services do you offer?", a: "I offer branding, UI/UX design, web design, and web development services tailored to your business needs." },
  { q: "What industries do you work with?", a: "I work with businesses across all industries — from startups and small businesses to established enterprises." },
  { q: "How long does a project take?", a: "Timelines vary by scope. A typical website project takes 4–8 weeks from kickoff to launch." },
  { q: "Are websites mobile-responsive?", a: "Yes, every website I build is fully responsive and optimized for all screen sizes and devices." },
  { q: "Do you provide post-project support?", a: "Absolutely. I offer ongoing support and maintenance packages after project completion." },
  { q: "How do we get started?", a: "Simply fill out the contact form or call me directly. I'll reach out within 24 hours to discuss your project." },
  { q: "What is your design process?", a: "I follow a proven process: discovery → strategy → design → development → testing → launch." },
  { q: "Can you redesign an existing website?", a: "Yes. Redesigns are one of my specialties — improving both aesthetics and performance." },
  { q: "What tools do you use?", a: "I use Figma, Adobe Creative Suite, React, Next.js, and a range of modern web technologies." },
  { q: "How much does a project cost?", a: "Pricing depends on scope and complexity. Contact me for a custom quote tailored to your project." },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="font-sans bg-white text-[#111111]">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 flex items-center justify-between px-8 py-4">
        <a href="/" className="text-lg font-bold tracking-tight">Hamid Sharifi</a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#services" className="hover:text-black transition-colors">Services</a>
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#faq" className="hover:text-black transition-colors">FAQ</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden md:inline-flex items-center bg-black text-white text-sm font-semibold px-5 py-2.5 rounded hover:bg-gray-800 transition-colors">
            Get started
          </a>
          <button className="md:hidden p-1 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-xl md:hidden">
          {["services","about","projects","faq","contact"].map(s => (
            <a key={s} href={`#${s}`} className="capitalize font-medium text-gray-700 hover:text-black" onClick={() => setMenuOpen(false)}>{s}</a>
          ))}
          <a href="#contact" className="mt-4 bg-black text-white font-semibold px-8 py-3 rounded" onClick={() => setMenuOpen(false)}>Get started</a>
        </div>
      )}

      {/* Hero */}
      <section className="px-8 py-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Make Your Business Bolder
          </h1>
          <p className="text-gray-500 text-lg mb-4 leading-relaxed">
            With more than a decade's experience in graphic, web UI/UX design, and web development, I turn ideas into reality.
          </p>
          <div className="flex items-center gap-6 mb-8">
            <a href="#projects" className="bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition-colors">
              View my work
            </a>
            <div>
              <div className="flex items-center gap-1 text-[#00A878]">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-xs text-gray-500 mt-0.5">4.9/5.0 · Client Rating</p>
            </div>
          </div>
        </div>

        {/* Colorful image grid like Zapo */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl overflow-hidden h-52 bg-[#6B3FA0] flex items-end p-5">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Branding</p>
              <p className="text-white font-semibold">Visual Identity</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden h-52 bg-[#00A878] flex items-end p-5">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">UI/UX</p>
              <p className="text-white font-semibold">User Experience</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden h-52 bg-[#0099B8] flex items-end p-5">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Web Design</p>
              <p className="text-white font-semibold">Visual Design</p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden h-52 bg-[#F5A623] flex items-end p-5">
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Development</p>
              <p className="text-white font-semibold">Web Dev</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-gray-50 py-10 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-center gap-12 text-center">
          {[
            { value: "10+", label: "Years of experience" },
            { value: "100+", label: "Projects completed" },
            { value: "4.9/5.0", label: "Client rating" },
            { value: "4", label: "Core services" },
          ].map(stat => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services intro */}
      <section id="services" className="max-w-7xl mx-auto px-8 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Simply choose a service</h2>
        <p className="text-gray-500 text-lg mb-16">Three steps to a stronger business</p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            { step: "1", color: "#6B3FA0", title: "We talk", desc: "Tell me about your business, goals, and the challenges you're facing. I'll listen and understand what you need." },
            { step: "2", color: "#00A878", title: "I design & build", desc: "I create a tailored solution — from branding to full web development — that matches your vision and goals." },
            { step: "3", color: "#F5A623", title: "You grow", desc: "Launch with confidence. I'll make sure your digital presence is set up to attract customers and drive results." },
          ].map(item => (
            <div key={item.step}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-5" style={{ backgroundColor: item.color }}>
                {item.step}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Split section: Branding */}
      <section className="py-0">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center py-24">
          <div>
            <p className="text-[#6B3FA0] font-semibold text-sm mb-3 uppercase tracking-widest">Branding</p>
            <h2 className="text-4xl font-extrabold leading-tight mb-5">Build a brand that people remember</h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              A strong brand is the foundation of every successful business. I create visual identities that are unique, consistent, and built to last.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              From logo design to full brand guidelines, I deliver everything you need to show up professionally across every platform.
            </p>
            <a href="#contact" className="bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition-colors inline-block">
              Start a project
            </a>
          </div>
          <div className="bg-[#6B3FA0] rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <div className="text-6xl font-black mb-4 opacity-20">Aa</div>
              <p className="text-white/70 text-sm">Logo · Typography · Color · Identity</p>
            </div>
          </div>
        </div>
      </section>

      {/* Split section: UI/UX (reversed) */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-[#00A878] rounded-2xl h-80 flex items-center justify-center order-last md:order-first">
            <div className="text-center text-white px-8">
              <div className="text-6xl mb-4 opacity-20">⬡</div>
              <p className="text-white/70 text-sm">Wireframes · Prototypes · User Flows</p>
            </div>
          </div>
          <div>
            <p className="text-[#00A878] font-semibold text-sm mb-3 uppercase tracking-widest">UI/UX Design</p>
            <h2 className="text-4xl font-extrabold leading-tight mb-5">Experiences your users will love</h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              Good design is invisible — users just feel it. I design interfaces that are intuitive, beautiful, and built around real user needs.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              From wireframes and prototypes to final polished designs, every decision is backed by research and best practices.
            </p>
            <a href="#contact" className="bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition-colors inline-block">
              Start a project
            </a>
          </div>
        </div>
      </section>

      {/* Split section: Web Design */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#0099B8] font-semibold text-sm mb-3 uppercase tracking-widest">Web Design</p>
            <h2 className="text-4xl font-extrabold leading-tight mb-5">Websites that make a lasting impression</h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              Your website is your most powerful marketing tool. I design visually stunning sites that communicate your brand and convert visitors into customers.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Every layout, color, and element is intentional — crafted to create the right impression and guide your users to take action.
            </p>
            <a href="#contact" className="bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition-colors inline-block">
              Start a project
            </a>
          </div>
          <div className="bg-[#0099B8] rounded-2xl h-80 flex items-center justify-center">
            <div className="text-center text-white px-8">
              <div className="text-6xl mb-4 opacity-20">◉</div>
              <p className="text-white/70 text-sm">Layout · Typography · Visual Hierarchy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Split section: Web Development (reversed) */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-[#F5A623] rounded-2xl h-80 flex items-center justify-center order-last md:order-first">
            <div className="text-center text-white px-8">
              <div className="text-6xl font-black mb-4 opacity-20">&lt;/&gt;</div>
              <p className="text-white/70 text-sm">React · Next.js · Webflow · CMS</p>
            </div>
          </div>
          <div>
            <p className="text-[#F5A623] font-semibold text-sm mb-3 uppercase tracking-widest">Web Development</p>
            <h2 className="text-4xl font-extrabold leading-tight mb-5">Cutting-edge development that performs</h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              Beautiful design means nothing if your site is slow or hard to use. I build fast, accessible, and scalable websites using modern technologies.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              From simple landing pages to complex web applications, I write clean code that's built to grow with your business.
            </p>
            <a href="#contact" className="bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition-colors inline-block">
              Start a project
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Featured projects</h2>
          <p className="text-gray-500 text-lg mb-16">Hear what my clients have to say</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Simple Website", category: "Web Design", bg: "#1e2724", rating: "4.9/5.0", quote: "Hamid delivered exactly what we envisioned. Clean, fast, and professional." },
              { title: "Simple Brand", category: "Branding", bg: "#111f1b", rating: "4.9/5.0", quote: "Our new brand identity has completely transformed how customers see us." },
              { title: "Archeology Museum", category: "UI/UX Design", bg: "#613d34", rating: "4.9/5.0", quote: "The user experience Hamid designed has significantly improved engagement." },
            ].map(p => (
              <div key={p.title} className="rounded-2xl overflow-hidden" style={{ backgroundColor: p.bg }}>
                <div className="p-8 h-56 flex flex-col justify-between">
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{p.category}</p>
                    <h3 className="text-white text-xl font-bold">{p.title}</h3>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{p.quote}</p>
                </div>
                <div className="px-8 py-4 bg-black/20 flex items-center justify-between">
                  <div className="flex text-[#F5A623] text-sm">{"★★★★★"}</div>
                  <span className="text-white/60 text-xs">{p.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA banner */}
      <section id="about" className="grid md:grid-cols-2">
        <div className="bg-[#6B3FA0] p-14 flex flex-col justify-between">
          <div>
            <h2 className="text-white text-3xl font-extrabold mb-4">10+ years of design excellence</h2>
            <p className="text-white/70 leading-relaxed mb-2">
              Based in Winston-Salem, NC, I've spent over a decade helping businesses look their best and grow through thoughtful, strategic design.
            </p>
          </div>
          <a href="#contact" className="mt-8 self-start flex items-center gap-2 text-white font-semibold group">
            Work with me <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
        <div className="bg-[#00A878] p-14 flex flex-col justify-between">
          <div>
            <h2 className="text-white text-3xl font-extrabold mb-4">Your success won&apos;t be my first</h2>
            <p className="text-white/70 leading-relaxed">
              I've delivered branding, design, and development for clients across industries — each project treated with the same care and attention to detail.
            </p>
          </div>
          <a href="#projects" className="mt-8 self-start flex items-center gap-2 text-white font-semibold group">
            See my work <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-extrabold mb-4">Frequently asked questions</h2>
          <p className="text-gray-500 mb-12">Everything you need to know before we get started.</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-sm">{faq.q}</span>
                  <span className="text-gray-400 ml-4 text-xl leading-none">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + Contact */}
      <section id="contact" className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5">
              Ready to grow your business?
            </h2>
            <p className="text-gray-500 text-lg mb-6 leading-relaxed">
              It couldn't be easier to get started. Fill in the form, tell me about your project, and I'll get back to you within 24 hours.
            </p>
            <div className="space-y-4 text-gray-600 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#6B3FA0] flex items-center justify-center text-white text-xs font-bold">1</div>
                <span>Fill in the form with your project details</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#00A878] flex items-center justify-center text-white text-xs font-bold">2</div>
                <span>I'll review and reach out within 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center text-white text-xs font-bold">3</div>
                <span>We kick off your project and start building</span>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-100 text-gray-500 text-sm">
              <p>Winston-Salem, NC</p>
              <p className="mt-1">(336) 926-3255</p>
            </div>
          </div>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Your name" className="border border-gray-200 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-gray-400 w-full transition-colors" />
              <input type="email" placeholder="Email address" className="border border-gray-200 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-gray-400 w-full transition-colors" />
            </div>
            <select className="border border-gray-200 rounded-lg px-4 py-3.5 text-sm text-gray-500 focus:outline-none focus:border-gray-400 w-full transition-colors appearance-none">
              <option value="">Select a service</option>
              <option value="branding">Branding</option>
              <option value="uiux">UI/UX Design</option>
              <option value="webdesign">Web Design</option>
              <option value="webdev">Web Development</option>
            </select>
            <textarea rows={5} placeholder="Tell me about your project..." className="border border-gray-200 rounded-lg px-4 py-3.5 text-sm focus:outline-none focus:border-gray-400 w-full transition-colors resize-none" />
            <button type="submit" className="bg-black text-white font-semibold px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors w-full">
              Send message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-16 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <p className="font-bold text-lg mb-3">Hamid Sharifi</p>
            <p className="text-gray-500 text-sm leading-relaxed">
              Designer and developer based in Winston-Salem, NC. Helping businesses grow through design excellence.
            </p>
          </div>
          <div>
            <p className="font-bold text-sm mb-4">Services</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#services" className="hover:text-black transition-colors">Branding</a></li>
              <li><a href="#services" className="hover:text-black transition-colors">UI/UX Design</a></li>
              <li><a href="#services" className="hover:text-black transition-colors">Web Design</a></li>
              <li><a href="#services" className="hover:text-black transition-colors">Web Development</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm mb-4">Company</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#about" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-black transition-colors">Projects</a></li>
              <li><a href="#faq" className="hover:text-black transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="font-bold text-sm mb-4">Contact</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Winston-Salem, NC</li>
              <li>(336) 926-3255</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Hamid Sharifi. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
