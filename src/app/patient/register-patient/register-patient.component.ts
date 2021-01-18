import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { custodian, Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-register-patient',
  templateUrl: './register-patient.component.html',
  styleUrls: ['./register-patient.component.css']
})
export class RegisterPatientComponent implements OnInit {

  constructor(private router:Router,
    private patientService:PatientService,
    ) { }


  ngOnInit(): void {




  }

  patientData!: Patient;
  password = ''
  custodianData!:custodian;
  isPatient = true

  goToNext(form:NgForm){
    this.patientData = form.value
    this.password = form.value.password
    this.isPatient = false
  }

  onSubmit(form:NgForm){
    this.custodianData = form.value


    this.patientService.addPatientsDataToDatabase(this.password, this.patientData, this.custodianData)


  }


}
