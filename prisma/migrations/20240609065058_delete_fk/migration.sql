/*
  Warnings:

  - You are about to drop the column `productId` on the `ProductSku` table. All the data in the column will be lost.
  - You are about to drop the column `skuId` on the `ProductSku` table. All the data in the column will be lost.
  - Added the required column `productIds` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skuIds` to the `ProductSku` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ProductSku` DROP FOREIGN KEY `ProductSku_skuId_fkey`;

-- DropIndex
DROP INDEX `OrderItem_productId_fkey` ON `OrderItem`;

-- DropIndex
DROP INDEX `Product_catalogId_fkey` ON `Product`;

-- DropIndex
DROP INDEX `Product_subCatalogId_fkey` ON `Product`;

-- DropIndex
DROP INDEX `ProductSku_productId_fkey` ON `ProductSku`;

-- DropIndex
DROP INDEX `SubCatalog_catalogId_fkey` ON `SubCatalog`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `productIds` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ProductSku` DROP COLUMN `productId`,
    DROP COLUMN `skuId`,
    ADD COLUMN `skuIds` VARCHAR(191) NOT NULL;
