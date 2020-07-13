import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import { workshops } from "../../../services/data";


@Component({
  selector: 'app-list-workshop',
  templateUrl: './list-workshop.page.html',
  styleUrls: ['./list-workshop.page.scss'],
})
export class ListWorkshopPage implements OnInit {

  constructor(public actionSheetController: ActionSheetController, private navCtrl:NavController,private route: ActivatedRoute) { }

  workshop = {
    id: 0,
    title: "Magia de amor",
    description: ""
  };
  
  workshopId = this.route.snapshot.parent.paramMap.get("id");
  ngOnInit() {

    let id = Number(this.route.snapshot.paramMap.get("id"));

    console.log(workshops);
    
    workshops.forEach(workshop => {
      if(workshop.id == id) {
        this.workshop = workshop;
      }
    });

  }

  
  navigate(id){
    this.navCtrl.navigateForward(`menu/tabs/workshop/${this.workshopId}/lesson/${id}`);
  }
}

