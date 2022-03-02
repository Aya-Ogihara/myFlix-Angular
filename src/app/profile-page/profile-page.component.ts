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
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  FavoriteMovies: any[] = []
  movies: any[] = []
  userFavorite: any[] = []

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavoriteMovies();
    this.getMovies();
  }

  getUserInfo(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      //console.log(res)
    })
  }

  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.FavoriteMovies = res.FavoriteMovies;
      //console.log(this.FavoriteMovies);
      return this.FavoriteMovies
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      //console.log(this.movies);
      this.userFavoriteMovies();
      return this.movies;
    });
  }

  userFavoriteMovies(): void {
    let res = []
    for(let i = 0; i < this.FavoriteMovies.length; i++) {
      res.push(this.movies.find(e => e._id === this.FavoriteMovies[i]))
    }
    //console.log(res)
    this.userFavorite = res
  }

  goMovies(): void {
    this.router.navigate(['movies'])
  }

  userLogout(): void {
    localStorage.clear();
    this.snackbar.open('You successfully logged out. see you soon!', 'Bye', {
      duration: 4000
    });
    this.router.navigate(['welcome'])
  }

  deleteUserDialog(): void {
    this.dialog.open(UserDeleteFormComponent, {
      width: '360px',
    });
    // this.fetchApiData.deleteUser(this.userName).subscribe((res) => {
    //   this.snackbar.open('Your account has been removed', 'Bye', {
    //     duration: 4000
    //   });
    //   localStorage.clear();
    // });
    // this.router.navigate(['welcome'])
  }

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorCardComponent, {
      data: { name: name, bio: bio },
      width: '360px',
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { name: name, description: description },
      width: '360px',
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: { title: title, description: description },
      width: '360px',
    });
  }

  addFavoriteMovie(movie: string, title: string): void {
    this.fetchApiData.addFavorite(movie).subscribe((res: any) => {
      this.snackbar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 4000,
      });
      console.log(this.FavoriteMovies);
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

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

  isFavorite(movie: string): boolean {
    return this.FavoriteMovies.some(item => item._id === movie)
  }

  toggleFavorite(movie: any): void {
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title)
  }
}
