
import { Component, OnInit } from '@angular/core';
import { ConvertExcelToJsonService } from '../../../shared/services/common/convert-excel-to-json/convert-excel-to-json.service';
import { CommonRequestService } from '../../../shared/services/common-request.service';
import { RequestEnums } from '../../../shared/constants/request-enums';
import { StorageService } from '../../../shared/services/storage.service';
import { LocalStorageEnums } from 'src/app/shared/constants/localstorage-enums';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private excelToJsonService: ConvertExcelToJsonService,
    private commonRequestService: CommonRequestService,
    private storageService:StorageService
  ) { }

  ngOnInit() {
  }

  fileChanged(ev) {
    this.excelToJsonService.convertExcelToJSON(ev.target.files[0]).then(res => {
      console.log(res);
    })
  }
}
