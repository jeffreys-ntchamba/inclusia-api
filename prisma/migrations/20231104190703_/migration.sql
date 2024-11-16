/*
  Warnings:

  - Added the required column `statut` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Produit" ADD COLUMN     "statut" BOOLEAN NOT NULL;
