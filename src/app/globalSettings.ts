import {Injectable} from '@angular/core';

@Injectable()
export class GlobalSettingsProvider {

  private KEY; // Add your app key
  private searchEndPoint = 'https://api.giphy.com/v1/gifs/search?api_key=' + this.KEY + '&limit=25&offset=0&rating=G&lang=en&q=';
  private translateEndPoint = 'https://api.giphy.com/v1/gifs/translate?api_key=' + this.KEY + '&s=';
  private trendingEndPoint = 'https://api.giphy.com/v1/gifs/trending?api_key=' + this.KEY + '&limit=25&rating=G';
  private randomEndPoint = 'https://api.giphy.com/v1/gifs/random?api_key=' + this.KEY + '&tag=&rating=G';

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
