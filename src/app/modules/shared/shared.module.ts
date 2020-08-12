import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from 'src/app/pages/admin/adminws/edit/edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

  ],
  exports: [
    EditComponent
  ]
})
export class SharedModule { }
