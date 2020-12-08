import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseURL = 'http://localhost:4200';
  constructor(private http: HttpClient) { }

  getUserDetails(){
    return this.http.get(`${this.baseURL}/assets/users.json`)
      .pipe(
        map((res: any) => res),
        catchError(this.handleError));
  }

  handleError(error: Response) {

    console.log(error);

    return throwError(new Error("Not Found"));

  }
}
