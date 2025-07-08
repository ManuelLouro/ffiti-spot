-- CreateTable
CREATE TABLE "GraffitiPin" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT DEFAULT 'Unknown',
    "description" TEXT,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GraffitiPin_pkey" PRIMARY KEY ("id")
);
