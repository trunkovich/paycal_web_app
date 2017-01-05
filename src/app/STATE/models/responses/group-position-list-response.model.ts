/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from "./response.model";
import {GroupPosition} from "../group-position.model";

export interface GroupPositionListResponse extends Response {
  GroupPositionList: GroupPosition[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class GroupPositionListResult : OperationResult
     {
         public List<GroupPositionDTO> GroupPositionList { get; set; }
     }
 }
 */
