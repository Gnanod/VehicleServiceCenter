import {Component, OnInit} from '@angular/core';
import {StockService} from "../../Service/stock.service";
import {MonthlyOutComeReport} from "../../DTO/MonthlyOutComeReport";
import {Router} from "@angular/router";

@Component({
  selector: 'app-monthly-out-come-report',
  templateUrl: './monthly-out-come-report.component.html',
  styleUrls: ['./monthly-out-come-report.component.css']
})
export class MonthlyOutComeReportComponent implements OnInit {

  constructor(private stockService: StockService,private router:Router) {
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
