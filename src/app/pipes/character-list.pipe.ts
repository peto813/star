import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterList'
})
export class CharacterListPipe implements PipeTransform {
	searchText;
	items;


	filterGender(this){return this.items.filter( it => {if(it.gender.toLowerCase() === this.searchText ){return it}})};

	normalFilter(this){
		return this.items.filter( it => {
			if(
				it.name.toLowerCase().includes(this.searchText) ||
				it.gender.toLowerCase().includes(this.searchText) ||
				it.birth_year.toLowerCase().includes(this.searchText) ||
				it.homeworld.name.toLowerCase().includes(this.searchText)
				//need to add planet
			)
			{
				 return it;
			}


	    });
	}

  transform(items: any, searchText?: string): any {

    if(!items) return [];
    if(!searchText) return items;
  	searchText = searchText.toLowerCase();
  	this.searchText = searchText;
  	this.items = items;

  	if (this.searchText.toLowerCase() === 'male'){
  		return this.filterGender();
  	}else{

  		return this.normalFilter();
  	}

  }

}
