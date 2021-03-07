import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logList: string[] = [];

  constructor() { }

  log(logtext: string) {
    this.logList.push(logtext);
  }

  getLog() {
    return this.logList;
  }

}
