import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AdminComponent } from './admin/admin.component';
import { SystemComponent } from './auth/system.component';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';



@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    SystemComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    PatientModule,
    DoctorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
