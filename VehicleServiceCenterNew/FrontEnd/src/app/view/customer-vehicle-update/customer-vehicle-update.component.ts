import { Component, OnInit } from '@angular/core';
import {Vehicle} from "../../Model/Vehicle";
import {CustomerService} from "../../Service/customer.service";
import {VehicleService} from "../../Service/vehicle.service";
import {Customer} from "../../Model/Customer";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MakeModel} from "../../Model/MakeModel";
import {MakeModelService} from "../../Service/make-model.service";

@Component({
  selector: 'app-customer-vehicle-update',
  templateUrl: './customer-vehicle-update.component.html',
  styleUrls: ['./customer-vehicle-update.component.css']
})
export class CustomerVehicleUpdateComponent implements OnInit {

  constructor(private vehicleService :VehicleService,private customerService : CustomerService,private make_model_service :MakeModelService) { }

  ngOnInit() {
  }


  customerNic :string;

  form = new FormGroup({
    nic1: new FormControl('', Validators.required),
    vehicleNumber: new FormControl('', Validators.required),
    engineNumber: new FormControl('', Validators.required),
    vehicleClass: new FormControl('', Validators.required),
    vehicleMake: new FormControl('', Validators.required),
    vehicleModel: new FormControl('', Validators.required),
    yearOfManufacture: new FormControl('', Validators.required),
  });

  form1 = new FormGroup({

    fName:new FormControl('',Validators.required),
    lName:new FormControl('',Validators.required),
    email:new FormControl('',[Validators.required,Validators.email]),
    nic: new FormControl('', Validators.required),
    address:new FormControl('',Validators.required),
    birthday:new FormControl('',Validators.required),
    phoneNumber:new FormControl('',[Validators.required,Validators.maxLength(10)]),

  });



    searchVehicleValuesIf = true;
    searchVehicleDetails : Vehicle = new Vehicle();
    
    updateVehicleDetails : Vehicle = new Vehicle();
    inputFieldCustomer :Customer = new Customer();
    // updateCustomerDetails : Customer = new Customer();
    searchVehicleNumber :string;

    searchVehicleDetailsByNumber(event: any){
        this.vehicleService.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{


            if(result==null){
                
                this.searchVehicleValuesIf=true;

            }else{
                
                this.searchVehicleValuesIf=false;
                this.searchVehicleDetails=result;
                this.inputFieldCustomer=result.customer;

              this.customerNic=this.searchVehicleDetails.customer.nic;
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

    UpdateCustomerDetails(){
      
        this.customerService.UpdateCustomerDetails(this.inputFieldCustomer).subscribe((result)=>{
            
            
            
            if(result!=null){
                
                alert("Cutomer Updated SuccessFully");
                this.inputFieldCustomer=new Customer();
              this.searchVehicleDetails = new Vehicle();
              this.form1.reset();

            }
            
            
        });
    }
    
    UpdateVehicleDetails(){

        this.searchVehicleDetails.customer.nic=this.customerNic;
        this.vehicleService.UpdateVehicleDetails(this.searchVehicleDetails).subscribe((result)=>{

            if(result!=null){
                
                alert("Vehicle Updated SuccessFully");
           //   this.inputFieldCustomer = this.searchVehicleDetails.customer;
              this.searchVehicleDetails = new Vehicle();
              this.searchVehicleDetails.customer=new Customer();
              this.form.reset();
            }
            
        });
    }

    deleteVehicle(){
        this.vehicleService.deleteVehicle(this.searchVehicleDetails.vehicleId).subscribe((result)=>{

            if(result==null){

                alert('Vehicle Deleted SuccessFully');
                this.searchVehicleDetails = new Vehicle();
            }else{

                alert('Vehicle Deleted Fail');

            }
        });
    }

  /////////////////////////////Select Model according to the Make  ///////////////////

  insertItemModel:string;
  searchMakesByModel :Array<MakeModel>= new Array<MakeModel>();
  insertselectedMake:string;

  getMakeModelDetails(value :string){


    this.make_model_service.getMakeModelDetails(value).subscribe((result)=>{

      if(result!=null){

        this.searchMakesByModel=result;
        //this.addTableModel=null;

      }
    });

  }

}
