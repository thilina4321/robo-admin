import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { SystemComponent } from './auth/system.component';

//patient
import { DashboardComponent } from './patient/dashboard/dashboard.component';
import { PatientDataComponent } from './patient/patient-data/patient-data.component';
import { RegisterPatientComponent } from './patient/register-patient/register-patient.component';


//doctor
import {DashboardComponentDoctor} from './doctor/dashboard/dashboard.component'
import { RegisterDoctoeComponent } from './doctor/register-doctoe/register-doctoe.component';
import { DetailsDoctoeComponent } from './doctor/details-doctoe/details-doctoe.component';
import { PatientProfileComponent } from './patient/profile/profile.component';
import { ProfileComponent } from './doctor/profile/profile.component';

const routes: Routes = [
  {path: '', component:AdminComponent},
  {path:'system', component:SystemComponent},

  //patients
  {path:'patient', component:DashboardComponent},
  {path:'patient-data', component:PatientDataComponent},
  {path:'patient-register', component:RegisterPatientComponent},
  {path:'patient-register', component:RegisterPatientComponent},
  {path:'patient-profile/:id', component:PatientProfileComponent},

  //doctor
  {path:'doctor', component:DashboardComponentDoctor},
  {path:'doctor-register', component:RegisterDoctoeComponent},
  {path:'doctor-data', component:DetailsDoctoeComponent},
  {path:'doctor-profile/:id', component:ProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
