import { Module, forwardRef } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { CatalogModule } from "src/catalog/catalog.module";
import { FileModule } from "src/file/file.module";
import { ProductService } from "./product.service";

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [CatalogModule, forwardRef(() => FileModule)],
  exports: [ProductService]
})

export class ProductModule {}