/**
 * Created by TrUnK on 11.02.2017.
 */
import {LaborCodeList} from './labor-code-list.model';
import {Employee} from './employee.model';

export interface SearchResults {
  letter: string | null;
  entries: LaborCodeList | Employee[];
}
