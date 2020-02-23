package lk.vsc.entity;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class FinalInvoicePayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int finalInvoicePaymentId;
    private String date;
    private double payment;
    @ManyToOne
    private FinalInvoice finalInvoice;


    public FinalInvoicePayment(){

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = new Date();
        String newDate = dateFormat.format(date1);
        this.date = newDate;

    }

    public int getFinalInvoicePaymentId() {
        return finalInvoicePaymentId;
    }

    public void setFinalInvoicePaymentId(int finalInvoicePaymentId) {
        this.finalInvoicePaymentId = finalInvoicePaymentId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getPayment() {
        return payment;
    }

    public void setPayment(double payment) {
        this.payment = payment;
    }

    public FinalInvoice getFinalInvoice() {
        return finalInvoice;
    }

    public void setFinalInvoice(FinalInvoice finalInvoice) {
        this.finalInvoice = finalInvoice;
    }
}
