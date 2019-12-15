import {Component, OnInit} from '@angular/core';
import {StockService} from "../../Service/stock.service";
import {LowStockLevelDTO} from "../../DTO/LowStockLevelDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-low-stock-level',
  templateUrl: './low-stock-level.component.html',
  styleUrls: ['./low-stock-level.component.css']
})
export class LowStockLevelComponent implements OnInit {

  public constructor(private stockService: StockService, private router: Router) {
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
