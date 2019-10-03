package lk.vsc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int vehicleId;
    private String vehicleNumber;
    private String engineNumber;
    private String vehicleClass;
    private String vehicleModel;
    private String yearOfManufacture;
    private String vehicleMake;

  
    @ManyToOne
    //@OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(nullable = false)
    private Customer customer;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "vehicle")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Set<JobOrder> jobOrder;

    public String getVehicleMake() {
        return vehicleMake;
    }

    public void setVehicleMake(String vehicleMake) {
        this.vehicleMake = vehicleMake;
    }

    public Set<JobOrder> getJobOrder() {
        return jobOrder;
    }

    public void setJobOrder(Set<JobOrder> jobOrder) {
        this.jobOrder = jobOrder;
    }

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "vehicle")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Set<ServiceJob> serviceJob;


    public int getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(int vehicleId) {
        this.vehicleId = vehicleId;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

    public String getEngineNumber() {
        return engineNumber;
    }

    public void setEngineNumber(String engineNumber) {
        this.engineNumber = engineNumber;
    }

    public String getVehicleClass() {
        return vehicleClass;
    }

    public void setVehicleClass(String vehicleClass) {
        this.vehicleClass = vehicleClass;
    }

    public String getVehicleModel() {
        return vehicleModel;
    }

    public void setVehicleModel(String vehicleModel) {
        this.vehicleModel = vehicleModel;
    }

    public String getYearOfManufacture() {
        return yearOfManufacture;
    }

    public void setYearOfManufacture(String yearOfManufacture) {
        this.yearOfManufacture = yearOfManufacture;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
