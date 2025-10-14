-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "casePack" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "uom" "public"."UOM" NOT NULL DEFAULT 'BOTTLE';
