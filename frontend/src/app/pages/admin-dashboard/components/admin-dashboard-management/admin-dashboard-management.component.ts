import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard-management',
  templateUrl: './admin-dashboard-management.component.html',
  styleUrl: './admin-dashboard-management.component.scss'
})
export class AdminDashboardManagementComponent {
  currentSection: string = 'alerts';
}
