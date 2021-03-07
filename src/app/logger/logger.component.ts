import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {

  constructor(private logService: LoggerService) { }

  logData: string[];

  ngOnInit(): void {
    this.logData = this.logService.getLog();
  }

}
