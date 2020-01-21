import {Component, OnInit} from '@angular/core';
import {Customer} from "../../Model/Customer";
import {Vehicle} from "../../Model/Vehicle";
import {CustomerService} from "../../Service/customer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleService} from "../../Service/vehicle.service";
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {MakeModel} from "../../Model/MakeModel";
import {MakeModelService} from "../../Service/make-model.service";
import {Make} from "../../Model/Make";
import {MakeServiceService} from "../../Service/make-service.service";
import {VehicleClass} from "../../DTO/VehicleClass";
import {ServicesService} from "../../Service/services.service";
import {VehicleClassService} from "../../Service/vehicle-class.service";

import Swal from 'sweetalert2';


// const Swal = require('sweetalert2')
// const swalWithBootstrapButtons = Swal.mixin({
//   customClass: {
//     confirmButton: 'btn btn-success',
//     cancelButton: 'btn btn-danger'
//   },
//   buttonsStyling: false
// })

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  faCoffee = faCoffee;
  cust: Customer = new Customer();
  vehNgModel: Vehicle = new Vehicle();
  addCustomer: Customer = new Customer();
  selectVehicleClass: FormControl = new FormControl();
  getCustomerNic: string;
  // stringDateModel: string = new Date().toString();
  stringDateModel: string;
  searchCustomerName: string;
  searchCustomerValuesIf = true;
  searchCustomerDetails: Array<Customer> = new Array<Customer>();
  nic: string;

  form1 = new FormGroup({

    fName: new FormControl('', Validators.required),
    lName: new FormControl('', Validators.required),
    nic: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),

  });

  form = new FormGroup({
    nic1: new FormControl('', Validators.required),
    vehicleNumber: new FormControl('', Validators.required),
    engineNumber: new FormControl('', Validators.required),
    vehicleClass: new FormControl('', Validators.required),
    vehicleMake: new FormControl('', Validators.required),
    vehicleModel: new FormControl('', Validators.required),
    yearOfManufacture: new FormControl('', Validators.required),
  })


  constructor(public vehicleClassService: VehicleClassService, private customerService: CustomerService, private vehicleService: VehicleService, private make_model_service: MakeModelService, private makeService: MakeServiceService) {
    this.selectVehicleClass.setValue('A');
  }

  ngOnInit() {

    this.findAllMakes();
    this.getAllClass();
    this.getCustomerLastId();
  }

  getCustomerLastId(){
    this.customerService.getCustomerlLastId().subscribe((result) => {
      if (result != null) {

        this.addCustomer.nic = result.nic;
        // this.stringLastId == this.lastId.serviceJobId;
        //
        // this.serviceInvoice.invoiceNumber = this.lastId.serviceJobId;


      }

    });
  }

  addCustomerDetails() {

    this.customerService.addCustomerDetails(this.addCustomer).subscribe((result) => {

      if (result != null) {

        // alert('Customer Added SuccessFully');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Customer Added SuccessFully',
          showConfirmButton: false,
          timer: 1500
        })
        this.addCustomer = new Customer();
        this.form1.reset();
        this.getCustomerLastId();

      }
    });
  }

  nic1: string;

  addVehicleDetails() {




    if (this.nic1 != null) {
      if (this.vehNgModel.vehicleNumber != null) {
        if (this.vehNgModel.engineNumber != null) {
          if (this.vehNgModel.vehicleClass != null) {
            if (this.insertselectedMake != null) {
              if (this.insertItemModel != null) {
                if (this.stringDateModel != null) {
                  let customer: Customer = new Customer();

                  customer.nic = this.nic1;
                  console.log("Nic" + this.nic);

                  this.vehNgModel.customer = customer;
                  this.vehNgModel.yearOfManufacture = this.stringDateModel.toString();

                  this.vehNgModel.vehicleMake = this.insertselectedMake;
                  this.vehNgModel.vehicleModel = this.insertItemModel;
                  this.vehicleService.addVehicle(this.vehNgModel).subscribe((result) => {
                    if (result != null) {
                      // alert('Vehicle Added SuccessFully');
                      Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Vehicle Added SuccessFully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      this.vehNgModel = new Vehicle();
                      this.form.reset();
                      this.getAllClass();
                    }
                  })
                } else {
                  Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'ManuFacture Date Field Is Empty',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }
              } else {
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Please Select Vehicle Model',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Select Vehicle Make',
                showConfirmButton: false,
                timer: 1500
              })
            }
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Please Select Vehicle Class',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Chassis Number Field Is Empty',
            showConfirmButton: false,
            timer: 1500
          })
        }
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Vehicle Number Field Is Empty',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Nic Field is Empty',
        showConfirmButton: false,
        timer: 1500
      })
    }


    // console.log(this.cust.nic);
    // console.log(this.selectVehicleClass.value);
    // console.log(this.stringDateModel.toString());
  }


  searchByCustomerName() {

    this.customerService.searchByCustomerName(this.searchCustomerName).subscribe((result) => {

      if (result.length == 0) {
        this.searchCustomerValuesIf = true;

      } else {
        this.searchCustomerValuesIf = false;
        this.searchCustomerDetails = result;
      }

    });
  }

  deleteCustomer(val: any) {



    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // }).then((result) => {
    //   if (result.value) {
    //
    //     this.customerService.deleteCustomer(value).subscribe((result)=>{
    //       if(result==null){
    //         //alert('Customer Deleted SuccessFully');
    //
    //         Swal.fire(
    //           'Deleted!',
    //           'Your file has been deleted.',
    //           'success'
    //         )
    //         this.searchCustomerDetails = new Array<Customer>();
    //         this.searchCustomerValuesIf=true;
    //       }else{
    //
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'Oops...',
    //           text: 'Customer Deleted Fail!',
    //         })
    //         //alert('Customer Deleted Fail');
    //
    //       }
    //     });
    //
    //   }
    // })

    if (confirm("Do you really want to Delete......!")) {
      this.customerService.deleteCustomer(val).subscribe((result) => {
        if (result == null) {
          //alert('Customer Deleted SuccessFully');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Customer Deleted SuccessFully.',
            showConfirmButton: false,
            timer: 1500
          })
          this.searchCustomerDetails = new Array<Customer>();
          this.searchCustomerValuesIf = true;
        } else {

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Customer Deleted Fail!',
            showConfirmButton: false,
            timer: 1500
          })


        }
      });
    } else {

    }


  }


  /////////////////////////////Select Model according to the Make  ///////////////////

  insertItemModel: string;
  searchMakesByModel: Array<MakeModel> = new Array<MakeModel>();
  insertselectedMake: string;

  //modelNameif =false;

  getMakeModelDetails(value: string) {

    this.make_model_service.getMakeModelDetails(this.insertselectedMake).subscribe((result) => {

      if (result != null) {
        //this.modelNameif=true;
        this.searchMakesByModel = result;


      }
    });

  }

  selectedMake: string;
  addTableModel: string;
  tableMakeModel: Array<MakeModel> = new Array<MakeModel>();

  addToTable() {

    console.log('GGGGGG');

    let makeModel: MakeModel = new MakeModel();
    console.log("selectedmake" + this.selectedMake);
    makeModel.makeName = this.selectedMake;
    makeModel.modelName = this.addTableModel;

    if (this.selectedMake != null) {
      if (this.addTableModel != null) {

        this.tableMakeModel.push(makeModel);

      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please Add Model Name',
          showConfirmButton: false,
          timer: 1500
        })
      }

    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Select Make',
        showConfirmButton: false,
        timer: 1500
      })

    }
    // if (this.selectedMake != null && this.addTableModel != null) {
    //
    //   this.tableMakeModel.push(makeModel);
    //
    // }


  }

  deleteMakeModel(id) {

    for (let i = 0; i < this.tableMakeModel.length; ++i) {
      if (this.tableMakeModel[i].modelName === id) {
        this.tableMakeModel.splice(i, 1);
      }
    }

  }

  addMakeModelDetails() {

    if (this.tableMakeModel.length != 0) {

      this.make_model_service.addMakeModelDetails(this.tableMakeModel).subscribe((result) => {

        if (result != null) {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Makes Added SuccessFully.',
            showConfirmButton: false,
            timer: 1500
          })

          this.addTableModel = null;
          this.tableMakeModel = new Array<MakeModel>();
        }
      });

    } else {


      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Add Models To Table.',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  makeModel: Make = new Make();
  addMakeName: string;

  addMake() {

    this.makeModel.makeName = this.addMakeName;

    console.log('KKKKKKKKK'+this.addMakeName);
    if(this.addMakeName!=null ){
      this.makeService.addMakes(this.makeModel).subscribe((result) => {

        if (result != null) {

          // alert("Stock Added Successfully");

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Make Added Successfully.',
            showConfirmButton: false,
            timer: 1500
          })
          this.findAllMakes();
          this.addMakeName=null;

          // document.getElementById('myModal10').
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Make Added Fail.',
            showConfirmButton: false,
            timer: 1500
          });
        }


      });
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Make Field Is Empty',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  findAllMakesToArray: Array<Make> = new Array<Make>();

  findAllMakes() {

    this.makeService.findAllMakes().subscribe((result) => {

      if (result != null) {

        this.findAllMakesToArray = result;

      }

    });
  }

  vehicleClassArray: Array<VehicleClass> = new Array<VehicleClass>();


  getAllClass() {
    this.vehicleClassService.getAllClass().subscribe((result) => {

      if (result != null) {
        this.vehicleClassArray = result;
      }

    });
  }


  modalPopUp =false;
  openModal(){
    this.modalPopUp=true;
  }

  closeModal(){
    this.modalPopUp=false;
  }
}
