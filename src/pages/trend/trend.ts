import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { GiphyServiceProvider } from '../../providers/giphy-service/giphy-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

@IonicPage()
@Component({
  selector: 'page-trend',
  templateUrl: 'trend.html',
})
export class TrendPage {

  loading: any;
  trendResults: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public giphyService: GiphyServiceProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,
    public storageService: StorageServiceProvider) {

  }

  ionViewDidEnter() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Some magic happens.'
    })
    this.loading.present();

    this.giphyService.getTrendingGifs().then((data: any) => {
      this.trendResults = data.data;
      if (this.trendResults.length != 0) {
        this.loading.dismiss();
      } else {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: `We cannot reach the trending gifs.\nWe are sorry.\nHere is a random gif for you`,
          buttons: ['Let\'s Try Something Else']
        });
        alert.present();
        this.giphyService.getRandomGif().then((data: any) => {
          this.trendResults.push(data.data);
        })
      }
    });
  }

  showImageActionSheet(gif) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Add to the Favorites',
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
