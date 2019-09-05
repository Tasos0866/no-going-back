import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { routeConfig } from './routeConfig';
import { HomeComponent } from './home/home.component';
import { StartmenuComponent } from './startmenu/startmenu.component';
import { EndgameComponent } from './endgame/endgame.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    StartmenuComponent,
    EndgameComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
