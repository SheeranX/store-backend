import { Injectable, forwardRef, Inject } from '@nestjs/common'
import { UpdateFileDto } from './dto/update-file.dto'
import { unlinkSync } from 'node:fs'
import { ProductService } from 'src/product/product.service'
const URL = process.env.NODE_ENV === 'dev' ? './public/upload/' : '../public/upload/'
@Injectable()
export class FileService {
  constructor (@Inject(forwardRef(() => ProductService)) private productService: ProductService) {}
  findAll() {
    return `This action returns all file`
  }

  findOne(id: number) {
    return `This action returns a #${id} file`
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return updateFileDto
  }

  async remove(name: string) {
    const res = await this.productService.findByUrl(name)
    if (res.length) {
      return 'Cannot remove the file, because the File already exist in records'
    }
    unlinkSync(`${URL}/${name}`)
    return `This action removes a #${name} file`
  }

  removeMany(files: string) {
    const arr = files.split(',')
    arr.forEach(url => {
      url = url.replace(/^\/upload\//, '')
      this.remove(url)
    })
    return `Files ${files} removed`
  }
}
