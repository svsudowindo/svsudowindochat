
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  fileChanged(ev) {
    console.log(ev);
    let fileReader = new FileReader()
    fileReader.readAsBinaryString(ev.target.files[0]);
    fileReader.onload = function (event) {
      var data = event.target['result'];
      var workbook = XLSX.read(data, {
        type: 'binary'
      });
      workbook.SheetNames.forEach(function (sheetName) {
        // Here is your object
        var XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log(XL_row_object);
      })
    }
  }
}
