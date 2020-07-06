import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-list-workshop',
  templateUrl: './list-workshop.page.html',
  styleUrls: ['./list-workshop.page.scss'],
})
export class ListWorkshopPage implements OnInit {
  current_lesson = "";

  lessons = [{
    nombre:"leccion1",
    descripcion: "descripcion leccion 1"
  }, {
    nombre:"leccion2",
    descripcion: `descripcion leccion 2`
  }];
  constructor(public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    
  }

  onChange($event){
    let index = Number($event.target.value);
    this.current_lesson = this.lessons[index].descripcion;
  }
}
