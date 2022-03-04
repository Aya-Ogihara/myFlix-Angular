import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { DirectorCardComponent } from '../director-card/director-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { UserUpdateFormComponent } from '../user-update-form/user-update-form.component';
import { UserDeleteFormComponent } from '../user-delete-form/user-delete-form.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  FavoriteMovies: any[] = [];
  movies: any[] = [];
  userFavorite: any[] = [];
  inFavorite: boolean = false;

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavoriteMovies();
    this.getMovies();
  }

  /**
   * Use API call to get the user's data
   * @function getUserInfo
   */
  getUserInfo(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      //console.log(res)
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
      return this.FavoriteMovies;
    });
  }

  /**
   * Use API call to get all movies' data
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      //console.log(this.movies);
      this.userFavoriteMovies();
      return this.movies;
    });
  }

  /**
   * Find movie's objects that match the user's favorite movies by movie.id
   */
  userFavoriteMovies(): void {
    let res = [];
    for (let i = 0; i < this.FavoriteMovies.length; i++) {
      res.push(this.movies.find((movie) => movie._id === this.FavoriteMovies[i]));
    }
    //console.log(res)
    this.userFavorite = res;
  }

  /**
   * Navigate user to profile page
   * @function goProfile
   */
  goMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Logging out user
   * @function userLogout
   */
  userLogout(): void {
    localStorage.clear();
    this.snackbar.open('You successfully logged out. see you soon!', 'Bye', {
      duration: 4000,
    });
    this.router.navigate(['welcome']);
  }

  /**
   * Open a dialog to display UserDeleteFormComponent
   */
  deleteUserDialog(): void {
    this.dialog.open(UserDeleteFormComponent, {
      width: '360px',
    });
  }

  /**
   * Open a dialog to display UserDeleteFormComponent
   */
  updateUserDialog(): void {
    this.dialog.open(UserUpdateFormComponent, {
      width: '280px',
    });
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
    //console.log(movie)
    if (this.FavoriteMovies.some((item) => item === movie)) {
      this.inFavorite = true;
      return this.inFavorite;
    } else {
      this.inFavorite = false;
      return (this.inFavorite = false);
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
