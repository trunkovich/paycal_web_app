/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from './response.model';
import {GroupSchedule} from '../group-schedule.model';

export interface GroupScheduleListResponse extends Response {
  GroupScheduleList: GroupSchedule[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class GroupScheduleListResult : OperationResult
     {
         public List<GroupScheduleDTO> GroupScheduleList { get; set; }
     }
 }
 */
