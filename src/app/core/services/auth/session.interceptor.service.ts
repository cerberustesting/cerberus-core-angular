import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SessionInterceptorService implements HttpInterceptor {
    constructor(

    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            //withCredentials: true,
        });

        return next.handle(request);
    }

}
