package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class Services {

    @OnDelete(action = OnDeleteAction.CASCADE)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int serviceId;
    String serviceDesc;
    String serviceName;
    String vehicleClass;
    double servicePrice;

    public String getVehilceClass() {
        return vehicleClass;
    }

    public void setVehilceClass(String vehicleClass) {
        this.vehicleClass = vehicleClass;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public double getServicePrice() {
        return servicePrice;
    }

    public void setServicePrice(double servicePrice) {
        this.servicePrice = servicePrice;
    }

    public String getServiceDesc() {
        return serviceDesc;
    }


    public void setServiceDesc(String serviceDesc) {
        this.serviceDesc = serviceDesc;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }
}
