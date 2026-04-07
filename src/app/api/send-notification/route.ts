import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const NOTIFY_EMAIL = 'daksh.hadvani132235@marwadiuniversity.ac.in';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const rows = [
      ['Hackathon Name', data.hackathonName],
      ['University', data.universityName],
      ['Organizer', data.organizerName],
      ['Email', data.organizerEmail],
      ['Phone', data.organizerPhone],
      ['Expected Participants', data.expectedParticipants],
      ['Proposed Dates', data.proposedDateRange],
      ['Prize Budget', data.prizePoolBudget],
      ['Venue', data.venueDetails],
      ['Sponsorship & Prizes', data.sponsorshipDetails || '—'],
      ['Theme / Tracks', data.hackathonTheme || '—'],
      ['Additional Requirements', data.additionalRequirements || '—'],
    ];

    const tableRows = rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;font-weight:600;color:#334155;white-space:nowrap">${label}</td><td style="padding:8px 12px;border:1px solid #e2e8f0;color:#475569">${value}</td></tr>`
      )
      .join('');

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
        <h2 style="color:#00c4b4;margin-bottom:4px">New Hackathon Application</h2>
        <p style="color:#64748b;margin-bottom:16px">Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        <table style="border-collapse:collapse;width:100%">${tableRows}</table>
        <p style="color:#94a3b8;font-size:13px;margin-top:16px">— XINITY Hackathon Platform</p>
      </div>
    `;

    await transporter.sendMail({
      from: `"XINITY Platform" <${process.env.SMTP_EMAIL}>`,
      to: NOTIFY_EMAIL,
      subject: `New Hackathon Application — ${data.hackathonName} (${data.universityName})`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Email send failed:', error);
    return NextResponse.json({ ok: false, error: 'Email failed' }, { status: 500 });
  }
}
