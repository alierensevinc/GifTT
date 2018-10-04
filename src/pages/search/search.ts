import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { GiphyServiceProvider } from './../../providers/giphy-service/giphy-service';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    this.searchWord = navParams.get('searchWord');

    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Some magic happens.',
    });
    this.loading.present();

    this.giphyService.searchGif(this.searchWord).then((data: any) => {
      this.searchResults = data.data;
      if (this.searchResults.length != 0) {
        console.log(this.searchResults);
        this.searchResults = data.data;
        this.loading.dismiss();
      } else {
        this.loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Oops',
          subTitle: `We cannot find a result about '${this.searchWord}' \nWe are sorry`,
          buttons: ['Let\'s Try Something Else']
        });
        alert.present();
        // random gif çağır
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  showImageActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Save Image',
      buttons: [
        {
          text: 'Save',
          role: 'save',
          handler: () => {
            console.log('Save clicked');
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
