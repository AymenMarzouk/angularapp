import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services';
import { User } from './models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    public currentUser: boolean;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
      
      this.currentUser = this.authenticationService.currentUser ;
    }
    ngOnInit(){console.log("loading app")

    //$("#124536").hide();$("#124537").hide();
   // localStorage.setItem("nav",JSON.stringify(this.nav1)); 
  //localStorage.setItem("nav1",JSON.stringify(this.nav1));
  //localStorage.setItem("nav2",JSON.stringify(this.nav2));

  if(localStorage.getItem("lang")=="EN")
  {
  this.nav=this.nav2
  console.log("anglais")
  } 
  else
  {
    this.nav=this.nav1;
    console.log("français")
  }
}
  lang=true;
  title = 'K.A.Z';
  id=2;
  //lng="EN";
  lng1="FR";
  nav=[{lg:"",route:"",liste:[{id:"",route:""}]}];gg


/*
  nav1=[{lg:"Dévelopeur",route:"register",liste:[]},
  {lg:"Entreprise",route:"registerentreprise",liste:[]},

  {lg:"Login",route:"login",liste:[]},
  {lg:"SignUp",route:"register" ,liste:[]}];
*/
  /*nav1*/
  /* nav3=[{lg:"accueil",route:"/homefr",liste:[]},
  {lg:"services",route:"/servicesfr",liste:[]},
 {lg:"formations",route:"/training",liste:[{id:"formation 1",route:"/training"},{id:"formation 2",route:"/training2"}]},
  {lg:"Carrières",route:"/joinusfr",liste:[]},
  {lg:"A propos",route:"login",liste:[]},
  {lg:"test",route:"login",liste:[]},
  {lg:"contact",route:"contactfr" ,liste:[]}];
  nav2=[{lg:"home",route:"/home",liste:[]},
  {lg:"services",route:"/services",liste:[]},
 {lg:"training",route:"/training",liste:[{id:"formation 1",route:"/training"},{id:"formation 2",route:"/training2"}]},
  {lg:"careers",route:"/joinus",liste:[]},
  {lg:"about",route:"login",liste:[]},
  {lg:"contact",route:"contact" ,liste:[]}];
  */
 f11()
 {
   console.log("bon")
 }

    /*
  fff(even:any)
  { console.log("mobile")
    if (even.target.value=="FR")
    {this.nav=this.nav1; 
      //localStorage.setItem("nav",JSON.stringify(this.nav1));
      localStorage.setItem("lang","FR");
      //$("#1245").load("#124536");
      this.router.navigate(['/homefr'])
    }
      else
   { this.nav=this.nav2;
    //localStorage.setItem("nav",JSON.stringify(this.nav2));
    localStorage.setItem("lang","EN");
   //$("#1245").load("#124537");

   this.router.navigate(['/home'])
  }

  
  
  }
 
*/
v(){console.log("clikkk")}


    

  
 
  ff(even:any)
  { console.log("web")
    if (even.target.value=="FR")
    {this.nav=this.nav1;this.router.navigate(['/homefr'])}
      else
   { this.nav=this.nav2;this.router.navigate(['/home'])}

    
}
logout() {
    this.authenticationService.logout();
    this.authenticationService.currentUser = false ;
    this.router.navigate(['/login']);
}
}