package lk.vsc.DTO;

import lk.vsc.entity.ServiceJob;

public class ServicesDTO{

    ServiceJob serviceOrder ;
    ServiceInvoiceDTO serviceInvoice ;

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
