import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NavigationsService {

  constructor(
    private router: Router, 
    private alrtCtrl: AlertController,
    private navCtrl: NavController
  ) { }

  public navigateToRoute(route: string) {
    this.router.navigateByUrl(route);
  }

  async setAlert (header: any, message: any, redirection: boolean) {


    const alert = await this.alrtCtrl.create({
      header,
      message,
    });

    await alert.present();

    if(redirection) {
      setTimeout(() => {
        alert.dismiss();
        this.navCtrl.back();
        // window.location.reload();
      }, 1500);
    }
  }

  async setAlertWBtns (header: any, message: any, buttons: any, redirection: boolean) {
    const alert = await this.alrtCtrl.create({
      header,
      message,
      buttons,
    });

    await alert.present();

    if(redirection) {
      setTimeout(() => {
        alert.dismiss();
        this.navCtrl.back();
        // window.location.reload();
      }, 1500);
    }
  }
}
