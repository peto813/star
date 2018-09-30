
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RestService } from '../../services/rest-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailResolverService implements Resolve<any>{

  constructor(private rs: RestService, private router: Router ) { }


  	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    	let id= route.paramMap.get('id');
    	return this.rs.getCharactersPage(id);	}

}

