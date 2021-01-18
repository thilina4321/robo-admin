import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/doctor/doctor.service';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.css']
})
export class PatientDataComponent implements OnInit {

  constructor(private router:Router, private patientService:PatientService) { }

  displayedColumns: string[] = [ 'nic', 'name', 'teleNumber','uid'];
  dataSource:any = [];

  ngOnInit(): void {
    this.patientService.getPatient()
    this.patientService.patients$.subscribe(patients=>{
      console.log(patients);
      this.dataSource = patients

    })
  }


  patientProfile(id:string){
    this.router.navigate(['/patient-profile', id])

  }


}
