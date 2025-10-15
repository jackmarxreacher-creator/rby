-- CreateEnum
CREATE TYPE "public"."StaffRole" AS ENUM ('ADMIN', 'EDITOR', 'MANAGER', 'STAFF');

-- CreateEnum
CREATE TYPE "public"."Department" AS ENUM ('Administration', 'Finance', 'HR', 'Sales', 'Warehouse');

-- CreateEnum
CREATE TYPE "public"."BusinessType" AS ENUM ('WHOLESALE', 'RETAIL');

-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('RECEIVED', 'CANCELED', 'PROCESSING', 'SHIPPED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('STOUT', 'RTD', 'LAGERS', 'BITTERS', 'GIN', 'LIQUEUR', 'RUM', 'TEQUILA', 'VODKA', 'SINGLE_MALT_WHISKY', 'WHISKY');

-- CreateEnum
CREATE TYPE "public"."UOM" AS ENUM ('CAS', 'BOTTLE');

-- CreateEnum
CREATE TYPE "public"."GalleryItemType" AS ENUM ('photo', 'video');

-- CreateEnum
CREATE TYPE "public"."BlogCategory" AS ENUM ('Distribution', 'Logistics', 'Partnerships', 'Innovation', 'Sustainability', 'News');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "phoneNumber" TEXT,
    "role" "public"."StaffRole",
    "department" "public"."Department",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessName" TEXT,
    "businessType" "public"."BusinessType" NOT NULL,
    "uom" "public"."UOM" NOT NULL DEFAULT 'BOTTLE',
    "casePack" INTEGER NOT NULL DEFAULT 0,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "location" TEXT,
    "address" TEXT,
    "image" TEXT DEFAULT '/images/user.jpg',
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Order" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "status" "public"."OrderStatus" NOT NULL DEFAULT 'RECEIVED',
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "createdById" TEXT,
    "editedById" TEXT,
    "processedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "size" TEXT NOT NULL,
    "uom" "public"."UOM" NOT NULL DEFAULT 'BOTTLE',
    "casePack" INTEGER NOT NULL DEFAULT 0,
    "wholesalePrice" INTEGER NOT NULL,
    "retailPrice" INTEGER NOT NULL,
    "description" TEXT,
    "discount" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "public"."Category" NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "idToken" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GalleryItem" (
    "id" TEXT NOT NULL,
    "type" "public"."GalleryItemType" NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,
    "deletedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subHeading" TEXT,
    "caption" TEXT,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "coverImage" TEXT,
    "content" JSONB NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "category" "public"."BlogCategory" NOT NULL DEFAULT 'News',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT,
    "updatedById" TEXT,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserActivityLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "public"."User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "public"."Customer"("email");

-- CreateIndex
CREATE INDEX "Customer_createdById_idx" ON "public"."Customer"("createdById");

-- CreateIndex
CREATE INDEX "Customer_updatedById_idx" ON "public"."Customer"("updatedById");

-- CreateIndex
CREATE INDEX "Order_createdById_idx" ON "public"."Order"("createdById");

-- CreateIndex
CREATE INDEX "Order_editedById_idx" ON "public"."Order"("editedById");

-- CreateIndex
CREATE INDEX "Order_processedById_idx" ON "public"."Order"("processedById");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "public"."Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_accountId_key" ON "public"."Account"("providerId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_identifier_value_key" ON "public"."Verification"("identifier", "value");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "public"."BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_slug_idx" ON "public"."BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_isPublished_idx" ON "public"."BlogPost"("isPublished");

-- CreateIndex
CREATE INDEX "UserActivityLog_userId_idx" ON "public"."UserActivityLog"("userId");

-- CreateIndex
CREATE INDEX "UserActivityLog_timestamp_idx" ON "public"."UserActivityLog"("timestamp");

-- AddForeignKey
ALTER TABLE "public"."Customer" ADD CONSTRAINT "Customer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Customer" ADD CONSTRAINT "Customer_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "public"."Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_editedById_fkey" FOREIGN KEY ("editedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_processedById_fkey" FOREIGN KEY ("processedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GalleryItem" ADD CONSTRAINT "GalleryItem_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GalleryItem" ADD CONSTRAINT "GalleryItem_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."GalleryItem" ADD CONSTRAINT "GalleryItem_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogPost" ADD CONSTRAINT "BlogPost_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BlogPost" ADD CONSTRAINT "BlogPost_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserActivityLog" ADD CONSTRAINT "UserActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
