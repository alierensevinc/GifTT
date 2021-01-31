import {Component} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import {SearchPage} from './../search/search';
import {GiphyServiceProvider} from '../../providers/giphy-service/giphy-service';
import {StorageServiceProvider} from '../../providers/storage-service/storage-service';
import {SocialSharing} from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {


  loading: any;
  backgroundUrl: String = '';
  searchWord: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public storageService: StorageServiceProvider, public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController, public socialSharing: SocialSharing,
              public alertCtrl: AlertController, public giphyService: GiphyServiceProvider) {

    this.ionViewDidEnter();
  }

  goSearchPage() {
    this.navCtrl.push(SearchPage, {searchWord: this.searchWord})
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

  showImageActionSheet(gif) {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Remove from favorites',
          icon: 'trash',
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
          icon: 'share',
          handler: () => {
            const shareActionSheet = this.actionSheetCtrl.create({
              buttons: [
                {
                  text: 'Via Twitter',
                  icon: 'logo-twitter',
                  handler: () => {
                    this.loading = this.loadingCtrl.create({
                      spinner: 'crescent',
                      content: 'Sharing'
                    });
                    this.loading.present();
                    this.socialSharing.shareViaTwitter('Here is a gif for you from GifTT : ' + gif.title + " link : ", gif.images.original.url, gif.images.original.url)
                      .then(() => {
                        this.loading.dismiss();
                      })
                      .catch((reason: any) => {
                        this.loading.dismiss();
                        let alert = this.alertCtrl.create({
                          title: 'Something went wrong',
                          subTitle: reason,
                          buttons: ['Great!']
                        });
                        alert.present();
                        console.log(reason);
                      });
                  }
                }, {
                  text: 'Via Facebook',
                  icon: 'logo-facebook',
                  handler: () => {
                    this.loading = this.loadingCtrl.create({
                      spinner: 'crescent',
                      content: 'Sharing'
                    });
                    this.loading.present();
                    this.socialSharing.shareViaFacebook('Here is a gif for you from GifTT : ' + gif.title + " link : ", gif.images.original.url, gif.images.original.url)
                      .then(() => {
                        this.loading.dismiss();
                      })
                      .catch((reason: any) => {
                        this.loading.dismiss();
                        let alert = this.alertCtrl.create({
                          title: 'Something went wrong',
                          subTitle: reason,
                          buttons: ['Great!']
                        });
                        alert.present();
                        console.log(reason);
                      });
                  }
                }, {
                  text: 'Via Whatsapp',
                  icon: 'logo-whatsapp',
                  handler: () => {
                    this.loading = this.loadingCtrl.create({
                      spinner: 'crescent',
                      content: 'Sharing'
                    });
                    this.loading.present();
                    this.socialSharing.shareViaWhatsApp('Here is a gif for you from GifTT : ' + gif.title + " link : ", gif.images.original.url, gif.images.original.url)
                      .then(() => {
                        this.loading.dismiss();
                      })
                      .catch((reason: any) => {
                        this.loading.dismiss();
                        let alert = this.alertCtrl.create({
                          title: 'Something went wrong',
                          subTitle: reason,
                          buttons: ['Great!']
                        });
                        alert.present();
                        console.log(reason);
                      });
                  }
                }, {
                  text: 'Cancel',
                  role: 'cancel'
                }
              ]
            });
            shareActionSheet.present();
          }
        },/* {
          text: 'Save',
          icon: 'download',
          handler: () => {
            this.loading = this.loadingCtrl.create({
              spinner: 'crescent',
              content: 'Downloading'
            })
            this.loading.present();
            this.fileTransfer.download(encodeURI(gif.images.original.url), this.file.externalRootDirectory + '/Download/' + gif.id + ".gif", true).then((entry) => {
              this.loading.dismiss();
              console.log(entry);
              let alert = this.alertCtrl.create({
                title: 'Yeah',
                subTitle: `Downloaded the gif`,
                buttons: ['Great']
              });
              alert.present();
            }, (error) => {
              this.loading.dismiss();
              console.log(error);
              let alert = this.alertCtrl.create({
                title: 'Oh no',
                subTitle: error.code,
                buttons: ['Ok :(']
              });
              alert.present();
            });
          }
        },*/ {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

}
