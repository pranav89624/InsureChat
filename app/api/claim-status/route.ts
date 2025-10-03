import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Claim from "@/models/Claim";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { claimId } = body;

    if (!claimId || typeof claimId !== "string") {
      return NextResponse.json(
        { error: "Invalid request. Please provide a valid claim ID." },
        { status: 400 }
      );
    }

    await connectDB();

    const claim = await Claim.findOne({ claimId: claimId.trim() }).lean();

    if (!claim) {
      return NextResponse.json(
        {
          error: `Claim with ID "${claimId}" not found. Please check the claim ID and try again.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        claim: {
          claimId: claim.claimId,
          customerName: claim.customerName,
          policyNumber: claim.policyNumber,
          status: claim.status,
          amount: claim.amount,
          date: claim.date,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/claim-status:", error);

    return NextResponse.json(
      {
        error:
          "An error occurred while processing your request. Please try again later.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Please use POST request." },
    { status: 405 }
  );
}
