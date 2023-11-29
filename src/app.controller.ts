import { Controller, Get } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('suggestions')
  getSuggestions(): string {
    return 'suggestions';
  }

  @Get('explanations')
  getExplanations(): Promise<any> {
    return firstValueFrom(this.appService.getExplanations('apple'));
  }
}
