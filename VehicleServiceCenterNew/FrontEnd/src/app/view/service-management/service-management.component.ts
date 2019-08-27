import { Component, OnInit } from '@angular/core';
import {MakeModelService} from "../../Service/make-model.service";
import {MakeModel} from "../../Model/MakeModel";
import {MakeModelDetail} from "../../Model/MakeModelDetail";
import {Item} from "../../Model/Item";
import {ModelServiceDetails} from "../../Model/ModelServiceDetails";
import {Services} from "../../Model/Services";

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {

  constructor(private make_model_service: MakeModelService) {
  }

  ngOnInit() {
  }

  serviceName: string;
  insertselectedMake: string;
  insertItemModel: string;
  searchMakesByModel: Array<MakeModel> = new Array<MakeModel>();
  servicePrice :number;


  getMakeModelDetails(value: string) {


    this.make_model_service.getMakeModelDetails(value).subscribe((result) => {

      if (result != null) {

        this.searchMakesByModel = result;
        //this.addTableModel=null;

      }
    });

  }

  addToItemsTable() {

    let serviceMakeModel: ModelServiceDetails = new ModelServiceDetails();



    let makeModel: MakeModel = new MakeModel();
    makeModel.modelName = this.insertItemModel;
    makeModel.makeName = this.insertselectedMake;

    let service : Services =new Services();
   // service.servicePrice = this.servicePrice;

    serviceMakeModel.makeModel = makeModel;
    serviceMakeModel.services = service;

    //makeModel.makeModelId=2;

    if (this.insertItemModel != null && this.insertselectedMake != null) {

      this.make_model_service.searchMakeModelId(this.insertItemModel, this.insertselectedMake).subscribe((result) => {

        if (result != null) {


          makeModel.makeModelId = parseInt(result);


        }
      });

    }
  }
}
