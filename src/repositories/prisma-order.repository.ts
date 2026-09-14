// src/repositories/prisma-order.repository.ts

import { prisma } from "@/db";
import type { Order } from "@/types";

export interface CreateOrderInput {
  userId?: string;
  items: {
    productId: string;
    nameVi: string;
    nameEn: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress?: string;
  note?: string;
}

export interface OrderRepository {
  createOrder(input: CreateOrderInput): Promise<Order>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | null>;
}

export class PrismaOrderRepository implements OrderRepository {
  async createOrder(input: CreateOrderInput): Promise<Order> {
    const {
      userId,
      items,
      total,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      note,
    } = input;

    // Mã đơn hàng định dạng SIM-XXXXXXXX
    const orderCode = `SIM-${Date.now().toString().slice(-8)}`;

    const created = await prisma.order.create({
      data: {
        code: orderCode,
        total,
        status: "PROCESSING",
        userId: userId || null,
        customerName,
        customerEmail,
        customerPhone,
        shippingAddress,
        note,
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
      id: created.id,
      code: created.code,
      createdAt: created.createdAt.toISOString(),
      status: created.status.toLowerCase() as "processing" | "completed",
      items: created.items.map((i) => ({
        productId: i.productId,
        nameVi: i.nameVi,
        nameEn: i.nameEn ?? "",
        image: i.image,
        price: i.price,
        quantity: i.quantity,
      })),
      total: created.total,
    };
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: "desc" },
    });

    return orders.map((o) => ({
      id: o.id,
      code: o.code,
      createdAt: o.createdAt.toISOString(),
      status: o.status.toLowerCase() as "processing" | "completed",
      items: o.items.map((i) => ({
        productId: i.productId,
        nameVi: i.nameVi,
        nameEn: i.nameEn ?? "",
        image: i.image,
        price: i.price,
        quantity: i.quantity,
      })),
      total: o.total,
    }));
  }

  async getOrderById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) return null;

    return {
      id: order.id,
      code: order.code,
      createdAt: order.createdAt.toISOString(),
      status: order.status.toLowerCase() as "processing" | "completed",
      items: order.items.map((i) => ({
        productId: i.productId,
        nameVi: i.nameVi,
        nameEn: i.nameEn ?? "",
        image: i.image,
        price: i.price,
        quantity: i.quantity,
      })),
      total: order.total,
    };
  }
}

export const orderRepository: OrderRepository = new PrismaOrderRepository();
