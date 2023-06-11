import Transport, { TransportStreamOptions } from "winston-transport";
import type { LogEntry } from "winston";
import { PrismaClient, Prisma } from "@prisma/client";

interface PostgresTransportOptions extends TransportStreamOptions {
  tableName?: any;
}

class PostgresTransport extends Transport {
  private readonly prisma: PrismaClient;
  private readonly tableName: Prisma.ModelName;

  constructor(options: PostgresTransportOptions) {
    const { tableName, ...transportOpts } = options;
    super(transportOpts);

    // Create an instance of Prisma Client
    this.prisma = new PrismaClient();

    // Define the table name where logs will be stored
    this.tableName = tableName || "logs";
  }

  log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    // Retrieve the log information
    const { level, message, timestamp, ...meta } = info;

    // Insert the log into the PostgreSQL table using Prisma Client
    this.prisma[this.tableName]
      .create({
        data: {
          level: level,
          message: message,
          ts: timestamp,
          meta: JSON.stringify(meta),
        },
      })
      .then(() => {
        callback();
      })
      .catch((error: any) => {
        this.emit("error", error);
      });
    // callback();
  }
}

export default PostgresTransport;
