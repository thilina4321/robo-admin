import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
    this.firestore
      .collection('patients')
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
      .subscribe((patients: any) => {

        this.patients = patients;
        this.patients$.next(this.patients);
      });
  }

  getSpecificPatient(id:any){
    this.firestore
    .collection('patients')
    .doc(id)
    .valueChanges()
    .subscribe((doctor: any) => {


      this.sPatients$.next(doctor);

    });

  }



  findPatientToUpdate(id:string){
    return this.firestore
      .collection('patients')
      .doc(id)
      .valueChanges()

  }

  updatePatient(id:string, data:{}){
    this.firestore.collection('patients').doc(id)
    .set(data).then((doctor:any)=>{
      this.router.navigate(['/patient'])

    }).catch(e=>{
      console.log(e);

    })
  }

  deletePatient(id:string){
    this.firestore.collection('patients').doc(id).delete().then(()=>{
      this.patients = this.patients.filter(doctor=> doctor.id != id)
      this.patients$.next(this.patients)
    }).catch(e=>{
      console.log(e);

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
