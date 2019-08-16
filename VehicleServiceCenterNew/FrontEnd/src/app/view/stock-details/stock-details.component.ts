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

  //SearchItemDetails
  searchItemDetails :Item = new Item();

//addItemsTable
  itemsTable : Array<StockItemDetail> = new Array<StockItemDetail>();



  addToTable(){

    let makeModel : MakeModel = new MakeModel();
    console.log("selectedmake"+this.selectedMake);
    makeModel.makeName=this.selectedMake;
    makeModel.modelName=this.addTableModel;
    this.tableMakeModel.push(makeModel);

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

    stockItemDetails.item=item;
    stockItemDetails.quantity=parseFloat(this.itemQuantity);

    let amount :number;
    amount = this.totAmount+(stockItemDetails.buyingPrice*stockItemDetails.quantity);
    console.log("amount"+amount);

    let stringAmount :string=amount.toString();
    this.totAmount=parseFloat(stringAmount);

    this.itemsTable.push(stockItemDetails);


  }


  addToItemsTable(){

    let itemMakeModel :MakeModelDetail = new MakeModelDetail();

    let item :Item = new Item();
    item.itemName=this.itemName;

    let makeModel :MakeModel = new MakeModel();
    makeModel.modelName=this.insertItemModel;
    makeModel.makeName=this.insertselectedMake;

    //makeModel.makeModelId=2;
    this.make_model_service.searchMakeModelId(this.insertItemModel,this.insertselectedMake).subscribe((result)=>{

      if(result!=null){


        makeModel.makeModelId=parseInt(result);

      }
    });


    itemMakeModel.item=item;
    itemMakeModel.makeModel=makeModel;
    this.insertItemToTable.push(itemMakeModel);

  }

  deleteItemTableRow(id){
   for(let i = 0; i < this.insertItemToTable.length; ++i){
      if (this.insertItemToTable[i].makeModel.modelName === id) {
        this.insertItemToTable.splice(i,1);
      }
    }
  }
  deleteRow(id){

    for(let i = 0; i < this.tableMakeModel.length; ++i){
      if (this.tableMakeModel[i].modelName === id) {
        this.tableMakeModel.splice(i,1);
      }
    }

  }

  addMakeModelDetails(){

    this.make_model_service.addMakeModelDetails(this.tableMakeModel).subscribe((result)=>{

      if(result!=null){

        alert('Makes Added SuccessFully');
        this.addTableModel=null;

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
   // item.itemId=1;
    item.makeModelDetails=this.insertItemToTable;
    // item.make=this.insertselectedMake;
    // item.model=this.insertItemModel;

    this.itemService.addItemsToDB(item).subscribe((result)=>{

      if(result!=null){

        alert('Added Successfully');

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

          this.searchItemDetails.quantityOnHand=10;

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
    supplier.supplierId = 1;
    stock.supplier=supplier;
    stock.payment=this.totAmount;
    stock.date =this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    stock.stockItemDetails = this.itemsTable;

  this.stockService.addStock(stock).subscribe((result)=>{

    if(result !=null){

      console.log("LLLL"+result)
      alert("Stock Added Successfully");

    }

  });
  }




}
