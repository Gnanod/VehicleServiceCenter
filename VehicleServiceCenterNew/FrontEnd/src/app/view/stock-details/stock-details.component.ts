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

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  constructor(private make_model_service :MakeModelService,private itemService :ItemService,private supplierService:SupplierService,private datePipe :DatePipe,private stockService:StockService) { }

  ngOnInit() {
    this.getAllItems();
  }


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

  //getAll Suppliers
  //getSupplier : Array<Supplier> = new Array<Supplier>();
  suppliers: Array<Supplier> = new Array<Supplier>();
  selectedSupplierCompany :string;
  suppliersNames :Array<Supplier> = new Array<Supplier>();
  selectedsupplierName :string;

  //Insert items
  searchItemName :string;
  searchBuyingPrice:string;
  searchRetailPrice:string;
  itemQuantity:string;
  itemDetailsQtyOnHand:string;
  stockLevel :number;


  //SearchItemDetails
  searchItemDetails :Item = new Item();

//addItemsTable
  itemsTable : Array<StockItemDetail> = new Array<StockItemDetail>();



  addToTable(){

    let makeModel : MakeModel = new MakeModel();
    console.log("selectedmake"+this.selectedMake);
    makeModel.makeName=this.selectedMake;
    makeModel.modelName=this.addTableModel;

    if(this.selectedMake !=null && this.addTableModel!=null){

      this.tableMakeModel.push(makeModel);
    }


  }

  itemId :String;
  totAmount :number=0;

  addToItemTable(){

    let stockItemDetails : StockItemDetail = new StockItemDetail();

    stockItemDetails.buyingPrice=parseFloat(this.searchBuyingPrice);

    let item : Item = new Item();
    item.itemName= this.searchItemName;
    item.itemId = this.searchItemDetails.itemId;
    item.quantityOfPrice= parseFloat(this.searchRetailPrice);

    // item.stockLevel = this.searchItemDetails.stockLevel;
    let qty:number=parseFloat( this.itemQuantity + this.searchItemDetails.quantityOnHand );

    console.log("JJJJ"+qty);

    item.quantityOnHand=parseFloat(this.itemQuantity+this.searchItemDetails.quantityOnHand);

    stockItemDetails.item=item;
    stockItemDetails.quantity=parseFloat(this.itemQuantity);





    if(this.searchItemName !=null && this.searchItemDetails.itemId !=null && this.searchRetailPrice !=null && this.itemQuantity !=null ){

      this.itemsTable.push(stockItemDetails);
      let amount :number;
      amount = this.totAmount+(stockItemDetails.buyingPrice*stockItemDetails.quantity);
      console.log("amount"+amount);
      let stringAmount :string=amount.toString();
      this.totAmount=parseFloat(stringAmount);
    }




  }


  addToItemsTable(){

    let itemMakeModel :MakeModelDetail = new MakeModelDetail();

    let item :Item = new Item();
    item.itemName=this.itemName;
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

  addMakeModelDetails(){

    this.make_model_service.addMakeModelDetails(this.tableMakeModel).subscribe((result)=>{

      if(result!=null){

        alert('Makes Added SuccessFully');
        this.addTableModel=null;
        this.tableMakeModel=null;
      }
    });
  }

  getMakeModelDetails(value :string){


    this.make_model_service.getMakeModelDetails(value).subscribe((result)=>{

      if(result!=null){

        this.searchMakesByModel=result;
        //this.addTableModel=null;

      }
    });

  }

  addItemsToDB(){



    let item:Item = new Item();
    item.itemName=this.itemName;
   // item.stockLevel=this.stockLevel;
   // item.itemId=1;
    item.makeModelDetails=this.insertItemToTable;

    // item.make=this.insertselectedMake;
    // item.model=this.insertItemModel;


    this.itemService.addItemsToDB(item).subscribe((result)=>{

      if(result!=null){

        alert('Added Successfully');
        this.insertItemToTable = null;
        this.itemName = null;
      }

    });



  }



  getAllItems() {

    this.supplierService.getAllSupplier().subscribe((result) => {
      this.suppliers = result;
      this.selectedSupplierCompany=result[0].companyName;
    });

  }

  getSuppliersNames(value :string){

    this.supplierService.getSuppliersNames(value).subscribe((result) => {
      this.suppliersNames = result;
      console.log(this.suppliersNames[0])
     // this.selectedSupplierCompany=result[0].companyName;
    });
  }

  searchItemDetailsByName(event: any){


    if(this.searchItemName.length!=0){

      console.log(this.searchItemName);
      this.itemService.searchItemDetailsByName(this.searchItemName).subscribe((result)=>{

        if(result==null){

          alert('Item Not Found ')
         // this.searchItemDetails.quantityOnHand=10;

        }else{
          // this.searchItemValuesIf=false;
          this.searchItemDetails=result;

        }
      });
    }else{

    }

  }

  saveStock(){

    let stock :Stock = new Stock ();

    let supplier : Supplier = new Supplier();
    //supplier.supplierI`d = 1;
    stock.supplier=supplier;
    stock.payment=this.totAmount;
    stock.date =this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    stock.stockItemDetails = this.itemsTable;

    this.stockService.addStock(stock).subscribe((result)=>{

      if(result !=null){

        console.log("LLLL"+result)
        alert("Stock Added Successfully");

          this.itemsTable = null;
          this.searchItemName = null;
          this.searchItemDetails.itemId = null;
          this.searchRetailPrice = null;
          this.itemQuantity = null;
          this.totAmount=null;
          this.searchBuyingPrice = null;
          this.searchItemDetails.quantityOnHand = null;

        }

    });
  }




}
