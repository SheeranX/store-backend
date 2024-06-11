/*
  Warnings:

  - You are about to drop the column `productIds` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productSkuIds` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `productIds`,
    ADD COLUMN `productSkuIds` VARCHAR(191) NOT NULL;
