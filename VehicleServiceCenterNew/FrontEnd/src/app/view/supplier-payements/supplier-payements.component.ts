import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SupplierService} from "../../Service/supplier.service";
import {StockService} from "../../Service/stock.service";
import {Supplier} from "../../Model/Supplier";
import {UpdateJobPrice} from "../../DTO/UpdateJobPrice";
import {CreditPaymentDto} from "../../DTO/CreditPaymentDto";
import {NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {RuntimDataService} from "../../Service/runtim-data.service";


@Component({
  selector: 'app-supplier-payements',
  templateUrl: './supplier-payements.component.html',
  styleUrls: ['./supplier-payements.component.css']
})
export class SupplierPayementsComponent implements OnInit {

  constructor(public stockService:StockService,public router:Router,public runtimeServic :RuntimDataService) { }

   creditPaymentDto :Array<CreditPaymentDto> = new Array<CreditPaymentDto>();

  message: string = "Hola Mundo!"

  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {

  }
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

  name :string = "Gnanod"
  viewPaymentDetails(){

    this.runtimeServic.sendData(this.name);


  }

}
