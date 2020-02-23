package lk.vsc.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class JobClose {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobCloseId;
    private String serviceId;
    private String date;
    private double serviceAmount;
    private double itemAmount;

//    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "jobClose")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private Set<ServiceJobDetails> serviceJobDetails;

//    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "jobClose")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private Set<JobOrderItemDetails> jobOrderItemDetails;

//    public Set<ServiceJobDetails> getServiceJobDetails() {
//        return serviceJobDetails;
//    }

//    public void setServiceJobDetails(Set<ServiceJobDetails> serviceJobDetails) {
//
//        for (ServiceJobDetails i: serviceJobDetails
//        ) {
//            i.setJobClose(this);
//        }
//
//        this.serviceJobDetails = serviceJobDetails;
//    }

//    public Set<JobOrderItemDetails> getJobOrderItemDetails() {
//        return jobOrderItemDetails;
//    }
//
//    public void setJobOrderItemDetails(Set<JobOrderItemDetails> jobOrderItemDetails) {
//
//        for (JobOrderItemDetails i: jobOrderItemDetails
//        ) {
//            i.setJobClose(this);
//        }
//
//        this.jobOrderItemDetails = jobOrderItemDetails;
//    }

    public int getJobCloseId() {
        return jobCloseId;
    }

    public void setJobCloseId(int jobCloseId) {
        this.jobCloseId = jobCloseId;
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
}
