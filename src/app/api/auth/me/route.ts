import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth";

export async function GET() {
    try {
        const user = await getUserFromSession();

        if (!user) {
            return NextResponse.json(
                { message: "Not authenticated", user: null },
                { status: 401 }
            );
        }

        return NextResponse.json({
            user,
        });
    } catch (error: any) {
        console.error("Auth me error:", error);
        return NextResponse.json(
            { message: "Something went wrong fetching session", error: error.message },
            { status: 500 }
        );
    }
}
