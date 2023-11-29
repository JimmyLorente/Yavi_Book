import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LOGIN_URL, REGISTER_URL, USERS_URL } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class ServiceClientesService {

  constructor(private servicio:HttpClient) { }

  ConsultarClientes(): Observable<any>{
      return this.servicio.get(USERS_URL,).pipe(
        catchError(error => {
          console.error("Error", error);
          throw error;
        })
      )
  }
  register(usuario: any): Observable<any> {
    return this.servicio.post(REGISTER_URL, usuario).pipe(
      catchError(this.handleErrors)
    );
  }

  login(usuario: any): Observable<any> {
    return this.servicio.post(LOGIN_URL, usuario).pipe(
      catchError(this.handleErrors)
    );
  }
  private handleErrors(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}


