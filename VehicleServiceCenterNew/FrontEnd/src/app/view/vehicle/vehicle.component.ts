import { Component, OnInit } from '@angular/core';
import {Customer} from "../../Model/Customer";
import {Vehicle} from "../../Model/Vehicle";
import {CustomerService} from "../../Service/customer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleService} from "../../Service/vehicle.service";
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import {MakeModel} from "../../Model/MakeModel";
import {MakeModelService} from "../../Service/make-model.service";

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  faCoffee = faCoffee;
  cust :Customer = new Customer();
  vehNgModel :Vehicle = new Vehicle();
  addCustomer : Customer = new Customer();
  selectVehicleClass:FormControl = new FormControl();
  getCustomerNic  :string;
  stringDateModel: string = new Date().toString();
  searchCustomerName :string ;
  searchCustomerValuesIf = true;
  searchCustomerDetails : Customer = new Customer();
  nic :string;

  form1 = new FormGroup({

    fName:new FormControl('',Validators.required),
    lName:new FormControl('',Validators.required),
    nic: new FormControl('', Validators.required),
    address:new FormControl('',Validators.required),
    birthday:new FormControl('',Validators.required),
     phoneNumber:new FormControl('',[Validators.required,Validators.maxLength(10)]),

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


  constructor(private customerService :CustomerService,private vehicleService :VehicleService,private make_model_service :MakeModelService) {
      this.selectVehicleClass.setValue('A');
  }

  ngOnInit() {
    
  }

    addCustomerDetails(){
    
      this.customerService.addCustomerDetails(this.addCustomer).subscribe((result)=>{
        
        if(result!=null){
          
          alert('Customer Added SuccessFully');
          this.addCustomer = new Customer();
          this.form1.reset();
          
        }
      });
    }

    addVehicleDetails(){

    let customer : Customer = new Customer();

    customer.nic=this.nic;
    console.log("Nic"+this.nic);
    
    this.vehNgModel.customer=customer;
    this.vehNgModel.yearOfManufacture=this.stringDateModel.toString();

    this.vehNgModel.vehicleMake=this.insertselectedMake;

    this.vehicleService.addVehicle(this.vehNgModel).subscribe((result)=>{
        if(result!=null){
           alert('Vehicle Added SuccessFully');
           this.vehNgModel = new Vehicle();
           this.form.reset();
        }
    })
    
    // console.log(this.cust.nic);
    // console.log(this.selectVehicleClass.value);
    // console.log(this.stringDateModel.toString());
    }
    
    


    searchByCustomerName(){
  
    this.customerService.searchByCustomerName(this.searchCustomerName).subscribe((result)=>{

        if(result==null){
            this.searchCustomerValuesIf=true;
            
        }else{
            this.searchCustomerValuesIf=false;
            this.searchCustomerDetails = result;
        }
      
    });
    }

    deleteCustomer(){

      if (confirm("Do you really want to Delete......!")) {
        this.customerService.deleteCustomer(this.searchCustomerDetails.nic).subscribe((result)=>{

          if(result==null){

            alert('Customer Deleted SuccessFully');

          }else{

            alert('Customer Deleted Fail');

          }
        });
      } else {

      }

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
  selectedMake:string;
  addTableModel:string;
  tableMakeModel :Array<MakeModel> = new Array<MakeModel>();
  addToTable(){

    console.log('GGGGGG');

    let makeModel : MakeModel = new MakeModel();
    console.log("selectedmake"+this.selectedMake);
    makeModel.makeName=this.selectedMake;
    makeModel.modelName=this.addTableModel;

    if(this.selectedMake !=null && this.addTableModel!=null){

      this.tableMakeModel.push(makeModel);

    }


  }

  deleteMakeModel(id){

    for(let i = 0; i < this.tableMakeModel.length; ++i){
      if (this.tableMakeModel[i].modelName === id) {
        this.tableMakeModel.splice(i,1);
      }
    }

  }

  addMakeModelDetails(){

    if( this.tableMakeModel.length!=0){

      this.make_model_service.addMakeModelDetails(this.tableMakeModel).subscribe((result)=>{

        if(result!=null){

          alert('Makes Added SuccessFully');
          this.addTableModel= null;
          this.tableMakeModel= new Array<MakeModel>();
        }
      });

    }else{

      alert('Please Add Models To Table');

    }

  }

}
