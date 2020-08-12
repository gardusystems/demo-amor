import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../pages/modal/modal.page';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private storage: Storage, private http: HttpClient, 
    public modalController: ModalController) {}
    API_URL = environment.API_URL + "users/";
    //API_URL = "http://localhost:8080/api/users/";

  default = {
    isLoggedIn: false,
    user: {
      id_user: '',
      full_name: "Invitado",
      email: "",
      role: "",
      avatar: "assets/avatar.jpg",
    },
  };

  userData = new BehaviorSubject(this.default);

  loadUser() {
    return new Promise((resolve, reject) => {
      this.storage.get("token").then((token) => {
        if (token) {
          let formData = new FormData();
          formData.append("token", token.toString());
          this.http
            .post(`${this.API_URL}watch`, formData, {
              headers: new HttpHeaders(),
            })
            .subscribe((res: any) => {
              if (res && res.status == 200) {
                console.log(res.data)
                let user = {
                  isLoggedIn: true,
                  user: {
                    id_user: res.data.id_user,
                    full_name: res.data.full_name,
                    email: res.data.email,
                    role: res.data.role,
                    avatar: res.data.avatar + '?' + new Date().getTime() || "assets/avatar.jpg",
                    token: token
                  },
                };

                this.userData.next(user);
                resolve(true);
              } else {
                resolve(false);
              }
            });
        } else {
          resolve(false);
        }
      });
    });
  }

  getUserbyId(id_user){
    let formToken = new FormData();
    formToken.append("id_user", id_user.toString());
    return this.http
      .post(`${this.API_URL}get-user`, formToken, {
        headers: new HttpHeaders(),
      });
  }

  logOut() {
    
    this.storage.remove('token');
    this.userData.next(this.default);
  }

  login(credentials) {
    let formData = new FormData();

    formData.append("email", credentials.email.toString());
    formData.append("password", credentials.password.toString());

    return this.http.post(`${this.API_URL}login`, formData, {
      headers: new HttpHeaders(),
    });
  }

  register(register){
    let formRegister = new FormData();
    formRegister.append("full_name", register.full_name.toString());
    formRegister.append("email", register.email.toString());
    formRegister.append("password", register.password.toString());

    return this.http.post(`${this.API_URL}register`,formRegister, {
      headers: new HttpHeaders(),
    });
  }

  changeAvatar(token, avatar){
    let form = new FormData();

    form.append("token", token);
    form.append("avatar", avatar);

    return this.http.post(`${this.API_URL}change-avatar`,form, {
      headers: new HttpHeaders(),
    });
  }

  editSelf(token, full_name){
    let form = new FormData();

    form.append("token", token);
    form.append("full_name", full_name);

    return this.http.post(`${this.API_URL}edit-self`,form, {
      headers: new HttpHeaders(),
    });
  }


  modal;

  getUsers(token){
    let formToken = new FormData();
    formToken.append("token", token.toString());
    return this.http.post(`${this.API_URL}list`, formToken, {headers: new HttpHeaders(),});
  }

  editRole(id_user,token){
    let formData = new FormData();
    formData.append("token", token.toString());
    formData.append("id_user", id_user.toString());
    return this.http
      .post(`${this.API_URL}edit-role`, formData, {
        headers: new HttpHeaders(),
      });
  }


  async presentLoginRegisterModal() {
    this.modal = await this.modalController.create({
      component: ModalPage,
      cssClass: "modal",
    });
    await this.modal.present();
  }


  /* VIEJO */
  /*
  isLoggedIn$ = new BehaviorSubject(false);

  defaulUser = {
    isLoggedIn: false,
    full_name: "Invitado",
    avatar: "assets/avatar.png",
    id_user: "0",
  };

  userData$ = new BehaviorSubject(this.defaulUser);

  login(credentials) {
    let formData = new FormData();

    formData.append("email", credentials.email.toString());
    formData.append("password", credentials.password.toString());

    return this.http.post(`${this.API_URL}login`, formData, {
      headers: new HttpHeaders(),
    });
  }

  getIsLoggedIn(): Observable<boolean> {
    this.storage.get("userData").then((res) => {
      if (res && res != null) {
        this.storage.set("userData", res);
        this.isLoggedIn$.next(res.isLoggedIn);
      } else {
        this.storage.set("userData", this.defaulUser);
        this.userData$.next(this.defaulUser);
        this.isLoggedIn$.next(false);
      }
    });
    return this.isLoggedIn$;
  }

  logOut() {
    
    this.storage.remove('token');
    this.userData.next(this.default);

    //old
    this.storage.set("userData", this.defaulUser);
    this.isLoggedIn$.next(false);
    this.userData$.next(this.defaulUser);
  }

  getUserData(): Observable<any> {
    this.storage.get("userData").then((res) => {
      this.userData$.next(res);
    });

    return this.userData$;
  }

  */
}
