import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Router} from '@angular/router';//, ActivatedRoute, ParamMap 
//import { AlertService } from './alert.service';
//import { Transaction }    from '.././components/model-classes/transaction-model';
import { BehaviorSubject } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

//SET THE BASE URL DEPENDING ON PRODUCTION OR DEVELOPMENT STAGE
const baseUrl = 'https://swapi.co/api';
//const headers = new Headers();
//Access-Control-Allow-Origin
@Injectable()
export class RestService {

  constructor(private http: HttpClient, private router: Router) { }



  genderSearch(gender){
    let characterList= [];
    let answer= [];
    let messageSource = new BehaviorSubject({});
    let currentMessage = messageSource.asObservable();

    let charactersA = JSON.parse(localStorage.getItem('characters'));

       let pageCount = Math.ceil(charactersA.count/charactersA.results.length);
        for (var i = pageCount - 1; i >= 0; i--) {
             this.http.get('https://swapi.co/api/people/?page='+String(i+1))
               .subscribe((characters)=>{
                 if (characters && characters['results'] && characters['count']>0) {
                   for (var character = characters['results'].length - 1; character >= 0; character--) {
                        if (gender==characters['results'][character]['gender']) {
                         answer.push(characters['results'][character]);
                        }else  if (gender.toLowerCase().trim()==characters['results'][character]['birth_year'].toLowerCase().trim()) {
                          answer.push(characters['results'][character]);
                        }
                    }

                 }

                 //search by gender
                 
                 var genderRecs = answer.filter(user => user.gender.toLowerCase().trim() ==gender)

                 if (genderRecs.length>0) {
                   var genderRecs=  answer.filter(user => user.gender.toLowerCase().trim() ==gender)
                   messageSource.next(genderRecs);
                 } else if(answer.filter(user => user.birth_year.toLowerCase().trim() ==gender).length>0){
                   messageSource.next(answer.filter(user => user.birth_year.toLowerCase().trim() ==gender));
                 }

              
              })

          }
    return currentMessage;

    

  }

    public getCharacters():Observable<any>{


        return this.http.get<any>(this.getUrl(`/people`)).map(data => {return data;}).take(1);
    }

    public peopleSearch(name):Observable<any>{

        //https://swapi.co/api/people/?search=luke
        return this.http.get<any>(this.getUrl(`/people/?search=${name}`)).map(data => {return data;}).take(1);
    }

    public planetSearch(name):Observable<any>{

        //https://swapi.co/api/people/?search=luke
        console.log(this.getUrl(`/planets/?search=${name}`))
        return this.http.get<any>(this.getUrl(`/planets/?search=${name}`)).map(data => {return data;}).take(1);
    }

    public getCharactersPage(character):Observable<any>{
        return this.http.get<any>(this.getUrl(`/people/${character}`)).map(data => {return data;}).take(1);
    }

    public getPage(page):Observable<any>{

        return this.http.get<any>(this.getUrl(`/people/?page=${page}`)).map(data => {return data;}).take(1);

        //return this.http.get<any>(this.getUrl(`/people/${character}`)).map(data => {return data;}).take(1);
    }


//.catch((e: any) => Observable.throw(this.errorHandler(e)));


    public getPlanets():Observable<any>{


        return this.http.get<any>(this.getUrl(`/planets`)).map(data => {return data;}).take(1);
    }


    public getPlanet(url):Observable<any>{
        return this.http.get<any>(url).map(data => {return data;}).take(1);
    }



  	private getUrl(urlSuffix:string):string{
  		//this function joins the base url and a route
  		//in order to abstract base url for prod/dev scenarios
  		return baseUrl+urlSuffix;
  	}

}