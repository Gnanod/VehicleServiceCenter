import { Component, OnInit } from '@angular/core';
import {MakeModel} from "../../Model/MakeModel";
import {MakeModelService} from "../../Service/make-model.service";
import {Item} from "../../Model/Item";
import {ItemService} from "../../Service/item.service";
import {SupplierService} from "../../Service/supplier.service";
import {Supplier} from "../../Model/Supplier";
import {MakeModelDetail} from "../../Model/MakeModelDetail";
import {parseArguments} from "@angular/cli/models/parser";
import {StockItemDetail} from "../../Model/StockItemDetail";
import {Stock} from "../../Model/Stock";
import {DatePipe} from "@angular/common";
import {StockService} from "../../Service/stock.service";
import {MakeServiceService} from "../../Service/make-service.service";
import {Make} from "../../Model/Make";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  public constructor(private make_model_service :MakeModelService,private itemService :ItemService,private supplierService:SupplierService,private datePipe :DatePipe,private stockService:StockService,private makeService:MakeServiceService) { }

  ngOnInit() {
    this.getAllSuppliers();
    this.findAllMakes();
  }

   /////////////Search Item

  searchStockItemName : string;
  selectedItem:Item = new Item();

  selectModel:string;
  addTableModel:string;
  selectedMake:string;
  tableMakeModel :Array<MakeModel> = new Array<MakeModel>();
  searchMakesByModel :Array<MakeModel>= new Array<MakeModel>();

  itemsArray :Array<Item> = new Array<Item>();

  //Insert Item
  insertItemModel:string;
  itemName:string;
  insertselectedMake:string;
  insertItemToTable :Array<MakeModelDetail> = new Array<MakeModelDetail>();
  itemQuantityType:string;


  //getAll Suppliers
  //getSupplier : Array<Supplier> = new Array<Supplier>();
  suppliers: Array<Supplier> = new Array<Supplier>();
  selectedSupplierCompany :string;
  suppliersNames :Array<Supplier> = new Array<Supplier>();
  selectedsupplierName :string;


  ////////////////////////////////////////////////////////////////////

  names :Supplier = new Supplier();

  ///////////////////////////////////////////////////////////////


  //Insert items
  searchItemName :string;
  searchBuyingPrice:string;
  searchRetailPrice:string;
  itemQuantity:string;
  itemDetailsQtyOnHand:string;
  stockLevel :number;


  //SearchItemDetails
  searchItemDetails :Item = new Item();
  searchItemDetailsArray : Array<Item> = new Array<Item>();

//addItemsTable
  itemsTable : Array<StockItemDetail> = new Array<StockItemDetail>();


  /////////////////////////////////////////////
  stockPayementDate :string;

  itemId :string;
  totAmount :number=0;

  addToItemTable(){

    let stockItemDetails : StockItemDetail = new StockItemDetail();

    stockItemDetails.buyingPrice=parseFloat(this.searchBuyingPrice);

    let item : Item = new Item();

    //item.itemName= this.selectedItem.itemName;
    item.itemName= this.searchItemDetails.itemName;
    item.itemId = this.searchItemDetails.itemId;
    item.quantityOfPrice= parseFloat(this.searchRetailPrice);




    item.stockLevel=this.searchItemDetails.stockLevel;
    item.itemQuantityType= this.searchItemDetails.itemQuantityType;

    // item.stockLevel = this.searchItemDetails.stockLevel;

    let qty:number=parseFloat( this.itemQuantity + this.searchItemDetails.quantityOnHand );



    item.quantityOnHand=parseFloat(this.itemQuantity+this.searchItemDetails.quantityOnHand);

    stockItemDetails.item=item;
    stockItemDetails.quantity=parseFloat(this.itemQuantity);





     if(this.searchItemDetails.itemName !=null && this.searchItemDetails.itemId !=null && this.searchItemDetails.quantityOfPrice !=null && this.searchItemDetails.quantityOnHand !=null && this.itemQuantity!=null  && this.searchBuyingPrice !=null && this.searchRetailPrice !=null ){

      this.itemsTable.push(stockItemDetails);
      this.searchItemDetailsArray = new Array<Item>();
      this.searchStockItemName = null;
      let amount :number;
      amount = this.totAmount+(stockItemDetails.buyingPrice*stockItemDetails.quantity);
      let stringAmount :string=amount.toString();
      this.totAmount=parseFloat(stringAmount);

      this.searchItemDetails.itemName = null;
      this.searchItemDetails.itemId = null;
      this.searchRetailPrice = null;
      this.itemQuantity = null;
      this.searchBuyingPrice = null;
      this.searchItemDetails.quantityOnHand = null;

     }




  }


  addToItemsTable(){

    let itemMakeModel :MakeModelDetail = new MakeModelDetail();

    let item :Item = new Item();
    item.itemId = this.itemId;
    item.itemName=this.itemName;
    item.itemQuantityType = this.itemQuantityType;
    console.log("JJJJ"+this.stockLevel);
    itemMakeModel.stockLevel=this.stockLevel;
    //item.stockLevel = this.stockLevel;

    let makeModel :MakeModel = new MakeModel();
    makeModel.modelName=this.insertItemModel;
    makeModel.makeName=this.insertselectedMake;

    //makeModel.makeModelId=2;
    if(this.insertItemModel!=null &&this.insertselectedMake !=null ){

      this.make_model_service.searchMakeModelId(this.insertItemModel,this.insertselectedMake).subscribe((result)=>{

        if(result!=null){


          makeModel.makeModelId=parseInt(result);

        }
      });

    }



    itemMakeModel.item=item;
    itemMakeModel.makeModel=makeModel;

    if(this.itemName !=null && this.insertselectedMake !=null && this.insertItemModel !=null ){

      this.insertItemToTable.push(itemMakeModel);


    }



  }

  deleteItemTableRow(id){

   for(let i = 0; i < this.insertItemToTable.length; ++i){
      if (this.insertItemToTable[i].makeModel.modelName === id) {
        this.insertItemToTable.splice(i,1);
      }
    }

  }


  deleteRow(id){

    for(let i = 0; i <  this.itemsTable.length; ++i){
      if ( this.itemsTable[i].item.itemId === id) {

      let buyingPrice : number =  this.itemsTable[i].buyingPrice;
      let quantity :number =  this.itemsTable[i].quantity;
      let totAmount = buyingPrice * quantity ;
        this.totAmount = this.totAmount - totAmount;
        this.itemsTable.splice(i,1);

      }
    }

  }



  modelNameif =false;
  getMakeModelDetails(value :string){
    this.make_model_service.getMakeModelDetails(value).subscribe((result)=>{
      if(result.length!=0){
        this.modelNameif=true;
        this.searchMakesByModel=result;
        this.searchMakesByModel[0]=result[0];
      }else{

        this.searchMakesByModel = new Array<MakeModel>();

      }
    });

  }

  addItemsToDB(){


if( this.insertItemToTable.length!=0){
  let item:Item = new Item();
  item.itemId=this.itemId;
  item.itemName=this.itemName;
  item.itemQuantityType=this.itemQuantityType
  item.stockLevel=this.stockLevel;
  // item.stockLevel=this.stockLevel;
  // item.itemId=1;
  item.makeModelDetails=this.insertItemToTable;

  // item.make=this.insertselectedMake;
  // item.model=this.insertItemModel;


  this.itemService.addItemsToDB(item).subscribe((result)=>{

    if(result!=null){

      alert('Added Successfully');
      this.insertItemToTable = new Array<MakeModelDetail>();
      this.itemName = null;
      this.totAmount=0;
      this.stockLevel=0;
      this.itemId=null;
      this.searchMakesByModel = new Array<MakeModel>();

    }

  });
}else {
  alert('Please Add Items To Table')
}




  }



  getAllSuppliers() {

    this.supplierService.getAllSupplier().subscribe((result) => {
      this.suppliers = result;
      // this.selectedSupplierCompany=result[0].companyName;
    });

  }

  getSuppliersNames(value :string){

    this.supplierService.getSuppliersNames(value).subscribe((result) => {
      this.suppliersNames = result;
      console.log(this.suppliersNames[0])

    });
  }

  searchItemDetailsByName(event: any){


    if(this.searchStockItemName.length !=0){


      this.itemService.getItemDetailsByName(this.searchStockItemName).subscribe((result)=>{

        if(result==null){

          this.searchItemDetailsArray=null;

          this.selectedItem.itemId=null;
          this.getAllItemDetailsToUI("K");
        } else {
          this.searchItemDetailsArray=result;
          this.searchItemDetails=result[0];
          console.log("StockLevelItem :"+this.selectedItem.stockLevel);
        }
      });
    }{

      console.log('GGGGGGGGGGGGGGGGG')
      this.searchItemDetailsArray=null;
    }


  }

  getAllItemDetailsToUI(value :string){

    console.log("Error")
    this.searchItemDetails = this.selectedItem;

    if(value=="K"){

      this.searchItemDetails.itemId=null;
      this.searchItemDetails.quantityOnHand=parseFloat("0");
    }

  }

/////////////////////////////////////////////////////////////////////////
  paymentType :string;
  creditBalance :number;
  selectedSupplier :Supplier = new Supplier();

  ///////////////////////////////////////////////////////////////////
  changeValue() {
    this.creditBalance=0;
  }


  saveStock(){

    let stock :Stock = new Stock ();

    let supplier : Supplier = new Supplier();
    supplier.supplierId =this.selectedSupplier.supplierId;
    stock.supplier=supplier;
    stock.payment=this.totAmount;
    stock.paymentType=this.paymentType;

    let balance:number=0;

    balance = this.totAmount-this.creditBalance;

    console.log("Balance"+balance);

    stock.creditBalance = balance;

    stock.date =this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    stock.stockItemDetails = this.itemsTable;

    stock.stockPayementDate = this.stockPayementDate;



    if(supplier.supplierId!=null){
      if(this.paymentType!=null){
        if(this.totAmount > this.creditBalance){
          if(this.stockPayementDate!=null){
            if(this.itemsTable.length!=0){

              this.stockService.addStock(stock).subscribe((result)=>{

                if(result !=null){

                  alert("Stock Added Successfully");

                  this.itemsTable = new Array<StockItemDetail>();

                  this.searchItemName = null;
                  this.searchItemDetails.itemId = null;
                  this.searchRetailPrice = null;
                  this.itemQuantity = null;
                  this.totAmount=null;
                  this.searchBuyingPrice = null;
                  this.searchItemDetails.quantityOnHand = null;

                }

              });

            }else{

              alert('Please Add Items To Table');

            }
          }else{
            alert('Please Select Stock Payment Date')

          }

        }else{

          alert('Credit Balance is Greater than Total Amount');

        }

      }else{

        alert('Select Payment Type');

      }

    }else{
      alert('please Select Supplier');
    }



  }

  makeModel :Make = new Make();
  addMakeName:string;

  addMake(){

    this.makeModel.makeName=this.addMakeName;

    this.makeService.addMakes(this.makeModel).subscribe((result)=>{

      if(result !=null){

        alert("Stock Added Successfully");
        this.findAllMakes();

      }

    });
  }

  findAllMakesToArray :Array<Make> = new Array<Make>();

  findAllMakes(){

    this.makeService.findAllMakes().subscribe((result)=>{

      if(result !=null){

        this.findAllMakesToArray = result;

      }

    });
  }



}
