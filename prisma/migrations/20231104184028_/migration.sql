/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone";

-- CreateTable
CREATE TABLE "Fournisseur" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Fournisseur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fournisseurId" INTEGER NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_email_key" ON "Fournisseur"("email");

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
