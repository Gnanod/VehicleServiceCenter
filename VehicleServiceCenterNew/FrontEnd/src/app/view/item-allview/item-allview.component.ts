import { Component, OnInit } from '@angular/core';
import {ItemService} from "../../Service/item.service";
import {Item} from "../../Model/Item";
import {Router} from "@angular/router";
import {Ng2SearchPipeModule} from "ng2-search-filter";

@Component({
  selector: 'app-item-allview',
  templateUrl: './item-allview.component.html',
  styleUrls: ['./item-allview.component.css']
})
export class ItemAllviewComponent implements OnInit {


  constructor(public itemService :ItemService,private router: Router) { }
  items: Array<Item> = new Array<Item>();
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
