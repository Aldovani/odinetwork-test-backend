/*
  Warnings:

  - The primary key for the `assets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "assets" DROP CONSTRAINT "assets_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "IMEI" DROP NOT NULL,
ADD CONSTRAINT "assets_pkey" PRIMARY KEY ("id");
