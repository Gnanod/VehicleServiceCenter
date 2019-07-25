import { Component, OnInit } from '@angular/core';
import {Supplier} from "../../Model/Supplier";
import {SupplierService} from "../../Service/supplier.service";

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  private supplier: Supplier = new Supplier();

  constructor(private supplierService: SupplierService) { }

  searchSupplierValuesIf = true;
  searchSupplierDetails : Supplier = new Supplier();
  updateSupplierDetails : Supplier = new Supplier();
  searchSupplierNumber : number;

  UpdateSupplierDetails(){

    this.supplierService.UpdateSupplierDetails(this.searchSupplierDetails).subscribe((result)=>{

      if(result!=null){

        alert("Supplier Updated SuccessFully");

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
