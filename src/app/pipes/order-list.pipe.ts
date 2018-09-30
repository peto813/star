import { Pipe, PipeTransform } from '@angular/core';


function planetDynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    
    return function (a,b) {
      if(a && b){

          if(sortOrder == -1){
              return b['homeworld']['name'].localeCompare(a['homeworld']['name']);
          }else{
              return a['homeworld']['name'].localeCompare(b['homeworld']['name']);
          }     
      }
  
    }
}



function dynamicSort(property) {
    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    
    return function (a,b) {
    	if(a && b){

	        if(sortOrder == -1){
	            return b[property].localeCompare(a[property]);
	        }else{
	            return a[property].localeCompare(b[property]);
	        } 		
    	}
  
    }
}

function numericSort(property){

    var sortOrder = 1;

    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }



    return function (a,b) {


    	if (a && b) {
				if (parseFloat(a[property]) < parseFloat( b[property])) {
					return -1 * sortOrder;
				}

				if (parseFloat(a[property]) >parseFloat(b[property])) {
				    return 1 * sortOrder;
				}
				return 0;

    	}
    }



}

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  transform(array: any, key: string, orientation:string): any {

  	let sort_by;
  	switch (key) {
  		case "nameColumn":
  			sort_by='name';
  			break;

  		case "genderColumn":
  			sort_by='gender';
  			break;

  		case "birthYearColumn":
  			sort_by='birth_year';
  			break;

  		case "planetColumn":
  			sort_by='homeworld';
  			break;

  		case "heightColumn":
  			sort_by='height';
  			break;

  		default:
  			sort_by='name';
  			break;
  	}

  	if (orientation && orientation==='-') {
  		sort_by = `-${sort_by}`;
  	}

  	if (sort_by.includes('height') ==true || sort_by.includes('mass')==true){
  		return array.sort(numericSort(sort_by));

  	}else if(sort_by.includes('homeworld')==true){
         let new_arr = [];
        for (var i = array.length - 1; i >= 0; i--) {
          new_arr.push(array[i])

        }
       return array.sort(planetDynamicSort(sort_by));//new_arr.planetDynamicSort(sort_by);
     }

    else{

  		return array.sort(dynamicSort(sort_by));
  	}
  	

  }

}
