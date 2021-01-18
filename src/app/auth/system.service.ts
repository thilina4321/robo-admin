import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private router:Router, private auth:AngularFireAuth) { }

  isAuth = new BehaviorSubject(false)

  authState(){
    this.auth.authState.subscribe(user=>{
      if(user){
        this.isAuth.next(true)
        // this.router.navigate(['/'])
      }else{
        this.router.navigate(['/system'])
      }
    })
  }

  onLoging(email:string, password:string){

    this.auth.signInWithEmailAndPassword(email, password)
    .then().catch(err=>{
      console.log(err);

    })
  }

  logout(){
    this.isAuth.next(false)
    this.auth.signOut()
  }
}
