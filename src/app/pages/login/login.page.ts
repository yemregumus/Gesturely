import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule], // Add CommonModule and FormsModule
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
        // Handle login errors
      }
    );
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
