import { Component } from '@angular/core';

import { employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employee = employee;

  share() {
    window.alert('The employee has been shared!');
  }
}

