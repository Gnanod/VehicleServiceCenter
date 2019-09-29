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

  constructor(private supplierService: SupplierService) {
  }

  searchSupplierValuesIf = true;
  searchSupplierDetails: Supplier = new Supplier();
  updateSupplierDetails: Supplier = new Supplier();
  searchSupplierNumber: number;

  UpdateSupplierDetails() {

    this.supplierService.UpdateSupplierDetails(this.searchSupplierDetails).subscribe((result) => {

      if (result != null) {

        alert("Supplier Updated SuccessFully");

      }

    });
  }

  supplierName: string;

  searchSupplierDetailsByName() {
    this.supplierService.searchSupplierDetails(this.supplierName).subscribe((result) => {


      if (result == null) {
        this.searchSupplierValuesIf = true;

      } else {
        this.searchSupplierValuesIf = false;
        this.searchSupplierDetails = result;
      }
    });
  }

  //ends here

  addSupplierDetails() {

    this.supplierService.addSupplier(this.supplier).subscribe((result) => {

      if (result != null) {
        alert("Added Successfully");
      }

    })


  }

  deleteSupplier() {
    this.supplierService.deleteSupplier(this.searchSupplierNumber).subscribe((result) => {

      if (result == null) {

        alert('Supplier Deleted SuccessFully');

      } else {

        alert('Supplier Deleted Fail');

      }
    });
  }

  ngOnInit() {
  }

  upSupplierId: number;
  upSupplierAgent: string;
  upSupplierEmail: string;
  upSupplierAddress: string;
  upSupplierCompany: string;
  upSupplierPhone: string;

  editSupplier(searchSupplierDetails: Supplier) {

    this.upSupplierId = searchSupplierDetails.supplierId;

    console.log(searchSupplierDetails.supplierId);

    this.upSupplierAgent = searchSupplierDetails.agentName;
    this.upSupplierEmail = searchSupplierDetails.email;
    this.upSupplierAddress = searchSupplierDetails.address;
    this.upSupplierCompany = searchSupplierDetails.companyName;
    this.upSupplierPhone = searchSupplierDetails.phoneNumber;


  }


  updateSupplierVar: Supplier = new Supplier();

  updateSupplier() {

    this.updateSupplierVar.supplierId = this.upSupplierId;
    this.updateSupplierVar.agentName = this.upSupplierAgent;
    this.updateSupplierVar.email = this.upSupplierEmail;
    this.updateSupplierVar.address = this.upSupplierAddress;
    this.updateSupplierVar.companyName = this.upSupplierCompany;
    this.updateSupplierVar.phoneNumber = this.upSupplierPhone;

    this.supplierService.updateSupplier(this.updateSupplierVar).subscribe(result => {
      if (result != null) {
        alert("Updated successfully")
      }
    });
  }


}
