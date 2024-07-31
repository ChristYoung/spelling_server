import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('explanations/:word')
  getExplanations(@Param('word') word: string): Promise<any> {
    return firstValueFrom(this.appService.getExplanations(word));
  }

  @Post('export')
  async exportJson(@Body() data: any, @Res() res: Response) {
    const filePath = await this.appService.exportJsonToFile(data);
    res.download(filePath, 'data.json', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
      }
    });
  }
}
