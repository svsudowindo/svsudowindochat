import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'underscoreRemoval'
})
export class UnderscoreRemovalPipe implements PipeTransform {

  transform(value: any): any {
    return value.replace('_', ' ');
  }

}
