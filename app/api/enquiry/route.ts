import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { connectToDatabase } from "@/lib/db";
import { EnquiryModel } from "@/models/Enquiry";

const resend = new Resend(process.env.RESEND_API_KEY);

const enquiryServerSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Valid 10-digit phone number required"),
  email: z.string().email("Valid email required"),
  unitInterest: z.string().min(1, "Configuration required"),
  preferredVisitDate: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate payload
    const parseResult = enquiryServerSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: parseResult.error.errors[0].message },
        { status: 400 }
      );
    }

    const { fullName, phone, email, unitInterest, preferredVisitDate, message } = parseResult.data;

    // Database connection & Lead persistence
    try {
      const db = await connectToDatabase();
      if (db) {
        const newEnquiry = await EnquiryModel.create({
          fullName,
          phone,
          email,
          unitInterest,
          preferredVisitDate,
          message,
        });

        console.log("Enquiry saved to MongoDB:", newEnquiry._id);
      } else {
        console.log("MONGODB_URI not configured. Fallback lead logged:", {
          fullName,
          phone,
          email,
          unitInterest,
          timestamp: new Date().toISOString(),
        });
      }
    } catch (dbErr) {
      console.error("Database lead logging error:", dbErr);
    }

    // Send email notification via Resend API
    if (process.env.RESEND_API_KEY) {
      try {
        const notificationEmail = process.env.NOTIFICATION_EMAIL || "beyondrealty9@gmail.com";

        await resend.emails.send({
          from: "Cascade Enquiries <onboarding@resend.dev>",
          to: [notificationEmail],
          subject: `New Lead: ${fullName} (${unitInterest}) - Codename Cascade`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
              <h2 style="color: #0f172a; margin-bottom: 16px;">New Property Enquiry Received</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Full Name:</td><td style="padding: 8px 0; color: #0f172a;">${fullName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone Number:</td><td style="padding: 8px 0; color: #0f172a;"><a href="tel:${phone}">${phone}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Email Address:</td><td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Configuration:</td><td style="padding: 8px 0; color: #0f172a;">${unitInterest}</td></tr>
                ${preferredVisitDate ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Preferred Visit Date:</td><td style="padding: 8px 0; color: #0f172a;">${preferredVisitDate}</td></tr>` : ""}
                ${message ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Message / Notes:</td><td style="padding: 8px 0; color: #0f172a;">${message}</td></tr>` : ""}
              </table>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #e2e8f0;" />
              <p style="font-size: 12px; color: #94a3b8;">Sent automatically via Codename Cascade Landing Page</p>
            </div>
          `,
        });

        console.log("Resend notification email sent successfully to", notificationEmail);
      } catch (resendError) {
        console.error("Resend API Email error:", resendError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your enquiry has been registered successfully. Our VIP desk will contact you shortly.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing enquiry API route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error processing enquiry" },
      { status: 500 }
    );
  }
}

