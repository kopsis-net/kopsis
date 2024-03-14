import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user/user.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full"},
  { path: "dashboard", component: DashboardComponent },
  { path: "landing", component: UserComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
