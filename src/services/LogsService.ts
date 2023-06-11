import { PrismaClient } from "@prisma/client";

export const getLogs = async (
  level: string,
  orderBy: string,
  order: string
) => {
  const prisma = new PrismaClient();
  let logQuery;
  try {
    if (level !== "") {
      logQuery = await prisma.logs.findMany({
        where: {
          level: level,
        },
        orderBy: {
          [orderBy]: order,
        },
      });
    } else {
      logQuery = await prisma.logs.findMany({
        orderBy: {
          [orderBy]: order,
        },
      });
    }

    return logQuery;
  } catch (err) {
    throw Error("Logs Not Found");
  }
};
