import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { AlertService } from "src/app/services/shared/alert.service";
import { AuthService } from "src/app/services/auth.service";

import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { IonInput } from '@ionic/angular';
import { emit } from 'process';

@Component({
  selector: "app-content-form",
  templateUrl: "./content-form.component.html",
  styleUrls: ["./content-form.component.scss"],
})
export class ContentFormComponent implements OnInit {
  @Input() editing: Boolean = false;
  @Input() content: any = { type: "1" };

  @Output() saveContent = new EventEmitter<{}>();

  contentForm: FormGroup;

  filename ="";
  uploading = false;
  fileSelected = false;
  newFile;

  validation_messages = {
    url: [{ type: "required", message: "La url es requerida" },
    { type: "pattern", message: "La url no coincide con un video de YouTube" }],
  };
  constructor(
    private alertService: AlertService,
    private auths: AuthService,
    private formBuilder: FormBuilder,
    private chooser: Chooser
  ) {
    const urlReg = '^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$';


    this.contentForm = this.formBuilder.group({
      type: new FormControl(
        '1'
      ),
      title: new FormControl(
        ""
      ),
      url: new FormControl("", Validators.compose([Validators.required, Validators.pattern(urlReg)])),
    });
  }


  ngOnInit() {
    if (this.editing) {
      this.contentForm.controls['type'].disable();
      this.contentForm.patchValue({
        title: this.content.title,
        url: this.content.url,
      });
    } else {
    }
  }

  @ViewChild("file") file: ElementRef;

  fileChange(event){

    if(event){

      let file: File = event.target.files[0];

      this.filename = file.name;
      this.fileSelected = true;
      this.newFile = file;
    }
  }


  selectChange(){
    if(this.content.type !== '1'){
      setTimeout(() => {
        this.filename = "";
        this.fileSelected = false;
        this.newFile = null;
      });
    }

  }

  save(){
    let emmitObject = {
      action: 1,
      content : {}
    }

    if(this.editing){
      emmitObject.action = 2; 


    }
    else {
     
      if(this.content.type == '1'){
        emmitObject.content = {
          type: this.content.type,
          title: this.contentForm.controls['title'].value,
          url: this.contentForm.controls['url'].value
        };
      }
      else {
        emmitObject.content =  {
          type: this.content.type,
          title: this.contentForm.controls['title'].value,
          content_file: this.newFile
        };
      }
      this.resetForm();
    }
    
    this.saveContent.emit(emmitObject)
  }

  resetForm(){
    this.contentForm.reset();
    this.content.type = '1';
  }

  async choose(){
    this.uploading = true;
    await this.chooser.getFile('audio/*')
      .then((file: ChooserResult) => {
        this.filename =  file.name;
        this.uploading = false;
        alert(JSON.stringify(file))
      })
      .catch((error: any) => console.error(error));
  }
}
