/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from "./response.model";
import {MasterCalendarEntry} from "../master-calendar-entry.model";

export interface MasterCalendarEntryListResponse extends Response {
  MasterCalendarEntryList: MasterCalendarEntry[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class MasterCalendarEntryListResult : OperationResult
     {
         public List<MasterCalendarEntryDTO> MasterCalendarEntryList { get; set; }
     }
 }
 */
