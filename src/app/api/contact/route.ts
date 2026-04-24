import { NextResponse } from 'next/server'

const RECAPTCHA_SECRET = '6LcsZQolAAAAAKTwAew19Ek_08hSgA0Op8V4uSRK'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, service, firstName, lastName, email, howFound } = body

    if (!token) {
      return NextResponse.json({ error: 'reCAPTCHA token missing.' }, { status: 400 })
    }

    // Verify reCAPTCHA with Google
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET, response: token }),
    })

    const verifyData = await verifyRes.json()

    if (!verifyData.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed. Please try again.' }, { status: 400 })
    }

    // ── At this point the form is verified ──
    // You can send an email, save to a database, etc.
    console.log('New contact submission:', { service, firstName, lastName, email, howFound })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
