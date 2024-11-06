-- DropForeignKey
ALTER TABLE "Produit" DROP CONSTRAINT "Produit_fournisseurId_fkey";

-- AlterTable
ALTER TABLE "Produit" ALTER COLUMN "fournisseurId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_fournisseurId_fkey" FOREIGN KEY ("fournisseurId") REFERENCES "Fournisseur"("id") ON DELETE SET NULL ON UPDATE CASCADE;
