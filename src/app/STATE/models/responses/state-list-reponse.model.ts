/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from './response.model';
import {State} from '../state.model';

export interface StateListResponse extends Response {
  StateList: State[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class StateListResult : OperationResult
     {
         public List<StateDTO> StateList { get; set; }
     }
 }
 */
