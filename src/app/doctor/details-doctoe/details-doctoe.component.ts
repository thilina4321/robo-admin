import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-details-doctoe',
  templateUrl: './details-doctoe.component.html',
  styleUrls: ['./details-doctoe.component.css']
})
export class DetailsDoctoeComponent implements OnInit {

  constructor(private doctorService:DoctorService, private router:Router) { }

  displayedColumns: string[] = [ 'nic', 'name', 'teleNumber','uid'];
  dataSource:any = [];

  ngOnInit(): void {
    this.doctorService.getDoctors()
    this.doctorService.doctors$.subscribe(doctors=>{
      console.log(doctors);
      this.dataSource = doctors

    })

  }

  doctorProfile(id:string){
    this.router.navigate(['/doctor-profile', id])

  }

}
