import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { WORDS_COMPLEX_EXPLANATION } from './constant';

export interface WordItem {
  phonetic: string;
  explanations: string;
  example: string;
  example_zh: string;
}

@Injectable()
export class AppService {
  constructor(private readonly http: HttpService) {}

  getExplanations(word: string): Observable<WordItem> {
    return this.http.get(`${WORDS_COMPLEX_EXPLANATION}${word}`).pipe(
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
        return { phonetic, explanations, example, example_zh };
      }),
    );
  }
}
