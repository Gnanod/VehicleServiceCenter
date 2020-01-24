import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './View/employee/employee.component';
import { CustomerVehicleUpdateComponent } from './View/customer-vehicle-update/customer-vehicle-update.component';
import { VehicleComponent } from './View/vehicle/vehicle.component';
import { DashboardComponent } from './View/dashboard/dashboard.component';
import { LoginComponent } from './View/login/login.component';
import { SupplierComponent } from './View/supplier/supplier.component';
import { StockDetailsComponent } from './View/stock-details/stock-details.component';
import { JoborderComponent } from './View/joborder/joborder.component';
import { ServiceManagementComponent } from './View/service-management/service-management.component';
import { ServiceJobComponent } from './View/service-job/service-job.component';
import { LowStockLevelComponent } from './View/low-stock-level/low-stock-level.component';
import { SupplierCreditReportComponent } from './View/supplier-credit-report/supplier-credit-report.component';
import { NewJobOrderComponent } from './View/new-job-order/new-job-order.component';
import { LubeDetailJobComponent } from './View/lube-detail-job/lube-detail-job.component';
import { SupplierPayementsComponent } from './View/supplier-payements/supplier-payements.component';
import { CustomerPayementsComponent } from './View/customer-payements/customer-payements.component';
import { PrintJobCardComponent } from './View/print-job-card/print-job-card.component';
import { UpdateSupplierPaymentsComponent } from './View/update-supplier-payments/update-supplier-payments.component';
import { MonthlyOutComeReportComponent } from './View/monthly-out-come-report/monthly-out-come-report.component';
import { ItemAllviewComponent } from './View/item-allview/item-allview.component';
import {DatePipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import { CustomerPaymentViewComponent } from './View/customer-payment-view/customer-payment-view.component';
import { MainComponent } from './View/main/main.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";
import { VehiclehictoryComponent } from './View/vehiclehictory/vehiclehictory.component';

@NgModule({
  declarations: [
    AppComponent,
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
    MonthlyOutComeReportComponent,
    ItemAllviewComponent,
    CustomerPaymentViewComponent,
    MainComponent,
    VehiclehictoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    ReactiveFormsModule

  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
