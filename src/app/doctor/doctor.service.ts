import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private firestore: AngularFirestore,
    private auth:AngularFireAuth,
    private snackbar:MatSnackBar,
     private router: Router) {}


  doctorSubscription: Subscription[] = [];
  doctors$ = new BehaviorSubject<Doctor[]>([])
  sDoctors$ = new BehaviorSubject(undefined)
  doctors:Doctor[] = []



  addPatientsDataToDatabase(doctor:Doctor, password:string) {

    this.auth.createUserWithEmailAndPassword(doctor.email, password)
    .then(data=>{

      const doctorwithId = {...doctor, uid:data.user?.uid}

      this.firestore
      .collection('doctors')
      .add(doctorwithId)
      .then(() => {
        this.router.navigate(['/doctor']);
      }).catch(error=>{
        this.snackbar.open('Something went wrong', 'ok')
      })
    }).catch(error=>{
      this.snackbar.open('Something went wrong', 'ok')
    })
  }

  getDoctors(){
    this.firestore.collection('doctors').valueChanges().subscribe((doctors:any)=>{
      this.doctors = doctors
      this.doctors$.next(this.doctors)

    })
  }

  getSpecificDoctor(id:any){
     this.firestore.collection('doctors',(ref) => ref.where('uid', '==', id)

    ).valueChanges().subscribe((doctor:any)=>{

      this.sDoctors$.next(doctor[0])
    })

  }

  clearSubscription() {
    if (this.doctorSubscription) {
      this.doctorSubscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
