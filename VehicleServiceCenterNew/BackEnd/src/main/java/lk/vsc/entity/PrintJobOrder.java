package lk.vsc.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class PrintJobOrder {

    @Id
    String serviceJobId;
    private String  date;
    private String time ;
    private String vehicleNumber;
    private String presentOdoMeter;

    public String getPresentOdoMeter() {
        return presentOdoMeter;
    }

    public void setPresentOdoMeter(String presentOdoMeter) {
        this.presentOdoMeter = presentOdoMeter;
    }

    public String getVehicleNumber() {
        return vehicleNumber;
    }

    public void setVehicleNumber(String vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }

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

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
