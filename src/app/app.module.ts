import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatButtonModule } from '@angular/material/button';

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
    RouterModule.forRoot(routeConfig),
    AngularResizedEventModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
