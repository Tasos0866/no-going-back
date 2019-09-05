import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { StartmenuComponent } from './startmenu/startmenu.component';
import { EndgameComponent } from './endgame/endgame.component';

export const routeConfig: Routes = [
  {
    path: '',
    redirectTo: '/startmenu',
    pathMatch: 'full',
  },
  {
    path: 'startmenu',
    component: StartmenuComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'endgame',
    component: EndgameComponent
  },
  { path: '**', component: PageNotFoundComponent }
];
