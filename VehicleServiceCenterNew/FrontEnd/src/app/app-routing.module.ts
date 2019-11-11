import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./view/main/main.component";
import {EmployeeComponent} from "./view/employee/employee.component";
import {DashboardComponent} from "./view/dashboard/dashboard.component";


import {CustomerVehicleUpdateComponent} from "./view/customer-vehicle-update/customer-vehicle-update.component";
import {SupplierComponent} from "./view/supplier/supplier.component";
import {VehicleComponent} from "./view/vehicle/vehicle.component";
import {LoginComponent} from "./view/login/login.component";
import {StockDetailsComponent} from "./view/stock-details/stock-details.component";
import {JoborderComponent} from "./view/joborder/joborder.component";
import {ServiceManagementComponent} from "./view/service-management/service-management.component";
import {ServiceJobComponent} from "./view/service-job/service-job.component";
import {LowStockLevelComponent} from "./view/low-stock-level/low-stock-level.component";
import {SupplierCreditReportComponent} from "./view/supplier-credit-report/supplier-credit-report.component";
import {NewJobOrderComponent} from "./view/new-job-order/new-job-order.component";
import {LubeDetailJobComponent} from "./view/lube-detail-job/lube-detail-job.component";

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
              path :'customerVehicle',
              component:VehicleComponent
            },
            {
                path :'supplier',
                component : SupplierComponent
            },

            {

            path :"StockManagement",
            component : StockDetailsComponent

          },
          {

            path :"ServiceJob",
            component : ServiceJobComponent

          },
          {
              path :"ServiceManagement",
              component : ServiceManagementComponent


            },
            {
              path:"LowStockLevel",
              component:LowStockLevelComponent
            },
          {
            path:"SupplierCreditReports",
            component:SupplierCreditReportComponent
          },
          {

            path :"jobOrder",
            component : NewJobOrderComponent
            //component:JoborderComponent
          },
          {
            path :'LubeDetailJob',
            component: LubeDetailJobComponent
          }


        ]
    },
    {
      path:"login",
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
