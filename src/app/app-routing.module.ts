import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditCardComponent } from './add-edit-card/add-edit-card.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-card', component: AddEditCardComponent },
  { path: 'edit-card/:index', component: AddEditCardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
