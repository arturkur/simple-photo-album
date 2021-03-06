import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album, Photo, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  activeUser: User;

  getAllUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  getUser(userId: number) {
    if (userId === this.activeUser.id) {
      return this.activeUser;
    } else {
      this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`).subscribe((res) => {
        this.activeUser = res;
        return this.activeUser;
      });
    }
  }

  getUserAlbums(userId: number) {
    return this.http.get<Album[]>(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  }

  getAlbumPhotos(albumId: number) {
    return this.http.get<Photo[]>(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  }

  addPhoto(photo) {
    return this.http.post<Photo>('https://jsonplaceholder.typicode.com/photos/', photo);
  }

  deletePhoto(photoId: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
  }
}
