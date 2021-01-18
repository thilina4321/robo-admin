import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-register-doctoe',
  templateUrl: './register-doctoe.component.html',
  styleUrls: ['./register-doctoe.component.css']
})
export class RegisterDoctoeComponent implements OnInit {

  constructor(
    private doctorService:DoctorService
    ) { }


  ngOnInit(): void {

  }

  isDoctor = true



  onSubmit(form:NgForm){
    const password = form.value.password
    console.log(password);
    console.log(form.value);


    this.doctorService.addPatientsDataToDatabase(form.value, password)


  }

}
