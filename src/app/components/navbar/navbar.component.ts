import { Component, OnInit } from '@angular/core';
import {RestService} from '../../services/rest-service';
import { HttpClient } from '@angular/common/http';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SharedDataService } from "../../services/shared-data.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	imgPath="assets/stw.png"
  subscription;
	searchString ='';

  constructor(public data: SharedDataService, private restService: RestService, private router : Router, public http:HttpClient ) { }

  ngOnInit() {
  }



  callback3(blob){//search by gender
    let results;
    if (blob.length>0) {
      results= blob
    }else{
      results=[];
    }
    this.data.changeMessage({count:blob.count, results:results, next:null, previous:null});
//this.characters.results=[]
  }

  callback2(planet){//sarch by planet
     let user_list = [];
    if (planet && planet.results && planet.count>0) {
      planet = planet.results[0]

      for (var resident = planet.residents.length - 1; resident >= 0; resident--) {
         let userLink = (planet.residents[resident])
         this.http.get(userLink).subscribe((user)=>{
           user_list.push(user);
         })
      }


          this.data.changeMessage({
             count:user_list.length, 
             next:null,
             previous: null,
             results:user_list
           })
    }else{
      this.subscription=this.restService.genderSearch(this.searchString.toLowerCase().trim())
        .subscribe(this.callback3.bind(this))
    }

  }


  callback1(person){
    // //return (person)=>{
    let  message = 'No results found';
    if (person.count >0) {
        message = `${String(person.count)} results have been found`;
    //        //alert(message);
    //     }
      this.data.changeMessage(person);
      this.searchString= '';
    }else{
      //do a planet search
      this.subscription=this.restService.planetSearch(this.searchString)
        .subscribe(this.callback2.bind(this))
    }
  }

  searchBackend(){
  	this.subscription=this.restService.peopleSearch(this.searchString.toLowerCase().trim())
  		.subscribe(this.callback1.bind(this))
  }




  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


}
