-- CreateEnum
CREATE TYPE "public"."BlogCategory" AS ENUM ('Distribution', 'Logistics', 'Partnerships', 'Innovation', 'Sustainability', 'News');

-- AlterTable
ALTER TABLE "public"."BlogPost" ADD COLUMN     "category" "public"."BlogCategory" NOT NULL DEFAULT 'News';
