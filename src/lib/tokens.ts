import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/db";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Hạn 24 giờ

  // Xóa token cũ của email này nếu có
  const existingToken = await prisma.verificationToken.findFirst({
    where: { email },
  });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  // Tạo token mới
  return await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
};
