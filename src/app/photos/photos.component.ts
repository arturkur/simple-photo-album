import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../web-services/api.service';
import { Photo } from '../web-services/models';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  albumId: number;
  photos: Photo[];

  ngOnInit(): void {
    this.albumId = this.route.snapshot.params.albumId;
    this.spinner.show();
    this.apiService.getAlbumPhotos(this.albumId).subscribe((res) => {
      this.photos = res;
      this.spinner.hide();
    });
  }

}
