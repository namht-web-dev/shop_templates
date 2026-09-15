import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  type StateStorage,
} from "zustand/middleware";
import type { User, Order, Product, StoredCartItem } from "@/types";
import { createOrderAction } from "@/actions/order.action";

/* ---------------------------------- Cart ---------------------------------- */

/** Builds the persisted cart snapshot from a product, so cart UI never re-fetches. */
export function cartItemFromProduct(
  product: Product,
  quantity = 1,
): StoredCartItem {
  return {
    productId: product.id,
    quantity,
    slug: product.slug,
    nameVi: product.name.vi,
    nameEn: product.name.en,
    image: product.image,
    price: product.price,
    salePrice: product.salePrice,
    stock: product.stock,
  };
}

export function storedItemUnitPrice(item: StoredCartItem): number {
  return item.salePrice ?? item.price;
}

interface CartState {
  items: StoredCartItem[];
  addItem: (item: StoredCartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? {
                      ...i,
                      quantity: Math.min(
                        i.quantity + item.quantity,
                        i.stock || 99,
                      ),
                    }
                  : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.productId === productId
                ? {
                    ...i,
                    quantity: Math.max(1, Math.min(quantity, i.stock || 99)),
                  }
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "smartiot-cart", storage: createJSONStorage(() => localStorage) },
  ),
);

export const selectCartCount = (state: CartState): number =>
  state.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartSubtotal = (state: CartState): number =>
  state.items.reduce(
    (sum, item) => sum + storedItemUnitPrice(item) * item.quantity,
    0,
  );

/* ----------------------------------- Auth ---------------------------------- */

const SESSION_FLAG_KEY = "smartiot-auth-session-scope";

function markAuthScope(remember: boolean): void {
  try {
    if (remember) {
      sessionStorage.removeItem(SESSION_FLAG_KEY);
    } else {
      sessionStorage.setItem(SESSION_FLAG_KEY, "1");
    }
  } catch {
    /* storage unavailable — fall back to localStorage-only behavior */
  }
}

function activeAuthBacking(): Storage {
  try {
    return sessionStorage.getItem(SESSION_FLAG_KEY) === "1"
      ? sessionStorage
      : localStorage;
  } catch {
    return localStorage;
  }
}

const authStorage: StateStorage = {
  getItem: (name) => {
    try {
      return activeAuthBacking().getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      const backing = activeAuthBacking();
      backing.setItem(name, value);
      if (backing === sessionStorage) {
        localStorage.removeItem(name);
      } else {
        sessionStorage.removeItem(name);
      }
    } catch {
      /* ignore */
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
      sessionStorage.removeItem(name);
    } catch {
      /* ignore */
    }
  },
};

function deriveNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const cleaned = local.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return "Google User";
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export interface PasswordLoginInput {
  email: string;
  password: string;
  remember: boolean;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  purchasedCourses: string[];
  login: (name: string, email: string) => User;
  loginWithPassword: (input: PasswordLoginInput) => User;
  register: (input: RegisterInput) => User;
  loginWithProvider: (provider: "google") => User;
  updateProfile: (name: string) => void;
  logout: () => void;
  purchaseCourse: (courseSlug: string) => void;
  ownsCourse: (courseSlug: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      purchasedCourses: [],
      login: (name, email) => {
        markAuthScope(true);
        const user: User = {
          id: "user-001",
          name: name.trim() || "Nguyen Van A",
          email: email.trim(),
          avatar: null,
          role: "user",
          provider: "password",
        };
        set({ user });
        return user;
      },
      loginWithPassword: ({ email, remember }) => {
        markAuthScope(remember);
        const user: User = {
          id: "user-001",
          name: deriveNameFromEmail(email),
          email: email.trim(),
          avatar: null,
          role: "user",
          provider: "password",
        };
        set({ user });
        return user;
      },
      register: ({ name, email }) => {
        markAuthScope(true);
        const user: User = {
          id: `user-${Date.now().toString(36)}`,
          name: name.trim() || deriveNameFromEmail(email),
          email: email.trim(),
          avatar: null,
          role: "user",
          provider: "password",
        };
        set({ user });
        return user;
      },
      loginWithProvider: (provider) => {
        markAuthScope(true);
        const user: User = {
          id: "user-google-001",
          name: "Nguyen Van A",
          email: "nguyen.van.a@gmail.com",
          avatar: null,
          role: "user",
          provider,
        };
        set({ user });
        return user;
      },
      updateProfile: (name) =>
        set((state) =>
          state.user
            ? { user: { ...state.user, name: name.trim() || state.user.name } }
            : state,
        ),
      logout: () => set({ user: null, purchasedCourses: [] }),
      purchaseCourse: (courseSlug) =>
        set((state) => ({
          purchasedCourses: Array.from(
            new Set([...state.purchasedCourses, courseSlug]),
          ),
        })),
      ownsCourse: (courseSlug) => get().purchasedCourses.includes(courseSlug),
    }),
    { name: "smartiot-auth", storage: createJSONStorage(() => authStorage) },
  ),
);

/* ---------------------------------- Orders --------------------------------- */

interface OrdersState {
  orders: Order[];
  placeOrder: (
    items: Order["items"],
    total: number,
    customer: {
      name: string;
      email: string;
      phone: string;
      shippingAddress: string;
      note?: string;
    },
  ) => Promise<Order>;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      orders: [],
      placeOrder: async (items, total, customer) => {
        // Lưu đồng thời xuống cơ sở dữ liệu Prisma
        const res = await createOrderAction({
          items,
          total,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          shippingAddress: customer.shippingAddress,
          note: customer.note,
        });

        const order: Order =
          res.success && res.order
            ? (res.order as Order)
            : {
                id: `SIM-${Date.now().toString().slice(-8)}`,
                createdAt: new Date().toISOString(),
                status: "processing",
                items,
                total,
              };

        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
    }),
    { name: "smartiot-orders", storage: createJSONStorage(() => localStorage) },
  ),
);
