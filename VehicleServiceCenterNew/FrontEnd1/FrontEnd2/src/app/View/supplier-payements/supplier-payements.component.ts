import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {CreditPaymentDto} from "../../DTO/CreditPaymentDto";
import {StockServiceService} from "../../Service/stock-service.service";
import {Router} from "@angular/router";
import {RuntimDataServiceService} from "../../Service/runtim-data-service.service";

@Component({
  selector: 'app-supplier-payements',
  templateUrl: './supplier-payements.component.html',
  styleUrls: ['./supplier-payements.component.css']
})
export class SupplierPayementsComponent implements OnInit {

  constructor(public stockService:StockServiceService,public router:Router,public runtimeServic :RuntimDataServiceService) { }

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


  viewPaymentDetails(paymet :CreditPaymentDto){
    this.runtimeServic.sendData(paymet);
    this.router.navigate(['/main/UpdateSupplierPayments']);
  }


}
