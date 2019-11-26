import { LoaderService } from './../../../../shared/components/componentsAsService/loader/loader.service';
import { IDataInfo } from "./../../../../shared/components/componentsAsService/popup/popup-info.service";
import { PopupService } from "./../../../../shared/components/componentsAsService/popup/popup.service";
import { SnackbarMessengerService } from "./../../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service";
import { RequestEnums } from "src/app/shared/constants/request-enums";
import { BULK_UPLOAD, POPUP } from "./../../../../shared/constants/popup-enum";
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
  selectedFileName = '';
  constructor(
    private excelToJsonService: ConvertExcelToJsonService,
    private commonRequestService: CommonRequestService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<EmployeesBulkUploadComponent>,
    private snackbarMessengerService: SnackbarMessengerService,
    private popupService: PopupService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {}

  fileChanged(ev) {
    this.selectedFileName = ev.target.files[0].name.split()[0];
    this.excelToJsonService.convertExcelToJSON(ev.target.files[0]).then(res => {
      this.convertedJson = res;
    });
  }

  uploadFile() {
    this.loaderService.showLoading();
    const excelHeaders = JSON.stringify([
      "Employee Name",
      "Employee ID",
      "Email",
      "Date Of Joining",
      "Designation",
      "Status"
    ]);
    let isDuplicateIDexist = false;

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
          if (employeesArray.length > 0) {
            const index = employeesArray.findIndex(
              obj => obj.id === reframedObj.id
            );
            if (index === -1) {
              employeesArray.push(reframedObj);
            } else {
              isDuplicateIDexist = true;
            }
          } else {
            employeesArray.push(reframedObj);
          }
        } else {
          employeesInvalidList.push(reframedObj);
        }
      }
      if (employeesInvalidList.length > 0) {
        if (
          confirm(
              " Only Valid Employee Details will be uploaded remaining will be ignored. Do you want to still upload the employees."
          ) === true
        ) {
          // upload file api call
          this.uploadEmployees(employeesArray, isDuplicateIDexist);
          this.loaderService.hideLoading();
          return;
        } else {
          this.loaderService.hideLoading();
          return;
        }
      }
      this.uploadEmployees(employeesArray, isDuplicateIDexist);
      // upload only valid data
    } else {
      const popupConfig: IDataInfo = {
        type: POPUP.ERROR,
        title: "Error While Uploading",
        message:
          "Headers of uploaded excel has been changed... or data is incorrect Please upload with the same headers and valid data",
        okButtonLabel: "Ok"
      };
      this.popupService.openModal(popupConfig).then(popupRes => {
        this.loaderService.hideLoading();
      });
      return;
    }
  }
  isValidEmployeeObject(reframedObj) {
    const values = Object.values(reframedObj);
    let validInfo = false;
    for (let i = 0 ; i < values.length ; i++) {
      if (!Utils.isValidInput(values[i])) {
        validInfo = false;
        break;
      } else {
        validInfo = true;
      }
    }
    if (!validInfo) {
      return false;
    }
    if (isNaN(new Date(reframedObj.dateOfJoining).getTime())) {
      return false;
    }
    return true;
  }

  uploadEmployees(employeesArray, isDuplicateIDexist) {
    if (isDuplicateIDexist) {
      if (
        confirm(
          "Duplicate IDs will considerd as unique. Do you want to continue ?"
        ) === true
      ) {
        this.finalBulkUpload(employeesArray);
      } else {
        return;
      }
    } else {
      this.finalBulkUpload(employeesArray);
    }
  }

  finalBulkUpload(employeesArray) {
    if (employeesArray.length <= 0) {
      const popupConfig: IDataInfo = {
        title: "Bulk Upload",
        type: POPUP.ERROR,
        message:
        "No valid employees exist. Please upload with the valid employees data.",
        okButtonLabel: "Ok"
      };
      this.popupService.openModal(popupConfig, false).then(res => {
        this.closeDialog();
        this.loaderService.hideLoading();
      });
      return;
    } else {
      // uplaoding
      RequestEnums.EMPLOYEES_BULK_UPLOAD.values[0] = this.storageService.getLocalStorageItem(
        LocalStorageEnums.COMPANY_ID
      );
      this.commonRequestService
        .request(RequestEnums.EMPLOYEES_BULK_UPLOAD, employeesArray)
        .subscribe(res => {
          if (res.errors && res.errors.length > 0) {
            this.snackbarMessengerService.openSnackBar(res.errors[0], true);
            this.loaderService.hideLoading();
            return;
          }
          if (res.status !== 200) {
            this.snackbarMessengerService.openSnackBar(
              "Something went wrong... Please try again",
              true
            );
            this.loaderService.hideLoading();
            return;
          }
          if (res.status === 200 && Utils.isValidInput(res.data)) {
            let invalidCount = 0;
            let validCount = 0;
            if (Utils.isValidInput(res.data.invalidRecords)) {
              invalidCount = res.data.invalidRecords.length;
            }
            if (Utils.isValidInput(res.data.validUserRecords)) {
              validCount = res.data.validUserRecords.length;
            }
            const popupConfig: IDataInfo = {
              title: "Bulk Upload",
              type: POPUP.SUCCESS,
              message:
                validCount +
                " Employees Successfully Uploaded and " +
                invalidCount +
                " has been failed ",
              okButtonLabel: "Ok"
            };
            this.popupService.openModal(popupConfig, false).then(popupRes => {
              this.dialogRef.close(BULK_UPLOAD.SUCCESS);
              this.loaderService.hideLoading();
            });
          }
        });
    }
  }

  closeDialog() {
    this.dialogRef.close(BULK_UPLOAD.CLOSE);
  }
}
