import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(public fetchApiData: UserRegistrationService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      //console.log(this.movies);
      return this.movies;
    });
  }

  openDirectorDialog(
    name: string,
    bio: string,
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {name: name, bio: bio},
      width: '360px',
    });
  }

  openGenreDialog(
    name: string,
    description: string,
  ): void {
    this.dialog.open(GenreCardComponent, {
      data: {name: name, description: description},
      width: '360px',
    });
  }

  openSynopsisDialog(
    title: string,
    description: string,
  ): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {title: title, description: description},
      width: '360px',
    });
  }
}
