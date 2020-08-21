import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { UserService, AuthenticationService } from '../services';

@Component({ 
    selector: 'app-home',
    templateUrl: 'home.component.html' })

export class HomeComponent implements OnInit, OnDestroy {
    currentUser: boolean;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
       // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = this.authenticationService.currentUser;
      //  });
    }

    ngOnInit() {
        //this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
      //  this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
        });
    }
}