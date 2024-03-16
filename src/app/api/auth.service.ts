import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  UserData: any;
  constructor(
    private auth: Auth,
    private router: Router,
    public ngZone: NgZone
  ) {
    onAuthStateChanged(this.auth, (user: any) => {
      if (user) {
        this.UserData = user;
        localStorage.setItem('user', JSON.stringify(this.UserData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  //get User
  //get Authenticated user from firebase
  getAuthFire() {
    return this.auth.currentUser;
  }

  //get Authenticated user from Local Storage
  getAuthLocal() {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user;
  }

  //Check wither User Is looged in or not
  get isLoggedIn(): boolean {
    const token = localStorage.getItem('user');
    const user = JSON.parse(token as string);
    return user !== null ? true : false;
  }

  //Register Method
  Register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
          this.sendEmailVerification();
          this.router.navigate(['/']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //Login Method
  Login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((result: any) => {
        this.UserData = result.user;
        this.ngZone.run(() => {
          Swal.fire({
            position: 'top-end',
            title: 'TAMAM!',
            text: result.user.email,
            icon: "success",
            showConfirmButton: false,
            timer: 14500,
          });
          this.router.navigate(['/admin']);
        });
      })
      .catch((error) => {
        Swal.fire({
          position: 'top-end',
          title: 'HATA!',
          text: error,
          icon: "error",
          showConfirmButton: false,
          timer: 4500,
        });
        //window.alert(error.message);
      });
  }
  //Logout
  Logout() {
    signOut(this.auth).then(() => this.router.navigate(['/auth']));
  }

  //login with Email or Facebook
  //Login with Google
  GoogleAuth() {
    return this.loginWithPopup(new GoogleAuthProvider());
  }

  //Login with Facebook
  //FacebookAuth() {
  //  return this.loginWithPopup(new FacebookAuthProvider());
  //}

  //Pop Up Provider
  loginWithPopup(provider: any) {
    return signInWithPopup(this.auth, provider).then(() => {
      this.router.navigate(['/admin']);
    });
  }

  //Send Password Reset Email
  async sendPasswordResetEmails(email: string) {
    sendPasswordResetEmail(this.auth, email)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  //Send Email Verification
  sendEmailVerification() {
    return sendEmailVerification(this.auth.currentUser as User);
  }
}