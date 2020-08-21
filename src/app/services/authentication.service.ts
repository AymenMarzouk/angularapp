import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    //private currentUserSubject: BehaviorSubject<User>;
    public currentUserKey: string = null ;
    public currentUser : boolean = false ;
    apiUrl = 'http://127.0.0.1:8000';

    constructor(private http: HttpClient) {
       // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
       if(localStorage.getItem('currentUser') != null) {
        this.currentUserKey = localStorage.getItem('currentUser') ;
        this.currentUser = true ;
    }
    }

  /*  public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }*/

    login(email: string, password: string) {
     
        return this.http.post<any>(`${this.apiUrl}/api/v1/auth/login/`, { email, password }) ;
           
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        //this.currentUserSubject.next(null);
    }
}