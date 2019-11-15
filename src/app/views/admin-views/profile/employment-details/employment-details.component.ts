import { LocalStorageEnums } from 'src/app/shared/constants/localstorage-enums';
import { SnackbarMessengerService } from './../../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import { LoaderService } from './../../../../shared/components/componentsAsService/loader/loader.service';
import { StorageService } from './../../../../shared/services/storage.service';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { CommonRequestService } from './../../../../shared/services/common-request.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-employment-details',
  templateUrl: './employment-details.component.html',
  styleUrls: ['./employment-details.component.scss']
})
export class EmploymentDetailsComponent implements OnInit {

  employmentForm: FormGroup; 
  constructor(private formBuilder: FormBuilder,
  private commonRequestService: CommonRequestService,
  private storageService: StorageService,
  private loaderService: LoaderService,
  private snackbarMessengerService: SnackbarMessengerService
  ) {
    this.initEmploymentForm();
  }
  initEmploymentForm() {
    this.employmentForm = this.formBuilder.group({
      employementInfo: this.formBuilder.array([this.eachEmploymentForm()])
    });
    this.setEmploymentForm();
  }
  setEmploymentForm(){
    RequestEnums.GET_EMPLOYMENT_DETAILS_BY_ID.values[0] = this.storageService.getLocalStorageItem(LocalStorageEnums.COMPANY_ID);
    this.commonRequestService.request(RequestEnums.GET_EMPLOYMENT_DETAILS_BY_ID).subscribe(res =>{
      let employementInfo = res.data.employementInfo;
      for (let i = 0; i < employementInfo.length-1; i++) {
        this.addNewEmployment();
      }
      this.employmentForm.patchValue(res.data);
    });
  }
  eachEmploymentForm(): FormGroup {
    return this.formBuilder.group({
      previousCompanyName: [''],
      previousCompanyID: [''],
      location: [''],
      role: [''],
      startDate: [''],
      endDate: ['']
    });
  }
  ngOnInit() {
  }
  addNewEmployment() {
    (this.employmentForm.get('employementInfo') as FormArray).push(this.eachEmploymentForm());
  }

  deleteemployment(index) {
    (this.employmentForm.get('employementInfo') as FormArray).removeAt(index);
  }

  saveEmployment() {
    this.loaderService.showLoading();
    let postbody = this.employmentForm.value;
    for(let i=0; i < postbody.length; i++){
      if(postbody[i].endDate !== ''){
        postbody[i].endDate = new Date(postbody[i].endDate).getMilliseconds();
      }
      if(postbody[i].startDate !== ''){
        postbody[i].startDate = new Date(postbody[i].startDate).getMilliseconds();
      }
    }
    RequestEnums.EMPLOYMENT_DETAILS.values[0] = this.storageService.getLocalStorageItem(LocalStorageEnums.COMPANY_ID);
    this.commonRequestService.request(RequestEnums.EMPLOYMENT_DETAILS,postbody).subscribe(res => {
      if (res.errors.length > 0) {
        this.loaderService.hideLoading();
        this.snackbarMessengerService.openSnackBar(res.errors[0], true);
        return;
      }
      if (res.status !== 200 || res.data === undefined || res.data === null) {
        this.loaderService.hideLoading();
        this.snackbarMessengerService.openSnackBar(res.message, true);
        return;
      }
      this.snackbarMessengerService.openSnackBar('Employment Details created successfully', false);

      this.loaderService.hideLoading();
    });
  }
}
