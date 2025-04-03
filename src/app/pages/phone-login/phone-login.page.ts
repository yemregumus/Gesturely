import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import firebase from 'firebase/compat/app'; // Import firebase for PhoneAuthProvider

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.page.html',
  styleUrls: ['./phone-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PhoneLoginPage {
  phoneNumber: string = '';
  otpCode: string = '';
  verificationId: any;
  recaptchaVerifier!: RecaptchaVerifier;

  @ViewChild('recaptchaContainer', { static: true })
  recaptchaContainer!: ElementRef;

  constructor(
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController
  ) {}

  async sendOTP() {
    const auth = getAuth();
    this.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'normal',
      }
    );

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        this.phoneNumber,
        this.recaptchaVerifier
      );
      this.verificationId = confirmationResult.verificationId;
      this.showAlert('OTP Sent', 'Please check your messages for the OTP.');
    } catch (error) {
      this.showAlert(
        'Error',
        (error as Error).message || 'An unknown error occurred.'
      );
    }
  }

  async verifyOTP() {
    try {
      const credential = await this.afAuth.signInWithCredential(
        firebase.auth.PhoneAuthProvider.credential(
          this.verificationId,
          this.otpCode
        )
      );
      this.showAlert('Success', 'You are now logged in.');
    } catch (error) {
      this.showAlert(
        'Error',
        (error as Error).message || 'An unknown error occurred.'
      );
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
