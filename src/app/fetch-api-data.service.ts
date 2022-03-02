import { Injectable } from '@angular/core';

//import { catchError } from 'rxjs/internal/operators'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators'


const apiUrl = 'http://aya-myflix.herokuapp.com'
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    )
  }


  // User login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    )
  }


  // Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  // Get one movie
  getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/movies/${title}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }



  // Get director
  getDirector(director: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/directors/${director}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }



  // Get genre
  getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/genres/${genre}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }



  // Get user
  getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/users/${user}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }



  // Get favorite movies for a user
  getFavorite(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}/users/${user}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  // Add a movie to favorite Movies
  addFavorite(user: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}/users/${user}/movies/${movieId}`, null, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }



  // Edit user
  updateUser(user: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(`${apiUrl}/users/${user}`, userDetails,{headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }



  // Delete user
  deleteUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}/users/${user}`,{headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }



  // Delete a movie from the favorite movies
  deleteFavorite(movie: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http.delete(`${apiUrl}/users/${user}/movies/${movie}`,{headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }



  
  private extractResponseData(res: any): any {
    const body = res;
    return body || {}
  }


  private handleError(error: HttpErrorResponse): any {
    if(error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message)
    } else {
      console.error(
        `Error Status code ${error.status},` + 
        `Error body is : ${error.error}`
      )
    }
    return throwError(
      'Something bad happened, please try again later'
    )
  }
  
}
