import {Customer} from "./Customer";
import {DatePipe} from "@angular/common";

export class Vehicle {
    
    vehicleId: Number;
    vehicleNumber: string;
    engineNumber: string;
    vehicleClass: string;
    vehicleModel: string;
    yearOfManufacture:string;
    customer: Customer;
    
}