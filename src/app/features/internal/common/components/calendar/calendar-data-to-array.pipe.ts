import { Pipe, PipeTransform } from '@angular/core';
import {CalendarView} from './calendar.class';

@Pipe({
  name: 'calendarDataToArray'
})
export class CalendarDataToArrayPipe implements PipeTransform {

  transform(value: CalendarView, args?: any): any {
    if (!value || !value.day || !value.month || !value.year || !value.day.length || !value.month.length || !value.year.length) {
      return [];
    }
    return ['day', 'month', 'year'].map(key => {
      return {type: key, value: value[key]};
    });
  }

}
