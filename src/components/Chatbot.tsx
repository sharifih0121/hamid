'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTIONS = [
  'What services do you offer?',
  'How long does a project take?',
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
    <div className={`flex items-end gap-2 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
          <Image src="/chat-logo.svg" alt="Hamid" width={14} height={14} className="brightness-0 invert" />
        </div>
      )}
      <div
        className={`max-w-[78%] px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-[#E8432D] text-white rounded-2xl rounded-br-sm'
            : 'bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm'
        }`}
      >
        {msg.content}
      </div>
    </div>
  )
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  /* Greeting on first open */
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true)
      setTimeout(() => {
        setMessages([{
          role: 'assistant',
          content: "Hi there! 👋 I'm Hamid's assistant. I can answer questions about services, timelines, process, or anything else about working with Hamid. What would you like to know?",
        }])
      }, 400)
    }
  }, [open, hasGreeted])

  /* Scroll to bottom on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  /* Focus input on open */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350)
  }, [open])

  /* Close on Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply ?? data.error ?? 'Sorry, something went wrong.',
      }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I ran into an issue. Please try again or email connect@hamidsharifi.com.',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className={`
          fixed bottom-6 right-6 z-50
          w-14 h-14 rounded-full shadow-xl
          flex items-center justify-center
          transition-all duration-300
          ${open ? 'bg-gray-700 scale-90' : 'bg-gray-900 hover:bg-gray-700 hover:scale-110'}
        `}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <Image src="/chat-logo.svg" alt="" width={28} height={28} className="brightness-0 invert" />
        )}

        {/* Unread dot — shows before first open */}
        {!hasGreeted && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#E8432D] rounded-full border-2 border-white" />
        )}
      </button>

      {/* ── Chat panel ── */}
      <div
        className={`
          fixed bottom-24 right-6 z-50
          w-[360px] max-w-[calc(100vw-24px)]
          bg-white rounded-2xl shadow-2xl overflow-hidden
          flex flex-col
          transition-all duration-300 origin-bottom-right
          ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        style={{ height: '520px' }}
      >
        {/* Header */}
        <div className="bg-gray-900 px-5 py-4 flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
            <Image src="/chat-logo.svg" alt="" width={18} height={18} className="brightness-0 invert" />
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">Hamid&apos;s Assistant</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              <span className="text-gray-400 text-xs">Online · Replies instantly</span>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-gray-400 hover:text-white transition-colors p-1"
            aria-label="Close chat"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-0">
          {messages.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 pb-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                <Image src="/chat-logo.svg" alt="" width={22} height={22} />
              </div>
              <p className="text-gray-400 text-sm">Starting conversation…</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} />
          ))}

          {loading && <TypingIndicator />}

          <div ref={bottomRef} />
        </div>

        {/* Quick suggestions — show only at start */}
        {messages.length <= 1 && !loading && (
          <div className="px-4 pb-3 flex flex-wrap gap-2 shrink-0">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors duration-150 font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="px-4 py-3 border-t border-gray-100 flex items-center gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me anything…"
            disabled={loading}
            className="flex-1 text-sm text-gray-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 focus:outline-none focus:border-gray-400 transition-colors disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-9 h-9 rounded-full bg-[#E8432D] hover:bg-[#d03a26] disabled:bg-gray-200 flex items-center justify-center transition-colors duration-150 shrink-0"
            aria-label="Send"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </form>

        {/* Footer branding */}
        <div className="px-4 pb-3 shrink-0">
          <p className="text-center text-[10px] text-gray-300 font-medium">
            Powered by Claude AI · hamidsharifi.com
          </p>
        </div>
      </div>
    </>
  )
}
