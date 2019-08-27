import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './view/main/main.component';
import { EmployeeComponent } from './view/employee/employee.component';
import { CustomerVehicleUpdateComponent } from './view/customer-vehicle-update/customer-vehicle-update.component';
import { VehicleComponent } from './view/vehicle/vehicle.component';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { LoginComponent } from './view/login/login.component';
import { SupplierComponent } from './view/supplier/supplier.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbAlertModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule} from "@angular/material";
import { StockDetailsComponent } from './view/stock-details/stock-details.component';
import {DatePipe} from "@angular/common";
import { JoborderComponent } from './view/joborder/joborder.component';
import { ServiceManagementComponent } from './view/service-management/service-management.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    EmployeeComponent,
    CustomerVehicleUpdateComponent,
    VehicleComponent,
    DashboardComponent,
    LoginComponent,
    SupplierComponent,
    StockDetailsComponent,
    JoborderComponent,
    ServiceManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule,NgbModule,NgbPaginationModule, NgbAlertModule,ReactiveFormsModule,
      BrowserAnimationsModule,MatButtonModule,MatSelectModule,  MatFormFieldModule,
      MatInputModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
