'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ExtractedInfo {
  name: string | null
  email: string | null
  phone: string | null
  service: string | null
}

interface DeviceInfo {
  userAgent: string
  language: string
  timezone: string
  screen: string
  device: string
  referrer: string
  url: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  isReturning: boolean
  chatOpenCount: number
  sessionDuration: string
  scrollDepth: string
  timeToFirstMessage: string
  localTime: string
}

const MAX_USER_MESSAGES = 20

const LIMIT_MESSAGE =
  "It has been great talking with you. Hamid has your details and will reach out soon. You can also contact him directly at connect@hamidsharifi.com."

const SUGGESTIONS = [
  'What services do you offer?',
  'How much does it cost?',
  'How do I get started?',
]

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
        <Image src="/chat-logo.svg" alt="" width={14} height={14} className="brightness-0 invert" />
      </div>
      <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex items-center gap-1 h-4">
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  )
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user'
  return (
    <div className={`flex items-end gap-2 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
          <Image src="/chat-logo.svg" alt="" width={14} height={14} className="brightness-0 invert" />
        </div>
      )}
      <div className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed ${
        isUser
          ? 'bg-[#E8432D] text-white rounded-2xl rounded-br-sm'
          : 'bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm'
      }`}>
        {msg.content}
      </div>
    </div>
  )
}

/* ── Collect device info client-side ── */
function collectDeviceInfo(sessionStart: number, scrollDepth: number, firstMsgTime: number | null): DeviceInfo {
  const ua = navigator.userAgent
  const isMobile = /Mobi|Android/i.test(ua)
  const isTablet = /Tablet|iPad/i.test(ua)
  const params = new URLSearchParams(window.location.search)
  const openCount = parseInt(localStorage.getItem('hamid_chat_opens') || '0')

  return {
    userAgent: ua,
    language: navigator.language,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    screen: `${screen.width}×${screen.height} (window: ${window.innerWidth}×${window.innerHeight})`,
    device: isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop',
    referrer: document.referrer || 'Direct',
    url: window.location.href,
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    isReturning: !!localStorage.getItem('hamid_chat_visited'),
    chatOpenCount: openCount,
    sessionDuration: `${Math.round((Date.now() - sessionStart) / 1000)}s on page`,
    scrollDepth: `${scrollDepth}%`,
    timeToFirstMessage: firstMsgTime ? `${Math.round((firstMsgTime - sessionStart) / 1000)}s` : '—',
    localTime: new Date().toLocaleString(),
  }
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [summarySent, setSummarySent] = useState(false)
  const [limitReached, setLimitReached] = useState(false)
  const [collectedInfo, setCollectedInfo] = useState<ExtractedInfo>({
    name: null, email: null, phone: null, service: null,
  })

  /* Tracking refs */
  const sessionStart = useRef(Date.now())
  const scrollDepth = useRef(0)
  const firstMsgTime = useRef<number | null>(null)
  const userMessageCount = useRef(0)
  const deviceInfoRef = useRef<DeviceInfo | null>(null)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* Track max scroll depth */
  useEffect(() => {
    const onScroll = () => {
      const pct = Math.round(
        ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100
      )
      if (pct > scrollDepth.current) scrollDepth.current = pct
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Greeting on first open */
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true)

      /* Track visit in localStorage */
      const opens = parseInt(localStorage.getItem('hamid_chat_opens') || '0') + 1
      localStorage.setItem('hamid_chat_opens', String(opens))
      if (!localStorage.getItem('hamid_chat_visited')) {
        localStorage.setItem('hamid_chat_visited', new Date().toISOString())
      }

      setTimeout(() => {
        setMessages([{
          role: 'assistant',
          content: "Hey there! 👋 I'm Hamid's assistant. Ask me about services, pricing, or how to get started.",
        }])
      }, 350)
    }
  }, [open, hasGreeted])

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  /* Focus input on open */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350)
  }, [open])

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  /* Trigger summary email when email first collected */
  useEffect(() => {
    if (collectedInfo.email && !summarySent && messages.length > 1) {
      setSummarySent(true)
      const info = collectDeviceInfo(sessionStart.current, scrollDepth.current, firstMsgTime.current)
      fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, triggerSummary: true, deviceInfo: info }),
      }).catch(() => {})
    }
  }, [collectedInfo.email, summarySent, messages])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading || limitReached) return

    /* Record time of first user message */
    if (firstMsgTime.current === null) firstMsgTime.current = Date.now()

    userMessageCount.current += 1
    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(newMessages)
    setInput('')

    /* Hit the limit — show polite closing message */
    if (userMessageCount.current >= MAX_USER_MESSAGES) {
      setLimitReached(true)
      setLoading(true)
      await new Promise(r => setTimeout(r, 900)) // brief typing delay
      setLoading(false)
      setMessages(prev => [...prev, { role: 'assistant', content: LIMIT_MESSAGE }])
      /* Send final summary if not already sent */
      if (!summarySent) {
        setSummarySent(true)
        const info = collectDeviceInfo(sessionStart.current, scrollDepth.current, firstMsgTime.current)
        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages, triggerSummary: true, deviceInfo: info }),
        }).catch(() => {})
      }
      return
    }

    setLoading(true)

    /* Build device info for first message only (avoid sending every time) */
    const isFirstUserMsg = userMessageCount.current === 1
    const deviceInfo = isFirstUserMsg
      ? collectDeviceInfo(sessionStart.current, scrollDepth.current, firstMsgTime.current)
      : undefined

    if (isFirstUserMsg) deviceInfoRef.current = deviceInfo!

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, deviceInfo }),
      })
      const data = await res.json()
      const reply = data.reply ?? data.error ?? 'Sorry, something went wrong.'
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])

      if (data.extracted) {
        setCollectedInfo(prev => ({
          name: data.extracted.name ?? prev.name,
          email: data.extracted.email ?? prev.email,
          phone: data.extracted.phone ?? prev.phone,
          service: data.extracted.service ?? prev.service,
        }))
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Oops — looks like I tripped over a cable. Try again or email connect@hamidsharifi.com 😅",
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const infoCount = [collectedInfo.name, collectedInfo.email, collectedInfo.phone].filter(Boolean).length
  const msgsLeft = MAX_USER_MESSAGES - userMessageCount.current

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close chat' : "Chat with Hamid's assistant"}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl items-center justify-center transition-all duration-300 ${
          open ? 'bg-gray-700 scale-90 hidden sm:flex' : 'flex bg-gray-900 hover:bg-gray-700 hover:scale-110'
        }`}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <Image src="/chat-logo.svg" alt="" width={28} height={28} className="brightness-0 invert" />
        )}
        {!hasGreeted && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#E8432D] rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        className={`fixed z-50 bg-white shadow-2xl overflow-hidden flex flex-col transition-all duration-300
          inset-x-0 bottom-0 rounded-t-2xl
          sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-90 sm:rounded-2xl sm:origin-bottom-right
          ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}
        style={{ height: 'min(85vh, 520px)' }}
      >
        {/* Header */}
        <div className="bg-gray-900 px-5 py-4 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <Image src="/chat-logo.svg" alt="" width={18} height={18} className="brightness-0 invert" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold leading-tight">Hamid&apos;s Assistant</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
              <span className="text-gray-400 text-xs">
                {limitReached ? 'Conversation complete' : 'Online · Replies instantly'}
              </span>
            </div>
          </div>

          {/* Info dots */}
          {infoCount > 0 && (
            <div className="flex gap-1 mr-1">
              {(['name', 'email', 'phone'] as const).map(key => (
                <span
                  key={key}
                  className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
                  style={{ backgroundColor: collectedInfo[key] ? '#4ade80' : 'rgba(255,255,255,0.15)' }}
                />
              ))}
            </div>
          )}

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1 shrink-0"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Image src="/chat-logo.svg" alt="" width={22} height={22} />
              </div>
              <p className="text-gray-400 text-sm">Starting conversation…</p>
            </div>
          )}

          {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
          {loading && <TypingIndicator />}

          {summarySent && (
            <div className="flex items-center gap-1.5 text-xs text-green-700 bg-green-50 rounded-lg px-3 py-2 mb-2">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              Your details have been sent to Hamid!
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions */}
        {messages.length <= 1 && !loading && (
          <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => sendMessage(s)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors font-medium">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input or closed state */}
        {limitReached ? (
          <div className="px-4 py-4 border-t border-gray-100 text-center shrink-0">
            <a href="#contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#E8432D] px-5 py-2.5 rounded-full hover:bg-[#d03a26] transition-colors">
              Get Started with Hamid →
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-gray-100 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything…"
              disabled={loading}
              className="flex-1 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-gray-400 transition-colors disabled:opacity-50"
            />
            <button type="submit" disabled={!input.trim() || loading}
              className="w-9 h-9 rounded-full bg-[#E8432D] hover:bg-[#d03a26] disabled:bg-gray-200 flex items-center justify-center transition-colors shrink-0"
              aria-label="Send">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="px-4 pb-3 shrink-0 flex items-center justify-between">
          <p className="text-[10px] text-gray-300 font-medium">Powered by Hamid</p>
          {!limitReached && userMessageCount.current >= MAX_USER_MESSAGES - 5 && (
            <p className="text-[10px] text-gray-300">{msgsLeft} replies left</p>
          )}
        </div>
      </div>
    </>
  )
}
