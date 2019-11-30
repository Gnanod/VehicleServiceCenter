package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
public class JobOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobID;
    private String date;
    private double total;
    private String employeeName;
    private double lubeJobAmount;
    private double detailJobAmount;
    private String paymentType;
    private double paidAmount;
    private double creditBalance;
    private double serviceAmount;
    private double grossAmount;
    private String serviceId;

    @ManyToOne
    private Vehicle vehicle;


    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "jobOrder")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<JobOrderItemDetails> jobOrderItemDetails;

    public double getLubeJobAmount() {
        return lubeJobAmount;
    }

    public double getServiceAmount() {
        return serviceAmount;
    }

    public void setServiceAmount(double serviceAmount) {
        this.serviceAmount = serviceAmount;
    }

    public double getGrossAmount() {
        return grossAmount;
    }

    public void setGrossAmount(double grossAmount) {
        this.grossAmount = grossAmount;
    }

    public void setLubeJobAmount(double lubeJobAmount) {
        this.lubeJobAmount = lubeJobAmount;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public double getDetailJobAmount() {
        return detailJobAmount;
    }

    public void setDetailJobAmount(double detailJobAmount) {
        this.detailJobAmount = detailJobAmount;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public double getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public double getCreditBalance() {
        return creditBalance;
    }

    public void setCreditBalance(double creditBalance) {
        this.creditBalance = creditBalance;
    }



    public int getJobID() {
        return jobID;
    }

    public void setJobID(int jobID) {
        this.jobID = jobID;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }


    public List<JobOrderItemDetails> getJobOrderItemDetails() {
        return jobOrderItemDetails;
    }

    public void setJobOrderItemDetails(List<JobOrderItemDetails> jobOrderItemDetails) {
        for (JobOrderItemDetails j : jobOrderItemDetails
        ) {
            j.setJobOrder(this);
        }
        this.jobOrderItemDetails = jobOrderItemDetails;

    }

    public String getEmployeeName() {

        return employeeName;

    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }


}
