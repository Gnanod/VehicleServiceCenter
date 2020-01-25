import {Component, OnInit} from '@angular/core';
import {JoborderServiceService} from "../../Service/joborder-service.service";
import Swal from "sweetalert2";
import {Customer} from "../../Model/Customer";
import {VehicleHistoryDTO} from "../../DTO/VehicleHistoryDTO";
import {ViewServicesDTO} from "../../DTO/ViewServicesDTO";
import {ViewItemDetailsDTO} from "../../DTO/ViewItemDetailsDTO";

@Component({
  selector: 'app-vehiclehictory',
  templateUrl: './vehiclehictory.component.html',
  styleUrls: ['./vehiclehictory.component.css']
})
export class VehiclehictoryComponent implements OnInit {

  constructor(private jobService: JoborderServiceService) {
  }

  searchVehicleHistoryValuesIf = true;
  viewServiceForThisJobValuesIf = true;
  viewItemDetailsValuesIf = true;
  ngOnInit() {

  }

  searchvehicleNumber: string;

  vehicleDetails: Array<VehicleHistoryDTO> = new Array<VehicleHistoryDTO>();
  serviceDetails: Array<ViewServicesDTO> = new Array<ViewServicesDTO>();
  itemDetails: Array<ViewItemDetailsDTO> = new Array<ViewItemDetailsDTO>();

  getAllVehicleHistoryByUsingVehNumber(){
    this.jobService.getAllVehicleHistoryByUsingVehNumber(this.searchvehicleNumber).subscribe((result) => {
      console.log(result)
      if (result.length == 0) {
        this.searchVehicleHistoryValuesIf = true;

      } else {
        this.searchVehicleHistoryValuesIf = false;
        this.vehicleDetails = result;
        console.log(this.vehicleDetails);
      }

    });
  }

  viewServiceForThisJob(serviceId) {
    this.jobService.viewServiceForThisJob(serviceId).subscribe((result) => {

      console.log('llllllllllllllllllll');
      console.log(result)
      if (result.length == 0) {
        this.viewServiceForThisJobValuesIf = true;

      } else {
        this.viewServiceForThisJobValuesIf = false;
        this.serviceDetails = result;
      }

    });

  }

  getItemDetails(jobId: string) {
    this.jobService.viewItemDetails(jobId).subscribe((result) => {

      if (result.length == 0) {
        this.viewItemDetailsValuesIf = true;

      } else {
        this.viewItemDetailsValuesIf = false;
        this.itemDetails = result;
      }

    });

  }
}
