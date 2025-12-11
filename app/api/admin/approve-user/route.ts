import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    // 1. Verify Admin (Security Check)
    const cookieStore = cookies();
    const adminAuth = cookieStore.get("admin_auth");
    if (!adminAuth) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { userId, action } = await req.json();

        if (!userId || !action) {
            return new NextResponse("Missing details", { status: 400 });
        }

        // 2. Perform Action
        if (action === "APPROVE") {
            await prisma.user.update({
                where: { id: userId },
                data: { status: "ACTIVE" }
            });
        } else if (action === "REJECT") {
            await prisma.user.update({
                where: { id: userId },
                data: { status: "REJECTED" } // Or delete() if you prefer
            });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Approval Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
