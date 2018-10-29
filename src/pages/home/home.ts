import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SearchPage } from './../search/search';
import { GiphyServiceProvider } from '../../providers/giphy-service/giphy-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  backgroundUrl: String = '';
  searchWord: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, public giphyService: GiphyServiceProvider) {
    
      this.ionViewDidEnter();
  }

  goSearchPage() {
    this.navCtrl.push(SearchPage, { searchWord: this.searchWord })
  }

  ionViewDidEnter() {
    this.giphyService.getRandomGif().then((data: any) => {
      this.backgroundUrl = data.data.images.original.url;
      console.log(this.backgroundUrl);
    }).catch((reason: any) => {
      let alert = this.alertCtrl.create({
        title: 'Something went wrong',
        subTitle: reason,
        buttons: ['Great!']
      });
      alert.present();
      console.log(reason);
    });
  }


}
