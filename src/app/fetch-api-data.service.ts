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
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    )
  }


  // User login



  // Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }


  // Get one movie




  // Get director




  // Get genre




  // Get user




  // Get favourite movies for a user




  // Add a movie to favourite Movies




  // Edit user




  // Delete user




  // Delete a movie from the favorite movies




  
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
