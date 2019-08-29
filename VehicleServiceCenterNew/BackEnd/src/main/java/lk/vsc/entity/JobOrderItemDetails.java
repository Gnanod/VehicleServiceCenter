package lk.vsc.entity;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
public class JobOrderItemDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int jobOrderServiceDetails;
    private int qty;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private JobOrder jobOrder;
    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Item item;


    public int getJobOrderServiceDetails() {
        return jobOrderServiceDetails;
    }

    public void setJobOrderServiceDetails(int jobOrderServiceDetails) {
        this.jobOrderServiceDetails = jobOrderServiceDetails;
    }

    public JobOrder getJobOrder() {
        return jobOrder;
    }

    public void setJobOrder(JobOrder jobOrder) {
        this.jobOrder = jobOrder;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }
}
