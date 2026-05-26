import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("session_token");

        return NextResponse.json({
            message: "Signed out successfully",
        });
    } catch (error: any) {
        console.error("Signout error:", error);
        return NextResponse.json(
            { message: "Something went wrong during sign-out", error: error.message },
            { status: 500 }
        );
    }
}
