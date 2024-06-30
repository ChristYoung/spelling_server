import { Controller, Get, Param } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AppService, KeyValueOption } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('suggestions')
  getSuggestions(): Promise<KeyValueOption[]> {
    return firstValueFrom(this.appService.getSuggestions(10, 6));
  }

  @Get('explanations/:word')
  getExplanations(@Param('word') word: string): Promise<any> {
    return firstValueFrom(this.appService.getExplanations(word));
  }
}
