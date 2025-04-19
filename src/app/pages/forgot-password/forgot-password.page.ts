import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MaterialModule],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  async sendPasswordReset() {
    if (!this.email) {
      this.showAlert('Error', 'Please enter your email address.');
      return;
    }

    try {
      await this.afAuth.sendPasswordResetEmail(this.email);
      this.showAlert(
        'Success',
        'Password reset link has been sent to your email.'
      );
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Password reset error:', error);
      this.showAlert('Error', error.message);
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
