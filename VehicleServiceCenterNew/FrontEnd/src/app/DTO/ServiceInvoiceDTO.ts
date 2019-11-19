import {Services} from "../Model/Services";

export class ServiceInvoiceDTO {

  invoiceNumber: string;
  vehicleNumber: string;
  chasisNumber: string;
  make: string;
  model: string;
  year: string;
  customerName: string;
  customerPhoneNumber: string;
  customerAddress: string;
  services: Array<Services>;
  total: number;

}
