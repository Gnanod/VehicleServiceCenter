import { Component, OnInit } from '@angular/core';
import {Supplier} from "../../Model/Supplier";
import {SupplierService} from "../../Service/supplier.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  form = new FormGroup({

    agentName:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    address:new FormControl('',Validators.required),
    companyName:new FormControl('',Validators.required),
    phoneNumber:new FormControl('',[Validators.required,Validators.maxLength(10)]),

  });

  private supplier: Supplier = new Supplier();

  public constructor(private supplierService: SupplierService) { }

  searchSupplierValuesIf = true;
  searchSupplierDetails : Supplier = new Supplier();
  updateSupplierDetails : Supplier = new Supplier();
  searchSupplierNumber : number;

  UpdateSupplierDetails(){

    this.supplierService.UpdateSupplierDetails(this.searchSupplierDetails).subscribe((result)=>{

      if(result!=null){

        alert("Supplier Updated SuccessFully");
        this.searchSupplierDetails = new Supplier();

      }

    });
  }

  searchSupplierDetailsByNumber(){
    this.supplierService.searchSupplierDetails(this.searchSupplierNumber).subscribe((result)=>{


      if(result==null){
        this.searchSupplierValuesIf=true;

      }else{
        this.searchSupplierValuesIf=false;
        this.searchSupplierDetails=result;
      }
    });
  }

  //ends here

  addSupplierDetails(){

    this.supplierService.addSupplier(this.supplier).subscribe((result)=>{

      if (result != null){
        alert("Added Successfully");
        this.supplier = new Supplier();
        this.form.reset();
      }

    })


  }

  deleteSupplier(){
    this.supplierService.deleteSupplier(this.searchSupplierNumber).subscribe((result)=>{

      if(result==null){

        alert('Supplier Deleted SuccessFully');

      }else{

        alert('Supplier Deleted Fail');

      }
    });
  }

  ngOnInit() {
  }

}
