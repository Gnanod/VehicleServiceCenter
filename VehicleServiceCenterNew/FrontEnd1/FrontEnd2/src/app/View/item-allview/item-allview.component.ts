import { Component, OnInit } from '@angular/core';
import {ItemServiceService} from "../../Service/item-service.service";
import {Router} from "@angular/router";
import {Item} from "../../Model/Item";
import {ViewItemStockDTO} from "../../DTO/ViewItemStockDTO";

@Component({
  selector: 'app-item-allview',
  templateUrl: './item-allview.component.html',
  styleUrls: ['./item-allview.component.css']
})
export class ItemAllviewComponent implements OnInit {


  constructor(public itemService :ItemServiceService,private router: Router) { }
  items: Array<ViewItemStockDTO> = new Array<ViewItemStockDTO>();
  paginationNumber :number =1;
  searchPartNumber :string;
  ngOnInit() {

    if (localStorage.getItem("Admin") != 'admin') {
      this.router.navigate(['login']);
      localStorage.clear();
      localStorage.removeItem("Admin");
      localStorage.removeItem("Cashier")
    }
     this.getAllItems();

  }

  getAllItems(){
    this.itemService.getAllItems().subscribe((result) => {

      if (result != null) {
        this.items = result;
      }
    });
  }
}
