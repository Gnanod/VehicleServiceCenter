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
import { ServiceJobComponent } from './view/service-job/service-job.component';
import { LowStockLevelComponent } from './view/low-stock-level/low-stock-level.component';
import { SupplierCreditReportComponent } from './view/supplier-credit-report/supplier-credit-report.component';
import { NewJobOrderComponent } from './view/new-job-order/new-job-order.component';
import { LubeDetailJobComponent } from './view/lube-detail-job/lube-detail-job.component';
import { SupplierPayementsComponent } from './view/supplier-payements/supplier-payements.component';
import { CustomerPayementsComponent } from './view/customer-payements/customer-payements.component';
import {NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import {PopupService} from "@ng-bootstrap/ng-bootstrap/util/popup";
import { PrintJobCardComponent } from './view/print-job-card/print-job-card.component';
import { UpdateSupplierPaymentsComponent } from './view/update-supplier-payments/update-supplier-payments.component';
import { CustomerPaymentViewComponent } from './view/customer-payment-view/customer-payment-view.component';
import { MonthlyOutComeReportComponent } from './view/monthly-out-come-report/monthly-out-come-report.component';
import { ItemAllviewComponent } from './view/item-allview/item-allview.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";


// @ts-ignore
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
    ServiceManagementComponent,
    ServiceJobComponent,
    LowStockLevelComponent,
    SupplierCreditReportComponent,
    NewJobOrderComponent,
    LubeDetailJobComponent,
    SupplierPayementsComponent,
    CustomerPayementsComponent,
    PrintJobCardComponent,
    UpdateSupplierPaymentsComponent,
    CustomerPaymentViewComponent,
    MonthlyOutComeReportComponent,
    ItemAllviewComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule,NgbModule,NgbPaginationModule, NgbAlertModule,ReactiveFormsModule,
      BrowserAnimationsModule,MatButtonModule,MatSelectModule,  MatFormFieldModule,
      MatInputModule, Ng2SearchPipeModule,NgxPaginationModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
