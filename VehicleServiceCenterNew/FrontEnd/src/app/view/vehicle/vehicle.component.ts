import { Component, OnInit } from '@angular/core';
import {Customer} from "../../Model/Customer";
import {Vehicle} from "../../Model/Vehicle";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  cust :Customer = new Customer();
  vehNgModel :Vehicle = new Vehicle();
  
  constructor() { }

  ngOnInit() {
  }

}
