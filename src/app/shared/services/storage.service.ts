import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setLocalStorageItem(key: string, value) {
    if (value) {
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    }
  }

  getLocalStorageItem(key) {
    if (key && localStorage.getItem(key)) {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (ex) {
        return localStorage.getItem(key);
      }
    }
  }

  deleteLocalStorageItem(keys) {
    if (keys instanceof Array) {
      for (let i = 0; i < keys.length ; i++) {
        localStorage.removeItem(keys[i]);
      }
    } else {
      localStorage.removeItem(keys);
    }
  }
}
