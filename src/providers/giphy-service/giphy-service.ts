import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { GlobalSettingsProvider } from './../../app/globalSettings';

@Injectable()
export class GiphyServiceProvider {

  constructor(public http: HttpClient, public globalSettings: GlobalSettingsProvider) {

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
    return new Promise(resolve => {
      this.http.get(this.globalSettings.getTranslateEndPoint(translateWord))
        .subscribe(data => {
          resolve(data);
        }), error => {
          console.log(error);
        };
    })
  }

  getTrendingGifs() {
    return new Promise(resolve => {
      this.http.get(this.globalSettings.getTrendingEndPoint())
        .subscribe(data => {
          resolve(data);
        }, error => {
          console.log(error);
        })
    });
  }

  getRandomGif() {
    return new Promise(resolve => {
      this.http.get(this.globalSettings.getRandomEndPoint())
        .subscribe(data => {
          resolve(data);
        }, error => {
          console.log(error);
        })
    })
  }

}
