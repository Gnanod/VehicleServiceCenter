package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class ServiceJob {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int serviceJobId;
    private String date;
    private double total;
    private String  employeeName;

    @ManyToOne
    private Vehicle vehicle;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "serviceJob")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<ServiceJobDetails> serviceJobDetails;

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

//    public Vehicle getVehicle() {
//        return vehicle;
//    }
//
//    public void setVehicle(Vehicle vehicle) {
//        this.vehicle = vehicle;
//    }

    public Set<ServiceJobDetails> getServiceJobDetails() {
        return serviceJobDetails;
    }

    public void setServiceJobDetails(Set<ServiceJobDetails> serviceJobDetails) {
        for (ServiceJobDetails j: serviceJobDetails
        ) {
            j.setServiceJob(this);
        }

        this.serviceJobDetails = serviceJobDetails;
    }

    public int getServiceJobId() {
        return serviceJobId;
    }
    public void setServiceJobId(int serviceJobId) {
        this.serviceJobId = serviceJobId;
    }

}
