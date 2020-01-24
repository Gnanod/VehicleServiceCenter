import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Supplier} from "../../Model/Supplier";
import {SupplierserviceService} from "../../Service/supplierservice.service";
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {


  form = new FormGroup({

    agentName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    companyName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),

  });

  public supplier: Supplier = new Supplier();

  constructor(public supplierService: SupplierserviceService) {

  }

  searchSupplierValuesIf = true;
  searchSupplierDetails: Array<Supplier> = new Array<Supplier>();
  updateSuppliers: Supplier;
  updateSupplierDetails: Supplier = new Supplier();
  searchSupplierNumber: number;

  UpdateSupplierDetails() {

    this.supplierService.UpdateSupplierDetails(this.updateSuppliers).subscribe((result) => {

      if (result != null) {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Supplier Updated SuccessFully.',
          showConfirmButton: false,
          timer: 1500
        });

        this.updateSuppliers = new Supplier();

      }

    });
  }

  supplierName: string;

  searchSupplierDetailsByName() {
    this.supplierService.searchSupplierDetails(this.supplierName).subscribe((result) => {


      if (result.length == 0) {
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

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Added Successfully.',
          showConfirmButton: false,
          timer: 1500
        });
        this.supplier = new Supplier();
        this.form.reset();
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Added Fail.',
          showConfirmButton: false,
          timer: 1500
        });
      }

    })


  }

  deleteSupplier(id: any) {

    if (confirm("Do you really want to Delete......!")) {

      this.supplierService.deleteSupplier(id).subscribe((result) => {

        if (result == null) {

          // alert('Supplier Deleted SuccessFully');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Supplier Deleted SuccessFully.',
            showConfirmButton: false,
            timer: 1500
          });

          this.searchSupplierDetails = new Array<Supplier>();
          this.searchSupplierValuesIf = true;
        } else {


          // alert('Supplier Deleted Fail');

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Supplier Deleted Fail.',
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } else {

    }


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

    this.updateSuppliers = searchSupplierDetails;
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

    if (this.upSupplierId != null) {
      if (this.upSupplierAgent.length != 0) {
        if (this.upSupplierAddress.length != 0) {
          if (this.upSupplierCompany.length != 0) {
            if (this.upSupplierPhone.length != 0) {
              this.updateSupplierVar.supplierId = this.upSupplierId;
              this.updateSupplierVar.agentName = this.upSupplierAgent;
              if (this.upSupplierEmail == null) {
                this.updateSupplierVar.email = "-";
              } else {
                this.updateSupplierVar.email = this.upSupplierEmail;
              }
              this.updateSupplierVar.address = this.upSupplierAddress;
              this.updateSupplierVar.companyName = this.upSupplierCompany;
              this.updateSupplierVar.phoneNumber = this.upSupplierPhone;

              this.supplierService.updateSupplier(this.updateSupplierVar).subscribe(result => {
                if (result != null) {
                  // alert("Updated successfully")
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Updated successfully...',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  this.upSupplierId = null;
                  this.upSupplierAgent = null;
                  this.upSupplierEmail = null;
                  this.upSupplierAddress = null;
                  this.upSupplierCompany = null;
                  this.upSupplierPhone = null;
                }
              });
            } else {

              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Phone Number Field Is Empty',
                showConfirmButton: false,
                timer: 1500
              });
            }
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Company Name Field Is Empty',
              showConfirmButton: false,
              timer: 1500
            });
          }
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Supplier Address Field Is Empty',
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Supplier Name Field Is Empty',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Supplier Id Field Is Empty',
        showConfirmButton: false,
        timer: 1500
      });
    }


  }


}
