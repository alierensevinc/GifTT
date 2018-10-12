import { Injectable } from '@angular/core';

@Injectable()
export class GlobalSettingsProvider {

  private KEY = 'XB9CnmJQ1b66xZC8Bq72IVLzfHmpMhZq';
  private searchEndPoint = 'https://api.giphy.com/v1/gifs/search?api_key=XB9CnmJQ1b66xZC8Bq72IVLzfHmpMhZq&limit=25&offset=0&rating=G&lang=en&q=';
  private translateEndPoint = 'https://api.giphy.com/v1/gifs/translate?api_key=XB9CnmJQ1b66xZC8Bq72IVLzfHmpMhZq&s=';
  private trendingEndPoint = 'https://api.giphy.com/v1/gifs/trending?api_key=XB9CnmJQ1b66xZC8Bq72IVLzfHmpMhZq&limit=25&rating=G';
  private randomEndPoint = 'https://api.giphy.com/v1/gifs/random?api_key=XB9CnmJQ1b66xZC8Bq72IVLzfHmpMhZq&tag=&rating=G';

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
