import { Module, Global } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { RequestService } from "./http.service";

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 3000,
      maxRedirects: 5
    })
  ],
  providers: [RequestService],
  exports: [RequestService]
})
export class RequestModule {}