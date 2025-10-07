-- CreateTable
CREATE TABLE "maintenances" (
    "id" SERIAL NOT NULL,
    "problem_description" TEXT NOT NULL,
    "entry_date" TIMESTAMP(3) NOT NULL,
    "completion_date" TIMESTAMP(3),
    "asset_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "maintenances_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "maintenances" ADD CONSTRAINT "maintenances_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
