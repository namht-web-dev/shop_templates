import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/db";
import { SESSION_COOKIE } from "@/config/site";
import { User } from "@/types";

export async function createSession(userId: string, remember: boolean) {
  const token = uuidv4();

  const expiresAt = new Date(
    Date.now() + (remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000),
  );

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: {
      token,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          provider: true,
        },
      },
    },
  });

  if (!session) {
    return null;
  }

  if (session.expiresAt < new Date()) {
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session.user;
}
