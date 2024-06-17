import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { CatalogModule } from "src/catalog/catalog.module";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [CatalogModule]
})

export class ProductModule {}