/*
  Warnings:

  - Added the required column `excerpt` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."BlogPost" ADD COLUMN     "excerpt" TEXT NOT NULL;
