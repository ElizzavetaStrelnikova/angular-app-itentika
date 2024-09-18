import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        this.initializeAuthStatus();
    }

    private initializeAuthStatus() {
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');
            this.isAuthenticatedSubject.next(!!token);
        }
    }

    login(email: string, password: string): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const users = this.getUsers();
            const user = users[email];

            if (user && user.password === password) {
                localStorage.setItem('token', 'sampleToken');
                this.isAuthenticatedSubject.next(true);
                return true;
            }
        }
        return false;
    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
            this.isAuthenticatedSubject.next(false);
        }
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    register(userData: { email: string; password: string }): boolean {
        if (isPlatformBrowser(this.platformId)) {
            const users = this.getUsers();
            if (users[userData.email]) {
                return false; // Пользователь уже существует
            }
            users[userData.email] = { password: userData.password };
            localStorage.setItem('users', JSON.stringify(users));
            return true;
        }
        return false;
    }

    private getUsers(): { [key: string]: { password: string } } {
        if (isPlatformBrowser(this.platformId)) {
            try {
                const usersString = localStorage.getItem('users');
                return usersString ? JSON.parse(usersString) : {};
            } catch (error) {
                console.error('Error parsing users from localStorage', error);
                return {}; // Возвращаем пустой объект в случае ошибки
            }
        }
        return {}; 
    }
}