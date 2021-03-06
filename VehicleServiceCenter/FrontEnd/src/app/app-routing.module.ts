import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./view/main/main.component";
import {EmployeeComponent} from "./view/employee/employee.component";
import {DashboardComponent} from "./view/dashboard/dashboard.component";


import {CustomerVehicleUpdateComponent} from "./view/customer-vehicle-update/customer-vehicle-update.component";
import {SupplierComponent} from "./view/supplier/supplier.component";
import {VehicleComponent} from "./view/vehicle/vehicle.component";

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
                path :"supplier",
                component : SupplierComponent
            }

        ]
    },
    
    {path: '', pathMatch: "full", redirectTo: '/main/employee'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
