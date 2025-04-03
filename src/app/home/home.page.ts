import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HomePage {
  constructor(private authService: AuthService, private router: Router) {} // Inject Router here

  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
        this.router.navigate(['/welcome']); // Use the injected Router
        // clear cache
        localStorage.clear();
        sessionStorage.clear();
        // Optionally, you can also clear any other authentication-related data
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }
}
