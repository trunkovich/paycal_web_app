/**
 * Created by TrUnK on 05.01.2017.
 */

export interface TimeZone {
  TimeZoneID: number;
  Name: string;
  DisplayLabel: string;
  DisplayOrder: number;
  UtcAdjustment: number;
  DotNetID: string;
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models
 {
     public class TimeZoneDTO
     {
         public int TimeZoneID { get; set; }
         public string Name { get; set; }
         public string DisplayLabel { get; set; }
         public int DisplayOrder { get; set; }
         public int UtcAdjustment { get; set; }
         public string DotNetID { get; set; }
     }
 }
 */
