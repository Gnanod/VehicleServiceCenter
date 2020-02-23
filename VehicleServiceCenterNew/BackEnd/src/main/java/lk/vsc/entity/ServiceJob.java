package lk.vsc.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class ServiceJob {
    @Id
    String serviceJobId;
    private String date;
    private double total;
    private String employeeName;
    private String presentOdoMeter;
    private String jobStatus;
    @ManyToOne
    private Vehicle vehicle;

//    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "serviceJob")
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private List<ServiceJobDetails> serviceJobDetails;

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    public String getPresentOdoMeter() {
        return presentOdoMeter;
    }

    public void setPresentOdoMeter(String presentOdoMeter) {
        this.presentOdoMeter = presentOdoMeter;
    }

    public String getServiceJobId() {
        return serviceJobId;
    }

    public void setServiceJobId(String serviceJobId) {
        this.serviceJobId = serviceJobId;
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

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }

//    public List<ServiceJobDetails> getServiceJobDetails() {
//        return serviceJobDetails;
//    }

//    public void setServiceJobDetails(List<ServiceJobDetails> serviceJobDetails) {
//        for (ServiceJobDetails j: serviceJobDetails
//        ) {
////            System.out.println(j.getServices().serviceId);
////            System.out.println(j.getServiceJob().serviceJobId);
//            j.setServiceJob(this);
//            System.out.println("GGG"+j.getServiceJob().getServiceJobId());
//            System.out.println("GGG"+j.getServices().getServiceId());
//        }
//
//        this.serviceJobDetails = serviceJobDetails;
//    }


}
