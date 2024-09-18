import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';

@Component({
    selector: "sign-up-page",
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: '../components/signupform.component.html',
    styleUrls: ['../components/signupform.component.css']
})
export class SignUpPageComponent implements OnInit {
    loginForm: any = {
        email: 'example@example.com',
        password: '',
        confirm_password: '',
        name: '',
        surname: '',
        phone: '',
        date: '',
        gender: '',
        city: '',
        extrainfo: ''
    };

    constructor(private router: Router) {}

    ngOnInit() {}

    goToSignInPage() {
        this.router.navigate(['']);
    }

    errorMessage: string | null = null;

    onSubmit() {
        if (this.loginForm.password !== this.loginForm.confirm_password) {
            this.errorMessage = "Пароли не совпадают!";
            return;
        }

        const existingUser = localStorage.getItem(this.loginForm.email);
        if (existingUser) {
            this.errorMessage = "Пользователь с этим email уже зарегистрирован.";
            return;
        }

        localStorage.setItem(this.loginForm.email, JSON.stringify(this.loginForm));
        this.errorMessage = null; 
        this.router.navigate(['']); 
    }
}