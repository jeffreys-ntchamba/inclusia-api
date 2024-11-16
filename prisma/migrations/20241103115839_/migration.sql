/*
  Warnings:

  - You are about to drop the column `description` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Commande` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Produit` table. All the data in the column will be lost.
  - You are about to drop the column `quantite` on the `Produit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produitId]` on the table `Commande` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Commande` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `Fournisseur` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Commande` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Fournisseur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statut` to the `Fournisseur` table without a default value. This is not possible if the table is not empty.
  - Added the required column `besoinDeCapital` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chiffreAffaireMoyen` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chiffreAffairesPrevisionnel` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coursUnePart` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notationGprIndex` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partDisponible` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `siege` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tauxRentabilitePrevisionnel` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statut` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Commande" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Fournisseur" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "statut" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "description",
DROP COLUMN "quantite",
ADD COLUMN     "besoinDeCapital" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "chiffreAffaireMoyen" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "chiffreAffairesPrevisionnel" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "coursUnePart" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "notationGprIndex" TEXT NOT NULL,
ADD COLUMN     "partDisponible" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "siege" TEXT NOT NULL,
ADD COLUMN     "tauxRentabilitePrevisionnel" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "statut" BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Commande_produitId_key" ON "Commande"("produitId");

-- CreateIndex
CREATE UNIQUE INDEX "Commande_userId_key" ON "Commande"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Fournisseur_phone_key" ON "Fournisseur"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
