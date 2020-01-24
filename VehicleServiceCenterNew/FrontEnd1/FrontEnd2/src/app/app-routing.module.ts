import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeComponent} from "./View/employee/employee.component";
import {DashboardComponent} from "./View/dashboard/dashboard.component";
import {CustomerVehicleUpdateComponent} from "./View/customer-vehicle-update/customer-vehicle-update.component";
import {VehicleComponent} from "./View/vehicle/vehicle.component";
import {SupplierComponent} from "./View/supplier/supplier.component";
import {StockDetailsComponent} from "./View/stock-details/stock-details.component";
import {ServiceJobComponent} from "./View/service-job/service-job.component";
import {ServiceManagementComponent} from "./View/service-management/service-management.component";
import {LowStockLevelComponent} from "./View/low-stock-level/low-stock-level.component";
import {SupplierCreditReportComponent} from "./View/supplier-credit-report/supplier-credit-report.component";
import {NewJobOrderComponent} from "./View/new-job-order/new-job-order.component";
import {LubeDetailJobComponent} from "./View/lube-detail-job/lube-detail-job.component";
import {SupplierPayementsComponent} from "./View/supplier-payements/supplier-payements.component";
import {CustomerPayementsComponent} from "./View/customer-payements/customer-payements.component";
import {PrintJobCardComponent} from "./View/print-job-card/print-job-card.component";
import {LoginComponent} from "./View/login/login.component";
import {ItemAllviewComponent} from "./View/item-allview/item-allview.component";
import {MonthlyOutComeReportComponent} from "./View/monthly-out-come-report/monthly-out-come-report.component";
import {UpdateSupplierPaymentsComponent} from "./View/update-supplier-payments/update-supplier-payments.component";
import {CustomerPaymentViewComponent} from "./View/customer-payment-view/customer-payment-view.component";
import {MainComponent} from "./View/main/main.component";
import {VehiclehictoryComponent} from "./View/vehiclehictory/vehiclehictory.component";


const routes: Routes = [
  {
  path: 'main',
  component: MainComponent,
  children: [
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'searchVehicle',
    component: CustomerVehicleUpdateComponent
  },
  {
    path: 'customerVehicle',
    component: VehicleComponent
  },
  {
    path: 'supplier',
    component: SupplierComponent
  },

  {

    path: "StockManagement",
    component: StockDetailsComponent

  },
  {

    path: "ServiceJob",
    component: ServiceJobComponent

  },
  {
    path: "ServiceManagement",
    component: ServiceManagementComponent

  },
  {
    path: "LowStockLevel",
    component: LowStockLevelComponent
  },
  {
    path: "SupplierCreditReports",
    component: SupplierCreditReportComponent
  },
  {

    path: "jobOrder",
    component: NewJobOrderComponent
    //component:JoborderComponent
  },
  {
    path: 'LubeDetailJob',
    component: LubeDetailJobComponent
  },
  {
    path: 'SupplierPayments',
    component: SupplierPayementsComponent
  },
  {
    path: 'CustomerPayments',
    component: CustomerPayementsComponent
  },
  {
    path: 'printJobCard',
    component: PrintJobCardComponent
  },
  {
    path: 'updatePaymentDetails',
    component: SupplierPayementsComponent
  },
  {
    path: 'UpdateSupplierPayments',
    component: UpdateSupplierPaymentsComponent
  },
  {
    path: 'viewCustomerPayments',
    component: CustomerPaymentViewComponent
  },
  {
    path: 'MonthlyOutComeReport',
    component: MonthlyOutComeReportComponent
  },
  {
    path :'stockview',
    component: ItemAllviewComponent
  },
    {
      path :'vehiclehistory',
      component:VehiclehictoryComponent
    }


]
},
{
  path: "login",
    component: LoginComponent
},

{
  path: '', pathMatch: "full", redirectTo: 'login'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
