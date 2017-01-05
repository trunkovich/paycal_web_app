/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from "./response.model";

export interface EmployeeSignInResponse extends Response {
  LoginToken: string;
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class EmployeeSignInResult : OperationResult
     {
         public string LoginToken { get; set; }
     }
 }
 */
