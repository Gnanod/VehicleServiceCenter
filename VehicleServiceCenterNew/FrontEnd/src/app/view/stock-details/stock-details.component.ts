import {Component, OnInit} from '@angular/core';
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
import Swal from "sweetalert2";
import {StockPayment} from "../../Model/StockPayment";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {

  public constructor(private make_model_service: MakeModelService, private itemService: ItemService, private supplierService: SupplierService, private datePipe: DatePipe, private stockService: StockService, private makeService: MakeServiceService) {
  }

  ngOnInit() {
    this.getAllSuppliers();
    this.findAllMakes();
  }

  discountPresentage: number = 0;
  finalTotal: number;
  finaltotString: string;
  /////////////Search Item/////////////

  searchStockItemName: string;
  selectedItem: Item = new Item();

  searchMakesByModel: Array<MakeModel> = new Array<MakeModel>();
  //Insert Item
  insertItemModel: string;
  itemName: string;
  insertselectedMake: string;
  insertItemToTable: Array<MakeModelDetail> = new Array<MakeModelDetail>();
  itemQuantityType: string;


  suppliers: Array<Supplier> = new Array<Supplier>();
  selectedSupplierCompany: string;
  suppliersNames: Array<Supplier> = new Array<Supplier>();

  ////////////////////////////////////////////////////////////////////

  names: Supplier = new Supplier();

  ///////////////////////////////////////////////////////////////


  //Insert items
  searchItemName: string;
  searchBuyingPrice: string;
  searchRetailPrice: string;
  itemQuantity: string;
  itemDetailsQtyOnHand: string;
  stockLevel: number;


  //SearchItemDetails
  searchItemDetails: Item = new Item();
  searchItemDetailsArray: Array<Item> = new Array<Item>();

//addItemsTable
  itemsTable: Array<StockItemDetail> = new Array<StockItemDetail>();
///////////////////////////////
  displayTotAmount: string;

  /////////////////////////////////////////////
  stockPayementDate: string;

  itemId: string;
  totAmount: number = 0;

  addToItemTable() {

    let stockItemDetails: StockItemDetail = new StockItemDetail();

    stockItemDetails.buyingPrice = parseFloat(this.searchBuyingPrice);

    let item: Item = new Item();
    item.itemName = this.searchItemDetails.itemName;
    item.itemId = this.searchItemDetails.itemId;
    item.quantityOfPrice = parseFloat(this.searchRetailPrice);


    item.stockLevel = this.searchItemDetails.stockLevel;
    item.itemQuantityType = this.searchItemDetails.itemQuantityType;


    let qty: number = parseFloat(this.itemQuantity + this.searchItemDetails.quantityOnHand);


    item.quantityOnHand = parseFloat(this.itemQuantity + this.searchItemDetails.quantityOnHand);

    stockItemDetails.item = item;
    stockItemDetails.quantity = parseFloat(this.itemQuantity);


    // if (this.searchItemDetails.itemName != null && this.searchItemDetails.itemId != null && this.searchItemDetails.quantityOfPrice != null && this.searchItemDetails.quantityOnHand != null && this.itemQuantity != null && this.searchBuyingPrice != null && this.searchRetailPrice != null) {
    //
    //   this.itemsTable.push(stockItemDetails);
    //   this.searchItemDetailsArray = new Array<Item>();
    //   this.searchStockItemName = null;
    //   this.calcTotal();
    //   this.searchItemDetails.itemName = null;
    //   this.searchItemDetails.itemId = null;
    //   this.searchRetailPrice = null;
    //   this.itemQuantity = null;
    //   this.searchBuyingPrice = null;
    //   this.searchItemDetails.quantityOnHand = null;
    //
    // }

    if (this.searchItemDetails.itemId != null) {
      if (this.searchItemDetails.itemName != null) {
        if (this.searchBuyingPrice != null) {
          if (this.stockPayementDate != null) {
            if (this.searchRetailPrice != null) {
              if (this.itemQuantity != null) {
                this.itemsTable.push(stockItemDetails);
                this.searchItemDetailsArray = new Array<Item>();
                this.searchStockItemName = null;
                this.calcTotal();
                this.searchItemDetails.itemName = null;
                this.searchItemDetails.itemId = null;
                this.searchRetailPrice = null;
                this.itemQuantity = null;
                this.searchBuyingPrice = null;
                this.searchItemDetails.quantityOnHand = null;
              } else {
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Item Quantity Field Is Empty',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Retail  Price Field Is Empty',
                showConfirmButton: false,
                timer: 1500
              })
            }
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Payment Date Field Is Empty',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Item Buying Price Field Is Empty',
            showConfirmButton: false,
            timer: 1500
          })
        }

      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Item Name Field Is Empty',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Item Code Field Is Empty',
        showConfirmButton: false,
        timer: 1500
      })
    }


  }


  addToItemsTable() {
    let itemMakeModel: MakeModelDetail = new MakeModelDetail();
    let item: Item = new Item();
    item.itemId = this.itemId;
    item.itemName = this.itemName;
    item.itemQuantityType = this.itemQuantityType;
    itemMakeModel.stockLevel = this.stockLevel;
    //item.stockLevel = this.stockLevel;

    let makeModel: MakeModel = new MakeModel();
    makeModel.modelName = this.insertItemModel;
    makeModel.makeName = this.insertselectedMake;

    //makeModel.makeModelId=2;
    if (this.insertItemModel != null && this.insertselectedMake != null) {

      this.make_model_service.searchMakeModelId(this.insertItemModel, this.insertselectedMake).subscribe((result) => {

        if (result != null) {
          makeModel.makeModelId = parseInt(result);

        }
      });

    }


    itemMakeModel.item = item;
    itemMakeModel.makeModel = makeModel;

    // if (this.itemName != null && this.insertselectedMake != null && this.insertItemModel != null) {
    //
    //   this.insertItemToTable.push(itemMakeModel);
    //
    //
    // }

    if (this.itemId != null) {
      if (this.itemName != null) {
        if (this.insertselectedMake != null) {
          if (this.itemQuantityType != null) {
            if (this.stockLevel != null) {
              if (this.insertItemModel != null) {
                this.insertItemToTable.push(itemMakeModel);
              }else{
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: 'Select Model',
                  showConfirmButton: false,
                  timer: 1500
                })
              }
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Stock Level Field is Empty',
                showConfirmButton: false,
                timer: 1500
              })
            }
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Select Item Quantity Type',
              showConfirmButton: false,
              timer: 1500
            })
          }
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Select Make ',
            showConfirmButton: false,
            timer: 1500
          })
        }
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Item Name Field Is Empty',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Item Id Field Is Empty',
        showConfirmButton: false,
        timer: 1500
      })
    }


  }

  deleteItemTableRow(id) {

    for (let i = 0; i < this.insertItemToTable.length; ++i) {
      if (this.insertItemToTable[i].makeModel.modelName === id) {
        this.insertItemToTable.splice(i, 1);
      }
    }

  }


  deleteRow(id) {
    for (let i = 0; i < this.itemsTable.length; ++i) {
      if (this.itemsTable[i].item.itemId === id) {
        this.itemsTable.splice(i, 1);
      }
      this.calcTotal();
    }
  }


  modelNameif = false;

  getMakeModelDetails(value: string) {
    this.make_model_service.getMakeModelDetails(value).subscribe((result) => {
      if (result.length != 0) {
        this.modelNameif = true;
        this.searchMakesByModel = result;
        this.searchMakesByModel[0] = result[0];
      } else {

        this.searchMakesByModel = new Array<MakeModel>();

      }
    });

  }

  addItemsToDB() {
    if (this.insertItemToTable.length != 0) {
      let item: Item = new Item();
      item.itemId = this.itemId;
      item.itemName = this.itemName;
      item.itemQuantityType = this.itemQuantityType
      item.stockLevel = this.stockLevel;
      item.makeModelDetails = this.insertItemToTable;
      this.itemService.addItemsToDB(item).subscribe((result) => {
        if (result != null) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Item Added Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          this.insertItemToTable = new Array<MakeModelDetail>();
          this.itemName = null;
          this.totAmount = 0;
          this.stockLevel = 0;
          this.itemId = null;
          this.searchMakesByModel = new Array<MakeModel>();
        }
      });
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Add Items To Table',
        showConfirmButton: false,
        timer: 1500
      })
    }


  }


  getAllSuppliers() {
    this.supplierService.getAllSupplier().subscribe((result) => {
      this.suppliers = result;
    });

  }

  getSuppliersNames(value: string) {

    this.supplierService.getSuppliersNames(value).subscribe((result) => {
      this.suppliersNames = result;
    });
  }

  searchItemDetailsByName(event: any) {

    if (event.which == 13) {
      if (this.searchStockItemName.length != 0) {
        this.itemService.getItemDetailsByName(this.searchStockItemName).subscribe((result) => {
          if (result == null) {
            this.searchItemDetailsArray = null;

            this.selectedItem.itemId = null;
            this.getAllItemDetailsToUI("K");
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Item Not Found',
              showConfirmButton: false,
              timer: 1500
            })
          } else {
            this.searchItemDetailsArray = result;
            this.searchItemDetails = result[0];
            document.getElementById('buyingPrice').focus();
          }
        });
      } else {

        this.searchItemDetailsArray = null;
      }
    }


  }

  getAllItemDetailsToUI(value: string) {

    console.log("Error")
    this.searchItemDetails = this.selectedItem;

    if (value == "K") {

      this.searchItemDetails.itemId = null;
      this.searchItemDetails.quantityOnHand = parseFloat("0");
    }

  }

/////////////////////////////////////////////////////////////////////////
  paymentType: string;
  creditBalance: number = 0;
  selectedSupplier: Supplier = new Supplier();

  ///////////////////////////////////////////////////////////////////
  changeValue() {
    this.creditBalance = 0;
  }


  saveStock() {
    let stock: Stock = new Stock();
    let supplier: Supplier = new Supplier();
    supplier.supplierId = this.selectedSupplier.supplierId;
    stock.supplier = supplier;

    let stockPaymentArray :Array<StockPayment> = new Array<StockPayment>();

    let stockPayment :StockPayment = new StockPayment();
    stockPayment.payment=this.creditBalance;
    stockPaymentArray.push(stockPayment);
    stock.stockPayment= stockPaymentArray;
    stock.beforeDiscountTotal = this.totAmount;

    let balance: number = 0;
    balance = this.finalTotal - this.creditBalance;
    stock.creditBalance = balance;
    stock.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    stock.stockItemDetails = this.itemsTable;
    stock.stockPayementDate = this.stockPayementDate;
    stock.discount = this.discountPresentage;
    stock.finalDiscountedTotal = this.finalTotal;
    if (balance === 0) {
      this.paymentType = "Full Payment";
    } else if (this.finalTotal > this.creditBalance) {
      this.paymentType = "Credit Payment";
    }
    stock.paymentType = this.paymentType;
    if (supplier.supplierId != null) {
      if (this.stockPayementDate != null) {
        if (this.itemsTable.length != 0) {

          if (this.creditBalance != 0) {
            this.stockService.addStock(stock).subscribe((result) => {

              if (result != null) {

                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Stock Added Successfully',
                  showConfirmButton: false,
                  timer: 1500
                })

                this.itemsTable = new Array<StockItemDetail>();

                this.searchItemName = null;
                this.searchItemDetails.itemId = null;
                this.searchRetailPrice = null;
                this.itemQuantity = null;
                this.totAmount = null;
                this.searchBuyingPrice = null;
                this.searchItemDetails.quantityOnHand = null;
                this.creditBalance = null;
                this.displayTotAmount = null;

              }

            });
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Credit Balance Field is Empty',
              showConfirmButton: false,
              timer: 1500
            })
          }

        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Please Add Items To Table',
            showConfirmButton: false,
            timer: 1500
          })
        }
      } else {
        // alert('Please Select Stock Payment Date');
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Please Select Stock Payment Date',
          showConfirmButton: false,
          timer: 1500
        })
      }
    } else {
      // alert('please Select Supplier');
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'please Select Supplier',
        showConfirmButton: false,
        timer: 1500
      })
    }


  }

  makeModel: Make = new Make();
  addMakeName: string;

  addMake() {

    this.makeModel.makeName = this.addMakeName;

    this.makeService.addMakes(this.makeModel).subscribe((result) => {

      if (result != null) {

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Stock Added Successfully',
          showConfirmButton: false,
          timer: 1500
        })
        this.findAllMakes();

      }

    });
  }

  findAllMakesToArray: Array<Make> = new Array<Make>();

  findAllMakes() {
    this.makeService.findAllMakes().subscribe((result) => {
      if (result != null) {
        this.findAllMakesToArray = result;
      }
    });
  }

  calcTotal() {
    let totAmount: number = 0;
    for (let i = 0; i < this.itemsTable.length; ++i) {
      let buyingPrice: number = this.itemsTable[i].buyingPrice;
      let quantity: number = this.itemsTable[i].quantity;
      totAmount += buyingPrice * quantity;
    }
    this.totAmount = totAmount;
    this.displayTotAmount = this.totAmount.toFixed(2);
    this.finalTotal = this.totAmount - ((this.totAmount * this.discountPresentage) / 100.00);
    this.finaltotString = this.finalTotal.toFixed(2);
    if (this.itemsTable.length === 0) {
      this.totAmount = 0;
      this.displayTotAmount = this.totAmount.toFixed(2);
    }
  }

  choosePaymentType() {
    if (this.finalTotal < this.creditBalance) {
      // alert('Entered Amount is greater than Total Price')
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Entered Amount is greater than Total Price',
        showConfirmButton: false,
        timer: 1500
      })
      this.creditBalance = parseFloat(this.creditBalance.toString().substring(0, this.creditBalance.toString().length - 1));
    }
  }

  calculteDiscount(event) {
    if (event.which === 13) {
      this.calcTotal();
      document.getElementById('creditPayment').focus();
    }
  }

}
