/**
 * Created by TrUnK on 05.01.2017.
 */

export interface MasterCalendarEntry {
  MasterCalendarEntryID: number;
  ScheduleID: number;
  GroupID: number;
  SchedulePersonID: number;
  LaborCode: string;
  ShiftCode: string;
  ShiftMultiple: number;
  ReferenceTypeID: number;
  Year: number;
  Month: number;
  Day: number;
}

interface CalendarEntry {
  ScheduleID: number;
  ScheduledPersonID: number;
  LaborCode: string;
  ShiftCode: string;
  ShiftMultiple: number;
  Year: number;
  Month: number;
  Day: number;
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models
 {
     public class MasterCalendarEntryDTO
     {
         public long MasterCalendarEntryID { get; set; }
         public int ScheduleID { get; set; }
         public int GroupID { get; set; }
         public int SchedulePersonID { get; set; }
         public string LaborCode { get; set; }
         public string ShiftCode { get; set; }
         public byte ShiftMultiple { get; set; }
         public byte ReferenceTypeID { get; set; }
         public int Year { get; set; }
         public int Month { get; set; }
         public int Day { get; set; }
     }
 }
 */
