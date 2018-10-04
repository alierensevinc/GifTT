import { Component } from '@angular/core';

import { TrendPage } from './../trend/trend';
import { HomePage } from '../home/home';
import { SearchPage } from './../search/search';
import { TranslatePage } from './../translate/translate';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = TranslatePage;
  tab2Root = HomePage;
  tab3Root = TrendPage;

  constructor() {

  }
}
