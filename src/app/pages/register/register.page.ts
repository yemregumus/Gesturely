import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import firebase from 'firebase/compat/app';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    FooterComponent,
  ],
})
export class RegisterPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertCtrl: AlertController,
    private authService: AuthService
  ) {}

  async registerUser() {
    if (this.password !== this.confirmPassword) {
      this.showAlert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      if (userCredential.user) {
        await userCredential.user.updateProfile({
          displayName: this.username,
        });

        console.log('User registered with username:', this.username);
        this.showAlert('Registration Successful!', `Welcome ${this.username}!`);
        this.authService.refreshUser();
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      this.showAlert('Registration Failed', error.message);
    }
  }

  async googleRegister(event: Event) {
    event.preventDefault();
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);

      if (result.user) {
        console.log('Google account registered:', result.user.displayName);
        this.showAlert('Welcome!', `Hello ${result.user.displayName}`);
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      console.error('Google registration failed:', error);
      this.showAlert('Google Login Failed', error.message);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
