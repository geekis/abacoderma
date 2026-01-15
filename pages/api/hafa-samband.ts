// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }

    const { name, email, message, kennitala, kennitalaF, simi } = req.body;

    if (!name || !email || !simi || !kennitala || !message) {
        return res.status(400).json({ error: "Missing fields" });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_FROM,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_TO,
            subject: `Skráning á biðlista - ${name}`,
            html: `
				<p><strong>Nafn:</strong> ${name}</p>
				<p><strong>Kennitala:</strong> ${kennitala}</p>
				${kennitalaF
                ? `<p><strong>Kennitala forráðamanns:</strong> ${kennitalaF}</p>`
                : ""
            }
				<p><strong>Netfang:</strong> ${email}</p>
				<p><strong>Símanúmer:</strong> ${simi}</p>
				<p><strong>Skilaboð:</strong><br/>${message}</p>
			`,
        });

        await transporter.sendMail({
            from: `"Skjúkraþjálfun Akureyrar" <${process.env.EMAIL_FROM}>`,
            to: `"${email}"`,
            subject: `Skráning móttekin - Sjúkraþjálfun Akureyrar`,
            html: `
				<p>Takk fyrir skráninguna ${name}</p>
				<p>Við munum hafa sambandi við þig...</p>
				<p>Kær kveðja Sjúkraþjálfun Akureyrar</p>
			`,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ error: "Email failed to send" });
    }
}
