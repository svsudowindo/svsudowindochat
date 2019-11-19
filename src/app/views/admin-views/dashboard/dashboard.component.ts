
import { Component, OnInit } from '@angular/core';
import { ConvertExcelToJsonService } from '../../../shared/services/common/convert-excel-to-json/convert-excel-to-json.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private excelToJsonService: ConvertExcelToJsonService
  ) { }

  ngOnInit() {
  }

  fileChanged(ev) {
    this.excelToJsonService.convertExcelToJSON(ev.target.files[0]).then(res => {
      console.log(res);
    })
  }
}
