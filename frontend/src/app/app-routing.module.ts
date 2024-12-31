import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FolderListComponent } from './pages/folder-list/folder-list.component';
import { AuthGuard } from './guards/AuthGuard';
import { FileListComponent } from './pages/file-list/file-list.component';
import {AdminGuard} from "./guards/AdminGuard";
import {
  AdminDashboardManagementComponent
} from "./pages/admin-dashboard/components/admin-dashboard-management/admin-dashboard-management.component";
import {HomeComponent} from "./pages/home/home.component";
import {AlertManagementComponent} from "./pages/admin-dashboard/components/alert-management/alert-management.component";

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"",component:HomeComponent,canActivate: [AuthGuard],},
  {path:"folder/:id",component:FileListComponent,canActivate: [AuthGuard],},
  {path:"**",pathMatch:'full',redirectTo:"/"},
  {path:"admin", component: AdminDashboardManagementComponent,canActivate: [AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
