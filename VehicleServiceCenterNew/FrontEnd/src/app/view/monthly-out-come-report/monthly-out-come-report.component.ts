import {Component, OnInit} from '@angular/core';
import {StockService} from "../../Service/stock.service";
import {MonthlyOutComeReport} from "../../DTO/MonthlyOutComeReport";

@Component({
  selector: 'app-monthly-out-come-report',
  templateUrl: './monthly-out-come-report.component.html',
  styleUrls: ['./monthly-out-come-report.component.css']
})
export class MonthlyOutComeReportComponent implements OnInit {

  constructor(private stockService: StockService) {
  }

  monthlyReport: Array<MonthlyOutComeReport> = new Array<MonthlyOutComeReport>();

  ngOnInit() {
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
