package lk.vsc.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class PerformaInvoice {

    @Id
    private String performaInvoiceId;
    private String serviceId;
    private String date;
    private double serviceAmount;
    private double itemAmount;
    private double grossAmount;
    private String invoiceStatus;


    public PerformaInvoice(){

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = new Date();
        String newDate = dateFormat.format(date1);
        this.date = newDate;

    }

    public String getPerformaInvoiceId() {
        return performaInvoiceId;
    }

    public void setPerformaInvoiceId(String performaInvoiceId) {
        this.performaInvoiceId = performaInvoiceId;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getServiceAmount() {
        return serviceAmount;
    }

    public void setServiceAmount(double serviceAmount) {
        this.serviceAmount = serviceAmount;
    }

    public double getItemAmount() {
        return itemAmount;
    }

    public void setItemAmount(double itemAmount) {
        this.itemAmount = itemAmount;
    }

    public double getGrossAmount() {
        return grossAmount;
    }

    public void setGrossAmount(double grossAmount) {
        this.grossAmount = grossAmount;
    }

    public String getInvoiceStatus() {
        return invoiceStatus;
    }

    public void setInvoiceStatus(String invoiceStatus) {
        this.invoiceStatus = invoiceStatus;
    }
}
