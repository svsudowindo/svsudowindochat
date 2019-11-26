import { EncryptDectryptService } from './../../../services/common/encrypt-decrypt/encrypt-dectrypt.service';
import { LoaderService } from "./../../componentsAsService/loader/loader.service";
import { RequestEnums } from "src/app/shared/constants/request-enums";
import { SnackbarMessengerService } from "./../../componentsAsService/snackbar-messenger/snackbar-messenger.service";
import { CommonRequestService } from "src/app/shared/services/common-request.service";
import { Component, OnInit, AfterViewInit, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../../../services/storage.service";
import { LocalStorageEnums } from "../../../constants/localstorage-enums";
import { ROLES } from "../../../constants/gloabal-variable-enums";
import Utils from "src/app/shared/services/common/utils";

@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"]
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  keyword = "autoComplete";
  autoCompleteResult = [];
  screenWidth: number;
  isSideNavOpen = false;
  isOutSideClick = false;
  roleToAccess = {
    isAdmin: false,
    isSuperAdmin: false,
    isEmployee: false
  };
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.screenWidth = event.target.innerWidth;
    if (this.isSideNavOpen) {
      this.openNav();
    }
  }
  constructor(
    private router: Router,
    private storageService: StorageService,
    private commonRequestService: CommonRequestService,
    private snackbarMessengerService: SnackbarMessengerService,
    private loaderService: LoaderService,
    private encryptDectryptService: EncryptDectryptService
  ) {
    this.screenWidth = window.innerWidth;
    const role = storageService.getLocalStorageItem(LocalStorageEnums.ROLE);
    if (role !== undefined && role !== null) {
      if (role === ROLES.SUPER_ADMIN) {
        this.roleToAccess.isSuperAdmin = true;
        return;
      }
      if (role === ROLES.ADMIN) {
        this.roleToAccess.isAdmin = true;
        return;
      }
      if (role === ROLES.EMPLOYEE) {
        this.roleToAccess.isEmployee = true;
      }
    }
  }

  ngOnInit() {
    this.getAllEmployees();
  }
  selectEvent(ev) {
    this.loaderService.showLoading();
    this.router.navigate(['colleague-details', this.encryptDectryptService.getCipherText(ev._id)]);
    this.loaderService.hideLoading();
  }
  getAllEmployees() {
    this.loaderService.showLoading();
    RequestEnums.GET_ALL_EMPLOYEES_BY_COMPANYID.values[0] = this.storageService.getLocalStorageItem(
      LocalStorageEnums.COMPANY_ID
    );
    this.commonRequestService
      .request(RequestEnums.GET_ALL_EMPLOYEES_BY_COMPANYID)
      .subscribe(res => {
        if (res.errors.length > 0) {
          this.snackbarMessengerService.openSnackBar(res.errors[0], true);
          this.loaderService.hideLoading();
          return;
        }
        if (res.status !== 200 || !Utils.isValidInput(res.data)) {
          this.snackbarMessengerService.openSnackBar(res.message, true);
          this.loaderService.hideLoading();
          return;
        }
        this.autoCompleteResult = res.data;
        this.loaderService.hideLoading();
      });
  }

  ngAfterViewInit() {
    // this.openNav();
  }

  openNav() {
    this.isSideNavOpen = true;
    this.isOutSideClick = true;
    if (this.screenWidth < 576) {
      // very small screens
      document.getElementById("sideNavigation").style.width = "120px";
      // document.getElementById('main').style.marginLeft = '120px';
    } else if (this.screenWidth >= 576 && this.screenWidth < 768) {
      // small screens
      document.getElementById("sideNavigation").style.width = "300px";
      // document.getElementById('main').style.marginLeft = '300px';
    } else if (this.screenWidth >= 768 && this.screenWidth < 992) {
      document.getElementById("sideNavigation").style.width = "400px";
      // document.getElementById('main').style.marginLeft = '400px';
    } else if (this.screenWidth >= 992 && this.screenWidth < 1200) {
      document.getElementById("sideNavigation").style.width = "400px";
      // document.getElementById('main').style.marginLeft = '400px';
    } else {
      document.getElementById("sideNavigation").style.width = "400px";
      // document.getElementById('main').style.marginLeft = '400px';
    }
  }

  closeNav() {
    document.getElementById("sideNavigation").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

  // closing on clicking outside
  outsideClick() {
    if (!this.isOutSideClick) {
      this.closeNav();
    } else {
      this.isOutSideClick = !this.isOutSideClick;
    }
  }
}
