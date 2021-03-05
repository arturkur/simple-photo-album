import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../web-services/api.service';
import { Album, User } from '../web-services/models';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  userId: number;
  albums: Album[];

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.userId;
    this.apiService.getUserAlbums(this.userId).subscribe((res) => {
      this.albums = res;
    });
  }

}
