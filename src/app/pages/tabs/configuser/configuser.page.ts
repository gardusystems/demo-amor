import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from "@ionic/storage";
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PopoverController, ModalController, IonImg } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { AvatarComponent } from './avatar/avatar.component';
@Component({
  selector: 'app-configuser',
  templateUrl: './configuser.page.html',
  styleUrls: ['./configuser.page.scss'],
})
export class ConfiguserPage implements OnInit {
  userData:any = {
    user: {

    }
  };

  public imagePath;

  userForm = new FormGroup({
    full_name: new FormControl(''),
    email: new FormControl(''),
    avatar: new FormControl('')
  })

  passwordForm = new FormGroup({
    current_password: new FormControl(''),
    new_password: new FormControl(''),
    confirm_password: new FormControl('')
  });

  constructor(private storage: Storage, 
    public modalController: ModalController,
    private authS: AuthService,
    private chooser: Chooser,) {   }

    @ViewChild(IonImg) avatar: IonImg;
  ngOnInit() {
    
    this.authS.userData.subscribe(user => {
      this.userData = user;

      this.userForm.patchValue({
        full_name: this.userData.user.full_name,
        email: this.userData.user.email
      });
    })

  }
  
  changePassword(){
    console.log(this.passwordForm.value);
  }

  saveUser() {
    if(this.userForm.value.full_name !== this.userData.user.full_name){
      if(this.userForm.value.full_name != ''){
        let userData = {
          token: this.userData.user.token,
          full_name: this.userForm.value.full_name
        }
  
        this.authS.editSelf(this.userData.user.token, this.userForm.value.full_name).subscribe((res: any) => {
          if(res.status == 200){
            this.authS.loadUser();
          }
        })
      }
      else {
        console.log("El nombre es requerido")
      }
      
    }else {
      console.log("No hay cambios que guardar")
    }

    
  }

  choose(){
    this.chooser.getFile('image/*')
      .then((file: ChooserResult) => {
        
        this.processImage(file)
      })
      .catch((error: any) => console.error(error));
  }

  async processImage(file) {
    const modal = await this.modalController.create({
      component: AvatarComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        file,
        token: this.userData.user.token
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data !== null && data.data.changed) {
        this.authS.loadUser();
      }
    });
     
    await modal.present();
  }
  

  uploadFile(event){
    
    if (event.target.files.length > 0) {

        let file = event.target.files[0];
        var reader = new FileReader();
        this.imagePath = file;
        reader.readAsDataURL(file); 
        reader.onload = (_event) => { 
          this.userForm.patchValue({
            avatar: reader.result.toString()
          });
          this.userData.user.avatar = reader.result.toString();
        }
        reader.onerror = (err)=> {
          console.log(err);
        } 
    }
  }
}
