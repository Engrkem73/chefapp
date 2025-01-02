import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { ApiRouteContext } from "../types";

export async function POST(
  request: NextRequest,
  context: ApiRouteContext
): Promise<NextResponse> {
  try {
    const session = await auth();

    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    if (!body.title || !body.content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const favorite = await prisma.favorites.create({
      data: {
        title: body.title,
        content: body.content,
        userId: session.user.id,
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error('Error creating favorite:', error);
    return NextResponse.json(
      { message: "Error creating favorite" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  context: ApiRouteContext
): Promise<NextResponse> {
  return NextResponse.json(null, { status: 405 });
}

export async function DELETE(
  request: NextRequest,
  context: ApiRouteContext
): Promise<NextResponse> {
  const session = await auth();
  const params = await context.params;

  if (!params || typeof params.id !== 'string') {
    return NextResponse.json({ message: "Invalid or missing 'id' parameter" }, { status: 400 });
  }

  const { id } = params;

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.favorites.delete({
    where: { id },
  });

  return new NextResponse(null, { status: 204 });
}
