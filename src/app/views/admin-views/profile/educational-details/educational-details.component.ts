import { LoaderService } from './../../../../shared/components/componentsAsService/loader/loader.service';
import { LocalStorageEnums } from 'src/app/shared/constants/localstorage-enums';
import { StorageService } from './../../../../shared/services/storage.service';
import { SnackbarMessengerService } from './../../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import { CommonRequestService } from './../../../../shared/services/common-request.service';
import { RequestEnums } from 'src/app/shared/constants/request-enums';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { QUALIFICATION } from './educational-details.enums';
@Component({
  selector: 'app-educational-details',
  templateUrl: './educational-details.component.html',
  styleUrls: ['./educational-details.component.scss']
})
export class EducationalDetailsComponent implements OnInit {
  qualificationConst = QUALIFICATION;
  educationForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private commonRequestService: CommonRequestService,
    private snackbarMessengerService: SnackbarMessengerService,
    private storageService: StorageService,
    private loaderService:LoaderService) {
    this.initEducationalForm();
  }

  initEducationalForm() {
    this.educationForm = this.formBuilder.group({
      educationalInfo: this.formBuilder.array([this.eachEducationForm()])
    });
    this.setEducationForm();

  }
  setEducationForm(){
    RequestEnums.GET_EDUCATIONAL_DETAILS_BY_ID.values[0]= this.storageService.getLocalStorageItem(LocalStorageEnums.COMPANY_ID);
    this.commonRequestService.request(RequestEnums.GET_EDUCATIONAL_DETAILS_BY_ID).subscribe(res => {
    let educationalInfo = res.data.educationalInfo;
    for (let i=0; i<educationalInfo.length; i++){
      this.addNewQualification();
    }
    this.educationForm.patchValue(res.data);
  });
  }

  eachEducationForm(): FormGroup {
    return this.formBuilder.group({
      qualification: [''],
      instituteName: [''],
      location: [''],
      state: [''],
      startDate: [''],
      endDate: ['']
    });
  }
  ngOnInit() {
  }

  addNewQualification() {
    (this.educationForm.get('educationalInfo') as FormArray).push(this.eachEducationForm());
  }

  deleteEducation(index) {
    (this.educationForm.get('educationalInfo') as FormArray).removeAt(index);
  }
  saveEducation(){
    this.loaderService.showLoading();
    let postbody = this.educationForm.value;
    for(let i=0; i < postbody.length; i++){
      if(postbody[i].endDate !== ''){
        postbody[i].endDate = new Date(postbody[i].endDate).getMilliseconds();
      }
      if(postbody[i].startDate !== ''){
        postbody[i].startDate = new Date(postbody[i].startDate).getMilliseconds();
      }
    }
    RequestEnums.EDUCATIONAL_DETAILS.values[0]= this.storageService.getLocalStorageItem(LocalStorageEnums.COMPANY_ID);
    this.commonRequestService.request(RequestEnums.EDUCATIONAL_DETAILS,postbody).subscribe(res=>{
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
      this.snackbarMessengerService.openSnackBar('Educational Details created successfully', false);

      this.loaderService.hideLoading();
    });
  }
}
