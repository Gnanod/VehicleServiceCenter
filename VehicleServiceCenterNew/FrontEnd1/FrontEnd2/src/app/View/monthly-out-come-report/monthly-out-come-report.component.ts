import { Component, OnInit } from '@angular/core';
import {StockServiceService} from "../../Service/stock-service.service";
import {Router} from "@angular/router";
import {MonthlyOutComeReport} from "../../DTO/MonthlyOutComeReport";

@Component({
  selector: 'app-monthly-out-come-report',
  templateUrl: './monthly-out-come-report.component.html',
  styleUrls: ['./monthly-out-come-report.component.css']
})
export class MonthlyOutComeReportComponent implements OnInit {


  constructor(private stockService: StockServiceService,private router:Router) {
  }

  monthlyReport: Array<MonthlyOutComeReport> = new Array<MonthlyOutComeReport>();

  ngOnInit() {
    if (localStorage.getItem("Admin") != 'admin') {
      this.router.navigate(['login']);
      localStorage.clear();
      localStorage.removeItem("Admin");
      localStorage.removeItem("Cashier")
    }

    this.getMonthlyOutComeReport();
  }

  getMonthlyOutComeReport() {

    this.stockService.getMonthlyOutCome().subscribe((result) => {

      if (result != null) {

        console.log(result)
        this.monthlyReport = result;
      }
    });


  }

}
