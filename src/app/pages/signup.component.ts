import { Component, OnInit} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import {Router} from '@angular/router';

@Component({
    selector: "sign-up-page",
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: '../components/signupform.component.html',
	styleUrls: ['../components/signupform.component.css']
})
export class SignUpPageComponent implements OnInit{ 
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

    onSubmit() {
        if (this.loginForm.password === this.loginForm.confirm_password) {
            console.log('Форма успешно отправлена!', this.loginForm);
            // Здесь вы можете сделать запрос на сервер для регистрации пользователя
        } else {
            console.error('Пароли не совпадают!');
        }
    }
}