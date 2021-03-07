import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { LoggerService } from '../services/logger.service';
import { Album } from '../services/models';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private spinner: NgxSpinnerService, private logService: LoggerService) { }

  userId: number;
  albums: Album[];
  albumsTotal: number;
  albumsCreated: number = 0;
  albumsDeleted: number = 0;

  ngOnInit(): void {
    this.userId = this.route.snapshot.params.userId;

    this.spinner.show();
    this.apiService.getUserAlbums(this.userId).subscribe((response) => {
      this.albums = response;
      this.albumsTotal = this.albums.length;
      this.spinner.hide();
    });
  }

  addAlbum(title) {
    const newAlbum = {
      userId: +this.userId,
      title: title
    };
    this.spinner.show();
    this.apiService.addAlbum(newAlbum).subscribe((response) => {
      this.albums.push(response);
      this.albumsTotal = this.albums.length;
      this.albumsCreated++;
      this.logService.log(new Date().toLocaleString() + " - User with ID " + this.userId + " created one album.");
      this.spinner.hide();
    });
  }

  deleteAlbum(index: number) {
    this.apiService.deleteAlbum(this.albums[index].id);
    this.albums.splice(index, 1);
    this.albumsTotal = this.albums.length;
    this.albumsDeleted++;
    this.logService.log(new Date().toLocaleString() + " - User with ID " + this.userId + " deleted one album");
  }

}
