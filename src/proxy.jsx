// src/proxy.js
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "./lib/auth";

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ["/admin/:path*"],
};