import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Doctor } from 'src/app/doctor/doctor';
import { custodian, Patient } from '../patient';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class PatientProfileComponent implements OnInit {

  constructor(private route:ActivatedRoute, private patientService:PatientService) { }

  patient?:{patient:Patient, uid:string, custodian:custodian}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.patientService.getPatient()
        const id = paramMap.get('id')

        if(id)
        this.patientService.getSpecificPatient(id)

        this.patientService.sPatients$.subscribe((doctor:any)=>{
          console.log(doctor);
          this.patient = doctor

        })

      }
    })


  }

}
