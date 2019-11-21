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
  constructor(
    private excelToJsonService: ConvertExcelToJsonService,
    private commonRequestService: CommonRequestService,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

  fileChanged(ev) {
    this.excelToJsonService.convertExcelToJSON(ev.target.files[0]).then(res => {
      console.log(res);
      const excelHeaders = JSON.stringify([
        "Employee Name",
        "Employee ID",
        "Email",
        "Date Of Joining",
        "Designation",
        "Status"
      ]);
      const uploadedHeaders = JSON.stringify(Object.keys(res[0]));
      if (excelHeaders === uploadedHeaders) {
        const employeesArray = [];
        const employeesInvalidList = [];
        for (let i = 0; i < res.length; i++) {
          const reframedObj = {
            companyID: this.storageService.getLocalStorageItem(
              LocalStorageEnums.COMPANY_ID
            ),
            name: res[i]["Employee Name"],
            role: "EMPLOYEE",
            email: res[i]["Email"],
            id: res[i]["Employee ID"],
            dateOfJoining: res[i]["Date Of Joining"],
            status: res[i]["Status"].toLowerCase() === "inactive" ? 0 : 1,
            designation: res[i]["Designation"]
          };
          if (this.isValidEmployeeObject(reframedObj)) {
            employeesArray.push(reframedObj);
          } else {
            employeesInvalidList.push(reframedObj);
          }
        }
        if (employeesInvalidList.length > 0) {
          if (
            confirm(
              employeesInvalidList.length +
                " Employees are invalid. Do you want to still upload the employees."
            ) === true
          ) {
            // upload file api call
            this.uploadEmployees(employeesArray);
            return;
          } else {
            return;
          }
        }
        this.uploadEmployees(employeesArray);
        // upload only valid data
      } else {
        alert(
          "Headers of uploaded excel has been changed... or data is incorrect Please upload with the same headers and valid data"
        );
        return;
      }
    });
  }

  isValidEmployeeObject(reframedObj) {
    const values = Object.values(reframedObj);
    const index = values.indexOf("");
    if (index === -1) {
      if (isNaN(new Date(reframedObj.dateOfJoining).getTime())) {
        return false;
      }
      return true;
    }
    return false;
  }

  uploadEmployees(employeesArray) {
    if (employeesArray.length <= 0) {
      alert(
        "No valid employees exist. Please upload with the valid employees data."
      );
      return;
    } else {
      // uplaoding
    }
  }
}
