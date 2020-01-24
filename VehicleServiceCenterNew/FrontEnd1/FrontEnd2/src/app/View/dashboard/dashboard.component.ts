import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {JoborderServiceService} from "../../Service/joborder-service.service";
import {StockServiceService} from "../../Service/stock-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public constructor(private jobOrderService :JoborderServiceService,private stockService:StockServiceService,private router:Router) { }

  ngOnInit() {

    if(localStorage.getItem("Admin")!='admin'){
      this.router.navigate(['login']);
      localStorage.clear();
      localStorage.removeItem("Admin");
      localStorage.removeItem("Cashier")
    }


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
