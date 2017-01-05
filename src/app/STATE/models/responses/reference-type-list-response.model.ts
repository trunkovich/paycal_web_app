/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from "./response.model";
import {ReferenceType} from "../reference-type.model";

export interface ReferenceTypeListResponse extends Response {
  ReferenceTypeList: ReferenceType[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class ReferenceTypeListResult : OperationResult
     {
         public List<ReferenceTypeDTO> ReferenceTypeList { get; set; }
     }
 }
 */
