-- AlterTable
ALTER TABLE "public"."market_submissions" ADD COLUMN     "commodityId" TEXT;

-- AlterTable
ALTER TABLE "public"."market_updates" ADD COLUMN     "commodityId" TEXT;

-- CreateTable
CREATE TABLE "public"."commodity_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commodity_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."commodities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "description" TEXT,
    "aliases" TEXT[],
    "units" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commodities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commodity_categories_name_key" ON "public"."commodity_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "commodities_name_categoryId_key" ON "public"."commodities"("name", "categoryId");

-- AddForeignKey
ALTER TABLE "public"."market_updates" ADD CONSTRAINT "market_updates_commodityId_fkey" FOREIGN KEY ("commodityId") REFERENCES "public"."commodities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."market_submissions" ADD CONSTRAINT "market_submissions_commodityId_fkey" FOREIGN KEY ("commodityId") REFERENCES "public"."commodities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."commodities" ADD CONSTRAINT "commodities_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."commodity_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
