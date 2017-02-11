/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from './response.model';
import {LaborCodeList} from '../labor-code-list.model';

export interface LaborCodeListResponse extends Response {
  LaborCodeList: LaborCodeList;
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class LaborCodeListResult : OperationResult
     {
         public List<string> LaborCodeList { get; set; }
     }
 }
 */
