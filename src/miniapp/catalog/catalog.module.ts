import { Module } from "@nestjs/common";
import { MiniSubCatalogController } from "./catalog.controller";
import { MiniSubCatalogService } from "./catalog.service";

@Module({
  controllers: [MiniSubCatalogController],
  providers: [MiniSubCatalogService]
})

export class MiniCatalogModule {}