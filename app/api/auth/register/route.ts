import { NextRequest, NextResponse } from "next/server";
import { nextServer } from "@/lib/api/api";
import { cookies } from "next/headers";
import { parse } from "cookie";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const apiRes = await nextServer.post("auth/register", body);

    const cookieStore = await cookies();
    const setCookie = apiRes.headers["set-cookie"];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);

        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };
        if (parsed.accessToken)
          cookieStore.set("accessToken", parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set("refreshToken", parsed.refreshToken, options);
      }
      return NextResponse.json(apiRes.data);
    }

    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error: unknown) {
    let errorMessage = "Server error";

    type ApiError = {
      response?: { data?: string };
      message?: string;
    };

    if (typeof error === "object" && error !== null) {
      const err = error as ApiError;
      if ("response" in err && typeof err.response?.data === "string") {
        errorMessage = err.response.data;
      } else if ("message" in err && typeof err.message === "string") {
        errorMessage = err.message;
      }
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
