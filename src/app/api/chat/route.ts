import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import nodemailer from 'nodemailer'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are the AI assistant on Hamid Sharifi's portfolio website. You speak AS Hamid — first person, warm, honest, a little witty, and always professional. Keep every reply SHORT (2–4 sentences max). No essays. No bullet lists unless truly necessary.

## Your personality
- Honest and direct — never oversell or make things up
- A little funny — light humour is welcome, but keep it tasteful
- Warm and encouraging — make people feel excited to work with Hamid
- Concise — if you can say it in one sentence, do it

## About Hamid
- 10+ years in graphic design, UI/UX, and web development
- Based in Winston-Salem, NC
- Contact: connect@hamidsharifi.com · (336) 926-3255
- Rating: 4.9/5 across 100+ projects

## Services & Pricing
All projects start at **$5,000**. Be upfront about this — don't hide it.
- **Branding** — logo, identity, brand guidelines (from $5k)
- **UI/UX Design** — research, wireframes, prototypes, design systems (from $5k)
- **Web Design** — landing pages, full sites, mobile-first (from $5k)
- **Web Development** — React, Next.js, Webflow, CMS (from $5k)
- **Full Package** — brand + design + dev — most popular, best value (from $12k)

## Timelines
- Branding: 2–4 weeks · UI/UX: 3–5 weeks · Web design: 2–4 weeks · Full site: 4–8 weeks · Full package: 6–10 weeks

## Process
Discovery → Strategy → Design → Development → Testing → Launch → Support

## Your mission in this conversation
Naturally collect the visitor's **name**, **email**, and **phone number** — not all at once, that's creepy. Work it in organically:
- After the first or second reply, ask their name if they haven't shared it
- Once you know their name, use it
- When there's a clear interest in a service, ask for their email so Hamid can follow up
- If they seem serious, ask for a phone number too — "Hamid loves a quick call to get things moving"
- Once you have their email, let them know: "Perfect — I'll make sure Hamid gets your details and reaches out within 24 hours."

## Rules
- Never make up pricing, timelines, or capabilities beyond what's listed
- If asked something you don't know, say so and offer to have Hamid reach out
- Always nudge toward the Get Started button or sharing contact info
- Don't mention competitors
- If someone is rude, stay calm and classy`

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

/* ── Extract contact info from conversation ── */
async function extractContactInfo(messages: Message[]): Promise<ExtractedInfo> {
  const transcript = messages.map(m => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n')

  try {
    const res = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      messages: [{
        role: 'user',
        content: `Extract contact info from this chat. Reply with ONLY valid JSON, no explanation:\n{"name":null,"email":null,"phone":null,"service":null}\n\nChat:\n${transcript}`,
      }],
    })

    const text = res.content[0].type === 'text' ? res.content[0].text.trim() : '{}'
    const json = text.match(/\{[\s\S]*\}/)
    return json ? JSON.parse(json[0]) : { name: null, email: null, phone: null, service: null }
  } catch {
    return { name: null, email: null, phone: null, service: null }
  }
}

/* ── Send summary email to Hamid ── */
async function sendSummaryEmail(messages: Message[], info: ExtractedInfo) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  const transcript = messages
    .map(m => `<tr style="background:${m.role === 'user' ? '#f9fafb' : '#fff'};">
      <td style="padding:10px 16px;font-size:12px;font-weight:700;color:${m.role === 'user' ? '#E8432D' : '#6B3FA0'};text-transform:uppercase;width:80px;vertical-align:top;">
        ${m.role === 'user' ? 'Visitor' : 'Hamid AI'}
      </td>
      <td style="padding:10px 16px;font-size:13px;color:#374151;line-height:1.6;">${m.content.replace(/\n/g, '<br/>')}</td>
    </tr>`)
    .join('')

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#111;padding:28px 36px;">
            <p style="margin:0;color:#fff;font-size:20px;font-weight:900;">HAMID</p>
            <p style="margin:6px 0 0;color:#888;font-size:13px;">New chatbot lead from hamidsharifi.com</p>
          </td>
        </tr>

        <!-- Contact info -->
        <tr>
          <td style="padding:28px 36px 0;">
            <p style="margin:0 0 16px;font-size:18px;font-weight:800;color:#111;">Lead Summary 🎯</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px;">
              ${[
                ['Name', info.name || '—'],
                ['Email', info.email ? `<a href="mailto:${info.email}" style="color:#E8432D;">${info.email}</a>` : '—'],
                ['Phone', info.phone ? `<a href="tel:${info.phone}" style="color:#E8432D;">${info.phone}</a>` : '—'],
                ['Service interest', info.service || '—'],
              ].map(([label, value], i) => `
              <tr style="background:${i % 2 === 0 ? '#fafafa' : '#fff'};">
                <td style="padding:12px 16px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;width:36%;border-bottom:1px solid #f0f0f0;">${label}</td>
                <td style="padding:12px 16px;font-size:13px;color:#111;border-bottom:1px solid #f0f0f0;">${value}</td>
              </tr>`).join('')}
            </table>
          </td>
        </tr>

        <!-- Transcript -->
        <tr>
          <td style="padding:0 36px 28px;">
            <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;">Full conversation</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              ${transcript}
            </table>
          </td>
        </tr>

        ${info.email ? `
        <!-- Reply CTA -->
        <tr>
          <td style="padding:0 36px 32px;text-align:center;">
            <a href="mailto:${info.email}" style="display:inline-block;background:#E8432D;color:#fff;font-size:13px;font-weight:700;padding:13px 32px;border-radius:6px;text-decoration:none;">
              Reply to ${info.name || 'this visitor'} →
            </a>
          </td>
        </tr>` : ''}

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:16px 36px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">Chatbot lead from <strong>hamidsharifi.com</strong></p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  await transporter.sendMail({
    from: `"Hamid's Chatbot" <${process.env.GMAIL_USER}>`,
    to: 'hamid54888@gmail.com',
    replyTo: info.email ?? undefined,
    subject: `Chatbot lead: ${info.name ?? 'New visitor'} — ${info.service ?? 'General inquiry'}`,
    html,
  })
}

/* ── Main handler ── */
export async function POST(request: Request) {
  try {
    const { messages, triggerSummary } = await request.json()

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
    }

    /* Just send summary email (no new AI message needed) */
    if (triggerSummary) {
      const info = await extractContactInfo(messages)
      await sendSummaryEmail(messages, info)
      return NextResponse.json({ success: true })
    }

    /* Generate AI reply */
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages,
    })

    const reply = response.content[0].type === 'text' ? response.content[0].text : ''

    /* Extract contact info from full conversation including new reply */
    const fullMessages: Message[] = [...messages, { role: 'assistant', content: reply }]
    const extracted = await extractContactInfo(fullMessages)

    return NextResponse.json({ reply, extracted })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
