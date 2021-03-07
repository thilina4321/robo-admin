import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
    private route:ActivatedRoute,
    ) { }

    id!:string | null
    patient! :{patient:Patient, custodian:custodian}

  ngOnInit(): void {


    this.route.paramMap.subscribe((paramMap:ParamMap)=>{

      this.id = paramMap.get('id')




    if(this.id)
    this.patientService.findPatientToUpdate(this.id).subscribe((doctor: any) => {
      this.patient = doctor



    });

  })


  }

  patientData!: Patient;
  password = ''
  custodianData!:custodian;
  isPatient = true

  goToNext(form:NgForm){
    // this.patientData = form.value
    // this.password = form.value.password
    this.isPatient = false
    // console.log('hello');

  }

  onSubmit(form:NgForm){
    this.custodianData = form.value

    if(this.id){
      this.patientService.updatePatient(this.id, form.value)

    }else{
      this.patientService.addPatientsDataToDatabase(this.password, this.patientData, this.custodianData)


    }




  }


}
