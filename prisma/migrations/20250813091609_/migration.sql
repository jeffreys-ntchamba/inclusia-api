/*
  Warnings:

  - Added the required column `descriptChiffreAffaireMoyen` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptChiffreAffairesPrevisionnel` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptRentabilitePrevisionnel` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionBesoinDeCapital` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produit" ADD COLUMN     "descriptChiffreAffaireMoyen" TEXT NOT NULL,
ADD COLUMN     "descriptChiffreAffairesPrevisionnel" TEXT NOT NULL,
ADD COLUMN     "descriptRentabilitePrevisionnel" TEXT NOT NULL,
ADD COLUMN     "descriptionBesoinDeCapital" TEXT NOT NULL;
