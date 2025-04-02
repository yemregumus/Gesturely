import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Login method
  login(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  // Logout method
  logout() {
    return from(this.afAuth.signOut());
  }

  // Get the currently authenticated user as an observable
  getUser(): Observable<any> {
    return this.afAuth.authState; // authState is an observable
  }
}
