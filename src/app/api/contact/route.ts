import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const RECAPTCHA_SECRET = '6LcsZQolAAAAAKTwAew19Ek_08hSgA0Op8V4uSRK'
const TO_EMAIL = 'hamid54888@gmail.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, service, firstName, lastName, email, howFound } = body

    /* ── 1. Verify reCAPTCHA ── */
    if (!token) {
      return NextResponse.json({ error: 'reCAPTCHA token missing.' }, { status: 400 })
    }

    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
    })
    const verifyData = await verifyRes.json()

    if (!verifyData.success) {
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    /* ── 2. Send email via Gmail SMTP ── */
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    const serviceLabel: Record<string, string> = {
      branding: 'Branding',
      uiux: 'UI/UX Design',
      webdesign: 'Web Design',
      webdev: 'Web Development',
      fullpackage: 'Full Package',
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Client Inquiry</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#111111;padding:32px 40px;">
              <p style="margin:0;color:#ffffff;font-size:22px;font-weight:900;letter-spacing:-0.5px;">HAMID</p>
              <p style="margin:6px 0 0;color:#888;font-size:13px;">New client inquiry from your website</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:20px;font-weight:800;color:#111;">
                You have a new inquiry 🎉
              </p>

              <!-- Service badge -->
              <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:0.08em;">Service requested</p>
              <p style="margin:0 0 28px;display:inline-block;background:#E8432D;color:#fff;font-size:13px;font-weight:700;padding:6px 14px;border-radius:20px;">
                ${serviceLabel[service] ?? service ?? 'Not specified'}
              </p>

              <!-- Details table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                ${[
                  ['Name', `${firstName ?? ''} ${lastName ?? ''}`.trim()],
                  ['Email', email ?? '—'],
                  ['How they found you', howFound || '—'],
                ].map(([label, value], i) => `
                <tr style="background:${i % 2 === 0 ? '#fafafa' : '#fff'};">
                  <td style="padding:14px 18px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;width:38%;border-bottom:1px solid #f0f0f0;">
                    ${label}
                  </td>
                  <td style="padding:14px 18px;font-size:14px;color:#111;border-bottom:1px solid #f0f0f0;">
                    ${value}
                  </td>
                </tr>`).join('')}
              </table>

              <!-- Reply CTA -->
              <p style="margin:32px 0 0;text-align:center;">
                <a href="mailto:${email ?? ''}"
                   style="display:inline-block;background:#111;color:#fff;font-size:13px;font-weight:700;padding:14px 32px;border-radius:6px;text-decoration:none;letter-spacing:0.04em;">
                  Reply to ${firstName ?? 'this client'} →
                </a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;text-align:center;">
                Sent from your portfolio at <strong>hamidsharifi.com</strong>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

    await transporter.sendMail({
      from: `"Hamid's Atelier" <${process.env.GMAIL_USER}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New inquiry from ${firstName ?? ''} ${lastName ?? ''} — ${serviceLabel[service] ?? service ?? 'Website'}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
