import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, company } = body;
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, company" },
        { status: 400 }
      );
    }

    // Get LeadConnector webhook URL from environment
    const webhookUrl = process.env.LEADCONNECTOR_API_URL;
    const apiKey = process.env.LEADCONNECTOR_API_KEY;

    if (!webhookUrl) {
      console.error("[Lead API] LEADCONNECTOR_API_URL not configured");
      // In development, just log and return success
      console.log("[Lead API] Would send lead:", body);
      return NextResponse.json({ success: true, message: "Lead received (dev mode)" });
    }

    // Forward to LeadConnector
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error("[Lead API] Webhook failed:", response.status, response.statusText);
      throw new Error("Failed to forward lead to webhook");
    }

    console.log("[Lead API] Lead forwarded successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Lead API] Error:", error);
    return NextResponse.json({ error: "Failed to process lead" }, { status: 500 });
  }
}
