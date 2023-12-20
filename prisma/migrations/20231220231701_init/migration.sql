-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "public_address" VARCHAR(44) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_public_address_key" ON "users"("public_address");
