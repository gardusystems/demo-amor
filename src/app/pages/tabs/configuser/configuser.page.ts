import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-configuser',
  templateUrl: './configuser.page.html',
  styleUrls: ['./configuser.page.scss'],
})
export class ConfiguserPage implements OnInit {
  user = {
    full_name: "",
    email: "",
  };
  constructor(private storage: Storage) { 
  }
  //user = this.storage.get("user");

  ngOnInit() {
    this.storage.get("userData").then(res =>{
      this.user = res;
    });
  }

 
  
}
