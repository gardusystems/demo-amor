import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-list-workshop',
  templateUrl: './list-workshop.page.html',
  styleUrls: ['./list-workshop.page.scss'],
})
export class ListWorkshopPage implements OnInit {

  workshop = {
    id: 1,
    title: "El camino a la prosperidad",
    lessons : [{
      id: 1,
      nombre:"leccion 1",
      descripcion: "descripcion leccion 1"
    }, {
      id: 2,
      nombre:"leccion 2",
      descripcion: `descripcion leccion 2`
    }]
  }
  
  constructor(public actionSheetController: ActionSheetController, private navCtrl:NavController) { }

  ngOnInit() {
  }

  
  navigate(workshopId, id){
    this.navCtrl.navigateForward(`menu/tabs/workshop/${workshopId}/lesson/${id}`);
  }
}

