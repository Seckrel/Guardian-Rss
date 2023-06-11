/*
  Warnings:

  - You are about to drop the `logger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "logger";

-- CreateTable
CREATE TABLE "logs" (
    "id" SERIAL NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" VARCHAR(10) NOT NULL,
    "message" TEXT NOT NULL,
    "meta" JSONB,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "logs_id_ts_idx" ON "logs"("id", "ts");
