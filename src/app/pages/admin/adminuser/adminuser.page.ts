import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalUserPage } from '../modal-user/modal-user.page';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Storage } from '@ionic/storage';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.page.html',
  styleUrls: ['./adminuser.page.scss'],
})
export class AdminuserPage implements OnInit {

  users:any= [];
  userlogued:Number;
  constructor(
    private modalController:ModalController,
    private storage:Storage,
    private authS: AuthService,
    public alertController: AlertController,
  ) { }

  userData: any = {
    isLoggedIn: false,
  };

  userSubscription: Subscription;
  ngOnInit() {

  }

  ionViewWillEnter() {
    this.userSubscription = this.authS.userData.subscribe((userData) => {
      this.userData = userData;

      this.authS.getUsers(this.userData.user.token).subscribe((response:any) => {
        this.users = response.data;
        console.log(this.users);
      });

    });
  }
  ionViewWillLeave() {
    this.userSubscription.unsubscribe();
  }

async editUser(user){
  const modal = await this.modalController.create({
    component: ModalUserPage,
    componentProps: {
      'id_user' : user.id_user,
    }
  });
  return await modal.present();
  }

}