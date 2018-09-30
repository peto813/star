import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {RestService} from '../../services/rest-service';
import { forkJoin } from "rxjs/observable/forkJoin";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(public route:ActivatedRoute,  private restService:RestService, private http:HttpClient, private router: Router) { }

  character;
  residentsUrls;
  residents=[];



  getChar(character){
   event.preventDefault();
   this.router.navigate(['/character', (character.url).split('/')[5]]); //, (character.url).split('/')[5]]
    //"['character', route.snapshot.params['id'], 'details']
  }

  ngOnInit() {
	this.route.data
		.subscribe(response=>{
      //console.log(this.route.snapshot.params['id'])
        //callbacks need to be separated into functions to avoid callback hell
        	this.character = response.character;
        	this.restService.getPlanet(this.character.homeworld)
        		.subscribe(planet=>{
        			this.residentsUrls = planet.residents

                for (var resident = this.residentsUrls.length - 1; resident >= 0; resident--) {
                    this.http.get(this.residentsUrls[resident])
                     .subscribe((resident)=>{
                       if(resident){
                         this.residents.push(resident)             
                       }
                		})
                }


		})
  })




  }

}
