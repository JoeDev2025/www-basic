import { supabaseBACKEND } from "@/lib/API-BACKEND";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	try {
		// Log the received payload for debugging
		// console.log("Resend Webhook Payload:", req.body);

		const { type, data } = req.body;

		// Validate the required fields
		if (!type || !data?.email_id || !data?.to) {
			return res.status(400).json({ error: "Missing required fields." });
		}

		const emailId = data.email_id;
		const emailStatus = type; // `type` represents the email status (e.g., 'email.delivered')

		// Update the email status in the database
		const { error } = await supabaseBACKEND
			.from("shop_purchase_orders")
			.update({ resend_email_status: emailStatus })
			.eq("resend_email_id", emailId);

		if (error) {
			console.error("Error updating email status:", error);
			return res.status(500).json({ error: "Failed to update email status." });
		}

		return res
			.status(200)
			.json({ message: "Email status updated successfully." });
	} catch (error) {
		console.error("Error handling Resend webhook:", error);
		return res.status(500).json({ error: "Internal server error." });
	}
}
