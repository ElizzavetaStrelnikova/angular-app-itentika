import { Component, OnInit} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import {Router} from '@angular/router';
import { AuthService } from "../../auth.service";

@Component({
    selector: "sign-in-page",
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: '../components/signinform.component.html',
	styleUrls: ['../components/signinform.component.css']
})
export class SignInPageComponent implements OnInit{
    loginForm: any = {
        email: 'example@example.com',
        password: '',
    };

    constructor(private router: Router, private authService: AuthService,) { }

	ngOnInit() {
	}
    errorMessage: string | null = null;

    login() {
        this.errorMessage = null; 
        if (this.authService.login(this.loginForm.email, this.loginForm.password)) {
            this.router.navigate(['user-info']);
        } else {
            this.errorMessage = 'Неверный логин или пароль';
        }
    }

    goToSignUpPage() {
        this.router.navigate(['sign-up']);
    }
}
