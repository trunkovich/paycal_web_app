/**
 * Created by TrUnK on 05.01.2017.
 */
import * as moment from 'moment';

export interface LoadedMonth {
  dateString: string; // format YYYY.M
  entries: EmployeeScheduleEntry[];
  loaded: boolean;
  month: number;
  year: number;
}

export interface AvailableMonthsStructure {
  [propName: string]: LoadedMonth; // propname format YYYY.M
}

export interface EmployeeScheduleEntryGroupedByDay {
  date: moment.Moment;
  entries: EmployeeScheduleEntry[];
}

export interface EmployeeScheduleEntry {
  EmployeeScheduleEntryID: number;
  ScheduleID: number;
  ScheduledPersonID: number;
  LaborCode: string;
  ShiftCode: string;
  ShiftMultiple: number;
  Role: string;
  WorkUnitPoints: number | null;
  Year: number;
  Month: number;
  Day: number;
  StartTime: string | null;
  EndTime: string | null;
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models
 {
     public class EmployeeScheduleEntryDTO
     {
         public long EmployeeScheduleEntryID { get; set; }
         public int ScheduleID { get; set; }
         public int ScheduledPersonID { get; set; }
         public string LaborCode { get; set; }
         public string ShiftCode { get; set; }
         public byte ShiftMultiple { get; set; }
         public string Role { get; set; }
         public decimal? WorkUnitPoints { get; set; }
         public int Year { get; set; }
         public int Month { get; set; }
         public int Day { get; set; }

         /// <summary>
         /// NOTE: This field is intended to hold only a TIME value
         /// Read the links listed below to see how to store time values in C# POCOs
         /// - http://stackoverflow.com/questions/2037283/how-do-i-represent-a-time-only-value-in-net
         /// - http://stackoverflow.com/questions/25338784/how-to-insert-a-time-column-into-sql-server
         /// </summary>
         public DateTime? StartTime { get; set; }

         /// <summary>
         /// NOTE: This field is intended to hold only a TIME value
         /// Read the links listed below to see how to store time values in C# POCOs
         /// - http://stackoverflow.com/questions/2037283/how-do-i-represent-a-time-only-value-in-net
         /// - http://stackoverflow.com/questions/25338784/how-to-insert-a-time-column-into-sql-server
         /// </summary>
         public DateTime? EndTime { get; set; }
     }
 }
 */
