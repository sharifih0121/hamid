import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import nodemailer from 'nodemailer'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are the AI assistant on Hamid Sharifi's portfolio website. You speak AS Hamid, first person, warm, honest, and professional.

WRITING STYLE — follow these rules strictly:
Use clear, simple language. Be concise. Keep every reply to 2 to 3 sentences max. Use short, direct sentences. Use active voice. Address visitors using "you" and "your".

FORMATTING:
Never use markdown. No asterisks, bold, bullet points, headers, or backticks. Write in plain conversational sentences only. If you need to list things, use commas or natural sentence structure. Use only periods and commas. No semicolons, exclamation marks, or em dashes.

LANGUAGE:
Avoid filler words. Avoid unnecessary adjectives and adverbs. Avoid repetition. Avoid vague or generic statements.

STYLE:
Avoid metaphors and clichés. Avoid dramatic phrasing. Avoid setup phrases like "in conclusion" or "in summary". Avoid transitions like "moreover" or "furthermore".

BANNED WORDS — never use these: can, may, just, very, really, literally, actually, certainly, could, maybe, delve, embark, enlightening, esteemed, shed light, craft, imagine, realm, unlock, discover, skyrocket, abyss, revolutionize, disruptive, utilize, dive deep, tap into, illuminate, unveil, pivotal, intricate, elucidate, hence, harness, exciting, groundbreaking, cutting edge, remarkable, glimpse into, landscape, testament, boost, evolving.

Your personality:
- Honest and direct. Never oversell.
- Light humour is welcome but keep it tasteful.
- Warm and encouraging.
- Concise. If you can say it in one sentence, do it.

About Hamid:
- 10+ years in graphic design, UI/UX, and web development
- Based in Winston-Salem, NC
- Contact: connect@hamidsharifi.com, phone (336) 926-3255
- Rating: 4.9 out of 5 across 100+ projects

Services and Pricing (all projects start from $5,000 — be upfront about this):
- Branding: logo, identity, brand guidelines, from $5,000
- UI/UX Design: research, wireframes, prototypes, design systems, from $5,000
- Web Design: landing pages, full sites, mobile-first, from $5,000
- Web Development: React, Next.js, Webflow, CMS, from $5,000
- Full Package (branding + design + development): most popular, best value, from $12,000

Timelines:
- Branding: 2 to 4 weeks
- UI/UX design: 3 to 5 weeks
- Web design: 2 to 4 weeks
- Full website: 4 to 8 weeks
- Full package: 6 to 10 weeks

Process: Discovery, then Strategy, then Design, then Development, then Testing, then Launch, then Support.

Your mission in this conversation — naturally collect the visitor's name, email, and phone number. Not all at once. Work it in organically:
- After the first reply, casually ask their name if they have not shared it.
- Once you know their name, use it in replies.
- When there is clear interest in a service, ask for their email so Hamid can follow up personally.
- If they seem serious, ask for a phone number — Hamid loves a quick call to get things moving.
- Once you have their email, confirm: "Perfect, I will make sure Hamid gets your details and reaches out within 24 hours."

Special people rules (very important, never break these):

1. If the visitor's name is Omer Ayaydin, Ömer Ayaydın, Ömer Ayaydin, or any clear variation of this name — immediately switch the entire conversation to Turkish. Address them warmly as "Hoce" (not their full name). Stay in Turkish for the rest of the conversation. Be extra warm and friendly, like greeting an old friend. Example opening: "Hoce! Ne sürpriz! Nasılsınız, her şey yolunda mı? 😄"

2. If anyone asks about a person named Mustafa Turkeri, Mustafa Türkeri, or any clear variation — respond in Turkish only, very politely and warmly decline to discuss this person, without being rude or giving any reason. Keep it classy and brief. Example: "Mustafa Türkeri hakkında yorum yapmak istemiyorum, anlayışınız için teşekkür ederim. Başka bir konuda yardımcı olabilir miyim? 🙂"

General rules:
- Never make up pricing, timelines, or capabilities beyond what is listed above.
- If asked something you do not know, say so and offer to have Hamid reach out.
- Always nudge toward the Get Started button or sharing contact info.
- Do not mention competitors.
- If someone is rude, stay calm and classy.`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface DeviceInfo {
  ip?: string
  country?: string
  city?: string
  region?: string
  userAgent?: string
  language?: string
  timezone?: string
  screen?: string
  device?: string
  referrer?: string
  url?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  isReturning?: boolean
  chatOpenCount?: number
  sessionDuration?: string
  scrollDepth?: string
  timeToFirstMessage?: string
  localTime?: string
}

interface ExtractedInfo {
  name: string | null
  email: string | null
  phone: string | null
  service: string | null
}

/* Strip any markdown that sneaks through */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/`{1,3}[^`]*`{1,3}/g, (m) => m.replace(/`/g, ''))
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/^\s*\d+\.\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
}

/* Extract contact info using fast model */
async function extractContactInfo(messages: Message[]): Promise<ExtractedInfo> {
  const transcript = messages
    .map(m => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`)
    .join('\n')

  try {
    const res = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: `Extract contact info from this conversation. Return ONLY valid JSON with no explanation: {"name":null,"email":null,"phone":null,"service":null}\n\nConversation:\n${transcript}`,
      }],
    })
    const raw = res.content[0].type === 'text' ? res.content[0].text.trim() : '{}'
    const match = raw.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : { name: null, email: null, phone: null, service: null }
  } catch {
    return { name: null, email: null, phone: null, service: null }
  }
}

/* Build HTML row helper */
function row(label: string, value: string, shade = false) {
  return `<tr style="background:${shade ? '#fafafa' : '#fff'};">
    <td style="padding:10px 16px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;width:38%;border-bottom:1px solid #f0f0f0;vertical-align:top;">${label}</td>
    <td style="padding:10px 16px;font-size:13px;color:#111;border-bottom:1px solid #f0f0f0;">${value || '—'}</td>
  </tr>`
}

/* Send summary email */
async function sendSummaryEmail(messages: Message[], info: ExtractedInfo, device: DeviceInfo) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  })

  const transcript = messages
    .map(m => `<tr style="background:${m.role === 'user' ? '#fef9f9' : '#fff'};">
      <td style="padding:10px 14px;font-size:11px;font-weight:700;color:${m.role === 'user' ? '#E8432D' : '#6B3FA0'};text-transform:uppercase;width:80px;vertical-align:top;border-bottom:1px solid #f5f5f5;">${m.role === 'user' ? 'Visitor' : 'Hamid AI'}</td>
      <td style="padding:10px 14px;font-size:13px;color:#374151;line-height:1.6;border-bottom:1px solid #f5f5f5;">${m.content.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g, '<br/>')}</td>
    </tr>`)
    .join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
<tr><td align="center">
<table width="100%" style="max-width:620px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

  <tr><td style="background:#111;padding:28px 36px;">
    <p style="margin:0;color:#fff;font-size:20px;font-weight:900;">HAMID</p>
    <p style="margin:5px 0 0;color:#888;font-size:13px;">Chatbot lead — hamidsharifi.com</p>
  </td></tr>

  <tr><td style="padding:28px 36px 0;">
    <p style="margin:0 0 16px;font-size:17px;font-weight:800;color:#111;">Lead Summary 🎯</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:24px;">
      ${row('Name', info.name || '—', true)}
      ${row('Email', info.email ? `<a href="mailto:${info.email}" style="color:#E8432D;">${info.email}</a>` : '—')}
      ${row('Phone', info.phone ? `<a href="tel:${info.phone}" style="color:#E8432D;">${info.phone}</a>` : '—', true)}
      ${row('Service interest', info.service || '—')}
    </table>
  </td></tr>

  <tr><td style="padding:0 36px 0;">
    <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;">Device &amp; Location</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:24px;">
      ${row('IP address', device.ip || '—', true)}
      ${row('Location', [device.city, device.region, device.country].filter(Boolean).join(', ') || '—')}
      ${row('Device', device.device || '—', true)}
      ${row('Browser / OS', device.userAgent ? device.userAgent.substring(0, 80) + '…' : '—')}
      ${row('Screen', device.screen || '—', true)}
      ${row('Language', device.language || '—')}
      ${row('Timezone', device.timezone || '—', true)}
      ${row('Local time', device.localTime || '—')}
    </table>
  </td></tr>

  <tr><td style="padding:0 36px 0;">
    <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;">Session &amp; Source</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:24px;">
      ${row('Referrer', device.referrer || 'Direct')}
      ${row('UTM Source', device.utmSource || '—', true)}
      ${row('UTM Medium', device.utmMedium || '—')}
      ${row('UTM Campaign', device.utmCampaign || '—', true)}
      ${row('Returning visitor', device.isReturning ? 'Yes' : 'First visit')}
      ${row('Chat opens', String(device.chatOpenCount || 1), true)}
      ${row('Session duration', device.sessionDuration || '—')}
      ${row('Scroll depth', device.scrollDepth || '—', true)}
      ${row('Time to first msg', device.timeToFirstMessage || '—')}
      ${row('Page URL', device.url ? `<a href="${device.url}" style="color:#6B3FA0;">${device.url}</a>` : '—')}
    </table>
  </td></tr>

  <tr><td style="padding:0 36px 20px;">
    <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;">Full Conversation (${messages.length} messages)</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
      ${transcript}
    </table>
  </td></tr>

  ${info.email ? `<tr><td style="padding:0 36px 28px;text-align:center;">
    <a href="mailto:${info.email}" style="display:inline-block;background:#E8432D;color:#fff;font-size:13px;font-weight:700;padding:12px 30px;border-radius:6px;text-decoration:none;">Reply to ${info.name || 'this visitor'} →</a>
  </td></tr>` : ''}

  <tr><td style="background:#f9fafb;padding:16px 36px;border-top:1px solid #e5e7eb;">
    <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">Chatbot lead from <strong>hamidsharifi.com</strong></p>
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`

  await transporter.sendMail({
    from: `"Hamid's Chatbot" <${process.env.GMAIL_USER}>`,
    to: 'hamid54888@gmail.com',
    replyTo: info.email ?? undefined,
    subject: `Chatbot lead: ${info.name ?? 'New visitor'}${info.service ? ` — ${info.service}` : ''}`,
    html,
  })
}

/* ── Main handler ── */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { messages, triggerSummary, deviceInfo } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    /* Enrich device info with server-side headers */
    const serverDevice: DeviceInfo = {
      ...deviceInfo,
      ip: request.headers.get('x-forwarded-for')?.split(',')[0].trim()
        || request.headers.get('x-real-ip')
        || 'unknown',
      country: request.headers.get('x-vercel-ip-country') || deviceInfo?.country,
      city: decodeURIComponent(request.headers.get('x-vercel-ip-city') || deviceInfo?.city || ''),
      region: request.headers.get('x-vercel-ip-region') || deviceInfo?.region,
    }

    /* Just send summary (no new AI message) */
    if (triggerSummary) {
      const info = await extractContactInfo(messages)
      await sendSummaryEmail(messages, info, serverDevice)
      return NextResponse.json({ success: true })
    }

    /* Generate AI reply */
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 250,
      system: SYSTEM_PROMPT,
      messages,
    })

    const rawReply = response.content[0].type === 'text' ? response.content[0].text : ''
    const reply = stripMarkdown(rawReply)

    /* Extract contact info from full conversation */
    const fullMessages: Message[] = [...messages, { role: 'assistant', content: reply }]
    const extracted = await extractContactInfo(fullMessages)

    return NextResponse.json({ reply, extracted })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
