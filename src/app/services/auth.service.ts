import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';
import { updateProfile } from 'firebase/auth';
import { of as observableOf } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<firebase.User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      this.currentUserSubject.next(user);
    });
  }

  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  register(email: string, password: string, username: string) {
    return from(
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          if (userCredential.user) {
            return updateProfile(userCredential.user, {
              displayName: username,
            }).then(() => userCredential.user);
          } else {
            throw new Error('User creation failed');
          }
        })
    );
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

  getCurrentUser() {
    return this.currentUser$;
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

  refreshUser() {
    this.afAuth.currentUser.then((user) => {
      if (user) {
        user.reload().then(() => {
          this.currentUserSubject.next(user);
        });
      }
    });
  }
}
function of(): Observable<void> {
  return observableOf(undefined);
}
