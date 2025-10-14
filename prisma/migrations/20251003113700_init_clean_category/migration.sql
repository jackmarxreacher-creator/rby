/*
  Warnings:

  - The values [Beer,Wine,Spirits,Liqueur,Cocktail,SoftDrink,Juice,Mocktail,Water] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Category_new" AS ENUM ('STOUT', 'RTD', 'LAGERS', 'BITTERS', 'GIN', 'LIQUEUR', 'RUM', 'TEQUILA', 'VODKA', 'SINGLE_MALT_WHISKY', 'WHISKY');
ALTER TABLE "public"."Product" ALTER COLUMN "category" TYPE "public"."Category_new" USING ("category"::text::"public"."Category_new");
ALTER TYPE "public"."Category" RENAME TO "Category_old";
ALTER TYPE "public"."Category_new" RENAME TO "Category";
DROP TYPE "public"."Category_old";
COMMIT;
