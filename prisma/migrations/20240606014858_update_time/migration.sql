-- AlterTable
ALTER TABLE `Order` MODIFY `createdTime` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedTime` DATETIME(3) NULL;