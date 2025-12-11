import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        // Clear the user session cookie
        cookies().delete("user_session");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Logout Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
