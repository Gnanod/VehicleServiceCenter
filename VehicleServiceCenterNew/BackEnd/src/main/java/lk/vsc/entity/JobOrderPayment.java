package lk.vsc.entity;

import javax.persistence.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
public class JobOrderPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobOrderPaymentId;
    String date;
    double payment;
    @ManyToOne
    private JobOrder jobOrder;

    public JobOrderPayment(){
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date1 = new Date();
        String newDate = dateFormat.format(date1);
        this.date = newDate;
    }

    public int getJobOrderPaymentId() {
        return jobOrderPaymentId;
    }

    public void setJobOrderPaymentId(int jobOrderPaymentId) {
        this.jobOrderPaymentId = jobOrderPaymentId;
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

    public JobOrder getJobOrder() {
        return jobOrder;
    }

    public void setJobOrder(JobOrder jobOrder) {
        this.jobOrder = jobOrder;
    }
}
