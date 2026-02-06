// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).send("Method Not Allowed");
    }

    const { firstName, lastName, email, message, simi } = req.body;

    if (!firstName || !lastName || !email || !simi || !message) {
        return res.status(400).json({ error: "Missing fields" });
    }

    const name = `${firstName} ${lastName}`;

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
            subject: `Hafa samband - ${name}`,
            html: `
				<p><strong>Nafn:</strong> ${name}</p>
				<p><strong>Netfang:</strong> ${email}</p>
				<p><strong>Símanúmer:</strong> ${simi}</p>
				<p><strong>Skilaboð:</strong><br/>${message}</p>
			`,
        });

        await transporter.sendMail({
            from: `"AbacoDerma" <${process.env.EMAIL_FROM}>`,
            to: `"${email}"`,
            subject: `Takk fyrir að hafa samband`,
            html: `
				<p>Takk fyrir skilaboðin ${name}</p>
				<p>Við munum hafa sambandi.</p>
				<p>Kær kveðja Abaco Derma</p>
			`,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("Email error:", error);
        res.status(500).json({ error: "Email failed to send" });
    }
}
