import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import {User} from './user.model'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders().set('Content-Type','application/json');

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };


  constructor(private http: HttpClient) { }

  //get all users 
  getAllUsers(){
    return this.http.get(environment.api_URL+'/users')
  }

  //add new user
  registerUser(user:User){
    return this.http.post(environment.URI+'users',user,this.noAuthHeader);
  }

  //update user
  updateUser(id,data):Observable<any>{
   let API_URL= `${environment.api_URL}/users/${id}`;
   return this.http.put(API_URL,data,{headers:this.headers}).pipe(
     catchError(this.errorMgmt)
   )

  }

 //delete user
  deleteUser(id):Observable<any>{
    var API_URL=`${environment.api_URL}/users/${id}`;
    console.log(API_URL);
    return this.http.delete(API_URL).pipe(catchError(this.errorMgmt))
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
