import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortService {

  constructor() { }
  getSortedData(dataSource, list, displayedColumns, active, direction) {
    // 1. datasource origin mat table data
    // 2. type of array or data
    // 3. listOf columns array  (column data array)
    // 4. sorted coloumn value (sorted column name)
    // 5. sorted direction (sorted column direction)
    const self = this;
    let actvieKeys = [];
    if (active.indexOf('.')) {
      actvieKeys = active.split('.');
    }
    if (displayedColumns.indexOf(actvieKeys[0]) > -1) {
      list = dataSource.filteredData;
      if (direction !== '' && list.length) {
        const keys = Object.keys(list[0]);
        if (keys.indexOf(actvieKeys[0]) > -1) {
          const typeOfData = typeof (self.getValue(list[0], actvieKeys));
          const dir = (direction === 'asc') ? 1 : -1;
          if (typeOfData === 'string') {
            list.sort((a, b) => {
              a = self.getValue(a, actvieKeys) || '';
              b = self.getValue(b, actvieKeys) || '';
              if (!a) {
                return 1;
              }
              if (!b) {
                return -1;
              }
              return (a.toLowerCase().localeCompare(b.toLowerCase())) * dir;
            });
          } else if (typeOfData === 'boolean') {
            list.sort((a, b) => {
              // tslint:disable-next-line:max-line-length
              return (self.getValue(a, actvieKeys).toString().toLowerCase().localeCompare(self.getValue(b, actvieKeys).toString().toLowerCase())) * dir;
            });
          } else {
            list.sort((a, b) => {
              return (a[keys[keys.indexOf(active)]] - b[keys[keys.indexOf(active)]]) * dir;
            });
          }
        }
      }
    }
    return list;
  }

  getValue(data, actvieKeys) {
    let value = data;
    actvieKeys.forEach((x) => {
      value = value ? value[x] : null;
      if (Array.isArray(value)) {
        value = value[0];
      }
    });
    return value;
  }
}
