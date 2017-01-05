/**
 * Created by TrUnK on 05.01.2017.
 */

export interface GroupSchedule {
  ScheduleID: number;
  GroupID: number;
  UploadDateTime: string | null;
  ScheduleStatusID: number;
  Year: number;
  Month: number;
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models
 {
     public class GroupScheduleDTO
     {
         public int ScheduleID { get; set; }
         public int GroupID { get; set; }
         public DateTime UploadDateTime { get; set; }
         public byte ScheduleStatusID { get; set; }
         public int Year { get; set; }
         public int Month { get; set; }
     }
 }
 */
