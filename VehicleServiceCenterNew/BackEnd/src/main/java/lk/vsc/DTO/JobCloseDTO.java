package lk.vsc.DTO;

import java.util.List;

public class JobCloseDTO {

    private List<JobCloseServiceDetailsDTO> services;
    private List<JobCloseItemDetailsDTO> jobCloseItem;
    private String serviceTotal;
    private String itemTotal;
    private String grossTotal;
    private String jobNo;

    public String getJobNo() {
        return jobNo;
    }

    public void setJobNo(String jobNo) {
        this.jobNo = jobNo;
    }

    public String getGrossTotal() {
        return grossTotal;
    }

    public void setGrossTotal(String grossTotal) {
        this.grossTotal = grossTotal;
    }

    public String getServiceTotal() {
        return serviceTotal;
    }

    public void setServiceTotal(String serviceTotal) {
        this.serviceTotal = serviceTotal;
    }

    public String getItemTotal() {
        return itemTotal;
    }

    public void setItemTotal(String itemTotal) {
        this.itemTotal = itemTotal;
    }

    public List<JobCloseServiceDetailsDTO> getServices() {
        return services;
    }

    public void setServices(List<JobCloseServiceDetailsDTO> services) {
        this.services = services;
    }

    public List<JobCloseItemDetailsDTO> getJobCloseItem() {
        return jobCloseItem;
    }

    public void setJobCloseItem(List<JobCloseItemDetailsDTO> jobCloseItem) {
        this.jobCloseItem = jobCloseItem;
    }
}
