/**
 * Created by TrUnK on 05.01.2017.
 */

import {Response} from './response.model';
import {Region} from '../region.model';

export interface RegionListResponse extends Response {
  RegionList: Region[];
}

/**
 using System;
 using System.Collections.Generic;
 using System.Linq;
 using System.Web;

 namespace Paycal.API.Models.Result
 {
     public class RegionListResult : OperationResult
     {
         public List<RegionDTO> RegionList { get; set; }
     }
 }
 */
