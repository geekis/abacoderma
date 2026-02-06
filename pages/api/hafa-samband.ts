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
        console.log("Starting email process...");
        const EMAIL_FROM = process.env.EMAIL_FROM;
        const EMAIL_TO = process.env.EMAIL_TO;
        const EMAIL_PASS = process.env.EMAIL_PASS;

        console.log("EMAIL_FROM:", EMAIL_FROM);
        console.log("EMAIL_TO:", EMAIL_TO);
        console.log("EMAIL_PASS set:", !!EMAIL_PASS);

        if (!EMAIL_FROM || !EMAIL_PASS || !EMAIL_TO) {
            console.error("Missing environment variables");
            return res.status(500).json({ 
                error: "Vantar stillingar fyrir tölvupóst (Environment variables)",
                details: `Missing: ${[!EMAIL_FROM && "EMAIL_FROM", !EMAIL_PASS && "EMAIL_PASS", !EMAIL_TO && "EMAIL_TO"].filter(Boolean).join(", ")}`
            });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: EMAIL_FROM,
                pass: EMAIL_PASS,
            },
        });

        console.log("Sending main email to admin...");
        await transporter.sendMail({
            from: `"${name}" <${EMAIL_FROM}>`, // Use EMAIL_FROM as sender for Gmail
            replyTo: email, // Set user email as reply-to
            to: EMAIL_TO,
            subject: `Hafa samband - ${name}`,
            html: `
				<p><strong>Nafn:</strong> ${name}</p>
				<p><strong>Netfang:</strong> ${email}</p>
				<p><strong>Símanúmer:</strong> ${simi}</p>
				<p><strong>Skilaboð:</strong><br/>${message}</p>
			`,
        });

        console.log("Sending confirmation email to user...");
        await transporter.sendMail({
            from: `"AbacoDerma" <${EMAIL_FROM}>`,
            to: email,
            subject: `Takk fyrir að hafa samband`,
            html: `
				<p>Takk fyrir skilaboðin ${name}</p>
				<p>Við munum hafa sambandi.</p>
				<p>Kær kveðja Abaco Derma</p>
			`,
        });

        console.log("Emails sent successfully!");
        res.status(200).json({ success: true });
    } catch (error: any) {
        console.error("Email error details:", error);
        
        let errorMessage = "Email failed to send";
        let errorDetails = error?.message || "Unknown error";

        if (errorDetails.includes("535") || errorDetails.includes("Invalid login")) {
            errorMessage = "Innskráning mistókst (Gmail Login Failed)";
            errorDetails = "Gmail hafnaði notandanafni eða lykilorði. Gakktu úr skugga um að þú sért að nota 'App Password' en ekki venjulega lykilorðið þitt.";
        }

        res.status(500).json({ 
            error: errorMessage, 
            details: errorDetails 
        });
    }
}
