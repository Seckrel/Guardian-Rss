-- CreateTable
CREATE TABLE "Logger" (
    "id" SERIAL NOT NULL,
    "ts" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" VARCHAR(10) NOT NULL,
    "msg" TEXT NOT NULL,
    "meta" JSONB,

    CONSTRAINT "Logger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Logger_id_ts_idx" ON "Logger"("id", "ts");
