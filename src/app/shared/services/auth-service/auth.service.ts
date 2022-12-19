import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, EMPTY, map, Observable, of, ReplaySubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //On garde quand même une valeur en mémoire, mais pas besoin d'une valeur initiale
  public isLogged$: ReplaySubject<boolean> = new ReplaySubject(1)
  public auth$: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  private userId= ''


  constructor(private http: HttpClient) {
  }

  public login(credential: any): Observable<any> {
    return this.http.post<any>("https://localhost:8080/api/auth/login", credential)
      .pipe(
        tap((user:any) => {
          this.userId = user.userId
          this.isLogged$.next(true);
          this.auth$.next(user)},
          ),
       /* map(() => true ),*/
    )
}
}
