import { Component, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';

@Component({
    selector: "sign-in-page",
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: '../components/signinform.component.html',
    styleUrls: ['../components/signinform.component.css']
})
export class SignInPageComponent implements OnInit {
    loginForm: any = {
        email: 'example@example.com',
        password: '',
    };

    constructor(private router: Router) { }

    ngOnInit() { }

    errorMessage: string | null = null;

    login() {
        const userData = localStorage.getItem(this.loginForm.email);
        if (userData) {
            const user = JSON.parse(userData);
            if (user.password === this.loginForm.password) {
                this.errorMessage = null; // Сбрасываем сообщение об ошибке
                // Перенаправляем на главную страницу после успешной аутентификации
                this.router.navigate(['']);
            } else {
                this.errorMessage = "Неверный пароль.";
            }
        } else {
            this.errorMessage = "Пользователь с таким email не найден.";
        }
    }

    goToSignUpPage() {
        this.router.navigate(['sign-up']);
    }
}