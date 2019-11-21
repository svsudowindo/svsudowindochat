import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ConvertExcelToJsonService {

  constructor() { }

  convertExcelToJSON(file: File): Promise<any> {
    let fileReader = new FileReader();
    let jsonObject = [];
    return new Promise((resolve, reject) => {
      fileReader.onloadend = function (event) {
        var data = event.target['result'];
        var workbook = XLSX.read(data, {
          type: 'binary'
        });
        workbook.SheetNames.forEach((sheetName) => {
          // Here is your object
          jsonObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          resolve(jsonObject);
        })
      }
      fileReader.readAsBinaryString(file);
    })
  }
}
