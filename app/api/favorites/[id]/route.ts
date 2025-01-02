import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { type NextRequest } from "next/server";
import { ApiRouteContext } from "../../types";

export async function GET(
  request: NextRequest,
  context: ApiRouteContext
): Promise<Response> {
  const { id } = await context.params;
  const favorites = await prisma.favorites.findUnique({
    where: { id },
  });

  if (!favorites) {
    return Response.json({ message: "Favorites not found" }, { status: 404 });
  }

  return Response.json(favorites);
}


export async function DELETE(
  request: NextRequest,
  context: ApiRouteContext
): Promise<Response> {
  const session = await auth();

  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  await prisma.favorites.delete({
    where: { id },
  });

  return Response.json({ message: "Favorites deleted successfully" });
}
