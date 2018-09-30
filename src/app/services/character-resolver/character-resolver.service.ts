
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../../services/rest-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterResolverService implements Resolve<any>{

  constructor(private rs: RestService, private router: Router ) { }


  	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    	//const company= this.userService.getCompanyData();
    	return this.rs.getCharacters();
    	//return this.rs.queryDates(String(company.id), {tipo:'mes'});
	}

}

