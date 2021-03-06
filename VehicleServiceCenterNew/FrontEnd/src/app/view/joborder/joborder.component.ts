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
import {Services} from "../../Model/Services";
import {environment} from "../../../environments/environment";
import {ServicesService} from "../../Service/services.service";
import {ServiceJob} from "../../Model/ServiceJob";
import {ServiceJobDetails} from "../../Model/ServiceJobDetails";
import {ServicejobService} from "../../Service/servicejob.service";

@Component({
  selector: 'app-joborder',
  templateUrl: './joborder.component.html',
  styleUrls: ['./joborder.component.css']
})
export class JoborderComponent implements OnInit {
  ngOnInit(){}
//
//   private joborder: JobOrder = new JobOrder();
//   constructor(private joborderservice : JoborderService, private servicesService: ServicesService
//   ,private vehicleservice : VehicleService,private make_model_service :MakeModelService , private  itemService:ItemService ,private jobOrderService :JoborderService,private datePipe :DatePipe,private serviceJobService: ServicejobService) { }
//
// ///////////////////
//   searchItem :string;
//   insertItemModel:string;
//   insertItemModel1:string;
//
//   insertselectedMake1:string;
//   insertselectedMake:string;
//
//   insertItemName:string;
//   insertItemName1 :string;
//
//   unitPrice : number;
//   unitPrice1 : number;
//
//   itemId :string;
//
//   item :Item = new Item();
//   item1 :Item = new Item();
//
//
//   type :string;
//
//   quantity:number;
//   quantity1:number;
//
//   totAmount :number=0;
//   totAmount1 :number=0;
//
//   jobOrderItemDetailsArray:Array<JobOrderItemDetails> = new Array<JobOrderItemDetails>();
//   lubejobOrderItemDetailsArray1:Array<JobOrderItemDetails> = new Array<JobOrderItemDetails>();
//
//
//   searchMakesByModel :Array<MakeModel>= new Array<MakeModel>();
//   searchMakesByModel1 :Array<MakeModel>= new Array<MakeModel>();
//   searchVehicleDetails : Vehicle = new Vehicle();
//   searchVehicleNumber : string;
//
//   searchItemDetails : Array<Item> = new Array<Item>();
//
//   searchItemDetails1 :Array<Item> = new Array<Item>();
//
//
//   searchItem1 : string;
//   vehicleId : Number;
//   vehicleNumber: string;
//   engineNumber: string;
//   vehicleClass: string;
//   vehicleMake: string;
//   vehicleModel: string;
//   yearOfManufacture:string;
//   customer: Customer;
//   customername: string;
//   customerphone: string;
//   customeraddress: string;
//   customeremail: string;
//
//   qunatityOnHand :number;
//
//
//
//   jobServicesAll: Services = new Services();
//
//   insertServiceDesc: string;
//   serviceDesc1: Services = new Services();
//   searchServiceDescByName: Array<Services>= new Array<Services>();
//   searchServiceVehiClassByNameAndDesc: Array<Services>= new Array<Services>();
//   serviceVehi: Services = new Services();
//   addedServiceBeforeConfirm: Services = new Services();
//
//   searchVehicleDetailsByNumber(){
//     this.vehicleservice.searchVehicleDetails(this.searchVehicleNumber).subscribe((result)=>{
//       if (result == null) {
//         this.vehicleId = null;
//         this.engineNumber = null;
//         this.vehicleClass = null;
//         this.vehicleMake = null;
//         this.vehicleModel = null;
//         this.yearOfManufacture = null;
//         this.customer = null;
//
//         this.customername= null;
//         this.customerphone= null;
//         this.customeraddress= null;
//         this.customeremail= null;
//       }
//       else {
//         this.searchVehicleDetails = result;
//         this.vehicleId = this.searchVehicleDetails.vehicleId;
//         this.vehicleNumber = this.searchVehicleDetails.vehicleNumber;
//         this.engineNumber = this.searchVehicleDetails.engineNumber;
//         this.vehicleClass = this.searchVehicleDetails.vehicleClass;
//         this.vehicleId = this.searchVehicleDetails.vehicleId;
//         this.vehicleMake = this.searchVehicleDetails.vehicleMake;
//         this.vehicleModel = this.searchVehicleDetails.vehicleModel;
//         this.yearOfManufacture = this.searchVehicleDetails.yearOfManufacture;
//         this.customer = this.searchVehicleDetails.customer;
//
//         this.customername= this.customer.firstName;
//         this.customerphone= this.customer.phoneNumber;
//         this.customeraddress= this.customer.address;
//         this.customeremail= this.customer.email;
//
//
//       }
//     });
//   }
//
//
//
//   ngOnInit() {
//
//     this.getAllServicesDesc();
//   }
//
//
//   getMakeModelDetails(value :string){
//
// console.log("JJJJ"+this.insertselectedMake);
//     this.make_model_service.getMakeModelDetails(this.insertselectedMake).subscribe((result)=>{
//
//       if(result!=null){
//
//         this.searchMakesByModel=result;
//         //this.addTableModel=null;
//
//       }
//     });
//
//   }
//
//   getMakeModelDetails1(value :string){
//     this.make_model_service.getMakeModelDetails(this.insertselectedMake1).subscribe((result)=>{
//
//       if(result!=null){
//
//         this.searchMakesByModel1=result;
//         //this.addTableModel=null;
//
//       }
//     });
//   }
//
//   searchItemDetailsByName(event: any){
//
//
//     if(this.searchItem.length!=0){
//
//
//       this.jobOrderService.searchItem(this.searchItem,this.insertItemModel,this.insertselectedMake).subscribe((result)=>{
//
//
//         if(result.length==0){
//           this.quantity=null;
//           this.unitPrice=null;
//         }
//         if(result==null){
//
//          // alert('Item Not Found ')
//           // this.searchItemDetails.quantityOnHand=10;
//           this.quantity=null;
//           this.unitPrice=null;
//
//         }else{
//           // this.searchItemValuesIf=false;
//           this.searchItemDetails=result;
//
//           // console.log("JJJJJJJJJJJ"+this.searchItemDetails[0].itemName);
//           // console.log("jjjjjjjjjjj"+this.searchItem)
//           // // if(this.searchItemDetails[0].itemName==this.searchItem){
//           //
//           //   this.unitPrice =this.searchItemDetails[0].quantityOfPrice;
//           //   this.itemId = this.searchItemDetails[0].itemId;
//           // }
//           // let item : Item  = this.searchItemDetails[0];
//         //  this.searchItem = item.itemName;
//         }
//       });
//     }else{
//       this.itemId=null;
//       this.unitPrice=null;
//       this.searchItemDetails=null;
//     }
//
//   }
//
//   searchItemDetailsByName1(event: any){
//
//
//     if(this.searchItem1.length!=0){
//
//
//       this.jobOrderService.searchItem(this.searchItem1,this.insertItemModel1,this.insertselectedMake1).subscribe((result)=>{
//
//         if(result==null){
//
//           // alert('Item Not Found ')
//           // this.searchItemDetails.quantityOnHand=10;
//
//         }else{
//           // this.searchItemValuesIf=false;
//           this.searchItemDetails1=result;
//           // item.itemName=this.item.itemName;
//           // item.stockLevel=this.item.stockLevel;
//           // item.quantityOnHand = this.item.quantityOnHand - this.quantity;
//         }
//       });
//     }else{
//
//     }
//
//   }
//
//   getUnitPrice(value: string) {
//
//     this.jobOrderService.searchUnitPrice(this.insertItemName).subscribe((result)=>{
//
//       if(result==null){
//
//         // alert('Item Not Found ')
//         // this.searchItemDetails.quantityOnHand=10;
//
//       }else{
//         // this.searchItemValuesIf=false;
//         this.item = result;
//         this.unitPrice =this.item.quantityOfPrice;
//         this.itemId = this.item.itemId;
//
//        // console.log("OOOOOOOO"+this.item.quantityOnHand)
//        //  console.log("0000000000"+this.item.stockLevel)
//         //console.log("000000000"+this.qunatityOnHand)
//       }
//     });
//
//   }
//
//   getUnitPrice1(value: string) {
//
//     console.log("kkkkkkk"+value);
//     console.log("lllllll"+this.insertItemName1);
//     this.jobOrderService.searchUnitPrice(this.insertItemName1).subscribe((result)=>{
//
//       if(result==null){
//
//         // alert('Item Not Found ')
//         // this.searchItemDetails.quantityOnHand=10;
//
//       }else{
//         // this.searchItemValuesIf=false;
//         this.item1 = result;
//
//         this.unitPrice1 =this.item1.quantityOfPrice;
//         this.itemId = this.item1.itemId;
//       }
//     });
//
//   }
//
//   addItemToTable(){
//
//
//
//
//     let jobOrderItemDetails : JobOrderItemDetails = new JobOrderItemDetails();
//
//     let item : Item = new Item();
//     item.itemName= this.insertItemName;
//     item.itemId = this.itemId;
//     item.quantityOfPrice=this.unitPrice;
//     item.itemName=this.item.itemName;
//     item.stockLevel=this.item.stockLevel;
//     item.quantityOnHand = this.item.quantityOnHand - this.quantity;
//
//     // console.log("ItemUpdate"+this.item.stockLevel)
//     // console.log("ItemUpdate"+this.item.quantityOnHand)
//     // console.log("ItemUpdate"+this.item.itemName)
//     // console.log("ItemUpdate"+this.unitPrice)
//
//     //console.log("ItemUpdate"+)
//     //item.quantityOfPrice= parseFloat(this.searchRetailPrice);
//     let price = this.quantity *  this.unitPrice;
//
//     jobOrderItemDetails.qty=this.quantity;
//     jobOrderItemDetails.make=this.insertselectedMake;
//     jobOrderItemDetails.model= this.insertItemModel;
//     jobOrderItemDetails.price=price;
//     jobOrderItemDetails.item = item;
//
//
//    //jobOrderItemDetails. =this.totAmount;
//
//     if(this.quantity !=null && this.insertselectedMake !=null && this.insertItemModel !=null && this.itemId !=null){
//
//
//       if(this.item.quantityOnHand<this.quantity){
//         alert('Low Quantity Cant Add Item to This Table')
//       }else{
//         this.totAmount += (this.quantity *  this.unitPrice);
//         this.jobOrderItemDetailsArray.push(jobOrderItemDetails);
//       }
//
//
//       this.itemId=null;
//       this.insertselectedMake = null;
//       this.quantity=null;
//       this.unitPrice=null;
//       this.searchItem=null;
//       this.searchMakesByModel = null;
//       this.searchItemDetails = new Array<Item>();
//
//
//     }
//
//
//
//     //jobOrderItemDetails.
//
//
//   }
//
//   addToItemsTable1(){
//
//
//
//     if(this.quantity1 != null && this.insertItemName1 != null && this.insertselectedMake1!=null && this.insertItemModel1 !=null){
//
//
//       let jobOrderItemDetails : JobOrderItemDetails = new JobOrderItemDetails();
//       let item : Item = new Item();
//       item.itemName= this.insertItemName1;
//       item.itemId = this.itemId;
//       item.quantityOfPrice=this.unitPrice1;
//       item.itemName=this.item1.itemName;
//       item.stockLevel=this.item1.stockLevel;
//       item.quantityOnHand = this.item1.quantityOnHand - this.quantity1;
//
//       let price = this.quantity1 *  this.unitPrice1;
//
//       jobOrderItemDetails.qty=this.quantity1;
//       jobOrderItemDetails.make=this.insertselectedMake1;
//       jobOrderItemDetails.model= this.insertItemModel1;
//       jobOrderItemDetails.price=price;
//       jobOrderItemDetails.item = item;
//       jobOrderItemDetails.lubeJobType = this.type;
//
//
//
//       if(this.item1.quantityOnHand<this.quantity1){
//
//         alert('Low Quantity Cant Add Item to This Table');
//
//       }else{
//
//         this.totAmount1 += (this.quantity1 *  this.unitPrice1);
//
//         //jobOrderItemDetails. =this.totAmount;
//
//         this.totAmount += this.totAmount1;
//         this.lubejobOrderItemDetailsArray1.push(jobOrderItemDetails);
//
//       }
//
//
//
//     }else{
//       this.totAmount1 = 0;
//     }
//
//
//
//     // item.itemId = this.itemId
//
//
//     //item.quantityOfPrice= parseFloat(this.searchRetailPrice);
//
//     //jobOrderItemDetails.
//
//
//   }
//
//   addJobOrderToDatabase(){
//
//     let jobCardArray :Array<JobOrderItemDetails> = new Array<JobOrderItemDetails>();
//
//     let jobOrder :JobOrder = new JobOrder();
//
//     let vehicle :Vehicle = new Vehicle();
//
//     vehicle.vehicleId= this.vehicleId;
//     jobOrder.date=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
//     jobOrder.vehicle = vehicle;
//     jobOrder.total = this.totAmount;
//
//     jobOrder.employeeName = "FFFFFFF";
//
//
//
//     let jobOrderDto : JobOrderDTO = new JobOrderDTO();
//     jobOrderDto.jobOrder = jobOrder;
//     jobOrderDto.jobOrderItemDetailsArray = this.jobOrderItemDetailsArray;
//     jobOrderDto.jobOrderItemDetailsArray1 = this.lubejobOrderItemDetailsArray1;
//
//
//     if(this.vehicleId != null){
//
//       if(this.lubejobOrderItemDetailsArray1.length!=0 ||this.jobOrderItemDetailsArray.length!=0){
//
//         this.jobOrderService.addJobOrder(jobOrderDto).subscribe((result)=>{
//
//
//         console.log("LLLL"+result);
//         alert("Stock Added Successfully");
//           if(result !=null){
//
//             console.log("LLLL"+result)
//             alert("Stock Added Successfully");
//             this.lubejobOrderItemDetailsArray1 = null;
//             this.jobOrderItemDetailsArray = null;
//
//           }
//
//         });
//       }else{
//
//         alert("Please Add Jobs TO Table");
//
//       }
//
//     }else{
//
//       alert("Please Add Vehicle Details")
//     }
//
//
//
//
//   }
//
//
//   deleteRow(id){
//
//     for(let i = 0; i <  this.jobOrderItemDetailsArray.length; ++i){
//       if ( this.jobOrderItemDetailsArray[i].item.itemId === id) {
//
//         let buyingPrice : number =  this.jobOrderItemDetailsArray[i].item.quantityOfPrice;
//         let quantity :number =  this.jobOrderItemDetailsArray[i].qty;
//         let totAmount :number = buyingPrice * quantity ;
//
//         this.totAmount = this.totAmount - totAmount;
//         this.jobOrderItemDetailsArray.splice(i,1);
//
//       }
//     }
//
//   }
//
//   deleteRow1(id){
//
//     for(let i = 0; i <  this.lubejobOrderItemDetailsArray1.length; ++i){
//
//       if ( this.lubejobOrderItemDetailsArray1[i].item.itemId === id) {
//
//         let buyingPrice : number =  this.lubejobOrderItemDetailsArray1[i].item.quantityOfPrice;
//         let quantity :number =  this.lubejobOrderItemDetailsArray1[i].qty;
//         let totAmount :number = buyingPrice * quantity ;
//         this.totAmount = this.totAmount - totAmount;
//         this.lubejobOrderItemDetailsArray1.splice(i,1);
//
//
//       }
//     }
//
//   }
//
//
//
//
//
//
//
//
//
//   // addToJobOrderServiceDetails() {
//   //
//   //   let orderListDetail:ServiceJob = new ServiceJob();
//   //   let orderItemDetail:Item = new Item();
//   //   this.searchItemDetails.forEach(function (value) {
//   //     orderItemDetail.barCode = value.barCode;
//   //     orderItemDetail.itemName = value.itemName;
//   //     orderItemDetail.brand = value.brand;
//   //     orderItemDetail.retailPrice = value.retailPrice;
//   //     orderItemDetail.itemQtyOnHand = value.itemQtyOnHand;
//   //   })
//   //
//   //   this.itemPrice = orderItemDetail.retailPrice;
//   //   orderListDetail.qty = this.qty;
//   //   orderListDetail.price = this.itemPrice = +this.itemPrice * +this.qty;
//   //
//   //   orderListDetail.item = orderItemDetail;
//   //
//   //   this.updateItemQty =  orderListDetail.item.itemQtyOnHand - this.qty;
//   //   orderListDetail.item.itemQtyOnHand = this.updateItemQty;
//   //
//   //   if (this.qty!=null) {
//   //     this.orderList.push(orderListDetail);
//   //     this.totalPrice = +this.totalPrice + +this.itemPrice;
//   //   }else{
//   //     alert('Order Qty NULL')
//   //   }
//   //
//   //   console.log(this.orderList);
//   //
//   //
//   // }
//
//   allServicesDescArray: Array<Services>= new Array<Services>();
//   getServiceToAddById: number;
//   insertSelectedServiceType: number;
//   servicesOfTheServiceJobArrray: Array<Services> = new Array<Services>();
//
//   getAllServicesDesc(){
//
//     this.servicesService.getAllServices().subscribe((result)=>{
//       if(result!=null){
//         this.allServicesDescArray = result;
//
//       }
//
//     });
//
//   }
//
//
//
//   servicestoadd: Services;
//   sendIdToAddService(value: Services){
//     this.servicestoadd = value;
//   }
//
//
//
//
//   addServiceJobsToFrontEndList(){
//     this.servicesService.getServicebyId(this.getServiceToAddById).subscribe((result)=>{
//       if(result!=null){
//         this.addedServiceBeforeConfirm = result;
//
//       }
//     });
//
//
//   }
//
//   ilen: number;
//   addToJobOrderServiceDetails(){
//
//     // console.log("The object"+this.servicestoadd.serviceDesc+"ADDEDD"+this.insertSelectedServiceType);
//   }
//
//
//
//
//   searchServiceByIdAndAddToList(){
//
//     this.servicesService.getServicebyId(this.insertSelectedServiceType).subscribe((result)=>{
//
//       if(result==null){
//
//         // alert('Item Not Found ')
//         // this.searchItemDetails.quantityOnHand=10;
//
//       }else{
//         let ser : Services;
//         ser = result;
//         this.servicesOfTheServiceJobArrray.push(ser);
//         console.log("asdsadsad"+this.servicesOfTheServiceJobArrray[0].serviceDesc);
//       }
//     });
//   }
//
//
//   serviceJDArray: Array<ServiceJobDetails> = new Array<ServiceJobDetails>();
//   serviceOrder : ServiceJob = new ServiceJob();
//   serviceOrderTot: number = 0;
//   addToServiceJob(){
//     let i: number ;
//     let serviceJD : ServiceJobDetails = new ServiceJobDetails();
//
//     let all : number = this.servicesOfTheServiceJobArrray.length;
//     for (i=0; i<all; i++){
//       this.serviceOrderTot += this.servicesOfTheServiceJobArrray[i].servicePrice;
//       serviceJD.services = this.servicesOfTheServiceJobArrray[i];
//     }
//     this.serviceJDArray.push(serviceJD);
//
//     console.log("PRICE IS" + this.serviceOrderTot);
//
//
//     this.serviceOrder.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
//     this.serviceOrder.employeeName= "Fudddd";
//     this.serviceOrder.serviceJobDetails = this.serviceJDArray;
//     this.serviceOrder.total = this.serviceOrderTot;
//     this.serviceOrder.vehicle = this.searchVehicleDetails;
//
//
//     this.serviceJobService.addServiceJob(this.serviceOrder).subscribe((result)=>{
//       if(result !=null){
//
//         console.log("LLLL"+result)
//         alert("Service Added Successfully");
//
//
//       }
//
//     });
//
//   }


}
