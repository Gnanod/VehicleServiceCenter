package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
public class ServiceJob {
    @Id
    String serviceJobId;
    private String date;
    private double total;
    private String  employeeName;

    @ManyToOne
    private Vehicle vehicle;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "serviceJob")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ServiceJobDetails> serviceJobDetails;

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

    public List<ServiceJobDetails> getServiceJobDetails() {
        return serviceJobDetails;
    }

    public void setServiceJobDetails(List<ServiceJobDetails> serviceJobDetails) {
        for (ServiceJobDetails j: serviceJobDetails
        ) {
//            System.out.println(j.getServices().serviceId);
//            System.out.println(j.getServiceJob().serviceJobId);
            j.setServiceJob(this);
            System.out.println("GGG"+j.getServiceJob().getServiceJobId());
        }

        this.serviceJobDetails = serviceJobDetails;
    }


}
