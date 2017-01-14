/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from './response.model';
import {Employee} from '../employee.model';

export interface EmployeeListResponse extends Response {
  EmployeeList: Employee[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class EmployeeListResult : OperationResult
     {
         public List<EmployeeDTO> EmployeeList { get; set; }
     }
 }
 */
