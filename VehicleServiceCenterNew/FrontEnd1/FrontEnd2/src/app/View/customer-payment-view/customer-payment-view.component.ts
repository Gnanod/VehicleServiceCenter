import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {StockServiceService} from "../../Service/stock-service.service";
import {CustomerPaymentViewDto} from "../../DTO/CustomerPaymentViewDto";

@Component({
  selector: 'app-customer-payment-view',
  templateUrl: './customer-payment-view.component.html',
  styleUrls: ['./customer-payment-view.component.css']
})
export class CustomerPaymentViewComponent implements OnInit {

  constructor(public stockService:StockServiceService,public router:Router) { }

  creditPaymentDto :Array<CustomerPaymentViewDto> = new Array<CustomerPaymentViewDto>();


  ngOnInit() {

    this.getCustomerPaymentDetails();

  }


  getCustomerPaymentDetails() {

    this.stockService.getCustomerPaymentDetails().subscribe((result) => {
      if (result != null) {

        this.creditPaymentDto =result;
      }

    });

  }

}
