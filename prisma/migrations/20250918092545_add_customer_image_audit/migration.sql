-- AlterTable
ALTER TABLE "public"."Customer" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "image" TEXT DEFAULT '/images/user.jpg',
ADD COLUMN     "updatedById" TEXT;

-- CreateIndex
CREATE INDEX "Customer_createdById_idx" ON "public"."Customer"("createdById");

-- CreateIndex
CREATE INDEX "Customer_updatedById_idx" ON "public"."Customer"("updatedById");

-- AddForeignKey
ALTER TABLE "public"."Customer" ADD CONSTRAINT "Customer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer" ADD CONSTRAINT "Customer_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
