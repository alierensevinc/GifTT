import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Injectable()
export class StorageServiceProvider {

  constructor(public http: HttpClient, public storage: Storage,
    public alertCtrl: AlertController) {
  }

  getFavorites() {
    return this.storage.get('favorites').then((data: any) => {
      return JSON.parse(data);
    });
  }

  isInFavorites(gifData) {
    let isInside: boolean = false;
    return this.storage.get('favorites').then((data: any) => {
      data = JSON.parse(data);
      if (data == null) {
        return false;
      } else {
        for (let gif of data) {
          if (gif.id == gifData.id) {
            isInside = true;
          }
        }
        return isInside;
      }
    });
  }

  saveFavorite(gifData) {
    this.storage.get('favorites').then((data: any) => {
      data = JSON.parse(data);
      if (data == null) {
        data = [];
        data.push(gifData);
        this.storage.set('favorites', JSON.stringify(data));
      } else {
        data.push(gifData);
        this.storage.set('favorites', JSON.stringify(data));
      }
    });
  }

  deleteFavorite(gifData) {
    return this.storage.get('favorites').then((data: any) => {
      data = JSON.parse(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].id == gifData.id) {
          data.splice(i, 1);
          this.storage.set('favorites', JSON.stringify(data));
        }
      }
    });
  }


}
