import { Prisma } from "@prisma/client";

export const userDateSelect = {
  id: true,
  username: true,
  displayName: true,
  avartarUrl: true,
} satisfies Prisma.UserSelect;
export const postDataInclude = {
  user: {
    select: userDateSelect,
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
