import {ServiceJob} from "../Model/ServiceJob";
import {ServiceInvoiceDTO} from "./ServiceInvoiceDTO";
import {ServiceJobDetails} from "../Model/ServiceJobDetails";

export class ServicesDTO {

  serviceOrder: ServiceJob;
  serviceInvoice: ServiceInvoiceDTO;
  serviceJobDetails : Array<ServiceJobDetails>;
}
