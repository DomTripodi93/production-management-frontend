import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private auth: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
        if (req.url != this.auth.apiUrl +"/register/" && req.url != this.auth.apiUrl +"/login/"){
            const authenticatedRequest = req.clone({
                headers: req.headers.append("Authorization", 'Token ' + this.auth.token)
            })
            return next.handle(authenticatedRequest);
        } else {
            return next.handle(req)
        }
    }
}