import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';
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
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {

    this.storageService.getFavorites().then((data: any) => {
      if (data == null) {
        this.favoritesResults = [];
      } else {
        this.favoritesResults = data;
      }
    })

  }

  ionViewDidEnter() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Some magic happens...'
    })
    this.loading.present();

    this.storageService.getFavorites().then((data: any) => {
      if (data == null) {
        this.favoritesResults = [];
      } else {
        this.favoritesResults = data;
      }
    })

    this.loading.dismiss();
  }

  showImageActionSheet(gif) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete from favorites',
          handler: () => {
            this.storageService.deleteFavorite(gif);
            let alert = this.alertCtrl.create({
              title: 'Exterminated',
              subTitle: `It's gone`,
              buttons: [
                {
                  text: 'Ok',
                  handler: () => {
                    this.ionViewDidEnter();
                  }
                }
              ]
            });
            alert.present();

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
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

}
