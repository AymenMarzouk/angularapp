import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services';
import { User } from './models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
  })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
    ngOnInit(){}

    //$("#124536").hide();$("#124537").hide();
   // localStorage.setItem("nav",JSON.stringify(this.nav1)); 
  //localStorage.setItem("nav1",JSON.stringify(this.nav1));
  //localStorage.setItem("nav2",JSON.stringify(this.nav2));

  



  nav1=[{lg:"Dévelopeur",route:"register",liste:[]},
  {lg:"Entreprise",route:"registerentreprise",liste:[]},

  {lg:"Login",route:"login",liste:[]},
  {lg:"SignUp",route:"register" ,liste:[]}];

  /*nav1*/
  
}