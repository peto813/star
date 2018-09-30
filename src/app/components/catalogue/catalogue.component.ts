import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {RestService} from '../../services/rest-service';
import { FormsModule } from '@angular/forms';
import { SharedDataService } from "../../services/shared-data.service";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(public http: HttpClient,private data: SharedDataService, public route:ActivatedRoute, private restService:RestService, private router : Router) { }

  private resolve: Function|null = null;

  characters:any;
  page =1;
  previousPage = 1;
  planets=[];
  search='';
  column = 'nameColumn';
  sort_order ='-';
  faDirection ='caret-up'	
  subscribtion1;
  planetsArray = [];

	showSorter(columnId){
		return columnId.toLowerCase()===this.column.toLowerCase();
	}

  toggleCaret(columnId){
  	if(this.faDirection=='caret-up' && this.column===columnId){
  		this.faDirection='caret-down';
  		this.sort_order ='-';
  	}else if (this.faDirection==='caret-down' && this.column===columnId){
  		this.faDirection='caret-up';
  		this.sort_order ='';
  	}
  }

  setCol(columnId){
  	if (this.column===columnId) {

  		this.toggleCaret(columnId);
  	}
  	this.column=columnId;
  }


  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData(page);

    }
  }

  loadData(page) {
  	 this.restService.getPage(page)
  	 	.subscribe(characters=>{
  	 		this.characters = characters;
         this.cyclePlanets();
  	 	})
  }

 charDetails(event, character){
 	event.preventDefault();
 	this.router.navigate(['/character', (character.url).split('/')[5]]); //, (character.url).split('/')[5]]
 }




  ngOnDestroy(){
    this.subscribtion1.unsubscribe();
  }


  mapPlanetstoChars(this){
    return new Promise(()=>{
      //console.log(this.characters)
        for (var i = this.characters.results.length - 1; i >= 0; i--) {
          for (var planet = this.planetsArray.length - 1; planet >= 0; planet--) {
              if( (typeof this.characters.results[i].homeworld=='string')  && this.characters.results[i].homeworld.toLowerCase()  == this.planetsArray[planet]['url'].toLowerCase()){
                this.characters.results[i]['homeworld'] = this.planetsArray[planet];

              }
          }
        }
       // var characters = JSON.parse(localStorage.getItem('characters')).results;
       // console.log(characters.length, this.characters.count)
       // if (!characters || this.characters.count>characters.length){
       //   console.log(this.characters)
       //   //var characters = localStorage.setItem('characters', JSON.stringify(this.characters));
       // }

       //var characters = localStorage.setItem('characters', JSON.stringify(this.characters.results));
    })
  }

  cyclePlanets(this){
    var tracker = []
    if (this.planets ) {
      let planets = this.planets;
      let pageCount = Math.ceil(this.planets.count/this.planets.results.length);

      for (var i = pageCount - 1; i >= 0; i--) {//LOOP PAGES
        //get planets
        if (i>=1) {
           planets = this.http.get('https://swapi.co/api/planets/?page='+String(i))
             .subscribe((planets)=>{
               if(planets){
                  for (var planet = planets.results.length - 1; planet >= 0; planet--) {
                    tracker.push(planets.results[planet]);
                  }              
               }
               

               // when finished
     
               if (this.planets.count=== tracker.length  ) {
                  this.planetsArray= tracker;
                  this.mapPlanetstoChars()
                    .then(console.log(JSON.parse(localStorage.getItem('characters'))))
               }

             })
        }else{
           tracker.push(this.planets.results[0]);
        }
      }


    }

  }

  ngOnInit() {

    //SUBSCRIBE TO CHARACTER DATA
  	this.route.data
    //let homeworld = this.restService.getPlanet(url);
    .subscribe(response=>{
          this.characters = response.characters;
          this.planets = response.planets;
          //loop through planet list
          this.cyclePlanets();
    })

    //SUBSCRIBE TO SEARCH RESULTS FROM NAVBAR
    this.subscribtion1=this.data.currentMessage.subscribe((response)=>{
      if (response != 'default message') {
          this.characters = response; 
          this.cyclePlanets();
      }         
    })

}







}
