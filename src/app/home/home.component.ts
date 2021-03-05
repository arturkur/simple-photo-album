import { Component, OnInit } from '@angular/core';
import { ApiService } from '../web-services/api.service';
import { User } from '../web-services/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[];
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

}
