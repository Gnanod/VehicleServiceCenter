package lk.vsc.DTO;


import lk.vsc.entity.JobOrder;
import lk.vsc.entity.JobOrderItemDetails;

import java.util.List;
import java.util.Set;

public class JobOrderDTO {

    private JobOrder jobOrder;
    private List<JobOrderItemDetails> jobOrderItemDetailsArray;
    private List<JobOrderItemDetails> jobOrderItemDetailsArray1;

    public JobOrder getJobOrder() {
        return jobOrder;
    }

    public void setJobOrder(JobOrder jobOrder) {
        this.jobOrder = jobOrder;
    }

    public List<JobOrderItemDetails> getJobOrderItemDetailsArray() {
        return jobOrderItemDetailsArray;
    }

    public void setJobOrderItemDetailsArray(List<JobOrderItemDetails> jobOrderItemDetailsArray) {
        this.jobOrderItemDetailsArray = jobOrderItemDetailsArray;
    }

    public List<JobOrderItemDetails> getJobOrderItemDetailsArray1() {
        return jobOrderItemDetailsArray1;
    }

    public void setJobOrderItemDetailsArray1(List<JobOrderItemDetails> jobOrderItemDetailsArray1) {
        this.jobOrderItemDetailsArray1 = jobOrderItemDetailsArray1;
    }


}
