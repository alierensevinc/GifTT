import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { GiphyServiceProvider } from './../../providers/giphy-service/giphy-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  searchWord: String;
  loading: any;
  searchResults: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public giphyService: GiphyServiceProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public socialSharing: SocialSharing,
    public storageService: StorageServiceProvider, public actionSheetCtrl: ActionSheetController) {
    this.searchWord = navParams.get('searchWord');

    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Some magic happens.'
    });
    this.loading.present();

    this.giphyService.searchGif(this.searchWord).then((data: any) => {
      this.searchResults = data.data;
      if (this.searchResults.length != 0) {
        this.loading.dismiss();
      } else {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: `We cannot find a result about '${this.searchWord}' \nWe are sorry\nHere is a random gif for you`,
          buttons: ['Let\'s Try Something Else']
        });
        alert.present();
        this.giphyService.getRandomGif().then((data: any) => {
          this.searchResults.push(data.data);
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

/*
    // this.socialSharing.share(("Here is a Gif for you from GifTT : " + gif.title + "\n" + encodeURI(gif.images.original.url)), "GifTT Gif").then((res) => {
    //   console.log(res);
    // }).catch((err) => {
    //   console.log(err);
    // });
    this.socialSharing.shareViaWhatsApp(encodeURI(gif.images.original.url), encodeURI(gif.images.original.url), encodeURI(gif.images.original.url));
*/