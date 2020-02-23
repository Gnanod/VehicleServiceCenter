package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
public class FinalInvoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int finalInvoiceId;
    private String serviceId;
    private String date;
    private double serviceAmount;
    private double itemAmount;
    private double grossAmount;
    private double serviceDiscount;
    private double itemDiscount;
    private double grossDiscount;
    private double discountedTotalService;
    private double discountedTotalItems;
    private double discountedTotalGross;
    private double totalAmount;
    private String paymentTypeInvoice;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "finalInvoice")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<FinalInvoicePayment> finalInvoicePayments;

    public String getPaymentTypeInvoice() {
        return paymentTypeInvoice;
    }

    public void setPaymentTypeInvoice(String paymentTypeInvoice) {
        this.paymentTypeInvoice = paymentTypeInvoice;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPaymentType() {
        return paymentTypeInvoice;
    }

    public void setPaymentType(String paymentTypeInvoice) {
        this.paymentTypeInvoice = paymentTypeInvoice;
    }

    public void setFinalInvoicePayments(List<FinalInvoicePayment> finalInvoicePayments) {
        for (FinalInvoicePayment j : finalInvoicePayments
        ) {
            j.setFinalInvoice(this);
        }
        this.finalInvoicePayments = finalInvoicePayments;
    }



    public List<FinalInvoicePayment> getFinalInvoicePayments() {
        return finalInvoicePayments;
    }


    public int getFinalInvoiceId() {
        return finalInvoiceId;
    }

    public void setFinalInvoiceId(int finalInvoiceId) {
        this.finalInvoiceId = finalInvoiceId;
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

    public double getServiceDiscount() {
        return serviceDiscount;
    }

    public void setServiceDiscount(double serviceDiscount) {
        this.serviceDiscount = serviceDiscount;
    }

    public double getItemDiscount() {
        return itemDiscount;
    }

    public void setItemDiscount(double itemDiscount) {
        this.itemDiscount = itemDiscount;
    }

    public double getGrossDiscount() {
        return grossDiscount;
    }

    public void setGrossDiscount(double grossDiscount) {
        this.grossDiscount = grossDiscount;
    }

    public double getDiscountedTotalService() {
        return discountedTotalService;
    }

    public void setDiscountedTotalService(double discountedTotalService) {
        this.discountedTotalService = discountedTotalService;
    }

    public double getDiscountedTotalItems() {
        return discountedTotalItems;
    }

    public void setDiscountedTotalItems(double discountedTotalItems) {
        this.discountedTotalItems = discountedTotalItems;
    }

    public double getDiscountedTotalGross() {
        return discountedTotalGross;
    }

    public void setDiscountedTotalGross(double discountedTotalGross) {
        this.discountedTotalGross = discountedTotalGross;
    }
}
