import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ButtonModule,InputTextareaModule } from 'primeng/primeng';
import { Composition } from '../../classes/composition';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/primeng';
import {AuthenticationService} from '../authentication.service';
import { environment } from '../../environments/environment';

// https://www.primefaces.org/primeng/#/datatable/crud

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  compositions: Composition[];
  catagories = [];
  displayDialog: boolean;

  comp: PrimeComposition = new PrimeComposition();
  apiUrl = environment.apiUrl;

  onRowSelect(event) {
    this.comp = this.cloneComp(event.data);
    this.displayDialog = true;
  }

  cloneComp(c: Composition): Composition {
    let composition = new Composition();
    for (let prop in c) {
      composition[prop] = c[prop];
    }
    return composition;
  }


  save(c: PrimeComposition) {
    let formData: FormData = new FormData();
    formData.append('composition',JSON.stringify(this.comp) );
    formData.append('userName',sessionStorage.getItem('currentUser'));
    this.http.post(this.apiUrl+'/composition/update', formData)
      .subscribe(
      data => { console.log('success'), this.displayDialog = false;this.subscribeToData(); },
      error => console.log(error)
      )
  }

  delete(c: PrimeComposition){
    this.http.post(this.apiUrl+'/composition/delete', this.comp)
      .subscribe(
      data => { console.log('success'), this.displayDialog = false;this.subscribeToData(); this.comp =new PrimeComposition()},
      error => console.log(error)
      )
  }

  isUserAuthenticated():boolean { 
    return this.userService.isUserAuthenticated();
  }
  
  constructor(private http: HttpClient, private userService: AuthenticationService) { }

  ngOnInit() {
    this.subscribeToData();
    this.catagories.push({ label: 'All Brands', value: null });
    this.catagories.push({ label: 'CS', value: 'CS' });
  }

  subscribeToData() {
    this.compositions = [];
    this.http.get<Composition[]>(this.apiUrl+'/compositions').subscribe(data => {
      this.compositions = [...data];
      console.log(data);

    });

  }

  newComposition(){
    this.displayDialog = true;
  }
}

class PrimeComposition {

  constructor(public id?, public composition?, public catagory?, public libraryNumber?, public title?, public composer?, public arranger?, public ensemble?, public copyright?, public notes?,public url?,public lastEdit?,public editedBy?) { }
}


