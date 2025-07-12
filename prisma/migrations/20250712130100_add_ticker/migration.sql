-- CreateTable
CREATE TABLE "Ticker" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 10000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticker_pkey" PRIMARY KEY ("id")
);
