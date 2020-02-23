package lk.vsc.DTO;

import lk.vsc.entity.JobClose;
import lk.vsc.entity.JobOrderItemDetails;
import lk.vsc.entity.ServiceJobDetails;

import java.util.List;

public class FinalJobCloseDTO {

    private JobClose jobClose;
    private List<JobOrderItemDetails> jobOrderItemDetails;
    private List<ServiceJobDetails> serviceJobDetails;

    public JobClose getJobClose() {
        return jobClose;
    }

    public void setJobClose(JobClose jobClose) {
        this.jobClose = jobClose;
    }

    public List<JobOrderItemDetails> getJobOrderItemDetails() {
        return jobOrderItemDetails;
    }

    public void setJobOrderItemDetails(List<JobOrderItemDetails> jobOrderItemDetails) {
        this.jobOrderItemDetails = jobOrderItemDetails;
    }

    public List<ServiceJobDetails> getServiceJobDetails() {
        return serviceJobDetails;
    }

    public void setServiceJobDetails(List<ServiceJobDetails> serviceJobDetails) {
        this.serviceJobDetails = serviceJobDetails;
    }
}
