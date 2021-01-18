import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { custodian, Patient } from './patient';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(
    private firestore: AngularFirestore,
    private router: Router,
    private auth: AngularFireAuth,
    private snackBar: MatSnackBar
  ) {}

  patientSubscription: Subscription[] = [];

  patients$ = new BehaviorSubject<Patient[]>([])
  sPatients$ = new BehaviorSubject(undefined)
  patients:Patient[] = []

  addPatientsDataToDatabase(
    password: string,
    patient: Patient,
    custodian: custodian
  ) {
    this.auth
      .createUserWithEmailAndPassword(patient.patientEmail, password)
      .then((data) => {
        const neededDataAboutPatient = {
          uid: data.user?.uid,
          patient,
          custodian,
        };

        this.firestore
          .collection('patients')
          .add(neededDataAboutPatient)
          .then(() => {
            this.router.navigate(['/patient']);
          })
          .catch((e) => {
            console.log(e);
            this.snackBar.open('Something gone wrong..', 'Ok');
          });
      })
      .catch((e) => {
        this.snackBar.open('Something gone wrong..', 'Ok');

        console.log(e);
      });
  }

  getPatient(){
    this.firestore.collection('patients').valueChanges().subscribe((patients:any)=>{
      console.log(patients);

      this.patients = patients
      this.patients$.next(this.patients)

    })
  }

  getSpecificPatient(id:any){
     this.firestore.collection('patients',(ref) => ref.where('uid', '==', id)

    ).valueChanges().subscribe((patient:any)=>{

      this.sPatients$.next(patient[0])
    })

  }

  clearSubscription() {
    if (this.patientSubscription) {
      this.patientSubscription.forEach((sub) => {
        sub.unsubscribe();
      });
    }
  }
}
