import { Component, OnInit } from '@angular/core';
import { SystemService } from './auth/system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isAuth = false
  constructor(private systemService:SystemService){

  }

  ngOnInit(){
    this.systemService.authState()
    this.systemService.isAuth.subscribe(auth=>{
      console.log(auth);
      this.isAuth = auth

    })
  }

  logout(){
    this.systemService.logout()
  }
}
