import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { LoggerService } from '../services/logger.service';
import { Photo } from '../services/models';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private spinner: NgxSpinnerService, private logService: LoggerService) { }

  albumId: number;
  photos: Photo[];
  photoForm: FormGroup;

  ngOnInit(): void {
    this.albumId = this.route.snapshot.params.albumId;
    this.spinner.show();
    this.apiService.getAlbumPhotos(this.albumId).subscribe((response) => {
      this.photos = response;
      this.spinner.hide();
    });

    this.photoForm = new FormGroup({
      url: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required])
    });
  }

  addPhoto() {
    const newPhoto = {
      albumId: +this.albumId,
      thumbnailUrl: "",
      url: this.photoForm.get('url').value,
      title: this.photoForm.get('title').value
    };
    this.spinner.show();
    this.apiService.addPhoto(newPhoto).subscribe((response) => {
      this.photos.unshift(response);
      console.log(response);
      this.spinner.hide();
    });
    this.photoForm.reset();
    this.logService.log(new Date().toLocaleString() + " - One picture added to album " + this.albumId);
  }

  deletePhoto(index: number) {
    this.photos.splice(index, 1);
    this.apiService.deletePhoto(this.photos[index].id);
    this.logService.log(new Date().toLocaleString() + " - One picture deleted from album " + this.albumId);
  }

}
