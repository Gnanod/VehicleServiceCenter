import { Component, OnInit } from '@angular/core';
import {LowStockLevelDTO} from "../../DTO/LowStockLevelDTO";
import {StockServiceService} from "../../Service/stock-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-low-stock-level',
  templateUrl: './low-stock-level.component.html',
  styleUrls: ['./low-stock-level.component.css']
})
export class LowStockLevelComponent implements OnInit {


  public constructor(private stockService: StockServiceService, private router: Router) {
  }

  LowStockLevel: Array<LowStockLevelDTO> = new Array<LowStockLevelDTO>();

  ngOnInit() {

    if (localStorage.getItem("Admin") != 'admin') {
      this.router.navigate(['login']);
      localStorage.clear();
      localStorage.removeItem("Admin");
      localStorage.removeItem("Cashier")
    }

    this.getLowStockLevel();
  }


  getLowStockLevel() {

    this.stockService.lowStock().subscribe((result) => {

      if (result != null) {
        this.LowStockLevel = result;
      }
    });


  }

}
