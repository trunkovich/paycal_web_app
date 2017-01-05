/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from "./response.model";
import {EmployeeStatus} from "../employee-status.model";

export interface EmployeeStatusListResponse extends Response {
  EmployeeStatusList: EmployeeStatus[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class EmployeeStatusListResult: OperationResult
     {
         public List<EmployeeStatusDTO> EmployeeStatusList { get; set; }
     }
 }
 */
