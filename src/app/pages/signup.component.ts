import { Component, OnInit} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import {Router} from '@angular/router';
import { UserService } from "../../user.service"; 

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

    constructor(private router: Router, private userService: UserService) {}

    ngOnInit() {}

    goToSignInPage() {
        this.router.navigate(['']);
    }
    errorMessage: string | null = null;

    onSubmit() {
        if (this.loginForm.password !== this.loginForm.confirm_password) {
            this.errorMessage = 'Пароли не совпадают!';
            return;
        }
    
        this.userService.register(this.loginForm).subscribe({
            next: (response) => {
                if (response.success) {
                    console.log('Форма успешно отправлена!', this.loginForm);
                    this.goToSignInPage(); 
                    this.errorMessage = null; 
                } else {
                    this.errorMessage = response.error ?? null; 
                }
            },
            error: (err) => {
                this.errorMessage = 'Произошла ошибка при регистрации.'; 
                console.error(err);
            }
        });
    }
}