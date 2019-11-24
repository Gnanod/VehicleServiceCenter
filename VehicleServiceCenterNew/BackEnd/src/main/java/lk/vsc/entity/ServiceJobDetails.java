package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class ServiceJobDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int servicedetailsID;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Services services;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ServiceJob serviceJob;


    public int getServicedetailsID() {
        return servicedetailsID;
    }

    public void setServicedetailsID(int joborderdetailsid) {
        this.servicedetailsID = joborderdetailsid;
    }

    public ServiceJob getServiceJob() {
        return serviceJob;
    }

    public void setServiceJob(ServiceJob serviceJob) {
        this.serviceJob = serviceJob;
    }

    public Services getServices() {
        return services;
    }

    public void setServices(Services services) {
        this.services = services;
    }
}
