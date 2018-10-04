import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { GlobalSettingsProvider } from './../../app/globalSettings';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the GiphyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GiphyServiceProvider {

  constructor(public http: HttpClient, public globalSettings: GlobalSettingsProvider) {
    console.log('Hello GiphyServiceProvider Provider');
  }

  searchGif(searchWord) {
    return new Promise(resolve => {
      this.http.get(this.globalSettings.getSearchEndPoint(searchWord))
      .subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
      }); 
    });
  }

  translateGif(translateWord) {

  }

  getTrendingGifs() {

  }

  getRandomGif() {

  }

}
