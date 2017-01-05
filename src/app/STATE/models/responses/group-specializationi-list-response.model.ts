/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from "./response.model";
import {GroupSpecialization} from "../group-specialization.model";

export interface GroupSpecializationListResponse extends Response {
  GroupSpecializationList: GroupSpecialization[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class GroupSpecializationListResult : OperationResult
     {
         public List<GroupSpecializationDTO> GroupSpecializationList { get; set; }
     }
 }
 */
