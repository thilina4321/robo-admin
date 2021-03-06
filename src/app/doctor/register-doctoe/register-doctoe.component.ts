import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-register-doctoe',
  templateUrl: './register-doctoe.component.html',
  styleUrls: ['./register-doctoe.component.css']
})
export class RegisterDoctoeComponent implements OnInit {

  constructor(
    private doctorService:DoctorService,
    private route:ActivatedRoute
    ) { }

    doctor!:Doctor
    id!:string| null


  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{

        this.id = paramMap.get('id')




      if(this.id)
      this.doctorService.findDoctorToUpdate(this.id).subscribe((doctor: any) => {
        this.doctor = doctor


      });

    })

  }

  isDoctor = true



  onSubmit(form:NgForm){
    const password = form.value.password


    if(this.id){
      this.doctorService.updateDoctor(this.id, form.value)

    }else{
      this.doctorService.addPatientsDataToDatabase(form.value, password)

    }




  }

}
