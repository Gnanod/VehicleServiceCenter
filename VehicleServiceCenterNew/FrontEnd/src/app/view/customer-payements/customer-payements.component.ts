import { Component, OnInit } from '@angular/core';
import {SupplierService} from "../../Service/supplier.service";
import {UpdateJobPrice} from "../../DTO/UpdateJobPrice";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";

@Component({
  selector: 'app-customer-payements',
  templateUrl: './customer-payements.component.html',
  styleUrls: ['./customer-payements.component.css']
})
export class CustomerPayementsComponent implements OnInit {

  constructor(public supplierService:SupplierService,private datePipe :DatePipe) { }

  ngOnInit() {
  }

  serviceId:string;
  vehicleNumber:string;
  date:string;
  paymentType :string;
  amount:number;
  creditBalance:number;
  payAmount:number=0.00;
  tempCredit :number;
  searchServiceDetailsByNumber() {
    this.supplierService.searchServiceDetailsByNumber(this.serviceId).subscribe((result) => {
      if (result != null) {
        this.vehicleNumber = result.vehicleNumber;
        this.date = result.date;
        this.paymentType = result.paymentType;
        this.amount = result.grossAmount;
        this.creditBalance = result.creditBalance;
        this.tempCredit=this.creditBalance;
      } else {
        // alert('Service Details Is Not Found');
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Service Details Is Not Found.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }

  calculateTotal(){
    if(this.tempCredit >=this.payAmount){
      let credit :number = this.tempCredit -  this.payAmount;
      this.creditBalance = credit;
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

  updateSupplierPayments(){

    let uj: UpdateJobPrice = new UpdateJobPrice();

    uj.vehicleNumber = this.vehicleNumber;
    uj.date =this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    uj.grossAmount = this.amount;
    uj.creditBalance = this.creditBalance;
    if(this.creditBalance===0){
        uj.paymentType='Full Payment';
    }else{
      uj.paymentType='Credit Payment'
    }
    uj.payAmount = this.payAmount;
    uj.service_id = this.serviceId;

    this.supplierService.updateSupplierPayments(uj).subscribe((result) => {
      if (result != null) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Payment Updated SuccessFully.',
          showConfirmButton: false,
          timer: 1500
        })

        this.vehicleNumber=null;
        this.date =null;
        this.amount=null;
        this.creditBalance=null;
        this.payAmount=null;
        this.serviceId=null;

      } else {
        // alert('Service Details Is Not Found')
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Service Details Is Not Found.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }



}
