"use server";

import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getpostDataInclude } from "@/lib/types";

import { createPostSchema } from "@/lib/validation";
import { get } from "http";

export async function createPost(input: string) {
  const { user } = await validateRequest();
  if (!user) {
    throw new Error("Unauthorized");
  }
  const { content } = createPostSchema.parse({ content: input });
const newPost =  await prisma.post.create({
    data: {
      content,
      userId: user.id,
    },
    include : getpostDataInclude(user.id)
  });

  return newPost;
}
