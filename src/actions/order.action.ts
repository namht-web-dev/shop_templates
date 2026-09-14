// src/actions/order.action.ts
"use server";

import { prisma } from "@/db";
import type { OrderItem } from "@/types";

export interface CreateOrderParams {
  userId?: string | null;
  items: OrderItem[];
  total: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  note?: string;
}

export async function createOrderAction(params: CreateOrderParams) {
  try {
    const {
      userId,
      items,
      total,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      note,
    } = params;
    const code = `SIM-${Date.now().toString().slice(-8)}`;

    const created = await prisma.order.create({
      data: {
        code,
        total,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        note,
        status: "PROCESSING",
        userId: userId || null,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            nameVi: item.nameVi,
            nameEn: item.nameEn,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return {
      success: true,
      order: {
        id: created.id,
        code: created.code,
        createdAt: created.createdAt.toISOString(),
        status: "processing" as const,
        items: created.items.map((i) => ({
          productId: i.productId,
          nameVi: i.nameVi,
          nameEn: i.nameEn,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
        })),
        total: created.total,
      },
    };
  } catch (error) {
    console.error("Lỗi khi lưu đơn hàng Prisma:", error);
    return { success: false, error: "Tạo đơn hàng thất bại" };
  }
}
