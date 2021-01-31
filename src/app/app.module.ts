import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClientModule} from '@angular/common/http';
import {SocialSharing} from '@ionic-native/social-sharing';
import {IonicStorageModule} from '@ionic/storage';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';

import {MyApp} from './app.component';
import {TabsPage} from '../pages/tabs/tabs';
import {HomePage} from './../pages/home/home';
import {FavoritesPage} from './../pages/favorites/favorites';
import {SearchPage} from './../pages/search/search';
import {TrendPage} from '../pages/trend/trend';
import {GiphyServiceProvider} from '../providers/giphy-service/giphy-service';
import {GlobalSettingsProvider} from './globalSettings';
import {StorageServiceProvider} from '../providers/storage-service/storage-service';


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    SearchPage,
    FavoritesPage,
    TrendPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    SearchPage,
    FavoritesPage,
    TrendPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GiphyServiceProvider,
    GlobalSettingsProvider,
    SocialSharing,
    StorageServiceProvider,
    FileTransfer,
    FileTransferObject,
    File
  ]
})
export class AppModule {
}
