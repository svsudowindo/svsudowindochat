import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: any;
  uri = 'ws://localhost:4500';
  initSubscriber = new Subject();
  receiveSubscriber = new Subject();
  constructor() {
    this.socket = io(this.uri);
  }

  init(fromIDInput, toIDInput) {
    this.socket.on('init', (data) => {
      this.initSubscriber.next(data);
    });
    const obj = {
      fromID: fromIDInput,
      toID: toIDInput
    };
    this.socket.emit('init', { obj });
  }
  sendMessage(obj) {
    console.log(obj);
    this.socket.emit('send', { obj });
  }

  receiveMessage() {
    this.socket.on('receive', (data) => {
      this.receiveSubscriber.next(data);
    });
  }
  emitter(eventName, data) {
    this.socket.emit(eventName, data);
  }
}
