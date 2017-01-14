/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from './response.model';
import {EmployeeScheduleEntry} from '../employee-schedule-entry.model';

export interface EmployeeScheduleEntryListResponse extends Response {
  EmployeeScheduleEntryList: EmployeeScheduleEntry[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class EmployeeScheduleEntryListResult : OperationResult
     {
         public List<EmployeeScheduleEntryDTO> EmployeeScheduleEntryList { get; set; }
     }
 }
 */
