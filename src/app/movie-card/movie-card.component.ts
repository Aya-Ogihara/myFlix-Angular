import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  FavoriteMovies: any[] = [];
  user: any[] = [];
  inFavorite: boolean = false;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Use API call to get all movies' data
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      //console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Use API call to get the user's favorite movies
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.FavoriteMovies = res.FavoriteMovies;
      //console.log(this.FavoriteMovies);
    });
  }

  /**
   * Navigate user to profile page
   * @function goProfile
   */
  goProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logging out user 
   * @function userLogout
   */
  userLogout(): void {
    localStorage.clear();
    this.snackbar.open('You successfully logged out. see you soon!', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }

  /**
   * Open a dialog to display DirectorCardComponent
   * @param name {string}
   * @param bio {string}
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name: name, bio: bio },
      width: '360px',
    });
  }

  /**
   * Open a dialog to display GenreCardComponent
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name: name, description: description },
      width: '360px',
    });
  }

  /**
   * Open a dialog to display SynopsisCardComponent
   * @param title {string}
   * @param description {string}
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title: title, description: description },
      width: '360px',
    });
  }

  /**
   * Use API call to add a movie into user's favorite movie
   * @param movie {string}
   * @param title {string}
   */
  addFavoriteMovie(movie: string, title: string): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.addFavorite(user, movie).subscribe((res: any) => {
      this.snackbar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 4000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * Use API call to remove a movie from user's favorite movie
   * @param movie {string}
   * @param title {string}
   */
  removeFavoriteMovie(movie: string, title: string): void {
    this.fetchApiData.deleteFavorite(movie).subscribe((res: any) => {
      this.snackbar.open(
        `${title} has been removed from your favorites.`,
        'OK',
        {
          duration: 4000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * Check if the movie is in the user's favorite movie list
   * @param movie {string} 
   * @returns boolean
   */
  isFavorite(movie: string): any {
    if (this.FavoriteMovies.some((item) => item === movie)) {
      this.inFavorite = true;
      return this.inFavorite;
    } else {
      this.inFavorite = false;
      return this.inFavorite;
    }
  }
  
  /**
   * toggle add/remove functions for user's favorite movies list
   * @param movie {any}
   */
  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.removeFavoriteMovie(movie._id, movie.Title);
    } else {
      this.addFavoriteMovie(movie._id, movie.Title);
    }
  }
}
