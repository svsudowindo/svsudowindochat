import { IConfirmPopup } from "./../../../shared/components/componentsAsService/confirm-dialog/confirm-dialog.model";
import { ConfirmDialogService } from "./../../../shared/components/componentsAsService/confirm-dialog/confirm-dialog.service";
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
  constructor(private confirmDialogService: ConfirmDialogService) {}

  ngOnInit() {}

  openConfirm() {
    let obj: IConfirmPopup = {
      title: "Confirm",
      subtitle: "Sub title",
      message: "Something here as message",
      okLabel: "Ok",
      cancelLabel: "cancel"
    };
    this.confirmDialogService.openConfirmDialog(obj).subscribe(res => {
      console.log(res);
    });
  }
}
