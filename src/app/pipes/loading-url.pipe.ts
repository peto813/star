import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loadingUrl'
})
export class LoadingUrlPipe implements PipeTransform {

  transform(value: any): any {
    return value.name || 'Loading...';
  }

}
