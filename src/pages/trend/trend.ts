import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { GiphyServiceProvider } from '../../providers/giphy-service/giphy-service';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-trend',
  templateUrl: 'trend.html',
})
export class TrendPage {

  loading: any;
  trendResults: any;
  fileTransfer: FileTransferObject;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public giphyService: GiphyServiceProvider, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public socialSharing: SocialSharing,
    public storageService: StorageServiceProvider, public actionSheetCtrl: ActionSheetController,
    private transfer: FileTransfer, private file: File) {

    this.fileTransfer = this.transfer.create();

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
    console.log(gif);
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
            const shareActionSheet = this.actionSheetCtrl.create({
              buttons: [
                {
                  text: 'Via Twitter',
                  handler: () => {
                    this.socialSharing.shareViaTwitter('Here is a gif for you from GifTT : ' + gif.title + " link : " + gif.url, gif.images.original.url, gif.images.original.url).catch((reason: any) => console.log(reason));
                  }
                }, {
                  text: 'Via Facebook',
                  handler: () => {
                    this.socialSharing.shareViaFacebook('Here is a gif for you from GifTT : ' + gif.title + " link : " + gif.url, gif.images.original.url, gif.images.original.url).catch((reason: any) => console.log(reason));
                  }
                }, {
                  text: 'Via Instagram',
                  handler: () => {
                    this.socialSharing.shareViaInstagram('Here is a gif for you from GifTT : ' + gif.title + " link : " + gif.url, gif.images.original.url).catch((reason: any) => console.log(reason));
                  },
                }, {
                  text: 'Via Whatsapp',
                  handler: () => {
                    this.socialSharing.shareViaWhatsApp('Here is a gif for you from GifTT : ' + gif.title + " link : " + gif.url, gif.images.original.url, gif.images.original.url).catch((reason: any) => console.log(reason));
                  }
                }, {
                  text: 'Cancel',
                  role: 'cancel'
                }
              ]
            });
            shareActionSheet.present();
          }
        }, {
          text: 'Save',
          handler: () => { // burada kaldın
            this.fileTransfer.download(encodeURI("https://www.tednasmith.com/wp-content/uploads/2018/08/TN-Lake_Helevorn.jpg"), this.file.dataDirectory + gif.id + ".gif", true).then((entry) => {
              console.log(entry);
              let alert = this.alertCtrl.create({
                title: 'Yeah',
                subTitle: `Downloaded the gif`,
                buttons: ['Great']
              });
              alert.present();
            }, (error) => {
              console.log(error);
              let alert = this.alertCtrl.create({
                title: 'Oh no',
                subTitle: error,
                buttons: ['Ok :(']
              });
              alert.present();
            });
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
