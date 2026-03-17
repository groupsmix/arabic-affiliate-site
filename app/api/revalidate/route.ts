import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const path = body?.path as string | undefined;

  if (path) {
    revalidatePath(path);
  } else {
    revalidatePath("/", "layout");
  }

  return NextResponse.json({ revalidated: true });
}
