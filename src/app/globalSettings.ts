import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalSettingsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GlobalSettingsProvider Provider');
  }

  private KEY = 'XB9CnmJQ1b66xZC8Bq72IVLzfHmpMhZq';
  private searchEndPoint = 'https://api.giphy.com/v1/gifs/search?api_key=1H0RZQJSjZ77Nn0EfgMhE4ZHuLbWsZTa&limit=25&offset=0&rating=G&lang=en&q=';
  private translateEndPoint = 'https://api.giphy.com/v1/gifs/translate?api_key=XB9CnmJQ1b66xZC8Bq72IVLzfHmpMhZq&s=';
  private trendingEndPoint = 'https://api.giphy.com/v1/gifs/trending?api_key=XB9CnmJQ1b66xZC8Bq72IVLzfHmpMhZq&limit=25&rating=G';
  private randomEndPoint = 'https://api.giphy.com/v1/gifs/random?api_key=XB9CnmJQ1b66xZC8Bq72IVLzfHmpMhZq&tag=&rating=G';

  //deneme 
  
  getKey() {
    return this.KEY;
  }

  getSearchEndPoint(searchWord) {
    return this.searchEndPoint + searchWord;
  }

  getTranslateEndPoint(translateWord) {
    return this.translateEndPoint + translateWord;
  }

  getTrendingEndPoint() {
    return this.trendingEndPoint;
  }

  getRandomEndPoint() {
    return this.randomEndPoint;
  }

}
