import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album, Photo, User } from './models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }

  getUser(userId: number) {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${userId}`);
  }

  getUserAlbums(userId: number) {
    return this.http.get<Album[]>(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
  }

  getAlbumPhotos(albumId: number) {
    return this.http.get<Photo[]>(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
  }
}
