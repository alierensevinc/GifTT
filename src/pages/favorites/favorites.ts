import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { StorageServiceProvider } from '../../providers/storage-service/storage-service';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  loading: any;
  favoritesResults: any;
  fileTransfer: FileTransferObject;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public storageService: StorageServiceProvider, public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,
    public socialSharing: SocialSharing,
    private transfer: FileTransfer, private file: File) {

    this.fileTransfer = this.transfer.create();

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
        }, {
          text: 'Save',
          icon: 'download',
          handler: () => {
            this.loading = this.loadingCtrl.create({
              spinner: 'crescent',
              content: 'Downloading'
            })
            this.loading.present();
            this.fileTransfer.download(encodeURI(gif.images.original.url), this.file.externalRootDirectory + "Downloads/" + gif.id + ".gif", true).then((entry) => {
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
