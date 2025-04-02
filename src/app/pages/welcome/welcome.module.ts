import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { WelcomePage } from './welcome.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: WelcomePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    WelcomePage,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
