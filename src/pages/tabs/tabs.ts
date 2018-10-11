import { Component } from '@angular/core';

import { TrendPage } from './../trend/trend';
import { HomePage } from '../home/home';
import { FavoritesPage } from '../favorites/favorites';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FavoritesPage;
  tab2Root = HomePage;
  tab3Root = TrendPage;

  constructor() {

  }
}
