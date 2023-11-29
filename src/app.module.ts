import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { BASE_WORD_API } from './constant';

@Module({
  imports: [
    HttpModule.register({
      baseURL: BASE_WORD_API,
      timeout: 5000,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
