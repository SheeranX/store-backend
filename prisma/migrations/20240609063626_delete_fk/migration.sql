-- DropForeignKey
ALTER TABLE `CartItem` DROP FOREIGN KEY `CartItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_catalogId_fkey`;

-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_subCatalogId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductSku` DROP FOREIGN KEY `ProductSku_productId_fkey`;

-- DropForeignKey
ALTER TABLE `SubCatalog` DROP FOREIGN KEY `SubCatalog_catalogId_fkey`;
