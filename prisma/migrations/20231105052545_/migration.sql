-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantite" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "produitId" INTEGER NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
