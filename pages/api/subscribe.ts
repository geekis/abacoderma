
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, firstName, lastName } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Vantar netfang" });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const DATACENTER = process.env.MAILCHIMP_SERVER_PREFIX;
console.log("Mailchimp config:", { API_KEY: !!API_KEY, LIST_ID: !!LIST_ID, DATACENTER: !!DATACENTER });
  if (!API_KEY || !LIST_ID || !DATACENTER) {
    // If not configured, we return a success for now but log it
    // Or return an error if you want to be strict.
    console.warn("Mailchimp environment variables are missing.");
    return res.status(500).json({ error: "Mailchimp is not configured." });
  }

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

  const data = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: firstName || "",
      LNAME: lastName || "",
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status >= 400) {
      const errorData = await response.json();
      if (errorData.title === "Member Exists") {
        return res.status(200).json({ success: true, message: "Þú ert nú þegar á póstlista hjá okkur!" });
      }
      return res.status(400).json({
        error: `Það kom upp villa: ${errorData.detail || errorData.title}`,
      });
    }

    return res.status(201).json({ success: true });
  } catch (error) {
    console.error("Mailchimp error:", error);
    return res.status(500).json({ error: "Innræn villa kom upp." });
  }
}
