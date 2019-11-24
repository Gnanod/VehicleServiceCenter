import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../../Service/supplier.service";
import {StockService} from "../../Service/stock.service";
import {Supplier} from "../../Model/Supplier";
import {UpdateJobPrice} from "../../DTO/UpdateJobPrice";
import {CreditPaymentDto} from "../../DTO/CreditPaymentDto";
import {NgbModalModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-supplier-payements',
  templateUrl: './supplier-payements.component.html',
  styleUrls: ['./supplier-payements.component.css']
})
export class SupplierPayementsComponent implements OnInit {

  constructor(public stockService:StockService) { }

  creditPaymentDto :Array<CreditPaymentDto> = new Array<CreditPaymentDto>();
  ngOnInit() {

    this.getCreditPaymentDetails();

  }

  getCreditPaymentDetails(){

    this.stockService.getCreditPaymentDetails().subscribe((result) => {

      if (result != null) {

        this.creditPaymentDto =result;

      }

    });
  }

}
