package lk.vsc.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int serviceId;
    double servicePrice;

    @OneToMany( mappedBy = "makeModel")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<ModelServiceDetails> modelServiceDetails;

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

    public Set<ModelServiceDetails> getModelServiceDetails() {
        return modelServiceDetails;
    }

    public void setModelServiceDetails(Set<ModelServiceDetails> modelServiceDetails) {
        this.modelServiceDetails = modelServiceDetails;
    }
}
