import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    FooterComponent,
  ],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        console.log('Logged in successfully:', response);
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }

  register() {
    this.router.navigate(['/register']);
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  googleLogin() {
    this.authService.googleLogin().subscribe(
      (response) => {
        console.log('Google login successful:', response);
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Google login error:', error);
      }
    );
  }

  phoneLogin() {
    this.router.navigate(['/phone-login']);
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
      }
    });
  }
}
