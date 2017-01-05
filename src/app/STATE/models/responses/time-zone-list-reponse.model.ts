/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from "./response.model";
import {TimeZone} from "../time-zone.model";

export interface TimeZoneListResponse extends Response {
  TimeZoneList: TimeZone[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class TimeZoneListResult : OperationResult
     {
         public List<TimeZoneDTO> TimeZoneList { get; set; }
     }
 }
 */
