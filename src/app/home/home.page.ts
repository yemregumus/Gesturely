import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { FooterComponent } from '../shared/footer/footer.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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
export class HomePage {
  userEmail: string | null = null;
  username: string | null = null;
  constructor(private authService: AuthService, private router: Router) {
    this.authService.getCurrentUser().subscribe((user) => {
      this.userEmail = user?.email ?? null;
      this.username = user?.displayName ?? null;
    });
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('Logged out successfully');
        this.router.navigate(['/welcome']);
        localStorage.clear();
        sessionStorage.clear();
      },
      (error) => {
        console.error('Logout error:', error);
      }
    );
  }
}
