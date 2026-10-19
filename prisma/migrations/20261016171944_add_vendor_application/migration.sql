-- CreateEnum
CREATE TYPE "VendorCategory" AS ENUM ('FASHION', 'ART', 'FOOD', 'TECH', 'MEDIA', 'CRAFT', 'OTHER');

-- CreateEnum
CREATE TYPE "VendorInterest" AS ENUM ('SELL', 'SERVICE', 'PRESENCE', 'UNSURE');

-- CreateTable
CREATE TABLE "VendorApplication" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "category" "VendorCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT,
    "interests" "VendorInterest"[],
    "eventYear" INTEGER NOT NULL DEFAULT 2026,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VendorApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventDayToVendorApplication" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventDayToVendorApplication_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "VendorApplication_email_eventYear_key" ON "VendorApplication"("email", "eventYear");

-- CreateIndex
CREATE INDEX "_EventDayToVendorApplication_B_index" ON "_EventDayToVendorApplication"("B");

-- AddForeignKey
ALTER TABLE "_EventDayToVendorApplication" ADD CONSTRAINT "_EventDayToVendorApplication_A_fkey" FOREIGN KEY ("A") REFERENCES "EventDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDayToVendorApplication" ADD CONSTRAINT "_EventDayToVendorApplication_B_fkey" FOREIGN KEY ("B") REFERENCES "VendorApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
