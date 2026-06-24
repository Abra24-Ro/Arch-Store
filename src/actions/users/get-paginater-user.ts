"use server";

import { requireAdmin } from "@/src/lib/auth-guards";
import { prisma } from "@/src/lib/prisma";

type UserRoleFilter = "admin" | "user";

interface GetPaginatedUsersOptions {
  page?: number;
  take?: number;
  role?: UserRoleFilter;
}

export const getPaginatedUsers = async ({
  page = 1,
  take = 5,
  role,
}: GetPaginatedUsersOptions = {}) => {
  const admin = await requireAdmin();

  if (!admin.ok) return { status: admin.status };
  
  const safePage = Math.max(1, page);
  const safeTake = Math.min(Math.max(1, take), 50);
  const skip = (safePage - 1) * safeTake;

  const where = role ? { role } : {};

  try {
    const [users, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: safeTake,
        orderBy: { name: "asc" },
      }),
      prisma.user.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalCount / safeTake));

    return {
      status: "success",
      users,
      totalCount,
      totalPages,
      currentPage: safePage,
    };
  } catch (error) {
    return {
      status: "Error",
      message: error instanceof Error ? error.message : "Error inesperado",
    };
  }
};
