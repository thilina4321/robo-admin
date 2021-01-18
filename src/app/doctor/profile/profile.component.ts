import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private doctorService:DoctorService, private route:ActivatedRoute) { }

  doctor?:Doctor

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.doctorService.getDoctors()
        const id = paramMap.get('id')
        this.doctorService.getSpecificDoctor(id)

        this.doctorService.sDoctors$.subscribe((doctor:any)=>{
          this.doctor = doctor
        })

      }
    })


  }

}
