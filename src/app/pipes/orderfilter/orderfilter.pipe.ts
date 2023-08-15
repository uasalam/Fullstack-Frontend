import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderfilter'
})
export class OrderfilterPipe implements PipeTransform {

  transform(items: any, filter: string): any {
    if(!items || !filter){
      return items;
    }

    return items.filter((items : any) => items.id.toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

}