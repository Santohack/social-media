"use server";

import prisma from "@/lib/prisma";
import { signInSchema, SignInValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect";
import {verify} from "@node-rs/argon2"
import { cookies } from "next/headers";
import { lucia } from "@/auth";
import { redirect } from "next/navigation";
export async function signIn(
  credientials: SignInValues,
): Promise<{ error: string }> {
  try {
    const { username, password } = signInSchema.parse(credientials);
    const Existinguser = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    });
    if(!Existinguser || !Existinguser.passwordHash) {
        return { error: "Invalid email or password" };
    }
  const validPassword  = await verify(Existinguser.passwordHash, password,{
    memoryCost: 19456,
    timeCost: 2,

    outputLen: 32,
    parallelism: 1,
  });

    if (!validPassword) {
      return { error: "Invalid email or password" };
    }
    const session = await lucia.createSession(Existinguser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    console.error(error);
    return { error: "Invalid email or password" };
  }
}
