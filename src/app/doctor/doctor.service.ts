import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  doctorSubscription: Subscription[] = [];
  doctors$ = new BehaviorSubject<Doctor[]>([]);
  sDoctors$ = new BehaviorSubject(undefined);
  doctors: Doctor[] = [];

  addPatientsDataToDatabase(doctor: Doctor, password: string) {
    this.auth
      .createUserWithEmailAndPassword(doctor.email, password)
      .then((data) => {
        const doctorwithId = { ...doctor, uid: data.user?.uid };

        this.firestore
          .collection('doctors')
          .add(doctorwithId)
          .then(() => {
            this.router.navigate(['/doctor']);
          })
          .catch((error) => {
            this.snackbar.open('Something went wrong', 'ok');
          });
      })
      .catch((error) => {
        this.snackbar.open('Something went wrong', 'ok');
      });
  }

  getDoctors() {
    this.firestore
      .collection('doctors')
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data() as {};
            return {
              id: a.payload.doc.id,
              ...data,
            };
          })
        )
      )
      .subscribe((doctors: any) => {
        this.doctors = doctors;
        this.doctors$.next(this.doctors);
      });
  }

  getSpecificDoctor(id: string) {
    this.firestore
      .collection('doctors')
      .doc(id)
      .valueChanges()
      .subscribe((doctor: any) => {
        this.sDoctors$.next(doctor);
      });
  }

  findDoctorToUpdate(id:string){
    return this.firestore
      .collection('doctors')
      .doc(id)
      .valueChanges()



  }

  updateDoctor(id:string, data:{}){
    this.firestore.collection('doctors').doc(id)
    .set(data).then((doctor:any)=>{
      this.router.navigate(['/doctor'])

    }).catch(e=>{
      console.log(e);

    })
  }

  deleteDoctor(id:string){
    this.firestore.collection('doctors').doc(id).delete().then(()=>{
      this.doctors = this.doctors.filter(doctor=> doctor.id != id)
      this.doctors$.next(this.doctors)
    }).catch(e=>{
      console.log(e);

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
