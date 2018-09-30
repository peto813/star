import { Injectable, Injector, isDevMode } from '@angular/core';

import { HttpEvent,
		HttpInterceptor,
		HttpHandler,
		HttpRequest,
		HttpResponse,
		HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
//import { sharedService } from '../services/shared-service';
import 'rxjs/add/operator/map';

//import { AlertService } from '../services/alert.service';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
constructor(
	//private loaderService: AppComponent,
	//public alertService: AlertService,
	//public sharedScope:sharedService
	) {
}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json'
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });

    return next.handle(req);
    }

   
 }