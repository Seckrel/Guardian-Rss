/*
  Warnings:

  - You are about to drop the `Logger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Logger";

-- CreateTable
CREATE TABLE "logger" (
    "id" SERIAL NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" VARCHAR(10) NOT NULL,
    "msg" TEXT NOT NULL,
    "meta" JSONB,

    CONSTRAINT "logger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "logger_id_ts_idx" ON "logger"("id", "ts");
