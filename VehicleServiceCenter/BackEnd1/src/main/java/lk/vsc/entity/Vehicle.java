package lk.vsc.entity;


import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Vehicle {
    @Id
    int vehicleId;
    String vehicleNumber;
    
}
