import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  register(email: string, password: string) {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return from(this.afAuth.signInWithPopup(provider));
  }

  facebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    return from(this.afAuth.signInWithPopup(provider));
  }

  appleLogin() {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    return from(this.afAuth.signInWithPopup(provider));
  }

  forgotPassword(email: string) {
    return from(this.afAuth.sendPasswordResetEmail(email));
  }

  isLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user: firebase.User | null): boolean => {
        return user !== null;
      })
    );
  }

  isLoggedOut(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user) => {
        return user === null;
      })
    );
  }

  getCurrentUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      map((user) => {
        return user;
      })
    );
  }

  getCurrentUserId(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map((user) => {
        return user ? user.uid : null;
      })
    );
  }

  getCurrentUserEmail(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map((user) => {
        return user ? user.email : null;
      })
    );
  }

  getCurrentUserDisplayName(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      map((user) => {
        return user ? user.displayName : null;
      })
    );
  }

  logout(): Observable<void> {
    this.afAuth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    console.log('User logged out');
    return of();
  }

  getUser(): Observable<any> {
    return this.afAuth.authState;
  }
}
function of(): Observable<void> {
  return observableOf(undefined);
}
