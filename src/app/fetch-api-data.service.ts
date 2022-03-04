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
  /**
   * Inject the HttpClient module to the constructor params
   *  This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */

  constructor(private http: HttpClient) {
  }
  /**
   * Call API end-point to register a new user
   * @function userRegistration
   * @param userDetails {any}
   * @returns a new user object in json format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(apiUrl + '/users', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Call API end-point to login a registered user
   * @function userLogin
   * @param userDetails {any}
   * @returns the user's data in json format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails)
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    )
  }

  /**
   * Call API end-point to get all movies
   * @function getAllMovies
   * @returns array of movies object in json format
   */
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

  /**
   * Call API end-point to single movie by title
   * @function getAllMovies
   * @param title {string}
   * @returns a movie object in json format
   */
  getMovie(title: string): Observable<any> {
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


    /**
   * Call API end-point to director data by name
   * @function getDirector
   * @param director {string}
   * @returns a director's data in json format
   */
  getDirector(director: string): Observable<any> {
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

  /**
   * Call API end-point to genre data by name
   * @function getGenre
   * @param genre {string}
   * @returns a genre data in json format
   */
  getGenre(genre: string): Observable<any> {
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

  /**
   * Call API end-point to get a user's information
   * @function getUser
   * @param user {any}
   * @returns a user's information in json format
   */
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

  /**
   * Call API end-point to get a user's favorite movies
   * @function getFavorite
   * @param user {any}
   * @returns a user's information in json format
   */
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

  /**
   * Call API end-point to add a movie to the user's favorite list
   * @function addFavorite
   * @param user {any}
   * @param movieId {any}
   * @returns the user's favorite list in json format
   */
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

  /**
   * Call API end-point to update the user's information
   * @function updateUser
   * @param user {any}
   * @param userDetails {any} 
   * @returns updated user's information in json format
   */
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

  /**
   * Call API end-point to delete user
   * @function deleteUser
   * @param user {any}
   * @returns delete status
   */
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

  /**
   * Call API end-point to delete a movie from user's favorite list
   * @function deleteFavorite
   * @param movie {any}
   * @returns updated user's favorite list in json format
   */
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

  /**
   * Non-typed response extraction
   * @param res {any}
   * @returns response || empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {}
  }

  /**
   * Handling error
   * @param error {HttpErrorResponse}
   */
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
