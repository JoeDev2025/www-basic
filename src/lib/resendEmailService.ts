import { Resend } from "resend";

// PLEASE NOTE - this file can only be called from an API endpoint, it cannot be called directly from code running in the browser.

const resend = new Resend(process.env.RESEND_API_KEY);
const sendFrom = process.env.RESEND_DEFAULT_SEND_FROM!;

type EmailOptions = {
	to: string;
	subject: string;
	body: string;
	text?: string;
};

export const sendResendEmail = async ({
	to,
	subject,
	body,
	text,
}: EmailOptions): Promise<string> => {
	try {
		const response = await resend.emails.send({
			from: sendFrom,
			to,
			subject,
			html: body,
			text,
		});

		// Return the email ID for tracking
		if (!response.data) {
			throw new Error("Response data is null.");
		}
		return response.data.id;
	} catch (error) {
		console.error("Error sending email with Resend:", error);
		throw new Error("Failed to send email.");
	}
};
