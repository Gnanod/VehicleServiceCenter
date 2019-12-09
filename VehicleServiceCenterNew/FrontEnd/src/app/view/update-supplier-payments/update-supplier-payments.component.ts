import {Component, OnInit} from '@angular/core';
import {SupplierPayementsComponent} from "../supplier-payements/supplier-payements.component";
import {RuntimDataService} from "../../Service/runtim-data.service";
import {CreditPaymentDto} from "../../DTO/CreditPaymentDto";
import {StockService} from "../../Service/stock.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-update-supplier-payments',
  templateUrl: './update-supplier-payments.component.html',
  styleUrls: ['./update-supplier-payments.component.css']
})
export class UpdateSupplierPaymentsComponent implements OnInit {

  constructor(public runtimeServic :RuntimDataService,public stockService :StockService,public router : Router,public datePipe : DatePipe) { }

  creditPaymentDto :CreditPaymentDto;
  payAmount:number;
  tempCredit:number;
  paymentType:string;

  ngOnInit() {
    this.creditPaymentDto=this.runtimeServic.getPayementDetails();
    this.tempCredit=this.creditPaymentDto.credit_balance;
    this.creditPaymentDto.stock_payement_date =this.datePipe.transform(new Date(), 'yyyy-MM-dd');

  }


  calculateBalance() {
    if(this.tempCredit >=this.payAmount){
      let credit :number = this.tempCredit -  this.payAmount;
      this.creditPaymentDto.credit_balance = credit;

    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Pay Amount is greater than Credit Balance.',
        showConfirmButton: false,
        timer: 1500
      })
      this.payAmount = parseFloat(this.payAmount.toString().substring(0,this.payAmount.toString().length-1));
    }
  }

  updateStockPayment(){
   if(this.creditPaymentDto.credit_balance==0){
     this.creditPaymentDto.paymentType='Full Payment';

   }else if(this.creditPaymentDto.credit_balance > this.payAmount){
     this.creditPaymentDto.paymentType='Credit Payment';
   }
    this.stockService.updateStockPayments(this.creditPaymentDto).subscribe((result) => {
      if (result != null) {
       // alert("Updated Successfully");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Updated Successfully.',
          showConfirmButton: false,
          timer: 1500
        })
       this.router.navigate(['/main/SupplierPayments']);
      }

    });
  }

}
