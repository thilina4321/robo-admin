import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar,
  ) {}

  userId$ = new BehaviorSubject<string>('')

  getUserId(){
    return this.userId$
  }

  isUser = new BehaviorSubject(false)
  isLoading = new BehaviorSubject(false)

  authStatus() {
    this.isLoading.next(true)
    this.auth.authState.subscribe(
      (user) => {
        this.isLoading.next(false)
        if (user) {
          this.userId$.next(user.uid)
          this.isUser.next(true)
          this.router.navigate(['/patients'])
        }else{
          this.router.navigate(['/'])
        }
      },
      (error) => {
        this.isLoading.next(false)
        this.snackbar.open(error.message, 'ok', {
          duration: 3000,
        });
      }
    );
  }

  createUser(email: string, password: string) {
    this.isLoading.next(true)
    this.auth.createUserWithEmailAndPassword(email, password).then(() => {
      this.isLoading.next(false)

    },(error) => {
      this.isLoading.next(false)

      this.snackbar.open(error.message, 'ok', {
        duration: 3000,
      });
    });
  }

  userLogin(email: string, password: string) {
    this.isLoading.next(true)

    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      this.isLoading.next(false)

      this.router.navigate(['/patients']);
    },(error) => {
      this.isLoading.next(false)

      this.snackbar.open(error.message, 'ok', {
        duration: 3000,
      });
    });
  }

}
