import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from '../services/api.service';
import { Photo } from '../services/models';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  constructor(private apiService: ApiService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  albumId: number;
  photos: Photo[];
  showAddImageInput = false;

  photoForm: FormGroup;

  ngOnInit(): void {
    this.albumId = this.route.snapshot.params.albumId;
    this.spinner.show();
    this.apiService.getAlbumPhotos(this.albumId).subscribe((response) => {
      this.photos = response;
      this.spinner.hide();
    });

    this.photoForm = new FormGroup({
      thumbnailUrl: new FormControl(''),
      url: new FormControl(''),
      title: new FormControl('')
    });
  }

  addPicture() {
    let thumbnailUrl = this.photoForm.get('thumbnailUrl').value;
    if (!thumbnailUrl) {
      thumbnailUrl = this.photoForm.get('url').value;
    }

    const newPhoto = {
      albumId: +this.albumId,
      thumbnailUrl: thumbnailUrl,
      url: this.photoForm.get('url').value,
      title: this.photoForm.get('title').value
    };
    this.apiService.addPhoto(newPhoto).subscribe((response) => {
      this.photos.unshift(response);
    });
    this.photoForm.reset();
  }

  deletePicture(id: number) {
    const index = this.photos.findIndex(i => i.id === id);
    this.photos.splice(index, 1);
    this.apiService.deletePhoto(id);
  }

}
