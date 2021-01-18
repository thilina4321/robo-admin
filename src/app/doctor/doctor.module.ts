import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponentDoctor } from './dashboard/dashboard.component';
import { RegisterDoctoeComponent } from './register-doctoe/register-doctoe.component';
import { DetailsDoctoeComponent } from './details-doctoe/details-doctoe.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [DashboardComponentDoctor, RegisterDoctoeComponent,
    DetailsDoctoeComponent,
    ProfileComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ]
})
export class DoctorModule { }
