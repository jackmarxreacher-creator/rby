-- CreateTable
CREATE TABLE "public"."BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subHeading" TEXT,
    "caption" TEXT,
    "slug" TEXT NOT NULL,
    "coverImage" TEXT,
    "content" JSONB NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "public"."BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_slug_idx" ON "public"."BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_isPublished_idx" ON "public"."BlogPost"("isPublished");

-- CreateIndex
CREATE INDEX "Order_createdById_idx" ON "public"."Order"("createdById");

-- CreateIndex
CREATE INDEX "Order_editedById_idx" ON "public"."Order"("editedById");

-- CreateIndex
CREATE INDEX "Order_processedById_idx" ON "public"."Order"("processedById");
