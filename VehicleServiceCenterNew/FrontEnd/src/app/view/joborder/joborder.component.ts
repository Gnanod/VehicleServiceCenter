import { Component, OnInit } from '@angular/core';
import {JobOrder} from "../../Model/JobOrder";
import {JoborderService} from "../../Service/joborder.service";
import {Vehicle} from "../../Model/Vehicle";
import {VehicleService} from "../../Service/vehicle.service";
import {Customer} from "../../Model/Customer";
import {Item} from "../../Model/Item";
import {MakeModelService} from "../../Service/make-model.service";
import {MakeModel} from "../../Model/MakeModel";
import {ItemService} from "../../Service/item.service";
import {StockItemDetail} from "../../Model/StockItemDetail";
import {JobOrderItemDetails} from "../../Model/JobOrderItemDetails";
import {DatePipe} from "@angular/common";
import {JobOrderDTO} from "../../DTO/JoOrderDTO";

@Component({
  selector: 'app-joborder',
  templateUrl: './joborder.component.html',
  styleUrls: ['./joborder.component.css']
})
export class JoborderComponent implements OnInit {

  private joborder: JobOrder = new JobOrder();
  constructor(private joborderservice : JoborderService
  ,private vehicleservice : VehicleService,private make_model_service :MakeModelService , private  itemService:ItemService ,private jobOrderService :JoborderService,private datePipe :DatePipe) { }

///////////////////
  searchItem :string;
  insertItemModel:string;
  insertItemModel1:string;

  insertselectedMake1:string;
  insertselectedMake:string;

  insertItemName:string;
  insertItemName1 :string;

  unitPrice : number;
  unitPrice1 : number;

  itemId :number;

  item :Item = new Item();
  item1 :Item = new Item();


  type :string;

  quantity:number;
  quantity1:number;

  totAmount :number=0;
  totAmount1 :number=0;

  jobOrderItemDetailsArray:Array<JobOrderItemDetails> = new Array<JobOrderItemDetails>();
  lubejobOrderItemDetailsArray1:Array<JobOrderItemDetails> = new Array<JobOrderItemDetails>();


  searchMakesByModel :Array<MakeModel>= new Array<MakeModel>();
  searchMakesByModel1 :Array<MakeModel>= new Array<MakeModel>();
  searchVehicleDetails : Vehicle = new Vehicle();
  searchVehicleNumber : string;

  searchItemDetails : Array<Item> = new Array<Item>();
  searchItemDetails1 :Array<Item> = new Array<Item>();


  searchItem1 : string;

  vehicleNumber: string;
  engineNumber: string;
  vehicleClass: string;
  vehicleMake: string;
  vehicleModel: string;
  yearOfManufacture:string;
  customer: Customer;
  customername: string;
  customerphone: string;
  customeraddress: string;
  customeremail: string;


  qunatityOnHand :number;

  searchVehicleDetailsByNumber(){
    this.vehicleservice.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{
      if (result == null) {
        console.log("HUTTOOOO");
        this.engineNumber = null;
        this.vehicleClass = null;

        this.vehicleMake = null;
        this.vehicleModel = null;
        this.yearOfManufacture = null;
        this.customer = null;

        this.customername= null;
        this.customerphone= null;
        this.customeraddress= null;
        this.customeremail= null;
      }
      else {
        this.searchVehicleDetails = result;

        this.vehicleNumber = this.searchVehicleDetails.vehicleNumber;
        this.engineNumber = this.searchVehicleDetails.engineNumber;
        this.vehicleClass = this.searchVehicleDetails.vehicleClass;

        this.vehicleMake = this.searchVehicleDetails.vehicleMake;
        this.vehicleModel = this.searchVehicleDetails.vehicleModel;
        this.yearOfManufacture = this.searchVehicleDetails.yearOfManufacture;
        this.customer = this.searchVehicleDetails.customer;

        this.customername= this.customer.firstName;
        this.customerphone= this.customer.phoneNumber;
        this.customeraddress= this.customer.address;
        this.customeremail= this.customer.email;


      }
    });
  }



  ngOnInit() {
  }


  getMakeModelDetails(value :string){

console.log("JJJJ"+this.insertselectedMake);
    this.make_model_service.getMakeModelDetails(this.insertselectedMake).subscribe((result)=>{

      if(result!=null){

        this.searchMakesByModel=result;
        //this.addTableModel=null;

      }
    });

  }
  getMakeModelDetails1(value :string){
    this.make_model_service.getMakeModelDetails(this.insertselectedMake1).subscribe((result)=>{

      if(result!=null){

        this.searchMakesByModel1=result;
        //this.addTableModel=null;

      }
    });
  }
  searchItemDetailsByName(event: any){


    if(this.searchItem.length!=0){


      this.jobOrderService.searchItem(this.searchItem,this.insertItemModel,this.insertselectedMake).subscribe((result)=>{

        if(result==null){

         // alert('Item Not Found ')
          // this.searchItemDetails.quantityOnHand=10;

        }else{
          // this.searchItemValuesIf=false;
          this.searchItemDetails=result;
          let item : Item  = this.searchItemDetails[0];
        //  this.searchItem = item.itemName;
        }
      });
    }else{

    }

  }

  searchItemDetailsByName1(event: any){


    if(this.searchItem1.length!=0){


      this.jobOrderService.searchItem(this.searchItem1,this.insertItemModel1,this.insertselectedMake1).subscribe((result)=>{

        if(result==null){

          // alert('Item Not Found ')
          // this.searchItemDetails.quantityOnHand=10;

        }else{
          // this.searchItemValuesIf=false;
          this.searchItemDetails1=result;

        }
      });
    }else{

    }

  }


  getUnitPrice(value: string) {

    this.jobOrderService.searchUnitPrice(this.insertItemName).subscribe((result)=>{

      if(result==null){

        // alert('Item Not Found ')
        // this.searchItemDetails.quantityOnHand=10;

      }else{
        // this.searchItemValuesIf=false;
        this.item = result;

        this.unitPrice =this.item.quantityOfPrice;
        this.itemId = this.item.itemId;
        // console.log("JJJJJJ"+this.item.quantityOnHand)
      }
    });

  }

  getUnitPrice1(value: string) {

    console.log("kkkkkkk"+value);
    console.log("lllllll"+this.insertItemName1);
    this.jobOrderService.searchUnitPrice(this.insertItemName1).subscribe((result)=>{

      if(result==null){

        // alert('Item Not Found ')
        // this.searchItemDetails.quantityOnHand=10;

      }else{
        // this.searchItemValuesIf=false;
        this.item1 = result;

        this.unitPrice1 =this.item1.quantityOfPrice;
       // this.itemId = this.itemId;
      }
    });

  }

  addItemToTable(){




    let jobOrderItemDetails : JobOrderItemDetails = new JobOrderItemDetails();

    let item : Item = new Item();
    item.itemName= this.insertItemName;
    item.itemId = this.itemId;

    //item.quantityOfPrice= parseFloat(this.searchRetailPrice);
    let price = this.quantity *  this.unitPrice;

    jobOrderItemDetails.qty=this.quantity;
    jobOrderItemDetails.make=this.insertselectedMake;
    jobOrderItemDetails.model= this.insertItemModel;
    jobOrderItemDetails.price=price;
    jobOrderItemDetails.item = item;

    this.totAmount += (this.quantity *  this.unitPrice);
   //jobOrderItemDetails. =this.totAmount;

    if(this.quantity !=null && this.insertselectedMake !=null && this.insertItemModel !=null && this.itemId !=null){

      this.jobOrderItemDetailsArray.push(jobOrderItemDetails);

      this.itemId=null;
      this.insertselectedMake = null;
      this.quantity=null;
      this.unitPrice=null;
      this.searchItem=null;
      this.searchMakesByModel = null;
      this.searchItemDetails = new Array<Item>();


    }



    //jobOrderItemDetails.


  }

  addToItemsTable1(){



    if(this.quantity1 != null && this.insertItemName1 != null && this.insertselectedMake1!=null && this.insertItemModel1 !=null){


      let jobOrderItemDetails : JobOrderItemDetails = new JobOrderItemDetails();

      let item : Item = new Item();
      item.itemName= this.insertItemName1;
      item.itemId = this.itemId;

      let price = this.quantity1 *  this.unitPrice1;

      jobOrderItemDetails.qty=this.quantity1;
      jobOrderItemDetails.make=this.insertselectedMake1;
      jobOrderItemDetails.model= this.insertItemModel1;
      jobOrderItemDetails.price=price;
      jobOrderItemDetails.item = item;
      jobOrderItemDetails.lubeJobType = this.type;

      this.totAmount1 += (this.quantity1 *  this.unitPrice1);
      //jobOrderItemDetails. =this.totAmount;
      this.totAmount += this.totAmount1;
      this.lubejobOrderItemDetailsArray1.push(jobOrderItemDetails);


    }else{
      this.totAmount1 = 0;
    }



    // item.itemId = this.itemId


    //item.quantityOfPrice= parseFloat(this.searchRetailPrice);

    //jobOrderItemDetails.


  }

  addJobOrderToDatabase(){

    let jobCardArray :Array<JobOrderItemDetails> = new Array<JobOrderItemDetails>();

    let jobOrder :JobOrder = new JobOrder();




    let vehicle :Vehicle = new Vehicle();



    vehicle.vehicleId= parseInt("1");

    jobOrder.date=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    jobOrder.vehicle = vehicle;
    jobOrder.total = this.totAmount;

    jobOrder.employeeName = "FFFFFFF";


    // this.lubejobOrderItemDetailsArray1.forEach(function (value) {
    //   console.log(value);
    // });

    let jobOrderDto : JobOrderDTO = new JobOrderDTO();
    jobOrderDto.jobOrder = jobOrder;
    jobOrderDto.jobOrderItemDetailsArray = this.jobOrderItemDetailsArray;
    jobOrderDto.jobOrderItemDetailsArray1 = this.lubejobOrderItemDetailsArray1;



    if(this.lubejobOrderItemDetailsArray1.length!=0 ||this.jobOrderItemDetailsArray.length!=0){

      this.jobOrderService.addJobOrder(jobOrderDto).subscribe((result)=>{


        if(result !=null){

          console.log("LLLL"+result)
          alert("Stock Added Successfully");


        }

      });
    }else{

      alert("Please Add Jobs TO Table");

    }



  }
}
