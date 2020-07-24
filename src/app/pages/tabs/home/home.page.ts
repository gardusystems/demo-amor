import { Component, OnInit } from "@angular/core";
import { AlertController, NavController, ModalController } from "@ionic/angular";

import { workshops } from "../../../services/data";

import { AuthService } from "src/app/services/auth.service";
import { WorkshopService } from "src/app/services/workshop.service";

import { LoginPage } from '../../login/login.page';
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  constructor(
    public alertController: AlertController,
    private navCtrl: NavController,
    private auths: AuthService,
    public modalController: ModalController,    
    private workShopService: WorkshopService
  ) {}

  workshops = workshops;

  isLogged = false;
    user = {};

  ngOnInit(): void {

    /** With observable - AuthService **/
    this.auths.getIsLoggedIn().subscribe(isLogged => this.isLogged = isLogged);


    this.auths.getUserData().subscribe(user => this.user = user);


    this.workShopService.getWotkshops(1, 5).subscribe(data => {});
     
  }

  async alertLogin() {
    const alert = await this.alertController.create({
      header: "Inicia sesión para ver más",
      message:
        "Inicia sesión o registrate para acceder a todo nuestro contenido. ",
      buttons: [
        {
          text: "Cancelar",
          cssClass: "cancel",
        },
        {
          text: "Iniciar sesión",
          role: "accept",
          cssClass: "alert-button",
          handler: () => this.redirectToLogin(),
        },
      ],
    });
    await alert.present();
    let result = await alert.onDidDismiss();
  }

  workshopHandleCLick(index, workshopID) {
    if (index != 0 && !this.isLogged) {
      this.alertLogin();
    } else {
      this.navCtrl.navigateForward(`menu/tabs/workshop/${workshopID}`);
    }
  }

  redirectToLogin() {
    this.navCtrl.navigateForward(`login`);
  }
}
