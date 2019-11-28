import {Component, OnInit} from '@angular/core';
import {SupplierPayementsComponent} from "../supplier-payements/supplier-payements.component";
import {RuntimDataService} from "../../Service/runtim-data.service";
import {CreditPaymentDto} from "../../DTO/CreditPaymentDto";

@Component({
  selector: 'app-update-supplier-payments',
  templateUrl: './update-supplier-payments.component.html',
  styleUrls: ['./update-supplier-payments.component.css']
})
export class UpdateSupplierPaymentsComponent implements OnInit {

  constructor(public runtimeServic :RuntimDataService) { }

  creditPaymentDto :CreditPaymentDto;

  ngOnInit() {
    this.creditPaymentDto=this.runtimeServic.getPayementDetails();
  }

}
