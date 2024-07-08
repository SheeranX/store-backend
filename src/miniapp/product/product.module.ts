import { Module, forwardRef } from "@nestjs/common";
import { MiniProductController } from "./product.controller";
import { CatalogModule } from "src/catalog/catalog.module";
import { FileModule } from "src/file/file.module";
import { MiniProductService } from "./product.service";

@Module({
  controllers: [MiniProductController],
  providers: [MiniProductService],
  imports: [CatalogModule, forwardRef(() => FileModule)],
  exports: [MiniProductService]
})

export class MiniProductModule {}