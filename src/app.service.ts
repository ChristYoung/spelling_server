import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { WORDS_COMPLEX_EXPLANATION } from './constant';

export interface WordItem {
  phonetic: string;
  explanations: string;
  example: string;
  example_zh: string;
}

export interface KeyValueOption {
  id: string;
  name: string;
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly http: HttpService) {}

  getExplanations(word: string): Observable<WordItem> {
    return this.http.get(`${WORDS_COMPLEX_EXPLANATION}${word}`).pipe(
      tap((data) => this.logger.log('data from YouDao:', data)),
      map((data) => {
        const response = data.data;
        const ecDicWord = response['ec']['word'][0];
        const blngDicWord = response['blng_sents_part'];
        const phonetic = ecDicWord['usphone'];
        const explanations = ecDicWord['trs'][0]['tr'][0]['l']['i'];
        const example = blngDicWord
          ? blngDicWord['sentence-pair'][0]['sentence']
          : null;
        const example_zh = blngDicWord
          ? blngDicWord['sentence-pair'][0]['sentence-translation']
          : null;
        return { phonetic, explanations, example, example_zh, word };
      }),
    );
  }

  getUUID(len: number) {
    if (len === 0) return '0';
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#^><@$&_!¥';
    let result = '';
    for (let i = len; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }
}
