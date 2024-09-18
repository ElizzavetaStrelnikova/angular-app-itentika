import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient) {
        const token = localStorage.getItem('token');
        this.isAuthenticatedSubject.next(!!token);
    }

    login(email: string, password: string): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[email];

        if (user && user.password === password) {
            localStorage.setItem('token', 'sampleToken'); 
            this.isAuthenticatedSubject.next(true);
            return true;
        }
        return false;
    }

    logout() {
        localStorage.removeItem('token');
        this.isAuthenticatedSubject.next(false);
    }

    isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }

    register(userData: any): Observable<any> {
        
        const existingUsers = JSON.parse(localStorage.getItem('users') || '{}');
        
        if (existingUsers[userData.email]) {
            return of({ error: 'Пользователь с таким email уже существует.' });
        }

        existingUsers[userData.email] = userData;
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        return of({ success: true });
    }
}