import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inisialisasi Resend menggunakan API Key dari file .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, serviceType, projectDetails } = body;

    // 1. Validasi Input
    if (!fullName || !email || !serviceType || !projectDetails) {
      return NextResponse.json(
        { success: false, error: 'Semua data wajib diisi.' },
        { status: 400 }
      );
    }

    // 2. Kirim Email Menggunakan Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Email bawaan sandbox Resend
      to: 'devv.labss@gmail.com', // 🎯 EMAIL TUJUAN (GMAIL ANDA)
      subject: `💼 Penawaran Proyek Baru - ${fullName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111; background-color: #f9f9f9; border-radius: 12px; max-width: 600px; margin: auto;">
          <h2 style="color: #3d6eff; border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 0;">
            Ada Penawaran Proyek Baru!
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #555;">Nama Pengirim:</td>
              <td style="padding: 8px 0;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Email Klien:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #555;">Jenis Layanan:</td>
              <td style="padding: 8px 0;"><span style="background: #eef2ff; color: #3d6eff; padding: 4px 8px; rounded: 4px; font-size: 13px; font-weight: bold;">${serviceType}</span></td>
            </tr>
          </table>
          
          <div style="margin-top: 25px; padding: 15px; background: #fff; border-left: 4px solid #7b45f5; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <p style="margin-top: 0; font-weight: bold; color: #555;">Rencana / Detail Proyek:</p>
            <p style="white-space: pre-line; color: #333; line-height: 1.6;">${projectDetails}</p>
          </div>
          
          <p style="font-size: 11px; color: #aaa; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
            Pesan dikirim otomatis via Production Server Hub portofolio Anda.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { success: true, message: 'Email berhasil terkirim ke Gmail.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Server API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan pada sistem internal server.' },
      { status: 500 }
    );
  }
}