import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'heightEdit'
})
export class WeightEditPipe implements PipeTransform {

  transform(value: any, args?: any): any {
  	if (!isNaN(value) ===true) {
  		return String(parseFloat(value)/100) + ' m' ;
  	}
    return value
  }

}
