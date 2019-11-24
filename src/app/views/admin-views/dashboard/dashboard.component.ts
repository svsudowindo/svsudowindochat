import { LocalStorageEnums } from "./../../../shared/constants/localstorage-enums";

import { Component, OnInit } from "@angular/core";
import { ConvertExcelToJsonService } from "../../../shared/services/common/convert-excel-to-json/convert-excel-to-json.service";
import { CommonRequestService } from "../../../shared/services/common-request.service";
import { StorageService } from "../../../shared/services/storage.service";
import Utils from "src/app/shared/services/common/utils";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
