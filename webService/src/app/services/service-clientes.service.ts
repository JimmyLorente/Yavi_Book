import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceClientesService {

  servidor="http://localhost:3200";

  constructor(private servicio:HttpClient) { }

  ConsultarClientes(): Observable<any>{
      return this.servicio.get(` ${this.servidor}/usuarios/users`,).pipe(
        catchError(error => {
          console.error("Error", error);
          throw error;
        })
      )
  }
  register(usuario: any): Observable<any> {
    return this.servicio.post(`${this.servidor}/usuarios/register`, usuario).pipe(
      catchError(this.handleErrors)
    );
  }

  login(usuario: any): Observable<any> {
    return this.servicio.post(`${this.servidor}/usuarios/login`, usuario).pipe(
      catchError(this.handleErrors)
    );
  }
  private handleErrors(error: any): Observable<any> {
    console.error('Error en la solicitud:', error);
    return throwError(error);
  }
}


