import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import { EnquiryModel } from "@/models/Enquiry";

const enquiryServerSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  phone: z.string().regex(/^[0-9]{10}$/, "Valid 10-digit phone number required"),
  email: z.string().email("Valid email required"),
  unitInterest: z.enum(["2 BHK", "3 BHK", "4 BHK", "Penthouse"]),
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
