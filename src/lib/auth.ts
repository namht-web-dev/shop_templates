"use server";

import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/db";
import { LIMIT_SESSION, SESSION_COOKIE } from "@/config/site";
import { User } from "@/types";
import { createHash } from "crypto";
import { redirect } from "next/navigation";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(
  userId: string,
  remember: boolean,
  ipAddress: string | null,
  userAgent: string | null,
) {
  await prisma.session.deleteMany({
    where: {
      userId,
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  const sessions = await prisma.session.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  // Đã đủ 5 session → xóa session cũ nhất
  if (sessions.length >= LIMIT_SESSION) {
    await prisma.session.delete({
      where: {
        id: sessions[0].id,
      },
    });
  }
  const token = uuidv4();

  const expiresAt = new Date(
    Date.now() + (remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000),
  );

  await prisma.session.create({
    data: {
      tokenHash: hashToken(token),
      userId,
      expiresAt,
      ipAddress,
      userAgent,
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
  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: {
      tokenHash,
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

export async function logoutAction() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = hashToken(token);

    await prisma.session.deleteMany({
      where: { tokenHash },
    });
  }

  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAdmin(locale = "vi"): Promise<User> {
  const user = await getCurrentUser();

  if (!user) {
    redirect(`/${locale}/login`);
  }

  if (user.role !== "ADMIN") {
    redirect(`/${locale}`);
  }

  return user;
}
