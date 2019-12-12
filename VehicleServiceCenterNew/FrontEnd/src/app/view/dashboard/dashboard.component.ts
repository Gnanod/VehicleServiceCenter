import { Component, OnInit } from '@angular/core';
import {JoborderService} from "../../Service/joborder.service";
import {Vehicle} from "../../Model/Vehicle";
import {Customer} from "../../Model/Customer";
import {StockService} from "../../Service/stock.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public constructor(private jobOrderService :JoborderService,private stockService:StockService) { }

  ngOnInit() {
    this.getTotalSales();
    this.getTodayJobCount();
    this.getMonthlyTotalSales();
    this.geTotalOutComeForToday();
    this.getMonthlyOutComeForMonth();
  }

  totalSales :number;
  totalJobCount:number;
  monthlySales :number;
  totalOutComeForToday:number;
  monthlyOutComeForMonth:number;

  getTotalSales(){
    this.jobOrderService.getTotalSales().subscribe((result) => {
          this.totalSales=result;
    });
  }

  getTodayJobCount(){
    this.jobOrderService.getTodayJobCount().subscribe((result) => {
      this.totalJobCount=result;
    });
  }

  getMonthlyTotalSales(){
    this.jobOrderService.getMonthlyTotalSales().subscribe((result) => {
      this.monthlySales=result;
    });
  }

  geTotalOutComeForToday(){
    this.stockService.gettotalOutComeForToday().subscribe((result) => {
      this.totalOutComeForToday=result;
    });
  }

  getMonthlyOutComeForMonth(){
    this.stockService.getMonthlyOutComeForMonth().subscribe((result) => {
      this.monthlyOutComeForMonth=result;
    });
  }
}
