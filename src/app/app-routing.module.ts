import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { HomeComponent } from './home/home.component';
import { LoggerComponent } from './logger/logger.component';
import { PhotosComponent } from './photos/photos.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "albums/:userId",
    component: AlbumsComponent
  },
  {
    path: "albums/:albumId/photos",
    component: PhotosComponent
  },
  {
    path: "logger",
    component: LoggerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
