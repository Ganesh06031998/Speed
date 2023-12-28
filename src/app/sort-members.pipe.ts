import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortMembers'
})
export class SortMembersPipe implements PipeTransform {
    transform(members: any[], sortBy: string = 'Name'): any[] {
        if (!members || members.length === 0) {
          return members; // No need to sort an empty array
        }
    
        return members.sort((a, b) => {
          const valueA = a[sortBy].toLowerCase();
          const valueB = b[sortBy].toLowerCase();
          return valueA.localeCompare(valueB);
        });
      }
}