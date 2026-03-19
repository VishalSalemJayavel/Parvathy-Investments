import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, investorType, message } = body;

    if (!firstName || !lastName || !email || !investorType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Integrate with email service
    // Option 1: Resend — https://resend.com
    //   import { Resend } from 'resend';
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({ from: '...', to: '...', subject: '...', html: '...' });
    //
    // Option 2: Formspree — https://formspree.io
    //   await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: JSON.stringify(body) });

    console.log("Contact form submission:", { firstName, lastName, email, investorType, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
