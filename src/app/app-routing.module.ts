import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page'; // Import the standalone LoginPage component
import { HomePage } from './home/home.page'; // Example, make sure to import the HomePage

const routes: Routes = [
  {
    path: 'home',
    component: HomePage, // Update to use component instead of loadChildren
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module').then(
        (m) => m.WelcomePageRoutingModule
      ),
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage, // Directly use the LoginPage component here
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
