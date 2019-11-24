import { SnackbarMessengerService } from "./../../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service";
import { RequestEnums } from "src/app/shared/constants/request-enums";
import { BULK_UPLOAD } from "./../../../../shared/constants/popup-enum";
import { Component, OnInit } from "@angular/core";
import { StorageService } from "src/app/shared/services/storage.service";
import { CommonRequestService } from "src/app/shared/services/common-request.service";
import { ConvertExcelToJsonService } from "src/app/shared/services/common/convert-excel-to-json/convert-excel-to-json.service";
import { LocalStorageEnums } from "src/app/shared/constants/localstorage-enums";
import { MatDialogRef } from "@angular/material";
import Utils from "src/app/shared/services/common/utils";

@Component({
  selector: "app-employees-bulk-upload",
  templateUrl: "./employees-bulk-upload.component.html",
  styleUrls: ["./employees-bulk-upload.component.scss"]
})
export class EmployeesBulkUploadComponent implements OnInit {
  convertedJson = [];
  constructor(
    private excelToJsonService: ConvertExcelToJsonService,
    private commonRequestService: CommonRequestService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<EmployeesBulkUploadComponent>,
    private snackbarMessengerService: SnackbarMessengerService
  ) {}

  ngOnInit() {}

  fileChanged(ev) {
    this.excelToJsonService.convertExcelToJSON(ev.target.files[0]).then(res => {
      this.convertedJson = res;
    });
  }

  uploadFile() {
    const excelHeaders = JSON.stringify([
      "Employee Name",
      "Employee ID",
      "Email",
      "Date Of Joining",
      "Designation",
      "Status"
    ]);
    const uploadedHeaders = JSON.stringify(Object.keys(this.convertedJson[0]));
    if (excelHeaders === uploadedHeaders) {
      const employeesArray = [];
      const employeesInvalidList = [];
      for (let i = 0; i < this.convertedJson.length; i++) {
        const reframedObj = {
          companyID: this.storageService.getLocalStorageItem(
            LocalStorageEnums.COMPANY_ID
          ),
          name: this.convertedJson[i]["Employee Name"],
          role: "EMPLOYEE",
          email: this.convertedJson[i]["Email"],
          id: this.convertedJson[i]["Employee ID"],
          dateOfJoining: this.convertedJson[i]["Date Of Joining"],
          status:
            this.convertedJson[i]["Status"].toLowerCase() === "inactive"
              ? 0
              : 1,
          designation: this.convertedJson[i]["Designation"]
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
      this.snackbarMessengerService.openSnackBar(
        "Headers of uploaded excel has been changed... or data is incorrect Please upload with the same headers and valid data",
        true
      );
      return;
    }
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
      this.snackbarMessengerService.openSnackBar(
        "No valid employees exist. Please upload with the valid employees data.",
        true
      );
      return;
    } else {
      // uplaoding
      RequestEnums.EMPLOYEES_BULK_UPLOAD.values[0] = this.storageService.getLocalStorageItem(
        LocalStorageEnums.COMPANY_ID
      );
      this.commonRequestService
        .request(RequestEnums.EMPLOYEES_BULK_UPLOAD, employeesArray)
        .subscribe(res => {
          console.log(res);
          if (res.errors && res.errors.length > 0) {
            this.snackbarMessengerService.openSnackBar(res.errors[0], true);
            return;
          }
          if (res.status !== 200) {
            this.snackbarMessengerService.openSnackBar(
              "Something went wrong... Please try again",
              true
            );
            return;
          }
          if (res.status === 200 && Utils.isValidInput(res.data)) {
            let invalidCount = 0;
            let validCount = 0;
            if (Utils.isValidInput(res.data.invalidRecords)) {
              invalidCount = res.data.invalidRecords.length;
            }
            if (Utils.isValidInput(res.data.validRecords)) {
              console.log('inside valid');
              validCount = res.data.validRecords.length;
            }
            let message = "";
            if (validCount === 0 && invalidCount === 0) {
              message =
                "No employees Uploaded ... Please try again with valid Data";
            }
            if (validCount > 0) {
              message = validCount + " has been successfully uploaded";
            }
            if (invalidCount > 0) {
              message =
                message + " and " + invalidCount + " has not been uploaded";
            }
            this.snackbarMessengerService.openSnackBar(
              validCount +
                " Employees Successfully Uploaded and " +
                invalidCount +
                " has been failed ",
              false
            );
            this.dialogRef.close(BULK_UPLOAD.SUCCESS);
          }
        });
    }
  }

  closeDialog() {
    this.dialogRef.close(BULK_UPLOAD.CLOSE);
  }
}
