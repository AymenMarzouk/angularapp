import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, UserService, AlertService } from '../services';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs/operators';
import { ConfirmedValidator } from '../confirmed.validator';

@Component({
  selector: 'app-register-entreprise',
  templateUrl: './register-entreprise.component.html',
  styleUrls: ['./register-entreprise.component.css']
})
export class RegisterEntrepriseComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  HttpClient: any;
  email : string; 
  password : string ;
  tokens= ['','{','}','[',']','.','"'] ;
  constructor(
      private http: HttpClient,
      private formBuilder: FormBuilder,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private alertService: AlertService,
      private cookieService: CookieService
  ) { 
      //redirect to home if already logged in
      if (this.authenticationService.checkoutCurrentUser()) { 
          this.router.navigate(['/home']);
      }
    
  }

  ngOnInit() {
      if(this.cookieService.get("remember") === 'true' ){
          this.email =this.cookieService.get("email") ;
          this.password = this.cookieService.get("password");
          this.authenticationService.login( this.email, this.password).pipe(first())
          .subscribe(
  
              data => {
                  console.log(data);
                 
                  sessionStorage.setItem('currentUser', data.key);
                  this.authenticationService.currentUserKey.next(localStorage.getItem('currentUser'));
                  this.router.navigate(['/home']); 
              })}

      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]/*, this.checkEmail.bind(this)*/],
          first_name: ['', Validators.required],
          last_name: ['', Validators.required],
          password1: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
          password2: ['',Validators.required],
          phone_number: ['',Validators.required],
          company: ['',Validators.required],
          acceptcheckbox: ['',Validators.requiredTrue]
      }, { 
          validator: ConfirmedValidator('password1', 'password2')
        }) ;

      
  }

  
  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 /* checkEmail(control: FormControl): Promise<any> {

      const promise = new Promise<any>(
         (resolve, reject) => {

             this.http.post('http://127.0.0.1:8000/api/v1/auth/registration/', this.registerForm.value).subscribe(
                 async (res: Response) => {
                     console.log('it never gets here');
                     console.log(res)
                     if (await res.text() == 'already there') {
                         resolve({'emailTaken': true});
                     } else {
                         resolve(null);
                     }
                 },
                 (err) => {
                     console.log('it never gets here');
                     console.log(err);
                }
             )   
         }
     );
     return promise;
 }*/
  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;
      this.userService.registerEntreprise(this.registerForm.value)
          .pipe(first())
          .subscribe(
              data => {
                this.alertService.success("A verification Email was sent to you to confirm your account, please check it !", true);
                  this.router.navigate(['/login']);
              },
              error => {
                this.alertService.error(this.splitMulti(JSON.stringify(error.error).substring(
                    JSON.stringify(error.error).lastIndexOf("[") + 1, 
                    JSON.stringify(error.error).lastIndexOf("]")
                ),this.tokens));
                  this.loading = false;
              });
  }

  splitMulti(str, tokens){
    var tempChar = tokens[0]; // We can use the first token as a temporary join character
    for(var i = 1; i < tokens.length; i++){
        str = str.split(tokens[i]).join(tempChar);
    }
    //str = str.split(tempChar);
    return str;
}
}
