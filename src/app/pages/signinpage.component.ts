import { Component, OnInit} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import {Router} from '@angular/router';

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

    constructor(private router: Router) { }

	ngOnInit() {
	}

    submitSignInForm() {
        this.router.navigate(['user-info']);
	}

    goToSignUpPage() {
        this.router.navigate(['sign-up']);
    }
}
