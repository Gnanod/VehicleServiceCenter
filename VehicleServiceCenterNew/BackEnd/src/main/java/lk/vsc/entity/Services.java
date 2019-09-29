package lk.vsc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.List;

@Entity
public class Services {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int serviceId;

    @Column(unique = true)
    String serviceDesc;
    String serviceName;
    double servicePrice;
    String vehicletype;

    @OneToMany(cascade = CascadeType.PERSIST, mappedBy = "services")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<ServiceJobDetails> serviceJobDetails;


    public List<ServiceJobDetails> getServiceJobDetails() {
        return serviceJobDetails;
    }

    public void setServiceJobDetails(List<ServiceJobDetails> serviceJobDetails) {
        this.serviceJobDetails = serviceJobDetails;
    }

    public String getVehicletype() {
        return vehicletype;
    }

    public void setVehicletype(String vehicletype) {
        this.vehicletype = vehicletype;
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
