import { Module, forwardRef } from '@nestjs/common'
import { FileService } from './file.service'
import { FileController } from './file.controller'
import { ProductModule } from 'src/product/product.module'

@Module({
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
  imports: [forwardRef(() => ProductModule)]
})
export class FileModule {}
