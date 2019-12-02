package lk.vsc.DTO;

import lk.vsc.entity.ServiceJob;
import lk.vsc.entity.ServiceJobDetails;

import java.util.List;

public class ServicesDTO{

    ServiceJob serviceOrder ;
    ServiceInvoiceDTO serviceInvoice ;
    List<ServiceJobDetails> serviceJobDetails;

    public List<ServiceJobDetails> getServiceJobDetails() {
        return serviceJobDetails;
    }

    public void setServiceJobDetails(List<ServiceJobDetails> serviceJobDetails) {
        this.serviceJobDetails = serviceJobDetails;
    }

    public ServiceJob getServiceOrder() {
        return serviceOrder;
    }

    public void setServiceOrder(ServiceJob serviceOrder) {
        this.serviceOrder = serviceOrder;
    }

    public ServiceInvoiceDTO getServiceInvoice() {
        return serviceInvoice;
    }

    public void setServiceInvoice(ServiceInvoiceDTO serviceInvoice) {
        this.serviceInvoice = serviceInvoice;
    }
}
