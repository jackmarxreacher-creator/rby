-- CreateEnum
CREATE TYPE "public"."UOM" AS ENUM ('CAS', 'BOTTLE');

-- AlterTable
ALTER TABLE "public"."Customer" ADD COLUMN     "casePack" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "uom" "public"."UOM" NOT NULL DEFAULT 'BOTTLE';
