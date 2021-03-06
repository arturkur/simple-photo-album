import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Resolve, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { Album, User } from '../services/models';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private spinner: NgxSpinnerService) { }

  userId: number;
  activeUser: User;
  albums: Album[];

  async ngOnInit(): Promise<void> {
    this.userId = this.route.snapshot.params.userId;

    this.spinner.show();
    this.apiService.getUserAlbums(this.userId).subscribe((response) => {
      this.albums = response;
      this.spinner.hide();
    });
  }

}
