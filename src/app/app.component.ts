import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { BancoDados } from '../providers/banco-dados/banco-dados';
import { Internet } from '../providers/internet/internet';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
    private network: Internet,
    private bancoDados: BancoDados,) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      this.bancoDados.createDatabase();
      this.network.getConnection();
      splashScreen.hide();
      
    });
  }
}

