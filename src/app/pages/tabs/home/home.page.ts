import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isLogged = false;


  array = [1,2,3,4,5,6,7,8];
  constructor(public alertController:AlertController, private navCtrl:NavController, private auth: AuthenticateService) {}

  ngOnInit(): void {
    this.auth.isLoggedIn().then((isLoggedIn) => this.isLogged = isLoggedIn);
  }

  async alertLogin() {
    const alert = await this.alertController.create({
      header: "Inicia sesión para ver más",
      message: "Inicia sesión o registrate para acceder a todo nuestro contenido. ",
      buttons:  [
        {
          text: "Cancelar",
          cssClass: "cancel"
        },
         {
           text: "Iniciar sesión",
           role: "accept",
           cssClass:"alert-button", 
           handler: () => this.redirectToLogin()
         }
      ]
    });
    await alert.present();
    let result = await alert.onDidDismiss();

  }

  id = 1;

  workshopHandleCLick(index){
    if(index != 0 && !this.isLogged) {
      this.alertLogin();
    }
    else {

      this.navCtrl.navigateForward(`menu/tabs/workshop/${this.id}`);
    }

  }

  redirectToLogin(){
    this.navCtrl.navigateForward(`login`);
  }
}
