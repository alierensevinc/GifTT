import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
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
    public alertCtrl: AlertController, public socialSharing: SocialSharing,
    public storageService: StorageServiceProvider, public actionSheetCtrl: ActionSheetController) {

  }

  ionViewDidEnter() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Some magic happens...'
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
          text: 'Add to Favorites',
          handler: () => {
            this.storageService.isInFavorites(gif).then((data: any) => {
              if (data == true) {
                let alert = this.alertCtrl.create({
                  title: 'Oh no',
                  subTitle: `But this gif is already in your favorites`,
                  buttons: ['Ok then']
                });
                alert.present();
              } else {
                this.storageService.saveFavorite(gif);
                let alert = this.alertCtrl.create({
                  title: 'Yeah',
                  subTitle: `Added to favorites`,
                  buttons: ['Great']
                });
                alert.present();
              }
            });
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

          }
        }
      ]
    });
    actionSheet.present();
  }

}
