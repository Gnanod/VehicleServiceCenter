import {Component, OnInit} from '@angular/core';
import {Vehicle} from "../../Model/Vehicle";
import {CustomerService} from "../../Service/customer.service";
import {VehicleService} from "../../Service/vehicle.service";
import {Customer} from "../../Model/Customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MakeModel} from "../../Model/MakeModel";
import {MakeModelService} from "../../Service/make-model.service";
import Swal from "sweetalert2";
import {VehicleClass} from "../../DTO/VehicleClass";
import {Make} from "../../Model/Make";
import {MakeServiceService} from "../../Service/make-service.service";
import {VehicleClassService} from "../../Service/vehicle-class.service";

@Component({
  selector: 'app-customer-vehicle-update',
  templateUrl: './customer-vehicle-update.component.html',
  styleUrls: ['./customer-vehicle-update.component.css']
})
export class CustomerVehicleUpdateComponent implements OnInit {

  public constructor(public vehicleClassService: VehicleClassService, private makeService: MakeServiceService, private vehicleService: VehicleService, private customerService: CustomerService, private make_model_service: MakeModelService) {
  }

  ngOnInit() {
    this.findAllMakes();
    this.getAllClass();
  }

  vehicleClassArray: Array<VehicleClass> = new Array<VehicleClass>();
  findAllMakesToArray: Array<Make> = new Array<Make>();

  findAllMakes() {

    this.makeService.findAllMakes().subscribe((result) => {

      if (result != null) {
        console.log(result[0]);
        this.findAllMakesToArray = result;

      }

    });
  }

  getAllClass() {
    this.vehicleClassService.getAllClass().subscribe((result) => {

      if (result != null) {
        this.vehicleClassArray = result;
      }

    });
  }

  customerNic: string;

  // form = new FormGroup({
  //   nic1: new FormControl('', Validators.required),
  //   vehicleNumber: new FormControl('', Validators.required),
  //   engineNumber: new FormControl('', Validators.required),
  //   vehicleClass: new FormControl('', Validators.required),
  //   vehicleMake: new FormControl('', Validators.required),
  //   vehicleModel: new FormControl('', Validators.required),
  //   yearOfManufacture: new FormControl('', Validators.required),
  // });
  vehNgModel: Vehicle = new Vehicle();
  stringDateModel: string;
  form = new FormGroup({
    nic1: new FormControl('', Validators.required),
    vehicleNumber: new FormControl('', Validators.required),
    engineNumber: new FormControl('', Validators.required),
    vehicleClass: new FormControl('', Validators.required),
    vehicleMake: new FormControl('', Validators.required),
    vehicleModel: new FormControl('', Validators.required),
    yearOfManufacture: new FormControl('', Validators.required),
  })

  form1 = new FormGroup({

    fName: new FormControl('', Validators.required),
    lName: new FormControl('', Validators.required),
    //email:new FormControl('',[Validators.required,Validators.email]),
    nic: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10)]),

  });


  searchVehicleValuesIf = true;
  searchVehicleDetails: Vehicle = new Vehicle();

  updateVehicleDetails: Vehicle = new Vehicle();
  inputFieldCustomer: Customer = new Customer();
  // updateCustomerDetails : Customer = new Customer();
  searchVehicleNumber: string;
  nic1: string;
  insertselectedMake: string;

  searchVehicleDetailsByNumber(event: any) {
    this.vehicleService.searchVehicleDetails(this.searchVehicleNumber).subscribe((result) => {


      if (result == null) {

        this.searchVehicleValuesIf = true;

      } else {

        this.searchVehicleValuesIf = false;
        this.searchVehicleDetails = result;
        this.inputFieldCustomer = result.customer;
        this.vehNgModel = this.searchVehicleDetails;
        this.nic1 = this.searchVehicleDetails.customer.nic;
        this.stringDateModel = this.searchVehicleDetails.yearOfManufacture;


        this.customerNic = this.searchVehicleDetails.customer.nic;
      }
    });
  }

  // searchVehicleDetailsByNumber(){
  //
  //   this.vehicleService.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{
  //
  //
  //       if(result==null){
  //           this.searchVehicleValuesIf=true;
  //
  //       }else{
  //           this.searchVehicleValuesIf=false;
  //           this.searchVehicleDetails=result;
  //           this.inputFieldCustomer=result.customer;
  //
  //       }
  //   });
  // }

  UpdateCustomerDetails() {

    this.customerService.UpdateCustomerDetails(this.inputFieldCustomer).subscribe((result) => {


      if (result != null) {

        // alert("Cutomer Updated SuccessFully");
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Customer Updated SuccessFully.',
          showConfirmButton: false,
          timer: 1500
        })
        this.inputFieldCustomer = new Customer();
        this.searchVehicleDetails = new Vehicle();
        this.form1.reset();

      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Customer Updated Fail.',
          showConfirmButton: false,
          timer: 1500
        })
      }


    });
  }


  UpdateVehicleDetails() {
    //
    // this.searchVehicleDetails.customer.nic=this.customerNic;
    // this.vehicleService.UpdateVehicleDetails(this.searchVehicleDetails).subscribe((result)=>{
    //
    //     if(result!=null){
    //
    //         // alert("Vehicle Updated SuccessFully");
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'success',
    //         title: 'Vehicle Updated SuccessFully.',
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    //    //   this.inputFieldCustomer = this.searchVehicleDetails.customer;
    //       this.searchVehicleDetails = new Vehicle();
    //       this.searchVehicleDetails.customer=new Customer();
    //       this.form.reset();
    //     }else{
    //       Swal.fire({
    //         position: 'top-end',
    //         icon: 'error',
    //         title: 'Vehicle Updated Fail.',
    //         showConfirmButton: false,
    //         timer: 1500
    //       })
    //     }
    //
    // });


    if (this.nic1 != null) {
      if (this.vehNgModel.vehicleNumber != null) {
        if (this.vehNgModel.engineNumber != null) {
          if (this.vehNgModel.vehicleClass != null) {
            if (this.insertselectedMake != null) {
              if (this.insertItemModel != null) {
                if (this.stringDateModel != null) {
                  let customer: Customer = new Customer();

                  customer.nic = this.nic1;


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
                        title: 'Vehicle Updated SuccessFully',
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

  }

  deleteVehicle() {

    if (confirm("Do you really want to Delete!")) {

      this.vehicleService.deleteVehicle(this.searchVehicleDetails.vehicleId).subscribe((result) => {

        if (result == null) {

          // alert('Vehicle Deleted SuccessFully');
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vehicle Deleted SuccessFully.',
            showConfirmButton: false,
            timer: 1500
          })
          this.searchVehicleDetails = new Vehicle();
        } else {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Vehicle Deleted Fail.',
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


  getMakeModelDetails(value: string) {

    console.log("GGGGGGGGGGGG" + value);
    this.make_model_service.getMakeModelDetails(this.insertselectedMake).subscribe((result) => {

      if (result != null) {

        this.searchMakesByModel = result;
        //this.addTableModel=null;

      }
    });

  }

}
