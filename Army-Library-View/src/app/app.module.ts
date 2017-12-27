import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { DatatableComponent } from './datatable/datatable.component';
import { DataTableModule } from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import { FileuploadComponent } from './fileupload/fileupload.component';
import {FileUploadModule} from 'primeng/primeng';
import {DialogModule,InputTextareaModule} from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from '../app/app-routing.module';
import {AuthenticationService} from '../app/authentication.service';




@NgModule({
  declarations: [
    AppComponent,
    DatatableComponent,
    FileuploadComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    DataTableModule,
    HttpClientModule,
    ButtonModule,
    FileUploadModule,
    InputTextareaModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
