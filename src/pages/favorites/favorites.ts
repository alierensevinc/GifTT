import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController } from 'ionic-angular';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  loading: any;
  favoritesResults: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storageService: StorageServiceProvider, public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidEnter() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Some magic happens.'
    })
    this.loading.present();

    this.storageService.getFavorites().then((favoritesData) => {
      this.favoritesResults = favoritesData;
      this.loading.dismiss();
    })
  }

  showImageActionSheet(gif) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Remove from the Favorites',
          handler: () => {
            console.log('Added to favorites');
            this.storageService.saveFavorites(gif);
          }
        }, {
          text: 'Share',
          handler: () => {

          }
        }, {
          text: 'Save',
          handler: () => {

          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
