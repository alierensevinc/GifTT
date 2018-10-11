import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageServiceProvider {

  public gifArray: any[] = [];

  constructor(public http: HttpClient, public storage: Storage) {
  }

  getFavorites() {
    return this.storage.get('favorites');
  }

  saveFavorites(gifData) {
    this.storage.get('favorites').then((favoritesData) => {
      this.gifArray = favoritesData;
      this.gifArray.push(gifData);
      return this.storage.set('favorites', this.gifArray);
    });
  }

  deleteFavorite(gifData) {

    // Gif'i Id'den bul sil tekrar kaydet

    return this.getFavorites();
  }


}
