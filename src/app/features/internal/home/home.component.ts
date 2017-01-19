import { Component, OnInit } from '@angular/core';
import {EmployeeScheduleEntry} from '../../../STATE/models/employee-schedule-entry.model';
import {CalendarTypes} from '../../../STATE/models/calendar.types';

@Component({
  selector: 'pcl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  entries: EmployeeScheduleEntry[] = [
      {
        'EmployeeScheduleEntryID': 5676,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'OUT',
        'ShiftCode': 'AM',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 1,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5677,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'OUT',
        'ShiftCode': 'PM',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 1,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5680,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'AOC',
        'ShiftCode': '24',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 2,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5679,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'AS at 12',
        'ShiftCode': 'PM',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 2,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5678,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'AT ppsp',
        'ShiftCode': 'AM',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 2,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5681,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'ET',
        'ShiftCode': 'AM',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 3,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5682,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'I-ORa 1 -5',
        'ShiftCode': 'PM',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 3,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5683,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'I-ORa 5 -7',
        'ShiftCode': 'EV',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 3,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5686,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'AOC',
        'ShiftCode': '24',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 3,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5684,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'I-LD1e (1900- 2200)',
        'ShiftCode': 'EV',
        'ShiftMultiple': 1,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 3,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5685,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'I-LD1o',
        'ShiftCode': 'OV',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 3,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5687,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'OFF AM',
        'ShiftCode': 'AM',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 4,
        'StartTime': null,
        'EndTime': null
      },
      {
        'EmployeeScheduleEntryID': 5688,
        'ScheduleID': 9,
        'ScheduledPersonID': 3,
        'LaborCode': 'OFF PM',
        'ShiftCode': 'PM',
        'ShiftMultiple': 0,
        'Role': 'ASN',
        'WorkUnitPoints': null,
        'Year': 2017,
        'Month': 8,
        'Day': 4,
        'StartTime': null,
        'EndTime': null
      }
  ];
  type = CalendarTypes.DAY;
  initialDate = new Date();

  constructor() { }

  ngOnInit() {
  }

  onShiftClick(entry: EmployeeScheduleEntry) {
    console.log(entry.LaborCode);
  }

  onDateChange(date: Date) {
    console.log(date);
  }

}
