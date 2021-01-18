import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemService } from './system.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit {

  constructor(private systemService:SystemService, private router:Router) { }

  ngOnInit(): void {
    this.systemService.isAuth.subscribe(auth=>{
      console.log(auth);

      if(auth){
        this.router.navigate(['/'])
      }
    })

  }

  error = false
  unauth = false

  onLogin(form:NgForm){
    if(form.invalid){

      this.error = true
      return
    }

    this.error = false

    const {email, password} = form.value
    if(password != 'admin1234'){
      this.unauth = true
      return
    }
    this.unauth = false
    this.systemService.onLoging(email, password)

  }

}
