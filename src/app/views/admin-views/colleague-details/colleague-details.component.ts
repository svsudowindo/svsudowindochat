import { LocalStorageEnums } from "src/app/shared/constants/localstorage-enums";
import { StorageService } from "src/app/shared/services/storage.service";
import { EncryptDectryptService } from "./../../../shared/services/common/encrypt-decrypt/encrypt-dectrypt.service";
import { ActivatedRoute } from "@angular/router";
import { RequestEnums } from "src/app/shared/constants/request-enums";
import { CommonRequestService } from "src/app/shared/services/common-request.service";
import { Component, OnInit } from "@angular/core";
import { forkJoin } from "rxjs";
import Utils from 'src/app/shared/services/common/utils';
@Component({
  selector: "app-colleague-details",
  templateUrl: "./colleague-details.component.html",
  styleUrls: ["./colleague-details.component.scss"]
})
export class ColleagueDetailsComponent implements OnInit {
  step = 0;
  employeeID = "";
  employeeDetails = {};
  personalDetails = {};
  educationalDetails = {};
  employementDetails = {};
  constructor(
    private commonRequestService: CommonRequestService,
    private activatedRoute: ActivatedRoute,
    private encryptDectryptService: EncryptDectryptService,
    private storageService: StorageService
  ) {
    this.activatedRoute.params.subscribe(res => {
      this.employeeID = this.encryptDectryptService
        .getNormalText(res.id)
        .toString();
    });
  }

  ngOnInit() {
    this.getColleagueDetails();
  }

  getColleagueDetails() {
    this.convertToRequiredUrls();
    forkJoin(
      this.commonRequestService.request(RequestEnums.GET_EMPLOYEE_BY_ID),
      this.commonRequestService.request(
        RequestEnums.GET_PERSONAL_DETAILS_BY_ID
      ),
      this.commonRequestService.request(
        RequestEnums.GET_EDUCATIONAL_DETAILS_BY_ID
      ),
      this.commonRequestService.request(
        RequestEnums.GET_EMPLOYMENT_DETAILS_BY_ID
      )
    ).subscribe(res => {
      this.employeeDetails = res[0].data;
      this.personalDetails = res[1].data;
      this.educationalDetails = res[2].data.educationalInfo;
      this.employementDetails = res[3].data.employementInfo;
    });
  }

  convertToRequiredUrls() {
    RequestEnums.GET_EMPLOYEE_BY_ID.values[0] = this.employeeID;
    RequestEnums.GET_PERSONAL_DETAILS_BY_ID.values[0] = this.storageService.getLocalStorageItem(
      LocalStorageEnums.COMPANY_ID
    );
    RequestEnums.GET_EMPLOYMENT_DETAILS_BY_ID.values[0] = this.storageService.getLocalStorageItem(
      LocalStorageEnums.COMPANY_ID
    );
    RequestEnums.GET_EDUCATIONAL_DETAILS_BY_ID.values[0] = this.storageService.getLocalStorageItem(
      LocalStorageEnums.COMPANY_ID
    );

    RequestEnums.GET_EMPLOYEE_BY_ID.path = RequestEnums.GET_EMPLOYEE_BY_ID.path.replace(
      "token",
      this.employeeID
    );
    RequestEnums.GET_PERSONAL_DETAILS_BY_ID.path = RequestEnums.GET_PERSONAL_DETAILS_BY_ID.path.replace(
      "token",
      this.employeeID
    );
    RequestEnums.GET_EMPLOYMENT_DETAILS_BY_ID.path = RequestEnums.GET_EMPLOYMENT_DETAILS_BY_ID.path.replace(
      "token",
      this.employeeID
    );
    RequestEnums.GET_EDUCATIONAL_DETAILS_BY_ID.path = RequestEnums.GET_EDUCATIONAL_DETAILS_BY_ID.path.replace(
      "token",
      this.employeeID
    );
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getDetailedInfo(info) {
    if (Utils.isValidInput(info)) {
      return info;
    }
    return 'NA';
  }
}
