import { Component, OnInit } from '@angular/core';
import { RequestEnums } from '../../../shared/constants/request-enums';
import { LoaderService } from '../../../shared/components/componentsAsService/loader/loader.service';
import { LocalStorageEnums } from 'src/app/shared/constants/localstorage-enums';
import { StorageService } from '../../../shared/services/storage.service';
import { CommonRequestService } from '../../../shared/services/common-request.service';
import { SnackbarMessengerService } from '../../../shared/components/componentsAsService/snackbar-messenger/snackbar-messenger.service';
import Utils from '../../../shared/services/common/utils';
import { Router } from '@angular/router';
import { SearchService } from '../../../shared/services/common/search/search.service';
import { AfterViewInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {
  usersList = [];
  searchList = [];
  selectedChat: any;
  currentUserID = '';
  searchValue = '';
  messages = [];
  textMessage = '';
  constructor(
    private loaderService: LoaderService,
    private storageService: StorageService,
    private commonRequestService: CommonRequestService,
    private snackbarMessengerService: SnackbarMessengerService,
    private router: Router,
    private searchService: SearchService,
    private chatService: ChatService
  ) {
    this.currentUserID = this.storageService.getLocalStorageItem(LocalStorageEnums.TOKEN).toString();
    this.getAllEmployees();
  }

  ngAfterViewInit() {
    const objDiv = document.getElementById('message-body-container');
    objDiv.scrollTop = objDiv.scrollHeight;
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
        this.loaderService.hideLoading();
        const index = res.data.findIndex(obj => obj._id === this.currentUserID);
        if (index !== -1) {
          res.data.splice(index, 1);
        }
        this.usersList = res.data;
        this.searchList = Utils.avoidShallowClone(res.data);
        this.selectedChat = this.usersList[0];
        this.callSocketInfo();
        this.recivedMessages();
        this.router.navigate(['chat', this.currentUserID, this.selectedChat._id]);
      });
  }

  callSocketInfo() {
    this.chatService.receiveMessage();
    this.chatService.init(this.storageService.getLocalStorageItem(LocalStorageEnums.TOKEN), this.selectedChat._id);
  }

  recivedMessages() {
    this.chatService.receiveSubscriber.subscribe(receivedMessage => {
      const sampleMessages = [];
      for (let message in receivedMessage) {
        sampleMessages.push(receivedMessage[message]);
      }
      this.messages = sampleMessages;
      console.log(this.messages);
    });
  }

  sendMessage() {
    const obj = {
      fromID: this.selectedChat._id,
      toID: this.storageService.getLocalStorageItem(LocalStorageEnums.TOKEN),
      message: this.textMessage,
      date: new Date().getTime()
    };
    this.messages.push(obj);
    this.chatService.sendMessage(obj);
    this.textMessage = '';
  }

  userChanged(changedUser) {
    this.selectedChat = changedUser;
    this.searchValue = '';
    this.searchUser();
    this.router.navigate(['chat', this.currentUserID, this.selectedChat._id]);
  }

  searchUser() {
    const filteredList = this.searchService.searchFilterArrayOfJson(this.searchList, this.searchValue, ['id', 'name']);
    this.usersList = filteredList;
  }
  ngOnInit() {
  }

}
