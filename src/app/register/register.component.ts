import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlertService, UserService, AuthenticationService } from '../services';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
  })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    HttpClient: any;

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required/*, this.checkEmail.bind(this)*/],
            username: ['', Validators.required],
            password1: ['', [Validators.required, Validators.minLength(6)]],
            password2: ['', [Validators.required, Validators.minLength(6)]]
        });
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
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}