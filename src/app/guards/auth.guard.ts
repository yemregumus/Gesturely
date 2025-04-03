import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUser().pipe(
      map((user) => {
        console.log('AuthGuard - User:', user);
        return !!user;
      }),
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/welcome']);
        }
      })
    );
  }
}
