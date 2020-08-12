import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ActionSheetController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { WorkshopService } from 'src/app/services/workshop.service';
import { LessonService } from 'src/app/services/lesson.service';
import { AlertService } from 'src/app/services/shared/alert.service';

@Component({
  selector: 'app-modal-ws',
  templateUrl: './modal-ws.page.html',
  styleUrls: ['./modal-ws.page.scss'],
})
export class ModalWsPage implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() workshop_title: string;
  @Input() total_comments: Number;
  @Input() contents: any;

  lessonForm: FormGroup;
  contentForm: FormGroup;
  validation_messages = {
    title: [
      {type:"required", message:"El Titulo es requerido"},
      {type:"minlength", message:"El titulo debe contener al menos una palabra"}
    ],
    description: [
      {type:"required", message:"La descripcion es requerida"},
      {type:"minlength", message:"La descripcion debe contener al menos una palabra"}
    ],
    url:[
      {type:"required", message:"La url es requerida"},
    ]
  };

  constructor(
    private modalController:ModalController, 
    public actionSheetController: ActionSheetController,
    private navCtrl:NavController,
    private route: ActivatedRoute,
    private workshopS: WorkshopService, 
    private lessonService: LessonService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) { 
    this.lessonForm = this.formBuilder.group({
      title: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
      ),
      description: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
      ),
    });
/*------------------Form Content ---------------------- */
    this.contentForm = this.formBuilder.group({
      title: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
      ),
      url: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
      ])
      ),
    });
  }

  ngOnInit() {
    this.lessonForm.patchValue({
      title: this.title,
      description: this.description
    });
  }

  async closeModal(){
    await this.modalController.dismiss();
  }

}
