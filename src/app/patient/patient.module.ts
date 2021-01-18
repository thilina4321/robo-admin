import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PatientDataComponent } from './patient-data/patient-data.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { PatientProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [DashboardComponent, RegisterPatientComponent, PatientDataComponent, PatientProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,

  ]
})
export class PatientModule { }
