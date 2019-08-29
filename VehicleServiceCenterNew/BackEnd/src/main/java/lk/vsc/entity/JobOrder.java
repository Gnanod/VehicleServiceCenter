package lk.vsc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class JobOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobID;
    private String date ;
    private double total;
    private String  employeeName;
    @ManyToOne
    private Vehicle vehicle;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "jobOrder")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<JobOrderItemDetails> jobOrderItemDetails;

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

        for (JobOrderItemDetails j: jobOrderItemDetails
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
