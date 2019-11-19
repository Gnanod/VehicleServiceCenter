import { Component, OnInit } from '@angular/core';
import {JobOrder} from "../../Model/JobOrder";
import {JoborderService} from "../../Service/joborder.service";
import {ServicesService} from "../../Service/services.service";
import {VehicleService} from "../../Service/vehicle.service";
import {MakeModelService} from "../../Service/make-model.service";
import {ItemService} from "../../Service/item.service";
import {DatePipe} from "@angular/common";
import {ServicejobService} from "../../Service/servicejob.service";
import {Item} from "../../Model/Item";
import {JobOrderItemDetails} from "../../Model/JobOrderItemDetails";
import {MakeModel} from "../../Model/MakeModel";
import {Vehicle} from "../../Model/Vehicle";
import {Customer} from "../../Model/Customer";
import {Services} from "../../Model/Services";
import {JobOrderDTO} from "../../DTO/JoOrderDTO";
import {ServiceJobDetails} from "../../Model/ServiceJobDetails";
import {ServiceJob} from "../../Model/ServiceJob";
import {Make} from "../../Model/Make";
import {MakeServiceService} from "../../Service/make-service.service";
import {VehicleCustomerDTO} from "../../DTO/VehicleCustomerDTO";

@Component({
  selector: 'app-lube-detail-job',
  templateUrl: './lube-detail-job.component.html',
  styleUrls: ['./lube-detail-job.component.css']
})
export class LubeDetailJobComponent implements OnInit {

  private joborder: JobOrder = new JobOrder();
  constructor(private joborderservice : JoborderService, private servicesService: ServicesService
    ,private vehicleservice : VehicleService,private make_model_service :MakeModelService , private  itemService:ItemService ,private jobOrderService :JoborderService,private datePipe :DatePipe,private serviceJobService: ServicejobService,private makeService:MakeServiceService) { }

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

  itemId :string;

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
  vehicleId : Number;
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

  searchVehicleDetailsByNumber(){
    this.vehicleservice.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{
      if (result == null) {
        this.vehicleId = null;
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
        this.vehicleId = this.searchVehicleDetails.vehicleId;
        this.vehicleNumber = this.searchVehicleDetails.vehicleNumber;
        this.engineNumber = this.searchVehicleDetails.engineNumber;
        this.vehicleClass = this.searchVehicleDetails.vehicleClass;
        this.vehicleId = this.searchVehicleDetails.vehicleId;
        console.log("Vehicle Id :"+this.vehicleId );
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

    this.getAllServicesDesc();
    this.findAllMakes();

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
        console.log(result)
        //this.addTableModel=null;

      }
    });
  }

  searchItemDetailsByName(event: any){


    if(this.searchItem.length!=0){


      this.jobOrderService.searchItem(this.searchItem,this.insertItemModel,this.insertselectedMake).subscribe((result)=>{


        if(result.length==0){
          this.quantity=null;
          this.unitPrice=null;
        }
        if(result==null){

          // alert('Item Not Found ')
          // this.searchItemDetails.quantityOnHand=10;
          this.quantity=null;
          this.unitPrice=null;

        }else{
          // this.searchItemValuesIf=false;
          this.searchItemDetails=result;
          this.insertItemName = this.searchItemDetails[0].itemName;
          document.getElementById("insertItemName").focus();
        }
      });
    }else{
      this.itemId=null;
      this.unitPrice=null;
      this.searchItemDetails=null;
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
          console.log("GGGGGGGGGGLLLLLLLLLLL");
          console.log(result);
          this.insertItemName1 = this.searchItemDetails1[0].itemName;
          document.getElementById("insertItemName1").focus();
          // item.itemName=this.item.itemName;
          // item.stockLevel=this.item.stockLevel;
          // item.quantityOnHand = this.item.quantityOnHand - this.quantity;
        }
      });
    }else{

    }

  }

  getUnitPrice() {


    this.jobOrderService.searchUnitPrice(this.insertItemName).subscribe((result)=>{

      if(result==null){

        // alert('Item Not Found ')
        // this.searchItemDetails.quantityOnHand=10;

      }else{
        // this.searchItemValuesIf=false;
        this.item = result;
        this.unitPrice =this.item.quantityOfPrice;
        this.itemId = this.item.itemId;

        // console.log("OOOOOOOO"+this.item.quantityOnHand)
        //  console.log("0000000000"+this.item.stockLevel)
        //console.log("000000000"+this.qunatityOnHand)
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
        this.itemId = this.item1.itemId;
        document.getElementById("quantity1").focus();
      }
    });

  }

  addItemToTable(){
    let jobOrderItemDetails : JobOrderItemDetails = new JobOrderItemDetails();

    let item : Item = new Item();
    item.itemName= this.insertItemName;
    item.itemId = this.itemId;
    item.quantityOfPrice=this.unitPrice;
    item.itemName=this.item.itemName;
    item.stockLevel=this.item.stockLevel;
    item.itemQuantityType = this.item.itemQuantityType;
    console.log("QuantityType"+this.item.itemQuantityType);

    item.quantityOnHand = this.item.quantityOnHand - this.quantity;
    let price = this.quantity *  this.unitPrice;

    jobOrderItemDetails.qty=this.quantity;
    jobOrderItemDetails.make=this.insertselectedMake;
    jobOrderItemDetails.model= this.insertItemModel;
    jobOrderItemDetails.price=price;
    jobOrderItemDetails.item = item;

    if(this.serviceJobOrderId !=null){
      if(this.quantity !=null && this.insertselectedMake !=null && this.insertItemModel !=null && this.itemId !=null){

        if(this.item.quantityOnHand<this.quantity){

          alert('Low Quantity Cant Add Item to This Table');

        }else{

          let sameId:number = 0;
          let firstItem :number =0;
          for(let i = 0; i < this.jobOrderItemDetailsArray.length; ++i){

            firstItem++;

            if ( this.jobOrderItemDetailsArray[i].item.itemId === this.itemId) {

              let quantityOfPrice : number =  this.jobOrderItemDetailsArray[i].item.quantityOfPrice;
              let quantity :string =  this.jobOrderItemDetailsArray[i].qty.toString();

              let newQuantity:number =  parseInt(quantity) + parseInt(this.quantity.toString());
              this.jobOrderItemDetailsArray[i].qty = newQuantity;

              let newPrice = this.jobOrderItemDetailsArray[i].item.quantityOfPrice * newQuantity;
              this.jobOrderItemDetailsArray[i].price = newPrice;
              sameId++;

            }
          }

          if(sameId === 0){
            this.jobOrderItemDetailsArray.push(jobOrderItemDetails);

          }else{
             sameId =0;
          }

          let amountJob :number =0;

          for(let i = 0; i < this.jobOrderItemDetailsArray.length; ++i){
            amountJob = amountJob+ this.jobOrderItemDetailsArray[i].price;
          }

          this.totAmount = amountJob;
          this.grossAmount = this.totAmount + this.serviceTotAmount;

        }

        this.itemId=null;
        this.insertselectedMake = null;
        this.quantity=null;
        this.unitPrice=null;
        this.searchItem=null;
        this.searchMakesByModel = null;
        this.searchItemDetails = new Array<Item>();

      }

    }else{

      alert('Service Job Id Field Is Empty .................');
    }
  }


  grossAmount :number=0;

  addToItemsTable1(){

    if(this.serviceJobOrderId !=null){

      if(this.quantity1 != null && this.insertItemName1 != null && this.insertselectedMake1!=null && this.insertItemModel1 !=null){


        let jobOrderItemDetails : JobOrderItemDetails = new JobOrderItemDetails();
        let item : Item = new Item();
        item.itemName= this.insertItemName1;
        item.itemId = this.itemId;
        item.quantityOfPrice=this.unitPrice1;
        item.itemName=this.item1.itemName;
        item.stockLevel=this.item1.stockLevel;
        item.itemQuantityType = this.item1.itemQuantityType;
        item.quantityOnHand = this.item1.quantityOnHand - this.quantity1;

        let price = this.quantity1 *  this.unitPrice1;

        jobOrderItemDetails.qty=this.quantity1;
        jobOrderItemDetails.make=this.insertselectedMake1;
        jobOrderItemDetails.model= this.insertItemModel1;
        jobOrderItemDetails.price=price;
        jobOrderItemDetails.item = item;
        jobOrderItemDetails.lubeJobType = this.type;



        if(this.item1.quantityOnHand<this.quantity1){

          alert('Low Quantity Cant Add Item to This Table');

        }else{

          let sameId:number = 0;
          let firstItem :number =0;
          for(let i = 0; i < this.lubejobOrderItemDetailsArray1.length; ++i){

            firstItem++;

            if ( this.lubejobOrderItemDetailsArray1[i].item.itemId === this.itemId) {

              let quantityOfPrice : number =  this.lubejobOrderItemDetailsArray1[i].item.quantityOfPrice;
              let quantity :string =  this.lubejobOrderItemDetailsArray1[i].qty.toString();

              let newQuantity:number =  parseInt(quantity) + parseInt(this.quantity1.toString());
              this.lubejobOrderItemDetailsArray1[i].qty = newQuantity;

              let newPrice = this.lubejobOrderItemDetailsArray1[i].item.quantityOfPrice * newQuantity;
              this.lubejobOrderItemDetailsArray1[i].price = newPrice;
              sameId++;

            }
          }

          if(sameId === 0){
            this.lubejobOrderItemDetailsArray1.push(jobOrderItemDetails);

          }else{
            sameId =0;
          }

          let amountJob :number =0;

          for(let i = 0; i < this.lubejobOrderItemDetailsArray1.length; ++i){
            amountJob = amountJob+ this.lubejobOrderItemDetailsArray1[i].price;
          }

          this.totAmount1 = amountJob;
          this.grossAmount = this.totAmount + this.serviceTotAmount + this.totAmount1 ;
          this.insertselectedMake1 = null;
          this.quantity1=null;
          this.unitPrice1=null;
          this.searchItem1=null;
          this.searchMakesByModel1 = null;
          this.searchItemDetails1 = new Array<Item>();
          this.insertItemName1 = null;
        }
      }else{
        this.totAmount1 = 0;
      }

    }else{
      alert('Service Job Id Field Is Empty .................');
    }






  }

  addJobOrderToDatabase(){

    let jobCardArray :Array<JobOrderItemDetails> = new Array<JobOrderItemDetails>();

    let jobOrder :JobOrder = new JobOrder();

    let vehicle :Vehicle = new Vehicle();
    let cust :Customer = new Customer();
    cust.address = this.vehicleCustomerDTO.customerAddress;
    cust.firstName = this.vehicleCustomerDTO.customerName;
    cust.phoneNumber = this.vehicleCustomerDTO.customerPhone;


    vehicle.vehicleId= parseInt(this.vehicleCustomerDTO.vehicleId);
    vehicle.vehicleNumber = this.vehicleCustomerDTO.vehicleNumber;
    vehicle.vehicleMake = this.vehicleCustomerDTO.make;
    vehicle.vehicleModel = this.vehicleCustomerDTO.model;
    console.log("Model"+this.vehicleCustomerDTO.model);
    vehicle.engineNumber = this.vehicleCustomerDTO.chassisNumber;

    jobOrder.date=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    jobOrder.vehicle = vehicle;
    jobOrder.vehicle.customer = cust;
    jobOrder.total = this.grossAmount;
    jobOrder.creditBalance = this.newcreditBalance;
    jobOrder.lubeJobAmount = this.totAmount;
    jobOrder.detailJobAmount = this.totAmount1;
    jobOrder.paymentType = this.PaymentType;
    jobOrder.paidAmount = this.paidAmount;
    jobOrder.serviceAmount = this.serviceTotAmount;
    jobOrder.grossAmount = this.grossAmount;
    jobOrder.serviceId = this.serviceJobOrderId;

    jobOrder.employeeName = "FFFFFFF";



    let jobOrderDto : JobOrderDTO = new JobOrderDTO();
    jobOrderDto.jobOrder = jobOrder;
    jobOrderDto.jobOrderItemDetailsArray = this.jobOrderItemDetailsArray;
    jobOrderDto.jobOrderItemDetailsArray1 = this.lubejobOrderItemDetailsArray1;


    if(this.vehicleCustomerDTO.vehicleId != null){

      if(this.lubejobOrderItemDetailsArray1.length!=0 ||this.jobOrderItemDetailsArray.length!=0){

        this.jobOrderService.addJobOrder(jobOrderDto).subscribe((result)=>{

          if(result !=null){

            alert("Stock Added Successfully");
            this.lubejobOrderItemDetailsArray1 = new Array<JobOrderItemDetails>();
            this.jobOrderItemDetailsArray = new Array<JobOrderItemDetails>();

             this.grossAmount=0;
             this.newcreditBalance=0;
            this.totAmount=0;
            this.totAmount1=0;
            this.PaymentType=null;
             this.paidAmount=0;

          }

        });
      }else{

        alert("Please Add Jobs TO Table");

      }

    }else{

      alert("Please Add Vehicle Details")
    }




  }


  deleteRow(id){

    for(let i = 0; i <  this.jobOrderItemDetailsArray.length; ++i){
      if ( this.jobOrderItemDetailsArray[i].item.itemId === id) {
        this.jobOrderItemDetailsArray.splice(i,1);

      }
    }

    let amountJob :number =0;
    let amountJob1 :number =0;

    for(let i = 0; i < this.jobOrderItemDetailsArray.length; ++i){
      amountJob = amountJob+ this.jobOrderItemDetailsArray[i].price;
    }

    for(let i = 0; i < this.lubejobOrderItemDetailsArray1.length; ++i){
      amountJob1 = amountJob1+ this.lubejobOrderItemDetailsArray1[i].price;
    }

    this.totAmount = amountJob;
    this.totAmount1= amountJob1;
    this.grossAmount = this.totAmount + this.serviceTotAmount + this.totAmount1 ;

    // this.totAmount = amountJob;
    // this.grossAmount = this.totAmount + this.serviceTotAmount;



  }

  deleteRow1(id){

    for(let i = 0; i <  this.lubejobOrderItemDetailsArray1.length; ++i){

      if ( this.lubejobOrderItemDetailsArray1[i].item.itemId === id) {

        this.lubejobOrderItemDetailsArray1.splice(i,1);


      }
    }

    let amountJob :number =0;
    let amountJob1 :number =0;

    for(let i = 0; i < this.jobOrderItemDetailsArray.length; ++i){
      amountJob = amountJob+ this.jobOrderItemDetailsArray[i].price;
    }

    for(let i = 0; i < this.lubejobOrderItemDetailsArray1.length; ++i){
      amountJob1 = amountJob1+ this.lubejobOrderItemDetailsArray1[i].price;
    }

    this.totAmount = amountJob;
    this.totAmount1 = amountJob1;
    this.grossAmount = this.totAmount + this.serviceTotAmount + this.totAmount1 ;

  }







  allServicesDescArray: Array<Services>= new Array<Services>();
  getServiceToAddById: number;
  insertSelectedServiceType: number;
  servicesOfTheServiceJobArrray: Array<Services> = new Array<Services>();

  getAllServicesDesc(){

    this.servicesService.getAllServices().subscribe((result)=>{
      if(result!=null){
        this.allServicesDescArray = result;

      }

    });

  }



  servicestoadd: Services;








  serviceJDArray: Array<ServiceJobDetails> = new Array<ServiceJobDetails>();
  serviceOrder : ServiceJob = new ServiceJob();
  serviceOrderTot: number = 0;



  findAllMakesToArray :Array<Make> = new Array<Make>();

  findAllMakes(){

    this.makeService.findAllMakes().subscribe((result)=>{

      if(result !=null){

        this.findAllMakesToArray = result;

      }

    });
  }



  serviceJobOrderId:string;
  todayDate : string=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  vehicleCustomerDTO : VehicleCustomerDTO = new VehicleCustomerDTO();

  serviceTotAmount :number=0;
  searchServiceDetails() {

    if(this.serviceJobOrderId.length!=0){
      this.jobOrderService.searchServiceDetails(this.serviceJobOrderId).subscribe((result)=>{
        if(result !=null){

          this.vehicleCustomerDTO= result;

          this.serviceTotAmount = this.vehicleCustomerDTO.serviceTotal;

          console.log("KKKK"+this.vehicleCustomerDTO.vehicleId);
          // this.grossAmount = this.grossAmount+ +this.serviceTotAmount;

        }

      });
    }



  }


  paidAmount :number=0;
  newcreditBalance :number=0;
  PaymentType:string;

  changeValue(event) {
    this.paidAmount = this.grossAmount;
  }

  calculateCreditBalance() {

    if(this.paidAmount> this.grossAmount){
      alert('Paid Amount is Greater Than Gross Amount');
      this.newcreditBalance =0;
    }else{

      this.newcreditBalance = this.grossAmount - this.paidAmount;

    }
  }



}
