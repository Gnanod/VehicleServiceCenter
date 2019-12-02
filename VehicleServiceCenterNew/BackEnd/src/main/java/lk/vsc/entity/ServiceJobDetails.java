package lk.vsc.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ServiceJobDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int servicedetailsID;
    private String serviceJobId;
    private int  serviceId;

    public String getServiceJobId() {
        return serviceJobId;
    }

    public void setServiceJobId(String serviceJobId) {
        this.serviceJobId = serviceJobId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    //    @ManyToOne
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private Services services;
//    @ManyToOne
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private ServiceJob serviceJob;


    public int getServicedetailsID() {
        return servicedetailsID;
    }

    public void setServicedetailsID(int servicedetailsID) {
        this.servicedetailsID = servicedetailsID;
    }

//    public Services getServices() {
//        return services;
//    }
//
//    public void setServices(Services services) {
//        this.services = services;
//    }
//
//    public ServiceJob getServiceJob() {
//        return serviceJob;
//    }
//
//    public void setServiceJob(ServiceJob serviceJob) {
//        this.serviceJob = serviceJob;
//    }
}
