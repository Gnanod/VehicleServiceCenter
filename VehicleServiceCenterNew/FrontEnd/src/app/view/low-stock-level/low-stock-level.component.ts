import { Component, OnInit } from '@angular/core';
import {StockService} from "../../Service/stock.service";
import {LowStockLevelDTO} from "../../DTO/LowStockLevelDTO";

@Component({
  selector: 'app-low-stock-level',
  templateUrl: './low-stock-level.component.html',
  styleUrls: ['./low-stock-level.component.css']
})
export class LowStockLevelComponent implements OnInit {

  constructor(private stockService:StockService) { }

  LowStockLevel :Array<LowStockLevelDTO> = new Array<LowStockLevelDTO>();

  ngOnInit() {
this.getLowStockLevel();
  }




  getLowStockLevel(){

    this.stockService.lowStock().subscribe((result)=>{

      if(result !=null){
        this.LowStockLevel=result;
      }
    });


  }

}
