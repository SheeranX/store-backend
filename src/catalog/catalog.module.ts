import { Module } from "@nestjs/common";
import { CatalogController, SubCatalogController } from "./catalog.controller";
import { CatalogService, SubCatalogService } from "./catalog.service";

@Module({
  controllers: [CatalogController, SubCatalogController],
  providers: [CatalogService, SubCatalogService],
  exports: [CatalogService, SubCatalogService]
})

export class CatalogModule {}