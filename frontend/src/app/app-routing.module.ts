import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/AuthGuard';
import { FileListComponent } from './pages/file-list/file-list.component';
import {AdminGuard} from "./guards/AdminGuard";
import {
  AdminDashboardManagementComponent
} from "./pages/admin-dashboard/components/admin-dashboard-management/admin-dashboard-management.component";
import {HomeComponent} from "./pages/home/home.component";
import {ErrorComponent} from "./pages/error/error.component";
import {AlertSenderComponent} from "./pages/alert-sender/alert-sender.component";
import {AlertHistoryComponent} from "./pages/alert-history/alert-history.component";
import {
  NonDiffusionGroupManagementComponent
} from "./pages/non-diffusion-group-management/non-diffusion-group-management.component";

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:HomeComponent,canActivate: [AuthGuard],},
  {path:"folder/:id",component:FileListComponent,canActivate: [AuthGuard],},
  {path:"error", component: ErrorComponent},
  {path:"dashboard", component: AdminDashboardManagementComponent, canActivate:[AdminGuard]},
  {path:"groupes", component: NonDiffusionGroupManagementComponent, canActivate:[AdminGuard]},
  { path: 'send-alert', component: AlertSenderComponent,canActivate: [AuthGuard]},
  { path: 'mes-alertes', component: AlertHistoryComponent,canActivate: [AuthGuard]},
  {path:"**",pathMatch:'full',redirectTo:"error"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
