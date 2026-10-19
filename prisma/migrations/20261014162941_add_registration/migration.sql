-- CreateEnum
CREATE TYPE "RegistrationSource" AS ENUM ('INSTAGRAM', 'X', 'WHATSAPP', 'FRIEND', 'SYNCHUB', 'OTHER');

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "heardFrom" "RegistrationSource" NOT NULL,
    "accessibilityNeeds" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventDayToRegistration" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_EventDayToRegistration_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_email_key" ON "Registration"("email");

-- CreateIndex
CREATE INDEX "_EventDayToRegistration_B_index" ON "_EventDayToRegistration"("B");

-- AddForeignKey
ALTER TABLE "_EventDayToRegistration" ADD CONSTRAINT "_EventDayToRegistration_A_fkey" FOREIGN KEY ("A") REFERENCES "EventDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventDayToRegistration" ADD CONSTRAINT "_EventDayToRegistration_B_fkey" FOREIGN KEY ("B") REFERENCES "Registration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
