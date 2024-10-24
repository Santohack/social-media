import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataInclude, PostPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const curser =  req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize  = 10;
    const { user } = await validateRequest();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
    const posts = await prisma.post.findMany({
      include: postDataInclude,
      orderBy: { createdAt: "desc" },
      take: pageSize+1,
      cursor: curser ? { id: curser } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;
    const data : PostPage = {
      posts: posts.slice(0, pageSize),
      nextCursor: nextCursor,
    }
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
