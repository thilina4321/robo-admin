import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponentDoctor implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  //doctor-register
  registerDoctor(){
    this.router.navigate(['/doctor-register'])
  }

  doctorDetails(){
    this.router.navigate(['/doctor-data'])
  }

}
