import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { DetailsComponent } from './components/details/details.component';
//import { RouterModule, Routes }  from '@angular/router'
import { AppRoutingModule } from './app.routing';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptor } from './services/my-http-interceptor'
import { FormsModule } from '@angular/forms'; 
import { AngularFontAwesomeModule } from 'angular-font-awesome';



import { NgxDatatableModule } from '@swimlane/ngx-datatable';



//SERVICES IMPORTS
import {CharacterResolverService }   from './services/character-resolver/character-resolver.service';
import {CharacterDetailResolverService }   from './services/character-detail/character-detail-resolver.service';
import { RestService } from './services/rest-service';
import { SharedDataService } from './services/shared-data.service';

import { CharacterListPipe } from './pipes/character-list.pipe';
import { OrderListPipe } from './pipes/order-list.pipe';
import { WeightEditPipe } from './pipes/weight-edit.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingUrlPipe } from './pipes/loading-url.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CatalogueComponent,
    DetailsComponent,
    CharacterListPipe,
    OrderListPipe,
    WeightEditPipe,
    NavbarComponent,
    LoadingUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxDatatableModule,
    NgbModule,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
  	CharacterResolverService,
  	CharacterDetailResolverService,
  	RestService,
  	CharacterListPipe,
  	WeightEditPipe,
  	OrderListPipe,
    SharedDataService,
    LoadingUrlPipe,

    { 
        provide: HTTP_INTERCEPTORS, 
        useClass: MyHttpInterceptor, 
        multi: true 
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
